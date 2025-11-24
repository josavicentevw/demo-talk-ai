/**
 * Store de sesión usando Zustand
 * Gestiona el historial de partidas, contador de victorias y persistencia
 */

import { create } from 'zustand';
import type { GameSession, GameResult, SessionWins } from '../types/session';
import { DEFAULT_PLAYER1_NAME, DEFAULT_PLAYER2_NAME } from '../constants/game';

const createNewSession = (): GameSession => ({
  id: `session-${Date.now()}`,
  startedAt: new Date(),
  lastUpdated: new Date(),
  history: { games: [] },
  wins: {
    player1Wins: 0,
    player2Wins: 0,
    ties: 0,
  },
  player1Name: DEFAULT_PLAYER1_NAME,
  player2Name: DEFAULT_PLAYER2_NAME,
});

interface SessionStore {
  session: GameSession | null;

  // Acciones de sesión
  startSession: (player1Name?: string, player2Name?: string) => void;
  endSession: () => void;
  loadSession: (session: GameSession) => void;

  // Acciones de historial
  addGameToHistory: (gameResult: GameResult) => void;

  // Acciones de victorias
  incrementWins: (winner: 1 | 2 | 'tie') => void;

  // Acciones de nombres
  updatePlayerNames: (player1Name: string, player2Name: string) => void;

  // Utilidades
  getSessionData: () => GameSession | null;
}

export const useSessionStore = create<SessionStore>((set, get) => ({
  session: null,

  startSession: (player1Name, player2Name) =>
    set({
      session: {
        ...createNewSession(),
        player1Name: player1Name || DEFAULT_PLAYER1_NAME,
        player2Name: player2Name || DEFAULT_PLAYER2_NAME,
      },
    }),

  endSession: () => set({ session: null }),

  loadSession: (session) =>
    set({
      session: {
        ...session,
        // Asegurar que las fechas son objetos Date
        startedAt: new Date(session.startedAt),
        lastUpdated: new Date(session.lastUpdated),
        history: {
          games: session.history.games.map((game) => ({
            ...game,
            timestamp: new Date(game.timestamp),
          })),
        },
      },
    }),

  addGameToHistory: (gameResult) =>
    set((state) => {
      if (!state.session) return state;

      return {
        session: {
          ...state.session,
          lastUpdated: new Date(),
          history: {
            games: [...state.session.history.games, gameResult],
          },
        },
      };
    }),

  incrementWins: (winner) =>
    set((state) => {
      if (!state.session) return state;

      const wins: SessionWins = { ...state.session.wins };

      if (winner === 1) {
        wins.player1Wins += 1;
      } else if (winner === 2) {
        wins.player2Wins += 1;
      } else {
        wins.ties += 1;
      }

      return {
        session: {
          ...state.session,
          wins,
          lastUpdated: new Date(),
        },
      };
    }),

  updatePlayerNames: (player1Name, player2Name) =>
    set((state) => {
      if (!state.session) return state;

      return {
        session: {
          ...state.session,
          player1Name,
          player2Name,
          lastUpdated: new Date(),
        },
      };
    }),

  getSessionData: () => get().session,
}));

// Selectores para acceder a datos derivados
export const selectPlayerNames = (state: SessionStore) => ({
  player1: state.session?.player1Name || DEFAULT_PLAYER1_NAME,
  player2: state.session?.player2Name || DEFAULT_PLAYER2_NAME,
});

export const selectWins = (state: SessionStore): SessionWins =>
  state.session?.wins || {
    player1Wins: 0,
    player2Wins: 0,
    ties: 0,
  };

export const selectCurrentSession = (state: SessionStore) => state.session;
