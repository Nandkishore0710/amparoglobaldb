import React, { useState } from 'react';
import { useContent } from './AdminContext';

export default function AdminMessages() {
  const { state, dispatch } = useContent();

  const toggleRead = (id) => {
    const updated = state.messages.map(m => 
      m.id === id ? { ...m, read: !m.read } : m
    );
    dispatch({ type: 'SET_MESSAGES', payload: updated });
  };

  const deleteMessage = (id) => {
    if (window.confirm('Are you sure you want to delete this inquiry?')) {
      dispatch({ type: 'SET_MESSAGES', payload: state.messages.filter(m => m.id !== id) });
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-card">
        <div className="admin-card__header">
          <span className="admin-card__title">Client Inquiries</span>
          <span className="admin-sidebar__badge">{state.messages.filter(m => !m.read).length} Unread</span>
        </div>

        <div className="messages-list" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {state.messages.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 0', color: '#888' }}>
              No messages yet.
            </div>
          ) : (
            state.messages.map(msg => (
              <div 
                key={msg.id} 
                className="admin-card" 
                style={{ 
                  boxShadow: 'none', 
                  border: '1px solid #eee', 
                  padding: 20,
                  background: msg.read ? '#fff' : '#fef2f2',
                  position: 'relative',
                  borderLeft: msg.read ? '1px solid #eee' : '4px solid var(--a-red)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                  <div>
                    <h4 style={{ margin: '0 0 4px 0', fontSize: '1rem' }}>{msg.name}</h4>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: '#666' }}>
                      <strong>{msg.email}</strong> • {msg.phone} {msg.company && `• ${msg.company}`}
                    </p>
                  </div>
                  <div style={{ textAlign: 'right', fontSize: '0.75rem', color: '#888' }}>
                    {new Date(msg.date).toLocaleDateString()} at {new Date(msg.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>

                <div style={{ marginBottom: 16, padding: '10px 14px', background: '#fff', borderRadius: 8, border: '1px solid #eee', fontSize: '0.9rem', color: '#444' }}>
                  <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', fontWeight: 700, color: '#999', marginBottom: 4 }}>Requested Service</div>
                  <div style={{ fontWeight: 600 }}>{msg.service}</div>
                  <div style={{ marginTop: 8, fontStyle: 'italic' }}>"{msg.message}"</div>
                </div>

                <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
                  <button 
                    onClick={() => toggleRead(msg.id)} 
                    style={{ background: 'none', border: 'none', color: 'var(--a-blue)', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600 }}
                  >
                    {msg.read ? 'Mark Unread' : 'Mark as Read'}
                  </button>
                  <button 
                    onClick={() => deleteMessage(msg.id)} 
                    style={{ background: 'none', border: 'none', color: 'var(--a-red)', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600 }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
