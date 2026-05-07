import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, User, Lock, Link2, Sliders, Bell, Star, FileText, Shield, Mail, Trash2, HelpCircle, Info } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import Toast from '../components/Toast';

const accentColors = [
  { name: 'Terracotta', value: '#C84B31' },
  { name: 'Olive',      value: '#4A7C59' },
  { name: 'Sand',       value: '#D4956A' },
  { name: 'Slate',      value: '#5A7FA8' },
  { name: 'Berry',      value: '#A33A70' },
  { name: 'Amber',      value: '#C87B1A' },
];

function SectionTitle({ label }) {
  return (
    <p style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--color-text-3)', textTransform: 'uppercase', letterSpacing: '0.6px', padding: '0 16px', marginBottom: 8 }}>
      {label}
    </p>
  );
}

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 24 }}>
      {title && <SectionTitle label={title} />}
      <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', overflow: 'hidden', marginInline: 16, boxShadow: 'var(--shadow-sm)' }}>
        {children}
      </div>
    </div>
  );
}

function Row({ icon: Icon, iconBg, label, value, sublabel, onPress, danger, last, children }) {
  return (
    <div
      onClick={onPress}
      style={{
        display: 'flex', alignItems: 'center', gap: 14,
        padding: '13px 16px',
        borderBottom: last ? 'none' : '1px solid var(--color-border)',
        cursor: onPress ? 'pointer' : 'default',
        transition: onPress ? 'background 0.15s' : 'none',
        minHeight: 52,
      }}
      onMouseEnter={e => onPress && (e.currentTarget.style.background = 'var(--color-surface-2)')}
      onMouseLeave={e => onPress && (e.currentTarget.style.background = '')}
    >
      {Icon && (
        <div style={{
          width: 34, height: 34, borderRadius: 10,
          background: iconBg || (danger ? 'rgba(214,64,69,0.1)' : 'var(--color-surface-2)'),
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <Icon size={16} color={danger ? 'var(--color-error)' : 'var(--color-text-2)'} />
        </div>
      )}
      <div style={{ flex: 1, minWidth: 0 }}>
        <span style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 500, color: danger ? 'var(--color-error)' : 'var(--color-text)' }}>
          {label}
        </span>
        {sublabel && <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-3)' }}>{sublabel}</span>}
      </div>
      {children}
      {value && !children && <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-3)', flexShrink: 0 }}>{value}</span>}
      {onPress && !children && <ChevronRight size={16} color="var(--color-text-3)" style={{ flexShrink: 0 }} />}
    </div>
  );
}

