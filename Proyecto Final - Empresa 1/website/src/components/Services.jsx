import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const servicesList = [
  { id: 's1', title: 'Operaciones SOC (Tier 1 y 2)', desc: 'Monitoreo 24/7 de alertas, revisión de logs y respuesta rápida ante incidentes.', price: 1500 },
  { id: 's2', title: 'Auditoría Ofensiva (Pentesting)', desc: 'Simulación de ataques, análisis de vulnerabilidades e ingeniería social.', price: 2500 },
  { id: 's3', title: 'Infraestructura & Redes (LAN/WAN)', desc: 'Diseño de topologías, segmentación, enrutamiento avanzado y alta disponibilidad.', price: 2000 },
  { id: 's4', title: 'Seguridad Cloud & Servidores', desc: 'Hardening de servidores, gestión de identidades y planes DRP.', price: 1800 },
  { id: 's5', title: 'Consultoría TI (Arquitectura)', desc: 'Levantamiento inicial, diseño de soluciones a medida y políticas de riesgo.', price: 1200 },
  { id: 's6', title: 'DFIR & Cumplimiento', desc: 'Respuesta avanzada a incidentes, investigación forense y cumplimiento normativo.', price: 3000 }
];

const Services = () => {
  const [selectedServices, setSelectedServices] = useState([]);
  const navigate = useNavigate();

  const toggleService = (id) => {
    if (selectedServices.includes(id)) {
      setSelectedServices(selectedServices.filter(s => s !== id));
    } else {
      setSelectedServices([...selectedServices, id]);
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
    <section id="servicios" className="section" style={{ background: 'var(--bg-color)', minHeight: '100vh' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 className="text-gradient" style={{ fontSize: '3rem', marginBottom: '1rem' }}>Cotizador Interactivo</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Selecciona los servicios que tu empresa necesita y obtén un estimado al instante.</p>
        </div>
        
        <div className="grid grid-cols-3" style={{ marginBottom: '3rem' }}>
          {servicesList.map((service) => {
            const isSelected = selectedServices.includes(service.id);
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
                  boxShadow: isSelected ? '0 10px 30px rgba(212, 175, 55, 0.15)' : 'none'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <h3 style={{ fontSize: '1.2rem', color: isSelected ? 'var(--primary)' : 'var(--text-main)', margin: 0 }}>{service.title}</h3>
                  <div style={{ 
                    width: '24px', height: '24px', 
                    borderRadius: '50%', 
                    border: '2px solid var(--primary)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: isSelected ? 'var(--primary)' : 'transparent'
                  }}>
                    {isSelected && <span style={{ color: '#000', fontSize: '0.8rem', fontWeight: 'bold' }}>✓</span>}
                  </div>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem', minHeight: '60px' }}>{service.desc}</p>
                <div style={{ fontWeight: 600, fontSize: '1.1rem', color: 'var(--text-main)' }}>
                  Desde ${service.price.toLocaleString()} USD/mes
                </div>
              </div>
            );
          })}
        </div>

        {/* Floating Quote Summary */}
        <div style={{ 
          position: 'sticky', 
          bottom: '2rem', 
          background: 'rgba(13, 17, 23, 0.95)', 
          backdropFilter: 'blur(10px)',
          border: '1px solid var(--primary)', 
          borderRadius: '12px', 
          padding: '2rem', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          boxShadow: '0 20px 40px rgba(0,0,0,0.5), 0 0 20px rgba(212, 175, 55, 0.2)',
          zIndex: 50
        }}>
          <div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--text-main)' }}>Inversión Estimada Mensual</h3>
            <p style={{ color: 'var(--text-muted)', margin: 0 }}>
              {selectedServices.length === 0 
                ? 'Selecciona al menos un servicio para ver el total.' 
                : `${selectedServices.length} servicio(s) seleccionado(s).`}
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--primary)', fontFamily: 'Space Grotesk' }}>
              ${totalCost.toLocaleString()} <span style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>USD</span>
            </div>
            <button 
              onClick={handleQuoteRequest}
              disabled={selectedServices.length === 0}
              className="btn btn-primary"
              style={{ 
                opacity: selectedServices.length === 0 ? 0.5 : 1, 
                cursor: selectedServices.length === 0 ? 'not-allowed' : 'pointer',
                padding: '1rem 2rem',
                fontSize: '1.1rem'
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
