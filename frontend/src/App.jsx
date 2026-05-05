import { useEffect, useState, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Home as HomeIcon, Compass, Camera, Calendar, User, Bell, Search as SearchIcon, ArrowRight, Check, Loader } from 'lucide-react';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { notifications as allNotifs } from './data/mockData';
import './App.css';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

import Home from './pages/Home';
import Snap from './pages/Snap';
import Search from './pages/Search';
import Recipes from './pages/Recipes';
import RecipeDetail from './pages/RecipeDetail';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Auth from './pages/Auth';
import Onboarding from './pages/Onboarding';
import MealPlanner from './pages/MealPlanner';
import Explore from './pages/Explore';
import CuisinePage from './pages/CuisinePage';
import Notifications from './pages/Notifications';
import EditProfile from './pages/settings/EditProfile';
import ChangePassword from './pages/settings/ChangePassword';
import LinkedAccounts from './pages/settings/LinkedAccounts';
import Preferences from './pages/settings/Preferences';
import NotificationSettings from './pages/settings/NotificationSettings';
import PrivacyPolicy from './pages/settings/PrivacyPolicy';
import Support from './pages/settings/Support';

const HIDE_NAV = ['/auth', '/onboarding'];
const HIDE_TOP_NAV = ['/auth', '/onboarding', '/recipe/', '/cuisine/', '/search', '/settings/', '/notifications'];

function TopNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [notifs, setNotifs] = useState(allNotifs);
  const dropRef = useRef();
  const { user } = useAuth();

  const unreadCount = notifs.filter(n => !n.read).length;
  const preview = notifs.slice(0, 4);

  // Close on outside click
  useEffect(() => {
    function onClickOutside(e) {
      if (dropRef.current && !dropRef.current.contains(e.target)) setOpen(false);
    }
    if (open) document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [open]);

  // Close on route change
  useEffect(() => { setOpen(false); }, [location.pathname]);

  function markAllRead() {
    setNotifs(prev => prev.map(n => ({ ...n, read: true })));
  }

  function handleNotifClick(notif) {
    setNotifs(prev => prev.map(n => n.id === notif.id ? { ...n, read: true } : n));
    setOpen(false);
    navigate(notif.link);
  }

  if (HIDE_TOP_NAV.some(p => location.pathname.startsWith(p))) return null;

  // Avatar initial from user displayName or email
  const avatarInitial = user?.displayName
    ? user.displayName.charAt(0).toUpperCase()
    : user?.email
      ? user.email.charAt(0).toUpperCase()
      : '?';

  return (
    <nav className="top-nav" style={{ overflow: 'visible' }}>
      <div className="top-nav-brand" style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
        <span>🍳</span> SnapCook
      </div>
      <div className="top-nav-actions">
        <button className="notif-btn" aria-label="Search" onClick={() => navigate('/search')}>
          <SearchIcon size={18} />
        </button>

        {/* Bell with dropdown */}
        <div ref={dropRef} style={{ position: 'relative' }}>
          <button
            className="notif-btn"
            aria-label="Notifications"
            onClick={() => setOpen(o => !o)}
            style={{ background: open ? 'var(--color-surface-3)' : '' }}
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="notif-dot" style={{
                width: unreadCount > 9 ? 14 : 8,
                height: unreadCount > 9 ? 14 : 8,
                fontSize: 8, fontWeight: 700,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff',
              }}>
                {unreadCount > 9 ? '9+' : ''}
              </span>
            )}
          </button>

          {open && (
            <div className="notif-dropdown">
              {/* Header */}
              <div className="notif-dropdown-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-base)', fontWeight: 700, color: 'var(--color-text)' }}>
                    Notifications
                  </span>
                  {unreadCount > 0 && (
                    <span style={{ background: 'var(--color-primary)', color: '#fff', borderRadius: 'var(--radius-full)', padding: '1px 7px', fontSize: 11, fontWeight: 700 }}>
                      {unreadCount}
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllRead}
                    style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 'var(--text-xs)', color: 'var(--color-primary)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)' }}
                  >
                    <Check size={12} /> Mark all read
                  </button>
                )}
              </div>

              {/* Preview items */}
              <div style={{ maxHeight: 320, overflowY: 'auto' }}>
                {preview.map(n => (
                  <div
                    key={n.id}
                    className={`notif-item${!n.read ? ' unread' : ''}`}
                    onClick={() => handleNotifClick(n)}
                  >
                    <div style={{ width: 38, height: 38, borderRadius: 10, background: n.read ? 'var(--color-surface-2)' : 'rgba(200,75,49,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
                      {n.emoji}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: 'var(--text-sm)', fontWeight: n.read ? 500 : 700, color: 'var(--color-text)', lineHeight: 1.3, marginBottom: 2 }}>
                        {n.title}
                      </p>
                      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-3)', lineHeight: 1.4, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                        {n.body}
                      </p>
                      <p style={{ fontSize: 10, color: 'var(--color-text-3)', marginTop: 4, fontWeight: 500 }}>{n.time}</p>
                    </div>
                    {!n.read && (
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--color-primary)', flexShrink: 0, marginTop: 4 }} />
                    )}
                  </div>
                ))}
              </div>

              {/* Footer — Show all */}
              <div
                className="notif-dropdown-footer"
                onClick={() => { setOpen(false); navigate('/notifications'); }}
              >
                Show all notifications <ArrowRight size={15} />
              </div>
            </div>
          )}
        </div>

        <button className="avatar-btn" onClick={() => navigate('/profile')} aria-label="Profile">
          {avatarInitial}
        </button>
      </div>
    </nav>
  );
}

