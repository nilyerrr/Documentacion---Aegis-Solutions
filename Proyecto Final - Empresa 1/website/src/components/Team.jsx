import React from 'react';

const teamMembers = [
  {
    name: 'Ing. Reylin Santana',
    role: 'CEO & CISO',
    bio: 'Soy un líder estratega y especialista técnico enfocado en la protección de infraestructuras críticas y la mitigación de ciberamenazas. Mi visión se centra en cerrar la brecha entre la gestión empresarial de alto nivel y la ingeniería táctica de seguridad. Como fundador y director de AEGIS Solutions, mi misión es elevar los estándares de resiliencia digital en la región, construyendo arquitecturas de red impenetrables y equipos de respuesta a incidentes de clase mundial.',
    specialties: 'Respuesta a Incidentes (DFIR), Threat Hunting, Arquitectura de Redes Seguras y Auditoría de Sistemas.',
    certifications: [
      'GCIH (SANS) & eCIR (INE)',
      'CDSA (HTB) & BTF',
      'CompTIA Security+',
      'Auditor Líder ISO 27001'
    ],
    image: '/reylin.jpeg'
  }
];

const Team = () => {
  return (
    <section id="integrantes" className="section" style={{ background: 'var(--surface)', paddingBottom: '4rem' }}>
      <div className="container">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', maxWidth: '1000px', margin: '0 auto' }}>
          {teamMembers.map((member, index) => (
            <div key={index} className="glass-card" style={{ display: 'flex', gap: '3rem', alignItems: 'center', flexWrap: 'wrap', padding: '3rem' }}>
              <div style={{ width: '280px', height: '280px', borderRadius: '12px', overflow: 'hidden', flexShrink: 0, border: '2px solid var(--primary)' }}>
                <img 
                  src={member.image} 
                  alt={member.name} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                />
                <div style={{ display: 'none', width: '100%', height: '100%', background: 'var(--secondary)', alignItems: 'center', justifyContent: 'center', fontSize: '4rem' }}>
                  🛡️
                </div>
              </div>
              <div style={{ flex: 1, minWidth: '300px' }}>
                <h3 style={{ fontSize: '2.5rem', marginBottom: '0.2rem', fontFamily: 'Space Grotesk' }}>{member.name}</h3>
                <p style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '1.2rem', marginBottom: '1.5rem', letterSpacing: '1px' }}>{member.role}</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', marginBottom: '1.5rem', lineHeight: '1.7' }}>
                  {member.bio}
                </p>
                <div style={{ marginBottom: '2rem' }}>
                  <strong style={{ color: 'var(--text-main)', fontSize: '1.05rem' }}>Especialidades: </strong>
                  <span style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>{member.specialties}</span>
                </div>
                <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
                  {member.certifications.map((cert, i) => (
                    <span key={i} style={{ padding: '0.5rem 1rem', background: 'rgba(212, 175, 55, 0.05)', border: '1px solid var(--primary)', borderRadius: '6px', fontSize: '0.9rem', color: 'var(--primary)', fontWeight: 600 }}>
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
