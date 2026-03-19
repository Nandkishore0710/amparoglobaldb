import React, { useState } from 'react';
import { useContent } from './AdminContext';

export default function AdminProjects() {
  const { state, dispatch } = useContent();
  const [showAdd, setShowAdd] = useState(false);
  const [newProj, setNewProj] = useState({ name: '', client: '', status: 'Planning', completion: 0 });

  const handleAdd = (e) => {
    e.preventDefault();
    dispatch({ type: 'SET_PROJECTS', payload: [...state.projects, { ...newProj, id: Date.now() }] });
    setShowAdd(false);
    setNewProj({ name: '', client: '', status: 'Planning', completion: 0 });
  };

  const updateCompletion = (id, val) => {
    const updated = state.projects.map(p => p.id === id ? { ...p, completion: Math.min(100, Math.max(0, Number(val))) } : p);
    dispatch({ type: 'SET_PROJECTS', payload: updated });
  };

  const deleteProject = (id) => {
    dispatch({ type: 'SET_PROJECTS', payload: state.projects.filter(p => p.id !== id) });
  };

  return (
    <div className="admin-page">
      <div className="admin-card">
        <div className="admin-card__header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="admin-card__title">Live Projects Dashboard</span>
          <button className="admin-btn admin-btn--primary" onClick={() => setShowAdd(!showAdd)}>
            {showAdd ? 'Cancel' : '+ New Project'}
          </button>
        </div>

        {showAdd && (
          <form onSubmit={handleAdd} className="admin-form" style={{ background: '#fdf2f2', padding: 20, borderRadius: 12, marginBottom: 24, border: '1px solid var(--a-red-dim)' }}>
            <div className="admin-grid-2">
              <div className="admin-form-group">
                <label>Project Name</label>
                <input type="text" required value={newProj.name} onChange={e => setNewProj({...newProj, name: e.target.value})} />
              </div>
              <div className="admin-form-group">
                <label>Client</label>
                <input type="text" required value={newProj.client} onChange={e => setNewProj({...newProj, client: e.target.value})} />
              </div>
              <div className="admin-form-group">
                <label>Initial Status</label>
                <select value={newProj.status} onChange={e => setNewProj({...newProj, status: e.target.value})}>
                  <option>Planning</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                  <option>On Hold</option>
                </select>
              </div>
              <div className="admin-form-group">
                <label>Completion %</label>
                <input type="number" required value={newProj.completion} onChange={e => setNewProj({...newProj, completion: e.target.value})} />
              </div>
            </div>
            <button type="submit" className="admin-btn admin-btn--primary" style={{ marginTop: 16 }}>Register Project</button>
          </form>
        )}

        <div className="projects-list" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {state.projects.map(p => (
            <div key={p.id} className="admin-card" style={{ boxShadow: 'none', border: '1px solid #eee', padding: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                <div>
                  <h3 style={{ margin: '0 0 4px 0', fontSize: '1.1rem' }}>{p.name}</h3>
                  <p style={{ color: '#888', fontSize: '0.85rem', margin: 0 }}>Client: <strong>{p.client}</strong></p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ padding: '4px 10px', borderRadius: 20, background: p.status === 'Completed' ? '#d1fae5' : '#fef3c7', color: p.status === 'Completed' ? '#065f46' : '#92400e', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase' }}>
                    {p.status}
                  </span>
                  <div style={{ marginTop: 8 }}>
                    <button onClick={() => deleteProject(p.id)} style={{ color: 'var(--a-red)', border: 'none', background: 'none', cursor: 'pointer', fontSize: '0.8rem' }}>Delete Project</button>
                  </div>
                </div>
              </div>

              <div className="progress-bar-wrap">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: '0.85rem' }}>
                  <span>Deployment Progress</span>
                  <strong>{p.completion}%</strong>
                </div>
                <div style={{ height: 10, background: '#eee', borderRadius: 5, overflow: 'hidden', marginBottom: 12 }}>
                  <div style={{ height: '100%', width: `${p.completion}%`, background: 'var(--a-red)', transition: 'width 0.4s ease' }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <input 
                    type="range" min="0" max="100" value={p.completion} 
                    onChange={e => updateCompletion(p.id, e.target.value)} 
                    style={{ flex: 1, accentColor: 'var(--a-red)' }} 
                  />
                  <span style={{ fontSize: '0.75rem', color: '#666' }}>Update Tracker</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
