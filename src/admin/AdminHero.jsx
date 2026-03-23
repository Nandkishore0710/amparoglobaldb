import React, { useState } from 'react';
import { useContent } from './AdminContext';

function Toast({ msg }) {
  return msg ? <div className="admin-toast">✓ {msg}</div> : null;
}

export default function AdminHero() {
  const { state, dispatch } = useContent();
  
  // Local state for drafting changes
  const [slides, setSlides]         = useState((state.slides || []).map(s => ({ ...s })));
  const [heroStats, setHeroStats]   = useState((state.heroStats || []).map(s => ({ ...s })));
  const [heroAlerts, setHeroAlerts] = useState((state.heroAlerts || []).map(a => ({ ...a })));
  const [activeSlideIdx, setActiveSlideIdx] = useState(0);
  const [tab, setTab]               = useState('slides');
  const [toast, setToast]           = useState('');

  const updateSlide = (id, field, val) =>
    setSlides(prev => prev.map(s => s.id === id ? { ...s, [field]: (typeof val === 'string' ? val.trim() : (val || '')) } : s));

  const removeSlide = (id) => {
    if (slides.length <= 1) return alert("You must have at least one slide.");
    setSlides(prev => prev.filter(s => s.id !== id));
    setActiveSlideIdx(0);
  };

  const addSlide = () => {
    const newId = Math.max(...slides.map(s => s.id), 0) + 1;
    const newSlide = { 
      id: newId, tag: 'New Tag', headline: 'New Headline', highlight: 'Highlight', 
      sub: 'Subtitle text here.', cta1Label: 'Learn More', cta1Href: '/', 
      cta2Label: 'Contact', cta2Href: '/contact', badge: '🚀 Badge Text', 
      bgImage: '', visualImage: '' 
    };
    setSlides(prev => [...prev, newSlide]);
    setActiveSlideIdx(slides.length);
  };

  const updateStat = (idx, field, val) => {
    const next = [...heroStats];
    next[idx][field] = val;
    setHeroStats(next);
  };
  const addStat = () => setHeroStats(p => [...p, { label: 'New Stat', val: '0' }]);
  const removeStat = (idx) => setHeroStats(p => p.filter((_, i) => i !== idx));

  const updateAlert = (idx, field, val) => {
    const next = [...heroAlerts];
    next[idx][field] = val;
    setHeroAlerts(next);
  };
  const addAlert = () => setHeroAlerts(p => [...p, { text: 'New notification', type: 'green' }]);
  const removeAlert = (idx) => setHeroAlerts(p => p.filter((_, i) => i !== idx));

  const compressImage = (file, maxWidth = 1200, quality = 0.8) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          // Force to WebP for massive compression gains
          const compressedBase64 = canvas.toDataURL('image/webp', quality);
          resolve(compressedBase64);
        };
        img.onerror = (err) => reject(err);
      };
      reader.onerror = (err) => reject(err);
    });
  };

  const handleImageUpload = async (id, file, field = 'bgImage') => {
    if (!file) return;

    setToast('Optimizing and uploading image...');
    
    try {
      // Compress heavily on the client side so it perfectly fits in MongoDB
      const compressedData = await compressImage(file, 1600, 0.75); // Max 1600px wide, 75% WebP quality
      updateSlide(id, field, compressedData);
      setToast('Image optimized and saved successfully!');
    } catch (err) {
      console.error("Compression/Upload error:", err);
      alert(`❌ Error processing image: ${err.message || 'Unknown error'}`);
    } finally {
      setTimeout(() => setToast(''), 3000);
    }
  };

  const save = () => {
    dispatch({ type: 'SET_SLIDES',      payload: slides });
    dispatch({ type: 'SET_HERO_STATS',  payload: heroStats });
    dispatch({ type: 'SET_HERO_ALERTS', payload: heroAlerts });
    setToast('Hero content saved!');
    setTimeout(() => setToast(''), 3000);
  };

  const activeSlide = slides[activeSlideIdx];

  return (
    <>
      <Toast msg={toast} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 className="admin-page-title">Hero Banner</h1>
          <p className="admin-page-sub">Manage slides, dashboard stats, and the live alert feed.</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="admin-btn admin-btn--primary" onClick={save}>💾 Save Changes</button>
        </div>
      </div>

      <div className="admin-tabs" style={{ marginBottom: 24 }}>
        <button className={`admin-tab ${tab === 'slides' ? 'active' : ''}`} onClick={() => setTab('slides')}>🖼️ Slides & Visuals</button>
        <button className={`admin-tab ${tab === 'stats' ? 'active' : ''}`} onClick={() => setTab('stats')}>📊 Dashboard Stats</button>
        <button className={`admin-tab ${tab === 'alerts' ? 'active' : ''}`} onClick={() => setTab('alerts')}>🚨 Live Alerts</button>
      </div>

      {tab === 'stats' && (
        <div className="admin-grid-2">
          {heroStats.map((s, i) => (
            <div key={i} className="admin-item-row">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                <span className="admin-item-row__badge">Stat {i + 1}</span>
                <button className="admin-btn admin-btn--danger admin-btn--sm" onClick={() => removeStat(i)}>✕</button>
              </div>
              <div className="admin-field">
                <label>Stat Label</label>
                <input className="admin-input" value={s.label} onChange={e => updateStat(i, 'label', e.target.value)} />
              </div>
              <div className="admin-field">
                <label>Value</label>
                <input className="admin-input" value={s.val} onChange={e => updateStat(i, 'val', e.target.value)} />
              </div>
            </div>
          ))}
          <button className="admin-btn admin-btn--secondary" onClick={addStat} style={{ gridColumn: '1/-1' }}>+ Add New Stat</button>
        </div>
      )}

      {tab === 'alerts' && (
        <div className="admin-grid-2">
          {heroAlerts.map((a, i) => (
            <div key={i} className="admin-item-row">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                <span className="admin-item-row__badge">Alert {i + 1}</span>
                <button className="admin-btn admin-btn--danger admin-btn--sm" onClick={() => removeAlert(i)}>✕</button>
              </div>
              <div className="admin-field">
                <label>Alert Text</label>
                <input className="admin-input" value={a.text} onChange={e => updateAlert(i, 'text', e.target.value)} />
              </div>
              <div className="admin-field">
                <label>Status Color</label>
                <select className="admin-input" value={a.type} onChange={e => updateAlert(i, 'type', e.target.value)}>
                  <option value="red">🔴 High</option>
                  <option value="yellow">🟡 Warning</option>
                  <option value="green">🟢 Normal</option>
                  <option value="blue">🔵 Info</option>
                </select>
              </div>
            </div>
          ))}
          <button className="admin-btn admin-btn--secondary" onClick={addAlert} style={{ gridColumn: '1/-1' }}>+ Add New Alert</button>
        </div>
      )}

      {tab === 'slides' && (
        <div className="admin-slides-container">
          <div style={{ display: 'flex', gap: 10, marginBottom: 20, overflowX: 'auto', paddingBottom: 10 }}>
            {slides.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setActiveSlideIdx(idx)}
                style={{
                  padding: '12px 24px',
                  borderRadius: '12px',
                  border: '1px solid var(--a-border)',
                  background: activeSlideIdx === idx ? 'var(--a-red)' : '#fff',
                  color: activeSlideIdx === idx ? '#fff' : 'var(--a-text)',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  whiteSpace: 'nowrap',
                  boxShadow: activeSlideIdx === idx ? '0 4px 12px rgba(232, 25, 44, 0.2)' : 'none'
                }}
              >
                Slide {idx + 1} {idx === 0 ? '(Home)' : ''}
              </button>
            ))}
            <button 
              className="admin-btn admin-btn--secondary" 
              style={{ borderRadius: '12px', padding: '12px 24px', fontWeight: 700 }}
              onClick={addSlide}
            >
              + Add New
            </button>
          </div>

          {activeSlide && (
            <div className="admin-card" style={{ padding: '35px', background: '#fff' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 }}>
                <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800 }}>⚙️ Slide {activeSlideIdx + 1} Configuration</h3>
                <button className="admin-btn admin-btn--danger admin-btn--sm" onClick={() => removeSlide(activeSlide.id)}>✕ Delete Slide</button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 30 }}>
                <div className="admin-field">
                  <label>Tag Text</label>
                  <input className="admin-input" value={activeSlide.tag} onChange={e => updateSlide(activeSlide.id, 'tag', e.target.value)} />
                </div>
                <div className="admin-field">
                  <label>Badge Text</label>
                  <input className="admin-input" value={activeSlide.badge} onChange={e => updateSlide(activeSlide.id, 'badge', e.target.value)} />
                </div>
              </div>

              <div className="admin-field">
                <label>Main Headline</label>
                <input className="admin-input" value={activeSlide.headline} onChange={e => updateSlide(activeSlide.id, 'headline', e.target.value)} />
              </div>

              <div className="admin-field">
                <label>Headline Highlight (Red)</label>
                <input className="admin-input" value={activeSlide.highlight} onChange={e => updateSlide(activeSlide.id, 'highlight', e.target.value)} />
              </div>

              <div className="admin-field">
                <label>Subtitle / Description</label>
                <textarea className="admin-textarea" value={activeSlide.sub} onChange={e => updateSlide(activeSlide.id, 'sub', e.target.value)} />
              </div>

              <div className="admin-divider" />

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 30 }}>
                <div className="admin-field">
                  <label>CTA 1 URL</label>
                  <input className="admin-input" value={activeSlide.cta1Href} onChange={e => updateSlide(activeSlide.id, 'cta1Href', e.target.value)} />
                </div>
                <div className="admin-field">
                  <label>CTA 2 URL</label>
                  <input className="admin-input" value={activeSlide.cta2Href} onChange={e => updateSlide(activeSlide.id, 'cta2Href', e.target.value)} />
                </div>
              </div>

              <div className="admin-divider" />

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 30 }}>
                <div className="admin-field">
                  <label>Background Image</label>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <input 
                      className="admin-input" 
                      value={(activeSlide.bgImage && activeSlide.bgImage.startsWith('data:')) ? '[Local File Uploaded]' : (activeSlide.bgImage || '')} 
                      onChange={e => updateSlide(activeSlide.id, 'bgImage', e.target.value)} 
                      placeholder="URL or upload..." 
                    />
                    {activeSlide.bgImage && (
                      <button 
                        className="admin-btn admin-btn--danger admin-btn--sm" 
                        onClick={() => updateSlide(activeSlide.id, 'bgImage', '')}
                        title="Clear BG"
                      >
                        ✕
                      </button>
                    )}
                    <label className="admin-btn admin-btn--secondary" style={{ cursor: 'pointer' }} title="Upload Background">
                      📂 <input 
                        type="file" 
                        accept="image/*"
                        hidden 
                        onChange={e => {
                          handleImageUpload(activeSlide.id, e.target.files[0], 'bgImage');
                          e.target.value = ''; 
                        }} 
                      />
                    </label>
                  </div>
                </div>

                <div className="admin-field">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label>Hero Visual (Card Replace) 🖼️</label>
                    <span style={{ fontSize: '0.7rem', color: '#888', fontWeight: 600 }}>Empty = Default Screen</span>
                  </div>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <input 
                      className="admin-input" 
                      value={(activeSlide.visualImage && activeSlide.visualImage.startsWith('data:')) ? '[Local File Uploaded]' : (activeSlide.visualImage || '')} 
                      onChange={e => updateSlide(activeSlide.id, 'visualImage', e.target.value)} 
                      placeholder="URL or upload..." 
                    />
                    {activeSlide.visualImage && (
                      <button 
                        className="admin-btn admin-btn--danger admin-btn--sm" 
                        onClick={() => updateSlide(activeSlide.id, 'visualImage', '')}
                        title="Clear Image"
                      >
                        ✕
                      </button>
                    )}
                    <label className="admin-btn admin-btn--secondary" style={{ cursor: 'pointer' }} title="Upload Local Image">
                      🖼️ <input 
                        type="file" 
                        accept="image/*"
                        hidden 
                        onChange={e => {
                          console.log("Uploading visual for slide:", activeSlide.id);
                          handleImageUpload(activeSlide.id, e.target.files[0], 'visualImage');
                          e.target.value = ''; 
                        }} 
                      />
                    </label>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 20, marginTop: 20 }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '0.8rem', color: '#888', fontWeight: 700, display: 'block', marginBottom: 5 }}>Background Overlay</label>
                  {activeSlide.bgImage ? (
                    <img src={activeSlide.bgImage} style={{ width: '100%', height: 120, objectFit: 'cover', borderRadius: 12, border: '1px solid #10b981' }} alt="BG Preview" />
                  ) : (
                    <div style={{ width: '100%', height: 120, background: '#f1f5f9', borderRadius: 12, border: '1px dashed #ccc', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999', fontSize: '0.8rem' }}>No Overlay</div>
                  )}
                </div>

                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '0.8rem', color: '#888', fontWeight: 700, display: 'block', marginBottom: 5 }}>Hero Visual (Card)</label>
                  {activeSlide.visualImage ? (
                    <div style={{ position: 'relative' }}>
                      <img src={activeSlide.visualImage} style={{ width: '100%', height: 120, objectFit: 'contain', background: '#f8fafc', borderRadius: 12, border: '1px solid var(--a-red)' }} alt="Visual Preview" />
                      <div style={{ position: 'absolute', top: 5, right: 5, background: 'rgba(232, 25, 44, 0.1)', color: 'var(--a-red)', padding: '2px 8px', borderRadius: 4, fontSize: '0.65rem', fontWeight: 800 }}>CUSTOM</div>
                    </div>
                  ) : (
                    <div style={{ width: '100%', height: 120, background: '#f8fafc', borderRadius: 12, border: '1px dashed var(--a-green)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                       <span style={{ fontSize: '1.2rem' }}>📊</span>
                       <span style={{ fontSize: '0.7rem', color: 'var(--a-green)', fontWeight: 600 }}>Default Dashboard Active</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
