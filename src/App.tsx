import React, { useEffect, useCallback } from 'react';
import { Bird } from './components/Bird';
import { Pipe } from './components/Pipe';
import { Cloud } from './components/Cloud';
import { Particle } from './components/Particle';
import { PowerUp } from './components/PowerUp';
import { GameStats } from './components/GameStats';
import { GameMenu } from './components/GameMenu';
import { useGameLoop } from './hooks/useGameLoop';
import { useGameState } from './hooks/useGameState';
import { GAME_CONFIG } from './constants/gameConfig';

const App: React.FC = () => {
  const {
    gameState,
    score,
    highScore,
    bird,
    pipes,
    clouds,
    particles,
    powerUps,
    gameSpeed,
    isInvincible,
    startGame,
    endGame,
    updateScore,
    updateBird,
    updatePipes,
    updateClouds,
    updateParticles,
    updatePowerUps,
    addParticle,
    resetGame,
    setBirdPosition,
    setGameSpeed,
    setInvincible,
    setPipes,
    setClouds,
    setPowerUps,
  } = useGameState();

  const handleJump = useCallback(() => {
    if (gameState === 'playing') {
      setBirdPosition(prev => ({
        ...prev,
        velocityY: GAME_CONFIG.BIRD_JUMP_FORCE
      }));
      
      // ジャンプ時にパーティクルを追加
      addParticle({
        x: bird.x + 16,
        y: bird.y + 16,
        color: 'rgba(255, 215, 0, 0.8)',
        size: 4,
        velocityX: Math.random() * 4 - 2,
        velocityY: Math.random() * 4 - 2,
        life: 20,
      });
    }
  }, [gameState, bird.x, bird.y, setBirdPosition, addParticle]);

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (e.code === 'Space' || e.key === ' ') {
      e.preventDefault();
      if (gameState === 'menu') {
        startGame();
      } else if (gameState === 'playing') {
        handleJump();
      } else if (gameState === 'gameOver') {
        resetGame();
      }
    }
  }, [gameState, startGame, handleJump, resetGame]);

  const handleClick = useCallback(() => {
    if (gameState === 'menu') {
      startGame();
    } else if (gameState === 'playing') {
      handleJump();
    } else if (gameState === 'gameOver') {
      resetGame();
    }
  }, [gameState, startGame, handleJump, resetGame]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  // ゲームループ
  useGameLoop(
    gameState,
    {
      updateBird,
      updatePipes,
      updateClouds,
      updateParticles,
      updatePowerUps,
      updateScore,
      endGame,
      addParticle,
      setGameSpeed,
      setInvincible,
    },
    bird,
    pipes,
    powerUps,
    score,
    isInvincible,
    setPipes,
    setClouds,
    setPowerUps
  );

  return (
    <div className="game-container" onClick={handleClick}>
      {/* 背景の雲 */}
      {clouds.map((cloud, index) => (
        <Cloud key={index} {...cloud} />
      ))}

      {/* パイプ */}
      {pipes.map((pipe, index) => (
        <Pipe key={index} {...pipe} />
      ))}

      {/* パワーアップアイテム */}
      {powerUps.filter(p => !p.collected).map((powerUp, index) => (
        <PowerUp key={index} {...powerUp} />
      ))}

      {/* バード */}
      <Bird {...bird} isInvincible={isInvincible} />

      {/* パーティクル */}
      {particles.map((particle, index) => (
        <Particle key={index} {...particle} />
      ))}

      {/* ゲーム統計 */}
      <GameStats 
        score={score} 
        highScore={highScore} 
        gameSpeed={gameSpeed}
        isInvincible={isInvincible}
      />

      {/* ゲームメニュー */}
      <GameMenu 
        gameState={gameState} 
        score={score} 
        highScore={highScore} 
        onStart={startGame}
        onRestart={resetGame}
      />

      {/* スピードインジケーター */}
      <div className="absolute bottom-4 left-4 text-white text-sm opacity-75">
        スピード: {gameSpeed.toFixed(1)}x
      </div>
    </div>
  );
};

export default App;