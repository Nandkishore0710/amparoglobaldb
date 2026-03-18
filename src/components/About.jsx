import React from 'react';
import { motion } from 'framer-motion';
import './About.css';

const stats = [
  { val: '99.7%', lbl: 'Detection Accuracy' },
  { val: '200+', lbl: 'Cameras Deployed' },
  { val: '<1s', lbl: 'Alert Response Time' },
  { val: '50+', lbl: 'Clients Protected' },
];

const pillars = [
  {
    icon: '🧠',
    title: 'AI-First Approach',
    desc: 'Every solution is built around intelligent algorithms — not retrofitted with AI as an afterthought.',
  },
  {
    icon: '🔒',
    title: 'Security-by-Design',
    desc: 'Privacy and security are core principles, not features — built into every layer of our platform.',
  },
  {
    icon: '⚡',
    title: 'Edge Processing',
    desc: 'On-device AI inference means real-time response without dependence on cloud connectivity.',
  },
  {
    icon: '📈',
    title: 'Scalable & Affordable',
    desc: 'From a single office to an industrial campus — AMPARO scales to your needs without breaking budgets.',
  },
];

export default function About() {
  return (
    <section className="about section-lined" id="about">
      <div className="container">
        <div className="about__grid">
          <motion.div 
            className="about__left"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="section-label">Who We Are</span>
            <h2 className="section-title">
              Reimagining Security<br />
              with <span>AI & IoT</span>
            </h2>
            <p className="section-desc" style={{ marginTop: 16 }}>
              AMPARO is a next-generation security technology company combining artificial intelligence,
              IoT devices, edge computing, and a centralized SaaS dashboard to make intelligent security
              accessible, affordable, and scalable.
            </p>
            <p className="section-desc" style={{ marginTop: 12 }}>
              We don't just respond to incidents — we <strong style={{ color: '#fff' }}>act proactively</strong>. Our vision is a world where security systems are proactive partners, not passive observers.
            </p>

            <div className="about__stats">
              {stats.map((s, i) => (
                <motion.div 
                  key={i} 
                  className="about__stat"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                >
                  <span className="about__stat-val">{s.val}</span>
                  <span className="about__stat-lbl">{s.lbl}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="about__right">
            {pillars.map((p, i) => (
              <motion.div 
                key={i} 
                className="about__pillar card"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
              >
                <span className="about__pillar-icon">{p.icon}</span>
                <div>
                  <h4 className="about__pillar-title">{p.title}</h4>
                  <p className="about__pillar-desc">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
