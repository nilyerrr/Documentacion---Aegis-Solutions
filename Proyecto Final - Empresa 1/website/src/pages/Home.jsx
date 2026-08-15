import React from 'react';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import Features from '../components/Features';

const valores = [
  { title: 'Invulnerabilidad y Excelencia Operativa', desc: 'Buscamos la máxima precisión en cada capa de seguridad y arquitectura de red, garantizando un escudo impenetrable frente a amenazas y asegurando niveles óptimos de estabilidad.' },
  { title: 'Confidencialidad e Integridad', desc: 'Asumimos con estricto rigor ético el resguardo de la información y la continuity de las operaciones de nuestros clientes.' },
  { title: 'Innovación y Proactividad', desc: 'Anticipamos los riesgos y las amenazas emergentes mediante el monitoreo constante y la adopción de tecnologías de vanguardia.' },
  { title: 'Calidad y Alta Disponibilidad', desc: 'Diseñamos e implementamos redes e infraestructuras bajo arquitecturas redundantes y eficientes.' },
  { title: 'Compromiso y Alianza Estratégica', desc: 'Tratamos la seguridad de nuestros clientes como la nuestra propia, estableciendo relaciones de confianza a largo plazo.' }
];

const Home = () => {
  return (
    <>
      <Hero />
      <Stats />
      <section className="section">
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
              <h2 className="text-primary" style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Propósito</h2>
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

      {/* Valores Section */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 className="text-primary" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Nuestros Valores</h2>
            <p style={{ color: 'var(--text-muted)' }}>Los principios que rigen nuestro escudo digital.</p>
          </div>
          <div className="grid grid-cols-3">
            {valores.map((val, idx) => (
              <div key={idx} className="glass-card" style={{ padding: '2rem', background: 'var(--surface-light)' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '4px', background: 'var(--primary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontWeight: 'bold', fontSize: '1.2rem' }}>
                  ✓
                </div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>{val.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Features />
    </>
  );
};

export default Home;
