import React from 'react';

const statsData = [
  { value: '+15,000', label: 'Amenazas Mitigadas', desc: 'Bloqueadas por nuestro SOC en el último año' },
  { value: '99.9%', label: 'Uptime Garantizado', desc: 'Continuidad operativa y de servicios' },
  { value: '+120', label: 'Proyectos Exitosos', desc: 'Infraestructuras críticas securizadas' },
  { value: '24/7', label: 'Monitoreo Activo', desc: 'Protección ininterrumpida por especialistas' }
];

const Stats = () => {
  return (
    <section className="section" style={{ background: 'var(--bg-color)' }}>
      <div className="container">
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
          gap: '2rem',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {statsData.map((stat, idx) => (
            <div key={idx} className="glass-card" style={{ 
              padding: '2.5rem 1.5rem', 
              textAlign: 'center',
              borderTop: '3px solid var(--primary)',
              transition: 'transform 0.3s ease',
              cursor: 'default'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <h2 style={{ fontSize: '3.5rem', color: 'var(--text-main)', marginBottom: '0.5rem', fontFamily: 'Space Grotesk' }}>
                {stat.value}
              </h2>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--primary)', marginBottom: '1rem', fontWeight: 600 }}>
                {stat.label}
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                {stat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
