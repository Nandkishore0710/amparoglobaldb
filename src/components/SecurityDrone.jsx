import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import droneAsset from '../assets/security-drone.png';
import './SecurityDrone.css';

export default function SecurityDrone() {
  const containerRef = useRef(null);
  
  // Track scroll progress
  const { scrollYProgress } = useScroll();

  // Smooth out the motion
  const smoothYProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Transform scroll progress for local container behavior
  const y = useTransform(smoothYProgress, [0, 1], ['-10%', '10%']);
  const rotateX = useTransform(smoothYProgress, [0, 1], [0, 15]);
  const rotateY = useTransform(smoothYProgress, [0, 1], [-5, 5]);
  const rotateZ = useTransform(smoothYProgress, [0, 1], [-2, 2]);
  const scale = useTransform(smoothYProgress, [0, 0.5, 1], [0.95, 1.05, 0.95]);

  // Red pulse effect for the "digital eye"
  const pulse = {
    scale: [1, 1.05, 1],
    opacity: [0.8, 1, 0.8],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <div className="security-drone__wrapper" ref={containerRef}>
      {/* Top Right System Status Badge */}
      <div className="security-drone__system-badge">
        <span className="system-badge-dot" />
        <span className="system-badge-text">ACTIVE MONITORING</span>
      </div>

      <motion.div 
        className="security-drone__container"
        style={{
          y,
          rotateX,
          rotateY,
          rotateZ,
          scale,
        }}
      >
        {/* Main Drone Image */}
        <img 
          src={droneAsset} 
          alt="Security Drone" 
          className="security-drone__asset" 
        />

        {/* Dynamic Glow Overlays */}
        <motion.div 
          className="security-drone__eye-glow"
          style={{ top: '42%', left: '38%' }}
          animate={pulse}
        />
        
        {/* Bottom Floating Status Label */}
        <div className="security-drone__status-ring">
          <div className="status-label">ACTIVE MONITORING</div>
          <div className="status-glow-box" />
        </div>
      </motion.div>
    </div>
  );
}
