import React from 'react';
import { motion } from 'framer-motion';
import { useContent } from '../admin/AdminContext';
import './Testimonials.css';

const Star = ({ filled }) => (
  <svg 
    width="14" 
    height="14" 
    viewBox="0 0 24 24" 
    fill={filled ? "currentColor" : "none"} 
    stroke="currentColor" 
    className="testimonial-card__star"
  >
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

export default function Testimonials() {
  const { state } = useContent();
  const { title, testimonials: rawTestimonials } = state.testimonialSettings || { title: 'WHAT OUR CLIENTS SAY?', testimonials: [] };

  // To create a seamless loop, we triple the items
  const testimonials = [...rawTestimonials, ...rawTestimonials, ...rawTestimonials];
  const count = rawTestimonials.length;
  
  // Start at the first item of the middle set
  const [activeIndex, setActiveIndex] = React.useState(count);
  const [isTransitioning, setIsTransitioning] = React.useState(true);

  const next = () => {
    setActiveIndex((prev) => prev + 1);
    setIsTransitioning(true);
  };

  const prev = () => {
    setActiveIndex((prev) => prev - 1);
    setIsTransitioning(true);
  };

  // Handle seamless wrap-around
  React.useEffect(() => {
    if (activeIndex >= count * 2) {
      setTimeout(() => {
        setIsTransitioning(false);
        setActiveIndex(count);
      }, 600);
    } else if (activeIndex < count) {
      setTimeout(() => {
        setIsTransitioning(false);
        setActiveIndex(count * 2 - 1);
      }, 600);
    }
  }, [activeIndex, count]);

  // Auto-play
  React.useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [count]);

  if (count === 0) return null;

  return (
    <section className="testimonials section-lined">
      <div className="container" style={{ position: 'relative', overflow: 'hidden' }}>
        <motion.div 
          className="testimonials__header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="section-label" style={{ color: 'var(--red)', display: 'block', marginBottom: '10px' }}>Feedback</span>
          <h2 className="testimonials__title">{title}</h2>
        </motion.div>

        <div className="testimonials__slider-wrap" style={{ position: 'relative' }}>
          <div 
            className="testimonials__grid" 
            style={{ 
              transform: `translateX(-${(activeIndex * 410) + 190}px)`,
              transition: isTransitioning ? 'transform 0.6s cubic-bezier(0.19, 1, 0.22, 1)' : 'none',
              display: 'flex',
              padding: '60px 0'
            }}
          >
            {testimonials.map((t, i) => {
              // Real index for highlighting
              const isCenter = i === activeIndex;

              return (
                <motion.div 
                  key={`${t.id}-${i}`}
                  className={`testimonial-card ${isCenter ? 'testimonial-card--featured' : ''}`}
                  animate={{ 
                    scale: isCenter ? 1.05 : 1,
                    opacity: isCenter ? 1 : 0.8,
                    backgroundColor: isCenter ? '#ffffff' : 'rgba(255, 255, 255, 0.05)',
                  }}
                  transition={{ duration: 0.5 }}
                  onClick={() => {
                    setActiveIndex(i);
                    setIsTransitioning(true);
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  {isCenter && <div className="testimonial-card__dot" style={{ background: 'var(--red)' }}></div>}
                  <div className="testimonial-card__profile">
                    {t.image && (
                      <div style={{ position: 'relative' }}>
                        <img src={t.image} alt={t.name} className="testimonial-card__image" />
                        {isCenter && (
                          <div style={{ position: 'absolute', bottom: -5, right: -5, background: 'var(--red)', borderRadius: '50%', padding: '4px', boxShadow: '0 2px 10px rgba(0,0,0,0.2)' }}>
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="white"><path d="M20 6L9 17l-5-5" fill="none" stroke="white" strokeWidth="3"/></svg>
                          </div>
                        )}
                      </div>
                    )}
                    <div className="testimonial-card__info">
                      <h4 className="testimonial-card__name" style={{ color: isCenter ? '#111111' : '#ffffff' }}>{t.name}</h4>
                      <p className="testimonial-card__role" style={{ color: isCenter ? '#666666' : '#94a3b8' }}>{t.role}</p>
                      <p className="testimonial-card__company" style={{ color: isCenter ? '#666666' : '#94a3b8' }}>{t.company}</p>
                    </div>
                  </div>

                  <h3 className="testimonial-card__title" style={{ color: isCenter ? '#111111' : '#ffffff' }}>{t.title}</h3>

                  <div className="testimonial-card__rating">
                    <span className="testimonial-card__rating-val" style={{ color: isCenter ? '#111111' : '#ffffff' }}>{t.rating.toFixed(1)}</span>
                    <div className="testimonial-card__stars">
                      {[1, 2, 3, 4, 5].map(star => (
                        <Star key={star} filled={star <= Math.round(t.rating)} />
                      ))}
                    </div>
                  </div>

                  <p className="testimonial-card__text" style={{ color: isCenter ? '#333333' : '#cbd5e1' }}>"{t.text}"</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
