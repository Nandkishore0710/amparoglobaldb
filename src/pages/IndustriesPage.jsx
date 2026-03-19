import React from 'react';
import { motion } from 'framer-motion';
import Industries from '../components/Industries';
import './PageStyles.css';

export default function IndustriesPage() {
  return (
    <motion.div
      className="page-content"
      initial={{ opacity: 0, filter: 'blur(10px)' }}
      animate={{ opacity: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, filter: 'blur(10px)' }}
    >
      <div className="page-header">
        <div className="container">
          <h1 className="page-title"><span>Industries</span> Served</h1>
          <p className="page-subtitle">Adapting AI security to the unique needs of every vertical.</p>
        </div>
      </div>
      <Industries />
    </motion.div>
  );
}
