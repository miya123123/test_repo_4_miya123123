import React from 'react';
import { PowerUp as PowerUpType } from '../types';

export const PowerUp: React.FC<PowerUpType> = ({ x, y, type, rotation }) => {
  const getIcon = () => {
    switch (type) {
      case 'speed':
        return '⚡';
      case 'invincible':
        return '🛡️';
      case 'score':
        return '💎';
      default:
        return '⭐';
    }
  };

  const getColor = () => {
    switch (type) {
      case 'speed':
        return 'from-yellow-400 to-orange-500';
      case 'invincible':
        return 'from-blue-400 to-purple-500';
      case 'score':
        return 'from-pink-400 to-red-500';
      default:
        return 'from-green-400 to-blue-500';
    }
  };

  return (
    <div
      className="absolute w-10 h-10 animate-bounce"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        transform: `rotate(${rotation}deg)`,
      }}
    >
      <div className={`w-full h-full bg-gradient-to-br ${getColor()} rounded-full shadow-lg border-2 border-white flex items-center justify-center text-lg`}>
        {getIcon()}
      </div>
    </div>
  );
};