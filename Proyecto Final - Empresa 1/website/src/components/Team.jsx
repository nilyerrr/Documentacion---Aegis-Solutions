import React from 'react';

const teamMembers = [
  { name: 'Reylin Santana', role: 'CEO & CISO', desc: 'Liderazgo en seguridad, arquitecturas defensivas y monitoreo SOC.' },
  { name: 'Neury', role: 'CTO & Arquitecto de Red', desc: 'Diseño de infraestructura LAN/WAN y conectividad.' },
  { name: 'Starlin', role: 'Lead Full-Stack Developer', desc: 'Despliegue y mantenimiento de servidores empresariales.' },
  { name: 'Randy', role: 'DevOps & Release Engineer', desc: 'Planificación IP y control de versiones.' },
  { name: 'Franchesca', role: 'Compliance & Procurement Manager', desc: 'Configuración L2 y normativas empresariales.' },
  { name: 'Darling', role: 'Technical Writer', desc: 'Documentación técnica y manuales operativos.' }
];

const Team = () => {
  return (
    <section id="nosotros" className="section">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Nuestro Equipo Directivo y Técnico</h2>
          <p style={{ color: 'var(--text-muted)' }}>Los expertos detrás de su seguridad y rendimiento.</p>
        </div>
        <div className="grid grid-cols-3">
          {teamMembers.map((member, idx) => (
            <div key={idx} className="glass-card" style={{ textAlign: 'center' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--gradient)', margin: '0 auto 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 'bold' }}>
                {member.name.charAt(0)}
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{member.name}</h3>
              <p style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.9rem', marginBottom: '1rem' }}>{member.role}</p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{member.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
