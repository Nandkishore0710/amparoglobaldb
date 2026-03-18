import React, { useState } from 'react';
import logo from '../../amparologo-2.png';
import '../admin/Admin.css';

import { useContent } from './AdminContext';

export default function AdminLogin({ onLogin }) {
  const { state } = useContent();
  const [pw, setPw]     = useState('');
  const [err, setErr]   = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pw === state.adminPassword) {
      sessionStorage.setItem('admin_auth', 'true');
      onLogin();
    } else {
      setErr('Incorrect password. Please try again.');
    }
  };

  return (
    <div className="admin-login">
      <div className="admin-login__box">
        <div className="admin-login__logo">
          <img src={logo} alt="AMPARO" />
        </div>
        <h1 className="admin-login__title">Admin Panel</h1>
        <p className="admin-login__sub">Sign in to manage your website content</p>

        {err && <div className="admin-login__error">⚠ {err}</div>}

        <form onSubmit={handleSubmit}>
          <div className="admin-field">
            <label>Username</label>
            <input className="admin-input" value="admin" disabled />
          </div>
          <div className="admin-field">
            <label>Password</label>
            <input
              className="admin-input"
              type="password"
              value={pw}
              onChange={e => { setPw(e.target.value); setErr(''); }}
              placeholder="Enter admin password"
              autoFocus
            />
          </div>
          <button type="submit" className="admin-btn admin-btn--primary" style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}>
            Sign In
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </form>

        <p style={{ marginTop: 24, textAlign: 'center', fontSize: '0.78rem', color: 'var(--a-muted)' }}>
          Default password: <code style={{ color: 'var(--a-red)' }}>amparo2024</code>
        </p>
      </div>
    </div>
  );
}
