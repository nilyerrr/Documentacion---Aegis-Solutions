import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cerrar menú al cambiar de ruta
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path) => location.pathname === path ? 'var(--primary)' : 'var(--text-main)';

  return (
    <>
      <style>
        {`
          .nav-links {
            display: flex;
            gap: 2rem;
            align-items: center;
          }
          .menu-toggle {
            display: none;
            flex-direction: column;
            gap: 5px;
            background: transparent;
            border: none;
            cursor: pointer;
            z-index: 101;
            padding: 5px;
          }
          .menu-toggle span {
            width: 25px;
            height: 3px;
            background: var(--text-main);
            border-radius: 2px;
            transition: all 0.3s ease;
          }
          @media (max-width: 950px) {
            .nav-links {
              position: absolute;
              top: 100%;
              left: 0;
              width: 100%;
              flex-direction: column;
              background: rgba(13, 17, 23, 0.98);
              padding: 2rem;
              gap: 1.5rem;
              border-bottom: 1px solid var(--border);
              transform: translateY(-100%);
              opacity: 0;
              pointer-events: none;
              transition: all 0.3s ease;
              z-index: -1;
              box-shadow: 0 10px 30px rgba(0,0,0,0.5);
            }
            .nav-links.open {
              transform: translateY(0);
              opacity: 1;
              pointer-events: auto;
            }
            .menu-toggle {
              display: flex;
            }
            .menu-toggle.open span:nth-child(1) {
              transform: rotate(45deg) translate(5px, 6px);
              background: var(--primary);
            }
            .menu-toggle.open span:nth-child(2) {
              opacity: 0;
            }
            .menu-toggle.open span:nth-child(3) {
              transform: rotate(-45deg) translate(5px, -6px);
              background: var(--primary);
            }
          }
        `}
      </style>
      <nav style={{ 
        padding: scrolled ? '1rem 0' : '1.5rem 0', 
        position: 'fixed', 
        width: '100%', 
        top: 0, 
        zIndex: 100, 
        background: scrolled || menuOpen ? 'rgba(13, 17, 23, 0.98)' : 'rgba(13, 17, 23, 0.8)', 
        backdropFilter: 'blur(10px)', 
        borderBottom: '1px solid var(--border)',
        transition: 'all 0.3s ease'
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '1rem', textDecoration: 'none', color: 'inherit' }}>
            <img src="/logo.png" alt="AEGIS Logo" style={{ height: '40px' }} onError={(e) => { e.target.style.display = 'none'; }} />
            <h2 style={{ margin: 0, fontSize: '1.8rem', fontFamily: 'Space Grotesk', fontWeight: 700 }}>AEGIS</h2>
          </Link>
          
          <button 
            className={`menu-toggle ${menuOpen ? 'open' : ''}`} 
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
            <Link to="/" style={{ color: isActive('/'), textDecoration: 'none', fontWeight: 500, fontSize: '1rem' }}>Inicio</Link>
            <Link to="/servicios" style={{ color: isActive('/servicios'), textDecoration: 'none', fontWeight: 500, fontSize: '1rem' }}>Servicios</Link>
            <Link to="/nosotros" style={{ color: isActive('/nosotros'), textDecoration: 'none', fontWeight: 500, fontSize: '1rem' }}>Integrantes</Link>
            <Link to="/socios" style={{ color: isActive('/socios'), textDecoration: 'none', fontWeight: 500, fontSize: '1rem' }}>Socios</Link>
            <Link to="/sedes" style={{ color: isActive('/sedes'), textDecoration: 'none', fontWeight: 500, fontSize: '1rem' }}>Sedes</Link>
            <Link to="/contacto" className="btn btn-primary" style={{ padding: '0.6rem 1.5rem', fontSize: '1rem', width: '100%', textAlign: 'center' }}>Solicitar Auditoría</Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
