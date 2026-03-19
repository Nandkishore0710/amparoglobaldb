import React, { useState } from 'react';
import { useContent } from './AdminContext';

export default function AdminSecurity() {
  const { state, dispatch } = useContent();
  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [msg, setMsg] = useState({ type: '', text: '' });

  const handleUpdate = (e) => {
    e.preventDefault();
    setMsg({ type: '', text: '' });

    if (currentPw !== state.adminPassword) {
      setMsg({ type: 'error', text: 'Current password is incorrect.' });
      return;
    }

    if (newPw !== confirmPw) {
      setMsg({ type: 'error', text: 'New passwords do not match.' });
      return;
    }

    if (newPw.length < 6) {
      setMsg({ type: 'error', text: 'Password must be at least 6 characters.' });
      return;
    }

    dispatch({ type: 'SET_ADMIN_PASSWORD', payload: newPw });
    setMsg({ type: 'success', text: 'Password updated successfully! Next time you log in, use your new password.' });
    setCurrentPw('');
    setNewPw('');
    setConfirmPw('');
  };

  return (
    <div className="admin-page">
      <div className="admin-card" style={{ maxWidth: 500, margin: '0 auto' }}>
        <div className="admin-card__header">
          <span className="admin-card__title">Update Administrative Password</span>
        </div>
        
        {msg.text && (
          <div style={{ 
            padding: '12px 16px', 
            borderRadius: 8, 
            marginBottom: 20,
            fontSize: '0.9rem',
            background: msg.type === 'error' ? '#fef2f2' : '#f0fdf4',
            color: msg.type === 'error' ? '#b91c1c' : '#166534',
            border: `1px solid ${msg.type === 'error' ? '#fee2e2' : '#dcfce7'}`
          }}>
            {msg.text}
          </div>
        )}

        <form onSubmit={handleUpdate}>
          <div className="admin-form-group">
            <label className="admin-label">Current Password</label>
            <input 
              type="password" 
              className="admin-input" 
              value={currentPw}
              onChange={e => setCurrentPw(e.target.value)}
              required
            />
          </div>

          <div style={{ margin: '24px 0', borderTop: '1px solid #eee' }}></div>

          <div className="admin-form-group">
            <label className="admin-label">New Password</label>
            <input 
              type="password" 
              className="admin-input" 
              value={newPw}
              onChange={e => setNewPw(e.target.value)}
              required
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Confirm New Password</label>
            <input 
              type="password" 
              className="admin-input" 
              value={confirmPw}
              onChange={e => setConfirmPw(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="admin-btn admin-btn--primary" style={{ width: '100%', justifyContent: 'center', marginTop: 10 }}>
            Update Password
          </button>
        </form>

        <p style={{ marginTop: 24, fontSize: '0.8rem', color: '#666', textAlign: 'center' }}>
          🔒 Password changes are saved locally to your browser storage.
        </p>
      </div>
    </div>
  );
}
