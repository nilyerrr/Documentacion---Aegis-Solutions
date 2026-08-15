import React from 'react';

const Hero = () => {
  return (
    <section id="inicio" className="section" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: '100px' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <h1 className="animate-fade-in text-gradient" style={{ fontSize: '4.5rem', marginBottom: '1.5rem' }}>
          Protección Avanzada<br />para el Mundo Digital
        </h1>
        <p className="animate-fade-in delay-100" style={{ fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto 3rem' }}>
          Somos Aegis Solutions, un MSSP especializado en diseñar arquitecturas de seguridad robustas y proveer soluciones integrales de TI para blindar su empresa.
        </p>
        <div className="animate-fade-in delay-200" style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
          <a href="#cotizar" className="btn btn-primary">Solicitar Cotización</a>
          <a href="#servicios" className="btn btn-outline">Nuestros Servicios</a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
