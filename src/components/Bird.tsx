import React from 'react';
import { Bird as BirdType } from '../types';

interface BirdProps extends BirdType {
  isInvincible: boolean;
}

export const Bird: React.FC<BirdProps> = ({ x, y, rotation, isInvincible }) => {
  return (
    <div
      className={`bird ${isInvincible ? 'animate-pulse' : ''}`}
      style={{
        left: `${x}px`,
        top: `${y}px`,
        transform: `rotate(${rotation}deg)`,
        filter: isInvincible ? 'drop-shadow(0 0 10px #FFD700)' : 'none',
      }}
    >
      <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full border-2 border-white shadow-lg relative">
        {/* 目 */}
        <div className="absolute top-1 left-1 w-2 h-2 bg-white rounded-full">
          <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-black rounded-full"></div>
        </div>
        {/* くちばし */}
        <div className="absolute top-3 -right-1 w-0 h-0 border-l-4 border-l-orange-600 border-t-2 border-t-transparent border-b-2 border-b-transparent"></div>
        {/* 羽 */}
        <div className="absolute -top-1 -left-1 w-4 h-4 bg-gradient-to-br from-red-400 to-pink-500 rounded-full opacity-80"></div>
      </div>
    </div>
  );
};