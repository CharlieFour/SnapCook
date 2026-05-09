import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check } from 'lucide-react';
import Toast from '../../components/Toast';

const DIETS = [
  { id: 'none',        label: 'No Restrictions', emoji: '🍽️' },
  { id: 'vegetarian',  label: 'Vegetarian',       emoji: '🥗' },
  { id: 'vegan',       label: 'Vegan',             emoji: '🌱' },
  { id: 'keto',        label: 'Keto',              emoji: '🥓' },
  { id: 'glutenfree',  label: 'Gluten-Free',       emoji: '🌾' },
  { id: 'halal',       label: 'Halal',             emoji: '☪️' },
  { id: 'lowcarb',     label: 'Low Carb',          emoji: '🥦' },
  { id: 'paleo',       label: 'Paleo',             emoji: '🍖' },
];

const ALLERGIES = ['Nuts', 'Dairy', 'Eggs', 'Shellfish', 'Gluten', 'Soy', 'Fish', 'Sesame'];
const CUISINES_PREF = ['Pakistani', 'Italian', 'Mexican', 'Asian', 'Indian', 'American', 'French', 'Japanese', 'Mediterranean', 'Middle Eastern'];
const LANGUAGES = ['English', 'Urdu', 'Arabic', 'French', 'Spanish', 'Hindi'];
const UNITS = ['Metric (g, ml, °C)', 'Imperial (oz, cups, °F)'];

