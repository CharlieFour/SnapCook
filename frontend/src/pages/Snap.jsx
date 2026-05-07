import { useState, useRef } from 'react';
import { Camera, Upload, X, ArrowRight, Minus, Plus, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SNAP_STORAGE_KEY = 'snapcook_snap_history';
const dietOptions = ['All', 'Vegetarian', 'Vegan', 'Keto', 'Gluten-Free'];
const mealOptions = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];

function saveSnapSession(diet, meal, servings, ingredients, recipeIds) {
  const now = new Date();
  const label = now.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) + ', ' +
    now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  const session = {
    id: `s_${Date.now()}`,
    label,
    diet,
    meal,
    servings,
    ingredients: ingredients || [],
    recipeIds: recipeIds || [],
  };
  const existing = JSON.parse(localStorage.getItem(SNAP_STORAGE_KEY) || '[]');
  const updated = [session, ...existing].slice(0, 20);
  localStorage.setItem(SNAP_STORAGE_KEY, JSON.stringify(updated));
}

export default function Snap() {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [diet, setDiet] = useState('All');
  const [meal, setMeal] = useState('Dinner');
  const [servings, setServings] = useState(2);
  const fileRef = useRef();
  const cameraRef = useRef();

  const [imageFile, setImageFile] = useState(null);

  function handleFile(e) {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImage(URL.createObjectURL(file));
    }
  }

  const [loading, setLoading] = useState(false);

  async function handleFindRecipes() {
    if (!imageFile) return;
    setLoading(true);
    
    try {
      const formData = new FormData();
      formData.append('image', imageFile);
      
      const res = await fetch('/api/snap', {
        method: 'POST',
        body: formData,
      });
      
      if (!res.ok) throw new Error('Failed to analyze image');
      
      const data = await res.json();
      
      // Save session with real AI-detected ingredients and recipe IDs
      const recipeIds = (data.recipes || []).map(r => r.id);
      saveSnapSession(diet, meal, servings, data.ingredients || [], recipeIds);
      
      // Store AI recommendations in local storage
      localStorage.setItem('AI_RECOMMENDATIONS', JSON.stringify(data.recipes));
      
      navigate('/recipes?ai=true');
    } catch (err) {
      console.error(err);
      alert('Error analyzing image. Make sure the AI backend is running on port 3002.');
      setLoading(false);
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--color-bg)',
      display: 'flex',
      flexDirection: 'column',
      paddingBottom: 'calc(var(--bottom-nav-h) + 16px)',
    }}>
      {/* ── HEADER ── */}
      <div style={{ padding: '20px 16px 0' }} className="animate-fadeUp">
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 700, marginBottom: 4 }}>
          Snap Ingredients
        </h1>
        <p style={{ color: 'var(--color-text-2)', fontSize: 'var(--text-sm)' }}>
          Photo your ingredients and we'll find the perfect recipe.
        </p>
      </div>

      {/* ── DROP ZONE ── */}
      <div style={{ padding: '16px 16px 0' }} className="animate-fadeUp">
        <div style={{
          position: 'relative',
          borderRadius: 'var(--radius-lg)',
          border: `2px dashed ${image ? 'var(--color-accent)' : 'var(--color-border-strong)'}`,
          background: image ? 'transparent' : 'var(--color-surface)',
          height: 240,
          overflow: 'hidden',
          transition: 'border-color 0.2s',
        }}>
          {image ? (
            <>
              <img src={image} alt="Ingredients" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <button
                onClick={() => setImage(null)}
                style={{
                  position: 'absolute', top: 12, right: 12,
                  width: 36, height: 36, borderRadius: '50%',
                  background: 'rgba(28,18,8,0.65)',
                  color: '#fff', border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  backdropFilter: 'blur(4px)',
                }}
              >
                <X size={18} />
              </button>
              <div style={{
                position: 'absolute', bottom: 12, left: 12,
                background: 'rgba(74,124,89,0.9)',
                color: '#fff', borderRadius: 'var(--radius-full)',
                padding: '6px 12px', fontSize: 'var(--text-xs)', fontWeight: 600,
                display: 'flex', alignItems: 'center', gap: 4,
              }}>
                ✓ Ready to find recipes
              </div>
            </>
          ) : (
            <div style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              justifyContent: 'center', height: '100%', gap: 14, padding: 24,
            }}>
              <div style={{
                width: 72, height: 72,
                background: 'var(--color-primary-light)',
                borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Camera size={32} color="var(--color-primary)" />
              </div>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontWeight: 600, fontSize: 'var(--text-base)', color: 'var(--color-text)', marginBottom: 2 }}>
                  Take a photo
                </p>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-3)' }}>
                  or upload from gallery
                </p>
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <label style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: 'var(--color-primary)', color: '#fff',
                  padding: '10px 18px', borderRadius: 'var(--radius-full)',
                  fontSize: 'var(--text-sm)', fontWeight: 600, cursor: 'pointer',
                  boxShadow: 'var(--shadow-md)',
                }}>
                  <Camera size={15} /> Camera
                  <input ref={cameraRef} type="file" accept="image/*" capture="environment" style={{ display: 'none' }} onChange={handleFile} />
                </label>
                <label style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: 'var(--color-surface-2)', color: 'var(--color-text)',
                  padding: '10px 18px', borderRadius: 'var(--radius-full)',
                  fontSize: 'var(--text-sm)', fontWeight: 600, cursor: 'pointer',
                  border: '1px solid var(--color-border)',
                }}>
                  <Upload size={15} /> Gallery
                  <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFile} />
                </label>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── PREFERENCES ── */}
      <div style={{ padding: '14px 16px 0' }} className="animate-fadeUp delay-1">
        <div style={{
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-md)',
          padding: '18px 16px',
          boxShadow: 'var(--shadow-sm)',
        }}>
          <p style={{ fontWeight: 600, fontSize: 'var(--text-base)', color: 'var(--color-text)', marginBottom: 16 }}>
            What are we making?
          </p>

          {/* Diet */}
          <div style={{ marginBottom: 16 }}>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-3)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8 }}>
              Diet
            </p>
            <div className="scroll-row">
              {dietOptions.map(d => (
                <button key={d} onClick={() => setDiet(d)} className={`pill-toggle${diet === d ? ' active' : ''}`}>{d}</button>
              ))}
            </div>
          </div>

          {/* Meal Type */}
          <div style={{ marginBottom: 16 }}>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-3)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8 }}>
              Meal Type
            </p>
            <div className="scroll-row">
              {mealOptions.map(m => (
                <button key={m} onClick={() => setMeal(m)} className={`pill-toggle${meal === m ? ' active' : ''}`}>{m}</button>
              ))}
            </div>
          </div>

          {/* Servings */}
          <div>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-3)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8 }}>
              Servings
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 0, background: 'var(--color-surface-2)', borderRadius: 'var(--radius-full)', border: '1px solid var(--color-border)', width: 'fit-content', padding: '4px' }}>
              <button
                onClick={() => setServings(s => Math.max(1, s - 1))}
                style={{
                  width: 34, height: 34, borderRadius: '50%',
                  background: servings > 1 ? 'var(--color-surface)' : 'transparent',
                  border: 'none', color: 'var(--color-text-2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', transition: 'background 0.15s',
                }}
              >
                <Minus size={15} />
              </button>
              <span style={{
                fontSize: 'var(--text-base)', fontWeight: 700, color: 'var(--color-text)',
                minWidth: 52, textAlign: 'center',
              }}>
                {servings} {servings === 1 ? 'person' : 'people'}
              </span>
              <button
                onClick={() => setServings(s => Math.min(12, s + 1))}
                style={{
                  width: 34, height: 34, borderRadius: '50%',
                  background: 'var(--color-primary)',
                  border: 'none', color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <Plus size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── TIPS ROW ── */}
      <div style={{ padding: '14px 16px 0' }} className="animate-fadeUp delay-2">
        <div style={{
          background: 'var(--color-warning-light)',
          border: '1px solid var(--color-warning)',
          borderRadius: 'var(--radius-md)',
          padding: '12px 14px',
          display: 'flex', alignItems: 'flex-start', gap: 10,
        }}>
          <span style={{ fontSize: 18, flexShrink: 0 }}>💡</span>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-2)', lineHeight: 1.5 }}>
            <strong>Tip:</strong> Lay ingredients flat on a light surface for best results. Include as many as you have!
          </p>
        </div>
      </div>

      {/* ── CTA BUTTON ── */}
      <div style={{ padding: '16px 16px 0' }} className="animate-fadeUp delay-3">
        <button
          disabled={!image || loading}
          onClick={handleFindRecipes}
          className="btn btn-primary btn-lg"
          style={{
            width: '100%',
            boxShadow: image ? 'var(--shadow-lg)' : 'none',
            opacity: image && !loading ? 1 : 0.5,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}
        >
          <Sparkles size={18} />
          {loading ? 'Analyzing Ingredients...' : 'Find Recipes'}
          {!loading && <ArrowRight size={18} />}
        </button>
        {!image && (
          <p style={{ textAlign: 'center', fontSize: 'var(--text-xs)', color: 'var(--color-text-3)', marginTop: 8 }}>
            Add a photo to get started
          </p>
        )}
      </div>

    </div>
  );
}
