import React from 'react';
import { Particle as ParticleType } from '../types';

export const Particle: React.FC<ParticleType> = ({ x, y, color, size, life, maxLife }) => {
  const opacity = life / maxLife;
  
  return (
    <div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: color,
        opacity,
        transform: `scale(${opacity})`,
      }}
    />
  );
};