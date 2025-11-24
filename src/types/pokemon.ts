/**
 * Tipos para la integración con PokeAPI
 */

export interface PokemonSprite {
  front_default: string | null;
  front_transparent: string | null;
}

export interface PokemonApiResponse {
  id: number;
  name: string;
  sprites: {
    versions: {
      'generation-i': {
        'red-blue': {
          front_default: string | null;
          front_transparent: string | null;
          front_gray: string | null;
          back_default: string | null;
          back_gray: string | null;
          back_transparent: string | null;
        };
      };
    };
  };
}

export interface Pokemon {
  id: number;
  name: string;
  sprite: string;
}
