import React from 'react';

const Footer = () => {
  return (
    <footer style={{ borderTop: '1px solid var(--border)', padding: '4rem 0 2rem', background: 'var(--surface)' }}>
      <div className="container grid grid-cols-3" style={{ marginBottom: '3rem' }}>
        <div>
          <h2 className="text-gradient" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Aegis Solutions</h2>
          <p style={{ color: 'var(--text-muted)' }}>Blindando su infraestructura digital con soluciones de ciberseguridad y redes de alto nivel.</p>
        </div>
        <div>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Enlaces Rápidos</h3>
          <ul style={{ listStyle: 'none', color: 'var(--text-muted)' }}>
            <li style={{ marginBottom: '0.5rem' }}><a href="#inicio" style={{ color: 'inherit', textDecoration: 'none' }}>Inicio</a></li>
            <li style={{ marginBottom: '0.5rem' }}><a href="#servicios" style={{ color: 'inherit', textDecoration: 'none' }}>Servicios</a></li>
            <li style={{ marginBottom: '0.5rem' }}><a href="#nosotros" style={{ color: 'inherit', textDecoration: 'none' }}>Nosotros</a></li>
          </ul>
        </div>
        <div>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Contacto</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>contacto@aegissolutions.com</p>
          <p style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>+1 (809) 555-0199</p>
          <p style={{ color: 'var(--text-muted)' }}>República Dominicana</p>
        </div>
      </div>
      <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '2rem' }}>
        &copy; {new Date().getFullYear()} Aegis Solutions. Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;