export default function Preferences() {
  const navigate = useNavigate();
  const [diet, setDiet] = useState('none');
  const [allergies, setAllergies] = useState([]);
  const [favCuisines, setFavCuisines] = useState(['Pakistani', 'Italian']);
  const [servings, setServings] = useState(2);
  const [language, setLanguage] = useState('English');
  const [units, setUnits] = useState('Metric (g, ml, °C)');
  const [toast, setToast] = useState(null);

  function toggleAllergy(a) {
    setAllergies(prev => prev.includes(a) ? prev.filter(x => x !== a) : [...prev, a]);
  }
  function toggleCuisine(c) {
    setFavCuisines(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]);
  }

  return (
    <div style={{ background: 'var(--color-bg)', minHeight: '100vh', paddingBottom: 40 }}>
      <div style={{ position: 'sticky', top: 0, zIndex: 20, background: 'var(--color-surface)', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px' }}>
        <button onClick={() => navigate(-1)} style={{ width: 38, height: 38, borderRadius: '50%', background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-2)' }}>
          <ArrowLeft size={18} />
        </button>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 700 }}>Preferences</h1>
        <button onClick={() => { setToast('Preferences saved! ✅'); setTimeout(() => navigate('/settings'), 1000); }} style={{ padding: '8px 18px', borderRadius: 'var(--radius-full)', background: 'var(--color-primary)', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 'var(--text-sm)', fontWeight: 600, fontFamily: 'var(--font-body)' }}>
          Save
        </button>
      </div>

      <div style={{ padding: '20px 16px 0' }}>

        {/* Diet */}
        <SectionCard title="🥗 Dietary Preference">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {DIETS.map(d => (
              <button key={d.id} onClick={() => setDiet(d.id)} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', borderRadius: 'var(--radius-sm)', border: `1.5px solid ${diet === d.id ? 'var(--color-primary)' : 'var(--color-border)'}`, background: diet === d.id ? 'var(--color-primary-light)' : 'var(--color-surface)', cursor: 'pointer', fontFamily: 'var(--font-body)', transition: 'all 0.15s' }}>
                <span style={{ fontSize: 20 }}>{d.emoji}</span>
                <span style={{ fontSize: 'var(--text-sm)', fontWeight: diet === d.id ? 600 : 400, color: diet === d.id ? 'var(--color-primary)' : 'var(--color-text)' }}>{d.label}</span>
                {diet === d.id && <Check size={14} color="var(--color-primary)" style={{ marginLeft: 'auto' }} />}
              </button>
            ))}
          </div>
        </SectionCard>

        {/* Allergies */}
        <SectionCard title="⚠️ Allergies & Intolerances">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {ALLERGIES.map(a => (
              <button key={a} onClick={() => toggleAllergy(a)} style={{ padding: '8px 14px', borderRadius: 'var(--radius-full)', border: `1.5px solid ${allergies.includes(a) ? 'var(--color-error)' : 'var(--color-border)'}`, background: allergies.includes(a) ? 'rgba(214,64,69,0.1)' : 'var(--color-surface)', color: allergies.includes(a) ? 'var(--color-error)' : 'var(--color-text-2)', fontSize: 'var(--text-sm)', fontWeight: 500, cursor: 'pointer', fontFamily: 'var(--font-body)', transition: 'all 0.15s' }}>
                {allergies.includes(a) ? '✕ ' : ''}{a}
              </button>
            ))}
          </div>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-3)', marginTop: 10 }}>Tap to mark allergens — recipes containing these will be flagged.</p>
        </SectionCard>

        {/* Favourite Cuisines */}
        <SectionCard title="🌍 Favourite Cuisines">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {CUISINES_PREF.map(c => (
              <button key={c} onClick={() => toggleCuisine(c)} style={{ padding: '8px 14px', borderRadius: 'var(--radius-full)', border: `1.5px solid ${favCuisines.includes(c) ? 'var(--color-primary)' : 'var(--color-border)'}`, background: favCuisines.includes(c) ? 'var(--color-primary-light)' : 'var(--color-surface)', color: favCuisines.includes(c) ? 'var(--color-primary)' : 'var(--color-text-2)', fontSize: 'var(--text-sm)', fontWeight: favCuisines.includes(c) ? 600 : 400, cursor: 'pointer', fontFamily: 'var(--font-body)', transition: 'all 0.15s' }}>
                {c}
              </button>
            ))}
          </div>
        </SectionCard>

        {/* Serving size */}
        <SectionCard title="👤 Default Serving Size">
          <div style={{ display: 'flex', alignItems: 'center', gap: 0, background: 'var(--color-surface-2)', borderRadius: 'var(--radius-full)', border: '1px solid var(--color-border)', width: 'fit-content', padding: 4 }}>
            <button onClick={() => setServings(s => Math.max(1, s - 1))} style={{ width: 36, height: 36, borderRadius: '50%', background: servings > 1 ? 'var(--color-surface)' : 'transparent', border: 'none', cursor: 'pointer', fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-2)' }}>−</button>
            <span style={{ minWidth: 80, textAlign: 'center', fontWeight: 700, fontSize: 'var(--text-base)', color: 'var(--color-text)' }}>{servings} {servings === 1 ? 'person' : 'people'}</span>
            <button onClick={() => setServings(s => Math.min(12, s + 1))} style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--color-primary)', border: 'none', cursor: 'pointer', fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>+</button>
          </div>
        </SectionCard>

        {/* Language */}
        <SectionCard title="🌐 Language">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {LANGUAGES.map(l => (
              <button key={l} onClick={() => setLanguage(l)} style={{ padding: '8px 16px', borderRadius: 'var(--radius-full)', border: `1.5px solid ${language === l ? 'var(--color-primary)' : 'var(--color-border)'}`, background: language === l ? 'var(--color-primary)' : 'var(--color-surface)', color: language === l ? '#fff' : 'var(--color-text-2)', fontSize: 'var(--text-sm)', fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)', transition: 'all 0.15s' }}>
                {l}
              </button>
            ))}
          </div>
        </SectionCard>

        {/* Units */}
        <SectionCard title="📏 Measurement Units">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {UNITS.map(u => (
              <button key={u} onClick={() => setUnits(u)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 14px', borderRadius: 'var(--radius-sm)', border: `1.5px solid ${units === u ? 'var(--color-primary)' : 'var(--color-border)'}`, background: units === u ? 'var(--color-primary-light)' : 'var(--color-surface)', cursor: 'pointer', fontFamily: 'var(--font-body)', transition: 'all 0.15s' }}>
                <div style={{ width: 18, height: 18, borderRadius: '50%', border: `2px solid ${units === u ? 'var(--color-primary)' : 'var(--color-border)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {units === u && <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--color-primary)' }} />}
                </div>
                <span style={{ fontSize: 'var(--text-sm)', fontWeight: units === u ? 600 : 400, color: units === u ? 'var(--color-primary)' : 'var(--color-text)' }}>{u}</span>
              </button>
            ))}
          </div>
        </SectionCard>

        <button onClick={() => { setToast('Preferences saved! ✅'); setTimeout(() => navigate('/settings'), 1000); }} className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: 8 }}>
          Save Preferences
        </button>
      </div>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}

function SectionCard({ title, children }) {
  return (
    <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '18px 16px', marginBottom: 16, boxShadow: 'var(--shadow-sm)' }}>
      <p style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--color-text)', marginBottom: 14 }}>{title}</p>
      {children}
    </div>
  );
}
