import type { Card, Player, GameConfig } from '../types/game';
import type { Pokemon } from '../types/pokemon';
import { shuffleArray } from './array-helpers';
import {
  BASE_POINTS,
  calculateStreakBonus,
  calculateSpeedMultiplier,
} from '../constants/game';

/**
 * Crea un mazo de cartas a partir de un array de Pokémon
 * @param pokemons Array de Pokémon
 * @returns Array de cartas mezcladas
 */
export function createDeck(pokemons: Pokemon[]): Card[] {
  const cards: Card[] = [];

  pokemons.forEach((pokemon) => {
    // Crear par de cartas
    cards.push({
      id: `${pokemon.id}-a`,
      pokemonId: pokemon.id,
      pokemonName: pokemon.name,
      sprite: pokemon.sprite,
      state: 'hidden',
    });
    cards.push({
      id: `${pokemon.id}-b`,
      pokemonId: pokemon.id,
      pokemonName: pokemon.name,
      sprite: pokemon.sprite,
      state: 'hidden',
    });
  });

  return shuffleArray(cards);
}

/**
 * Calcula la puntuación obtenida por un match
 * @param player Jugador que hizo el match
 * @returns Puntos obtenidos
 */
export function calculateMatchScore(player: Player): number {
  const streakBonus = calculateStreakBonus(player.currentStreak);
  const speedMultiplier = calculateSpeedMultiplier(
    player.pairsFound,
    player.missedAttempts
  );

  return Math.floor(BASE_POINTS * speedMultiplier + streakBonus);
}

/**
 * Determina el ganador del juego
 * @param player1 Jugador 1
 * @param player2 Jugador 2
 * @returns 'player1', 'player2' o 'tie'
 */
export function determineWinner(
  player1: Player,
  player2: Player
): 'player1' | 'player2' | 'tie' {
  if (player1.score > player2.score) return 'player1';
  if (player2.score > player1.score) return 'player2';
  return 'tie';
}

/**
 * Verifica si el juego ha terminado
 * @param matchedPairs Número de pares emparejados
 * @param config Configuración del juego
 * @returns true si el juego ha terminado
 */
export function isGameFinished(
  matchedPairs: number,
  config: GameConfig
): boolean {
  return matchedPairs === config.pairCount;
}

/**
 * Verifica si dos cartas son iguales (mismo Pokémon)
 * @param card1 Primera carta
 * @param card2 Segunda carta
 * @returns true si las cartas son iguales
 */
export function areCardsMatching(card1: Card, card2: Card): boolean {
  return card1.pokemonId === card2.pokemonId;
}
