import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useContent } from '../admin/AdminContext';
import logo from '../assets/amparologo-2.png';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = useContent();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
    setMenuOpen(false);
    setMegaMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`} onMouseLeave={() => setMegaMenuOpen(false)}>
      <div className="navbar__inner container">
        <Link to="/" className="navbar__logo">
          <img src={logo} alt="Amparo Logo" />
        </Link>

        <nav className={`navbar__links${menuOpen ? ' navbar__links--open' : ''}`}>
          <NavLink to="/" className={({ isActive }) => `navbar__link${isActive ? ' navbar__link--active' : ''}`}>Home</NavLink>
          
          <div 
            className="navbar__dropdown-wrapper"
            onMouseEnter={() => setMegaMenuOpen(true)}
          >
            <span 
              className={`navbar__link ${location.pathname.includes('/services') ? 'navbar__link--active' : ''}`}
              onClick={(e) => {
                if (window.innerWidth <= 900) {
                  setMegaMenuOpen(!megaMenuOpen);
                } else {
                  navigate('/services');
                }
              }}
              style={{ cursor: 'pointer' }}
            >
              Services
              <svg className={`navbar__chevron ${megaMenuOpen ? 'open' : ''}`} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
            </span>

            {/* Mega Menu Content */}
            {megaMenuOpen && (
              <div className="navbar__mega-menu" onClick={e => e.stopPropagation()}>
                <div className="navbar__mega-grid">
                  <div className="navbar__mega-main">
                    <h4>Our Core Services</h4>
                    <p>Discover how AMPARO's AI-driven solutions can transform your security infrastructure.</p>
                    <Link to="/services" className="navbar__mega-btn">View All Services</Link>
                  </div>
                  <div className="navbar__mega-links">
                    {state.services.map(s => (
                      <Link key={s.id} to={`/services/${s.slug}`} className="navbar__mega-item">
                        <div className="navbar__mega-item-title">{s.title}</div>
                        <div className="navbar__mega-item-sub">{s.subtitle}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <NavLink to="/about" className={({ isActive }) => `navbar__link${isActive ? ' navbar__link--active' : ''}`}>About</NavLink>
          <NavLink to="/how-it-works" className={({ isActive }) => `navbar__link${isActive ? ' navbar__link--active' : ''}`}>How It Works</NavLink>
          <NavLink to="/industries" className={({ isActive }) => `navbar__link${isActive ? ' navbar__link--active' : ''}`}>Industries</NavLink>
          <NavLink to="/contact" className={({ isActive }) => `navbar__link${isActive ? ' navbar__link--active' : ''}`}>Contact</NavLink>

          <Link to={state.headerSettings?.ctaLink || "/contact"} className="btn-primary navbar__cta">
            {state.headerSettings?.ctaLabel || "Get Free Quote"}
          </Link>
        </nav>

        <button
          className={`navbar__burger${menuOpen ? ' navbar__burger--open' : ''}`}
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
}
