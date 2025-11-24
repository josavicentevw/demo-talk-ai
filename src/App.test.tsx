import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

// Mock de fetch para PokeAPI
globalThis.fetch = vi.fn(async (input: RequestInfo | URL) => {
  const url = typeof input === 'string' ? input : input.toString();
  const id = parseInt(url.split('/').slice(-1)[0]);
  return {
    ok: true,
    json: async () => ({
      id,
      name: `pokemon-${id}`,
      sprites: {
        versions: {
          'generation-i': {
            'red-blue': {
              front_transparent: `https://example.com/pokemon-${id}.png`,
            },
          },
        },
      },
    }),
  } as Response;
}) as any;

describe('Game Flow Integration', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders welcome screen initially', () => {
    render(<App />);
    expect(screen.getByText('¡Bienvenido entrenador!')).toBeDefined();
  });

  it('allows configuring and starting a new game with localStorage persistence', async () => {
    const user = userEvent.setup();
    render(<App />);

    // Click en configurar juego
    const configButton = screen.getByRole('button', { name: /Configurar Juego/i });
    await user.click(configButton);

    // Esperar modal y guardar configuración
    const saveButton = await screen.findByRole('button', { name: /Guardar/i });
    await user.click(saveButton);

    // Esperar carga de Pokémon
    await waitFor(
      () => {
        expect(screen.queryByText(/Cargando/)).toBeNull();
      },
      { timeout: 3000 }
    );

    // Verificar que el juego está en pantalla
    await waitFor(() => {
      const scoreElements = screen.queryAllByText(/puntos/i);
      expect(scoreElements.length).toBeGreaterThan(0);
    });

    // Verificar que se guardó en localStorage
    const stored = localStorage.getItem('pokemon-memory-game-session');
    expect(stored).not.toBeNull();
  });
});
