import React from 'react';
import { motion } from 'framer-motion';
import HowItWorks from '../components/HowItWorks';
import './PageStyles.css';

export default function ProcessPage() {
  return (
    <motion.div
      className="page-content"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
    >
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">How <span>It Works</span></h1>
          <p className="page-subtitle">Our seamless integration process for your business security.</p>
        </div>
      </div>
      <HowItWorks />
    </motion.div>
  );
}
