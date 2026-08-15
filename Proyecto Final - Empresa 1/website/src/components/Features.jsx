import React from 'react';

const features = [
  { title: 'Calidad', desc: 'Disponibilidad 99.9%, arquitecturas de alta resiliencia y certificaciones internacionales.' },
  { title: 'Velocidad', desc: 'Respuesta y contención en tiempo récord, optimización de servidores e infraestructuras cloud.' },
  { title: 'Mitigación Integral', desc: 'Protección multinube y hardening avanzado de sistemas.' }
];

const Features = () => {
  return (
    <section id="infraestructura" className="section" style={{ background: 'var(--surface-light)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 className="text-primary" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Por Qué Elegirnos</h2>
          <p style={{ color: 'var(--text-muted)' }}>Infraestructura diseñada para nunca fallar.</p>
        </div>
        <div className="grid grid-cols-3">
          {features.map((feat, idx) => (
            <div key={idx} className="glass-card" style={{ padding: '2rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '4px', background: 'var(--primary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontWeight: 'bold', fontSize: '1.2rem' }}>
                ✓
              </div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>{feat.title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{feat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
