import React from 'react';

interface GameStatsProps {
  score: number;
  highScore: number;
  gameSpeed: number;
  isInvincible: boolean;
}

export const GameStats: React.FC<GameStatsProps> = ({ 
  score, 
  highScore, 
  gameSpeed, 
  isInvincible 
}) => {
  return (
    <div className="absolute top-4 left-4 text-white z-10">
      <div className="bg-black bg-opacity-50 p-4 rounded-lg">
        <div className="text-2xl font-bold mb-2">スコア: {score}</div>
        <div className="text-sm opacity-75">最高スコア: {highScore}</div>
        <div className="text-sm opacity-75 mt-1">スピード: {gameSpeed.toFixed(1)}x</div>
        {isInvincible && (
          <div className="text-yellow-400 text-sm mt-1 animate-pulse">
            🛡️ 無敵状態
          </div>
        )}
      </div>
    </div>
  );
};