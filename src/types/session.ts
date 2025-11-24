/**
 * Tipos para la gestión de sesión e historial
 */

export interface GameResult {
  id: string;
  timestamp: Date;
  pairCount: number;
  player1Name: string;
  player1Score: number;
  player2Name: string;
  player2Score: number;
  winner: 1 | 2 | 'tie';
  duration?: number; // Duración en segundos (opcional para futuras implementaciones)
}

export interface GameHistory {
  games: GameResult[];
}

export interface SessionWins {
  player1Wins: number;
  player2Wins: number;
  ties: number;
}

export interface GameSession {
  id: string;
  startedAt: Date;
  lastUpdated: Date;
  history: GameHistory;
  wins: SessionWins;
  player1Name: string;
  player2Name: string;
}
