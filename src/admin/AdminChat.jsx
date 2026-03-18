import React, { useState } from 'react';
import { useContent } from './AdminContext';

export default function AdminChat() {
  const { state, dispatch } = useContent();
  const [selectedTicketId, setSelectedTicketId] = useState(null);
  
  const tickets = state.chatTickets || [];
  const config = state.chatConfig || {
    autoReplyEnabled: true,
    welcomeMessage: '',
    defaultResponse: ''
  };

  const selectedTicket = tickets.find(t => t.id === selectedTicketId);

  const toggleAutoReply = () => {
    dispatch({
      type: 'SET_CHAT_CONFIG',
      payload: { ...config, autoReplyEnabled: !config.autoReplyEnabled }
    });
  };

  const updateConfig = (field, value) => {
    dispatch({
      type: 'SET_CHAT_CONFIG',
      payload: { ...config, [field]: value }
    });
  };

  const toggleStatus = (id) => {
    dispatch({ type: 'TOGGLE_TICKET_STATUS', payload: id });
  };

  const deleteTicket = (id) => {
    if (window.confirm('Are you sure you want to permanently delete this chat history?')) {
      dispatch({ type: 'DELETE_CHAT_TICKET', payload: id });
      setSelectedTicketId(null);
    }
  };

  return (
    <div className="admin-page">
      {/* Settings Row */}
      <div className="admin-card" style={{ marginBottom: 32, padding: '30px' }}>
        <div className="admin-card__header" style={{ border: 'none', marginBottom: 24, padding: 0 }}>
          <span className="admin-card__title" style={{ fontSize: '1.2rem' }}>🤖 AI Chat Settings</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 30 }}>
          <div className="admin-form-group" style={{ display: 'flex', alignItems: 'center' }}>
            <label className="admin-label" style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', background: '#f8fafc', padding: '12px 20px', borderRadius: '12px', border: '1px solid #e2e8f0', width: '100%' }}>
              <input 
                type="checkbox" 
                checked={config.autoReplyEnabled} 
                onChange={toggleAutoReply}
                style={{ width: 18, height: 18, accentColor: 'var(--a-red)' }}
              />
              <span style={{ fontWeight: 600, color: '#334155' }}>Enable AI Auto-Reply</span>
            </label>
          </div>
          <div className="admin-form-group">
            <label className="admin-label" style={{ fontWeight: 700, marginBottom: 10, display: 'block' }}>👋 Welcome Message</label>
            <textarea 
              className="admin-input" 
              rows="2"
              style={{ borderRadius: '12px', padding: '15px' }}
              value={config.welcomeMessage}
              onChange={(e) => updateConfig('welcomeMessage', e.target.value)}
              placeholder="Hi! How can we help you today?"
            />
          </div>
          <div className="admin-form-group">
            <label className="admin-label" style={{ fontWeight: 700, marginBottom: 10, display: 'block' }}>🔄 Fallback Response</label>
            <textarea 
              className="admin-input" 
              rows="2"
              style={{ borderRadius: '12px', padding: '15px' }}
              value={config.defaultResponse}
              onChange={(e) => updateConfig('defaultResponse', e.target.value)}
              placeholder="I'll connect you with a team member shortly..."
            />
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '350px 1fr', gap: 24, height: 'calc(100vh - 350px)', minHeight: 500 }}>
        {/* Tickets List */}
        <div className="admin-card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', border: '1px solid #e2e8f0', borderRadius: '16px' }}>
          <div className="admin-card__header" style={{ padding: '20px 24px', background: '#fff', borderBottom: '1px solid #f1f5f9' }}>
            <span className="admin-card__title" style={{ fontSize: '1rem', fontWeight: 800 }}>⚡ Active Tickets ({tickets.filter(t => t.status !== 'closed').length})</span>
          </div>
          <div className="tickets-list" style={{ flex: 1, overflowY: 'auto' }}>
            {tickets.length === 0 ? (
              <div style={{ padding: 60, textAlign: 'center', color: '#94a3b8' }}>
                <div style={{ fontSize: '2rem', marginBottom: 10 }}>📭</div>
                No chat tickets yet.
              </div>
            ) : (
              tickets.map(t => (
                <div 
                  key={t.id}
                  onClick={() => setSelectedTicketId(t.id)}
                  style={{
                    padding: '20px 24px',
                    borderBottom: '1px solid #f1f5f9',
                    cursor: 'pointer',
                    background: selectedTicketId === t.id ? '#f8fafc' : '#fff',
                    borderLeft: t.status === 'active' ? '4px solid var(--a-red)' : '4px solid transparent',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, alignItems: 'center' }}>
                    <span style={{ 
                      fontWeight: 800, 
                      fontSize: '0.95rem', 
                      color: selectedTicketId === t.id ? 'var(--a-red)' : '#1e293b', 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 8,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>
                      {t.customerName}
                      {t.status === 'active' && (
                        <span style={{ width: 8, height: 8, background: '#10b981', borderRadius: '50%', boxShadow: '0 0 0 2px rgba(16, 185, 129, 0.2)', animation: 'pulsate 2s infinite', flexShrink: 0 }}></span>
                      )}
                    </span>
                    <span style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 600 }}>{new Date(t.date).toLocaleDateString()}</span>
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#64748b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginBottom: 12 }}>
                    {t.lastMessage}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                      <span style={{ 
                        fontSize: '0.65rem', 
                        textTransform: 'uppercase', 
                        fontWeight: 800,
                        padding: '3px 10px',
                        borderRadius: '20px',
                        background: t.status === 'active' ? '#fee2e2' : '#f1f5f9',
                        color: t.status === 'active' ? '#dc2626' : '#64748b',
                        letterSpacing: '0.05em'
                      }}>
                        {t.status}
                      </span>
                      {t.company && (
                        <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
                          <span style={{ opacity: 0.6 }}>🏢</span> {t.company.length > 15 ? t.company.substring(0, 15) + '...' : t.company}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Chat Detail */}
        <div className="admin-card" style={{ display: 'flex', flexDirection: 'column', padding: 0 }}>
          {selectedTicket ? (
            <>
              <div className="admin-card__header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 30px', borderBottom: '1px solid #f1f5f9' }}>
                <div>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', margin: 0, letterSpacing: '-0.02em' }}>{selectedTicket.customerName}</h2>
                  <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: 10, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                    {selectedTicket.phone && (
                      <span style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#f1f5f9', padding: '4px 12px', borderRadius: '20px', fontWeight: 500 }}>
                        <span style={{ color: 'var(--a-red)' }}>📞</span> {selectedTicket.phone}
                      </span>
                    )}
                    {selectedTicket.company && (
                      <span style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#f1f5f9', padding: '4px 12px', borderRadius: '20px', fontWeight: 500 }}>
                        <span style={{ color: 'var(--a-red)' }}>🏢</span> {selectedTicket.company}
                      </span>
                    )}
                    <span style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#f8fafc', padding: '4px 12px', borderRadius: '20px', color: '#94a3b8', fontSize: '0.7rem' }}>
                      ID: {selectedTicket.id}
                    </span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                  <button 
                    className="admin-btn admin-btn--secondary"
                    style={{ 
                      color: '#ef4444', 
                      borderColor: '#fee2e2', 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 6,
                      padding: '8px 16px',
                      fontSize: '0.85rem'
                    }}
                    onClick={() => deleteTicket(selectedTicket.id)}
                  >
                    🗑️ Delete
                  </button>
                  <button 
                    className={`admin-btn ${selectedTicket.status === 'closed' ? '' : 'admin-btn--danger'}`}
                    style={{ 
                      padding: '8px 20px',
                      fontSize: '0.85rem',
                      fontWeight: 700
                    }}
                    onClick={() => toggleStatus(selectedTicket.id)}
                  >
                    {selectedTicket.status === 'closed' ? 'Reopen Ticket' : 'Close Ticket'}
                  </button>
                </div>
              </div>
              
              <div style={{ flex: 1, padding: '30px', overflowY: 'auto', background: '#f8fafc', display: 'flex', flexDirection: 'column', gap: 24 }}>
                {selectedTicket.messages.map((m, i) => (
                  <div 
                    key={i}
                    style={{
                      maxWidth: '75%',
                      padding: '14px 20px',
                      borderRadius: m.type === 'user' ? '20px 20px 20px 4px' : '20px 20px 4px 20px',
                      fontSize: '0.92rem',
                      lineHeight: 1.6,
                      alignSelf: m.type === 'user' ? 'flex-start' : 'flex-end',
                      background: m.type === 'user' ? '#ffffff' : 'var(--a-red)',
                      color: m.type === 'user' ? '#1e293b' : '#ffffff',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
                      border: m.type === 'user' ? '1px solid #e2e8f0' : 'none',
                      position: 'relative',
                    }}
                  >
                    {m.text}
                    <div style={{ 
                      fontSize: '0.65rem', 
                      marginTop: 4, 
                      opacity: 0.7, 
                      textAlign: m.type === 'user' ? 'left' : 'right' 
                    }}>
                      {m.date ? new Date(m.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ padding: '20px 30px', background: '#fff', borderTop: '1px solid #f1f5f9', display: 'flex', gap: 15, alignItems: 'flex-end' }}>
                <div style={{ flex: 1, position: 'relative' }}>
                  <textarea 
                    placeholder="Type your message here..." 
                    style={{ 
                      width: '100%', 
                      padding: '12px 16px', 
                      borderRadius: '12px', 
                      border: '1px solid #e2e8f0', 
                      fontSize: '0.95rem',
                      fontFamily: 'inherit',
                      resize: 'none',
                      minHeight: '44px',
                      maxHeight: '120px',
                      outline: 'none',
                      transition: 'border-color 0.2s',
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--a-red)'}
                    onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                  />
                </div>
                <button 
                  className="admin-btn admin-btn--primary"
                  style={{ borderRadius: '12px', height: '44px', width: '44px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                </button>
              </div>
            </>
          ) : (
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888', flexDirection: 'column', gap: 16 }}>
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z"/>
              </svg>
              Select a ticket to view conversation
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
