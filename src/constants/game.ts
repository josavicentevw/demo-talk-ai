/**
 * Constantes del juego
 */

// Puntuación
export const BASE_POINTS = 100;
export const STREAK_BONUS_INCREMENT = 10;

// Opciones de configuración
export const PAIR_COUNT_OPTIONS = [6, 8, 10, 12] as const;

// Delays y tiempos
export const CARD_FLIP_DELAY = 1500; // 1.5 segundos antes de ocultar cartas no emparejadas
export const MATCH_CELEBRATION_DELAY = 500; // 0.5 segundos de celebración al encontrar pareja

// Nombres por defecto
export const DEFAULT_PLAYER1_NAME = 'Jugador 1';
export const DEFAULT_PLAYER2_NAME = 'Jugador 2';

// Validación de nombres
export const MAX_PLAYER_NAME_LENGTH = 20;
export const MIN_PLAYER_NAME_LENGTH = 1;

/**
 * Calcula el bonus por racha
 * 1ra pareja: 0
 * 2da pareja consecutiva: +20
 * 3ra pareja consecutiva: +30
 * 4ta pareja consecutiva: +40, etc.
 */
export const calculateStreakBonus = (streak: number): number => {
  if (streak <= 1) return 0;
  return (streak - 1) * STREAK_BONUS_INCREMENT + 10;
};

/**
 * Calcula el multiplicador por velocidad basado en el ratio de aciertos
 * Menos intentos fallidos = mayor multiplicador
 */
export const calculateSpeedMultiplier = (
  pairsFound: number,
  missedAttempts: number
): number => {
  if (pairsFound === 0) return 1;
  
  const totalAttempts = pairsFound + missedAttempts;
  const accuracy = pairsFound / totalAttempts;
  
  // Multiplicadores basados en precisión:
  // 100% accuracy: 2x
  // 80-99% accuracy: 1.5x
  // 60-79% accuracy: 1.25x
  // <60% accuracy: 1x
  if (accuracy === 1) return 2;
  if (accuracy >= 0.8) return 1.5;
  if (accuracy >= 0.6) return 1.25;
  return 1;
};
