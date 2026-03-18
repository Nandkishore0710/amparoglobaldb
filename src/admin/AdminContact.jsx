import React, { useState } from 'react';
import { useContent } from './AdminContext';

function Toast({ msg }) {
  return msg ? <div className="admin-toast">✓ {msg}</div> : null;
}

export default function AdminContact() {
  const { state, dispatch } = useContent();
  const [info, setInfo] = useState({ ...state.contactInfo });
  const [toast, setToast] = useState('');

  const save = () => {
    dispatch({ type: 'SET_CONTACT_INFO', payload: info });
    setToast('Contact info saved!');
    setTimeout(() => setToast(''), 3000);
  };

  return (
    <>
      <Toast msg={toast} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 className="admin-page-title">Contact Information</h1>
          <p className="admin-page-sub">Update the contact details shown on the Contact page.</p>
        </div>
        <button className="admin-btn admin-btn--primary" onClick={save}>💾 Save Changes</button>
      </div>

      <div className="admin-card">
        <div className="admin-field">
          <label>Email Address</label>
          <input className="admin-input" type="email" value={info.email} onChange={e => setInfo(p => ({ ...p, email: e.target.value }))} />
        </div>
        <div className="admin-field">
          <label>Phone Number</label>
          <input className="admin-input" type="tel" value={info.phone} onChange={e => setInfo(p => ({ ...p, phone: e.target.value }))} />
        </div>
        <div className="admin-field">
          <label>Office Address</label>
          <textarea className="admin-textarea" style={{ minHeight: 80 }} value={info.address} onChange={e => setInfo(p => ({ ...p, address: e.target.value }))} />
        </div>
      </div>
    </>
  );
}
