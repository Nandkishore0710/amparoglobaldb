import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import ClientLogos from '../components/ClientLogos';
import Services from '../components/Services';
import ProblemStatement from '../components/ProblemStatement';
import TechPillars from '../components/TechPillars';
import CaseStudies from '../components/CaseStudies';
import Testimonials from '../components/Testimonials';

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
};

export default function Home() {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      
      {/* 1. The Challenge */}
      <ProblemStatement />
      
      {/* 2. The Technology */}
      <TechPillars />
      <ClientLogos />
      
      {/* 3. The Services */}
      <Services />
      
      {/* 4. Real-world Application */}
      <CaseStudies />

      <Testimonials />
      
    </motion.div>
  );
}
