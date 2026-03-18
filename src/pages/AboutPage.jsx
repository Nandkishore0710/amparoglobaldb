import React from 'react';
import { motion } from 'framer-motion';
import About from '../components/About';
import './PageStyles.css';

const pageVariants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 }
};

export default function AboutPage() {
  return (
    <motion.div
      className="page-content"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={{ duration: 0.5 }}
    >
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">About <span>AMPARO</span></h1>
          <p className="page-subtitle">Pioneering the future of intelligent security and autonomous surveillance.</p>
        </div>
      </div>
      
      <About />

      <section className="about-details">
        <div className="container">
          <div className="about-details__grid">
            <div className="about-details__text">
              <h3 className="sub-title">Our Mission</h3>
              <p>At AMPARO SECURE TECH, we provide AI-powered security systems designed to protect people, property, and data—24/7. Our solutions combine smart CCTV surveillance, real-time monitoring, intelligent alerts, and cybersecurity to deliver reliable and proactive protection.</p>
              <p>We specialize in advanced surveillance, facial recognition, intrusion detection, and IoT-based security systems, tailored to meet the needs of businesses and homes.</p>
            </div>
            <div className="about-details__timeline card">
              <h3 className="sub-title">Company Roadmap</h3>
              <ul className="timeline-list">
                <li><span>●</span> Architecture design & AI model research</li>
                <li><span>●</span> Hardware feasibility & Edge AI prototype</li>
                <li><span>●</span> Limited environment testing & Feedback</li>
                <li><span>●</span> Central monitoring platform & Alert systems</li>
                <li><span>●</span> Pilot projects & Strategic partnerships</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
