import React from 'react';
import { motion } from 'framer-motion';
import './ProblemStatement.css';

const painPoints = [
  {
    title: 'Manual Monitoring',
    desc: 'Legacy systems depend heavily on human staff watching screens, leading to fatigue and missed threats.',
    reactive: true,
  },
  {
    title: 'Post-Event Reaction',
    desc: 'Most traditional cameras only provide evidence AFTER a crime or hazard has already occurred.',
    reactive: true,
  },
  {
    title: 'Internet Dependency',
    desc: 'Cloud-only systems fail when connectivity drops, leaving your premises completely vulnerable.',
    reactive: true,
  },
  {
    title: 'Intelligent Prevention',
    desc: 'AMPARO AI detects anomalies and triggers sub-second alerts BEFORE incidents can escalate.',
    reactive: false,
  },
  {
    title: 'Edge Computing',
    desc: 'On-device intelligence ensures monitoring continues even during network blackouts.',
    reactive: false,
  },
  {
    title: 'Proactive Scale',
    desc: 'Centrally manage thousands of locations with automated anomaly detection that never sleeps.',
    reactive: false,
  },
];

export default function ProblemStatement() {
  return (
    <section className="problem">
      <div className="container">
        <motion.div 
          className="problem__header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">The Challenge</span>
          <h2 className="section-title">
            Why Traditional Systems <span>Fall Short</span>
          </h2>
          <p className="section-desc">
            Reactive security is no longer enough. AMPARO bridge the gap between passive
            recording and intelligent prevention.
          </p>
        </motion.div>

        <div className="problem__grid">
          <div className="problem__col">
            <h3 className="problem__col-title">The Legacy Way <span>(Reactive)</span></h3>
            {painPoints.filter(p => p.reactive).map((p, i) => (
              <motion.div 
                key={i} 
                className="problem__card problem__card--reactive"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="problem__card-icon">✕</div>
                <div>
                  <h4>{p.title}</h4>
                  <p>{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="problem__divider">
            <div className="problem__divider-line" />
            <div className="problem__divider-vs">VS</div>
            <div className="problem__divider-line" />
          </div>

          <div className="problem__col">
            <h3 className="problem__col-title">The AMPARO Way <span>(Proactive)</span></h3>
            {painPoints.filter(p => !p.reactive).map((p, i) => (
              <motion.div 
                key={i} 
                className="problem__card problem__card--proactive"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="problem__card-icon">✓</div>
                <div>
                  <h4>{p.title}</h4>
                  <p>{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
