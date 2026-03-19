import React, { useState } from 'react';
import { useContent } from './AdminContext';

function Toast({ msg }) {
  return msg ? <div className="admin-toast">✓ {msg}</div> : null;
}

export default function AdminTestimonials() {
  const { state, dispatch } = useContent();
  const [settings, setSettings] = useState(state.testimonialSettings || { title: 'WHAT OUR CLIENTS SAY?', testimonials: [] });
  const [toast, setToast] = useState('');

  const updateTitle = (val) => setSettings({ ...settings, title: val });

  const updateTestimonial = (id, field, val) => {
    const updated = settings.testimonials.map(t => t.id === id ? { ...t, [field]: val } : t);
    setSettings({ ...settings, testimonials: updated });
  };

  const handleImageUpload = (id, file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      updateTestimonial(id, 'image', reader.result);
    };
    reader.readAsDataURL(file);
  };

  const addTestimonial = () => {
    const newId = Math.max(...settings.testimonials.map(t => t.id), 0) + 1;
    const newTestimonial = {
      id: newId,
      name: 'New Name',
      role: 'Role',
      company: 'Company',
      title: 'Feedback Title',
      text: 'Testimonial text goes here...',
      rating: 5.0,
      image: ''
    };
    setSettings({ ...settings, testimonials: [...settings.testimonials, newTestimonial] });
  };

  const removeTestimonial = (id) => {
    if (window.confirm('Remove this testimonial?')) {
      setSettings({ ...settings, testimonials: settings.testimonials.filter(t => t.id !== id) });
    }
  };

  const save = () => {
    dispatch({ type: 'SET_TESTIMONIALS', payload: settings });
    setToast('Testimonials saved!');
    setTimeout(() => setToast(''), 3000);
  };

  return (
    <>
      <Toast msg={toast} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 className="admin-page-title">Client Testimonials</h1>
          <p className="admin-page-sub">Manage the "What Our Clients Say" section on the homepage.</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="admin-btn admin-btn--secondary" onClick={addTestimonial}>+ Add Testimonial</button>
          <button className="admin-btn admin-btn--primary" onClick={save}>💾 Save Changes</button>
        </div>
      </div>

      <div className="admin-card" style={{ marginBottom: '24px' }}>
        <div className="admin-field">
          <label>Section Title</label>
          <input 
            className="admin-input" 
            value={settings.title} 
            onChange={e => updateTitle(e.target.value)} 
            placeholder="e.g. WHAT OUR CLIENTS SAY?"
          />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '20px' }}>
        {settings.testimonials.map((t, idx) => (
          <div key={t.id} className="admin-item-row" style={{ height: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
              <span className="admin-item-row__badge">Testimonial {idx + 1} {idx === 1 ? '(Featured Card)' : ''}</span>
              <button 
                className="admin-btn admin-btn--danger admin-btn--sm" 
                onClick={() => removeTestimonial(t.id)}
              >
                ✕
              </button>
            </div>

            <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
              <div 
                style={{ 
                  width: '80px', height: '80px', borderRadius: '50%', background: '#eee', 
                  overflow: 'hidden', cursor: 'pointer', border: '2px solid var(--red)' 
                }}
                onClick={() => document.getElementById(`img-upload-${t.id}`).click()}
              >
                {t.image ? (
                  <img src={t.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', color: '#999' }}>👤</div>
                )}
                <input 
                  type="file" 
                  id={`img-upload-${t.id}`} 
                  hidden 
                  accept="image/*" 
                  onChange={e => handleImageUpload(t.id, e.target.files[0])} 
                />
              </div>
              <div style={{ flex: 1 }}>
                <div className="admin-field">
                  <label>Name</label>
                  <input className="admin-input" value={t.name} onChange={e => updateTestimonial(t.id, 'name', e.target.value)} />
                </div>
              </div>
            </div>

            <div className="admin-grid-2">
              <div className="admin-field">
                <label>Role</label>
                <input className="admin-input" value={t.role} onChange={e => updateTestimonial(t.id, 'role', e.target.value)} />
              </div>
              <div className="admin-field">
                <label>Company</label>
                <input className="admin-input" value={t.company} onChange={e => updateTestimonial(t.id, 'company', e.target.value)} />
              </div>
            </div>

            <div className="admin-grid-2">
              <div className="admin-field">
                <label>Card Title (Headline)</label>
                <input className="admin-input" value={t.title} onChange={e => updateTestimonial(t.id, 'title', e.target.value)} />
              </div>
              <div className="admin-field">
                <label>Rating (0.0 - 5.0)</label>
                <input 
                  type="number" 
                  step="0.1" 
                  min="0" 
                  max="5" 
                  className="admin-input" 
                  value={t.rating} 
                  onChange={e => updateTestimonial(t.id, 'rating', parseFloat(e.target.value))} 
                />
              </div>
            </div>

            <div className="admin-field">
              <label>Feedback Text</label>
              <textarea 
                className="admin-textarea" 
                rows="4" 
                value={t.text} 
                onChange={e => updateTestimonial(t.id, 'text', e.target.value)}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
