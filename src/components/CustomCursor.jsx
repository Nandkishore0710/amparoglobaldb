import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './CustomCursor.css';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      const target = e.target;
      setIsPointer(window.getComputedStyle(target).cursor === 'pointer');
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div
      className={`custom-cursor ${isPointer ? 'custom-cursor--active' : ''}`}
      animate={{
        x: position.x - 10,
        y: position.y - 10,
        scale: isPointer ? 2.5 : 1,
      }}
      transition={{ type: 'spring', damping: 20, stiffness: 250, mass: 0.5 }}
    />
  );
}
