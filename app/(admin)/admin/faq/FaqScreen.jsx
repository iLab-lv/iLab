'use client';

import { useEffect, useMemo, useState } from 'react';
import Button from '@components/button/Button';
import s from './FaqScreen.module.scss';

const LOCALES = ['lv', 'ru'];

function normalizeLocale(locale) {
  return locale === 'ru' ? 'ru' : 'lv';
}

function normalizeFaqItem(item = {}) {
  return {
    q: typeof item.q === 'string' ? item.q : '',
    aHtml: typeof item.aHtml === 'string' ? item.aHtml : '',
  };
}

function normalizeFaqGroup(group = {}) {
  return {
    id: typeof group.id === 'string' ? group.id : '',
    scopeType:
      group.scopeType === 'category' || group.scopeType === 'service'
        ? group.scopeType
        : 'basic',
    scopeKey: typeof group.scopeKey === 'string' ? group.scopeKey : '',
    locale: normalizeLocale(group.locale),
    title: typeof group.title === 'string' ? group.title : '',
    items: Array.isArray(group.items) ? group.items.map(normalizeFaqItem) : [],
  };
}

function formatScopeLabel(group) {
  if (group.scopeType === 'basic') {
    return 'Basic';
  }

  return `${group.scopeType} · ${group.scopeKey}`;
}

