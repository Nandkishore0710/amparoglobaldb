import React, { useState } from 'react';
import { useContent } from './AdminContext';

function Toast({ msg }) {
  return msg ? <div className="admin-toast">✓ {msg}</div> : null;
}

export default function AdminAbout() {
  const { state, dispatch } = useContent();
  const [stats, setStats]     = useState(state.stats.map(s => ({ ...s })));
  const [pillars, setPillars] = useState(state.pillars.map(p => ({ ...p })));
  const [footer, setFooter]   = useState(state.footerTagline);
  const [toast, setToast]     = useState('');
  const [tab, setTab]         = useState('stats');

  const updateStat = (id, field, val) => setStats(p => p.map(s => s.id === id ? { ...s, [field]: val } : s));
  const updatePillar = (id, field, val) => setPillars(p => p.map(s => s.id === id ? { ...s, [field]: val } : s));

  const save = () => {
    dispatch({ type: 'SET_STATS', payload: stats });
    dispatch({ type: 'SET_PILLARS', payload: pillars });
    dispatch({ type: 'SET_FOOTER', payload: footer });
    setToast('About & Footer saved!');
    setTimeout(() => setToast(''), 3000);
  };

  return (
    <>
      <Toast msg={toast} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 className="admin-page-title">About & Footer</h1>
          <p className="admin-page-sub">Edit company stats, value pillars, and footer tagline.</p>
        </div>
        <button className="admin-btn admin-btn--primary" onClick={save}>💾 Save Changes</button>
      </div>

      <div className="admin-tabs">
        {['stats', 'pillars', 'footer'].map(t => (
          <button key={t} className={`admin-tab${tab === t ? ' active' : ''}`} onClick={() => setTab(t)}>
            {t === 'stats' ? '📊 Stats' : t === 'pillars' ? '🏛️ Pillars' : '📝 Footer'}
          </button>
        ))}
      </div>

      {tab === 'stats' && (
        <div className="admin-grid-2">
          {stats.map(s => (
            <div key={s.id} className="admin-item-row">
              <span className="admin-item-row__badge">{s.val}</span>
              <div className="admin-field" style={{ marginTop: 12 }}>
                <label>Value</label>
                <input className="admin-input" value={s.val} onChange={e => updateStat(s.id, 'val', e.target.value)} />
              </div>
              <div className="admin-field">
                <label>Label</label>
                <input className="admin-input" value={s.lbl} onChange={e => updateStat(s.id, 'lbl', e.target.value)} />
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'pillars' && pillars.map((p, idx) => (
        <div key={p.id} className="admin-item-row">
          <div className="admin-item-row__handle">
            <span className="admin-item-row__badge">{p.icon.startsWith('data:') || p.icon.startsWith('http') ? <img src={p.icon} alt="" style={{ height: 20, verticalAlign: 'middle' }} /> : p.icon} {p.title}</span>
          </div>
          <div className="admin-grid-2">
            <div className="admin-field">
              <label>Icon (Emoji or Image)</label>
              <div style={{ display: 'flex', gap: 10 }}>
                <input className="admin-input" value={p.icon} onChange={e => updatePillar(p.id, 'icon', e.target.value)} placeholder="Emoji or URL" />
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
                        reader.onloadend = () => updatePillar(p.id, 'icon', reader.result);
                        reader.readAsDataURL(file);
                      }
                    }} 
                  />
                </label>
              </div>
            </div>
            <div className="admin-field">
              <label>Title</label>
              <input className="admin-input" value={p.title} onChange={e => updatePillar(p.id, 'title', e.target.value)} />
            </div>
          </div>
          <div className="admin-field">
            <label>Description</label>
            <textarea className="admin-textarea" value={p.desc} onChange={e => updatePillar(p.id, 'desc', e.target.value)} />
          </div>
        </div>
      ))}

      {tab === 'footer' && (
        <div className="admin-item-row">
          <div className="admin-field">
            <label>Footer Tagline</label>
            <textarea className="admin-textarea" value={footer} onChange={e => setFooter(e.target.value)} />
          </div>
        </div>
      )}
    </>
  );
}
