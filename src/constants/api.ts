/**
 * Constantes de la API de PokeAPI
 */

export const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2';

export const GEN1_MIN_ID = 1;
export const GEN1_MAX_ID = 151;

// Path para obtener el sprite de generación 1
export const SPRITE_PATH = 'sprites.versions.generation-i.red-blue.front_transparent' as const;

// Configuración de caché
export const CACHE_ENABLED = true;

// Retry configuration
export const MAX_RETRIES = 3;
export const RETRY_DELAY = 1000; // 1 segundo entre reintentos
