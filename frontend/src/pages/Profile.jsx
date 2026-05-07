import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Settings, Camera, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import RecipeCard from '../components/RecipeCard';
import StarRating from '../components/StarRating';
import { userStats, activityFeed, achievements, allRecipes, mockSnapHistory } from '../data/mockData';

const SNAP_STORAGE_KEY = 'snapcook_snap_history';
const TABS = ['Activity', 'Snaps', 'Saved', 'History'];

function loadSnapHistory() {
  try {
    const stored = JSON.parse(localStorage.getItem(SNAP_STORAGE_KEY) || '[]');
    if (stored.length > 0) return stored;
  } catch {}
  return mockSnapHistory;
}

export default function Profile() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [tab, setTab] = useState('Activity');

  const displayName = user?.displayName || 'SnapCook User';
  const displayEmail = user?.email || '';
  const avatarInitial = displayName.charAt(0).toUpperCase();

  async function handleLogout() {
    try {
      await logout();
      localStorage.removeItem('snapcook_onboarded');
      navigate('/auth', { replace: true });
    } catch (err) {
      console.error('Logout error:', err);
    }
  }
  const savedRecipes = allRecipes.slice(0, 4);
  const snapHistory = loadSnapHistory();

  return (
    <div style={{ paddingBottom: 'calc(var(--bottom-nav-h) + 20px)', background: 'var(--color-bg)' }}>

      {/* ── PROFILE HEADER ── */}
      <div className="animate-fadeUp" style={{ background: 'var(--color-surface)', padding: '24px 16px 0', borderBottom: '1px solid var(--color-border)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {/* Avatar */}
            <div style={{
              width: 72, height: 72, borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent-2))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 28, fontWeight: 700, color: '#fff',
              boxShadow: 'var(--shadow-md)',
              border: '3px solid var(--color-surface)',
            }}>
              {avatarInitial}
            </div>
            <div>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', fontWeight: 700, color: 'var(--color-text)', lineHeight: 1.2 }}>{displayName}</h1>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-3)', marginTop: 2 }}>{displayEmail}</p>
              <button onClick={() => navigate('/settings/edit-profile')} style={{ fontSize: 'var(--text-xs)', color: 'var(--color-primary)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0', fontFamily: 'var(--font-body)' }}>
                Edit Profile
              </button>
            </div>
          </div>
          <button className="btn-icon" onClick={() => navigate('/settings')}>
            <Settings size={18} />
          </button>
        </div>

        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 16 }}>
          {[
            { value: userStats.recipiesTried, label: 'Tried' },
            { value: userStats.savedRecipes, label: 'Saved' },
            { value: `${userStats.streak}🔥`, label: 'Day Streak' },
          ].map(s => (
            <div key={s.label} style={{ textAlign: 'center', padding: '10px 4px' }}>
              <div style={{ fontSize: 'var(--text-xl)', fontWeight: 700, color: 'var(--color-text)' }}>{s.value}</div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-3)' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Achievement badges */}
        <div style={{ marginBottom: 16 }}>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-3)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 10 }}>Achievements</p>
          <div style={{ display: 'flex', gap: 10 }}>
            {achievements.map(a => (
              <div key={a.id} style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                opacity: a.earned ? 1 : 0.35,
              }}>
                <div style={{
                  width: 46, height: 46, borderRadius: '50%',
                  background: a.earned ? 'var(--color-warning-light)' : 'var(--color-surface-2)',
                  border: `2px solid ${a.earned ? 'var(--color-warning)' : 'var(--color-border)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 22,
                }}>
                  {a.icon}
                </div>
                <span style={{ fontSize: 9, color: 'var(--color-text-3)', textAlign: 'center', lineHeight: 1.2, maxWidth: 46 }}>{a.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', borderTop: '1px solid var(--color-border)', marginTop: 4, overflowX: 'auto', scrollbarWidth: 'none' }}>
          {TABS.map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                flex: '1 0 auto', padding: '12px 12px',
                fontSize: 'var(--text-sm)', fontWeight: 600,
                color: tab === t ? 'var(--color-primary)' : 'var(--color-text-3)',
                background: 'none', border: 'none', cursor: 'pointer',
                borderBottom: `2px solid ${tab === t ? 'var(--color-primary)' : 'transparent'}`,
                transition: 'all 0.15s', fontFamily: 'var(--font-body)',
                whiteSpace: 'nowrap',
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* ── TAB CONTENT ── */}
      <div style={{ padding: '16px', animation: 'fadeUp 0.3s ease' }}>

        {/* ACTIVITY */}
        {tab === 'Activity' && (
          <div>
            {activityFeed.map((item, i) => (
              <div key={item.id} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '14px 0',
                borderBottom: i < activityFeed.length - 1 ? '1px solid var(--color-border)' : 'none',
              }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 'var(--radius-xs)', flexShrink: 0,
                  background: item.action === 'Cooked' ? 'var(--color-primary-light)' : 'var(--color-accent-light)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 18,
                }}>
                  {item.action === 'Cooked' ? '🍳' : '❤️'}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-text)', marginBottom: 2 }}>
                    {item.action} <span style={{ color: 'var(--color-primary)' }}>{item.recipe}</span>
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-3)' }}>{item.date}</p>
                    {item.rating && <StarRating rating={item.rating} size={10} />}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* SNAPS */}
        {tab === 'Snaps' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {snapHistory.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 16px' }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>📷</div>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 600, color: 'var(--color-text)', marginBottom: 6 }}>No snaps yet</p>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-3)', marginBottom: 20 }}>Take a photo of your ingredients and we'll generate recipes!</p>
                <button className="btn btn-primary btn-sm" onClick={() => navigate('/snap')}>
                  <Camera size={14} /> Snap Now
                </button>
              </div>
            ) : snapHistory.map(session => {
              const recipes = session.recipeIds.map(rid => allRecipes.find(r => r.id === rid)).filter(Boolean);
              return (
                <div key={session.id} style={{
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-sm)',
                }}>
                  {/* Session header */}
                  <div style={{
                    background: 'var(--color-surface-2)',
                    padding: '12px 14px',
                    borderBottom: '1px solid var(--color-border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{
                        width: 32, height: 32, borderRadius: 8,
                        background: 'var(--color-primary-light)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <Camera size={14} color="var(--color-primary)" />
                      </div>
                      <div>
                        <p style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--color-text)' }}>{session.label}</p>
                        <p style={{ fontSize: 10, color: 'var(--color-text-3)' }}>
                          {session.meal} · {session.diet} · {session.servings} {session.servings === 1 ? 'serving' : 'servings'}
                        </p>
                      </div>
                    </div>
                    <span style={{
                      fontSize: 10, fontWeight: 700, padding: '3px 8px',
                      borderRadius: 'var(--radius-full)',
                      background: 'var(--color-primary-light)', color: 'var(--color-primary)',
                    }}>
                      {recipes.length} recipes
                    </span>
                  </div>

                  {/* Ingredients row */}
                  {session.ingredients && (
                    <div style={{ padding: '8px 14px', borderBottom: '1px solid var(--color-border)', display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                      {session.ingredients.map(ing => (
                        <span key={ing} style={{
                          fontSize: 10, padding: '2px 8px', borderRadius: 'var(--radius-full)',
                          background: 'var(--color-surface-2)', border: '1px solid var(--color-border)',
                          color: 'var(--color-text-2)',
                        }}>
                          {ing}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Recipe results */}
                  {recipes.map((r, i) => (
                    <div
                      key={r.id}
                      onClick={() => navigate(`/recipe/${r.id}`)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 12,
                        padding: '12px 14px',
                        borderBottom: i < recipes.length - 1 ? '1px solid var(--color-border)' : 'none',
                        cursor: 'pointer', transition: 'background 0.15s',
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = 'var(--color-surface-2)'}
                      onMouseLeave={e => e.currentTarget.style.background = ''}
                    >
                      <div style={{
                        width: 48, height: 48, borderRadius: 10, flexShrink: 0,
                        background: r.gradient || 'var(--color-surface-2)',
                        overflow: 'hidden', position: 'relative',
                      }}>
                        {r.image
                          ? <img src={r.image} alt={r.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} onError={e => { e.target.style.display = 'none'; }} />
                          : <span style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>🍽️</span>
                        }
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-text)', marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {r.title}
                        </p>
                        <p style={{ fontSize: 10, color: 'var(--color-text-3)' }}>
                          ⏱ {r.time} min · ⭐ {r.rating} · {r.calories} kcal
                        </p>
                      </div>
                      <ChevronRight size={14} color="var(--color-text-3)" />
                    </div>
                  ))}
                </div>
              );
            })}

            <button
              onClick={() => navigate('/snap')}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                padding: '13px', borderRadius: 'var(--radius-md)',
                border: '1.5px dashed var(--color-primary)',
                background: 'var(--color-primary-light)',
                color: 'var(--color-primary)', fontWeight: 600,
                fontSize: 'var(--text-sm)', cursor: 'pointer',
                fontFamily: 'var(--font-body)',
              }}
            >
              <Camera size={16} /> New Snap
            </button>
          </div>
        )}

        {/* SAVED */}
        {tab === 'Saved' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {savedRecipes.map(r => <RecipeCard key={r.id} recipe={r} saved />)}
          </div>
        )}

        {/* HISTORY */}
        {tab === 'History' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {activityFeed.filter(a => a.action === 'Cooked').map(item => (
              <div key={item.id} style={{
                background: 'var(--color-surface)', border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)', padding: '14px 16px',
                display: 'flex', alignItems: 'center', gap: 12,
                boxShadow: 'var(--shadow-sm)',
              }}>
                <div style={{ width: 40, height: 40, borderRadius: 8, background: 'var(--color-primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
                  🍳
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontWeight: 600, fontSize: 'var(--text-sm)', color: 'var(--color-text)', marginBottom: 2 }}>{item.recipe}</p>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-3)' }}>{item.date}</p>
                </div>
                {item.rating && <StarRating rating={item.rating} size={13} />}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── LOGOUT ── */}
      <div style={{ padding: '8px 16px 0' }}>
        <div style={{ height: 1, background: 'var(--color-border)', marginBottom: 16 }} />
        <button
          onClick={handleLogout}
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            fontSize: 'var(--text-sm)', color: 'var(--color-text-3)',
            background: 'none', border: 'none', cursor: 'pointer',
            fontFamily: 'var(--font-body)', padding: '8px 0',
          }}
        >
          <LogOut size={16} /> Log Out
        </button>
      </div>
    </div>
  );
}
