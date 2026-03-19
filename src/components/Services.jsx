import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useContent } from '../admin/AdminContext';
import './Services.css';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const iconsMap = {
  1: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M15 10l4.553-2.277A1 1 0 0121 8.74V15.26a1 1 0 01-1.447.894L15 14M3 8h12v9a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"/><circle cx="9" cy="11" r="2"/></svg>,
  2: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>,
  3: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17.5 9.5l-5.5 5.5-3-3M12 2a10 10 0 100 20A10 10 0 0012 2z" strokeLinecap="round"/></svg>,
  4: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>,
  5: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="7" width="20" height="15" rx="2" ry="2"/><polyline points="17 2 12 7 7 2"/></svg>,
  6: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><path d="M9 3v18M15 3v18M3 9h18M3 15h18"/></svg>,
};

export default function Services() {
  const { state } = useContent();

  return (
    <section className="services section-lined" id="services">
      <div className="container">
        <motion.div 
          className="services__header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">What We Offer</span>
          <h2 className="section-title">
            Comprehensive <span>Security Solutions</span>
          </h2>
          <p className="section-desc">
            From AI-powered surveillance to enterprise cybersecurity — AMPARO delivers
            intelligent, proactive protection for your people, assets, and infrastructure.
          </p>
        </motion.div>

        <motion.div 
          className="services__grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {state.services.map((svc) => (
            <motion.div key={svc.id} className="services__card card" variants={cardVariants}>
              {svc.badge && <span className="services__badge">{svc.badge}</span>}
              <div className="services__icon">
                {svc.icon ? (
                  svc.icon.startsWith('data:') || svc.icon.startsWith('http') ? (
                    <img src={svc.icon} alt="" style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
                  ) : (
                    <span style={{ fontSize: '2rem' }}>{svc.icon}</span>
                  )
                ) : (
                  iconsMap[svc.id] || iconsMap[1]
                )}
              </div>
              <h3 className="services__title">{svc.title}</h3>
              <p className="services__subtitle">{svc.subtitle}</p>
              <p className="services__desc">{svc.desc}</p>
              <ul className="services__features">
                {svc.features.map((f, j) => (
                  <li key={j}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 13l4 4L19 7"/></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <Link to={`/services/${svc.slug || svc.id}`} className="services__link" style={{ zIndex: 10, position: 'relative' }}>
                Learn More
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
