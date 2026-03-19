import React, { useState, useEffect } from 'react';
import { useContent } from './AdminContext';

export default function AdminClients() {
  const { state, dispatch } = useContent();
  const [localClients, setLocalClients] = useState(state.clients || []);
  const [saved, setSaved] = useState(false);

  // Keep local state in sync if global state changes externally (rare but good practice)
  useEffect(() => {
    if (!saved) {
      setLocalClients(state.clients || []);
    }
  }, [state.clients, saved]);

  const handleLogoUpload = (e, id) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updated = localClients.map(c => c.id === id ? { ...c, logo: reader.result } : c);
        setLocalClients(updated);
        setSaved(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const addClient = () => {
    const newClient = { id: Date.now(), name: 'New Client', logo: '' };
    setLocalClients([...localClients, newClient]);
    setSaved(false);
  };

  const updateName = (id, name) => {
    const updated = localClients.map(c => c.id === id ? { ...c, name } : c);
    setLocalClients(updated);
    setSaved(false);
  };

  const deleteClient = (id) => {
    if (window.confirm('Remove this client logo?')) {
      setLocalClients(localClients.filter(c => c.id != id));
      setSaved(false);
    }
  };

  const handleSave = () => {
    dispatch({ type: 'SET_CLIENTS', payload: localClients });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
    alert('Client logos saved successfully!');
  };

  return (
    <div className="admin-page">
      <div className="admin-card">
        <div className="admin-card__header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="admin-card__title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
            Client Social Proof
          </span>
          <div style={{ display: 'flex', gap: 10 }}>
            <button className="admin-btn admin-btn--primary" onClick={addClient}>+ Add Client</button>
            <button className="admin-btn admin-btn--success" onClick={handleSave} style={{ background: '#10b981', color: '#fff' }}>
              {saved ? '✓ Saved' : 'Save Changes'}
            </button>
          </div>
        </div>

        <p style={{ color: '#666', fontSize: '0.85rem', marginBottom: 24 }}>
          Manage the logos that appear in the scrolling "Trusted By" section on your homepage. 
          Upload logos with transparent backgrounds (PNG/SVG) for best results. 
          <strong> Click "Save Changes" to apply to the live site.</strong>
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
          {localClients.map(client => (
            <div key={client.id} className="admin-card" style={{ boxShadow: 'none', border: '1px solid #eee', padding: 20, background: '#f9f9fb' }}>
              <div style={{ display: 'flex', gap: 16 }}>
                <div 
                  style={{ 
                    width: 80, height: 80, background: '#fff', borderRadius: 8, border: '1px solid #ddd',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', cursor: 'pointer', position: 'relative'
                  }}
                  onClick={() => document.getElementById(`logo-${client.id}`).click()}
                >
                  {client.logo ? (
                    <img src={client.logo} alt={client.name} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 10 }} />
                  ) : (
                    <span style={{ fontSize: '1.5rem', color: '#ccc' }}>+</span>
                  )}
                  <input id={`logo-${client.id}`} type="file" hidden accept="image/*" onChange={(e) => handleLogoUpload(e, client.id)} />
                </div>
                
                <div style={{ flex: 1 }}>
                  <div className="admin-form-group" style={{ marginBottom: 12 }}>
                    <label style={{ fontSize: '0.7rem' }}>Company Name</label>
                    <input 
                      type="text" 
                      value={client.name} 
                      onChange={(e) => updateName(client.id, e.target.value)}
                      style={{ padding: '8px', fontSize: '0.9rem' }}
                    />
                  </div>
                  <button 
                    onClick={() => deleteClient(client.id)}
                    className="admin-btn admin-btn--danger admin-btn--sm"
                    style={{ marginTop: 8 }}
                  >
                    Remove Client
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
