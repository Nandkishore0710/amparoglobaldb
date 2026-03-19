import React, { useState, useMemo } from 'react';
import { useContent } from './AdminContext';

export default function AdminClientsPanel() {
  const { state, dispatch } = useContent();
  const [showAdd, setShowAdd] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  
  const initialForm = { 
    name: '', 
    email: '', 
    phone: '', 
    company: '', 
    status: 'Active',
    category: 'Enterprise',
    priority: 'Medium',
    logo: '',
    joinedDate: new Date().toISOString().split('T')[0],
    notes: ''
  };
  
  const [formData, setFormData] = useState(initialForm);

  const handleSave = (e) => {
    e.preventDefault();
    if (editingId) {
      const updated = state.clients.map(c => c.id === editingId ? { ...formData, id: editingId } : c);
      dispatch({ type: 'SET_CLIENTS', payload: updated });
      setEditingId(null);
    } else {
      const clientToAdd = { ...formData, id: Date.now() };
      dispatch({ type: 'SET_CLIENTS', payload: [...(state.clients || []), clientToAdd] });
    }
    setShowAdd(false);
    setFormData(initialForm);
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, logo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const startEdit = (client) => {
    setFormData(client);
    setEditingId(client.id);
    setShowAdd(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const deleteClient = (id) => {
    if (window.confirm('Permanent delete this client profile?')) {
      dispatch({ type: 'SET_CLIENTS', payload: (state.clients || []).filter(c => c.id !== id) });
    }
  };

  const filteredClients = useMemo(() => {
    return (state.clients || []).filter(c => {
      const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (c.company && c.company.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          (c.email && c.email.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesFilter = filterStatus === 'All' || c.status === filterStatus;
      return matchesSearch && matchesFilter;
    });
  }, [state.clients, searchTerm, filterStatus]);

  return (
    <div className="admin-page">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
        <div>
          <h1 className="admin-page-title" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ color: 'var(--a-red)' }}><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
            Client Ecosystem
          </h1>
          <p className="admin-page-sub">Centralized CRM for Amparo's global client base and strategic partners.</p>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button className="admin-btn admin-btn--secondary" onClick={() => {
            setSearchTerm('');
            setFilterStatus('All');
          }}>Clear Filters</button>
          <button className="admin-btn admin-btn--primary" onClick={() => {
            setEditingId(null);
            setFormData(initialForm);
            setShowAdd(!showAdd);
          }}>
            {showAdd ? 'Close Editor' : '✨ Register Client'}
          </button>
        </div>
      </div>

      {showAdd && (
        <div className="admin-card" style={{ border: '2px solid var(--a-red)', boxShadow: 'var(--a-shadow-lg)', animation: 'toastIn 0.3s ease' }}>
          <div className="admin-card__header">
            <span className="admin-card__title">
              {editingId ? 'Edit Client Profile' : 'New Client Onboarding'}
            </span>
          </div>
          <form onSubmit={handleSave} className="admin-form" style={{ padding: 20 }}>
            <div style={{ display: 'flex', gap: 32, marginBottom: 24 }}>
              {/* Logo Upload Section */}
              <div style={{ flexShrink: 0 }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: 12 }}>Corporate Identity (Logo)</label>
                <div 
                  style={{ 
                    width: 140, height: 140, background: '#f8fafc', borderRadius: 16, border: '2px dashed var(--a-border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', cursor: 'pointer', position: 'relative',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseOver={e => e.currentTarget.style.borderColor = 'var(--a-red)'}
                  onMouseOut={e => e.currentTarget.style.borderColor = 'var(--a-border)'}
                  onClick={() => document.getElementById('client-logo-upload').click()}
                >
                  {formData.logo ? (
                    <img src={formData.logo} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 12 }} />
                  ) : (
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '1.5rem', marginBottom: 4 }}>🖼️</div>
                      <div style={{ fontSize: '0.7rem', color: '#999', fontWeight: 600 }}>Click to Upload</div>
                    </div>
                  )}
                  <input id="client-logo-upload" type="file" hidden accept="image/*" onChange={handleLogoUpload} />
                </div>
                {formData.logo && (
                  <button 
                    type="button" 
                    onClick={(e) => { e.stopPropagation(); setFormData({...formData, logo: ''}); }}
                    style={{ background: 'none', border: 'none', color: 'var(--a-red)', fontSize: '0.75rem', marginTop: 8, cursor: 'pointer', fontWeight: 600 }}
                  >
                    ✕ Remove Logo
                  </button>
                )}
              </div>

              {/* Form Fields */}
              <div style={{ flex: 1 }}>
                <div className="admin-grid-2" style={{ gap: '20px' }}>
                  <div className="admin-field" style={{ marginBottom: 16 }}>
                    <label>Primary Contact Name</label>
                    <input required className="admin-input" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Full legal name" />
                  </div>
                  <div className="admin-field" style={{ marginBottom: 16 }}>
                    <label>Company / Organization</label>
                    <input className="admin-input" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} placeholder="Entity name" />
                  </div>
                  <div className="admin-field" style={{ marginBottom: 16 }}>
                    <label>Client Category</label>
                    <select className="admin-select" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                      <option>Enterprise</option>
                      <option>Government</option>
                      <option>Strategic Partner</option>
                      <option>Retail/SMB</option>
                    </select>
                  </div>
                  <div className="admin-field" style={{ marginBottom: 16 }}>
                    <label>Account Priority</label>
                    <select className="admin-select" value={formData.priority} onChange={e => setFormData({...formData, priority: e.target.value})}>
                      <option>Critical</option>
                      <option>High</option>
                      <option>Medium</option>
                      <option>Low</option>
                    </select>
                  </div>
                  <div className="admin-field" style={{ marginBottom: 16 }}>
                    <label>Current Status</label>
                    <select className="admin-select" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                      <option>Active</option>
                      <option>Inactive</option>
                      <option>Pending</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="admin-grid-3">
              <div className="admin-field">
                <label>Industry Vertical</label>
                <select className="admin-select" value={formData.industry || 'Logistics'} onChange={e => setFormData({...formData, industry: e.target.value})}>
                  <option>Logistics & Supply Chain</option>
                  <option>Manufacturing & Industrial</option>
                  <option>Retail & E-commerce</option>
                  <option>Banking & Finance</option>
                  <option>Healthcare & Pharma</option>
                  <option>Smart Cities / Gov</option>
                </select>
              </div>
              <div className="admin-field" style={{ gridColumn: 'span 2' }}>
                <label>Company Registered Address</label>
                <input className="admin-input" value={formData.address || ''} onChange={e => setFormData({...formData, address: e.target.value})} placeholder="Full regional office address..." />
              </div>
            </div>

            <div className="admin-grid-3">
              <div className="admin-field">
                <label>Work Email</label>
                <input type="email" required className="admin-input" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="name@company.com" />
              </div>
              <div className="admin-field">
                <label>Phone Number</label>
                <input className="admin-input" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} placeholder="+91 ..." />
              </div>
              <div className="admin-field">
                <label>Last Contacted</label>
                <input type="date" className="admin-input" value={formData.lastContacted || ''} onChange={e => setFormData({...formData, lastContacted: e.target.value})} />
              </div>
            </div>

            <div className="admin-field">
              <label>Internal Relationship Notes</label>
              <textarea className="admin-textarea" value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})} placeholder="Key stakeholders, pain points, or project goals..." style={{ minHeight: 80 }} />
            </div>

            <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
              <button type="submit" className="admin-btn admin-btn--primary">
                {editingId ? '↻ Update Profile' : '✅ Finalize Registration'}
              </button>
              <button type="button" className="admin-btn admin-btn--secondary" onClick={() => setShowAdd(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* Stats Summary */}
      <div className="admin-grid-4" style={{ marginBottom: 32 }}>
        <div className="admin-stat">
          <div className="admin-stat__label">Active Accounts</div>
          <div className="admin-stat__val blue">{(state.clients || []).filter(c => c.status === 'Active').length}</div>
        </div>
        <div className="admin-stat">
          <div className="admin-stat__label">Enterprise Tier</div>
          <div className="admin-stat__val red">{(state.clients || []).filter(c => c.category === 'Enterprise').length}</div>
        </div>
        <div className="admin-stat">
          <div className="admin-stat__label">Strategic Partners</div>
          <div className="admin-stat__val yellow">{(state.clients || []).filter(c => c.category === 'Strategic Partner').length}</div>
        </div>
        <div className="admin-stat">
          <div className="admin-stat__label">Conversion Rate</div>
          <div className="admin-stat__val green">24%</div>
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-card__header" style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', gap: 16, flex: 1 }}>
            <div className="admin-search-wrap" style={{ flex: 1, maxWidth: 400, position: 'relative' }}>
              <input 
                type="text" 
                placeholder="Search by name, company, or email..." 
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="admin-input"
                style={{ paddingLeft: 40, background: '#fdfdfd', fontSize: '0.9rem' }}
              />
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', opacity: 0.4 }}><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
            </div>
            
            <div style={{ display: 'flex', gap: 8 }}>
              {['All', 'Active', 'Inactive', 'Pending'].map(status => (
                <button 
                  key={status} 
                  className={`admin-btn admin-btn--sm ${filterStatus === status ? 'admin-btn--primary' : 'admin-btn--secondary'}`}
                  onClick={() => setFilterStatus(status)}
                  style={{ borderRadius: 20, padding: '4px 16px', fontSize: '0.75rem' }}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="admin-table-wrap" style={{ margin: '0 -24px -24px', overflowX: 'auto' }}>
          <table className="admin-table" style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0 }}>
            <thead>
              <tr style={{ background: '#fcfcfd' }}>
                <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '0.75rem', textTransform: 'uppercase', color: '#999', borderBottom: '1px solid var(--a-border)' }}>Client / Company</th>
                <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '0.75rem', textTransform: 'uppercase', color: '#999', borderBottom: '1px solid var(--a-border)' }}>Contact Matrix</th>
                <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '0.75rem', textTransform: 'uppercase', color: '#999', borderBottom: '1px solid var(--a-border)' }}>Engagement & Projects</th>
                <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '0.75rem', textTransform: 'uppercase', color: '#999', borderBottom: '1px solid var(--a-border)' }}>Priority & Industry</th>
                <th style={{ padding: '16px 24px', textAlign: 'right', fontSize: '0.75rem', textTransform: 'uppercase', color: '#999', borderBottom: '1px solid var(--a-border)' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.map(client => {
                const clientProjects = state.projects?.filter(p => p.client === client.name || p.client === client.company) || [];
                const priorityColor = client.priority === 'Critical' ? '#e11d48' : client.priority === 'High' ? '#f59e0b' : '#3b82f6';
                
                return (
                  <tr key={client.id} className="admin-table-row" style={{ borderBottom: '1px solid #f2f2f2' }}>
                    <td style={{ padding: '20px 24px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                        <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--a-bg)', color: 'var(--a-red)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.1rem', border: '1px solid var(--a-border)', overflow: 'hidden' }}>
                          {client.logo ? <img src={client.logo} style={{ width: '100%', height: '100%', objectFit: 'contain' }} /> : client.name[0]}
                        </div>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '1rem', color: '#111' }}>{client.name}</div>
                          <div style={{ fontSize: '0.8rem', color: '#666', marginTop: 2 }}>{client.company || 'Private Entity'}</div>
                          <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
                             <span style={{ fontSize: '0.65rem', background: '#f3f4f6', padding: '2px 6px', borderRadius: 4, color: '#6b7280', fontWeight: 600 }}>{client.category || 'Strategic'}</span>
                             {clientProjects.length > 0 && <span style={{ fontSize: '0.65rem', background: 'var(--a-red-dim)', padding: '2px 6px', borderRadius: 4, color: 'var(--a-red)', fontWeight: 600 }}>Active Projects</span>}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '20px 24px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.85rem', color: '#444' }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                          {client.email || '—'}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.85rem', color: '#888' }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013 12a19.79 19.79 0 01-3.07-8.67A2 2 0 011.92 2h3A2 2 0 017 3.77a12.68 12.68 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
                          {client.phone || '—'}
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '20px 24px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                         <div style={{ flex: 1, minWidth: 60, height: 6, background: '#eee', borderRadius: 3, overflow: 'hidden' }}>
                            <div style={{ width: client.status === 'Active' ? '100%' : '20%', height: '100%', background: client.status === 'Active' ? 'var(--a-green)' : '#ccc' }} />
                         </div>
                         <span style={{ fontSize: '0.75rem', fontWeight: 600, color: client.status === 'Active' ? 'var(--a-green)' : '#999' }}>{client.status}</span>
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#666', marginTop: 8, fontWeight: 500 }}>
                        {clientProjects.length > 0 ? (
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                            {clientProjects.map(p => (
                              <span key={p.id} style={{ background: '#fef2f2', border: '1px solid #fee2e2', color: 'var(--a-red)', fontSize: '0.65rem', padding: '2px 8px', borderRadius: 4 }}>
                                🚀 {p.name}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span style={{ color: '#aaa', fontStyle: 'italic' }}>No active projects</span>
                        )}
                      </div>
                    </td>
                    <td style={{ padding: '20px 24px' }}>
                       <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <span style={{ width: 8, height: 8, borderRadius: '50%', background: priorityColor }} />
                          <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{client.priority || 'Normal'}</span>
                       </div>
                       <div style={{ fontSize: '0.65rem', color: '#999', marginTop: 4 }}>{client.industry || 'Logistics'}</div>
                    </td>
                    <td style={{ padding: '20px 24px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                        <button 
                          className="admin-btn admin-btn--secondary admin-btn--sm"
                          style={{ padding: '6px 16px', borderRadius: 20, display: 'flex', alignItems: 'center', gap: 6 }}
                          onClick={() => startEdit(client)}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                          Edit Profile
                        </button>
                        <button 
                          className="admin-btn admin-btn--danger admin-btn--sm"
                          style={{ padding: '6px 12px', background: 'transparent' }}
                          onClick={() => deleteClient(client.id)}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filteredClients.length === 0 && (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '60px', color: '#888', background: '#fdfdfd' }}>
                     <div style={{ fontSize: '3rem', marginBottom: 16, opacity: 0.3 }}>🔍</div>
                     <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>No client matches found</div>
                     <p style={{ marginTop: 4, opacity: 0.6 }}>Try adjusting your search terms or filters.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Help Section */}
      <div className="admin-card" style={{ background: 'linear-gradient(135deg, white 0%, #fff5f5 100%)', borderStyle: 'dashed' }}>
         <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
            <div style={{ fontSize: '2.5rem' }}>💡</div>
            <div>
               <h4 style={{ margin: '0 0 4px 0', fontSize: '1rem' }}>Quick Tip: Engagement Sync</h4>
               <p style={{ margin: 0, fontSize: '0.85rem', color: '#666', lineHeight: 1.5 }}>
                  The "Engagement" status is automatically calculated based on the client's activity in the platform, including active projects, recent support chats, and ecommerce orders. Enterprise clients with pending projects are automatically flagged for follow-up.
               </p>
            </div>
         </div>
      </div>
    </div>
  );
}
