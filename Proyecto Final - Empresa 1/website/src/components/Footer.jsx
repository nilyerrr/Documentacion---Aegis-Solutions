import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{ borderTop: '1px solid var(--border)', padding: '4rem 0 2rem', background: 'var(--surface)' }}>
      <div className="container grid grid-cols-3" style={{ marginBottom: '3rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <img src="/logo.png" alt="AEGIS Logo" style={{ height: '30px' }} onError={(e) => { e.target.style.display = 'none'; }} />
            <h2 className="text-primary" style={{ fontSize: '1.5rem', margin: 0 }}>AEGIS</h2>
          </div>
          <p style={{ color: 'var(--text-muted)' }}>El escudo digital para tu infraestructura y negocio.</p>
        </div>
        <div>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', fontFamily: 'Space Grotesk' }}>Navegación</h3>
          <ul style={{ listStyle: 'none', color: 'var(--text-muted)' }}>
            <li style={{ marginBottom: '0.5rem' }}><Link to="/" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e=>e.target.style.color='var(--primary)'} onMouseOut={e=>e.target.style.color='inherit'}>Inicio</Link></li>
            <li style={{ marginBottom: '0.5rem' }}><Link to="/servicios" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e=>e.target.style.color='var(--primary)'} onMouseOut={e=>e.target.style.color='inherit'}>Servicios</Link></li>
            <li style={{ marginBottom: '0.5rem' }}><Link to="/nosotros" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e=>e.target.style.color='var(--primary)'} onMouseOut={e=>e.target.style.color='inherit'}>Integrantes</Link></li>
            <li style={{ marginBottom: '0.5rem' }}><Link to="/contacto" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e=>e.target.style.color='var(--primary)'} onMouseOut={e=>e.target.style.color='inherit'}>Contacto</Link></li>
          </ul>
        </div>
        <div>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', fontFamily: 'Space Grotesk' }}>Contacto</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>contacto@aegissolutions.com</p>
          <p style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>+1 (809) 555-0199</p>
          <p style={{ color: 'var(--text-muted)' }}>Políticas de Privacidad</p>
        </div>
      </div>
      <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem', borderTop: '1px solid var(--border)', paddingTop: '2rem' }}>
        &copy; {new Date().getFullYear()} AEGIS Consultoría Tecnológica. Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;
