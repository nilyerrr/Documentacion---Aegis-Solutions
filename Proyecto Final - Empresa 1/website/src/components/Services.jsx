import React from 'react';

const servicesList = [
  { title: 'Infraestructura & Redes', desc: 'Diseño de topologías, segmentación, enrutamiento avanzado y alta disponibilidad.' },
  { title: 'Seguridad Cloud & Servidores', desc: 'Hardening de servidores, gestión de identidades y planes de recuperación ante desastres (DRP).' },
  { title: 'Ciberseguridad & Mitigación', desc: 'Prevención de intrusiones, protección contra malware/ransomware y auditorías de vulnerabilidad.' }
];

const Services = () => {
  return (
    <section id="servicios" className="section" style={{ background: 'var(--bg-color)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Catálogo de Servicios</h2>
          <p style={{ color: 'var(--text-muted)' }}>Soluciones integrales de alto nivel.</p>
        </div>
        <div className="grid grid-cols-3">
          {servicesList.map((service, idx) => (
            <div key={idx} className="glass-card">
              <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: 'var(--primary)' }}>{service.title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
