/**
 * Interfaz abstracta para servicios de persistencia de sesión
 * Permite migración futura a backend con mínimos cambios
 */

import type { GameSession } from '../../types/session';

export interface SessionService {
  /**
   * Guarda la sesión actual
   */
  saveSession(session: GameSession): void;

  /**
   * Carga la sesión guardada
   * @returns La sesión guardada o null si no existe
   */
  loadSession(): GameSession | null;

  /**
   * Elimina la sesión guardada
   */
  clearSession(): void;
}
