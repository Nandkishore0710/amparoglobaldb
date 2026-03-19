import React from 'react';
import logo from '../assets/amparologo-2.png';
import './Footer.css';
import { useContent } from '../admin/AdminContext';

export default function Footer() {
  const { state } = useContent();
  const year = new Date().getFullYear();
  const { socials, tagline, copyright, locations } = state.footerSettings || {};

  return (
    <footer className="footer">
      <div className="footer__wave-container">
        <svg className="footer__wave" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path 
            fill="#050a14" 
            fillOpacity="1" 
            d="M0,160L48,176C96,192,192,224,288,218.7C384,213,480,171,576,160C672,149,768,171,864,181.3C960,192,1056,192,1152,170.7C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
        
        <div className="footer__social-links">
          {['youtube', 'linkedin', 'twitter', 'instagram'].map(platform => {
            const url = socials?.[platform];
            const customIcon = state.footerSettings?.socialIcons?.[platform];
            if (!url) return null;

            return (
              <a key={platform} href={url} target="_blank" rel="noreferrer" className={`footer__social-link ${platform}`} aria-label={platform}>
                {customIcon ? (
                  <img src={customIcon} alt={platform} style={{ width: '24px', height: '24px', objectFit: 'contain' }} />
                ) : (
                  platform === 'youtube' ? (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                    </svg>
                  ) : platform === 'linkedin' ? (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  ) : platform === 'twitter' ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.953 4.57c-.885.392-1.83.656-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z"/>
                    </svg>
                  ) : (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.332 3.608 1.308.975.975 1.245 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.332 2.633-1.308 3.608-.975.975-2.242 1.245-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.332-3.608-1.308-.975-.975-1.245-2.242-1.308-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.332-2.633 1.308-3.608.975-.975 2.242-1.245 3.608-1.308 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-1.277.058-2.148.262-2.912.558-.79.307-1.459.718-2.126 1.384-.666.666-1.077 1.335-1.384 2.126-.296.764-.5 1.635-.558 2.912-.058 1.28-.072 1.688-.072 4.947s.014 3.667.072 4.947c.058 1.277.262 2.148.558 2.912.307.79.718 1.459 1.384 2.126.666.666 1.335 1.077 2.126 1.384.764.296 1.635.5 2.912.558 1.28.058 1.688.072 4.947.072s3.667-.014 4.947-.072c1.277-.058 2.148-.262 2.912-.558.79-.307 1.459-.718 2.126-1.384.666-.666 1.077-1.335 1.384-2.126.296-.764.5-1.635.558-2.912.058-1.28.072-1.688.072-4.947s-.014-3.667-.072-4.947c-.058-1.277-.262-2.148-.558-2.912-.307-.79-.718-1.459-1.384-2.126-.666-.666-1.335-1.077-2.126-1.384-.764-.296-1.635-.5-2.912-.558-1.28-.058-1.688-.072-4.947-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.209-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  )
                )}
              </a>
            );
          })}
        </div>
      </div>

      <div className="footer__content">
        <div className="container">
          <div className="footer__grid">
            <div className="footer__brand-col">
              <img src={logo} alt="Amparo Logo" className="footer__glowing-logo" />
              <p className="footer__tagline" style={{ fontSize: '0.85rem', color: '#888', margin: '10px 0', maxWidth: 250 }}>{tagline || state.footerTagline}</p>
              <p className="footer__copyright">© {year} {copyright || 'AMPARO Secure Tech. All rights reserved.'}</p>
            </div>

            <div className="footer__col">
              <h4 className="footer__title">Company</h4>
              <ul className="footer__links">
                <li><a href="/about">About Us</a></li>
                <li><a href="/how-it-works">How It Works</a></li>
                <li><a href="/industries">Industries</a></li>
                <li><a href="/contact">Contact Us</a></li>
              </ul>
            </div>

            <div className="footer__col">
              <h4 className="footer__title">Services</h4>
              <ul className="footer__links">
                <li><a href="/services/ai-attendance">AI Attendance</a></li>
                <li><a href="/services/vapt-services">VAPT Services</a></li>
                <li><a href="/services/fire-detection">Fire Detection</a></li>
                <li><a href="/services/smart-surveillance">Smart Surveillance</a></li>
              </ul>
            </div>

            <div className="footer__col">
              <h4 className="footer__title">Locations</h4>
              <ul className="footer__info">
                {locations?.map((loc, i) => (
                  <li key={i}>{loc}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

    </footer>
  );
}
