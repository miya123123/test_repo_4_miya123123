import React from 'react';
import { Pipe as PipeType } from '../types';

export const Pipe: React.FC<PipeType> = ({ x, y, width, height }) => {
  return (
    <div
      className="pipe"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        width: `${width}px`,
        height: `${height}px`,
        borderRadius: '8px',
      }}
    >
      {/* パイプの装飾 */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-300 to-green-500 rounded-lg">
        <div className="absolute inset-1 bg-gradient-to-r from-green-400 to-green-600 rounded-md">
          <div className="absolute top-2 left-2 w-2 h-2 bg-green-200 rounded-full opacity-50"></div>
          <div className="absolute top-4 right-2 w-1 h-1 bg-green-200 rounded-full opacity-50"></div>
          <div className="absolute bottom-3 left-3 w-1.5 h-1.5 bg-green-200 rounded-full opacity-50"></div>
        </div>
      </div>
    </div>
  );
};