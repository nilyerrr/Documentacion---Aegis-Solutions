import React, { useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';

const NetworkBackground = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1 }}>
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { color: { value: 'transparent' } },
          fpsLimit: 60,
          interactivity: {
            detectsOn: 'window',
            events: {
              onHover: { enable: true, mode: 'grab' },
              resize: true,
            },
            modes: {
              grab: { distance: 200, links: { opacity: 0.5 } },
            },
          },
          particles: {
            color: { value: '#D4AF37' },
            links: {
              color: '#205375',
              distance: 150,
              enable: true,
              opacity: 0.3,
              width: 1.5,
            },
            move: {
              direction: 'none',
              enable: true,
              outModes: { default: 'bounce' },
              random: false,
              speed: 1,
              straight: false,
            },
            number: {
              density: { enable: true, area: 800 },
              value: 60,
            },
            opacity: { value: 0.3 },
            shape: { type: 'circle' },
            size: { value: { min: 1, max: 3 } },
          },
          detectRetina: true,
        }}
      />
    </div>
  );
};

export default NetworkBackground;