export default function Settings() {
  const navigate = useNavigate();
  const { theme, setTheme, setPrimaryColor } = useTheme();
  const [notifMealPlan, setNotifMealPlan] = useState(true);
  const [selectedAccent, setSelectedAccent] = useState('#C84B31');
  const [toast, setToast] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  function Toggle({ value, onChange }) {
    return (
      <label className="toggle" style={{ flexShrink: 0 }}>
        <input type="checkbox" checked={value} onChange={e => onChange(e.target.checked)} />
        <div className="toggle-track" />
      </label>
    );
  }

  function handleAccent(color) {
    setSelectedAccent(color);
    setPrimaryColor(color);
    setToast('Accent colour updated!');
  }

  return (
    <div style={{ paddingBottom: 'calc(var(--bottom-nav-h) + 20px)', background: 'var(--color-bg)' }}>

      {/* Header */}
      <div style={{ padding: '20px 16px 20px', background: 'var(--color-surface)', borderBottom: '1px solid var(--color-border)', marginBottom: 24 }} className="animate-fadeUp">
        {/* Profile summary card — tap to edit */}
        <div
          onClick={() => navigate('/settings/edit-profile')}
          style={{
            display: 'flex', alignItems: 'center', gap: 14,
            background: 'var(--color-surface-2)', border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)', padding: '14px 16px',
            cursor: 'pointer', transition: 'background 0.15s',
            marginTop: 4,
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--color-surface-3)'}
          onMouseLeave={e => e.currentTarget.style.background = 'var(--color-surface-2)'}
        >
          <div style={{
            width: 52, height: 52, borderRadius: '50%', flexShrink: 0,
            background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent-2))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 22, fontWeight: 700, color: '#fff',
            boxShadow: 'var(--shadow-sm)',
          }}>
            R
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-base)', color: 'var(--color-text)' }}>Rafay Ahmed</p>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-3)', marginTop: 2 }}>@rafaycooks · rafay@example.com</p>
          </div>
          <ChevronRight size={18} color="var(--color-text-3)" />
        </div>
      </div>

      <div className="animate-fadeUp delay-1">

        {/* ACCOUNT */}
        <Section title="Account">
          <Row icon={User} label="Edit Profile" sublabel="Name, photo, bio, location" onPress={() => navigate('/settings/edit-profile')} />
          <Row icon={Lock} label="Change Password" sublabel="Update your password" onPress={() => navigate('/settings/change-password')} />
          <Row icon={Link2} label="Linked Accounts" sublabel="Google · Apple · Facebook" onPress={() => navigate('/settings/linked-accounts')} last />
        </Section>

        {/* PREFERENCES */}
        <Section title="Preferences">
          <Row icon={Sliders} label="Diet & Allergies" sublabel="No Restrictions · No allergens" onPress={() => navigate('/settings/preferences')} />
          <Row icon={User} label="Serving Size" value="2 people" onPress={() => navigate('/settings/preferences')} />
          <Row icon={Mail} label="Language" value="English" onPress={() => navigate('/settings/preferences')} last />
        </Section>

        {/* APPEARANCE */}
        <Section title="Appearance">
          <Row icon={null} label="Theme" last={false}>
            <div style={{ display: 'flex', gap: 4, background: 'var(--color-surface-2)', borderRadius: 'var(--radius-xs)', padding: 3 }}>
              {['light', 'dark'].map(t => (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  style={{
                    padding: '6px 12px', borderRadius: 6,
                    background: theme === t ? 'var(--color-surface)' : 'transparent',
                    border: theme === t ? '1px solid var(--color-border)' : '1px solid transparent',
                    fontSize: 'var(--text-xs)', fontWeight: 600,
                    color: theme === t ? 'var(--color-text)' : 'var(--color-text-3)',
                    cursor: 'pointer', fontFamily: 'var(--font-body)',
                    boxShadow: theme === t ? 'var(--shadow-sm)' : 'none',
                    textTransform: 'capitalize', transition: 'all 0.15s',
                  }}
                >
                  {t === 'light' ? '☀️' : '🌙'} {t}
                </button>
              ))}
            </div>
          </Row>
          <div style={{ padding: '14px 16px', borderBottom: 'none' }}>
            <p style={{ fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--color-text)', marginBottom: 12 }}>Accent Colour</p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {accentColors.map(c => (
                <button
                  key={c.value}
                  onClick={() => handleAccent(c.value)}
                  title={c.name}
                  style={{
                    width: 34, height: 34, borderRadius: '50%',
                    background: c.value, border: 'none', cursor: 'pointer',
                    outline: selectedAccent === c.value ? `3px solid ${c.value}` : '3px solid transparent',
                    outlineOffset: 2, boxShadow: 'var(--shadow-sm)',
                    transition: 'transform 0.15s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.18)'}
                  onMouseLeave={e => e.currentTarget.style.transform = ''}
                />
              ))}
            </div>
          </div>
        </Section>

        {/* NOTIFICATIONS */}
        <Section title="Notifications">
          <Row icon={Bell} label="Meal Plan Reminders" sublabel="Daily cooking reminders">
            <Toggle value={notifMealPlan} onChange={setNotifMealPlan} />
          </Row>
          <Row icon={Bell} label="All Notifications" sublabel="Manage all notification types" onPress={() => navigate('/settings/notifications')} last />
        </Section>

        {/* ABOUT */}
        <Section title="About">
          <Row icon={Star}     label="Rate SnapCook"    sublabel="Love the app? Leave a review" onPress={() => setToast('Thank you! ⭐⭐⭐⭐⭐')} />
          <Row icon={HelpCircle} label="Help & Support" sublabel="FAQ, report a bug, contact us" onPress={() => navigate('/settings/support')} />
          <Row icon={Shield}   label="Privacy Policy"   sublabel="How we handle your data"       onPress={() => navigate('/settings/privacy')} />
          <Row icon={FileText} label="Terms of Service" sublabel="Usage terms and conditions"    onPress={() => setToast('Opening Terms of Service…')} />
          <Row icon={Info}     label="App Version"      value="1.0.0" last />
        </Section>

        {/* DANGER ZONE */}
        <Section title="Danger Zone">
          <Row
            icon={Trash2} danger last
            label="Delete Account"
            sublabel="Permanently delete all your data"
            onPress={() => {
              if (showDeleteConfirm) {
                setToast('Account deletion email sent. Check your inbox.');
                setShowDeleteConfirm(false);
              } else {
                setShowDeleteConfirm(true);
                setToast('Tap again to confirm account deletion.');
              }
            }}
          />
        </Section>

        {/* LOG OUT */}
        <div style={{ padding: '0 16px 24px' }}>
          <button
            onClick={() => navigate('/auth')}
            style={{
              width: '100%', padding: '14px',
              borderRadius: 'var(--radius-md)',
              border: '1.5px solid var(--color-border)',
              background: 'transparent',
              color: 'var(--color-text-2)', fontSize: 'var(--text-base)', fontWeight: 600,
              cursor: 'pointer', fontFamily: 'var(--font-body)',
              transition: 'all 0.15s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--color-surface-2)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            Log Out
          </button>
        </div>
      </div>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
