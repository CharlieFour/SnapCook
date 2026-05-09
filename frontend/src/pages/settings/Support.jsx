import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight, ChevronDown, Send } from 'lucide-react';
import Toast from '../../components/Toast';

const FAQS = [
  { q: 'How does the ingredient snap feature work?', a: 'Simply take a photo of your ingredients and SnapCook will identify them and suggest recipes you can make. The more ingredients visible, the better the suggestions.' },
  { q: 'Can I use SnapCook offline?', a: 'Saved recipes are accessible offline. However, the snap feature, search, and new recipe suggestions require an internet connection.' },
  { q: 'How do I delete my account?', a: 'Go to Settings → Danger Zone → Delete Account. You\'ll receive a confirmation email. Your data will be permanently deleted within 30 days.' },
  { q: 'How do I change my dietary preferences?', a: 'Go to Settings → Preferences and select your diet type, allergies, and favourite cuisines. These inform your recipe recommendations.' },
  { q: 'Are recipes nutritionally accurate?', a: 'Nutritional information is estimated based on standard ingredient databases. Always consult a healthcare professional for medical dietary advice.' },
];

const CATEGORIES = ['General', 'Account', 'Recipes', 'Billing', 'Technical', 'Other'];

export default function Support() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);
  const [form, setForm] = useState({ category: 'General', subject: '', message: '' });
  const [toast, setToast] = useState(null);

  function handleSend() {
    if (!form.subject.trim() || !form.message.trim()) {
      setToast('Please fill in the subject and message.');
      return;
    }
    setToast('Message sent! We\'ll reply within 24 hours. 📬');
    setForm(f => ({ ...f, subject: '', message: '' }));
  }

  return (
    <div style={{ background: 'var(--color-bg)', minHeight: '100vh', paddingBottom: 40 }}>
      <div style={{ position: 'sticky', top: 0, zIndex: 20, background: 'var(--color-surface)', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px' }}>
        <button onClick={() => navigate(-1)} style={{ width: 38, height: 38, borderRadius: '50%', background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-2)', flexShrink: 0 }}>
          <ArrowLeft size={18} />
        </button>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 700 }}>Help & Support</h1>
      </div>

      <div style={{ padding: '20px 16px 0' }}>

        {/* Quick links */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 24 }}>
          {[
            { emoji: '📖', label: 'User Guide',   sub: 'How-to articles' },
            { emoji: '🐛', label: 'Report a Bug', sub: 'Something broken?' },
            { emoji: '💡', label: 'Suggest a Feature', sub: 'Your ideas matter' },
            { emoji: '⭐', label: 'Rate the App', sub: 'Leave a review' },
          ].map(item => (
            <button key={item.label} onClick={() => setToast(`Opening ${item.label}…`)} style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '16px 14px', cursor: 'pointer', textAlign: 'left', fontFamily: 'var(--font-body)', boxShadow: 'var(--shadow-sm)', transition: 'transform 0.15s' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'} onMouseLeave={e => e.currentTarget.style.transform = ''}>
              <div style={{ fontSize: 24, marginBottom: 6 }}>{item.emoji}</div>
              <p style={{ fontWeight: 600, fontSize: 'var(--text-sm)', color: 'var(--color-text)', marginBottom: 2 }}>{item.label}</p>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-3)' }}>{item.sub}</p>
            </button>
          ))}
        </div>

        {/* FAQs */}
        <p style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--color-text-3)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 10 }}>
          Frequently Asked Questions
        </p>
        <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)', marginBottom: 24 }}>
          {FAQS.map((faq, i) => (
            <div key={i} style={{ borderBottom: i < FAQS.length - 1 ? '1px solid var(--color-border)' : 'none' }}>
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '14px 16px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', fontFamily: 'var(--font-body)' }}>
                <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-text)', flex: 1 }}>{faq.q}</span>
                {openFaq === i ? <ChevronDown size={16} color="var(--color-primary)" /> : <ChevronRight size={16} color="var(--color-text-3)" />}
              </button>
              {openFaq === i && (
                <div style={{ padding: '0 16px 14px', animation: 'fadeUp 0.2s ease' }}>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-2)', lineHeight: 1.6 }}>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact form */}
        <p style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--color-text-3)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 10 }}>
          Contact Support
        </p>
        <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '20px 16px', boxShadow: 'var(--shadow-sm)', marginBottom: 16 }}>
          <div style={{ marginBottom: 14 }}>
            <label style={{ display: 'block', fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--color-text-3)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6 }}>Category</label>
            <div className="scroll-row" style={{ gap: 6 }}>
              {CATEGORIES.map(c => (
                <button key={c} onClick={() => setForm(f => ({ ...f, category: c }))} className={`pill-toggle${form.category === c ? ' active' : ''}`} style={{ fontSize: 'var(--text-xs)', flexShrink: 0 }}>{c}</button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 14 }}>
            <label style={{ display: 'block', fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--color-text-3)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6 }}>Subject</label>
            <input value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} placeholder="Brief description of your issue" style={{ width: '100%', padding: '11px 14px', borderRadius: 'var(--radius-sm)', border: '1.5px solid var(--color-border)', background: 'var(--color-surface)', fontSize: 'var(--text-base)', fontFamily: 'var(--font-body)', color: 'var(--color-text)', outline: 'none', boxSizing: 'border-box' }} onFocus={e => e.target.style.borderColor = 'var(--color-primary)'} onBlur={e => e.target.style.borderColor = 'var(--color-border)'} />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--color-text-3)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6 }}>Message</label>
            <textarea value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} placeholder="Describe your issue in detail…" rows={4} style={{ width: '100%', padding: '11px 14px', borderRadius: 'var(--radius-sm)', border: '1.5px solid var(--color-border)', background: 'var(--color-surface)', fontSize: 'var(--text-base)', fontFamily: 'var(--font-body)', color: 'var(--color-text)', outline: 'none', resize: 'none', boxSizing: 'border-box' }} onFocus={e => e.target.style.borderColor = 'var(--color-primary)'} onBlur={e => e.target.style.borderColor = 'var(--color-border)'} />
          </div>
          <button onClick={handleSend} className="btn btn-primary" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <Send size={15} /> Send Message
          </button>
        </div>

        <p style={{ textAlign: 'center', fontSize: 'var(--text-xs)', color: 'var(--color-text-3)', lineHeight: 1.6 }}>
          You can also reach us at{' '}
          <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>support@snapcook.app</span>
          {' '}· We typically reply within 24 hours.
        </p>
      </div>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
