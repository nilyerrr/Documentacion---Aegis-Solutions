import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import ServicesPage from './pages/ServicesPage';
import AboutUs from './pages/AboutUs';
import Partners from './pages/Partners';
import Locations from './pages/Locations';
import ContactPage from './pages/ContactPage';

import ChatWidget from './components/ChatWidget';
import NetworkBackground from './components/NetworkBackground';

function App() {
  return (
    <Router>
      <NetworkBackground />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/servicios" element={<ServicesPage />} />
        <Route path="/nosotros" element={<AboutUs />} />
        <Route path="/socios" element={<Partners />} />
        <Route path="/sedes" element={<Locations />} />
        <Route path="/contacto" element={<ContactPage />} />
      </Routes>
      <ChatWidget />
      <Footer />
    </Router>
  );
}

export default App;
