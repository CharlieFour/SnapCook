import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import RecipeCard from '../components/RecipeCard';
import { allRecipes } from '../data/mockData';
import Toast from '../components/Toast';

const sortOptions = ['Best Match', 'Fastest', 'Top Rated', 'Fewest Calories'];

export default function Recipes() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isAi = searchParams.get('ai');
  const cuisineParam = searchParams.get('cuisine');
  const categoryParam = searchParams.get('category');

  const [viewMode, setViewMode] = useState('grid');
  const [sort, setSort] = useState('Best Match');
  const [toast, setToast] = useState(null);
  const [loading] = useState(false);

  let filtered = [...allRecipes];
  if (isAi) {
    try {
      const stored = localStorage.getItem('AI_RECOMMENDATIONS');
      if (stored) {
        filtered = JSON.parse(stored);
      }
    } catch (e) {
      console.error(e);
    }
  } else {
    if (cuisineParam) filtered = filtered.filter(r => r.cuisine === cuisineParam);
    if (categoryParam) filtered = filtered.filter(r => r.category === categoryParam);
  }

  const sorted = filtered.sort((a, b) => {
    if (sort === 'Fastest') return a.time - b.time;
    if (sort === 'Top Rated') return b.rating - a.rating;
    if (sort === 'Fewest Calories') return a.calories - b.calories;
    return 0;
  });

  const pageTitle = cuisineParam
    ? `${cuisineParam.charAt(0).toUpperCase() + cuisineParam.slice(1)} Recipes`
    : categoryParam
    ? `${categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1)} Recipes`
    : 'Found Recipes';

  const pageSubtitle = cuisineParam || categoryParam
    ? `${sorted.length} recipes found`
    : 'Based on your snapped ingredients';

  function handleSave(id, saved) {
    setToast(saved ? 'Recipe saved! ❤️' : 'Removed from saved');
  }

  return (
    <div className="page animate-fadeUp">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
        <button className="btn-icon" onClick={() => navigate(-1)}>
          <ArrowLeft size={18} />
        </button>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', fontWeight: 700 }}>{pageTitle}</h1>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-2)' }}>{pageSubtitle}</p>
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-2)', fontWeight: 500 }}>
          {sorted.length} {sorted.length === 1 ? 'recipe' : 'recipes'} found
        </span>
        <button
          onClick={() => setViewMode(v => v === 'grid' ? 'list' : 'grid')}
          style={{
            padding: '6px 12px', borderRadius: 'var(--radius-xs)',
            background: 'var(--color-surface-2)', border: '1px solid var(--color-border)',
            fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--color-text-2)',
            cursor: 'pointer', fontFamily: 'var(--font-body)',
          }}
        >
          {viewMode === 'grid' ? '☰ List' : '⊞ Grid'}
        </button>
      </div>

      {/* Sort pills */}
      <div className="scroll-row" style={{ marginBottom: 16 }}>
        {sortOptions.map(s => (
          <button key={s} onClick={() => setSort(s)} className={`pill-toggle${sort === s ? ' active' : ''}`} style={{ fontSize: 'var(--text-xs)' }}>
            {s}
          </button>
        ))}
      </div>

      {/* Skeletons */}
      {loading ? (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {Array(6).fill(0).map((_, i) => (
            <div key={i}>
              <div className="skeleton" style={{ height: 120, borderRadius: 'var(--radius-md)', marginBottom: 8 }} />
              <div className="skeleton" style={{ height: 14, width: '80%', marginBottom: 6 }} />
              <div className="skeleton" style={{ height: 12, width: '50%' }} />
            </div>
          ))}
        </div>
      ) : viewMode === 'grid' ? (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {sorted.map(r => <RecipeCard key={r.id} recipe={r} onSave={handleSave} />)}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {sorted.map(r => <RecipeCard key={r.id} recipe={r} variant="list" onSave={handleSave} />)}
        </div>
      )}

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
