import React, { useState   } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/amparologo-2.png';

const NAV_GROUPS = [
  {
    title: 'Client Management',
    items: [
      { label: 'Client Accounts', href: '/admin/client-panel', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg> },
      { label: 'Lead Inquiries', href: '/admin/messages', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> },
      { label: 'Support Chat',  href: '/admin/chat',     icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg> },
    ]
  },
  {
    title: 'Site Content',
    items: [
      { type: 'header', label: 'Identity' },
      { label: 'Hero Banner',  href: '/admin/hero',      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 10l4.553-2.277A1 1 0 0121 8.74V15.26a1 1 0 01-1.447.894L15 14M3 8h12v9a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"/></svg> },
      { label: 'Services',     href: '/admin/services',  icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
      { label: 'Client Logos',   href: '/admin/clients',      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg> },
      { label: 'Testimonials', href: '/admin/testimonials', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><circle cx="12" cy="12" r="1"/><circle cx="16" cy="12" r="1"/><circle cx="8" cy="12" r="1"/></svg> },
      
      { type: 'header', label: 'Other Sections' },
      { label: 'Use Cases',    href: '/admin/cases',     icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg> },
      { label: 'About / Stats',href: '/admin/about',     icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M6 20v-2a6 6 0 0112 0v2"/></svg> },
      { label: 'Contact Details', href: '/admin/contact',   icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013 12a19.79 19.79 0 01-8.63-3.07A2 2 0 011.92 2h3A2 2 0 017 3.77a12.68 12.68 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg> },
      { label: 'Header Menu',  href: '/admin/header',    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 7h-9m3 3L11 7l3-3m-1 13H4m1 3l3-3-3-3m15-1a2 2 0 11-4 0 2 2 0 014 0z"/></svg> },
      { label: 'Footer Links',  href: '/admin/footer',    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 11a9 9 0 018 4.5m0 0A9 9 0 0120 11M12 15.5V22m0-11V2"/></svg> },
    ]
  },
  {
    title: 'Business Ops',
    items: [
      { label: 'Ecommerce Store', href: '/admin/ecommerce', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4H6z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg> },
      { label: 'Project Tracking', href: '/admin/projects',  icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg> },
      { label: 'System Security', href: '/admin/security', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><circle cx="12" cy="11" r="3"/><path d="M12 17v1"/></svg> },
    ]
  }
];

export default function AdminLayout({ children, title, onLogout }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="admin-wrap">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar__logo">
          <img src={logo} alt="AMPARO" />
          <span className="admin-sidebar__badge">Admin</span>
        </div>

        <nav className="admin-sidebar__nav">
          {NAV_GROUPS.map(group => (
            <React.Fragment key={group.title}>
              <div className="admin-sidebar__section">{group.title}</div>
              {group.items.map((link, idx) => {
                if (link.type === 'header') {
                  return (
                    <div key={`header-${idx}`} className="admin-sidebar__sub-section">
                      {link.label}
                    </div>
                  );
                }
                return (
                  <NavLink
                    key={link.href}
                    to={link.href}
                    end={link.href === '/admin'}
                    className={({ isActive }) => `admin-nav-link${isActive ? ' active' : ''}`}
                  >
                    {link.icon}
                    {link.label}
                  </NavLink>
                );
              })}
            </React.Fragment>
          ))}
        </nav>

        <div className="admin-sidebar__footer">
          <a href="/" target="_blank" rel="noreferrer" className="admin-view-site">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg>
            View Live Site
          </a>
          <button className="admin-btn admin-btn--danger" style={{ width: '100%', justifyContent: 'center', marginTop: 10 }} onClick={onLogout}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/></svg>
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="admin-main">
        <div className="admin-topbar">
          <span className="admin-topbar__title">{title}</span>
          <div className="admin-topbar__actions">
            <a href="/" target="_blank" rel="noreferrer" className="admin-view-site">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg>
              Live Site
            </a>
            <div className="admin-topbar__user">
              <div className="admin-topbar__avatar">👤</div>
              <span>Admin</span>
            </div>
          </div>
        </div>
        <div className="admin-body">
          {children}
        </div>
      </main>
    </div>
  );
}
