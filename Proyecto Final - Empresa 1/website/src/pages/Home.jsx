import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';

const Home = () => {
  return (
    <>
      <Hero />
      <section className="section" style={{ background: 'var(--bg-color)' }}>
        <div className="container" style={{ maxWidth: '1000px' }}>
          <div className="grid grid-cols-2" style={{ gap: '4rem', alignItems: 'center' }}>
            <div>
              <h2 className="text-primary" style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Perfil Corporativo</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '1.5rem' }}>
                <strong>Aegis Solutions</strong> es un Proveedor de Servicios Gestionados de Seguridad y TI (MSSP) enfocado en proteger, administrar y optimizar la infraestructura tecnológica de empresas medianas y grandes.
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '1.5rem' }}>
                Actuamos como el <strong>departamento externalizado</strong> de tecnología y ciberseguridad para organizaciones que manejan datos críticos y requieren alta disponibilidad operativa.
              </p>
              <div style={{ background: 'rgba(212, 175, 55, 0.05)', borderLeft: '4px solid var(--primary)', padding: '1.5rem', borderRadius: '0 8px 8px 0' }}>
                <h4 style={{ color: 'var(--text-main)', marginBottom: '0.5rem', fontSize: '1.2rem' }}>Security by Design</h4>
                <p style={{ color: 'var(--text-muted)', margin: 0 }}>
                  No somos solo "soporte técnico": seguridad desde el diseño. No instalamos un servidor; lo instalamos blindado, segmentado en la VLAN correcta y monitoreado por nuestro SOC.
                </p>
              </div>
            </div>
            <div>
              <h2 className="text-primary" style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>¿Quiénes Somos?</h2>
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.5rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>Nuestra Misión</h3>
                <p style={{ color: 'var(--text-muted)' }}>Proveer soluciones integrales de consultoría tecnológica, infraestructura de red de alto rendimiento y ciberseguridad avanzada. Nos dedicamos a proteger y fortalecer los activos digitales de nuestras organizaciones clientes, garantizando la continuidad de sus operaciones mediante la implementación de arquitecturas sólidas, mitigación proactiva de riesgos y la aplicación de los más altos estándares de calidad y seguridad de la industria.</p>
              </div>
              <div>
                <h3 style={{ fontSize: '1.5rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>Nuestra Visión</h3>
                <p style={{ color: 'var(--text-muted)' }}>Consolidarnos como la firma de consultoría tecnológica referente en el sector, reconocida por la invulnerabilidad de nuestros esquemas de protección y la excelencia en el diseño de redes empresariales. Aspiramos a ser el socio estratégico indispensable que permita a las empresas innovar y operar con total confianza.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Features />
    </>
  );
};

export default Home;
