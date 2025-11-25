/**
 * Tipos para la gestión de sesión e historial
 */

import type { Pokemon } from './pokemon';

export interface GameResult {
  id: string;
  timestamp: Date;
  pairCount: number;
  player1Name: string;
  player1Score: number;
  player2Name: string;
  player2Score: number;
  winner: 1 | 2 | 'tie';
  duration?: number; // Duración en segundos
  pokemons?: Pokemon[]; // Pokémon únicos usados en la partida (opcional para backward compatibility)
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
