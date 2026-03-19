import React from 'react';
import { motion } from 'framer-motion';
import { useContent } from '../admin/AdminContext';
import Services from '../components/Services';
import './PageStyles.css';

export default function ServicesPage() {
  const { state } = useContent();
  const data = state.servicesWhyChoose || { title: '', desc: '', features: [] };

  return (
    <motion.div
      className="page-content"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">Our <span>Services</span></h1>
          <p className="page-subtitle">Next-generation security solutions powered by cutting-edge AI technology.</p>
        </div>
      </div>
      <Services />
      
      <section className="services-deep-dive">
        <div className="container">
          <div className="deep-dive__card card">
            <h3 className="sub-title">{data.title}</h3>
            <p>{data.desc}</p>
            <div className="dd-features">
              {(data.features || []).map((f, i) => (
                <div key={i} className="dd-feature">
                  <strong>{f.label}:</strong> {f.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
