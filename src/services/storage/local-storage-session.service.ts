import type { GameSession } from '../../types/session';

const SESSION_STORAGE_KEY = 'pokemon-memory-game-session';

/**
 * Servicio de persistencia usando localStorage
 * Implementa la interfaz SessionService para futuras migraciones
 */
export class LocalStorageSessionService {
  /**
   * Guarda la sesión en localStorage
   */
  saveSession(session: GameSession): void {
    try {
      const serialized = JSON.stringify(session);
      localStorage.setItem(SESSION_STORAGE_KEY, serialized);
    } catch (error) {
      console.error('Error saving session to localStorage:', error);
    }
  }

  /**
   * Carga la sesión desde localStorage
   */
  loadSession(): GameSession | null {
    try {
      const serialized = localStorage.getItem(SESSION_STORAGE_KEY);
      if (!serialized) {
        return null;
      }

      const session = JSON.parse(serialized) as GameSession;

      // Convertir strings de fechas a objetos Date
      return {
        ...session,
        startedAt: new Date(session.startedAt),
        lastUpdated: new Date(session.lastUpdated),
        history: {
          games: session.history.games.map((game) => ({
            ...game,
            timestamp: new Date(game.timestamp),
          })),
        },
      };
    } catch (error) {
      console.error('Error loading session from localStorage:', error);
      return null;
    }
  }

  /**
   * Elimina la sesión de localStorage
   */
  clearSession(): void {
    try {
      localStorage.removeItem(SESSION_STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing session from localStorage:', error);
    }
  }

  /**
   * Verifica si hay una sesión guardada
   */
  hasSession(): boolean {
    return localStorage.getItem(SESSION_STORAGE_KEY) !== null;
  }
}

// Exportar instancia singleton
export const localStorageSessionService = new LocalStorageSessionService();
