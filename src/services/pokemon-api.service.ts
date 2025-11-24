/**
 * Servicio para integración con PokeAPI
 */

import {
  POKEAPI_BASE_URL,
  GEN1_MIN_ID,
  GEN1_MAX_ID,
  MAX_RETRIES,
  RETRY_DELAY,
} from '../constants/api';
import type { Pokemon, PokemonApiResponse } from '../types/pokemon';

// Caché en memoria para evitar llamadas repetidas
const pokemonCache = new Map<number, Pokemon>();

/**
 * Genera un número aleatorio entre min y max (inclusivo)
 */
const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Delay helper para reintentos
 */
const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Extrae el sprite de la respuesta de la API
 */
const extractSprite = (data: PokemonApiResponse): string => {
  const sprite =
    data.sprites.versions['generation-i']['red-blue'].front_transparent;

  if (!sprite) {
    throw new Error(`No sprite available for Pokemon ${data.name}`);
  }

  return sprite;
};

/**
 * Fetch con reintentos
 */
const fetchWithRetry = async (
  url: string,
  retries = MAX_RETRIES
): Promise<Response> => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response;
  } catch (error) {
    if (retries > 0) {
      await delay(RETRY_DELAY);
      return fetchWithRetry(url, retries - 1);
    }
    throw error;
  }
};

/**
 * Obtiene los datos de un Pokémon por su ID
 * Utiliza caché en memoria para optimizar llamadas repetidas
 */
export const fetchPokemon = async (id: number): Promise<Pokemon> => {
  // Verificar caché
  if (pokemonCache.has(id)) {
    return pokemonCache.get(id)!;
  }

  // Validar ID
  if (id < GEN1_MIN_ID || id > GEN1_MAX_ID) {
    throw new Error(
      `Pokemon ID must be between ${GEN1_MIN_ID} and ${GEN1_MAX_ID}`
    );
  }

  try {
    const response = await fetchWithRetry(`${POKEAPI_BASE_URL}/pokemon/${id}`);
    const data: PokemonApiResponse = await response.json();

    const pokemon: Pokemon = {
      id: data.id,
      name: data.name,
      sprite: extractSprite(data),
    };

    // Guardar en caché
    pokemonCache.set(id, pokemon);

    return pokemon;
  } catch (error) {
    console.error(`Error fetching Pokemon ${id}:`, error);
    throw new Error(
      `Failed to fetch Pokemon ${id}: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
};

/**
 * Obtiene un conjunto aleatorio de Pokémon de la primera generación
 * @param count Número de Pokémon únicos a obtener
 */
export const fetchRandomPokemons = async (count: number): Promise<Pokemon[]> => {
  if (count < 1 || count > GEN1_MAX_ID) {
    throw new Error(`Count must be between 1 and ${GEN1_MAX_ID}`);
  }

  // Generar IDs únicos aleatorios
  const selectedIds = new Set<number>();
  while (selectedIds.size < count) {
    selectedIds.add(getRandomInt(GEN1_MIN_ID, GEN1_MAX_ID));
  }

  // Fetch todos los Pokémon en paralelo
  const promises = Array.from(selectedIds).map((id) => fetchPokemon(id));

  try {
    return await Promise.all(promises);
  } catch (error) {
    console.error('Error fetching random Pokemons:', error);
    throw error;
  }
};

/**
 * Limpia la caché de Pokémon
 * Útil para testing o para liberar memoria
 */
export const clearPokemonCache = (): void => {
  pokemonCache.clear();
};

/**
 * Obtiene el tamaño actual de la caché
 */
export const getCacheSize = (): number => {
  return pokemonCache.size;
};
