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
      'Auditor Líder ISO 27001',
      'Threat Hunting & DFIR (CCDL2)'
    ],
    image: '/reylin.jpeg'
  },
  {
    name: 'Ing. Neury',
    role: 'VP Engineer, CTO & Arquitecto de Red',
    bio: 'Ingeniero en Ciberseguridad egresado del Instituto Tecnológico de Santo Domingo (INTEC), con un Máster en Arquitectura de Redes y Telecomunicaciones por la Universidad de Stanford, y un Doctorado (PhD) en Arquitectura de Redes de Próxima Generación por el Instituto Tecnológico de Massachusetts (MIT). Con más de una década de experiencia al más alto nivel en la elaboración y diseño de arquitecturas de redes corporativas a gran escala. Soy un experto indiscutible en el área tecnológica, cuya trayectoria se ha forjado liderando la innovación, garantizando la máxima resiliencia en infraestructuras críticas y definiendo la visión estratégica para el despliegue de soluciones de clase mundial.',
    specialties: 'Elaboración y diseño de arquitecturas de redes corporativas a gran escala, innovación y resiliencia.',
    certifications: [
      'Cisco CCAr',
      'Fortinet FCX / NSE 8',
      'CCIE Enterprise',
      'JNCIE-ENT',
      'AWS Advanced Networking',
      'Fortinet NSE 5, 6 & 7',
      'Cisco CCNP'
    ],
    image: '/neury.jpeg'
  },
  {
    name: 'Starlin De La Cruz Alonzo',
    role: 'Especialista en Servidores & Cloud Computing',
    bio: 'Profesional en tecnologías de la información y ciberseguridad con sólida trayectoria en el diseño, despliegue, administración y blindaje de infraestructuras de servidores y entornos en la nube. Especializado en la implementación de arquitecturas cloud escalables, alta disponibilidad y modelos de seguridad avanzada para mitigar riesgos e incidentes en entornos corporativos críticos.',
    specialties: 'Arquitecturas cloud escalables, alta disponibilidad y modelos de seguridad avanzada.',
    certifications: [
      'CCNA',
      'CompTIA Security+',
      'Cloud Security Specialist',
      'Admin. de Sistemas (Linux/Windows)'
    ],
    image: '/starlin.jpeg'
  },
  {
    name: 'Franchesca Soto Abreu',
    role: 'Redactor Técnico & Controlador Documental',
    bio: 'Estudiante de Tecnología/Informática enfocada en redes, infraestructura y control documental técnico. Destaca por su organización, precisión y capacidad para estructurar información técnica compleja de forma clara y accesible. Diseña manuales de servicio, procedimientos de entrega y bitácoras operativas.',
    specialties: 'Redes de computadoras, administración de sistemas, gestión de proyectos y diagramación lógica/física.',
    certifications: [
      'GCFA (SANS Institute)',
      'GNFA (SANS Institute)',
      'CHFI (EC-Council)',
      'CCME (Cellebrite)'
    ],
    image: '/franchesca.jpeg',
    imagePosition: 'center top'
  },
  {
    name: 'Randy Gabriel Troncoso Tejeda',
    role: 'Administrador de Repositorios & Gestión Digital',
    bio: 'Estudiante de Tecnología/Informática enfocado en la administración de redes para PyMEs y la gestión estratégica de documentación técnica e información crítica. Estandariza la información corporativa para garantizar consultas rápidas y soporte técnico eficiente, manteniendo el control de versiones y la actualización de manuales.',
    specialties: 'Redes de computadoras, diagramación de infraestructura, organización documental y repositorios centralizados.',
    certifications: [
      'CCNA 2',
      'Fundamentos y Admin. de Redes',
      'Documentación Técnica'
    ],
    image: '/randy.jpeg'
  },
  {
    name: 'Darling',
    role: 'Redactor Técnico y Controlador de Documentos',
    bio: 'Profesional en el área de Tecnología e Informática, con formación en redes de computadoras, administración de sistemas y documentación técnica. Me desempeño como Redactor Técnico y Controlador de Documentos, participando en la elaboración, organización y control de la documentación técnica del proyecto. Cuento con conocimientos en diagramas de infraestructura, registros de configuración, bitácoras de red y elaboración de manuales técnicos, contribuyendo a mantener una documentación clara, organizada y profesional.',
    specialties: 'Diagramas de infraestructura, registros de configuración, bitácoras de red y manuales técnicos.',
    certifications: [
      'Cisco CCNA',
      'CompTIA Network+',
      'Fortinet FCF',
      'Azure AZ-900'
    ],
    image: '/darling.jpeg'
  }
];

const Team = () => {
  return (
    <section id="integrantes" className="section" style={{ background: 'var(--surface)', paddingBottom: '4rem' }}>
      <div className="container">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem', maxWidth: '1000px', margin: '0 auto' }}>
          {teamMembers.map((member, index) => (
            <div key={index} className="glass-card team-card">
              <div className="team-image" style={{ borderRadius: '12px', overflow: 'hidden', border: '2px solid var(--primary)' }}>
                <img 
                  src={member.image} 
                  alt={member.name} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: member.imagePosition || 'center' }}
                  onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                />
                <div style={{ display: 'none', width: '100%', height: '100%', background: 'var(--secondary)', alignItems: 'center', justifyContent: 'center', fontSize: '4rem' }}>
                  🛡️
                </div>
              </div>
              <div className="team-text">
                <h3 style={{ fontSize: '2.5rem', marginBottom: '0.2rem', fontFamily: 'Space Grotesk' }}>{member.name}</h3>
                <p style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '1.2rem', marginBottom: '1.5rem', letterSpacing: '1px' }}>{member.role}</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', marginBottom: '1.5rem', lineHeight: '1.7' }}>
                  {member.bio}
                </p>
                <div style={{ marginBottom: '2rem' }}>
                  <strong style={{ color: 'var(--text-main)', fontSize: '1.05rem' }}>Especialidades: </strong>
                  <span style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>{member.specialties}</span>
                </div>
                <div className="team-certs" style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
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
