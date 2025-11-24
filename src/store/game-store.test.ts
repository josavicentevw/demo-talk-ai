/**
 * Tests para game-store
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { useGameStore } from './game-store';
import type { Card } from '../types/game';

const createMockCard = (id: string, pokemonId: number): Card => ({
  id,
  pokemonId,
  pokemonName: `pokemon-${pokemonId}`,
  sprite: `sprite-${pokemonId}.png`,
  state: 'hidden',
});

describe('game-store', () => {
  beforeEach(() => {
    // Reset store antes de cada test
    useGameStore.getState().resetGame();
  });

  describe('Configuración inicial', () => {
    it('debe tener el estado inicial correcto', () => {
      const state = useGameStore.getState();

      expect(state.status).toBe('configuring');
      expect(state.cards).toHaveLength(0);
      expect(state.currentPlayer).toBe(1);
      expect(state.player1.score).toBe(0);
      expect(state.player2.score).toBe(0);
      expect(state.matchedPairs).toBe(0);
    });

    it('debe permitir configurar el número de parejas', () => {
      const { setConfig } = useGameStore.getState();

      setConfig({ pairCount: 12 });

      expect(useGameStore.getState().config.pairCount).toBe(12);
    });

    it('debe permitir establecer nombres de jugadores', () => {
      const { setPlayerName } = useGameStore.getState();

      setPlayerName(1, 'Ash');
      setPlayerName(2, 'Misty');

      const state = useGameStore.getState();
      expect(state.player1.name).toBe('Ash');
      expect(state.player2.name).toBe('Misty');
    });
  });

  describe('Inicialización del juego', () => {
    it('debe inicializar el juego con las cartas proporcionadas', () => {
      const mockCards = [
        createMockCard('1', 1),
        createMockCard('2', 1),
        createMockCard('3', 2),
        createMockCard('4', 2),
      ];

      useGameStore.getState().initializeGame(mockCards);

      const state = useGameStore.getState();
      expect(state.status).toBe('playing');
      expect(state.cards).toHaveLength(4);
      expect(state.selectedCards).toHaveLength(0);
    });
  });

  describe('Selección de cartas', () => {
    beforeEach(() => {
      const mockCards = [
        createMockCard('1', 1),
        createMockCard('2', 1),
        createMockCard('3', 2),
        createMockCard('4', 2),
      ];
      useGameStore.getState().initializeGame(mockCards);
    });

    it('debe permitir seleccionar una carta', () => {
      const { selectCard } = useGameStore.getState();

      selectCard('1');

      expect(useGameStore.getState().selectedCards).toEqual(['1']);
    });

    it('debe permitir seleccionar dos cartas', () => {
      const { selectCard } = useGameStore.getState();

      selectCard('1');
      selectCard('2');

      expect(useGameStore.getState().selectedCards).toEqual(['1', '2']);
    });

    it('no debe permitir seleccionar más de dos cartas', () => {
      const { selectCard } = useGameStore.getState();

      selectCard('1');
      selectCard('2');
      selectCard('3');

      expect(useGameStore.getState().selectedCards).toEqual(['1', '2']);
    });

    it('no debe permitir seleccionar la misma carta dos veces', () => {
      const { selectCard } = useGameStore.getState();

      selectCard('1');
      selectCard('1');

      expect(useGameStore.getState().selectedCards).toEqual(['1']);
    });
  });

  describe('Revelar cartas', () => {
    beforeEach(() => {
      const mockCards = [
        createMockCard('1', 1),
        createMockCard('2', 1),
      ];
      useGameStore.getState().initializeGame(mockCards);
    });

    it('debe revelar una carta', () => {
      const { revealCard } = useGameStore.getState();

      revealCard('1');

      const card = useGameStore.getState().cards.find((c) => c.id === '1');
      expect(card?.state).toBe('revealed');
    });
  });

  describe('Emparejar cartas', () => {
    beforeEach(() => {
      const mockCards = [
        createMockCard('1', 1),
        createMockCard('2', 1),
      ];
      useGameStore.getState().initializeGame(mockCards);
    });

    it('debe emparejar las cartas correctamente', () => {
      const { matchCards } = useGameStore.getState();

      matchCards(['1', '2']);

      const state = useGameStore.getState();
      expect(state.matchedPairs).toBe(1);
      expect(state.cards[0].state).toBe('matched');
      expect(state.cards[1].state).toBe('matched');
      expect(state.selectedCards).toHaveLength(0);
    });

    it('debe incrementar la puntuación del jugador actual', () => {
      const { matchCards } = useGameStore.getState();

      matchCards(['1', '2']);

      const state = useGameStore.getState();
      expect(state.player1.score).toBeGreaterThan(0);
      expect(state.player1.pairsFound).toBe(1);
    });

    it('debe incrementar el streak del jugador', () => {
      const { matchCards } = useGameStore.getState();

      matchCards(['1', '2']);

      const state = useGameStore.getState();
      expect(state.player1.currentStreak).toBe(1);
    });

    it('debe aplicar bonus por streak en parejas consecutivas', () => {
      const mockCards = [
        createMockCard('1', 1),
        createMockCard('2', 1),
        createMockCard('3', 2),
        createMockCard('4', 2),
      ];
      useGameStore.getState().resetGame();
      useGameStore.getState().initializeGame(mockCards);

      const { matchCards } = useGameStore.getState();

      // Primera pareja
      matchCards(['1', '2']);
      const scoreAfterFirst = useGameStore.getState().player1.score;

      // Segunda pareja (debería tener bonus)
      matchCards(['3', '4']);
      const scoreAfterSecond = useGameStore.getState().player1.score;

      expect(scoreAfterSecond - scoreAfterFirst).toBeGreaterThan(100); // Más que el puntaje base
    });
  });

  describe('Cambio de turno', () => {
    it('debe cambiar del jugador 1 al jugador 2', () => {
      const { switchTurn } = useGameStore.getState();

      expect(useGameStore.getState().currentPlayer).toBe(1);

      switchTurn();

      expect(useGameStore.getState().currentPlayer).toBe(2);
    });

    it('debe cambiar del jugador 2 al jugador 1', () => {
      const { switchTurn } = useGameStore.getState();

      switchTurn(); // 1 -> 2
      switchTurn(); // 2 -> 1

      expect(useGameStore.getState().currentPlayer).toBe(1);
    });
  });

  describe('Registro de fallos', () => {
    it('debe registrar un intento fallido', () => {
      const { recordMiss } = useGameStore.getState();

      recordMiss();

      expect(useGameStore.getState().player1.missedAttempts).toBe(1);
    });

    it('debe resetear el streak al fallar', () => {
      const mockCards = [
        createMockCard('1', 1),
        createMockCard('2', 1),
      ];
      useGameStore.getState().initializeGame(mockCards);

      const { matchCards, recordMiss } = useGameStore.getState();

      // Crear streak
      matchCards(['1', '2']);
      expect(useGameStore.getState().player1.currentStreak).toBe(1);

      // Fallar
      recordMiss();
      expect(useGameStore.getState().player1.currentStreak).toBe(0);
    });
  });

  describe('Reset del juego', () => {
    it('debe resetear el juego al estado inicial', () => {
      const mockCards = [createMockCard('1', 1)];
      const { initializeGame, setPlayerName, matchCards, resetGame } =
        useGameStore.getState();

      initializeGame(mockCards);
      setPlayerName(1, 'Ash');
      matchCards(['1']);

      resetGame();

      const state = useGameStore.getState();
      expect(state.status).toBe('configuring');
      expect(state.cards).toHaveLength(0);
      expect(state.player1.score).toBe(0);
      expect(state.player1.name).toBe('Jugador 1');
    });

    it('debe resetear para una nueva partida manteniendo los nombres', () => {
      const { setPlayerName, resetForNewGame } = useGameStore.getState();

      setPlayerName(1, 'Ash');
      setPlayerName(2, 'Misty');

      const newCards = [createMockCard('1', 1)];
      resetForNewGame(newCards);

      const state = useGameStore.getState();
      expect(state.player1.name).toBe('Ash');
      expect(state.player2.name).toBe('Misty');
      expect(state.player1.score).toBe(0);
      expect(state.status).toBe('playing');
    });
  });
});