export default function FaqScreen() {
  const [groups, setGroups] = useState([]);
  const [openId, setOpenId] = useState(null);
  const [activeLocale, setActiveLocale] = useState('lv');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState({});
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError('');
      setStatus('');

      try {
        const res = await fetch('/api/faq', { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to load FAQ');

        const json = await res.json();
        if (cancelled) return;

        const nextGroups = Array.isArray(json?.groups)
          ? json.groups.map(normalizeFaqGroup)
          : [];

        setGroups(nextGroups);
      } catch (err) {
        console.error('Failed to load FAQ:', err);
        if (!cancelled) setError('Failed to load FAQ.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  const visibleGroups = useMemo(() => {
    return groups.filter((group) => normalizeLocale(group.locale) === activeLocale);
  }, [groups, activeLocale]);

  function toggleGroup(id) {
    setError('');
    setStatus('');
    setOpenId((prev) => (prev === id ? null : id));
  }

  function updateGroup(groupId, patch) {
    setGroups((prev) =>
      prev.map((group) => (group.id === groupId ? { ...group, ...patch } : group))
    );
  }

  function updateItem(groupId, idx, patch) {
    setGroups((prev) =>
      prev.map((group) => {
        if (group.id !== groupId) return group;

        const items = [...group.items];
        items[idx] = { ...items[idx], ...patch };

        return { ...group, items };
      })
    );
  }

  function addItem(groupId) {
    setGroups((prev) =>
      prev.map((group) => {
        if (group.id !== groupId) return group;

        return {
          ...group,
          items: [...group.items, { q: '', aHtml: '' }],
        };
      })
    );
  }

  function deleteItem(groupId, idx) {
    setGroups((prev) =>
      prev.map((group) => {
        if (group.id !== groupId) return group;

        const items = [...group.items];
        items.splice(idx, 1);

        return { ...group, items };
      })
    );
  }

  function moveItem(groupId, idx, dir) {
    setGroups((prev) =>
      prev.map((group) => {
        if (group.id !== groupId) return group;

        const items = [...group.items];
        const nextIdx = idx + dir;

        if (nextIdx < 0 || nextIdx >= items.length) return group;

        const temp = items[idx];
        items[idx] = items[nextIdx];
        items[nextIdx] = temp;

        return { ...group, items };
      })
    );
  }

  async function saveGroup(group) {
    setError('');
    setStatus('');
    setSaving((prev) => ({ ...prev, [group.id]: true }));

    try {
      const payload = {
        scopeType: group.scopeType,
        scopeKey: group.scopeType === 'basic' ? null : group.scopeKey,
        locale: group.locale,
        title: String(group.title || '').trim(),
        items: (group.items || [])
          .map((item) => ({
            q: String(item.q || '').trim(),
            aHtml: String(item.aHtml || '').trim(),
          }))
          .filter((item) => item.q && item.aHtml),
      };

      const res = await fetch('/api/faq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(json?.error || 'Failed to save FAQ group');
      }

      setStatus(`Saved: ${formatScopeLabel(group)} (${group.locale.toUpperCase()})`);
    } catch (err) {
      console.error('Failed to save FAQ group:', err);
      setError(err.message || 'Failed to save FAQ group.');
    } finally {
      setSaving((prev) => ({ ...prev, [group.id]: false }));
    }
  }

  return (
    <div className={s.wrap}>
      <div className={s.topbar}>
        <h1 className={s.h1}>FAQ · {activeLocale.toUpperCase()}</h1>

        <div className={s.localeSwitch}>
          {LOCALES.map((locale) => (
            <button
              key={locale}
              type="button"
              className={`${s.localeBtn} ${
                activeLocale === locale ? s.localeBtnActive : ''
              }`}
              onClick={() => {
                setError('');
                setStatus('');
                setActiveLocale(locale);
                setOpenId(null);
              }}
            >
              {locale.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {error && <div className={s.error}>{error}</div>}
      {status && <div className={s.status}>{status}</div>}

      {loading ? (
        <div className={s.empty}>Loading…</div>
      ) : visibleGroups.length === 0 ? (
        <div className={s.empty}>No FAQ groups yet for this language.</div>
      ) : (
        <div className={s.groups}>
          {visibleGroups.map((group, groupIdx) => {
            const isOpen = openId === group.id;
            const isSaving = !!saving[group.id];

            return (
              <section key={`${group.id}-${groupIdx}`} className={s.group}>
                <button
                  type="button"
                  onClick={() => toggleGroup(group.id)}
                  className={s.modelToggle}
                >
                  <span className={s.modelName}>{formatScopeLabel(group)}</span>
                  <span className={s.modelChevron}>{isOpen ? '▾' : '▸'}</span>
                </button>

                {isOpen && (
                  <div className={s.panel}>
                    <div className={s.formGridSingle}>
                      <input
                        className={s.input}
                        value={group.title}
                        onChange={(e) =>
                          updateGroup(group.id, { title: e.target.value })
                        }
                        placeholder="FAQ group title"
                      />
                    </div>

                    {group.items.length === 0 ? (
                      <div className={s.empty}>No FAQ items yet in this group.</div>
                    ) : (
                      <div className={s.rows}>
                        {group.items.map((item, idx) => (
                          <div key={`${group.id}-item-${idx}`} className={s.reviewCard}>
                            <div className={s.rowTop}>
                              <div className={s.rowTitle}>FAQ item #{idx + 1}</div>

                              <div className={s.rowActions}>
                                <button
                                  type="button"
                                  className={s.smallBtn}
                                  onClick={() => moveItem(group.id, idx, -1)}
                                  disabled={idx === 0}
                                >
                                  ↑
                                </button>

                                <button
                                  type="button"
                                  className={s.smallBtn}
                                  onClick={() => moveItem(group.id, idx, 1)}
                                  disabled={idx === group.items.length - 1}
                                >
                                  ↓
                                </button>

                                <button
                                  type="button"
                                  className={s.smallBtnDanger}
                                  onClick={() => deleteItem(group.id, idx)}
                                >
                                  Delete
                                </button>
                              </div>
                            </div>

                            <div className={s.formGridSingle}>
                              <input
                                className={s.input}
                                value={item.q}
                                onChange={(e) =>
                                  updateItem(group.id, idx, { q: e.target.value })
                                }
                                placeholder="Question"
                              />
                            </div>

                            <textarea
                              className={s.textarea}
                              value={item.aHtml}
                              onChange={(e) =>
                                updateItem(group.id, idx, {
                                  aHtml: e.target.value,
                                })
                              }
                              placeholder="Answer HTML"
                              rows={8}
                            />
                          </div>
                        ))}
                      </div>
                    )}

                    <div className={s.panelFooter}>
                      <Button onClick={() => addItem(group.id)} disabled={isSaving}>
                        Add FAQ item
                      </Button>

                      <Button onClick={() => saveGroup(group)} disabled={isSaving}>
                        {isSaving ? 'Saving…' : 'Save group'}
                      </Button>
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