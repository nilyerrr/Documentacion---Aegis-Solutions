import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const bgRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (bgRef.current) {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        bgRef.current.style.backgroundPosition = `${x}% ${y}%`;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="inicio" className="section" style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: '100px', overflow: 'hidden' }}>
      <div 
        ref={bgRef}
        className="network-bg" 
        style={{ 
          backgroundSize: '200% 200%',
          transition: 'background-position 0.2s ease-out' 
        }} 
      />
      <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '900px' }}>
        <h1 className="animate-fade-in text-gradient" style={{ fontSize: '4.5rem', marginBottom: '1.5rem', lineHeight: 1.1 }}>
          El Escudo Digital para tu Infraestructura y Negocio
        </h1>
        <p className="animate-fade-in delay-100" style={{ fontSize: '1.25rem', color: 'var(--text-muted)', marginBottom: '3rem', maxWidth: '700px' }}>
          Consultoría especializada en redes de alto rendimiento, blindaje en la nube y mitigación proactiva de riesgos.
        </p>
        <div className="animate-fade-in delay-200" style={{ display: 'flex', gap: '1.5rem' }}>
          <Link to="/servicios" className="btn btn-primary">Explorar Soluciones</Link>
          <Link to="/nosotros" className="btn btn-outline">Conocer al Equipo</Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
