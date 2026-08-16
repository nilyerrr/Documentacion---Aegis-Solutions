import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const servicesList = [
  { 
    id: 'core', 
    title: 'AEGIS Core', 
    features: [
      'Ingeniería de Infraestructura (VLANs, VPNs, OSPF)',
      'Mesa de Ayuda (Soporte Técnico Tier 1/2)',
      'Administración de Switches, Routers y Firewalls',
      'Inventario de activos y reportes mensuales'
    ],
    details: {
      positioning: 'Infraestructura de red confiable sin monitoreo de seguridad 24/7. Para empresas que necesitan estabilidad operativa pero no manejan datos altamente regulados.',
      idealClient: 'Retail, manufactura, logística',
      employees: '50–200 empleados',
      notIncluded: ['Monitoreo de seguridad 24/7', 'Análisis de malware', 'Gestión de endpoints (EDR)', 'Cumplimiento normativo']
    }
  },
  { 
    id: 'shield', 
    title: 'AEGIS Shield', 
    features: [
      'Todo lo incluido en el Plan Core',
      'SOC 24/7 (Monitoreo, SIEM, triaje de alertas)',
      'Gestión de Endpoints (EDR)',
      'Cumplimiento y Respuesta a Incidentes (DFIR)'
    ],
    details: {
      positioning: 'El estándar de la industria. SOC 24/7 + infraestructura completa. Para empresas reguladas (HIPAA, ISO 27001, PCI-DSS) que necesitan monitoreo constante y respuesta a incidentes.',
      idealClient: 'Salud, finanzas, gobierno',
      employees: '100–500 empleados',
      notIncluded: ['Auditoría ofensiva / Red Team', 'Pentesting recurrente', 'Threat Hunting proactivo', 'vCISO dedicado']
    }
  },
  { 
    id: 'fortress', 
    title: 'AEGIS Fortress', 
    features: [
      'Todo lo incluido en el Plan Shield',
      'Auditoría Ofensiva Continua (Red Team)',
      'Threat Hunting y Pentesting recurrente',
      'vCISO Dedicado y SOC Tier 3 (Forense)'
    ],
    details: {
      positioning: 'Protección absoluta. Sustituye por completo a un departamento interno de ciberseguridad. Para organizaciones con alta exposición de riesgo y requisitos de cumplimiento estrictos.',
      idealClient: 'Bancos, multinacionales, data centers',
      employees: '300–1,000+ empleados',
      notIncluded: []
    }
  },
  { 
    id: 'od_pentest_redteam', 
    title: 'Pentesting y Red Team', 
    features: [
      'Evaluación de seguridad en red interna y web',
      'Simulación de ataque dirigido (APT)',
      'Prueba de movimiento lateral y exfiltración',
      'Reporte detallado con CVSS scoring'
    ],
    details: {
      positioning: 'Evaluación exhaustiva y simulación de adversarios reales. Evaluamos no solo la tecnología, sino las personas y los procesos defensivos.',
      idealClient: 'Empresas maduras que desean poner a prueba sus capacidades de detección o lanzar un nuevo producto',
      employees: 'Cualquier tamaño',
      notIncluded: []
    }
  },
  { 
    id: 'od3', 
    title: 'Consultoría Normativa', 
    features: [
      'Alineación a ISO 27001, HIPAA o PCI-DSS',
      'Evaluación de brechas (Gap Analysis)',
      'Diseño de políticas de seguridad',
      'Preparación integral para certificación'
    ],
    details: {
      positioning: 'Acompañamiento especializado para estructurar los procesos de la empresa y lograr certificaciones internacionales de seguridad.',
      idealClient: 'Instituciones financieras, salud, o empresas buscando expandirse a mercados internacionales',
      employees: 'Cualquier tamaño',
      notIncluded: ['Auditoría final de certificación (debe hacerla un tercero independiente)']
    }
  }
];

const Services = () => {
  const [expandedServices, setExpandedServices] = useState([]);
  const navigate = useNavigate();

  const toggleExpand = (e, id) => {
    e.stopPropagation();
    if (expandedServices.includes(id)) {
      setExpandedServices(expandedServices.filter(s => s !== id));
    } else {
      setExpandedServices([...expandedServices, id]);
    }
  };

  const handleConsultRequest = () => {
    navigate('/contacto');
  };

  return (
    <section id="servicios" className="section" style={{ background: 'var(--bg-color)', minHeight: '100vh', paddingBottom: '4rem' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <img src="/logo.png" alt="Aegis Logo" style={{ height: '80px', margin: '0 auto 1.5rem auto', display: 'block' }} />
          <h2 className="text-gradient" style={{ fontSize: '3rem', marginBottom: '1rem' }}>Nuestros Servicios</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '800px', margin: '0 auto' }}>
            Explora nuestros planes de suscripción y auditorías bajo demanda diseñados para blindar tu infraestructura tecnológica.
          </p>
        </div>
        
        <div className="grid grid-cols-3" style={{ marginBottom: '3rem', alignItems: 'stretch' }}>
          {servicesList.map((service) => {
            const isExpanded = expandedServices.includes(service.id);
            
            return (
              <div 
                key={service.id} 
                className="glass-card" 
                style={{ 
                  border: '1px solid var(--border)',
                  background: 'var(--surface)',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.4rem', color: 'var(--primary)', margin: 0, fontFamily: 'Space Grotesk' }}>{service.title}</h3>
                </div>
                
                <ul style={{ 
                  paddingLeft: '1.2rem', 
                  color: 'var(--text-muted)', 
                  fontSize: '0.95rem', 
                  marginBottom: '1rem', 
                  listStyleType: 'square'
                }}>
                  {service.features.map((feat, idx) => (
                    <li key={idx} style={{ marginBottom: '0.5rem', lineHeight: '1.4' }}>{feat}</li>
                  ))}
                </ul>

                <button 
                  onClick={(e) => toggleExpand(e, service.id)}
                  style={{ 
                    background: 'transparent', border: 'none', color: 'var(--primary)', 
                    cursor: 'pointer', textDecoration: 'underline', marginBottom: '1.5rem',
                    textAlign: 'left', padding: 0, fontSize: '0.9rem', fontWeight: 500
                  }}
                >
                  {isExpanded ? 'Ocultar detalles ▲' : 'Ver más detalles ▼'}
                </button>

                {isExpanded && (
                  <div style={{ 
                    background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px', 
                    marginBottom: '1.5rem', fontSize: '0.85rem', color: 'var(--text-muted)',
                    borderLeft: '3px solid var(--primary)'
                  }}>
                    <p style={{ marginBottom: '0.8rem' }}><strong style={{ color: 'var(--text-main)' }}>Enfoque:</strong> {service.details.positioning}</p>
                    <p style={{ marginBottom: '0.8rem' }}><strong style={{ color: 'var(--text-main)' }}>Cliente Ideal:</strong> {service.details.idealClient} ({service.details.employees})</p>
                    {service.details.notIncluded.length > 0 && (
                      <>
                        <strong style={{ color: '#ff6b6b' }}>Lo que NO incluye:</strong>
                        <ul style={{ paddingLeft: '1.2rem', marginTop: '0.3rem', marginBottom: 0 }}>
                          {service.details.notIncluded.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                )}

                <button 
                  onClick={handleConsultRequest}
                  className="btn btn-outline"
                  style={{ 
                    marginTop: 'auto', 
                    width: '100%', 
                    padding: '0.8rem',
                    textAlign: 'center',
                    justifyContent: 'center'
                  }}
                >
                  Consultar con un asesor
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
