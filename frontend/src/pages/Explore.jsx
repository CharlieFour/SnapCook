import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search as SearchIcon, TrendingUp, ChevronRight } from 'lucide-react';
import { cuisines, collections, allRecipes } from '../data/mockData';
import RecipeCard from '../components/RecipeCard';
import Toast from '../components/Toast';

const dietFilters = [
  { id: 'all',        label: 'All' },
  { id: 'vegetarian', label: '🌿 Vegetarian' },
  { id: 'vegan',      label: '🥦 Vegan' },
  { id: 'quick',      label: '⚡ Under 30 min' },
  { id: 'highprotein',label: '💪 High Protein' },
];

const quickPicks = [
  { label: 'Under 20 min',  emoji: '⏱️', color: '#FBE9BC', filter: { maxTime: 20 } },
  { label: 'Under 500 kcal',emoji: '🥗', color: '#C5DAC9', filter: { maxCal: 500 } },
  { label: '5 ingredients', emoji: '🧩', color: '#F0C4BA', filter: { simple: true } },
  { label: 'One pot meals', emoji: '🥘', color: '#F0D9C8', filter: { tag: 'one-pot' } },
];

function applyDiet(recipes, diet) {
  if (diet === 'all') return recipes;
  if (diet === 'vegan')       return recipes.filter(r => r.tags.includes('vegan'));
  if (diet === 'vegetarian')  return recipes.filter(r => r.tags.includes('vegetarian') || r.tags.includes('vegan'));
  if (diet === 'quick')       return recipes.filter(r => r.time < 30);
  if (diet === 'highprotein') return recipes.filter(r => r.macros?.protein >= 30);
  return recipes;
}

