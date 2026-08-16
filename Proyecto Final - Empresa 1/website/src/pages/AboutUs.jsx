import React from 'react';
import Team from '../components/Team';

const AboutUs = () => {
  return (
    <div style={{ paddingTop: '80px', minHeight: '80vh' }}>
      <section className="section" style={{ background: 'var(--bg-color)', paddingBottom: '0' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <img src="/logo.png" alt="Aegis Logo" style={{ height: '80px', margin: '0 auto 1.5rem auto', display: 'block' }} />
            <h1 className="text-gradient" style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>Integrantes</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>Conoce a los especialistas detrás del escudo digital de Aegis Solutions.</p>
          </div>
        </div>
      </section>
      <Team />
    </div>
  );
};

export default AboutUs;
