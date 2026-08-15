import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path ? 'var(--primary)' : 'var(--text-main)';

  return (
    <nav style={{ 
      padding: scrolled ? '1rem 0' : '1.5rem 0', 
      position: 'fixed', 
      width: '100%', 
      top: 0, 
      zIndex: 100, 
      background: scrolled ? 'rgba(13, 17, 23, 0.95)' : 'rgba(13, 17, 23, 0.8)', 
      backdropFilter: 'blur(10px)', 
      borderBottom: '1px solid var(--border)',
      transition: 'all 0.3s ease'
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '1rem', textDecoration: 'none', color: 'inherit' }}>
          <img src="/logo.png" alt="AEGIS Logo" style={{ height: '40px' }} onError={(e) => { e.target.style.display = 'none'; }} />
          <h2 style={{ margin: 0, fontSize: '1.8rem', fontFamily: 'Space Grotesk', fontWeight: 700 }}>AEGIS</h2>
        </Link>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <Link to="/" style={{ color: isActive('/'), textDecoration: 'none', fontWeight: 500, fontSize: '0.95rem' }}>Inicio</Link>
          <Link to="/servicios" style={{ color: isActive('/servicios'), textDecoration: 'none', fontWeight: 500, fontSize: '0.95rem' }}>Servicios</Link>
          <Link to="/nosotros" style={{ color: isActive('/nosotros'), textDecoration: 'none', fontWeight: 500, fontSize: '0.95rem' }}>Integrantes</Link>
          <Link to="/socios" style={{ color: isActive('/socios'), textDecoration: 'none', fontWeight: 500, fontSize: '0.95rem' }}>Socios</Link>
          <Link to="/sedes" style={{ color: isActive('/sedes'), textDecoration: 'none', fontWeight: 500, fontSize: '0.95rem' }}>Sedes</Link>
          <Link to="/contacto" className="btn btn-primary" style={{ padding: '0.6rem 1.5rem', fontSize: '0.95rem' }}>Solicitar Auditoría</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
