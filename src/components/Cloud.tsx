import React from 'react';
import { Cloud as CloudType } from '../types';

export const Cloud: React.FC<CloudType> = ({ x, y, width, height, opacity }) => {
  return (
    <div
      className="cloud animate-float"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        width: `${width}px`,
        height: `${height}px`,
        opacity,
      }}
    >
      <div className="relative w-full h-full">
        {/* メインの雲 */}
        <div className="absolute inset-0 bg-white rounded-full"></div>
        {/* 雲の装飾 */}
        <div className="absolute -top-2 left-2 w-6 h-6 bg-white rounded-full"></div>
        <div className="absolute -top-1 right-3 w-4 h-4 bg-white rounded-full"></div>
        <div className="absolute -bottom-1 left-4 w-5 h-5 bg-white rounded-full"></div>
        <div className="absolute -bottom-2 right-2 w-3 h-3 bg-white rounded-full"></div>
      </div>
    </div>
  );
};