/**
 * Tipos para el estado del juego
 */

export type CardState = 'hidden' | 'revealed' | 'matched';

export interface Card {
  id: string;
  pokemonId: number;
  pokemonName: string;
  sprite: string;
  state: CardState;
}

export interface Player {
  id: 1 | 2;
  name: string;
  score: number;
  pairsFound: number;
  currentStreak: number;
  missedAttempts: number;
}

export interface GameConfig {
  pairCount: 6 | 8 | 10 | 12 | 14 | 16 | 18 | 20 | 22 | 24 | 26 | 28 | 30 | 32 | 34 | 36 | 38 | 40 | 42 | 44 | 46 | 48 | 50;
}

export type GameStatus = 'configuring' | 'loading' | 'playing' | 'finished';

export interface GameState {
  status: GameStatus;
  config: GameConfig;
  cards: Card[];
  currentPlayer: 1 | 2;
  player1: Player;
  player2: Player;
  selectedCards: string[]; // IDs de cartas seleccionadas (máximo 2)
  matchedPairs: number;
  isProcessing: boolean; // Para prevenir clicks durante animaciones
  startTime: number | null; // Timestamp de inicio del juego
  endTime: number | null; // Timestamp de finalización del juego
}
