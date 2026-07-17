import React from 'react';

export default function Logo({ size = 32, className = '' }) {
  return (
    <div 
      className={`inline-flex items-center justify-center cursor-pointer group ${className}`}
    >
      <img
        src="/rp.png"
        alt="RP Logo"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          filter: 'var(--logo-filter)',
        }}
        className="object-contain transition-all duration-[400ms] [transition-timing-function:cubic-bezier(0.175,0.885,0.32,1.275)] group-hover:scale-110 group-hover:rotate-[3deg] group-hover:drop-shadow-[0_0_10px_rgba(96,165,250,0.5)]"
      />
    </div>
  );
}
