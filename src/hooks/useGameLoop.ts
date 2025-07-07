import { useEffect, useRef, useCallback } from 'react';
import { GameState, Bird, Pipe, Cloud, Particle, PowerUp } from '../types';
import { GAME_CONFIG } from '../constants/gameConfig';

interface GameLoopCallbacks {
  updateBird: () => void;
  updatePipes: () => void;
  updateClouds: () => void;
  updateParticles: () => void;
  updatePowerUps: () => void;
  updateScore: (points?: number) => void;
  endGame: () => void;
  addParticle: (particle: Omit<Particle, 'maxLife'>) => void;
  setGameSpeed: (speed: number) => void;
  setInvincible: (invincible: boolean) => void;
}

export const useGameLoop = (
  gameState: GameState,
  callbacks: GameLoopCallbacks,
  bird: Bird,
  pipes: Pipe[],
  powerUps: PowerUp[],
  score: number,
  isInvincible: boolean,
  setPipes: (pipes: Pipe[] | ((prev: Pipe[]) => Pipe[])) => void,
  setClouds: (clouds: Cloud[] | ((prev: Cloud[]) => Cloud[])) => void,
  setPowerUps: (powerUps: PowerUp[] | ((prev: PowerUp[]) => PowerUp[])) => void
) => {
  const gameLoopRef = useRef<number>();
  const lastTimeRef = useRef<number>();
  const pipeSpawnTimerRef = useRef<number>(0);
  const cloudSpawnTimerRef = useRef<number>(0);
  const powerUpSpawnTimerRef = useRef<number>(0);
  const invincibleTimerRef = useRef<number>(0);

  // 衝突判定
  const checkCollision = useCallback((bird: Bird, pipes: Pipe[]) => {
    if (isInvincible) return false;
    
    // 画面外チェック
    if (bird.y < 0 || bird.y > window.innerHeight - 50) {
      return true;
    }

    // パイプとの衝突チェック
    for (const pipe of pipes) {
      if (
        bird.x < pipe.x + pipe.width &&
        bird.x + 32 > pipe.x &&
        bird.y < pipe.y + pipe.height &&
        bird.y + 32 > pipe.y
      ) {
        return true;
      }
    }

    return false;
  }, [isInvincible]);

  // パイプ生成
  const spawnPipe = useCallback(() => {
    const gapHeight = GAME_CONFIG.PIPE_GAP;
    const pipeWidth = GAME_CONFIG.PIPE_WIDTH;
    const canvasHeight = window.innerHeight;
    const minPipeHeight = 50;
    const maxPipeHeight = canvasHeight - gapHeight - minPipeHeight;
    
    const topPipeHeight = Math.random() * (maxPipeHeight - minPipeHeight) + minPipeHeight;
    const bottomPipeHeight = canvasHeight - topPipeHeight - gapHeight;

    const newPipes: Pipe[] = [
      {
        x: window.innerWidth,
        y: 0,
        width: pipeWidth,
        height: topPipeHeight,
        passed: false,
      },
      {
        x: window.innerWidth,
        y: topPipeHeight + gapHeight,
        width: pipeWidth,
        height: bottomPipeHeight,
        passed: false,
      },
    ];

    setPipes((prev: Pipe[]) => [...prev, ...newPipes]);
  }, [setPipes]);

  // 雲生成
  const spawnCloud = useCallback(() => {
    const newCloud: Cloud = {
      x: window.innerWidth,
      y: Math.random() * 200 + 50,
      width: Math.random() * 80 + 40,
      height: Math.random() * 40 + 20,
      opacity: Math.random() * 0.3 + 0.2,
      speed: Math.random() * 0.5 + 0.2,
    };

    setClouds((prev: Cloud[]) => [...prev, newCloud]);
  }, [setClouds]);

  // パワーアップ生成
  const spawnPowerUp = useCallback(() => {
    const types: PowerUp['type'][] = ['speed', 'invincible', 'score'];
    const randomType = types[Math.floor(Math.random() * types.length)];
    
    const newPowerUp: PowerUp = {
      x: window.innerWidth,
      y: Math.random() * (window.innerHeight - 200) + 100,
      type: randomType,
      collected: false,
      rotation: 0,
    };

    setPowerUps((prev: PowerUp[]) => [...prev, newPowerUp]);
  }, [setPowerUps]);

  // パワーアップ収集チェック
  const checkPowerUpCollection = useCallback(() => {
    powerUps.forEach((powerUp, index) => {
      if (
        !powerUp.collected &&
        bird.x < powerUp.x + 40 &&
        bird.x + 32 > powerUp.x &&
        bird.y < powerUp.y + 40 &&
        bird.y + 32 > powerUp.y
      ) {
        // パワーアップを収集
        setPowerUps((prev: PowerUp[]) => 
          prev.map((p, i) => 
            i === index ? { ...p, collected: true } : p
          )
        );

        // パワーアップ効果を適用
        switch (powerUp.type) {
          case 'speed':
            callbacks.setGameSpeed(2);
            setTimeout(() => callbacks.setGameSpeed(1), 3000);
            break;
          case 'invincible':
            callbacks.setInvincible(true);
            invincibleTimerRef.current = 5000; // 5秒間無敵
            break;
          case 'score':
            callbacks.updateScore(5);
            break;
        }

        // パーティクル生成
        for (let i = 0; i < 10; i++) {
          callbacks.addParticle({
            x: powerUp.x + 20,
            y: powerUp.y + 20,
            color: powerUp.type === 'speed' ? 'rgba(255, 215, 0, 0.8)' : 
                   powerUp.type === 'invincible' ? 'rgba(59, 130, 246, 0.8)' : 
                   'rgba(236, 72, 153, 0.8)',
            size: 6,
            velocityX: Math.random() * 8 - 4,
            velocityY: Math.random() * 8 - 4,
            life: 30,
          });
        }
      }
    });
  }, [bird, powerUps, setPowerUps, callbacks]);

  // スコア更新チェック
  const checkScore = useCallback(() => {
    pipes.forEach((pipe, index) => {
      if (!pipe.passed && pipe.x + pipe.width < bird.x) {
        setPipes((prev: Pipe[]) => 
          prev.map((p, i) => 
            i === index ? { ...p, passed: true } : p
          )
        );
        
        // 上のパイプだけでスコアを加算（重複を避けるため）
        if (pipe.y === 0) {
          callbacks.updateScore(1);
          
          // スコアに応じてゲームスピードを調整
          const newSpeed = 1 + Math.floor(score / 10) * 0.1;
          callbacks.setGameSpeed(newSpeed);
        }
      }
    });
  }, [bird, pipes, score, setPipes, callbacks]);

  useEffect(() => {
    if (gameState === 'playing') {
      const gameLoop = (currentTime: number) => {
        if (lastTimeRef.current === undefined) {
          lastTimeRef.current = currentTime;
        }

        const deltaTime = currentTime - lastTimeRef.current;
        lastTimeRef.current = currentTime;

        // 60FPSで実行
        if (deltaTime >= 16.67) {
          callbacks.updateBird();
          callbacks.updatePipes();
          callbacks.updateClouds();
          callbacks.updateParticles();
          callbacks.updatePowerUps();

          // 衝突判定
          if (checkCollision(bird, pipes)) {
            // 爆発パーティクル
            for (let i = 0; i < 20; i++) {
              callbacks.addParticle({
                x: bird.x + 16,
                y: bird.y + 16,
                color: 'rgba(255, 69, 0, 0.8)',
                size: 8,
                velocityX: Math.random() * 12 - 6,
                velocityY: Math.random() * 12 - 6,
                life: 40,
              });
            }
            callbacks.endGame();
            return;
          }

          // パワーアップ収集チェック
          checkPowerUpCollection();

          // スコア更新チェック
          checkScore();

          // 無敵時間の管理
          if (invincibleTimerRef.current > 0) {
            invincibleTimerRef.current -= deltaTime;
            if (invincibleTimerRef.current <= 0) {
              callbacks.setInvincible(false);
            }
          }

          // パイプ生成
          pipeSpawnTimerRef.current += deltaTime;
          if (pipeSpawnTimerRef.current >= 2000) {
            spawnPipe();
            pipeSpawnTimerRef.current = 0;
          }

          // 雲生成
          cloudSpawnTimerRef.current += deltaTime;
          if (cloudSpawnTimerRef.current >= 5000) {
            spawnCloud();
            cloudSpawnTimerRef.current = 0;
          }

          // パワーアップ生成
          powerUpSpawnTimerRef.current += deltaTime;
          if (powerUpSpawnTimerRef.current >= 10000) {
            spawnPowerUp();
            powerUpSpawnTimerRef.current = 0;
          }
        }

        gameLoopRef.current = requestAnimationFrame(gameLoop);
      };

      gameLoopRef.current = requestAnimationFrame(gameLoop);
    }

    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [
    gameState,
    callbacks,
    bird,
    pipes,
    checkCollision,
    checkPowerUpCollection,
    checkScore,
    spawnPipe,
    spawnCloud,
    spawnPowerUp,
  ]);

  useEffect(() => {
    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, []);
};