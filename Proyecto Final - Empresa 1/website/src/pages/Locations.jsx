import React from 'react';

const locations = [
  { 
    city: 'Santo Domingo', 
    icon: '🏙️', 
    role: 'Sede Central (Hub)',
    desc: 'Centro principal de operaciones de negocio y gobernanza.',
    departments: [
      'Dirección General', 
      'Recursos Humanos', 
      'Cumplimiento', 
      'Soporte Técnico', 
      'Finanzas', 
      'Ventas', 
      'Marketing'
    ]
  },
  { 
    city: 'Santiago', 
    icon: '🌄', 
    role: 'Centro de Datos & Empresarial',
    desc: 'Operación del centro de datos corporativo y servicios a nivel empresa.',
    departments: [
      'Centro de Datos', 
      'Ventas Corporativas', 
      'Administración', 
      'Servidores'
    ]
  },
  { 
    city: 'Puerto Plata', 
    icon: '🚢', 
    role: 'Laboratorio de Ciberseguridad',
    desc: 'Investigación avanzada, inteligencia de amenazas y equipo ofensivo (Seguridad Ofensiva y SOC).',
    departments: [
      'DFIR (Forense)', 
      'Malware Research Lab', 
      'Threat Intelligence', 
      'Red Team', 
      'SOC'
    ]
  },
  { 
    city: 'La Romana', 
    icon: '🏖️', 
    role: 'Consultoría & Implementación',
    desc: 'Diseño e implementación de proyectos e ingeniería de infraestructura a gran escala.',
    departments: [
      'Dirección Regional', 
      'Consultoría TI', 
      'Ingeniería de Infraestructura'
    ]
  }
];

const Locations = () => {
  return (
    <div style={{ paddingTop: '80px', minHeight: '80vh' }}>
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <h1 className="text-gradient" style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>Nuestras Sedes</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto' }}>
              Estamos estratégicamente ubicados en puntos clave del país para garantizar cobertura total, alta disponibilidad de nuestros servicios y respuesta inmediata ante cualquier incidente.
            </p>
          </div>
          
          <div className="grid grid-cols-2" style={{ gap: '3rem', maxWidth: '1100px', margin: '0 auto' }}>
            {locations.map((loc, idx) => (
              <div key={idx} className="glass-card" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1.5rem' }}>
                  <div style={{ fontSize: '3.5rem', filter: 'drop-shadow(0 0 10px rgba(212, 175, 55, 0.3))' }}>{loc.icon}</div>
                  <div>
                    <h3 style={{ fontSize: '2rem', color: 'var(--text-main)', marginBottom: '0.2rem', fontFamily: 'Space Grotesk' }}>{loc.city}</h3>
                    <p style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '1.1rem', letterSpacing: '0.5px' }}>{loc.role}</p>
                  </div>
                </div>
                
                <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '2rem', flexGrow: 1 }}>
                  {loc.desc}
                </p>
                
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem' }}>
                  <h4 style={{ color: 'white', marginBottom: '1rem', fontSize: '1.1rem' }}>Departamentos asignados:</h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                    {loc.departments.map((dept, i) => (
                      <span key={i} style={{ 
                        background: 'rgba(32, 83, 117, 0.3)', 
                        border: '1px solid var(--secondary)', 
                        padding: '0.4rem 0.8rem', 
                        borderRadius: '4px', 
                        fontSize: '0.9rem',
                        color: 'var(--text-muted)'
                      }}>
                        {dept}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Locations;
