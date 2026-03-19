import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AdminProvider } from './admin/AdminContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import HelpBot from './components/HelpBot';

import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ServiceDetail from './pages/ServiceDetail';
import ProcessPage from './pages/ProcessPage';
import IndustriesPage from './pages/IndustriesPage';
import ContactPage from './pages/ContactPage';
import AdminApp from './admin/AdminApp';

function AnimatedRoutes() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  if (isAdmin) {
    return (
      <Routes location={location} key={location.pathname}>
        <Route path="/admin/*" element={<AdminApp />} />
      </Routes>
    );
  }

  return (
    <>
      <Navbar />
      <HelpBot />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/"             element={<Home />} />
          <Route path="/about"        element={<AboutPage />} />
          <Route path="/services"     element={<ServicesPage />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/how-it-works" element={<ProcessPage />} />
          <Route path="/industries"   element={<IndustriesPage />} />
          <Route path="/contact"      element={<ContactPage />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </>
  );
}

function App() {
  return (
    <AdminProvider>
      <Router>
        <CustomCursor />
        <AnimatedRoutes />
      </Router>
    </AdminProvider>
  );
}

export default App;
