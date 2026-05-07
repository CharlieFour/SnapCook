import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Clock } from 'lucide-react';
import RecipeCard from '../components/RecipeCard';
import SectionHeader from '../components/SectionHeader';
import StarRating from '../components/StarRating';
import Toast from '../components/Toast';
import {
  categories, cuisines, chefTips, allRecipes,
  trendingRecipes, quickRecipes, featuredRecipe,
  weekPlan, userStats,
} from '../data/mockData';

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

export default function Home() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');
  const [toast, setToast] = useState(null);

  const days = Object.keys(weekPlan);
  const today = days[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1] || 'Mon';
  const todayPlan = weekPlan[today];

  // Category filter for the featured section below category pills
  const categoryFiltered = activeCategory === 'all'
    ? allRecipes.slice(0, 6)
    : activeCategory === 'quick'
    ? allRecipes.filter(r => r.time < 30).slice(0, 6)
    : activeCategory === 'vegan'
    ? allRecipes.filter(r => r.tags.includes('vegan')).slice(0, 6)
    : allRecipes.filter(r => r.category === activeCategory).slice(0, 6);

  return (
    <div style={{ paddingBottom: 'calc(var(--bottom-nav-h) + 20px)', background: 'var(--color-bg)' }}>

      {/* ── A. GREETING HEADER ── */}
      <div className="animate-fadeUp" style={{ padding: '20px 16px 4px' }}>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-3)', fontWeight: 500, marginBottom: 2 }}>
          {getGreeting()},
        </p>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 700, color: 'var(--color-text)', lineHeight: 1.2 }}>
          Rafay! 👋
        </h1>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-2)', marginTop: 2 }}>What are you cooking today?</p>
      </div>

      {/* ── B. HERO SNAP BANNER ── */}
      <div className="animate-fadeUp delay-1" style={{ margin: '16px 16px 0', position: 'relative', overflow: 'hidden', borderRadius: 'var(--radius-lg)', background: 'linear-gradient(135deg, #C84B31 0%, #A33A23 60%, #8A2E1A 100%)', padding: '24px 20px 24px', minHeight: 150, cursor: 'pointer' }}
        onClick={() => navigate('/snap')}
      >
        {['🥕', '🧅', '🍅'].map((em, i) => (
          <span key={i} style={{ position: 'absolute', fontSize: 32 + i * 8, opacity: 0.25, top: 8 + i * 18, right: 16 + i * 24, transform: `rotate(${-10 + i * 15}deg)`, userSelect: 'none', pointerEvents: 'none' }}>{em}</span>
        ))}
        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 'var(--text-sm)', fontWeight: 500, marginBottom: 4 }}>Got ingredients?</p>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', color: '#fff', fontWeight: 700, marginBottom: 16, lineHeight: 1.2 }}>
          Snap & Cook<br />in seconds
        </h2>
        <button
          onClick={e => { e.stopPropagation(); navigate('/snap'); }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: '#fff', color: 'var(--color-primary)',
            padding: '10px 20px', borderRadius: 'var(--radius-full)',
            fontSize: 'var(--text-sm)', fontWeight: 700,
            border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)',
            boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
          }}
        >
          <Camera size={16} /> Snap Now
        </button>
      </div>

      {/* ── C. QUICK STATS ── */}
      <div className="animate-fadeUp delay-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, margin: '16px 16px 0' }}>
        {[
          { icon: '🍳', value: userStats.recipiesTried, label: 'Tried', action: () => navigate('/profile') },
          { icon: '❤️', value: userStats.savedRecipes, label: 'Saved', action: () => navigate('/profile') },
          { icon: '📅', value: userStats.weeklyMeals, label: 'This Week', action: () => navigate('/meal-planner') },
        ].map(stat => (
          <div
            key={stat.label}
            onClick={stat.action}
            style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              padding: '14px 10px', textAlign: 'center',
              boxShadow: 'var(--shadow-sm)',
              cursor: 'pointer', transition: 'transform 0.15s',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={e => e.currentTarget.style.transform = ''}
          >
            <div style={{ fontSize: 22, marginBottom: 4 }}>{stat.icon}</div>
            <div style={{ fontSize: 'var(--text-xl)', fontWeight: 700, color: 'var(--color-text)', lineHeight: 1 }}>{stat.value}</div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-3)', marginTop: 2 }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* ── D. CATEGORY PILLS ── */}
      <div className="animate-fadeUp delay-2" style={{ marginTop: 20 }}>
        <div className="scroll-row" style={{ padding: '0 16px' }}>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`pill-toggle${activeCategory === cat.id ? ' active' : ''}`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── CATEGORY RESULTS (when not "all") ── */}
      {activeCategory !== 'all' && (
        <div className="animate-fadeUp" style={{ margin: '16px 16px 0' }}>
          <SectionHeader
            title={`${categories.find(c => c.id === activeCategory)?.label ?? ''} Recipes`}
            linkTo={`/recipes?category=${activeCategory}`}
          />
          {categoryFiltered.length === 0 ? (
            <p style={{ color: 'var(--color-text-3)', fontSize: 'var(--text-sm)', textAlign: 'center', padding: '24px 0' }}>
              No recipes found in this category yet.
            </p>
          ) : (
            <div className="scroll-row">
              {categoryFiltered.map(r => (
                <RecipeCard key={r.id} recipe={r} variant="portrait" onSave={() => setToast('Recipe saved! ❤️')} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── E. FEATURED RECIPE ── */}
      <div className="animate-fadeUp delay-3" style={{ margin: '20px 16px 0' }}>
        <SectionHeader title="⭐ Featured" />
        <div
          onClick={() => navigate(`/recipe/${featuredRecipe.id}`)}
          style={{
            borderRadius: 'var(--radius-lg)', overflow: 'hidden',
            background: featuredRecipe.gradient,
            position: 'relative', cursor: 'pointer', minHeight: 200,
            display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
            boxShadow: 'var(--shadow-md)',
            transition: 'transform 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.01)'}
          onMouseLeave={e => e.currentTarget.style.transform = ''}
        >
          {featuredRecipe.image && (
            <img src={featuredRecipe.image} alt={featuredRecipe.title}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
              onError={e => { e.target.style.display = 'none'; }}
            />
          )}
          <div style={{ position: 'relative', background: 'linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.1) 70%, transparent 100%)', padding: '20px 16px 16px' }}>
            <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
              <span className="badge badge-warning"><Clock size={10} /> {featuredRecipe.time} min</span>
              <span className="badge badge-primary">{featuredRecipe.difficulty}</span>
            </div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', color: '#fff', fontWeight: 700, marginBottom: 8, lineHeight: 1.2 }}>
              {featuredRecipe.title}
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <StarRating rating={featuredRecipe.rating} size={14} />
                <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: 'var(--text-sm)' }}>{featuredRecipe.rating} ({featuredRecipe.reviewCount})</span>
              </div>
              <button
                onClick={e => { e.stopPropagation(); navigate(`/recipe/${featuredRecipe.id}`); }}
                style={{
                  background: '#fff', color: 'var(--color-primary)',
                  padding: '8px 16px', borderRadius: 'var(--radius-full)',
                  fontSize: 'var(--text-sm)', fontWeight: 700,
                  border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)',
                }}
              >
                Cook Now →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── F. TRENDING THIS WEEK ── */}
      <div className="animate-fadeUp delay-3" style={{ marginTop: 28, paddingLeft: 16 }}>
        <div style={{ paddingRight: 16 }}>
          <SectionHeader title="Trending 🔥" linkTo="/recipes" />
        </div>
        <div className="scroll-row" style={{ paddingRight: 16 }}>
          {trendingRecipes.map(r => (
            <RecipeCard key={r.id} recipe={r} variant="portrait" onSave={() => setToast('Recipe saved! ❤️')} />
          ))}
        </div>
      </div>

      {/* ── G. QUICK & EASY ── */}
      <div className="animate-fadeUp delay-4" style={{ marginTop: 28, paddingLeft: 16 }}>
        <div style={{ paddingRight: 16 }}>
          <SectionHeader title="Under 30 Min ⚡" linkTo="/recipes" />
        </div>
        <div className="scroll-row" style={{ paddingRight: 16 }}>
          {quickRecipes.map(r => (
            <RecipeCard key={r.id} recipe={r} variant="portrait" onSave={() => setToast('Recipe saved! ❤️')} />
          ))}
        </div>
      </div>

      {/* ── H. CHEF TIPS ── */}
      <div className="animate-fadeUp delay-4" style={{ margin: '28px 16px 0' }}>
        <SectionHeader title="Chef's Corner 💡" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {chefTips.slice(0, 3).map(tip => (
            <div key={tip.id} style={{
              display: 'flex', gap: 14, alignItems: 'flex-start',
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)', padding: '14px 14px',
              boxShadow: 'var(--shadow-sm)',
            }}>
              <div style={{ width: 44, height: 44, flexShrink: 0, background: 'var(--color-surface-2)', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>
                {tip.icon}
              </div>
              <div>
                <p style={{ fontWeight: 600, fontSize: 'var(--text-base)', color: 'var(--color-text)', marginBottom: 3 }}>{tip.title}</p>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-2)', lineHeight: 1.5 }}>{tip.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── I. EXPLORE CUISINES ── */}
      <div className="animate-fadeUp delay-5" style={{ margin: '28px 16px 0' }}>
        <SectionHeader title="Explore Cuisines 🌍" linkTo="/explore" />
        {/* Pakistani featured row */}
        {(() => { const pk = cuisines.find(c => c.id === 'pakistani'); return (
        <div
          onClick={() => navigate('/cuisine/pakistani')}
          style={{
            borderRadius: 'var(--radius-md)', background: pk?.gradient || 'linear-gradient(135deg,#1A5C28,#4AAA5C)',
            marginBottom: 10, cursor: 'pointer', minHeight: 90,
            boxShadow: 'var(--shadow-sm)', transition: 'transform 0.2s',
            position: 'relative', overflow: 'hidden',
            display: 'flex', alignItems: 'flex-end',
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
          onMouseLeave={e => e.currentTarget.style.transform = ''}
        >
          {pk?.image && <img src={pk.image} alt="Pakistani" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} onError={e => { e.target.style.display = 'none'; }} />}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.2) 100%)' }} />
          <div style={{ position: 'relative', padding: '16px 18px', flex: 1 }}>
            <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: '#fff', fontSize: 'var(--text-md)', marginBottom: 2, textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>Pakistani Kitchen</p>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 'var(--text-xs)' }}>Biryani, Karahi, Nihari & more · 8 recipes</p>
          </div>
          <span style={{ position: 'absolute', top: 10, right: 10, background: 'rgba(255,255,255,0.2)', color: '#fff', borderRadius: 'var(--radius-full)', padding: '4px 10px', fontSize: 'var(--text-xs)', fontWeight: 600, backdropFilter: 'blur(4px)' }}>NEW</span>
        </div>
        ); })()}
        {/* 2×2 grid for other cuisines */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {cuisines.filter(c => c.id !== 'pakistani').slice(0, 4).map(c => (
            <div
              key={c.id}
              onClick={() => navigate(`/cuisine/${c.id}`)}
              style={{
                borderRadius: 'var(--radius-md)', overflow: 'hidden',
                background: c.gradient, cursor: 'pointer',
                minHeight: 88, boxShadow: 'var(--shadow-sm)',
                transition: 'transform 0.2s', position: 'relative',
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
              onMouseLeave={e => e.currentTarget.style.transform = ''}
            >
              {c.image && <img src={c.image} alt={c.label} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} onError={e => { e.target.style.display = 'none'; }} />}
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '10px 12px' }}>
                <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: '#fff', fontSize: 'var(--text-sm)', textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>{c.label}</p>
                <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 10 }}>{c.count} recipes</p>
              </div>
            </div>
          ))}
        </div>
        {/* See all cuisines button */}
        <button
          onClick={() => navigate('/explore')}
          style={{
            marginTop: 10, width: '100%', padding: '12px',
            borderRadius: 'var(--radius-md)',
            border: '1.5px solid var(--color-border)',
            background: 'var(--color-surface)',
            fontSize: 'var(--text-sm)', fontWeight: 600,
            color: 'var(--color-text-2)', cursor: 'pointer',
            fontFamily: 'var(--font-body)', transition: 'background 0.15s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--color-surface-2)'}
          onMouseLeave={e => e.currentTarget.style.background = 'var(--color-surface)'}
        >
          See all cuisines →
        </button>
      </div>

      {/* ── J. MEAL PLAN PREVIEW ── */}
      <div className="animate-fadeUp delay-5" style={{ margin: '28px 16px 0' }}>
        <SectionHeader title="Today's Plan 📋" linkTo="/meal-planner" linkLabel="Edit Plan" />
        <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
          {['breakfast', 'lunch', 'dinner'].map((meal, i) => {
            const recipe = todayPlan?.[meal];
            return (
              <div
                key={meal}
                onClick={() => recipe ? navigate(`/recipe/${recipe.id}`) : navigate('/meal-planner')}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '14px 16px',
                  borderBottom: i < 2 ? '1px solid var(--color-border)' : 'none',
                  cursor: 'pointer', transition: 'background 0.15s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--color-surface-2)'}
                onMouseLeave={e => e.currentTarget.style.background = ''}
              >
                <div style={{ fontSize: 20, width: 28, textAlign: 'center' }}>
                  {meal === 'breakfast' ? '☀️' : meal === 'lunch' ? '🌤️' : '🌙'}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-3)', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.5px', marginBottom: 2 }}>{meal}</p>
                  {recipe
                    ? <p style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-text)' }}>{recipe.title}</p>
                    : <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-3)', fontStyle: 'italic' }}>Not planned yet — tap to add</p>
                  }
                </div>
                {recipe && <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-3)' }}>{recipe.calories} kcal</span>}
                {!recipe && (
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-primary)', fontWeight: 600 }}>+ Add</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── K. PAKISTANI SPOTLIGHT ── */}
      <div className="animate-fadeUp delay-5" style={{ margin: '28px 16px 0' }}>
        <SectionHeader title="Pakistani Favourites 🇵🇰" linkTo="/cuisine/pakistani" linkLabel="See All" />
        <div className="scroll-row">
          {allRecipes.filter(r => r.cuisine === 'pakistani').slice(0, 4).map(r => (
            <RecipeCard key={r.id} recipe={r} variant="portrait" onSave={() => setToast('Recipe saved! ❤️')} />
          ))}
        </div>
      </div>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
