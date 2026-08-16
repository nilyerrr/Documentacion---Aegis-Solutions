import React from 'react';

const partners = [
  { name: 'Cisco', image: '/cisco.png' },
  { name: 'Fortinet', image: '/fortinet.png' },
  { name: 'Palo Alto Networks', image: '/paloalto.png' },
  { name: 'Amazon Web Services', image: '/amazon.png' },
  { name: 'Google Cloud Platform', image: '/google.png' },
  { name: 'Microsoft Azure', image: '/azure.png' },
  { name: 'Juniper Networks', image: '/jupiter.png' },
  { name: 'CrowdStrike', image: '/crowstrike.png' },
  { name: 'Splunk', image: '/splunk.png' },
  { name: 'Hack The Box', image: '/hackthebox.png' }
];

const Partners = () => {
  return (
    <div style={{ paddingTop: '80px', minHeight: '80vh' }}>
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <img src="/logo.png" alt="Aegis Logo" style={{ height: '80px', margin: '0 auto 1.5rem auto', display: 'block' }} />
            <h1 className="text-gradient" style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>Nuestros Socios Estratégicos</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto' }}>
              Nos hemos aliado con los líderes globales de la industria tecnológica y de ciberseguridad para garantizar que nuestras soluciones cuenten con el respaldo de las herramientas más avanzadas del mercado.
            </p>
          </div>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', 
            gap: '4rem 3rem', 
            maxWidth: '1000px', 
            margin: '0 auto',
            alignItems: 'center',
            justifyItems: 'center'
          }}>
            {partners.map((partner, idx) => (
              <div 
                key={idx} 
                style={{ 
                  width: '100%',
                  maxWidth: '180px',
                  height: '80px',
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  filter: 'grayscale(20%) opacity(70%)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.filter = 'grayscale(0%) opacity(100%)';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.filter = 'grayscale(20%) opacity(70%)';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
                title={partner.name}
              >
                <img 
                  src={partner.image} 
                  alt={partner.name} 
                  style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} 
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Partners;
