import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, X } from 'lucide-react';
import Toast from '../../components/Toast';

const PROVIDERS = [
  { id: 'google', label: 'Google', emoji: '🇬', desc: 'Sign in with your Google account', color: '#4285F4' },
  { id: 'apple',  label: 'Apple',  emoji: '🍎', desc: 'Sign in with your Apple ID',      color: '#000000' },
  { id: 'facebook', label: 'Facebook', emoji: '📘', desc: 'Connect your Facebook account', color: '#1877F2' },
];

export default function LinkedAccounts() {
  const navigate = useNavigate();
  const [linked, setLinked] = useState({ google: true, apple: false, facebook: false });
  const [toast, setToast] = useState(null);

  function toggle(id) {
    if (linked[id]) {
      setLinked(l => ({ ...l, [id]: false }));
      setToast(`${PROVIDERS.find(p => p.id === id).label} disconnected`);
    } else {
      setLinked(l => ({ ...l, [id]: true }));
      setToast(`${PROVIDERS.find(p => p.id === id).label} connected! ✅`);
    }
  }

  return (
    <div style={{ background: 'var(--color-bg)', minHeight: '100vh', paddingBottom: 40 }}>
      <div style={{ position: 'sticky', top: 0, zIndex: 20, background: 'var(--color-surface)', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px' }}>
        <button onClick={() => navigate(-1)} style={{ width: 38, height: 38, borderRadius: '50%', background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-2)' }}>
          <ArrowLeft size={18} />
        </button>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 700 }}>Linked Accounts</h1>
        <div style={{ width: 38 }} />
      </div>

      <div style={{ padding: '24px 16px 0' }}>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-2)', marginBottom: 20, lineHeight: 1.6 }}>
          Link your social accounts to sign in quickly without a password.
        </p>

        <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
          {PROVIDERS.map((p, i) => (
            <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '16px', borderBottom: i < PROVIDERS.length - 1 ? '1px solid var(--color-border)' : 'none' }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: p.color + '18', border: `1.5px solid ${p.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>
                {p.emoji}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontWeight: 600, fontSize: 'var(--text-base)', color: 'var(--color-text)' }}>{p.label}</p>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-3)', marginTop: 2 }}>{linked[p.id] ? 'Connected' : p.desc}</p>
              </div>
              <button
                onClick={() => toggle(p.id)}
                style={{
                  padding: '8px 16px', borderRadius: 'var(--radius-full)',
                  background: linked[p.id] ? 'var(--color-surface-2)' : 'var(--color-primary)',
                  border: linked[p.id] ? '1.5px solid var(--color-border)' : 'none',
                  color: linked[p.id] ? 'var(--color-text-2)' : '#fff',
                  fontSize: 'var(--text-xs)', fontWeight: 700,
                  cursor: 'pointer', fontFamily: 'var(--font-body)',
                  display: 'flex', alignItems: 'center', gap: 5,
                  transition: 'all 0.15s',
                }}
              >
                {linked[p.id] ? <><X size={13} /> Unlink</> : <><Check size={13} /> Link</>}
              </button>
            </div>
          ))}
        </div>

        <div style={{ background: 'var(--color-warning-light)', border: '1px solid var(--color-warning)', borderRadius: 'var(--radius-md)', padding: '14px 16px', marginTop: 20, display: 'flex', gap: 10 }}>
          <span style={{ fontSize: 18, flexShrink: 0 }}>⚠️</span>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-2)', lineHeight: 1.5 }}>
            Make sure at least one sign-in method is always connected so you don't lose access to your account.
          </p>
        </div>
      </div>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
