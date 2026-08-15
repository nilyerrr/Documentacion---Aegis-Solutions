import React from 'react';

const Navbar = () => {
  return (
    <nav style={{ padding: '1.5rem 0', position: 'fixed', width: '100%', top: 0, zIndex: 100, background: 'rgba(10, 10, 15, 0.8)', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 className="text-gradient" style={{ margin: 0, fontSize: '1.8rem' }}>Aegis Solutions</h2>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <a href="#inicio" style={{ color: 'var(--text-main)', textDecoration: 'none', fontWeight: 500 }}>Inicio</a>
          <a href="#servicios" style={{ color: 'var(--text-main)', textDecoration: 'none', fontWeight: 500 }}>Servicios</a>
          <a href="#nosotros" style={{ color: 'var(--text-main)', textDecoration: 'none', fontWeight: 500 }}>Nosotros</a>
          <a href="#cotizar" className="btn btn-primary" style={{ padding: '0.6rem 1.5rem' }}>Cotizar</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
