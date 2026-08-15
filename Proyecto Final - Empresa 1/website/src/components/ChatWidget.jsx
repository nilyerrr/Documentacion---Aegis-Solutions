import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleContact = () => {
    setIsOpen(false);
    navigate('/contacto');
    window.scrollTo(0, 0);
  };

  return (
    <>
      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '100px',
          right: '30px',
          width: '320px',
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '12px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
          zIndex: 9999,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          animation: 'fade-in 0.3s ease-out'
        }}>
          <div style={{ background: 'var(--secondary)', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '1.5rem' }}>🛡️</span>
              <strong style={{ color: 'white' }}>AEGIS SOC Support</strong>
            </div>
            <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '1.2rem' }}>
              ✕
            </button>
          </div>
          
          <div style={{ padding: '1.5rem', minHeight: '200px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ background: 'var(--surface-light)', padding: '1rem', borderRadius: '8px', color: 'var(--text-main)', fontSize: '0.95rem' }}>
              <p style={{ margin: 0 }}>¡Hola! Somos el equipo de respuesta a incidentes de AEGIS.</p>
            </div>
            <div style={{ background: 'var(--surface-light)', padding: '1rem', borderRadius: '8px', color: 'var(--text-main)', fontSize: '0.95rem' }}>
              <p style={{ margin: 0 }}>¿Detectaste alguna anomalía en tu red o necesitas una auditoría preventiva?</p>
            </div>
            <button className="btn btn-primary" style={{ textAlign: 'center', marginTop: 'auto', padding: '0.8rem', width: '100%' }} onClick={handleContact}>
              Solicitar Asistencia
            </button>
          </div>
        </div>
      )}

      <button 
        onClick={() => setIsOpen(!isOpen)}
        title="Chat de Soporte"
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'var(--primary)',
          color: 'var(--bg-color)',
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 4px 15px rgba(212, 175, 55, 0.4)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.8rem',
          transition: 'transform 0.2s ease',
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        {isOpen ? '✕' : '💬'}
      </button>
    </>
  );
};

export default ChatWidget;
