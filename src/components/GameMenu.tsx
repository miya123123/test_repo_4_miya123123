import React from 'react';
import { GameState } from '../types';

interface GameMenuProps {
  gameState: GameState;
  score: number;
  highScore: number;
  onStart: () => void;
  onRestart: () => void;
}

export const GameMenu: React.FC<GameMenuProps> = ({ 
  gameState, 
  score, 
  highScore, 
  onStart, 
  onRestart 
}) => {
  if (gameState === 'playing') {
    return null;
  }

  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
      <div className="bg-white p-8 rounded-lg text-center max-w-md w-full mx-4">
        {gameState === 'menu' && (
          <>
            <h1 className="text-3xl font-bold mb-4 text-gray-800">
              🐦 Flappy Bird
            </h1>
            <p className="text-gray-600 mb-6">
              斬新なフラッピーバード風ゲーム
            </p>
            <div className="mb-6">
              <div className="text-sm text-gray-500 mb-2">最高スコア</div>
              <div className="text-2xl font-bold text-blue-600">{highScore}</div>
            </div>
            <button
              onClick={onStart}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              ゲーム開始
            </button>
            <p className="text-xs text-gray-400 mt-4">
              スペースキーまたはクリックでジャンプ
            </p>
          </>
        )}
        
        {gameState === 'gameOver' && (
          <>
            <h2 className="text-2xl font-bold mb-4 text-red-600">
              ゲームオーバー
            </h2>
            <div className="mb-6">
              <div className="text-sm text-gray-500 mb-1">スコア</div>
              <div className="text-3xl font-bold text-gray-800 mb-4">{score}</div>
              <div className="text-sm text-gray-500 mb-1">最高スコア</div>
              <div className="text-xl font-bold text-blue-600">{highScore}</div>
            </div>
            {score === highScore && score > 0 && (
              <div className="text-yellow-600 font-bold mb-4">
                🎉 新記録達成！
              </div>
            )}
            <button
              onClick={onRestart}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              もう一度プレイ
            </button>
          </>
        )}
      </div>
    </div>
  );
};