import React from 'react';

const Team = () => {
  return (
    <section id="nosotros" className="section" style={{ background: 'var(--surface)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 className="text-primary" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Liderazgo Técnico</h2>
          <p style={{ color: 'var(--text-muted)' }}>Especialistas en infraestructura y seguridad cloud.</p>
        </div>
        <div className="glass-card" style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <div style={{ flex: 1 }}>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>Especialista Principal</h3>
            <p style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '1rem', marginBottom: '1rem' }}>Infraestructura & Seguridad Cloud</p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
              Liderando arquitecturas complejas y asegurando la integridad de los datos en entornos empresariales de alta exigencia.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <span style={{ padding: '0.4rem 0.8rem', background: 'rgba(212, 175, 55, 0.1)', border: '1px solid var(--primary)', borderRadius: '4px', fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 600 }}>CCNA</span>
              <span style={{ padding: '0.4rem 0.8rem', background: 'rgba(212, 175, 55, 0.1)', border: '1px solid var(--primary)', borderRadius: '4px', fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 600 }}>CompTIA Security+</span>
              <span style={{ padding: '0.4rem 0.8rem', background: 'rgba(212, 175, 55, 0.1)', border: '1px solid var(--primary)', borderRadius: '4px', fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 600 }}>Cloud Security Specialist</span>
            </div>
          </div>
          <div style={{ width: '150px', height: '150px', borderRadius: '8px', background: 'var(--secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4rem' }}>
            🛡️
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
