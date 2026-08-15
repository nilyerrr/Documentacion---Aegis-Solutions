import React, { useState } from 'react';

const QuoteForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Arquitecturas de Seguridad & SOC',
    budget: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('¡Gracias por su interés! Nos comunicaremos pronto para enviarle su cotización.');
  };

  return (
    <section id="cotizar" className="section">
      <div className="container" style={{ maxWidth: '800px' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Cotice Nuestros Servicios</h2>
          <p style={{ color: 'var(--text-muted)' }}>Déjenos sus datos y le prepararemos una propuesta a medida.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="glass-card">
          <div className="grid grid-cols-2" style={{ marginBottom: '1.5rem', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Nombre Completo</label>
              <input type="text" name="name" required value={formData.name} onChange={handleChange} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--surface-light)', color: 'white' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Correo Electrónico</label>
              <input type="email" name="email" required value={formData.email} onChange={handleChange} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--surface-light)', color: 'white' }} />
            </div>
          </div>
          
          <div className="grid grid-cols-2" style={{ marginBottom: '1.5rem', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Servicio de Interés</label>
              <select name="service" value={formData.service} onChange={handleChange} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--surface-light)', color: 'white' }}>
                <option>Arquitecturas de Seguridad & SOC</option>
                <option>Infraestructura de Red (LAN/WAN)</option>
                <option>Servidores Empresariales</option>
                <option>Gestión DevOps</option>
                <option>Planificación IP y Documentación</option>
                <option>Consultoría General</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Presupuesto Estimado</label>
              <input type="text" name="budget" placeholder="Ej. $1,000 - $5,000 USD" value={formData.budget} onChange={handleChange} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--surface-light)', color: 'white' }} />
            </div>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Detalles del Proyecto</label>
            <textarea name="message" rows="4" required value={formData.message} onChange={handleChange} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--surface-light)', color: 'white', resize: 'vertical' }} placeholder="Describa brevemente las necesidades de su empresa..."></textarea>
          </div>
          
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Enviar Solicitud</button>
        </form>
      </div>
    </section>
  );
};

export default QuoteForm;