function BottomNav() {
  const location = useLocation();
  if (HIDE_NAV.some(p => location.pathname.startsWith(p))) return null;
  if (location.pathname.startsWith('/recipe/')) return null;
  if (location.pathname.startsWith('/cuisine/')) return null;
  if (location.pathname.startsWith('/settings/')) return null;

  return (
    <nav className="bottom-nav">
      <NavLink to="/" end className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}>
        <HomeIcon size={22} />
        <span>Home</span>
      </NavLink>
      <NavLink to="/explore" className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}>
        <Compass size={22} />
        <span>Explore</span>
      </NavLink>
      <NavLink to="/snap" className={({ isActive }) => `nav-item nav-snap${isActive ? ' active' : ''}`}>
        <Camera size={24} />
      </NavLink>
      <NavLink to="/meal-planner" className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}>
        <Calendar size={22} />
        <span>Plan</span>
      </NavLink>
      <NavLink to="/profile" className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}>
        <User size={22} />
        <span>Profile</span>
      </NavLink>
    </nav>
  );
}

function AuthGuard({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) return;

    const publicPaths = ['/auth'];
    const isPublic = publicPaths.some(p => location.pathname.startsWith(p));

    if (!user && !isPublic) {
      navigate('/auth', { replace: true });
      return;
    }

    if (user && isPublic) {
      navigate('/', { replace: true });
      return;
    }

    // Check onboarding for authenticated non-onboarding pages
    if (user && location.pathname !== '/onboarding') {
      const onboarded = localStorage.getItem('snapcook_onboarded');
      if (!onboarded) {
        navigate('/onboarding', { replace: true });
      }
    }
  }, [user, loading, location.pathname]);

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'var(--color-bg)',
        flexDirection: 'column', gap: 16,
      }}>
        <div style={{ fontSize: 48 }}>🍳</div>
        <Loader size={24} style={{ animation: 'spin 1s linear infinite', color: 'var(--color-primary)' }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return children;
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="app-wrapper">
            <ScrollToTop />
            <AuthGuard>
              <TopNav />
              <main className="main-content">
                <Routes>
                  <Route path="/"             element={<Home />} />
                  <Route path="/auth"         element={<Auth />} />
                  <Route path="/onboarding"   element={<Onboarding />} />
                  <Route path="/snap"         element={<Snap />} />
                  <Route path="/search"       element={<Search />} />
                  <Route path="/explore"      element={<Explore />} />
                  <Route path="/recipes"      element={<Recipes />} />
                  <Route path="/recipe/:id"   element={<RecipeDetail />} />
                  <Route path="/cuisine/:id"  element={<CuisinePage />} />
                  <Route path="/meal-planner" element={<MealPlanner />} />
                  <Route path="/notifications"              element={<Notifications />} />
                  <Route path="/profile"                    element={<Profile />} />
                  <Route path="/settings"                  element={<Settings />} />
                  <Route path="/settings/edit-profile"     element={<EditProfile />} />
                  <Route path="/settings/change-password"  element={<ChangePassword />} />
                  <Route path="/settings/linked-accounts"  element={<LinkedAccounts />} />
                  <Route path="/settings/preferences"      element={<Preferences />} />
                  <Route path="/settings/notifications"    element={<NotificationSettings />} />
                  <Route path="/settings/privacy"          element={<PrivacyPolicy />} />
                  <Route path="/settings/support"          element={<Support />} />
                </Routes>
              </main>
              <BottomNav />
            </AuthGuard>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
