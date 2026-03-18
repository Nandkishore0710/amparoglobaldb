import React from 'react';
import { motion } from 'framer-motion';
import { useContent } from '../admin/AdminContext';
import './TechPillars.css';

export default function TechPillars() {
  const { state } = useContent();
  const pillars = state.pillars || [];

  return (
    <section className="tech-pillars">
      {/* Decorative background elements */}
      <div className="tech-pillars__bg-glow tech-pillars__bg-glow--1"></div>
      <div className="tech-pillars__bg-glow tech-pillars__bg-glow--2"></div>
      
      <div className="container">
        <motion.div 
          className="tech-pillars__header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Innovative Architecture</span>
          <h2 className="section-title">
            The <span>Core Technology</span> Stack
          </h2>
          <p className="section-desc">
            Next-generation security infrastructure engineered for intelligence, speed, and privacy.
          </p>
        </motion.div>

        <div className="tech__grid">
          {pillars.map((p, i) => (
            <motion.div 
              key={p.id || i} 
              className="tech__card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              <div className="tech__icon-wrap">
                <div className="tech__icon-glow"></div>
                <span className="tech__icon-emoji">{p.icon}</span>
              </div>
              
              <div className="tech__content">
                <h3 className="tech__name">{p.title}</h3>
                <p className="tech__desc">{p.desc}</p>
                
                {p.details && (
                  <div className="tech__details">
                    {p.details.map((d, j) => (
                      <span key={j} className="tech__detail-tag">
                        <span className="tech__detail-dot"></span>
                        {d}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Card decorative line */}
              <div className="tech__card-line"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
