import React from 'react';
import Team from '../components/Team';

const AboutUs = () => {
  return (
    <div style={{ paddingTop: '80px' }}>
      <section className="section" style={{ background: 'var(--bg-color)' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h1 className="text-gradient" style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>Sobre Nosotros</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>Conoce nuestros valores fundamentales y el equipo que hace posible la magia.</p>
          </div>

          <div className="glass-card" style={{ marginBottom: '4rem' }}>
            <h2 className="text-primary" style={{ fontSize: '2rem', marginBottom: '2rem', textAlign: 'center' }}>Nuestros Valores</h2>
            <div className="grid grid-cols-2">
              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ color: 'var(--text-main)', fontSize: '1.2rem', marginBottom: '0.5rem' }}>Invulnerabilidad y Excelencia Operativa</h4>
                <p style={{ color: 'var(--text-muted)' }}>Buscamos la máxima precisión en cada capa de seguridad y arquitectura de red, garantizando un escudo impenetrable frente a amenazas y asegurando niveles óptimos de estabilidad.</p>
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ color: 'var(--text-main)', fontSize: '1.2rem', marginBottom: '0.5rem' }}>Confidencialidad e Integridad</h4>
                <p style={{ color: 'var(--text-muted)' }}>Asumimos con estricto rigor ético el resguardo de la información y la continuidad de las operaciones de nuestros clientes.</p>
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ color: 'var(--text-main)', fontSize: '1.2rem', marginBottom: '0.5rem' }}>Innovación y Proactividad</h4>
                <p style={{ color: 'var(--text-muted)' }}>Anticipamos los riesgos y las amenazas emergentes mediante el monitoreo constante y la adopción de tecnologías de vanguardia.</p>
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ color: 'var(--text-main)', fontSize: '1.2rem', marginBottom: '0.5rem' }}>Calidad y Alta Disponibilidad</h4>
                <p style={{ color: 'var(--text-muted)' }}>Diseñamos e implementamos redes e infraestructuras bajo arquitecturas redundantes y eficientes.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Team />
    </div>
  );
};

export default AboutUs;
