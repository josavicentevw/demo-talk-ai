import { useState, useCallback } from 'react';
import { fetchRandomPokemons } from '../services/pokemon-api.service';
import type { Card } from '../types/game';

interface UsePokemonLoaderResult {
  isLoading: boolean;
  error: string | null;
  loadPokemons: (pairCount: number) => Promise<Card[]>;
}

/**
 * Hook para cargar Pokémon aleatorios y crear el mazo de cartas
 */
export function usePokemonLoader(): UsePokemonLoaderResult {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const loadPokemons = useCallback(async (pairCount: number): Promise<Card[]> => {
    try {
      setIsLoading(true);
      setError(null);

      const pokemons = await fetchRandomPokemons(pairCount);

      // Crear pares de cartas
      const cards: Card[] = [];
      pokemons.forEach((pokemon) => {
        // Primera carta del par
        cards.push({
          id: `${pokemon.id}-a`,
          pokemonId: pokemon.id,
          pokemonName: pokemon.name,
          sprite: pokemon.sprite,
          state: 'hidden',
        });
        // Segunda carta del par
        cards.push({
          id: `${pokemon.id}-b`,
          pokemonId: pokemon.id,
          pokemonName: pokemon.name,
          sprite: pokemon.sprite,
          state: 'hidden',
        });
      });

      // Mezclar las cartas usando Fisher-Yates
      const shuffledCards = shuffleArray(cards);

      return shuffledCards;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Error al cargar los Pokémon';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    loadPokemons,
  };
}
