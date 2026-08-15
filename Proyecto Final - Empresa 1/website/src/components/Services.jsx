import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const servicesList = [
  { 
    id: 'core', 
    title: 'AEGIS Core', 
    price: 4000, 
    isMonthly: true,
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
    price: 9000, 
    isMonthly: true,
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
    price: 22000, 
    isMonthly: true,
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
    id: 'od1', 
    title: 'Pentesting Completo', 
    price: 8000, 
    isMonthly: false,
    features: [
      'Evaluación de seguridad en red interna',
      'Pruebas de aplicaciones web',
      'Reporte detallado con CVSS scoring',
      'Proyecto bajo demanda (2-4 semanas)'
    ],
    details: {
      positioning: 'Evaluación exhaustiva para descubrir vulnerabilidades en tu entorno actual antes de que sean explotadas.',
      idealClient: 'Empresas que van a lanzar un nuevo producto o requieren cumplir con normativas anuales',
      employees: 'Cualquier tamaño',
      notIncluded: []
    }
  },
  { 
    id: 'od2', 
    title: 'Auditoría Red Team', 
    price: 15000, 
    isMonthly: false,
    features: [
      'Simulación de ataque dirigido',
      'Evaluación de vector de entrada',
      'Prueba de movimiento lateral y exfiltración',
      'Proyecto bajo demanda (3-6 semanas)'
    ],
    details: {
      positioning: 'Simulación de adversarios reales (APT). Evaluamos no solo la tecnología, sino las personas y los procesos defensivos (SOC).',
      idealClient: 'Empresas maduras con un SOC establecido que desean poner a prueba sus capacidades de detección',
      employees: 'Cualquier tamaño',
      notIncluded: []
    }
  },
  { 
    id: 'od3', 
    title: 'Consultoría Normativa', 
    price: 12000, 
    isMonthly: false,
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
  const [selectedServices, setSelectedServices] = useState([]);
  const [expandedServices, setExpandedServices] = useState([]);
  const navigate = useNavigate();

  const toggleService = (id) => {
    if (selectedServices.includes(id)) {
      setSelectedServices(selectedServices.filter(s => s !== id));
    } else {
      setSelectedServices([...selectedServices, id]);
    }
  };

  const toggleExpand = (e, id) => {
    e.stopPropagation();
    if (expandedServices.includes(id)) {
      setExpandedServices(expandedServices.filter(s => s !== id));
    } else {
      setExpandedServices([...expandedServices, id]);
    }
  };

  const totalCost = selectedServices.reduce((sum, id) => {
    const service = servicesList.find(s => s.id === id);
    return sum + (service ? service.price : 0);
  }, 0);

  const handleQuoteRequest = () => {
    navigate('/contacto');
  };

  return (
    <section id="servicios" className="section" style={{ background: 'var(--bg-color)', minHeight: '100vh', paddingBottom: '8rem' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 className="text-gradient" style={{ fontSize: '3rem', marginBottom: '1rem' }}>Cotizador Interactivo</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '800px', margin: '0 auto' }}>
            Selecciona los planes de suscripción o servicios bajo demanda que tu empresa necesita y obtén un estimado al instante.
          </p>
        </div>
        
        <div className="grid grid-cols-3" style={{ marginBottom: '3rem', alignItems: 'stretch' }}>
          {servicesList.map((service) => {
            const isSelected = selectedServices.includes(service.id);
            const isExpanded = expandedServices.includes(service.id);
            
            return (
              <div 
                key={service.id} 
                className="glass-card" 
                onClick={() => toggleService(service.id)}
                style={{ 
                  cursor: 'pointer', 
                  border: isSelected ? '2px solid var(--primary)' : '1px solid var(--border)',
                  background: isSelected ? 'rgba(212, 175, 55, 0.05)' : 'var(--surface)',
                  transform: isSelected ? 'translateY(-5px)' : 'none',
                  boxShadow: isSelected ? '0 10px 30px rgba(212, 175, 55, 0.15)' : 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.4rem', color: isSelected ? 'var(--primary)' : 'var(--text-main)', margin: 0, fontFamily: 'Space Grotesk' }}>{service.title}</h3>
                  <div style={{ 
                    width: '24px', height: '24px', 
                    borderRadius: '50%', 
                    border: '2px solid var(--primary)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: isSelected ? 'var(--primary)' : 'transparent',
                    flexShrink: 0
                  }}>
                    {isSelected && <span style={{ color: '#000', fontSize: '0.8rem', fontWeight: 'bold' }}>✓</span>}
                  </div>
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

                <div style={{ 
                  fontWeight: 600, 
                  fontSize: '1.2rem', 
                  color: 'var(--text-main)', 
                  borderTop: '1px solid var(--border)', 
                  paddingTop: '1rem',
                  marginTop: 'auto' 
                }}>
                  Desde ${service.price.toLocaleString()} USD {service.isMonthly ? '/mes' : '(Pago único)'}
                </div>
              </div>
            );
          })}
        </div>

        {/* Floating Quote Summary */}
        <div style={{ 
          position: 'fixed', 
          bottom: '2rem', 
          left: '50%',
          transform: 'translateX(-50%)',
          width: '90%',
          maxWidth: '1000px',
          background: 'rgba(13, 17, 23, 0.95)', 
          backdropFilter: 'blur(10px)',
          border: '1px solid var(--primary)', 
          borderRadius: '12px', 
          padding: '1.5rem 2rem', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          boxShadow: '0 20px 40px rgba(0,0,0,0.5), 0 0 20px rgba(212, 175, 55, 0.2)',
          zIndex: 50
        }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.2rem', color: 'var(--text-main)' }}>Inversión Estimada</h3>
            <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.9rem' }}>
              {selectedServices.length === 0 
                ? 'Selecciona planes o auditorías para ver el total.' 
                : `${selectedServices.length} elemento(s) seleccionado(s).`}
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--primary)', fontFamily: 'Space Grotesk' }}>
              ${totalCost.toLocaleString()} <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>USD</span>
            </div>
            <button 
              onClick={handleQuoteRequest}
              disabled={selectedServices.length === 0}
              className="btn btn-primary"
              style={{ 
                opacity: selectedServices.length === 0 ? 0.5 : 1, 
                cursor: selectedServices.length === 0 ? 'not-allowed' : 'pointer',
                padding: '0.8rem 1.5rem',
                fontSize: '1rem'
              }}
            >
              Contactar a un Asesor
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Services;
