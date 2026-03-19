import React from 'react';
import { motion } from 'framer-motion';
import Contact from '../components/Contact';
import './PageStyles.css';

export default function ContactPage() {
  return (
    <motion.div
      className="page-content"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
    >
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">Contact <span>Us</span></h1>
          <p className="page-subtitle">Get in touch for a free security audit and tailored quote.</p>
        </div>
      </div>
      <Contact />
    </motion.div>
  );
}
