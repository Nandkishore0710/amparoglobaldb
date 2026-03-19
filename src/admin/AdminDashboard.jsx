import React from 'react';
import { Link } from 'react-router-dom';
import { useContent } from './AdminContext';

export default function AdminDashboard() {
  const { state, dispatch } = useContent();

  const handleReset = () => {
    if (window.confirm('Reset ALL content to defaults? This cannot be undone.')) {
      dispatch({ type: 'RESET' });
    }
  };

  return (
    <>
      <h1 className="admin-page-title">Dashboard</h1>
      <p className="admin-page-sub">Welcome back! Here's an overview of your website content.</p>

      {/* Stats */}
      <div className="admin-grid-4" style={{ marginBottom: 32 }}>
        <div className="admin-stat">
          <div className="admin-stat__label">Hero Slides</div>
          <div className="admin-stat__val red">{state.slides.length}</div>
        </div>
        <div className="admin-stat">
          <div className="admin-stat__label">Services</div>
          <div className="admin-stat__val blue">{state.services.length}</div>
        </div>
        <div className="admin-stat">
          <div className="admin-stat__label">Use Cases</div>
          <div className="admin-stat__val green">{state.cases.length}</div>
        </div>
        <div className="admin-stat">
          <div className="admin-stat__label">Active Chats</div>
          <div className="admin-stat__val yellow">{state.chatTickets?.filter(t => t.status === 'active').length || 0}</div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="admin-card">
        <div className="admin-card__header">
          <span className="admin-card__title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z"/><polyline points="13 2 13 9 20 9"/></svg>
            Quick Edit – Current Content
          </span>
          <Link to="/admin/messages" style={{ fontSize: '0.8rem', color: 'var(--a-red)', fontWeight: 600, textDecoration: 'none', background: 'var(--a-red-dim)', padding: '4px 12px', borderRadius: 20 }}>
            {state.messages?.filter(m => !m.read).length || 0} New Inquiries
          </Link>
        </div>

        <div className="admin-grid-2">
          <div>
            <h4 style={{ color: 'var(--a-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>System Configuration</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginBottom: 24 }}>
              <Link to="/admin/header" className="admin-quick-link-row">
                <span className="icon">🔝</span>
                <span>Header & Navigation</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
              <Link to="/admin/footer" className="admin-quick-link-row">
                <span className="icon">📋</span>
                <span>Footer & Socials</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
              <Link to="/admin/contact" className="admin-quick-link-row">
                <span className="icon">📞</span>
                <span>Contact Details</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </div>

            <h4 style={{ color: 'var(--a-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>Hero Backgrounds</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {state.slides.map(s => (
                <Link key={s.id} to="/admin/hero" className="admin-quick-link-row">
                  <span className="icon">🖼️</span>
                  <span style={{ fontSize: '0.85rem' }}>{s.tag}: {s.headline}</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h4 style={{ color: 'var(--a-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>Content Cards</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {state.services.slice(0, 3).map(s => (
                <Link key={s.id} to="/admin/services" className="admin-quick-link-row">
                  <span className="icon">🛠️</span>
                  <span>{s.title}</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </Link>
              ))}
              <Link to="/admin/services-why" className="admin-quick-link-row">
                <span className="icon">❓</span>
                <span>Why Choose Section</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
              <Link to="/admin/cases" className="admin-quick-link-row">
                <span className="icon">💼</span>
                <span>Use Cases / Portfolio</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
              <Link to="/admin/about" className="admin-quick-link-row">
                <span className="icon">👤</span>
                <span>About & Site Stats</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
              <Link to="/admin/clients" className="admin-quick-link-row">
                <span className="icon">🤝</span>
                <span>Client Logos Slider</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </div>
          </div>
        </div>

        <div className="admin-grid-2" style={{ marginTop: 24 }}>
          <div>
            <h4 style={{ color: 'var(--a-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>Communication</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Link to="/admin/chat" className="admin-quick-link-row">
                <span className="icon">💬</span>
                <span>Live Chat Support</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
              <Link to="/admin/messages" className="admin-quick-link-row">
                <span className="icon">📩</span>
                <span>Client Inquiries</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="admin-card" style={{ borderColor: 'rgba(239,68,68,0.2)' }}>
        <div className="admin-card__header">
          <span className="admin-card__title" style={{ color: '#ef4444' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            Danger Zone
          </span>
        </div>
        <p style={{ color: 'var(--a-muted)', fontSize: '0.875rem', marginBottom: 16 }}>
          Resetting will restore all content to default values and clear any edits you've made.
        </p>
        <button className="admin-btn admin-btn--danger" onClick={handleReset}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/></svg>
          Reset All Content to Defaults
        </button>
      </div>
    </>
  );
}