export default function Explore() {
  const navigate = useNavigate();
  const [diet, setDiet] = useState('all');
  const [toast, setToast] = useState(null);

  const dietRecipes = applyDiet(allRecipes, diet)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6);

  return (
    <div style={{ paddingBottom: 'calc(var(--bottom-nav-h) + 20px)' }}>

      {/* ── STICKY SEARCH + DIET FILTER ── */}
      <div style={{
        position: 'sticky', top: 60, zIndex: 10,
        background: 'var(--color-bg)',
        borderBottom: '1px solid var(--color-border)',
        padding: '12px 16px 0',
      }}>
        {/* Tappable search bar — opens search page */}
        <div
          onClick={() => navigate('/search')}
          style={{
            display: 'flex', alignItems: 'center', gap: 10,
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-full)',
            padding: '11px 16px',
            cursor: 'pointer',
            marginBottom: 10,
            boxShadow: 'var(--shadow-sm)',
            transition: 'box-shadow 0.15s, border-color 0.15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-primary)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}
        >
          <SearchIcon size={16} color="var(--color-text-3)" />
          <span style={{ fontSize: 'var(--text-base)', color: 'var(--color-text-3)', fontFamily: 'var(--font-body)' }}>
            Search cuisines &amp; recipes…
          </span>
        </div>
        <div className="scroll-row" style={{ paddingBottom: 12, gap: 8 }}>
          {dietFilters.map(d => (
            <button key={d.id} onClick={() => setDiet(d.id)} className={`pill-toggle${diet === d.id ? ' active' : ''}`}>
              {d.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: '20px 16px 0' }}>

        {/* ── CUISINES GRID ── */}
        <div className="animate-fadeUp" style={{ marginBottom: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 600 }}>
              Cuisines 🌍
            </h2>
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-3)' }}>
              {cuisines.length} cuisines
            </span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
              {cuisines.map((c, i) => (
                <div
                  key={c.id}
                  onClick={() => navigate(`/cuisine/${c.id}`)}
                  className="animate-fadeUp"
                  style={{
                    animationDelay: `${i * 0.04}s`,
                    borderRadius: 'var(--radius-md)', overflow: 'hidden',
                    background: c.gradient, cursor: 'pointer',
                    aspectRatio: '1 / 1',
                    boxShadow: 'var(--shadow-sm)',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    position: 'relative',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.04)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}
                >
                  {c.image && (
                    <img src={c.image} alt={c.label}
                      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={e => { e.target.style.display = 'none'; }}
                    />
                  )}
                  {/* dark scrim — heavy at bottom so label is always readable */}
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.15) 55%, transparent 100%)' }} />
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '10px 8px' }}>
                    <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: '#fff', fontSize: 'var(--text-xs)', lineHeight: 1.2, textShadow: '0 1px 4px rgba(0,0,0,0.6)' }}>{c.label}</p>
                    <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 9, marginTop: 1 }}>{c.count} recipes</p>
                  </div>
                </div>
              ))}
            </div>
        </div>

        {/* ── DIET-FILTERED RESULTS (when a filter is active) ── */}
        {diet !== 'all' && (
          <div className="animate-fadeUp" style={{ marginBottom: 28 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 600 }}>
                {dietFilters.find(d => d.id === diet)?.label} Recipes
              </h2>
              <button
                onClick={() => navigate(`/recipes?category=${diet}`)}
                style={{ fontSize: 'var(--text-xs)', color: 'var(--color-primary)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', display: 'flex', alignItems: 'center', gap: 2 }}
              >
                See all <ChevronRight size={12} />
              </button>
            </div>
            {dietRecipes.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '24px 0', color: 'var(--color-text-3)' }}>
                <p style={{ fontSize: 'var(--text-sm)' }}>No recipes found for this filter</p>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {dietRecipes.map((r, i) => (
                  <div key={r.id} className="animate-fadeUp" style={{ animationDelay: `${i * 0.05}s` }}>
                    <RecipeCard recipe={r} onSave={() => setToast('Recipe saved! ❤️')} />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── POPULAR COLLECTIONS ── */}
        <div className="animate-fadeUp delay-1" style={{ marginBottom: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 600 }}>
              Collections 🗂️
            </h2>
          </div>
          <div className="scroll-row" style={{ gap: 10 }}>
            {collections.map(col => (
              <div
                key={col.id}
                onClick={() => navigate(`/recipes?category=${col.id}`)}
                style={{
                  flexShrink: 0, width: 130,
                  background: col.color,
                  borderRadius: 'var(--radius-md)',
                  padding: '16px 14px',
                  cursor: 'pointer',
                  border: '1px solid var(--color-border)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  boxShadow: 'var(--shadow-sm)',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}
              >
                <div style={{ fontSize: 28, marginBottom: 8 }}>{col.emoji}</div>
                <p style={{ fontWeight: 600, fontSize: 'var(--text-sm)', color: 'var(--color-text)', lineHeight: 1.3, fontFamily: 'var(--font-body)' }}>{col.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── QUICK PICKS ── */}
        <div className="animate-fadeUp delay-2" style={{ marginBottom: 28 }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 600, marginBottom: 14 }}>
            Quick Picks ⚡
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {quickPicks.map(p => (
              <div
                key={p.label}
                onClick={() => {
                  if (p.filter.maxTime) navigate(`/recipes?maxTime=${p.filter.maxTime}`);
                  else if (p.filter.maxCal) navigate(`/recipes?maxCal=${p.filter.maxCal}`);
                  else navigate('/recipes');
                }}
                style={{
                  background: p.color, borderRadius: 'var(--radius-md)',
                  padding: '18px 14px', cursor: 'pointer',
                  border: '1px solid var(--color-border)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  boxShadow: 'var(--shadow-sm)',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.02)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}
              >
                <div style={{ fontSize: 28, marginBottom: 8 }}>{p.emoji}</div>
                <p style={{ fontWeight: 600, fontSize: 'var(--text-sm)', color: 'var(--color-text)', fontFamily: 'var(--font-body)' }}>{p.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── TRENDING THIS WEEK ── */}
        <div className="animate-fadeUp delay-3" style={{ marginBottom: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 14 }}>
            <TrendingUp size={16} color="var(--color-primary)" />
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 600 }}>
              Trending This Week
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {allRecipes
              .sort((a, b) => b.reviewCount - a.reviewCount)
              .slice(0, 4)
              .map((r, i) => (
                <div key={r.id} className="animate-fadeUp" style={{ animationDelay: `${i * 0.05}s` }}>
                  <RecipeCard recipe={r} variant="list" onSave={() => setToast('Recipe saved! ❤️')} />
                </div>
              ))
            }
          </div>
        </div>

      </div>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
