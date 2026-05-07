import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, Mail, Eye, EyeOff, ArrowLeft, Loader } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Auth() {
  const [view, setView] = useState('login');
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();
  const { login, signup, loginWithGoogle, resetPassword } = useAuth();

  function friendlyError(code) {
    const map = {
      'auth/email-already-in-use': 'An account with this email already exists.',
      'auth/invalid-email': 'Please enter a valid email address.',
      'auth/user-not-found': 'No account found with this email.',
      'auth/wrong-password': 'Incorrect password. Try again or reset it.',
      'auth/invalid-credential': 'Invalid email or password.',
      'auth/weak-password': 'Password should be at least 6 characters.',
      'auth/too-many-requests': 'Too many attempts. Please try again later.',
      'auth/popup-closed-by-user': 'Sign-in popup was closed.',
      'auth/network-request-failed': 'Network error. Check your connection.',
    };
    return map[code] || 'Something went wrong. Please try again.';
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setInfo('');
    setBusy(true);
    try {
      if (view === 'forgot') {
        await resetPassword(email);
        setInfo('Reset link sent! Check your inbox.');
        setBusy(false);
        return;
      }
      if (view === 'signup') {
        await signup(email, password, name);
      } else {
        await login(email, password);
      }
      const onboarded = localStorage.getItem('snapcook_onboarded');
      navigate(onboarded ? '/' : '/onboarding', { replace: true });
    } catch (err) {
      setError(friendlyError(err.code));
    } finally {
      setBusy(false);
    }
  }

  async function handleGoogle() {
    setError('');
    setBusy(true);
    try {
      await loginWithGoogle();
      const onboarded = localStorage.getItem('snapcook_onboarded');
      navigate(onboarded ? '/' : '/onboarding', { replace: true });
    } catch (err) {
      setError(friendlyError(err.code));
    } finally {
      setBusy(false);
    }
  }

  function switchView(v) {
    setView(v);
    setError('');
    setInfo('');
  }

  const titles = { login: 'Welcome back', signup: 'Create account', forgot: 'Reset password' };
  const subtitles = {
    login: 'Sign in to your SnapCook account',
    signup: 'Join thousands of home cooks',
    forgot: 'We\'ll send a reset link to your email',
  };

  return (
    <div style={{
      minHeight: '100vh', background: 'var(--color-bg)',
      display: 'flex', flexDirection: 'column',
    }}>
      {/* Top bar */}
      <div style={{ padding: '16px 16px 0', display: 'flex', alignItems: 'center', gap: 8 }}>
        <button className="btn-icon" onClick={() => navigate(-1)}>
          <ArrowLeft size={18} />
        </button>
      </div>

      {/* Brand */}
      <div style={{ padding: '32px 24px 0', textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 8 }}>🍳</div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', fontWeight: 700, color: 'var(--color-primary)', marginBottom: 4 }}>SnapCook</h1>
        <p style={{ color: 'var(--color-text-3)', fontSize: 'var(--text-sm)' }}>Snap. Cook. Enjoy.</p>
      </div>

      {/* Card */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '24px 24px 40px' }}>
        <div style={{ background: 'var(--color-surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', padding: '28px 24px', boxShadow: 'var(--shadow-md)', animation: 'scaleIn 0.3s ease' }}>

          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', fontWeight: 700, marginBottom: 4, color: 'var(--color-text)' }}>
            {titles[view]}
          </h2>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-2)', marginBottom: 24 }}>{subtitles[view]}</p>

          {/* Error / Info messages */}
          {error && (
            <div style={{ background: 'var(--color-error-light, rgba(220,38,38,0.08))', border: '1px solid var(--color-error, #dc2626)', borderRadius: 'var(--radius-sm)', padding: '10px 14px', marginBottom: 16, fontSize: 'var(--text-sm)', color: 'var(--color-error, #dc2626)', fontWeight: 500 }}>
              {error}
            </div>
          )}
          {info && (
            <div style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid #22c55e', borderRadius: 'var(--radius-sm)', padding: '10px 14px', marginBottom: 16, fontSize: 'var(--text-sm)', color: '#16a34a', fontWeight: 500 }}>
              {info}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {view === 'signup' && (
              <div className="input-wrap">
                <User size={16} className="input-icon" />
                <input className="input input-with-icon" type="text" placeholder="Full Name" required value={name} onChange={e => setName(e.target.value)} />
              </div>
            )}

            <div className="input-wrap">
              <Mail size={16} className="input-icon" />
              <input className="input input-with-icon" type="email" placeholder="Email address" required value={email} onChange={e => setEmail(e.target.value)} />
            </div>

            {view !== 'forgot' && (
              <div className="input-wrap">
                <Lock size={16} className="input-icon" />
                <input
                  className="input input-with-icon"
                  type={showPass ? 'text' : 'password'}
                  placeholder="Password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  style={{ paddingRight: 44 }}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(s => !s)}
                  style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-3)', display: 'flex' }}
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            )}

            {view === 'login' && (
              <button type="button" onClick={() => switchView('forgot')} style={{ textAlign: 'right', fontSize: 'var(--text-sm)', color: 'var(--color-primary)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)' }}>
                Forgot password?
              </button>
            )}

            <button type="submit" className="btn btn-primary btn-lg" disabled={busy} style={{ width: '100%', marginTop: 8, opacity: busy ? 0.7 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              {busy && <Loader size={16} style={{ animation: 'spin 1s linear infinite' }} />}
              {view === 'login' ? 'Sign In' : view === 'signup' ? 'Create Account' : 'Send Reset Link'}
            </button>
          </form>

          {/* Divider */}
          {view !== 'forgot' && (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '20px 0' }}>
                <div style={{ flex: 1, height: 1, background: 'var(--color-border)' }} />
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-3)', fontWeight: 500 }}>or continue with</span>
                <div style={{ flex: 1, height: 1, background: 'var(--color-border)' }} />
              </div>

              <div style={{ display: 'flex', gap: 10 }}>
                <button
                  onClick={handleGoogle}
                  disabled={busy}
                  style={{
                    flex: 1, padding: '12px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1.5px solid var(--color-border)',
                    background: 'var(--color-surface)',
                    fontSize: 'var(--text-sm)', fontWeight: 600,
                    color: 'var(--color-text)',
                    cursor: 'pointer', fontFamily: 'var(--font-body)',
                    transition: 'background 0.15s',
                    opacity: busy ? 0.7 : 1,
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--color-surface-2)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'var(--color-surface)'}
                >
                  🇬 Google
                </button>
              </div>
            </>
          )}

          {/* Footer link */}
          <p style={{ textAlign: 'center', fontSize: 'var(--text-sm)', color: 'var(--color-text-2)', marginTop: 20 }}>
            {view === 'login' && <>Don't have an account? <button onClick={() => switchView('signup')} style={{ color: 'var(--color-primary)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 'inherit' }}>Sign Up</button></>}
            {view === 'signup' && <>Already have an account? <button onClick={() => switchView('login')} style={{ color: 'var(--color-primary)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 'inherit' }}>Sign In</button></>}
            {view === 'forgot' && <>Remember it? <button onClick={() => switchView('login')} style={{ color: 'var(--color-primary)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 'inherit' }}>Sign In</button></>}
          </p>
        </div>
      </div>

      {/* Spinner keyframe */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
