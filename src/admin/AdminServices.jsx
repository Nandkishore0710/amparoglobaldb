import React, { useState } from 'react';
import { useContent } from './AdminContext';

function Toast({ msg }) {
  return msg ? <div className="admin-toast">✓ {msg}</div> : null;
}

export default function AdminServices() {
  const { state, dispatch } = useContent();
  const [services, setServices] = useState(state.services.map(s => ({ ...s, features: [...s.features] })));
  const [toast, setToast] = useState('');

  const update = (id, field, val) =>
    setServices(prev => prev.map(s => s.id === id ? { ...s, [field]: val } : s));

  const updateFeature = (id, idx, val) =>
    setServices(prev => prev.map(s => {
      if (s.id !== id) return s;
      const f = [...s.features]; f[idx] = val;
      return { ...s, features: f };
    }));

  const addFeature = (id) =>
    setServices(prev => prev.map(s => s.id === id ? { ...s, features: [...s.features, 'New Feature'] } : s));

  const removeFeature = (id, idx) =>
    setServices(prev => prev.map(s => {
      if (s.id !== id) return s;
      return { ...s, features: s.features.filter((_, i) => i !== idx) };
    }));

  const save = () => {
    dispatch({ type: 'SET_SERVICES', payload: services });
    setToast('Services saved!');
    setTimeout(() => setToast(''), 3000);
  };

  return (
    <>
      <Toast msg={toast} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 className="admin-page-title">Services</h1>
          <p className="admin-page-sub">Edit service cards displayed on the homepage and deep-dive Service Detail pages.</p>
        </div>
        <button className="admin-btn admin-btn--primary" onClick={save}>💾 Save Changes</button>
      </div>

      {services.map((svc, idx) => (
        <div key={svc.id} className="admin-item-row">
          <div className="admin-item-row__handle">
            <span className="admin-item-row__badge">Service {idx + 1}</span>
          </div>

          <div className="admin-grid-2">
            <div className="admin-field">
              <label>Title</label>
              <input className="admin-input" value={svc.title} onChange={e => update(svc.id, 'title', e.target.value)} />
            </div>
            <div className="admin-field">
              <label>Icon (Emoji or Image)</label>
              <div style={{ display: 'flex', gap: 10 }}>
                <input className="admin-input" value={svc.icon || ''} onChange={e => update(svc.id, 'icon', e.target.value)} placeholder="Emoji or URL" />
                <label className="admin-btn admin-btn--secondary" style={{ cursor: 'pointer', whiteSpace: 'nowrap' }}>
                  📂 Upload
                  <input 
                    type="file" 
                    hidden 
                    accept="image/*" 
                    onChange={e => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => update(svc.id, 'icon', reader.result);
                        reader.readAsDataURL(file);
                      }
                    }} 
                  />
                </label>
              </div>
            </div>
          </div>
          <div className="admin-field">
            <label>Slug (URL Link)</label>
            <input className="admin-input" value={svc.slug || ''} onChange={e => update(svc.id, 'slug', e.target.value)} />
          </div>

          <div className="admin-grid-2">
            <div className="admin-field">
              <label>Subtitle</label>
              <input className="admin-input" value={svc.subtitle} onChange={e => update(svc.id, 'subtitle', e.target.value)} />
            </div>
            <div className="admin-field">
              <label>Badge (Optional tag)</label>
              <input className="admin-input" value={svc.badge || ''} onChange={e => update(svc.id, 'badge', e.target.value)} />
            </div>
          </div>

          <div className="admin-field">
            <label>Short Description (for the Homepage card)</label>
            <textarea className="admin-textarea" value={svc.desc} onChange={e => update(svc.id, 'desc', e.target.value)} style={{ minHeight: '60px' }} />
          </div>

          <div className="admin-field">
            <label>Full HTML Content (for the detailed Service Page)</label>
            <textarea className="admin-textarea" value={svc.fullContent || ''} onChange={e => update(svc.id, 'fullContent', e.target.value)} style={{ minHeight: '180px', fontFamily: 'monospace' }} />
          </div>

          <div className="admin-field">
            <label>Features</label>
            {svc.features.map((f, fi) => (
              <div key={fi} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                <input className="admin-input" value={f} onChange={e => updateFeature(svc.id, fi, e.target.value)} />
                <button className="admin-btn admin-btn--danger admin-btn--sm" onClick={() => removeFeature(svc.id, fi)}>✕</button>
              </div>
            ))}
            <button className="admin-btn admin-btn--secondary admin-btn--sm" style={{ marginTop: 4, width: 'fit-content' }} onClick={() => addFeature(svc.id)}>+ Add Feature</button>
          </div>
        </div>
      ))}
    </>
  );
}
