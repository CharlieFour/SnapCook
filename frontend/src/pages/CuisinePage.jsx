import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Search as SearchIcon } from 'lucide-react';
import RecipeCard from '../components/RecipeCard';
import { allRecipes, cuisines, getCuisineEmoji } from '../data/mockData';
import Toast from '../components/Toast';

const sortOptions = ['Top Rated', 'Fastest', 'Fewest Calories', 'Most Popular'];
const mealFilters = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Snacks'];

export default function CuisinePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sort, setSort] = useState('Top Rated');
  const [mealFilter, setMealFilter] = useState('All');
  const [viewMode, setViewMode] = useState('grid');
  const [search, setSearch] = useState('');
  const [toast, setToast] = useState(null);

  const cuisineInfo = cuisines.find(c => c.id === id);

  let recipes = allRecipes.filter(r => r.cuisine === id);

  if (mealFilter !== 'All') {
    const mealMap = { Breakfast: 'breakfast', Lunch: 'lunch', Dinner: 'dinner', Snacks: 'snacks' };
    recipes = recipes.filter(r => r.category === mealMap[mealFilter]);
  }

  if (search) {
    recipes = recipes.filter(r =>
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.tags.some(t => t.includes(search.toLowerCase()))
    );
  }

  recipes = [...recipes].sort((a, b) => {
    if (sort === 'Top Rated') return b.rating - a.rating;
    if (sort === 'Fastest') return a.time - b.time;
    if (sort === 'Fewest Calories') return a.calories - b.calories;
    if (sort === 'Most Popular') return b.reviewCount - a.reviewCount;
    return 0;
  });

  if (!cuisineInfo) {
    return (
      <div className="page animate-fadeUp" style={{ textAlign: 'center', paddingTop: 60 }}>
        <div style={{ fontSize: 48 }}>🍽️</div>
        <h2 style={{ fontFamily: 'var(--font-display)', marginTop: 12 }}>Cuisine not found</h2>
        <button className="btn btn-primary" style={{ marginTop: 20 }} onClick={() => navigate('/explore')}>
          Back to Explore
        </button>
      </div>
    );
  }

  // Pakistani special hero text
  const heroSubtitle = {
    pakistani: 'Rich, bold flavours from the heart of South Asia — from smoky karahis to fragrant biryanis.',
    italian: 'Simple, quality ingredients crafted into timeless dishes — the art of Italian cooking.',
    mexican: 'Vibrant, bold flavours bursting with chillies, lime and fresh herbs.',
    asian: 'A vast tapestry of flavours spanning China, Thailand, Vietnam and beyond.',
    mediterranean: 'Sun-drenched flavours of olive oil, herbs, and fresh produce.',
    indian: 'A symphony of spices layered into complex, deeply satisfying dishes.',
    american: 'Hearty, comforting classics from breakfast tables to backyard grills.',
    french: 'Refined techniques meet rustic charm in the world\'s most celebrated cuisine.',
    japanese: 'Precision, balance, and the philosophy of letting ingredients speak.',
    'middle-eastern': 'Ancient spice routes live in every aromatic, deeply satisfying bite.',
  };

  return (
    <div style={{ background: 'var(--color-bg)', minHeight: '100vh', paddingBottom: 'calc(var(--bottom-nav-h) + 20px)' }}>

      {/* ── HERO HEADER ── */}
      <div style={{ background: cuisineInfo.gradient, position: 'relative', overflow: 'hidden', height: 220 }}>
        {cuisineInfo.image && (
          <img src={cuisineInfo.image} alt={cuisineInfo.label}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
            onError={e => { e.target.style.display = 'none'; }}
          />
        )}
        {/* heavy dark scrim so text is always readable */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.6) 100%)' }} />

        {/* top bar */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px 0' }}>
          <button
            onClick={() => navigate(-1)}
            style={{
              width: 38, height: 38, borderRadius: '50%',
              background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)',
              border: 'none', cursor: 'pointer', color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <ArrowLeft size={18} />
          </button>
          <span style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', borderRadius: 'var(--radius-full)', padding: '5px 12px', fontSize: 'var(--text-xs)', fontWeight: 600, backdropFilter: 'blur(8px)' }}>
            {allRecipes.filter(r => r.cuisine === id).length} recipes
          </span>
        </div>

        {/* title at bottom of hero */}
        <div style={{ position: 'absolute', bottom: 20, left: 20, right: 20 }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 700, color: '#fff', lineHeight: 1.2, marginBottom: 6, textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
            {cuisineInfo.label} Kitchen
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 'var(--text-xs)', lineHeight: 1.5, textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>
            {heroSubtitle[id] || `Explore the best ${cuisineInfo.label} recipes.`}
          </p>
        </div>

        {/* Curved bottom */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 20, background: 'var(--color-bg)', borderRadius: '20px 20px 0 0' }} />
      </div>

      {/* ── SEARCH BAR ── */}
      <div style={{ padding: '16px 16px 0' }}>
        <div style={{ position: 'relative' }}>
          <SearchIcon size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-3)', pointerEvents: 'none' }} />
          <input
            className="input input-with-icon"
            type="text"
            placeholder={`Search ${cuisineInfo.label} recipes…`}
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ borderRadius: 'var(--radius-full)' }}
          />
        </div>
      </div>

      {/* ── MEAL FILTER PILLS ── */}
      <div className="scroll-row" style={{ padding: '12px 16px 0', gap: 8 }}>
        {mealFilters.map(f => (
          <button
            key={f}
            onClick={() => setMealFilter(f)}
            className={`pill-toggle${mealFilter === f ? ' active' : ''}`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* ── SORT + VIEW TOGGLE ── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px 4px' }}>
        <div className="scroll-row" style={{ gap: 6, flex: 1, paddingBottom: 0 }}>
          {sortOptions.map(s => (
            <button
              key={s}
              onClick={() => setSort(s)}
              style={{
                flexShrink: 0, padding: '6px 12px',
                borderRadius: 'var(--radius-full)',
                border: `1.5px solid ${sort === s ? 'var(--color-primary)' : 'var(--color-border)'}`,
                background: sort === s ? 'var(--color-primary)' : 'var(--color-surface)',
                color: sort === s ? '#fff' : 'var(--color-text-2)',
                fontSize: 'var(--text-xs)', fontWeight: 600, cursor: 'pointer',
                fontFamily: 'var(--font-body)', transition: 'all 0.15s',
                whiteSpace: 'nowrap',
              }}
            >
              {s}
            </button>
          ))}
        </div>
        <button
          onClick={() => setViewMode(v => v === 'grid' ? 'list' : 'grid')}
          style={{ marginLeft: 10, padding: '6px 10px', borderRadius: 'var(--radius-xs)', background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--color-text-2)', cursor: 'pointer', fontFamily: 'var(--font-body)', flexShrink: 0 }}
        >
          {viewMode === 'grid' ? '☰' : '⊞'}
        </button>
      </div>

      {/* ── RECIPE COUNT ── */}
      <div style={{ padding: '4px 16px 12px' }}>
        <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-3)', fontWeight: 500 }}>
          {recipes.length} {recipes.length === 1 ? 'recipe' : 'recipes'}
          {mealFilter !== 'All' ? ` · ${mealFilter}` : ''}
          {search ? ` matching "${search}"` : ''}
        </span>
      </div>

      {/* ── RECIPES ── */}
      <div style={{ padding: '0 16px' }}>
        {recipes.length === 0 ? (
          <div className="empty-state animate-fadeIn">
            <div className="empty-state-icon">{cuisineInfo.emoji}</div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 600 }}>No recipes found</h3>
            <p style={{ color: 'var(--color-text-3)', fontSize: 'var(--text-sm)' }}>
              {search ? `No results for "${search}"` : `No ${mealFilter.toLowerCase()} recipes yet`}
            </p>
            <button
              className="btn btn-secondary btn-sm"
              style={{ marginTop: 12 }}
              onClick={() => { setSearch(''); setMealFilter('All'); }}
            >
              Clear filters
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {recipes.map((r, i) => (
              <div key={r.id} className="animate-fadeUp" style={{ animationDelay: `${i * 0.05}s` }}>
                <RecipeCard recipe={r} onSave={() => setToast('Recipe saved! ❤️')} />
              </div>
            ))}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {recipes.map((r, i) => (
              <div key={r.id} className="animate-fadeUp" style={{ animationDelay: `${i * 0.05}s` }}>
                <RecipeCard recipe={r} variant="list" onSave={() => setToast('Recipe saved! ❤️')} />
              </div>
            ))}
          </div>
        )}
      </div>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
