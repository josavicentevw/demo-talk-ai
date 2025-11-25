/**
 * Store principal del juego usando Zustand
 * Gestiona el estado del tablero, jugadores, turnos y puntuación
 */

import { create } from 'zustand';
import type { GameState, Card, Player, GameConfig } from '../types/game';
import {
  BASE_POINTS,
  calculateStreakBonus,
  DEFAULT_PLAYER1_NAME,
  DEFAULT_PLAYER2_NAME,
} from '../constants/game';

const createInitialPlayer = (id: 1 | 2, name?: string): Player => ({
  id,
  name: name || (id === 1 ? DEFAULT_PLAYER1_NAME : DEFAULT_PLAYER2_NAME),
  score: 0,
  pairsFound: 0,
  currentStreak: 0,
  missedAttempts: 0,
});

const initialState: GameState = {
  status: 'configuring',
  config: { pairCount: 8 },
  cards: [],
  currentPlayer: 1,
  player1: createInitialPlayer(1),
  player2: createInitialPlayer(2),
  selectedCards: [],
  matchedPairs: 0,
  isProcessing: false,
  startTime: null,
  endTime: null,
};

interface GameStore extends GameState {
  // Acciones de configuración
  setConfig: (config: GameConfig) => void;
  setPlayerName: (playerId: 1 | 2, name: string) => void;

  // Acciones de inicialización
  initializeGame: (cards: Card[]) => void;
  setStatus: (status: GameState['status']) => void;
  startTimer: () => void;
  endTimer: () => void;
  getDuration: () => number;

  // Acciones de juego
  selectCard: (cardId: string) => void;
  revealCard: (cardId: string) => void;
  matchCards: (cardIds: string[]) => void;
  unmatchCards: () => void;
  clearSelection: () => void;
  setProcessing: (isProcessing: boolean) => void;

  // Getter derivado
  gameStatus: GameState['status'];

  // Acciones de turno
  switchTurn: () => void;
  recordMiss: () => void;

  // Acciones de puntuación
  updateScore: (playerId: 1 | 2, points: number) => void;
  incrementPairsFound: (playerId: 1 | 2) => void;
  incrementStreak: (playerId: 1 | 2) => void;
  resetStreak: (playerId: 1 | 2) => void;

  // Acciones de reset
  resetGame: () => void;
  resetForNewGame: (cards: Card[]) => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
  ...initialState,

  // Configuración
  setConfig: (config) => set({ config }),

  setPlayerName: (playerId, name) =>
    set((state) => ({
      [playerId === 1 ? 'player1' : 'player2']: {
        ...state[playerId === 1 ? 'player1' : 'player2'],
        name,
      },
    })),

  // Inicialización
  initializeGame: (cards) =>
    set({
      cards,
      status: 'playing',
      selectedCards: [],
      matchedPairs: 0,
      isProcessing: false,
      startTime: Date.now(),
      endTime: null,
    }),

  setStatus: (status) => set({ status }),

  startTimer: () => set({ startTime: Date.now(), endTime: null }),

  endTimer: () => set({ endTime: Date.now() }),

  getDuration: () => {
    const state = get();
    if (!state.startTime) return 0;
    const end = state.endTime || Date.now();
    return Math.floor((end - state.startTime) / 1000); // Retorna duración en segundos
  },

  // Juego
  selectCard: (cardId) =>
    set((state) => {
      if (state.isProcessing || state.selectedCards.length >= 2) {
        return state;
      }

      if (state.selectedCards.includes(cardId)) {
        return state;
      }

      const card = state.cards.find((c) => c.id === cardId);
      if (!card || card.state === 'matched') {
        return state;
      }

      return {
        selectedCards: [...state.selectedCards, cardId],
        cards: state.cards.map((c) =>
          c.id === cardId ? { ...c, state: 'revealed' as const } : c
        ),
      };
    }),

  revealCard: (cardId) =>
    set((state) => ({
      cards: state.cards.map((card) =>
        card.id === cardId ? { ...card, state: 'revealed' as const } : card
      ),
    })),

  matchCards: (cardIds) =>
    set((state) => {
      const currentPlayer = state[`player${state.currentPlayer}` as const];
      const streak = currentPlayer.currentStreak + 1;
      const streakBonus = calculateStreakBonus(streak);
      const points = BASE_POINTS + streakBonus;

      return {
        cards: state.cards.map((card) =>
          cardIds.includes(card.id)
            ? { ...card, state: 'matched' as const }
            : card
        ),
        matchedPairs: state.matchedPairs + 1,
        // NO limpiar selectedCards aquí - se limpiará en use-game-flow
        [state.currentPlayer === 1 ? 'player1' : 'player2']: {
          ...currentPlayer,
          score: currentPlayer.score + points,
          pairsFound: currentPlayer.pairsFound + 1,
          currentStreak: streak,
        },
      };
    }),

  unmatchCards: () =>
    set((state) => ({
      cards: state.cards.map((card) =>
        state.selectedCards.includes(card.id)
          ? { ...card, state: 'hidden' as const }
          : card
      ),
      selectedCards: [],
    })),

  clearSelection: () =>
    set({
      selectedCards: [],
    }),

  setProcessing: (isProcessing) => set({ isProcessing }),

  // Turnos
  switchTurn: () =>
    set((state) => ({
      currentPlayer: state.currentPlayer === 1 ? 2 : 1,
    })),

  recordMiss: () =>
    set((state) => {
      const currentPlayer = state[`player${state.currentPlayer}` as const];
      return {
        [state.currentPlayer === 1 ? 'player1' : 'player2']: {
          ...currentPlayer,
          missedAttempts: currentPlayer.missedAttempts + 1,
          currentStreak: 0,
        },
      };
    }),

  // Puntuación
  updateScore: (playerId, points) =>
    set((state) => {
      const player = state[`player${playerId}` as const];
      return {
        [playerId === 1 ? 'player1' : 'player2']: {
          ...player,
          score: player.score + points,
        },
      };
    }),

  incrementPairsFound: (playerId) =>
    set((state) => {
      const player = state[`player${playerId}` as const];
      return {
        [playerId === 1 ? 'player1' : 'player2']: {
          ...player,
          pairsFound: player.pairsFound + 1,
        },
      };
    }),

  incrementStreak: (playerId) =>
    set((state) => {
      const player = state[`player${playerId}` as const];
      return {
        [playerId === 1 ? 'player1' : 'player2']: {
          ...player,
          currentStreak: player.currentStreak + 1,
        },
      };
    }),

  resetStreak: (playerId) =>
    set((state) => {
      const player = state[`player${playerId}` as const];
      return {
        [playerId === 1 ? 'player1' : 'player2']: {
          ...player,
          currentStreak: 0,
        },
      };
    }),

  // Reset
  resetGame: () => set(initialState),

  resetForNewGame: (cards) =>
    set((state) => {
      const player1Name = state.player1.name;
      const player2Name = state.player2.name;
      return {
        cards,
        status: 'playing',
        currentPlayer: 1,
        player1: createInitialPlayer(1, player1Name),
        player2: createInitialPlayer(2, player2Name),
        selectedCards: [],
        matchedPairs: 0,
        isProcessing: false,
        startTime: Date.now(),
        endTime: null,
      };
    }),

  // Getter derivado
  get gameStatus() {
    return get().status;
  },
}));
