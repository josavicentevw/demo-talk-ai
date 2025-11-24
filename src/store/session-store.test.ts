/**
 * Tests para session-store
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { useSessionStore } from './session-store';
import type { GameResult } from '../types/session';

const createMockGameResult = (
  winner: 1 | 2 | 'tie',
  player1Score = 100,
  player2Score = 50
): GameResult => ({
  id: `game-${Date.now()}-${Math.random()}`,
  timestamp: new Date(),
  pairCount: 8,
  player1Name: 'Jugador 1',
  player1Score,
  player2Name: 'Jugador 2',
  player2Score,
  winner,
});

describe('session-store', () => {
  beforeEach(() => {
    // Reset store antes de cada test
    useSessionStore.getState().endSession();
  });

  describe('Inicio de sesión', () => {
    it('debe iniciar una nueva sesión', () => {
      const { startSession } = useSessionStore.getState();

      startSession();

      const session = useSessionStore.getState().session;
      expect(session).not.toBeNull();
      expect(session?.id).toBeDefined();
      expect(session?.wins.player1Wins).toBe(0);
      expect(session?.wins.player2Wins).toBe(0);
      expect(session?.history.games).toHaveLength(0);
    });

    it('debe permitir establecer nombres de jugadores al iniciar', () => {
      const { startSession } = useSessionStore.getState();

      startSession('Ash', 'Misty');

      const session = useSessionStore.getState().session;
      expect(session?.player1Name).toBe('Ash');
      expect(session?.player2Name).toBe('Misty');
    });

    it('debe usar nombres por defecto si no se proporcionan', () => {
      const { startSession } = useSessionStore.getState();

      startSession();

      const session = useSessionStore.getState().session;
      expect(session?.player1Name).toBe('Jugador 1');
      expect(session?.player2Name).toBe('Jugador 2');
    });
  });

  describe('Finalización de sesión', () => {
    it('debe finalizar la sesión correctamente', () => {
      const { startSession, endSession } = useSessionStore.getState();

      startSession();
      expect(useSessionStore.getState().session).not.toBeNull();

      endSession();
      expect(useSessionStore.getState().session).toBeNull();
    });
  });

  describe('Carga de sesión', () => {
    it('debe cargar una sesión existente', () => {
      const mockSession = {
        id: 'test-session',
        startedAt: new Date('2025-01-01'),
        lastUpdated: new Date('2025-01-02'),
        history: { games: [] },
        wins: { player1Wins: 5, player2Wins: 3, ties: 1 },
        player1Name: 'Ash',
        player2Name: 'Misty',
      };

      const { loadSession } = useSessionStore.getState();
      loadSession(mockSession);

      const session = useSessionStore.getState().session;
      expect(session?.id).toBe('test-session');
      expect(session?.wins.player1Wins).toBe(5);
      expect(session?.wins.player2Wins).toBe(3);
    });

    it('debe convertir fechas correctamente al cargar', () => {
      const mockSession = {
        id: 'test-session',
        startedAt: new Date('2025-01-01'),
        lastUpdated: new Date('2025-01-02'),
        history: {
          games: [
            {
              ...createMockGameResult(1),
              timestamp: new Date('2025-01-01T10:00:00'),
            },
          ],
        },
        wins: { player1Wins: 1, player2Wins: 0, ties: 0 },
        player1Name: 'Ash',
        player2Name: 'Misty',
      };

      const { loadSession } = useSessionStore.getState();
      loadSession(mockSession);

      const session = useSessionStore.getState().session;
      expect(session?.startedAt).toBeInstanceOf(Date);
      expect(session?.history.games[0].timestamp).toBeInstanceOf(Date);
    });
  });

  describe('Historial de partidas', () => {
    beforeEach(() => {
      useSessionStore.getState().startSession();
    });

    it('debe agregar una partida al historial', () => {
      const { addGameToHistory } = useSessionStore.getState();
      const gameResult = createMockGameResult(1);

      addGameToHistory(gameResult);

      const session = useSessionStore.getState().session;
      expect(session?.history.games).toHaveLength(1);
      expect(session?.history.games[0]).toEqual(gameResult);
    });

    it('debe agregar múltiples partidas al historial', () => {
      const { addGameToHistory } = useSessionStore.getState();

      addGameToHistory(createMockGameResult(1));
      addGameToHistory(createMockGameResult(2));
      addGameToHistory(createMockGameResult('tie'));

      const session = useSessionStore.getState().session;
      expect(session?.history.games).toHaveLength(3);
    });

    it('debe actualizar lastUpdated al agregar partida', () => {
      const { addGameToHistory } = useSessionStore.getState();
      const beforeTime = new Date();

      addGameToHistory(createMockGameResult(1));

      const session = useSessionStore.getState().session;
      expect(session?.lastUpdated.getTime()).toBeGreaterThanOrEqual(
        beforeTime.getTime()
      );
    });
  });

  describe('Contador de victorias', () => {
    beforeEach(() => {
      useSessionStore.getState().startSession();
    });

    it('debe incrementar victorias del jugador 1', () => {
      const { incrementWins } = useSessionStore.getState();

      incrementWins(1);

      const session = useSessionStore.getState().session;
      expect(session?.wins.player1Wins).toBe(1);
      expect(session?.wins.player2Wins).toBe(0);
    });

    it('debe incrementar victorias del jugador 2', () => {
      const { incrementWins } = useSessionStore.getState();

      incrementWins(2);

      const session = useSessionStore.getState().session;
      expect(session?.wins.player1Wins).toBe(0);
      expect(session?.wins.player2Wins).toBe(1);
    });

    it('debe incrementar empates', () => {
      const { incrementWins } = useSessionStore.getState();

      incrementWins('tie');

      const session = useSessionStore.getState().session;
      expect(session?.wins.ties).toBe(1);
    });

    it('debe incrementar victorias correctamente en múltiples partidas', () => {
      const { incrementWins } = useSessionStore.getState();

      incrementWins(1);
      incrementWins(1);
      incrementWins(2);
      incrementWins('tie');

      const session = useSessionStore.getState().session;
      expect(session?.wins.player1Wins).toBe(2);
      expect(session?.wins.player2Wins).toBe(1);
      expect(session?.wins.ties).toBe(1);
    });
  });

  describe('Actualización de nombres', () => {
    beforeEach(() => {
      useSessionStore.getState().startSession();
    });

    it('debe actualizar nombres de jugadores', () => {
      const { updatePlayerNames } = useSessionStore.getState();

      updatePlayerNames('Ash', 'Misty');

      const session = useSessionStore.getState().session;
      expect(session?.player1Name).toBe('Ash');
      expect(session?.player2Name).toBe('Misty');
    });

    it('debe actualizar lastUpdated al cambiar nombres', () => {
      const { updatePlayerNames } = useSessionStore.getState();
      const beforeTime = new Date();

      updatePlayerNames('Ash', 'Misty');

      const session = useSessionStore.getState().session;
      expect(session?.lastUpdated.getTime()).toBeGreaterThanOrEqual(
        beforeTime.getTime()
      );
    });
  });

  describe('Obtener datos de sesión', () => {
    it('debe retornar null si no hay sesión', () => {
      const { getSessionData } = useSessionStore.getState();

      expect(getSessionData()).toBeNull();
    });

    it('debe retornar la sesión actual', () => {
      const { startSession, getSessionData } = useSessionStore.getState();

      startSession('Ash', 'Misty');
      const sessionData = getSessionData();

      expect(sessionData).not.toBeNull();
      expect(sessionData?.player1Name).toBe('Ash');
      expect(sessionData?.player2Name).toBe('Misty');
    });
  });
});
