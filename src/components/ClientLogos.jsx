import React from 'react';
import { motion } from 'framer-motion';
import { useContent } from '../admin/AdminContext';
import './ClientLogos.css';

export default function ClientLogos() {
  const { state } = useContent();
  const clients = state.clients || [];

  // Duplicate for seamless infinite loop
  const duplicatedClients = [...clients, ...clients, ...clients];

  if (clients.length === 0) return null;

  return (
    <section className="client-logos">
      <div className="container">
        <div className="client-logos__header">
          <span className="section-label">Trusted By Industry Leaders</span>
        </div>
        
        <div className="client-logos__track-wrap">
          <motion.div 
            className="client-logos__track"
            animate={{ x: ['0%', '-33.333%'] }}
            transition={{ 
              duration: 20, 
              repeat: Infinity, 
              ease: "linear",
              repeatType: "loop"
            }}
          >
            {duplicatedClients.map((client, idx) => (
              <div key={`${client.id}-${idx}`} className="client-logo-item">
                <div className="client-logo-image-box">
                  {client.logo ? (
                    <img src={client.logo} alt={client.name} title={client.name} />
                  ) : (
                    <div className="client-logo-placeholder">
                      {client.name.charAt(0)}
                    </div>
                  )}
                </div>
                <span className="client-logo-name">{client.name}</span>
              </div>
            ))}
          </motion.div>
          
          {/* Fades for smooth edges */}
          <div className="track-fade track-fade--left"></div>
          <div className="track-fade track-fade--right"></div>
        </div>
      </div>
    </section>
  );
}
