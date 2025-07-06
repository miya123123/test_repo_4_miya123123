export interface Position {
  x: number;
  y: number;
}

export interface Bird extends Position {
  velocityY: number;
  rotation: number;
}

export interface Pipe extends Position {
  width: number;
  height: number;
  passed: boolean;
}

export interface Cloud extends Position {
  width: number;
  height: number;
  opacity: number;
  speed: number;
}

export interface Particle extends Position {
  velocityX: number;
  velocityY: number;
  color: string;
  size: number;
  life: number;
  maxLife: number;
}

export interface PowerUp extends Position {
  type: 'speed' | 'invincible' | 'score';
  collected: boolean;
  rotation: number;
}

export type GameState = 'menu' | 'playing' | 'paused' | 'gameOver';

export interface GameConfig {
  BIRD_JUMP_FORCE: number;
  GRAVITY: number;
  PIPE_WIDTH: number;
  PIPE_GAP: number;
  PIPE_SPEED: number;
  BIRD_SIZE: number;
  CANVAS_WIDTH: number;
  CANVAS_HEIGHT: number;
}