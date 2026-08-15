import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section id="inicio" className="section" style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: '100px', overflow: 'hidden' }}>
      

      <style>
        {`
          @keyframes floatHero {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-25px); }
            100% { transform: translateY(0px); }
          }
          .hero-content {
            flex: 1;
            min-width: 300px;
            max-width: 700px;
          }
          .hero-title {
            font-size: clamp(2.5rem, 8vw, 4.5rem);
            margin-bottom: 1.5rem;
            line-height: 1.1;
            word-wrap: break-word;
          }
          .hero-subtitle {
            font-size: 1.25rem;
            color: var(--text-muted);
            margin-bottom: 3rem;
            max-width: 600px;
          }
          .hero-buttons {
            display: flex;
            gap: 1.5rem;
            flex-wrap: wrap;
          }
          @media (max-width: 768px) {
            .hero-content {
              text-align: center;
              margin: 0 auto;
            }
            .hero-subtitle {
              font-size: 1.15rem;
              margin-left: auto;
              margin-right: auto;
            }
            .hero-buttons {
              justify-content: center;
            }
          }
        `}
      </style>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4rem' }}>
          
          <div className="hero-content">
            <h1 className="animate-fade-in text-gradient hero-title">
              El Escudo Digital para tu Infraestructura y Negocio
            </h1>
            <p className="animate-fade-in delay-100 hero-subtitle">
              Consultoría especializada en redes de alto rendimiento, blindaje en la nube y mitigación proactiva de riesgos.
            </p>
            <div className="animate-fade-in delay-200 hero-buttons">
              <Link to="/servicios" className="btn btn-primary">Explorar Soluciones</Link>
              <Link to="/nosotros" className="btn btn-outline">Conocer al Equipo</Link>
            </div>
          </div>

          <div className="animate-fade-in delay-200" style={{ flex: 1, display: 'flex', justifyContent: 'center', minWidth: '300px' }}>
            <div style={{
              width: '100%',
              maxWidth: '450px',
              filter: 'drop-shadow(0 0 50px rgba(212, 175, 55, 0.25)) drop-shadow(0 0 80px rgba(32, 83, 117, 0.3))',
              animation: 'floatHero 6s ease-in-out infinite'
            }}>
              <img src="/logo.png" alt="AEGIS Logo Principal" style={{ width: '100%', height: 'auto', display: 'block' }} />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
