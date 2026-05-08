import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, BookOpen, Calendar, ArrowRight, Check } from 'lucide-react';

const slides = [
  {
    emoji: '📸',
    icon: Camera,
    title: 'Snap Your Ingredients',
    subtitle: 'Point your camera at any ingredient and let SnapCook do the magic.',
    bg: 'linear-gradient(160deg, #C84B31 0%, #E8845A 100%)',
    decoration: ['🥕', '🧅', '🍅', '🧄', '🫑'],
  },
  {
    emoji: '🍽️',
    icon: BookOpen,
    title: 'Get Instant Recipes',
    subtitle: 'Receive personalised recipe suggestions with step-by-step guidance tailored to your diet.',
    bg: 'linear-gradient(160deg, #4A7C59 0%, #6AAD7E 100%)',
    decoration: ['🍝', '🥗', '🍜', '🥘', '🫕'],
  },
  {
    emoji: '📅',
    icon: Calendar,
    title: 'Plan Your Whole Week',
    subtitle: 'Schedule meals, track nutrition, and keep your week delicious and organised.',
    bg: 'linear-gradient(160deg, #5A7FA8 0%, #7AAAD8 100%)',
    decoration: ['📅', '✅', '🥦', '🏃', '💪'],
    hasDietPicker: true,
  },
];

const dietOptions = [
  { id: 'none', label: 'No Restrictions' },
  { id: 'vegetarian', label: 'Vegetarian 🥦' },
  { id: 'vegan', label: 'Vegan 🌱' },
  { id: 'keto', label: 'Keto 🥩' },
  { id: 'gluten-free', label: 'Gluten Free 🌾' },
];

export default function Onboarding() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [diet, setDiet] = useState('none');
  const slide = slides[current];
  const isLast = current === slides.length - 1;

  function finish() {
    localStorage.setItem('snapcook_onboarded', '1');
    localStorage.setItem('snapcook_diet', diet);
    navigate('/', { replace: true });
  }


  return (
    <div style={{
      minHeight: '100vh',
      background: slide.bg,
      display: 'flex', flexDirection: 'column',
      transition: 'background 0.5s ease',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Decorative floating emojis */}
      {slide.decoration.map((em, i) => (
        <span key={i} style={{
          position: 'absolute',
          fontSize: 28 + (i % 2) * 10,
          opacity: 0.18,
          top: `${10 + i * 15}%`,
          left: i % 2 === 0 ? `${5 + i * 8}%` : 'auto',
          right: i % 2 !== 0 ? `${5 + i * 7}%` : 'auto',
          transform: `rotate(${-15 + i * 10}deg)`,
          userSelect: 'none', pointerEvents: 'none',
        }}>{em}</span>
      ))}

      {/* Skip */}
      <button
        onClick={finish}
        style={{
          position: 'absolute', top: 20, right: 20,
          color: 'rgba(255,255,255,0.75)', background: 'rgba(255,255,255,0.15)',
          border: 'none', borderRadius: 'var(--radius-full)',
          padding: '8px 16px', fontSize: 'var(--text-sm)', fontWeight: 600,
          cursor: 'pointer', fontFamily: 'var(--font-body)',
          backdropFilter: 'blur(8px)',
        }}
      >
        Skip
      </button>

      {/* Content */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '80px 32px 40px',
        animation: 'fadeUp 0.5s ease',
        key: current,
      }}>
        {/* Big emoji */}
        <div style={{
          width: 120, height: 120,
          background: 'rgba(255,255,255,0.2)',
          borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 60, marginBottom: 36,
          backdropFilter: 'blur(8px)',
          border: '2px solid rgba(255,255,255,0.3)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
        }}>
          {slide.emoji}
        </div>

        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--text-3xl)',
          fontWeight: 700, color: '#fff',
          textAlign: 'center', lineHeight: 1.2,
          marginBottom: 16,
        }}>
          {slide.title}
        </h1>
        <p style={{
          color: 'rgba(255,255,255,0.82)',
          fontSize: 'var(--text-md)',
          textAlign: 'center', lineHeight: 1.6,
          maxWidth: 320, marginBottom: 32,
        }}>
          {slide.subtitle}
        </p>

        {/* Diet picker on last slide */}
        {slide.hasDietPicker && (
          <div style={{ width: '100%', maxWidth: 320 }}>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 'var(--text-sm)', fontWeight: 600, marginBottom: 12, textAlign: 'center', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
              Your diet preference
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {dietOptions.map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setDiet(opt.id)}
                  style={{
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-sm)',
                    border: `2px solid ${diet === opt.id ? '#fff' : 'rgba(255,255,255,0.3)'}`,
                    background: diet === opt.id ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.1)',
                    color: '#fff',
                    fontSize: 'var(--text-base)', fontWeight: 600,
                    cursor: 'pointer', fontFamily: 'var(--font-body)',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    transition: 'all 0.2s',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  {opt.label}
                  {diet === opt.id && <Check size={18} />}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom controls */}
      <div style={{
        padding: '0 32px 48px',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24,
      }}>
        {/* Progress dots */}
        <div style={{ display: 'flex', gap: 8 }}>
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              style={{
                width: i === current ? 24 : 8,
                height: 8,
                borderRadius: 4,
                background: i === current ? '#fff' : 'rgba(255,255,255,0.35)',
                border: 'none', cursor: 'pointer',
                transition: 'all 0.3s',
              }}
            />
          ))}
        </div>

        {/* CTA button */}
        <button
          onClick={() => isLast ? finish() : setCurrent(c => c + 1)}
          style={{
            width: '100%', maxWidth: 320,
            padding: '16px 28px',
            borderRadius: 'var(--radius-full)',
            background: '#fff',
            color: 'var(--color-primary)',
            fontSize: 'var(--text-md)', fontWeight: 700,
            border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            fontFamily: 'var(--font-body)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.22)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.18)'; }}
        >
          {isLast ? 'Get Started' : 'Next'}
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
