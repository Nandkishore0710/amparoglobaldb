import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';
import { useContent } from '../admin/AdminContext';

const AUTOPLAY_INTERVAL = 5000;

export default function Hero() {
  const { state } = useContent();
  // Normalize slides from context (context uses cta1Label/Href, component uses cta1.label/href)
  const slides = state.slides.map(s => ({
    ...s,
    cta1: { label: s.cta1Label, href: s.cta1Href },
    cta2: { label: s.cta2Label, href: s.cta2Href },
  }));

  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);

  const goTo = useCallback((idx) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setActive(idx % slides.length);
      setAnimating(false);
    }, 350);
  }, [animating, slides.length]);

  const next = useCallback(() => goTo((active + 1) % slides.length), [active, goTo, slides.length]);
  const prev = useCallback(() => goTo((active - 1 + slides.length) % slides.length), [active, goTo, slides.length]);

  useEffect(() => {
    const id = setInterval(next, AUTOPLAY_INTERVAL);
    return () => clearInterval(id);
  }, [next]);

  const slide = slides[active] || slides[0];

  return (
    <section 
      className={`hero ${slide.bgImage ? 'hero--has-image' : ''}`} 
      id="home"
      style={slide.bgImage ? { backgroundImage: `url(${slide.bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' } : {}}
    >
      {/* Animated flowing line background (only visible if no custom bg image is set) */}
      {!slide.bgImage && (
        <>
          <div className="hero__grid">
            <div className="hero__ring" />
            <div className="hero__ring" />
            <div className="hero__ring" />
          </div>
          <div className="hero__glow hero__glow--1" />
          <div className="hero__glow hero__glow--2" />
        </>
      )}

      <div className={`hero__content container${animating ? ' hero__content--exit' : ' hero__content--enter'}`}>
        <div className="hero__text">
          <span className="hero__tag">
            <span className="hero__tag-dot" />
            {slide.tag}
          </span>
          <h1 className="hero__headline">
            {slide.headline}<br />
            <span className="hero__highlight">{slide.highlight}</span>
          </h1>
          <p className="hero__sub">{slide.sub}</p>
          <div className="hero__actions">
            <Link to={slide.cta1.href} className="btn-primary">
              {slide.cta1.label}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
            <Link to={slide.cta2.href} className="btn-outline">
              {slide.cta2.label}
            </Link>
          </div>
          <div className="hero__badge">{slide.badge}</div>
        </div>

        <div className="hero__visual">
          {slide.visualImage && typeof slide.visualImage === 'string' && slide.visualImage.trim().length > 0 ? (
            <div className="hero__custom-image-wrap">
              <img src={slide.visualImage} alt="Feature Visual" className="hero__custom-image" />
            </div>
          ) : (
            <div className="hero__screen">
              <div className="hero__screen-bar">
                <span /><span /><span />
              </div>
              <div className="hero__screen-content">
                <div className="hero__stat-grid">
                  {(state.heroStats || []).map((stat, i) => (
                    <div key={i} className="hero__stat">
                      <span className="hero__stat-val">{stat.val.replace(/[%+<]/g, '')}<span>{stat.val.match(/[%+<]/g)?.[0] || ''}</span></span>
                      <span className="hero__stat-lbl">{stat.label}</span>
                    </div>
                  ))}
                </div>
                <div className="hero__alert-feed">
                  <div className="hero__alert-title">Live Alerts</div>
                  {(state.heroAlerts || []).map((alert, i) => (
                    <div key={i} className="hero__alert-item" style={{ animationDelay: `${i * 0.15}s` }}>
                      <span className={`hero__alert-dot hero__alert-dot--${alert.type || 'green'}`} />
                      <span>{alert.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Slider controls */}
      <div className="hero__controls container">
        <button className="hero__arr hero__arr--prev" onClick={prev} aria-label="Previous">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
        </button>
        <div className="hero__dots">
          {slides.map((_, i) => (
            <button
              key={i}
              className={`hero__dot${i === active ? ' hero__dot--active' : ''}`}
              onClick={() => goTo(i)}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
        <button className="hero__arr hero__arr--next" onClick={next} aria-label="Next">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
      </div>

      {/* Progress bar */}
      <div className="hero__progress">
        <div className="hero__progress-bar" style={{ animationDuration: `${AUTOPLAY_INTERVAL}ms` }} key={active} />
      </div>
    </section>
  );
}
