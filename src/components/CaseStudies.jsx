import React from 'react';
import { motion } from 'framer-motion';
import './CaseStudies.css';

const cases = [
  {
    category: 'Logistics',
    title: 'Smart Warehousing',
    desc: 'Real-time monitoring of loading docks, inventory alerts, and perimeter security for a 50,000 sq.ft facility.',
    img: '🏭',
  },
  {
    category: 'Corporate',
    title: 'Enterprise Offices',
    desc: 'Integrated AI attendance and visitor management for multi-floor corporate hubs with zero-latency face tracking.',
    img: '🏢',
  },
  {
    category: 'Industrial',
    title: 'Critical Infrastructure',
    desc: 'Fire and hazard detection in manufacturing plants where traditional sensors fail due to environmental factors.',
    img: '🏗️',
  },
  {
    category: 'Commerce',
    title: 'Retail Analytics',
    desc: 'Crowd density mapping and suspicious behavior detection for high-traffic retail environments.',
    img: '🛍️',
  }
];

export default function CaseStudies() {
  return (
    <section className="cases">
      <div className="container">
        <motion.div 
          className="cases__header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Target Use Cases</span>
          <h2 className="section-title">
            Designed for <span>Diverse Industries</span>
          </h2>
          <p className="section-desc">
            AMPARO is flexible enough to protect a single store or an entire industrial campus.
          </p>
        </motion.div>

        <div className="cases__grid">
          {cases.map((c, i) => (
            <motion.div 
              key={i} 
              className="cases__card"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="cases__visual">{c.img}</div>
              <div className="cases__body">
                <span className="cases__cat">{c.category}</span>
                <h3 className="cases__title">{c.title}</h3>
                <p className="cases__desc">{c.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
