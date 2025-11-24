/**
 * Tests para el servicio de PokeAPI
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  fetchPokemon,
  fetchRandomPokemons,
  clearPokemonCache,
  getCacheSize,
} from './pokemon-api.service';
import type { PokemonApiResponse } from '../types/pokemon';

// Mock de fetch global
globalThis.fetch = vi.fn() as any;

const mockPokemonResponse: PokemonApiResponse = {
  id: 1,
  name: 'bulbasaur',
  sprites: {
    versions: {
      'generation-i': {
        'red-blue': {
          front_default: 'https://example.com/front-default.png',
          front_transparent: 'https://example.com/front-transparent.png',
          front_gray: null,
          back_default: null,
          back_gray: null,
          back_transparent: null,
        },
      },
    },
  },
};

describe('pokemon-api.service', () => {
  beforeEach(() => {
    // Limpiar caché antes de cada test
    clearPokemonCache();
    vi.clearAllMocks();
  });

  describe('fetchPokemon', () => {
    it('debe obtener un Pokémon por ID', async () => {
      (globalThis.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockPokemonResponse,
      });

      const pokemon = await fetchPokemon(1);

      expect(pokemon).toEqual({
        id: 1,
        name: 'bulbasaur',
        sprite: 'https://example.com/front-transparent.png',
      });
      expect(globalThis.fetch).toHaveBeenCalledWith(
        'https://pokeapi.co/api/v2/pokemon/1'
      );
    });

    it('debe usar caché en la segunda llamada', async () => {
      (globalThis.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockPokemonResponse,
      });

      // Primera llamada
      await fetchPokemon(1);
      expect(getCacheSize()).toBe(1);

      // Segunda llamada (debe usar caché)
      const pokemon = await fetchPokemon(1);

      expect(pokemon.id).toBe(1);
      expect(globalThis.fetch).toHaveBeenCalledTimes(1); // Solo una llamada a fetch
    });

    it('debe lanzar error si el ID está fuera de rango', async () => {
      await expect(fetchPokemon(0)).rejects.toThrow(
        'Pokemon ID must be between 1 and 151'
      );
      await expect(fetchPokemon(152)).rejects.toThrow(
        'Pokemon ID must be between 1 and 151'
      );
    });

    it('debe lanzar error si no hay sprite disponible', async () => {
      const mockResponseNoSprite = {
        ...mockPokemonResponse,
        sprites: {
          versions: {
            'generation-i': {
              'red-blue': {
                front_default: null,
                front_transparent: null,
                front_gray: null,
                back_default: null,
                back_gray: null,
                back_transparent: null,
              },
            },
          },
        },
      };

      (globalThis.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponseNoSprite,
      });

      await expect(fetchPokemon(1)).rejects.toThrow(
        'No sprite available for Pokemon bulbasaur'
      );
    });

    it('debe reintentar en caso de error de red', async () => {
      // Primera y segunda llamada fallan, tercera tiene éxito
      (globalThis.fetch as any)
        .mockRejectedValueOnce(new Error('Network error'))
        .mockRejectedValueOnce(new Error('Network error'))
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockPokemonResponse,
        });

      const pokemon = await fetchPokemon(1);

      expect(pokemon.id).toBe(1);
      expect(globalThis.fetch).toHaveBeenCalledTimes(3);
    });
  });

  describe('fetchRandomPokemons', () => {
    it('debe obtener múltiples Pokémon aleatorios', async () => {
      (globalThis.fetch as any).mockImplementation((url: string) => {
        const id = parseInt(url.split('/').pop() || '1');
        return Promise.resolve({
          ok: true,
          json: async () => ({
            ...mockPokemonResponse,
            id,
            name: `pokemon-${id}`,
          }),
        });
      });

      const pokemons = await fetchRandomPokemons(5);

      expect(pokemons).toHaveLength(5);
      expect(globalThis.fetch).toHaveBeenCalledTimes(5);

      // Verificar que todos los IDs son únicos
      const ids = pokemons.map((p) => p.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(5);
    });

    it('debe lanzar error si count es inválido', async () => {
      await expect(fetchRandomPokemons(0)).rejects.toThrow(
        'Count must be between 1 and 151'
      );
      await expect(fetchRandomPokemons(152)).rejects.toThrow(
        'Count must be between 1 and 151'
      );
    });

    it('debe propagar errores si alguna llamada falla', async () => {
      (globalThis.fetch as any).mockRejectedValue(new Error('Network error'));

      await expect(fetchRandomPokemons(3)).rejects.toThrow();
    });
  });

  describe('clearPokemonCache', () => {
    it('debe limpiar la caché correctamente', async () => {
      (globalThis.fetch as any).mockResolvedValue({
        ok: true,
        json: async () => mockPokemonResponse,
      });

      await fetchPokemon(1);
      expect(getCacheSize()).toBe(1);

      clearPokemonCache();
      expect(getCacheSize()).toBe(0);
    });
  });
});
