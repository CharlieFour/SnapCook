import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, Bell, Trash2 } from 'lucide-react';
import { notifications as initialNotifs } from '../data/mockData';

const TYPE_FILTERS = [
  { id: 'all',     label: 'All' },
  { id: 'recipe',  label: '🍽️ Recipes' },
  { id: 'plan',    label: '📅 Meal Plan' },
  { id: 'tip',     label: '💡 Tips' },
  { id: 'cuisine', label: '🌍 Cuisines' },
  { id: 'feature', label: '✨ Updates' },
];

function timeGroup(time) {
  if (time.includes('m') || time.includes('h')) return 'Today';
  if (time === '1d ago') return 'Yesterday';
  return 'Earlier';
}

export default function Notifications() {
  const navigate = useNavigate();
  const [notifs, setNotifs] = useState(initialNotifs);
  const [filter, setFilter] = useState('all');

  const unreadCount = notifs.filter(n => !n.read).length;

  const filtered = notifs.filter(n => filter === 'all' || n.type === filter);

  // Group by time
  const groups = {};
  filtered.forEach(n => {
    const g = timeGroup(n.time);
    if (!groups[g]) groups[g] = [];
    groups[g].push(n);
  });
  const groupOrder = ['Today', 'Yesterday', 'Earlier'];

  function markRead(id) {
    setNotifs(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  }

  function markAllRead() {
    setNotifs(prev => prev.map(n => ({ ...n, read: true })));
  }

  function deleteNotif(id) {
    setNotifs(prev => prev.filter(n => n.id !== id));
  }

  function handleClick(notif) {
    markRead(notif.id);
    navigate(notif.link);
  }

  return (
    <div style={{ background: 'var(--color-bg)', minHeight: '100vh', paddingBottom: 'calc(var(--bottom-nav-h) + 20px)' }}>

      {/* ── STICKY HEADER ── */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 20,
        background: 'var(--color-surface)',
        borderBottom: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-sm)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button
              onClick={() => navigate(-1)}
              style={{ width: 38, height: 38, borderRadius: '50%', background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-2)', flexShrink: 0 }}
            >
              <ArrowLeft size={18} />
            </button>
            <div>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 700, lineHeight: 1.2 }}>Notifications</h1>
              {unreadCount > 0 && (
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-3)', marginTop: 1 }}>{unreadCount} unread</p>
              )}
            </div>
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '8px 14px', borderRadius: 'var(--radius-full)', background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', cursor: 'pointer', fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--color-primary)', fontFamily: 'var(--font-body)' }}
            >
              <Check size={13} /> Mark all read
            </button>
          )}
        </div>

        {/* Filter pills */}
        <div className="scroll-row" style={{ padding: '0 16px 12px', gap: 6 }}>
          {TYPE_FILTERS.map(f => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`pill-toggle${filter === f.id ? ' active' : ''}`}
              style={{ fontSize: 'var(--text-xs)', flexShrink: 0 }}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── NOTIFICATION LIST ── */}
      <div style={{ padding: '16px 16px 0' }}>
        {filtered.length === 0 ? (
          <div className="empty-state animate-fadeUp">
            <div className="empty-state-icon"><Bell size={48} color="var(--color-text-3)" /></div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 600 }}>All caught up!</h3>
            <p style={{ color: 'var(--color-text-3)', fontSize: 'var(--text-sm)' }}>No notifications in this category</p>
          </div>
        ) : (
          groupOrder.map(groupName => {
            const items = groups[groupName];
            if (!items || items.length === 0) return null;
            return (
              <div key={groupName} style={{ marginBottom: 24 }} className="animate-fadeUp">
                <p style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--color-text-3)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 10 }}>
                  {groupName}
                </p>
                <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
                  {items.map((n, i) => (
                    <div
                      key={n.id}
                      style={{
                        display: 'flex', alignItems: 'flex-start', gap: 12,
                        padding: '14px 16px',
                        borderBottom: i < items.length - 1 ? '1px solid var(--color-border)' : 'none',
                        background: !n.read ? 'var(--color-primary-light)' : 'transparent',
                        transition: 'background 0.15s',
                        cursor: 'pointer',
                        position: 'relative',
                      }}
                      onClick={() => handleClick(n)}
                      onMouseEnter={e => e.currentTarget.style.background = !n.read ? '#eab8ae' : 'var(--color-surface-2)'}
                      onMouseLeave={e => e.currentTarget.style.background = !n.read ? 'var(--color-primary-light)' : 'transparent'}
                    >
                      {/* Icon */}
                      <div style={{
                        width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                        background: !n.read ? 'rgba(200,75,49,0.15)' : 'var(--color-surface-2)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 22,
                      }}>
                        {n.emoji}
                      </div>

                      {/* Text */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: 'var(--text-sm)', fontWeight: n.read ? 500 : 700, color: 'var(--color-text)', lineHeight: 1.35, marginBottom: 3 }}>
                          {n.title}
                        </p>
                        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-2)', lineHeight: 1.5, marginBottom: 5 }}>
                          {n.body}
                        </p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <span style={{ fontSize: 10, color: 'var(--color-text-3)', fontWeight: 500 }}>{n.time}</span>
                          <span style={{
                            fontSize: 10, fontWeight: 600, textTransform: 'capitalize',
                            padding: '2px 7px', borderRadius: 'var(--radius-full)',
                            background: 'var(--color-surface-2)', border: '1px solid var(--color-border)',
                            color: 'var(--color-text-3)',
                          }}>
                            {n.type}
                          </span>
                        </div>
                      </div>

                      {/* Unread dot + delete */}
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, flexShrink: 0 }}>
                        {!n.read && (
                          <div style={{ width: 9, height: 9, borderRadius: '50%', background: 'var(--color-primary)' }} />
                        )}
                        <button
                          onClick={e => { e.stopPropagation(); deleteNotif(n.id); }}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-3)', display: 'flex', padding: 2, borderRadius: 6, transition: 'color 0.15s' }}
                          onMouseEnter={e => e.currentTarget.style.color = 'var(--color-error)'}
                          onMouseLeave={e => e.currentTarget.style.color = 'var(--color-text-3)'}
                          aria-label="Delete notification"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
