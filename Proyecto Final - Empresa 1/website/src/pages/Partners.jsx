import React from 'react';

const partners = [
  { name: 'Cisco', desc: 'Networking & Security Hardware', icon: '🌐' },
  { name: 'Fortinet', desc: 'Next-Generation Firewalls', icon: '🛡️' },
  { name: 'Microsoft', desc: 'Azure Cloud Security', icon: '☁️' },
  { name: 'AWS', desc: 'Cloud Infrastructure', icon: '⚡' }
];

const Partners = () => {
  return (
    <div style={{ paddingTop: '80px', minHeight: '80vh' }}>
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h1 className="text-gradient" style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>Nuestros Socios</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>Alianzas estratégicas con líderes tecnológicos para brindar soluciones de clase mundial.</p>
          </div>
          <div className="grid grid-cols-2" style={{ maxWidth: '800px', margin: '0 auto' }}>
            {partners.map((partner, idx) => (
              <div key={idx} className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <div style={{ fontSize: '3rem' }}>{partner.icon}</div>
                <div>
                  <h3 style={{ fontSize: '1.5rem', color: 'var(--text-main)' }}>{partner.name}</h3>
                  <p style={{ color: 'var(--primary)' }}>{partner.desc}</p>
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
