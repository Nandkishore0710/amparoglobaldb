import React from 'react';
import { motion } from 'framer-motion';
import './HowItWorks.css';

const steps = [
  {
    num: '01',
    title: 'Discover & Assess',
    desc: 'We conduct a thorough on-site or virtual security audit to identify vulnerabilities, gaps, and requirements across your infrastructure.',
    icon: '🔍',
  },
  {
    num: '02',
    title: 'Design & Plan',
    desc: 'Our experts design a tailored security architecture — selecting the right AI models, camera placement, and cybersecurity frameworks for your needs.',
    icon: '📐',
  },
  {
    num: '03',
    title: 'Deploy & Integrate',
    desc: 'We install and configure all hardware and software, integrating seamlessly with your existing HR, ERP, or security infrastructure.',
    icon: '🚀',
  },
  {
    num: '04',
    title: 'Monitor & Optimise',
    desc: 'Continuous AI monitoring with regular model updates, performance reports, and 24/7 support to keep your security ahead of evolving threats.',
    icon: '📊',
  },
];

export default function HowItWorks() {
  return (
    <section className="hiw" id="how-it-works">
      <div className="container">
        <motion.div 
          className="hiw__header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Our Process</span>
          <h2 className="section-title">
            How <span>AMPARO Works</span>
          </h2>
          <p className="section-desc" style={{ margin: '16px auto 0', textAlign: 'center' }}>
            A proven four-step process from assessment to deployment — delivering security
            that's intelligent, reliable, and built for your environment.
          </p>
        </motion.div>

        <motion.div 
          className="hiw__steps"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.2 } }
          }}
        >
          {steps.map((step, i) => (
            <motion.div 
              key={i} 
              className="hiw__step"
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { opacity: 1, scale: 1 }
              }}
            >
              {i < steps.length - 1 && <div className="hiw__connector" />}
              <div className="hiw__step-num">{step.num}</div>
              <div className="hiw__step-icon">{step.icon}</div>
              <h3 className="hiw__step-title">{step.title}</h3>
              <p className="hiw__step-desc">{step.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
