import React, { useState, useEffect, useRef } from 'react';
import './FloatingSection.css';

const FloatingSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={sectionRef} 
      className={`floating-section ${isVisible ? 'floating-section--visible' : ''}`}
    >
      <div className="floating-section__content">
        <h2 className="floating-section__title">Quick Actions</h2>
        <div className="floating-section__grid">
          <div className="floating-section__item">
            <div className="floating-section__icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M13 2L3 14h9l-3-3 3-3H5a2 2 0 00-2 2v9a2 2 0 002 2h9a2 2 0 012-2V7a2 2 0 00-2-2z"/>
              </svg>
            </div>
            <h3 className="floating-section__item-title">Get Started</h3>
            <p className="floating-section__item-desc">Launch your security setup in minutes</p>
          </div>
          
          <div className="floating-section__item">
            <div className="floating-section__icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2L2 7l10 5l10 11l-10 11H5a1 1 0 00-1 1v7a1 1 0 001 1h11a1 1 0 011 1V7a1 1 0 00-1-1z"/>
              </svg>
            </div>
            <h3 className="floating-section__item-title">Documentation</h3>
            <p className="floating-section__item-desc">API guides and tutorials</p>
          </div>
          
          <div className="floating-section__item">
            <div className="floating-section__icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M9 11H12a2 2 0 012 2v4a2 2 0 01-2-2H9a2 2 0 00-2-2z"/>
              </svg>
            </div>
            <h3 className="floating-section__item-title">Support</h3>
            <p className="floating-section__item-desc">24/7 technical assistance</p>
          </div>
          
          <div className="floating-section__item">
            <div className="floating-section__icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M22 12h-4l-3 3-3-3H5a2 2 0 00-2 2v9a2 2 0 002 2h9a2 2 0 012-2V7a2 2 0 00-2-2z"/>
              </svg>
            </div>
            <h3 className="floating-section__item-title">Settings</h3>
            <p className="floating-section__item-desc">Configure your preferences</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingSection;
