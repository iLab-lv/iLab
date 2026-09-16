'use client';

import { useEffect, useRef, useState } from 'react';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  writeBatch,
  serverTimestamp,
} from 'firebase/firestore';
import {
  DndContext,
  PointerSensor,
  KeyboardSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  sortableKeyboardCoordinates,
  arrayMove,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { db } from '@/lib/firebaseClient';
import Button from '@components/button/Button';
import s from './RepairServicesScreen.module.scss';

const DEFAULT_CATEGORY_SLUG = 'telefonu-remonts';
const CATEGORY_COLLECTION = 'categories';
const ORDER_STEP = 10;

function emptyRow(categoryId = DEFAULT_CATEGORY_SLUG) {
  return {
    docId: '',
    id: '',
    type: 'service',
    isActive: true,
    order: 9999,
    categoryId,
    family: '',
    iphoneOnly: false,
    slug: '',
    labels: {
      lv: '',
      ru: '',
    },
    defaultTimeText: {
      lv: '',
      ru: '',
    },
    defaultWarrantyDays: 90,
    isNew: true,
  };
}

function normalizeText(v) {
  return String(v ?? '');
}

function normalizeSlug(v) {
  return String(v ?? '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function parseIntOr(defaultValue, v) {
  const n = Number(String(v ?? '').trim());
  return Number.isFinite(n) ? Math.round(n) : defaultValue;
}

function getLocalizedValue(value, locale = 'lv') {
  if (typeof value === 'string') return value;
  if (!value || typeof value !== 'object') return '';
  return value[locale] || value.lv || value.ru || '';
}

function normalizeCategoryDoc(docSnap) {
  const data = docSnap.data() || {};
  return {
    id: docSnap.id,
    slug: String(data.slug || docSnap.id),
    key: String(data.key || data.slug || docSnap.id),
    label: getLocalizedValue(data.labels) || String(data.slug || docSnap.id),
    order: typeof data.order === 'number' ? data.order : 9999,
    type: typeof data.type === 'string' ? data.type : '',
  };
}

async function fetchCategories() {
  const snap = await getDocs(collection(db, CATEGORY_COLLECTION));

  return snap.docs
    .map(normalizeCategoryDoc)
    .filter((item) => item.type === 'category')
    .sort((a, b) => {
      if ((a.order ?? 9999) !== (b.order ?? 9999)) {
        return (a.order ?? 9999) - (b.order ?? 9999);
      }
      return String(a.label || a.slug).localeCompare(String(b.label || b.slug));
    });
}

async function fetchServices(categoryId) {
  const q = query(
    collection(db, 'services'),
    where('categoryId', '==', categoryId)
  );
  const snap = await getDocs(q);

  return snap.docs
    .map((d) => {
      const data = d.data() || {};
      return {
        docId: d.id,
        id: d.id,
        type: data.type || 'service',
        isActive: data.isActive !== false,
        order: typeof data.order === 'number' ? data.order : 9999,
        categoryId: data.categoryId || categoryId,
        family: data.family || '',
        iphoneOnly: data.iphoneOnly === true,
        slug: data.slug || '',
        labels: {
          lv: data.labels?.lv || '',
          ru: data.labels?.ru || '',
        },
        defaultTimeText: {
          lv: data.defaultTimeText?.lv || '',
          ru: data.defaultTimeText?.ru || '',
        },
        defaultWarrantyDays:
          typeof data.defaultWarrantyDays === 'number'
            ? data.defaultWarrantyDays
            : 90,
        isNew: false,
      };
    })
    .sort((a, b) => {
      if ((a.order ?? 9999) !== (b.order ?? 9999)) {
        return (a.order ?? 9999) - (b.order ?? 9999);
      }
      const labelCmp = String(a.labels?.lv || a.id).localeCompare(
        String(b.labels?.lv || b.id)
      );
      if (labelCmp !== 0) return labelCmp;
      return String(a.docId).localeCompare(String(b.docId));
    });
}

function SortableServiceRow({
  itemKey,
  row,
  isOpen,
  onToggle,
  dragDisabled,
  children,
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: itemKey, disabled: dragDisabled });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`${s.card}${isDragging ? ` ${s.dragging}` : ''}`}
    >
      <div className={s.cardTop}>
        <button
          type="button"
          className={s.serviceToggle}
          onClick={onToggle}
        >
          <span className={s.cardTitle}>
            {row.labels?.lv || row.id || 'New service'}
          </span>
          <span className={s.chevron}>{isOpen ? '▾' : '▸'}</span>
        </button>

        <button
          type="button"
          className={s.dragHandle}
          aria-label="Reorder service"
          disabled={dragDisabled}
          {...attributes}
          {...listeners}
        >
          ⋮⋮
        </button>

      </div>

      {isOpen && <div className={s.panel}>{children}</div>}
    </div>
  );
}

