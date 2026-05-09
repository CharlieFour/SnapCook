import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Lock, Eye, EyeOff, Check, ShieldCheck } from 'lucide-react';
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth';
import { useAuth } from '../../context/AuthContext';
import Toast from '../../components/Toast';

function strength(pw) {
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return s;
}

const STRENGTH_LABEL = ['', 'Weak', 'Fair', 'Good', 'Strong'];
const STRENGTH_COLOR = ['', 'var(--color-error)', 'var(--color-warning)', 'var(--color-accent)', 'var(--color-accent)'];

export default function ChangePassword() {
  const navigate = useNavigate();
  const { user, resetPassword } = useAuth();
  const [form, setForm] = useState({ current: '', next: '', confirm: '' });
  const [show, setShow] = useState({ current: false, next: false, confirm: false });
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);
  const [busy, setBusy] = useState(false);

  const pw_strength = strength(form.next);

  // Check if user logged in with email/password (not Google-only)
  const isPasswordUser = user?.providerData?.some(p => p.providerId === 'password');

  function validate() {
    const errs = {};
    if (!form.current) errs.current = 'Enter your current password';
    if (form.next.length < 8) errs.next = 'At least 8 characters required';
    if (form.next !== form.confirm) errs.confirm = 'Passwords do not match';
    return errs;
  }

  async function handleSave() {
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setBusy(true);
    try {
      // Re-authenticate with current password first
      const credential = EmailAuthProvider.credential(user.email, form.current);
      await reauthenticateWithCredential(user, credential);
      // Then update password
      await updatePassword(user, form.next);
      setToast('Password updated! 🔒');
      setTimeout(() => navigate('/settings'), 1200);
    } catch (err) {
      if (err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        setErrors({ current: 'Current password is incorrect' });
      } else if (err.code === 'auth/too-many-requests') {
        setErrors({ current: 'Too many attempts. Try again later.' });
      } else if (err.code === 'auth/weak-password') {
        setErrors({ next: 'Password is too weak. Try a stronger one.' });
      } else {
        setToast('Something went wrong. Please try again.');
      }
    } finally {
      setBusy(false);
    }
  }

  async function handleForgotPassword() {
    if (!user?.email) return;
    setBusy(true);
    try {
      await resetPassword(user.email);
      setToast('Reset link sent to your email!');
    } catch {
      setToast('Failed to send reset email. Try again.');
    } finally {
      setBusy(false);
    }
  }

  function PwField({ label, field }) {
    return (
      <div style={{ marginBottom: 16 }}>
        <label style={{ display: 'block', fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--color-text-3)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6 }}>
          {label}
        </label>
        <div style={{ position: 'relative' }}>
          <Lock size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-3)', pointerEvents: 'none' }} />
          <input
            type={show[field] ? 'text' : 'password'}
            value={form[field]}
            onChange={e => { setForm(f => ({ ...f, [field]: e.target.value })); setErrors(er => ({ ...er, [field]: null })); }}
            style={{
              width: '100%', padding: '12px 44px 12px 38px',
              borderRadius: 'var(--radius-sm)',
              border: `1.5px solid ${errors[field] ? 'var(--color-error)' : 'var(--color-border)'}`,
              background: 'var(--color-surface)',
              fontSize: 'var(--text-base)', fontFamily: 'var(--font-body)',
              color: 'var(--color-text)', outline: 'none',
              transition: 'border-color 0.15s', boxSizing: 'border-box',
            }}
            onFocus={e => e.target.style.borderColor = 'var(--color-primary)'}
            onBlur={e => e.target.style.borderColor = errors[field] ? 'var(--color-error)' : 'var(--color-border)'}
          />
          <button
            type="button"
            onClick={() => setShow(s => ({ ...s, [field]: !s[field] }))}
            style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-3)', display: 'flex' }}
          >
            {show[field] ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        {errors[field] && <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-error)', marginTop: 4 }}>{errors[field]}</p>}
      </div>
    );
  }

  return (
    <div style={{ background: 'var(--color-bg)', minHeight: '100vh', paddingBottom: 40 }}>

      {/* Header */}
      <div style={{ position: 'sticky', top: 0, zIndex: 20, background: 'var(--color-surface)', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px' }}>
        <button onClick={() => navigate(-1)} style={{ width: 38, height: 38, borderRadius: '50%', background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-2)' }}>
          <ArrowLeft size={18} />
        </button>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 700 }}>Change Password</h1>
        <div style={{ width: 38 }} />
      </div>

      <div style={{ padding: '24px 16px 0' }}>
        {/* Info banner */}
        <div style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '14px 16px', marginBottom: 24, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          <ShieldCheck size={20} color="var(--color-accent)" style={{ flexShrink: 0, marginTop: 2 }} />
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-2)', lineHeight: 1.5 }}>
            {isPasswordUser
              ? 'Use a strong password with at least 8 characters, including uppercase letters, numbers, and symbols.'
              : 'You signed in with Google. Set a password below to also enable email/password login, or use the reset link.'}
          </p>
        </div>

        <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '20px 16px', marginBottom: 16, boxShadow: 'var(--shadow-sm)' }}>
          <PwField label="Current Password" field="current" />
          <PwField label="New Password" field="next" />

          {/* Strength meter */}
          {form.next.length > 0 && (
            <div style={{ marginTop: -8, marginBottom: 16 }}>
              <div style={{ display: 'flex', gap: 4, marginBottom: 4 }}>
                {[1, 2, 3, 4].map(i => (
                  <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: i <= pw_strength ? STRENGTH_COLOR[pw_strength] : 'var(--color-border)', transition: 'background 0.3s' }} />
                ))}
              </div>
              <p style={{ fontSize: 'var(--text-xs)', color: STRENGTH_COLOR[pw_strength], fontWeight: 600 }}>
                {STRENGTH_LABEL[pw_strength]}
              </p>
            </div>
          )}

          <PwField label="Confirm New Password" field="confirm" />

          {/* Requirements */}
          <div style={{ marginTop: -4 }}>
            {[
              { label: 'At least 8 characters', ok: form.next.length >= 8 },
              { label: 'One uppercase letter', ok: /[A-Z]/.test(form.next) },
              { label: 'One number', ok: /[0-9]/.test(form.next) },
              { label: 'One special character', ok: /[^A-Za-z0-9]/.test(form.next) },
            ].map(r => (
              <div key={r.label} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <div style={{ width: 16, height: 16, borderRadius: '50%', background: r.ok ? 'var(--color-accent)' : 'var(--color-surface-2)', border: `1.5px solid ${r.ok ? 'var(--color-accent)' : 'var(--color-border)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.2s' }}>
                  {r.ok && <Check size={9} color="#fff" />}
                </div>
                <span style={{ fontSize: 'var(--text-xs)', color: r.ok ? 'var(--color-accent)' : 'var(--color-text-3)', transition: 'color 0.2s' }}>{r.label}</span>
              </div>
            ))}
          </div>
        </div>

        <button onClick={handleSave} disabled={busy} className="btn btn-primary btn-lg" style={{ width: '100%', opacity: busy ? 0.7 : 1 }}>
          {busy ? 'Updating…' : 'Update Password'}
        </button>

        <button
          onClick={handleForgotPassword}
          disabled={busy}
          style={{ width: '100%', marginTop: 12, padding: '12px', borderRadius: 'var(--radius-md)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 'var(--text-sm)', color: 'var(--color-primary)', fontWeight: 600, fontFamily: 'var(--font-body)', opacity: busy ? 0.7 : 1 }}
        >
          Forgot current password?
        </button>
      </div>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
