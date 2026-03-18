import React, { useState } from 'react';
import { useContent } from '../admin/AdminContext';
import './Contact.css';

export default function Contact() {
  const { dispatch } = useContent();
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = e => {
    e.preventDefault();
    dispatch({ 
      type: 'ADD_MESSAGE', 
      payload: { ...form, id: Date.now(), date: new Date().toISOString(), read: false } 
    });
    setSent(true);
  };

  return (
    <section className="contact" id="contact">
      <div className="container">
        <div className="contact__grid">
          <div className="contact__left">
            <span className="section-label">Get In Touch</span>
            <h2 className="section-title">
              Ready to <span>Secure</span><br /> Your Business?
            </h2>
            <p className="section-desc" style={{ marginTop: 16 }}>
              Get a free security assessment and custom quote. Our experts will analyze your
              requirements and recommend the best solution.
            </p>

            <div className="contact__items">
              <div className="contact__item">
                <div className="contact__item-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.63A2 2 0 012 .82h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
                </div>
                <div>
                  <div className="contact__item-label">Call Us</div>
                  <div className="contact__item-val">+91 XXX XXX XXXX</div>
                </div>
              </div>
              <div className="contact__item">
                <div className="contact__item-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                </div>
                <div>
                  <div className="contact__item-label">Email Us</div>
                  <div className="contact__item-val">info@amparoglobal.com</div>
                </div>
              </div>
              <div className="contact__item">
                <div className="contact__item-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </div>
                <div>
                  <div className="contact__item-label">Location</div>
                  <div className="contact__item-val">India</div>
                </div>
              </div>
            </div>
          </div>

          <div className="contact__right">
            {sent ? (
              <div className="contact__success">
                <div className="contact__success-icon">✅</div>
                <h3>Message Sent!</h3>
                <p>Thank you for reaching out. Our team will contact you within 24 hours.</p>
                <button className="btn-primary" onClick={() => setSent(false)}>Send Another</button>
              </div>
            ) : (
              <form className="contact__form card" onSubmit={handleSubmit}>
                <h3 className="contact__form-title">Request Free Assessment</h3>
                <div className="contact__row">
                  <div className="contact__field">
                    <label>Full Name</label>
                    <input type="text" name="name" placeholder="John Doe" value={form.name} onChange={handleChange} required />
                  </div>
                  <div className="contact__field">
                    <label>Email Address</label>
                    <input type="email" name="email" placeholder="john@company.com" value={form.email} onChange={handleChange} required />
                  </div>
                </div>
                <div className="contact__row">
                  <div className="contact__field">
                    <label>Phone Number</label>
                    <input type="tel" name="phone" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={handleChange} />
                  </div>
                  <div className="contact__field">
                    <label>Company Name</label>
                    <input type="text" name="company" placeholder="Your Company" value={form.company} onChange={handleChange} />
                  </div>
                </div>
                <div className="contact__field">
                  <label>Service Interested In</label>
                  <select name="service" value={form.service} onChange={handleChange} required>
                    <option value="">Select a service</option>
                    <option>AI Attendance System</option>
                    <option>VAPT / Cybersecurity</option>
                    <option>Fire Detection</option>
                    <option>Weapon Detection</option>
                    <option>Smart Surveillance</option>
                    <option>Multiple Services</option>
                  </select>
                </div>
                <div className="contact__field">
                  <label>Message</label>
                  <textarea name="message" rows="4" placeholder="Tell us about your security needs..." value={form.message} onChange={handleChange} />
                </div>
                <button type="submit" className="btn-primary contact__submit">
                  Send Message
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/></svg>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
