import React, { useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useContent } from '../admin/AdminContext';
import './PageStyles.css';
import './ServiceDetail.css';

export default function ServiceDetail() {
  const { slug } = useParams();
  const { state } = useContent();
  const service = state.services.find(s => s.slug === slug || s.id.toString() === slug);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 }
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5
  };

  return (
    <motion.main
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="page"
    >
      <header className="page-header">
        <div className="container">
          <span className="section-label">{service.subtitle}</span>
          <h1 className="page-title">{service.title}</h1>
          <p className="page-subtitle">{service.desc}</p>
        </div>
      </header>

      <div className="container" style={{ paddingBottom: '80px' }}>
        <div className="service-detail__grid">
          
          <div className="service-detail__content">
            {/* Render the HTML content safely */}
            <div 
              className="service-detail__html"
              dangerouslySetInnerHTML={{ __html: service.fullContent || '<p>No content provided yet.</p>' }}
            />
          </div>

          <aside className="service-detail__sidebar">
            <div className="service-detail__card" style={{ background: '#fcfcfc', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '16px', padding: '32px', position: 'sticky', top: '100px' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '24px' }}>Key Features</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {service.features.map((feat, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '0.95rem', color: '#444' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E8192C" strokeWidth="2.5" style={{ flexShrink: 0, marginTop: '2px' }}><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
              
              <div style={{ marginTop: '40px', paddingTop: '32px', borderTop: '1px solid rgba(0,0,0,0.08)' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px' }}>Ready to Secure Your Future?</h4>
                <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '24px', lineHeight: 1.5 }}>Get in touch with our experts to discuss how this solution can be tailored for your organization.</p>
                <Link to="/contact" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  Request Custom Quote
                </Link>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </motion.main>
  );
}
