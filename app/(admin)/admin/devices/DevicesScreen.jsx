'use client';

import { useEffect, useMemo, useState } from 'react';
import Button from '@components/button/Button';
import s from './DevicesScreen.module.scss';

const LOCALES = ['lv', 'ru'];

function emptyDevice() {
  return {
    slug: '',
    type: 'device',
    categoryKey: '',
    brandKey: '',
    seriesKey: '',
    name: '',
    year: '',
    image: '',
    order: 999,
    h1: '',
    metaTitle: '',
    metaDescription: '',
    bodyHtml: '',
  };
}

function normalizeDevice(item = {}) {
  return {
    slug: typeof item.slug === 'string' ? item.slug : '',
    type: typeof item.type === 'string' ? item.type : 'device',
    categoryKey: typeof item.categoryKey === 'string' ? item.categoryKey : '',
    brandKey: typeof item.brandKey === 'string' ? item.brandKey : '',
    seriesKey: typeof item.seriesKey === 'string' ? item.seriesKey : '',
    name: typeof item.name === 'string' ? item.name : '',
    year:
      typeof item.year === 'number' && Number.isFinite(item.year)
        ? item.year
        : '',
    image: typeof item.image === 'string' ? item.image : '',
    order:
      typeof item.order === 'number' && Number.isFinite(item.order)
        ? item.order
        : 999,
    h1: typeof item.h1 === 'string' ? item.h1 : '',
    metaTitle: typeof item.metaTitle === 'string' ? item.metaTitle : '',
    metaDescription:
      typeof item.metaDescription === 'string' ? item.metaDescription : '',
    bodyHtml: typeof item.bodyHtml === 'string' ? item.bodyHtml : '',
  };
}

export default function DevicesScreen() {
  const [items, setItems] = useState([]);
  const [openKey, setOpenKey] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState({});
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');
  const [query, setQuery] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError('');
      setStatus('');

      try {
        const res = await fetch('/api/admin/devices', { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to load devices');

        const json = await res.json();
        if (cancelled) return;

        setItems(Array.isArray(json?.items) ? json.items.map(normalizeDevice) : []);
      } catch (err) {
        console.error(err);
        if (!cancelled) setError('Failed to load devices.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;

    return items.filter((item) =>
      [
        item.slug,
        item.name,
        item.categoryKey,
        item.brandKey,
        item.seriesKey,
      ]
        .join(' ')
        .toLowerCase()
        .includes(q)
    );
  }, [items, query]);

  function updateItem(idx, patch) {
    setItems((prev) => {
      const next = [...prev];
      next[idx] = { ...next[idx], ...patch };
      return next;
    });
  }

  function addDevice() {
    setItems((prev) => [emptyDevice(), ...prev]);
    setOpenKey('__new__');
  }

  function deleteDevice(idx) {
    setItems((prev) => prev.filter((_, i) => i !== idx));
  }

  async function saveDevice(item, idx) {
    if (!item.slug) {
      setError('Device slug is required.');
      return;
    }

    setError('');
    setStatus('');
    setSaving((prev) => ({ ...prev, [item.slug || idx]: true }));

    try {
      const res = await fetch('/api/admin/devices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ item }),
      });

      const json = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(json?.error || 'Failed to save device');
      }

      setStatus(`Saved: ${item.slug}`);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to save device.');
    } finally {
      setSaving((prev) => ({ ...prev, [item.slug || idx]: false }));
    }
  }

  return (
    <div className={s.wrap}>
      <div className={s.topbar}>
        <h1 className={s.h1}>Devices</h1>

        <div className={s.localeSwitch}>
          <Button onClick={addDevice}>Add device</Button>
        </div>
      </div>

      <div className={s.toolbar}>
        <input
          className={s.search}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search slug, model, brand, series…"
        />
      </div>

      {error && <div className={s.error}>{error}</div>}
      {status && <div className={s.status}>{status}</div>}

      {loading ? (
        <div className={s.empty}>Loading…</div>
      ) : (
        <div className={s.groups}>
          {filtered.map((item, idx) => {
            const isOpen =
              openKey === item.slug || (openKey === '__new__' && idx === 0);
            const saveKey = item.slug || idx;

            return (
              <section key={item.slug || idx} className={s.group}>
                <button
                  type="button"
                  onClick={() => setOpenKey(isOpen ? null : item.slug || '__new__')}
                  className={s.modelToggle}
                >
                  <span className={s.modelName}>
                    {item.name || item.slug || 'New device'}
                  </span>
                  <span className={s.modelChevron}>{isOpen ? '▾' : '▸'}</span>
                </button>

                {isOpen && (
                  <div className={s.panel}>
                    <div className={s.formGrid}>
                      <input
                        className={s.input}
                        value={item.slug}
                        onChange={(e) => updateItem(idx, { slug: e.target.value })}
                        placeholder="slug"
                      />
                      <input
                        className={s.input}
                        value={item.name}
                        onChange={(e) => updateItem(idx, { name: e.target.value })}
                        placeholder="name"
                      />
                      <input
                        className={s.input}
                        type="number"
                        value={item.year}
                        onChange={(e) =>
                          updateItem(idx, {
                            year: e.target.value === '' ? '' : Number(e.target.value),
                          })
                        }
                        placeholder="year"
                      />
                    </div>

                    <div className={s.formGrid}>
                      <input
                        className={s.input}
                        value={item.categoryKey}
                        onChange={(e) =>
                          updateItem(idx, { categoryKey: e.target.value })
                        }
                        placeholder="categoryKey"
                      />
                      <input
                        className={s.input}
                        value={item.brandKey}
                        onChange={(e) =>
                          updateItem(idx, { brandKey: e.target.value })
                        }
                        placeholder="brandKey"
                      />
                      <input
                        className={s.input}
                        value={item.seriesKey}
                        onChange={(e) =>
                          updateItem(idx, { seriesKey: e.target.value })
                        }
                        placeholder="seriesKey"
                      />
                    </div>

                    <div className={s.formGrid}>
                      <input
                        className={s.input}
                        value={item.image}
                        onChange={(e) => updateItem(idx, { image: e.target.value })}
                        placeholder="image"
                      />
                      <input
                        className={s.input}
                        type="number"
                        value={item.order}
                        onChange={(e) =>
                          updateItem(idx, { order: Number(e.target.value || 999) })
                        }
                        placeholder="order"
                      />
                      <input
                        className={s.input}
                        value={item.h1}
                        onChange={(e) => updateItem(idx, { h1: e.target.value })}
                        placeholder="h1"
                      />
                    </div>

                    <textarea
                      className={s.textarea}
                      rows={3}
                      value={item.metaTitle}
                      onChange={(e) =>
                        updateItem(idx, { metaTitle: e.target.value })
                      }
                      placeholder="metaTitle"
                    />

                    <textarea
                      className={s.textarea}
                      rows={4}
                      value={item.metaDescription}
                      onChange={(e) =>
                        updateItem(idx, { metaDescription: e.target.value })
                      }
                      placeholder="metaDescription"
                    />

                    <textarea
                      className={s.textarea}
                      rows={8}
                      value={item.bodyHtml}
                      onChange={(e) =>
                        updateItem(idx, { bodyHtml: e.target.value })
                      }
                      placeholder="bodyHtml"
                    />

                    <div className={s.panelFooter}>
                      <Button onClick={() => saveDevice(item, idx)}>
                        {saving[saveKey] ? 'Saving…' : 'Save device'}
                      </Button>
                      <Button onClick={() => deleteDevice(idx)}>Delete device</Button>
                    </div>
                  </div>
                )}
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}