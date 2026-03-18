import React, { useState } from 'react';
import { useContent } from './AdminContext';

function Toast({ msg }) {
  return msg ? <div className="admin-toast">✓ {msg}</div> : null;
}

export default function AdminServicesWhy() {
  const { state, dispatch } = useContent();
  const [data, setData] = useState({ ...state.servicesWhyChoose });
  const [toast, setToast] = useState('');

  const update = (field, val) => setData(prev => ({ ...prev, [field]: val }));
  
  const updateFeature = (idx, field, val) => {
    const nextFeats = [...data.features];
    nextFeats[idx] = { ...nextFeats[idx], [field]: val };
    setData(prev => ({ ...prev, features: nextFeats }));
  };

  const addFeature = () => {
    setData(prev => ({ ...prev, features: [...prev.features, { label: 'New Heading', text: 'New description' }] }));
  };

  const removeFeature = (idx) => {
    setData(prev => ({ ...prev, features: prev.features.filter((_, i) => i !== idx) }));
  };

  const save = () => {
    dispatch({ type: 'SET_SERVICES_WHY', payload: data });
    setToast('Why Choose section saved!');
    setTimeout(() => setToast(''), 3000);
  };

  return (
    <>
      <Toast msg={toast} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 className="admin-page-title">Why Choose (Services Page)</h1>
          <p className="admin-page-sub">Edit the deep-dive card at the bottom of the Services Page.</p>
        </div>
        <button className="admin-btn admin-btn--primary" onClick={save}>💾 Save Changes</button>
      </div>

      <div className="admin-item-row">
        <div className="admin-field">
          <label>Title</label>
          <input className="admin-input" value={data.title} onChange={e => update('title', e.target.value)} />
        </div>
        <div className="admin-field">
          <label>Description</label>
          <textarea className="admin-textarea" value={data.desc} onChange={e => update('desc', e.target.value)} />
        </div>
        
        <div className="admin-field" style={{ marginTop: 20 }}>
          <label>Key Bullet Points</label>
          {data.features.map((f, i) => (
            <div key={i} className="admin-item-row" style={{ background: 'rgba(0,0,0,0.02)', padding: 15 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                <span className="admin-item-row__badge">Point {i + 1}</span>
                <button className="admin-btn admin-btn--danger admin-btn--sm" onClick={() => removeFeature(i)}>✕</button>
              </div>
              <div className="admin-field">
                <label>Heading</label>
                <input className="admin-input" value={f.label} onChange={e => updateFeature(i, 'label', e.target.value)} />
              </div>
              <div className="admin-field">
                <label>Text</label>
                <textarea className="admin-input" value={f.text} onChange={e => updateFeature(i, 'text', e.target.value)} />
              </div>
            </div>
          ))}
          <button className="admin-btn admin-btn--secondary" onClick={addFeature}>+ Add Point</button>
        </div>
      </div>
    </>
  );
}
