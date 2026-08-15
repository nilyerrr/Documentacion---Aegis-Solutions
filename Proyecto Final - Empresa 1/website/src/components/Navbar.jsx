import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav style={{ 
      padding: scrolled ? '1rem 0' : '1.5rem 0', 
      position: 'fixed', 
      width: '100%', 
      top: 0, 
      zIndex: 100, 
      background: scrolled ? 'rgba(13, 17, 23, 0.95)' : 'transparent', 
      backdropFilter: 'blur(10px)', 
      borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      transition: 'all 0.3s ease'
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <img src="/logo.png" alt="AEGIS Logo" style={{ height: '40px' }} onError={(e) => { e.target.style.display = 'none'; }} />
          <h2 style={{ margin: 0, fontSize: '1.8rem', fontFamily: 'Space Grotesk', fontWeight: 700 }}>AEGIS</h2>
        </div>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <a href="#inicio" style={{ color: 'var(--text-main)', textDecoration: 'none', fontWeight: 500, fontSize: '0.95rem' }}>Inicio</a>
          <a href="#servicios" style={{ color: 'var(--text-main)', textDecoration: 'none', fontWeight: 500, fontSize: '0.95rem' }}>Servicios</a>
          <a href="#infraestructura" style={{ color: 'var(--text-main)', textDecoration: 'none', fontWeight: 500, fontSize: '0.95rem' }}>Infraestructura</a>
          <a href="#nosotros" style={{ color: 'var(--text-main)', textDecoration: 'none', fontWeight: 500, fontSize: '0.95rem' }}>Sobre Nosotros</a>
          <a href="#contacto" className="btn btn-primary" style={{ padding: '0.6rem 1.5rem', fontSize: '0.95rem' }}>Solicitar Auditoría</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
