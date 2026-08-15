import React from 'react';

const Locations = () => {
  return (
    <div style={{ paddingTop: '80px', minHeight: '80vh' }}>
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h1 className="text-gradient" style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>Nuestras Sedes</h1>
          </div>
          
          <div className="glass-card" style={{ padding: '4rem', maxWidth: '1000px', margin: '0 auto', color: 'var(--text-muted)', fontSize: '1.15rem', lineHeight: '1.8' }}>
            <p style={{ marginBottom: '3rem', fontSize: '1.25rem', color: 'var(--text-main)', textAlign: 'center' }}>
              En <strong>AEGIS Solutions</strong> operamos a través de una red de sucursales estratégicamente distribuidas. Esto nos permite garantizar cobertura total y respuesta inmediata ante incidentes. Cada sede cumple un rol altamente especializado dentro de nuestro ecosistema.
            </p>

            <div style={{ marginBottom: '2.5rem' }}>
              <h3 style={{ color: 'var(--primary)', fontSize: '1.6rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <span>🏙️</span> Santo Domingo — Sede Central
              </h3>
              <p style={{ paddingLeft: '2.6rem' }}>
                Funciona como nuestro núcleo de operaciones, administración y gobernanza. Desde la capital gestionamos la dirección corporativa, finanzas, cumplimiento de normativas, ventas y el soporte a nivel ejecutivo.
              </p>
            </div>

            <div style={{ marginBottom: '2.5rem' }}>
              <h3 style={{ color: 'var(--primary)', fontSize: '1.6rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <span>🚢</span> Puerto Plata — Laboratorio de Ciberseguridad
              </h3>
              <p style={{ paddingLeft: '2.6rem' }}>
                Es el corazón táctico de la empresa. Aquí concentra todas las operaciones del SOC (Centro de Operaciones de Seguridad), la división de ataque (Red Team), inteligencia de amenazas y análisis forense digital (DFIR).
              </p>
            </div>

            <div style={{ marginBottom: '2.5rem' }}>
              <h3 style={{ color: 'var(--primary)', fontSize: '1.6rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <span>🌄</span> Santiago — Centro de Datos Corporativo
              </h3>
              <p style={{ paddingLeft: '2.6rem' }}>
                Alberga nuestra infraestructura principal. Esta sucursal es responsable de la administración de la granja de servidores, servicios en la nube y de asegurar la continuidad ininterrumpida de nuestras plataformas y las de nuestros clientes.
              </p>
            </div>

            <div>
              <h3 style={{ color: 'var(--primary)', fontSize: '1.6rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <span>🏖️</span> La Romana — Ingeniería y Consultoría TI
              </h3>
              <p style={{ paddingLeft: '2.6rem' }}>
                Nuestra base para la planificación arquitectónica. Desde aquí, los ingenieros y arquitectos de redes diseñan, configuran e implementan infraestructuras físicas de alto rendimiento y conectividad segmentada para nuestros proyectos.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Locations;
