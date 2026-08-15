import React from 'react';

const servicesList = [
  { title: 'Arquitecturas de Seguridad & SOC', desc: 'Diseño defensivo, monitoreo continuo y respuesta a incidentes.' },
  { title: 'Infraestructura de Red (LAN/WAN)', desc: 'Topologías robustas, enrutamiento avanzado y conectividad DMVPN inter-sucursales.' },
  { title: 'Servidores Empresariales', desc: 'Despliegue seguro de servicios corporativos (Web, Correo, FTP, RADIUS).' },
  { title: 'Gestión DevOps', desc: 'Automatización, control de versiones y release engineering.' },
  { title: 'Planificación IP y Documentación', desc: 'Diseño VLSM, bitácoras de red y manuales de entregables.' },
  { title: 'Compliance & Adquisiciones', desc: 'Cumplimiento normativo y gestión de costes de infraestructura.' }
];

const Services = () => {
  return (
    <section id="servicios" className="section" style={{ background: 'var(--surface)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Nuestros Servicios</h2>
          <p style={{ color: 'var(--text-muted)' }}>Soluciones integrales de ciberseguridad e infraestructura TI.</p>
        </div>
        <div className="grid grid-cols-3">
          {servicesList.map((service, idx) => (
            <div key={idx} className="glass-card">
              <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'rgba(0, 240, 255, 0.1)', border: '1px solid var(--primary)', margin: '0 0 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', fontSize: '1.5rem' }}>
                ✦
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>{service.title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
