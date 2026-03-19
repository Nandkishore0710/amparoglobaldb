import React, { useState } from 'react';
import { useContent } from './AdminContext';

function Toast({ msg }) {
  return msg ? <div className="admin-toast">✓ {msg}</div> : null;
}

export default function AdminCases() {
  const { state, dispatch } = useContent();
  const [cases, setCases] = useState(state.cases.map(c => ({ ...c })));
  const [toast, setToast] = useState('');

  const update = (id, field, val) => setCases(p => p.map(c => c.id === id ? { ...c, [field]: val } : c));
  const remove = (id) => setCases(p => p.filter(c => c.id !== id));

  const addCase = () => {
    const newId = Math.max(...cases.map(c => c.id), 0) + 1;
    setCases(p => [...p, { id: newId, category: 'Category', title: 'Use Case Title', desc: 'Description here.', img: '🏢' }]);
  };

  const save = () => {
    dispatch({ type: 'SET_CASES', payload: cases });
    setToast('Use Cases saved!');
    setTimeout(() => setToast(''), 3000);
  };

  return (
    <>
      <Toast msg={toast} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 className="admin-page-title">Use Cases</h1>
          <p className="admin-page-sub">Edit the industry use case cards on the homepage.</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="admin-btn admin-btn--secondary" onClick={addCase}>+ Add Case</button>
          <button className="admin-btn admin-btn--primary" onClick={save}>💾 Save Changes</button>
        </div>
      </div>

      <div className="admin-grid-2">
        {cases.map((c, idx) => (
          <div key={c.id} className="admin-item-row">
            <div className="admin-item-row__handle">
              <span className="admin-item-row__badge">{c.img} {c.category}</span>
              <button className="admin-btn admin-btn--danger admin-btn--sm" onClick={() => remove(c.id)}>✕</button>
            </div>
            <div className="admin-grid-2">
              <div className="admin-field">
                <label>Icon (Emoji or Image)</label>
                <div style={{ display: 'flex', gap: 10 }}>
                  <input className="admin-input" value={c.img} onChange={e => update(c.id, 'img', e.target.value)} placeholder="Emoji or URL" />
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
                          reader.onloadend = () => update(c.id, 'img', reader.result);
                          reader.readAsDataURL(file);
                        }
                      }} 
                    />
                  </label>
                </div>
              </div>
              <div className="admin-field">
                <label>Category</label>
                <input className="admin-input" value={c.category} onChange={e => update(c.id, 'category', e.target.value)} />
              </div>
            </div>
            <div className="admin-field">
              <label>Title</label>
              <input className="admin-input" value={c.title} onChange={e => update(c.id, 'title', e.target.value)} />
            </div>
            <div className="admin-field">
              <label>Description</label>
              <textarea className="admin-textarea" style={{ minHeight: 70 }} value={c.desc} onChange={e => update(c.id, 'desc', e.target.value)} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
