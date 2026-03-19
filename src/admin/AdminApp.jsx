import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLogin from './AdminLogin';
import AdminLayout from './AdminLayout';
import AdminDashboard from './AdminDashboard';
import AdminHero from './AdminHero';
import AdminServices from './AdminServices';
import AdminAbout from './AdminAbout';
import AdminCases from './AdminCases';
import AdminContact from './AdminContact';
import AdminServicesWhy from './AdminServicesWhy';
import AdminHeader from './AdminHeader';
import AdminFooter from './AdminFooter';
import AdminEcommerce from './AdminEcommerce';
import AdminProjects from './AdminProjects';
import AdminMessages from './AdminMessages';
import AdminClients from './AdminClients';
import AdminClientsPanel from './AdminClientsPanel';
import AdminChat from './AdminChat';
import AdminSecurity from './AdminSecurity';
import AdminTestimonials from './AdminTestimonials';
import './Admin.css';

const PAGE_TITLES = {
  '/admin':          'Dashboard',
  '/admin/hero':     'Hero Banner',
  '/admin/services': 'Services Content',
  '/admin/services-why': 'Why Choose Us',
  '/admin/about':    'About & Footer',
  '/admin/cases':    'Use Cases',
  '/admin/contact':  'Contact Info',
  '/admin/header':   'Edit Header',
  '/admin/footer':   'Edit Footer',
  '/admin/ecommerce': 'Ecommerce Store',
  '/admin/projects': 'Project Tracking',
  '/admin/messages': 'Client Inquiries',
  '/admin/clients':  'Client Logos',
  '/admin/client-panel': 'Client Management',
  '/admin/chat':     'Live Chat Support',
  '/admin/testimonials': 'Client Testimonials',
};

export default function AdminApp() {
  const [authed, setAuthed] = useState(
    () => sessionStorage.getItem('admin_auth') === 'true'
  );

  const logout = () => {
    sessionStorage.removeItem('admin_auth');
    setAuthed(false);
  };

  if (!authed) return <AdminLogin onLogin={() => setAuthed(true)} />;

  const path = window.location.pathname;
  const title = PAGE_TITLES[path] || 'Admin';

  return (
    <AdminLayout title={title} onLogout={logout}>
      <Routes>
        <Route index element={<AdminDashboard />} />
        <Route path="hero"     element={<AdminHero />} />
        <Route path="services" element={<AdminServices />} />
        <Route path="services-why" element={<AdminServicesWhy />} />
        <Route path="about"    element={<AdminAbout />} />
        <Route path="cases"    element={<AdminCases />} />
        <Route path="contact"  element={<AdminContact />} />
        <Route path="header"   element={<AdminHeader />} />
        <Route path="footer"   element={<AdminFooter />} />
        <Route path="ecommerce" element={<AdminEcommerce />} />
        <Route path="projects" element={<AdminProjects />} />
        <Route path="messages" element={<AdminMessages />} />
        <Route path="clients"  element={<AdminClients />} />
        <Route path="client-panel" element={<AdminClientsPanel />} />
        <Route path="chat"     element={<AdminChat />} />
        <Route path="security" element={<AdminSecurity />} />
        <Route path="testimonials" element={<AdminTestimonials />} />
        <Route path="*"        element={<Navigate to="/admin" replace />} />
      </Routes>
    </AdminLayout>
  );
}
