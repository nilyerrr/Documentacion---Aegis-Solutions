import React from 'react';

const partners = [
  { name: 'Cisco', desc: 'Networking & Security Architecture', icon: '🌐' },
  { name: 'Fortinet', desc: 'Next-Generation Firewalls (NGFW)', icon: '🛡️' },
  { name: 'Palo Alto Networks', desc: 'Advanced Threat Prevention', icon: '🔒' },
  { name: 'Amazon Web Services', desc: 'Cloud Infrastructure & Security', icon: '☁️' },
  { name: 'Google Cloud Platform', desc: 'Cloud Native Defense & AI', icon: '⚡' },
  { name: 'Microsoft Azure', desc: 'Enterprise Cloud & Identity', icon: '☁️' },
  { name: 'Juniper Networks', desc: 'High-Performance Routing', icon: '📡' },
  { name: 'CrowdStrike', desc: 'Endpoint Detection & Response (EDR)', icon: '🦅' },
  { name: 'Splunk', desc: 'SIEM & Security Analytics', icon: '📊' },
  { name: 'Hack The Box', desc: 'Offensive Security & Red Team', icon: '🎯' }
];

const Partners = () => {
  return (
    <div style={{ paddingTop: '80px', minHeight: '80vh' }}>
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h1 className="text-gradient" style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>Nuestros Socios Estratégicos</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto' }}>
              Nos hemos aliado con los líderes globales de la industria tecnológica y de ciberseguridad para garantizar que nuestras soluciones cuenten con el respaldo de las herramientas más avanzadas del mercado.
            </p>
          </div>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
            gap: '2rem', 
            maxWidth: '1200px', 
            margin: '0 auto' 
          }}>
            {partners.map((partner, idx) => (
              <div key={idx} className="glass-card" style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '1.5rem',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                cursor: 'default'
              }}>
                <div style={{ fontSize: '3rem' }}>{partner.icon}</div>
                <div>
                  <h3 style={{ fontSize: '1.5rem', color: 'var(--text-main)', marginBottom: '0.3rem' }}>{partner.name}</h3>
                  <p style={{ color: 'var(--primary)', fontWeight: 500 }}>{partner.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Partners;
