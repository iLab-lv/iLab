'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  collection,
  doc,
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

function emptyRow(categoryId = DEFAULT_CATEGORY_SLUG, family = '') {
  return {
    docId: '',
    id: '',
    type: 'service',
    isActive: true,
    order: 9999,
    categoryId,
    family,
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
        id: data.id || d.id,
        type: data.type || 'service',
        isActive: true,
        order: typeof data.order === 'number' ? data.order : 9999,
        categoryId: data.categoryId || categoryId,
        family: data.family || '',
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
      const famCmp = String(a.family || '').localeCompare(String(b.family || ''));
      if (famCmp !== 0) return famCmp;
      if ((a.order ?? 9999) !== (b.order ?? 9999)) {
        return (a.order ?? 9999) - (b.order ?? 9999);
      }
      return String(a.labels?.lv || a.id).localeCompare(String(b.labels?.lv || b.id));
    });
}

function SortableServiceRow({
  itemKey,
  row,
  isOpen,
  onToggle,
  onRemove,
  children,
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: itemKey });

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
          {...attributes}
          {...listeners}
        >
          ⋮⋮
        </button>

        {row.isNew && <Button onClick={onRemove}>Remove</Button>}
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
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');

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

  const grouped = useMemo(() => {
    const map = new Map();

    for (const row of rows) {
      const rawFamily = normalizeText(row.family).trim();
      const key = rawFamily || '__ungrouped__';
      const title = rawFamily || 'Ungrouped';

      if (!map.has(key)) {
        map.set(key, {
          familyKey: key,
          familyValue: rawFamily,
          familyLabel: title,
          items: [],
        });
      }

      map.get(key).items.push(row);
    }

    return Array.from(map.values())
      .map((group) => ({
        ...group,
        items: [...group.items].sort((a, b) => {
          if ((a.order ?? 9999) !== (b.order ?? 9999)) {
            return (a.order ?? 9999) - (b.order ?? 9999);
          }
          return String(a.labels?.lv || a.id).localeCompare(
            String(b.labels?.lv || b.id)
          );
        }),
      }))
      .sort((a, b) => String(a.familyLabel).localeCompare(String(b.familyLabel)));
  }, [rows]);

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

  function addRowToGroup(group) {
    const nextRow = {
      ...emptyRow(categoryId, group.familyValue),
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

  function handleDragEnd(group, event) {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    setRows((prev) => {
      const groupRows = prev.filter((row) => {
        const rawFamily = normalizeText(row.family).trim();
        const key = rawFamily || '__ungrouped__';
        return key === group.familyKey;
      });

      const groupKeys = groupRows.map((row) => row._uiKey || row.docId || row.id);
      const oldIndex = groupKeys.indexOf(active.id);
      const newIndex = groupKeys.indexOf(over.id);

      if (oldIndex === -1 || newIndex === -1) return prev;

      const reorderedGroupRows = arrayMove(groupRows, oldIndex, newIndex);

      const queue = [...reorderedGroupRows];
      const next = [];

      for (const row of prev) {
        const rawFamily = normalizeText(row.family).trim();
        const key = rawFamily || '__ungrouped__';

        if (key === group.familyKey) {
          next.push(queue.shift());
        } else {
          next.push(row);
        }
      }

      return next;
    });
  }

  async function saveAll() {
    setError('');
    setStatus('');

    if (!rows.length) {
      setStatus('Nothing to save.');
      return;
    }

    try {
      const rowsForSave = [];
      const seenIds = new Set();

      for (const group of grouped) {
        group.items.forEach((row, index) => {
          const nextId = normalizeText(row.id).trim();

          if (!nextId) {
            throw new Error('Every service must have an id.');
          }

          if (seenIds.has(nextId)) {
            throw new Error(`Duplicate service id: ${nextId}`);
          }

          seenIds.add(nextId);

          rowsForSave.push({
            ...row,
            id: nextId,
            categoryId,
            family: group.familyValue,
            isActive: true,
            order: (index + 1) * ORDER_STEP,
          });
        });
      }

      setSaving(true);

      const CHUNK = 250;

      for (let i = 0; i < rowsForSave.length; i += CHUNK) {
        const chunk = rowsForSave.slice(i, i + CHUNK);
        const batch = writeBatch(db);

        for (const row of chunk) {
          const nextId = normalizeText(row.id).trim();
          const prevId = normalizeText(row.docId).trim();

          if (prevId && prevId !== nextId) {
            batch.delete(doc(db, 'services', prevId));
          }

          batch.set(
            doc(db, 'services', nextId),
            {
              id: nextId,
              type: 'service',
              isActive: true,
              order: parseIntOr(9999, row.order),
              categoryId,
              family: normalizeText(row.family).trim(),
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
        }

        await batch.commit();
      }

      const fresh = await fetchServices(categoryId);
      setRows(fresh);
      setOpenRowKey('');
      setStatus(`Saved ${fresh.length} services.`);
    } catch (err) {
      setError(err?.message || 'Failed to save services.');
    } finally {
      setSaving(false);
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
              <span className={s.groupTitle}>Ungrouped</span>
              <Button
                onClick={() =>
                  addRowToGroup({
                    familyKey: '__ungrouped__',
                    familyValue: '',
                    familyLabel: 'Ungrouped',
                  })
                }
              >
                Add new
              </Button>
            </div>

            <div className={s.empty}>No services found for this category.</div>
          </section>
        </div>
      ) : (
        <div className={s.groups}>
          {grouped.map((group) => {
            const itemKeys = group.items.map(
              (row) => row._uiKey || row.docId || row.id
            );

            return (
              <section key={group.familyKey} className={s.group}>
                <div className={s.groupHead}>
                  <span className={s.groupTitle}>
                    {group.familyLabel} ({group.items.length})
                  </span>

                  <Button onClick={() => addRowToGroup(group)}>Add new</Button>
                </div>

                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={(event) => handleDragEnd(group, event)}
                >
                  <SortableContext
                    items={itemKeys}
                    strategy={verticalListSortingStrategy}
                  >
                    <div className={s.rows}>
                      {group.items.map((row) => {
                        const itemKey = row._uiKey || row.docId || row.id;
                        const isOpen = openRowKey === itemKey;

                        return (
                          <SortableServiceRow
                            key={itemKey}
                            itemKey={itemKey}
                            row={row}
                            isOpen={isOpen}
                            onToggle={() =>
                              setOpenRowKey((prev) => (prev === itemKey ? '' : itemKey))
                            }
                            onRemove={() => removeUnsavedRow(itemKey)}
                          >
                            <div className={s.grid}>
                              <label className={s.field}>
                                <span className={s.label}>ID</span>
                                <input
                                  className={s.input}
                                  value={row.id}
                                  onChange={(e) =>
                                    updateRowByKey(itemKey, {
                                      id: normalizeText(e.target.value),
                                    })
                                  }
                                  placeholder="phone-battery"
                                />
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
                          </SortableServiceRow>
                        );
                      })}
                    </div>
                  </SortableContext>
                </DndContext>
              </section>
            );
          })}
        </div>
      )}

      <div className={s.footer}>
        <Button onClick={saveAll} disabled={saving || loading}>
          {saving ? 'Saving…' : 'Save all'}
        </Button>
      </div>
    </div>
  );
}