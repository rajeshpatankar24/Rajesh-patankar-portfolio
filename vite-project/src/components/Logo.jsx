import React from 'react';

export default function Logo({ size = 32, className = '' }) {
  return (
    <div 
      className={`logo-container ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
      }}
    >
      <img
        src="/rp.png"
        alt="RP Logo"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          objectFit: 'contain',
          transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), filter 0.3s ease',
        }}
        className="logo-img"
      />

      <style>{`
        .logo-container:hover .logo-img {
          transform: scale(1.1) rotate(3deg);
          filter: drop-shadow(0 0 10px rgba(96, 165, 250, 0.5));
        }
      `}</style>
    </div>
  );
}

