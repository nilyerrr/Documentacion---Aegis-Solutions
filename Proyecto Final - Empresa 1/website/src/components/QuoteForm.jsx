import React, { useState } from 'react';

const QuoteForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Plan AEGIS Core',
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
    <section id="contacto" className="section" style={{ background: 'var(--bg-color)' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Contacto</h2>
          <p style={{ color: 'var(--text-muted)' }}>Déjenos sus datos y le prepararemos una propuesta a medida.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="glass-card">
          <div className="grid grid-cols-2" style={{ marginBottom: '1.5rem', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)', fontWeight: 500 }}>Nombre Completo</label>
              <input type="text" name="name" required value={formData.name} onChange={handleChange} style={{ width: '100%', padding: '0.8rem', borderRadius: '4px', border: '1px solid var(--border)', background: 'var(--surface-light)', color: 'white', fontFamily: 'Inter' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)', fontWeight: 500 }}>Correo Empresarial</label>
              <input type="email" name="email" required value={formData.email} onChange={handleChange} style={{ width: '100%', padding: '0.8rem', borderRadius: '4px', border: '1px solid var(--border)', background: 'var(--surface-light)', color: 'white', fontFamily: 'Inter' }} />
            </div>
          </div>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)', fontWeight: 500 }}>Servicio Requerido</label>
            <select name="service" value={formData.service} onChange={handleChange} style={{ width: '100%', padding: '0.8rem', borderRadius: '4px', border: '1px solid var(--border)', background: 'var(--surface-light)', color: 'white', fontFamily: 'Inter' }}>
              <option>Plan AEGIS Core</option>
              <option>Plan AEGIS Shield</option>
              <option>Plan AEGIS Fortress</option>
              <option>Pentesting y Red Team</option>
              <option>Consultoría Normativa</option>
              <option>Consultoría General (Otro)</option>
            </select>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)', fontWeight: 500 }}>Mensaje</label>
            <textarea name="message" rows="4" required value={formData.message} onChange={handleChange} style={{ width: '100%', padding: '0.8rem', borderRadius: '4px', border: '1px solid var(--border)', background: 'var(--surface-light)', color: 'white', resize: 'vertical', fontFamily: 'Inter' }} placeholder="Describa brevemente las necesidades de su empresa..."></textarea>
          </div>
          
          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }}>Solicitar Auditoría</button>
        </form>
      </div>
    </section>
  );
};

export default QuoteForm;
