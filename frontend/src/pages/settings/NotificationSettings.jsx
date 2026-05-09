import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell, Mail, Smartphone, Calendar, Star, Zap } from 'lucide-react';
import Toast from '../../components/Toast';

const NOTIF_SECTIONS = [
  {
    title: 'Reminders',
    items: [
      { id: 'mealplan', icon: Calendar, label: 'Meal Plan Reminders', desc: 'Daily reminder to check your meal plan', default: true },
      { id: 'cooking',  icon: Bell,     label: 'Cook Time Reminders',  desc: 'Remind me when it\'s time to cook',    default: false },
    ],
  },
  {
    title: 'Digest & Updates',
    items: [
      { id: 'weekly',    icon: Mail,       label: 'Weekly Digest',      desc: 'A weekly summary of trending recipes',  default: true },
      { id: 'newrecipes',icon: Star,       label: 'New Recipes',        desc: 'Notify me when new recipes are added',  default: false },
      { id: 'features',  icon: Zap,        label: 'New Features',       desc: 'Product updates and new capabilities',  default: true },
    ],
  },
  {
    title: 'Social',
    items: [
      { id: 'likes',    icon: Star,       label: 'Recipe Likes',   desc: 'When someone likes your saved recipes',   default: false },
      { id: 'push',     icon: Smartphone, label: 'Push Notifications', desc: 'Enable all push notifications',      default: true },
    ],
  },
];

export default function NotificationSettings() {
  const navigate = useNavigate();
  const [prefs, setPrefs] = useState(() => {
    const init = {};
    NOTIF_SECTIONS.forEach(s => s.items.forEach(i => { init[i.id] = i.default; }));
    return init;
  });
  const [toast, setToast] = useState(null);

  function Toggle({ id }) {
    return (
      <label className="toggle" style={{ flexShrink: 0 }}>
        <input type="checkbox" checked={prefs[id]} onChange={e => setPrefs(p => ({ ...p, [id]: e.target.checked }))} />
        <div className="toggle-track" />
      </label>
    );
  }

  return (
    <div style={{ background: 'var(--color-bg)', minHeight: '100vh', paddingBottom: 40 }}>
      <div style={{ position: 'sticky', top: 0, zIndex: 20, background: 'var(--color-surface)', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px' }}>
        <button onClick={() => navigate(-1)} style={{ width: 38, height: 38, borderRadius: '50%', background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-2)' }}>
          <ArrowLeft size={18} />
        </button>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 700 }}>Notifications</h1>
        <button onClick={() => setToast('Notification preferences saved!')} style={{ padding: '8px 18px', borderRadius: 'var(--radius-full)', background: 'var(--color-primary)', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 'var(--text-sm)', fontWeight: 600, fontFamily: 'var(--font-body)' }}>
          Save
        </button>
      </div>

      <div style={{ padding: '20px 16px 0' }}>
        {NOTIF_SECTIONS.map(section => (
          <div key={section.title} style={{ marginBottom: 20 }}>
            <p style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--color-text-3)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 10 }}>{section.title}</p>
            <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
              {section.items.map((item, i) => (
                <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', borderBottom: i < section.items.length - 1 ? '1px solid var(--color-border)' : 'none' }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--color-surface-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <item.icon size={17} color="var(--color-text-2)" />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontWeight: 600, fontSize: 'var(--text-sm)', color: 'var(--color-text)' }}>{item.label}</p>
                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-3)', marginTop: 2 }}>{item.desc}</p>
                  </div>
                  <Toggle id={item.id} />
                </div>
              ))}
            </div>
          </div>
        ))}

        <div style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '14px 16px', display: 'flex', gap: 10 }}>
          <span style={{ fontSize: 18, flexShrink: 0 }}>📱</span>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-2)', lineHeight: 1.5 }}>
            System notification permissions must be enabled in your device settings for push notifications to work.
          </p>
        </div>
      </div>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