export default function RepairServicesScreen({
  initialCategory = DEFAULT_CATEGORY_SLUG,
}) {
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState(initialCategory);
  const [rows, setRows] = useState([]);
  const [openRowKey, setOpenRowKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [savingRows, setSavingRows] = useState({});
  const [deletingRows, setDeletingRows] = useState({});
  const [orderSaving, setOrderSaving] = useState(false);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');
  const orderSaveRef = useRef(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 6,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    let cancelled = false;

    async function loadCategoriesAndMaybeServices() {
      setError('');

      try {
        const categoryDocs = await fetchCategories();
        if (cancelled) return;

        setCategories(categoryDocs);

        const hasRequested = categoryDocs.some(
          (c) =>
            c.id === initialCategory ||
            c.slug === initialCategory ||
            c.key === initialCategory
        );

        if (!hasRequested && categoryDocs.length > 0) {
          const fallback =
            categoryDocs.find((c) => c.slug === DEFAULT_CATEGORY_SLUG) ||
            categoryDocs[0];
          setCategoryId(fallback.id);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err?.message || 'Failed to load categories.');
        }
      }
    }

    loadCategoriesAndMaybeServices();

    return () => {
      cancelled = true;
    };
  }, [initialCategory]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError('');
      setStatus('');
      setOpenRowKey('');

      try {
        const next = await fetchServices(categoryId);
        if (!cancelled) setRows(next);
      } catch (err) {
        if (!cancelled) {
          setError(err?.message || 'Failed to load services.');
          setRows([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    if (categoryId) {
      load();
    }

    return () => {
      cancelled = true;
    };
  }, [categoryId]);

  const categoryLabel =
    categories.find(
      (c) => c.id === categoryId || c.slug === categoryId || c.key === categoryId
    )?.label || categoryId;

  function updateRowByKey(itemKey, patch) {
    setRows((prev) =>
      prev.map((row) => {
        const rowKey = row._uiKey || row.docId || row.id;
        return rowKey === itemKey ? { ...row, ...patch } : row;
      })
    );
  }

  function updateNestedByKey(itemKey, key, patch) {
    setRows((prev) =>
      prev.map((row) => {
        const rowKey = row._uiKey || row.docId || row.id;
        if (rowKey !== itemKey) return row;

        return {
          ...row,
          [key]: {
            ...(row?.[key] || {}),
            ...patch,
          },
        };
      })
    );
  }

  function addRow() {
    const nextRow = {
      ...emptyRow(categoryId),
      _uiKey: `new-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    };

    setRows((prev) => [...prev, nextRow]);
    setOpenRowKey(nextRow._uiKey);
    setStatus('');
    setError('');
  }

  function removeUnsavedRow(itemKey) {
    setRows((prev) =>
      prev.filter((row) => {
        const rowKey = row._uiKey || row.docId || row.id;
        return rowKey !== itemKey;
      })
    );

    if (openRowKey === itemKey) {
      setOpenRowKey('');
    }
  }

  async function handleDragEnd(event) {
    const { active, over } = event;

    if (!over || active.id === over.id || orderSaveRef.current) return;

    const itemKeys = rows.map((row) => row._uiKey || row.docId || row.id);
    const oldIndex = itemKeys.indexOf(active.id);
    const newIndex = itemKeys.indexOf(over.id);

    if (oldIndex === -1 || newIndex === -1) return;

    const previousRows = rows;
    const previousOrderById = new Map(
      previousRows
        .filter((row) => !row.isNew)
        .map((row) => [row.docId, row.order])
    );
    const reorderedRows = arrayMove(rows, oldIndex, newIndex).map(
      (row, index) => ({ ...row, order: (index + 1) * ORDER_STEP })
    );
    const changedRows = reorderedRows.filter(
      (row) => !row.isNew && row.order !== previousOrderById.get(row.docId)
    );

    setRows(reorderedRows);
    setError('');
    setStatus('');
    setOrderSaving(true);
    orderSaveRef.current = true;

    try {
      if (changedRows.length > 0) {
        const batch = writeBatch(db);
        changedRows.forEach((row) => {
          batch.set(
            doc(db, 'services', row.docId),
            { order: row.order },
            { merge: true }
          );
        });
        await batch.commit();
      }
      setStatus('Order saved.');
    } catch (err) {
      setRows(previousRows);
      setError(err?.message || 'Failed to save service order.');
    } finally {
      orderSaveRef.current = false;
      setOrderSaving(false);
    }
  }

  async function saveService(itemKey) {
    const row = rows.find(
      (item) => (item._uiKey || item.docId || item.id) === itemKey
    );
    if (!row) return;

    const nextId = normalizeText(row.id).trim();
    if (!nextId) {
      setError('Service ID is required.');
      return;
    }

    setError('');
    setStatus('');
    setSavingRows((prev) => ({ ...prev, [itemKey]: true }));

    try {
      if (row.isNew) {
        const existing = await getDoc(doc(db, 'services', nextId));
        if (existing.exists()) {
          throw new Error(`Service ID already exists: ${nextId}`);
        }
      }

      const existingRows = rows.filter((item) => !item.isNew);
      const lastOrder = existingRows.reduce(
        (max, item) => Math.max(max, Number(item.order) || 0),
        0
      );
      const nextOrder = row.isNew
        ? Math.ceil(lastOrder / ORDER_STEP) * ORDER_STEP + ORDER_STEP
        : row.order;
      const batch = writeBatch(db);

      batch.set(
        doc(db, 'services', row.isNew ? nextId : row.docId),
        {
          isActive: row.isActive !== false,
          ...(row.isNew
            ? {
                id: nextId,
                type: row.type || 'service',
                order: nextOrder,
                categoryId,
              }
            : {}),
          family: normalizeText(row.family).trim(),
          iphoneOnly: row.iphoneOnly === true,
          slug: normalizeSlug(row.slug),
          labels: {
            lv: normalizeText(row.labels?.lv).trim(),
            ru: normalizeText(row.labels?.ru).trim(),
          },
          defaultTimeText: {
            lv: normalizeText(row.defaultTimeText?.lv).trim(),
            ru: normalizeText(row.defaultTimeText?.ru).trim(),
          },
          defaultWarrantyDays: parseIntOr(90, row.defaultWarrantyDays),
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );
      await batch.commit();

      setRows((prev) =>
        prev.map((item) =>
          (item._uiKey || item.docId || item.id) === itemKey
            ? {
                ...item,
                docId: row.isNew ? nextId : row.docId,
                id: row.isNew ? nextId : row.id,
                order: nextOrder,
                isNew: false,
                _uiKey: undefined,
              }
            : item
        )
      );
      if (row.isNew) setOpenRowKey(nextId);
      setStatus(`Saved: ${nextId}`);
    } catch (err) {
      setError(err?.message || 'Failed to save service.');
    } finally {
      setSavingRows((prev) => ({ ...prev, [itemKey]: false }));
    }
  }

  async function removeService(itemKey) {
    const row = rows.find(
      (item) => (item._uiKey || item.docId || item.id) === itemKey
    );
    if (!row) return;

    if (row.isNew) {
      removeUnsavedRow(itemKey);
      return;
    }

    if (!window.confirm('Remove this service?')) return;

    setError('');
    setStatus('');
    setDeletingRows((prev) => ({ ...prev, [itemKey]: true }));

    try {
      const remainingRows = rows
        .filter((item) => (item._uiKey || item.docId || item.id) !== itemKey)
        .map((item, index) => ({ ...item, order: (index + 1) * ORDER_STEP }));
      const batch = writeBatch(db);

      batch.delete(doc(db, 'services', row.docId));
      remainingRows.forEach((item) => {
        if (!item.isNew) {
          batch.set(
            doc(db, 'services', item.docId),
            { order: item.order },
            { merge: true }
          );
        }
      });
      await batch.commit();

      setRows(remainingRows);
      setOpenRowKey('');
      setStatus(`Removed: ${row.id}`);
    } catch (err) {
      setError(err?.message || 'Failed to remove service.');
    } finally {
      setDeletingRows((prev) => ({ ...prev, [itemKey]: false }));
    }
  }

  return (
    <div className={s.wrap}>
      <h1 className={s.h1}>Repair Services · {categoryLabel}</h1>

      <div className={s.toolbar}>
        <select
          className={s.select}
          value={categoryId}
          onChange={(e) => {
            setCategoryId(e.target.value);
            setRows([]);
            setOpenRowKey('');
            setError('');
            setStatus('');
          }}
          aria-label="Category"
        >
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      {error && <div className={s.error}>{error}</div>}
      {status && <div className={s.status}>{status}</div>}

      {loading ? (
        <div className={s.loading}>Loading…</div>
      ) : rows.length === 0 ? (
        <div className={s.groups}>
          <section className={s.group}>
            <div className={s.groupHead}>
              <span className={s.groupTitle}>Services (0)</span>
              <Button onClick={addRow}>Add new</Button>
            </div>

            <div className={s.empty}>No services found for this category.</div>
          </section>
        </div>
      ) : (
        <div className={s.groups}>
          <section className={s.group}>
                <div className={s.groupHead}>
                  <span className={s.groupTitle}>Services ({rows.length})</span>
                  <Button
                    onClick={addRow}
                    disabled={rows.some((row) => row.isNew)}
                  >
                    Add new
                  </Button>
                </div>

                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext
                    items={rows.map((row) => row._uiKey || row.docId || row.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    <div className={s.rows}>
                      {rows.map((row) => {
                        const itemKey = row._uiKey || row.docId || row.id;
                        const isOpen = openRowKey === itemKey;

                        return (
                          <SortableServiceRow
                            key={itemKey}
                            itemKey={itemKey}
                            row={row}
                            isOpen={isOpen}
                            dragDisabled={
                              orderSaving || rows.some((item) => item.isNew)
                            }
                            onToggle={() =>
                              setOpenRowKey((prev) => (prev === itemKey ? '' : itemKey))
                            }
                          >
                            <div className={s.grid}>
                              <label className={s.field}>
                                <span className={s.label}>ID</span>
                                <input
                                  className={s.input}
                                  value={row.id}
                                  disabled={!row.isNew}
                                  onChange={(e) =>
                                    updateRowByKey(itemKey, {
                                      id: normalizeText(e.target.value),
                                    })
                                  }
                                  placeholder="phone-battery"
                                />
                              </label>

                              <label className={s.field}>
                                <span className={s.label}>Family</span>
                                <input
                                  className={s.input}
                                  value={row.family || ''}
                                  onChange={(e) =>
                                    updateRowByKey(itemKey, {
                                      family: normalizeText(e.target.value),
                                    })
                                  }
                                  placeholder="display"
                                />
                              </label>

                              <label className={s.checkboxField}>
                                <input
                                  type="checkbox"
                                  checked={row.iphoneOnly === true}
                                  onChange={(e) =>
                                    updateRowByKey(itemKey, {
                                      iphoneOnly: e.target.checked,
                                    })
                                  }
                                />
                                <span>iPhone only</span>
                              </label>

                              <label className={s.checkboxField}>
                                <input
                                  type="checkbox"
                                  checked={row.isActive !== false}
                                  onChange={(e) =>
                                    updateRowByKey(itemKey, {
                                      isActive: e.target.checked,
                                    })
                                  }
                                />
                                <span>Active</span>
                              </label>

                              <label className={s.field}>
                                <span className={s.label}>Slug</span>
                                <input
                                  className={s.input}
                                  value={row.slug}
                                  onChange={(e) =>
                                    updateRowByKey(itemKey, {
                                      slug: normalizeText(e.target.value),
                                    })
                                  }
                                  placeholder="baterijas-maina"
                                />
                              </label>

                              <label className={s.field}>
                                <span className={s.label}>LV label</span>
                                <input
                                  className={s.input}
                                  value={row.labels?.lv || ''}
                                  onChange={(e) =>
                                    updateNestedByKey(itemKey, 'labels', {
                                      lv: normalizeText(e.target.value),
                                    })
                                  }
                                  placeholder="Baterijas maiņa"
                                />
                              </label>

                              <label className={s.field}>
                                <span className={s.label}>RU label</span>
                                <input
                                  className={s.input}
                                  value={row.labels?.ru || ''}
                                  onChange={(e) =>
                                    updateNestedByKey(itemKey, 'labels', {
                                      ru: normalizeText(e.target.value),
                                    })
                                  }
                                  placeholder="Замена батареи"
                                />
                              </label>

                              <label className={s.field}>
                                <span className={s.label}>LV time</span>
                                <input
                                  className={s.input}
                                  value={row.defaultTimeText?.lv || ''}
                                  onChange={(e) =>
                                    updateNestedByKey(itemKey, 'defaultTimeText', {
                                      lv: normalizeText(e.target.value),
                                    })
                                  }
                                  placeholder="30–120 min"
                                />
                              </label>

                              <label className={s.field}>
                                <span className={s.label}>RU time</span>
                                <input
                                  className={s.input}
                                  value={row.defaultTimeText?.ru || ''}
                                  onChange={(e) =>
                                    updateNestedByKey(itemKey, 'defaultTimeText', {
                                      ru: normalizeText(e.target.value),
                                    })
                                  }
                                  placeholder="30–120 мин"
                                />
                              </label>

                              <label className={s.field}>
                                <span className={s.label}>Warranty days</span>
                                <input
                                  className={s.input}
                                  value={String(row.defaultWarrantyDays ?? '')}
                                  onChange={(e) =>
                                    updateRowByKey(itemKey, {
                                      defaultWarrantyDays: normalizeText(
                                        e.target.value
                                      ),
                                    })
                                  }
                                  placeholder="90"
                                />
                              </label>
                            </div>

                            <div className={s.cardActions}>
                              <Button
                                onClick={() => saveService(itemKey)}
                                disabled={
                                  savingRows[itemKey] || deletingRows[itemKey]
                                }
                              >
                                {savingRows[itemKey] ? 'Saving...' : 'Save'}
                              </Button>
                              <Button
                                onClick={() => removeService(itemKey)}
                                disabled={
                                  savingRows[itemKey] || deletingRows[itemKey]
                                }
                              >
                                {deletingRows[itemKey]
                                  ? 'Removing...'
                                  : row.isNew
                                    ? 'Cancel'
                                    : 'Remove'}
                              </Button>
                            </div>
                          </SortableServiceRow>
                        );
                      })}
                    </div>
                  </SortableContext>
                </DndContext>
              </section>
        </div>
      )}

    </div>
  );
}
