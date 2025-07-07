import { useState, useCallback } from 'react';
import { GameState, Bird, Pipe, Cloud, Particle, PowerUp } from '../types';
import { GAME_CONFIG } from '../constants/gameConfig';

const initialBird: Bird = {
  x: 100,
  y: 300,
  velocityY: 0,
  rotation: 0,
};

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>('menu');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem('flappyBirdHighScore');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [bird, setBird] = useState<Bird>(initialBird);
  const [pipes, setPipes] = useState<Pipe[]>([]);
  const [clouds, setClouds] = useState<Cloud[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [powerUps, setPowerUps] = useState<PowerUp[]>([]);
  const [gameSpeed, setGameSpeed] = useState(1);
  const [isInvincible, setIsInvincible] = useState(false);

  const startGame = useCallback(() => {
    setGameState('playing');
    setScore(0);
    setBird(initialBird);
    setPipes([]);
    setParticles([]);
    setPowerUps([]);
    setGameSpeed(1);
    setIsInvincible(false);
    
    // 初期雲を生成
    const initialClouds: Cloud[] = [];
    for (let i = 0; i < 5; i++) {
      initialClouds.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * 200 + 50,
        width: Math.random() * 80 + 40,
        height: Math.random() * 40 + 20,
        opacity: Math.random() * 0.3 + 0.2,
        speed: Math.random() * 0.5 + 0.2,
      });
    }
    setClouds(initialClouds);
  }, []);

  const endGame = useCallback(() => {
    setGameState('gameOver');
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('flappyBirdHighScore', score.toString());
    }
  }, [score, highScore]);

  const resetGame = useCallback(() => {
    setGameState('menu');
    setScore(0);
    setBird(initialBird);
    setPipes([]);
    setParticles([]);
    setPowerUps([]);
    setGameSpeed(1);
    setIsInvincible(false);
  }, []);

  const updateScore = useCallback((points: number = 1) => {
    setScore(prev => prev + points);
  }, []);

  const updateBird = useCallback(() => {
    setBird(prev => {
      const newVelocityY = prev.velocityY + GAME_CONFIG.GRAVITY;
      const newY = prev.y + newVelocityY;
      const newRotation = Math.max(-30, Math.min(30, newVelocityY * 3));
      
      return {
        ...prev,
        y: newY,
        velocityY: newVelocityY,
        rotation: newRotation,
      };
    });
  }, []);

  const updatePipes = useCallback(() => {
    setPipes(prev => {
      const newPipes = prev.map(pipe => ({
        ...pipe,
        x: pipe.x - GAME_CONFIG.PIPE_SPEED * gameSpeed,
      }));
      
      return newPipes.filter(pipe => pipe.x > -GAME_CONFIG.PIPE_WIDTH);
    });
  }, [gameSpeed]);

  const updateClouds = useCallback(() => {
    setClouds(prev => {
      return prev.map(cloud => ({
        ...cloud,
        x: cloud.x - cloud.speed * gameSpeed,
      })).filter(cloud => cloud.x > -cloud.width);
    });
  }, [gameSpeed]);

  const updateParticles = useCallback(() => {
    setParticles(prev => {
      return prev.map(particle => ({
        ...particle,
        x: particle.x + particle.velocityX,
        y: particle.y + particle.velocityY,
        life: particle.life - 1,
      })).filter(particle => particle.life > 0);
    });
  }, []);

  const updatePowerUps = useCallback(() => {
    setPowerUps(prev => {
      return prev.map(powerUp => ({
        ...powerUp,
        x: powerUp.x - GAME_CONFIG.PIPE_SPEED * gameSpeed,
        rotation: powerUp.rotation + 2,
      })).filter(powerUp => powerUp.x > -50);
    });
  }, [gameSpeed]);

  const addParticle = useCallback((particle: Omit<Particle, 'maxLife'>) => {
    setParticles(prev => [...prev, { ...particle, maxLife: particle.life }]);
  }, []);

  const setBirdPosition = useCallback((updater: (prev: Bird) => Bird) => {
    setBird(updater);
  }, []);

  const setInvincible = useCallback((invincible: boolean) => {
    setIsInvincible(invincible);
  }, []);

  return {
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
    resetGame,
    updateScore,
    updateBird,
    updatePipes,
    updateClouds,
    updateParticles,
    updatePowerUps,
    addParticle,
    setBirdPosition,
    setGameSpeed,
    setInvincible,
    setPipes,
    setClouds,
    setPowerUps,
  };
};