import React from 'react';

const locations = [
  { city: 'Santo Domingo', icon: '🏙️', desc: 'Sede Central (Hub) — Administración, SOC e Infraestructura' },
  { city: 'Santiago', icon: '🌄', desc: 'Centro de Datos y Servicios Empresariales' },
  { city: 'La Romana', icon: '🏖️', desc: 'Consultoría e Implementación de Proyectos' },
  { city: 'Puerto Plata', icon: '🚢', desc: 'Laboratorio Avanzado de Ciberseguridad' }
];

const Locations = () => {
  return (
    <div style={{ paddingTop: '80px', minHeight: '80vh' }}>
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h1 className="text-gradient" style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>Nuestras Sedes</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>Estratégicamente ubicados para garantizar cobertura y redundancia nacional.</p>
          </div>
          <div className="grid grid-cols-2">
            {locations.map((loc, idx) => (
              <div key={idx} className="glass-card">
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{loc.icon}</div>
                <h3 style={{ fontSize: '1.8rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>{loc.city}</h3>
                <p style={{ color: 'var(--text-main)', fontSize: '1.1rem' }}>{loc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Locations;
