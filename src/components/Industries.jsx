import React from 'react';
import { motion } from 'framer-motion';
import './Industries.css';

const industries = [
  { icon: '🏭', name: 'Manufacturing', desc: 'Fire detection, weapon monitoring, and attendance for factory floors.' },
  { icon: '🏫', name: 'Education', desc: 'Campus security, attendance automation, and unauthorized entry alerts.' },
  { icon: '🏥', name: 'Healthcare', desc: 'Patient safety, restricted area monitoring, and staff attendance.' },
  { icon: '🏢', name: 'Corporate', desc: 'Perimeter security, VAPT assessments, and employee tracking.' },
  { icon: '🏪', name: 'Retail & FMCG', desc: 'Shoplifting prevention, crowd analytics, and inventory protection.' },
  { icon: '🏗️', name: 'Infrastructure', desc: 'Critical asset protection and threat detection at scale.' },
];

export default function Industries() {
  return (
    <section className="industries section-lined" id="industries">
      <div className="container">
        <div className="industries__header">
          <span className="section-label">Industries We Serve</span>
          <h2 className="section-title">
            Trusted Across <span>Every Sector</span>
          </h2>
          <p className="section-desc" style={{ margin: '16px auto 0', textAlign: 'center' }}>
            AMPARO's security solutions are designed for the unique challenges of each industry —
            adaptable, scalable, and built to protect what matters most.
          </p>
        </div>

        <motion.div 
          className="industries__grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.1 } }
          }}
        >
          {industries.map((ind, i) => (
            <motion.div 
              key={i} 
              className="industries__card card"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
            >
              <div className="industries__icon">{ind.icon}</div>
              <h3 className="industries__name">{ind.name}</h3>
              <p className="industries__desc">{ind.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
