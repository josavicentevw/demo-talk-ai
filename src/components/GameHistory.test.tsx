import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { GameHistory } from './GameHistory';
import { useSessionStore } from '../store/session-store';
import type { GameSession } from '../types/session';
import type { Pokemon } from '../types/pokemon';

// Mock del store
vi.mock('../store/session-store');

describe('GameHistory', () => {
  const mockClearHistory = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    mockClearHistory.mockClear();
  });

  it('muestra mensaje cuando no hay partidas', () => {
    const mockSession: GameSession = {
      id: 'session-1',
      startedAt: new Date(),
      lastUpdated: new Date(),
      history: { games: [] },
      wins: { player1Wins: 0, player2Wins: 0, ties: 0 },
      player1Name: 'Jugador 1',
      player2Name: 'Jugador 2',
    };

    vi.mocked(useSessionStore).mockImplementation((selector: any) => {
      const state = { session: mockSession, clearHistory: mockClearHistory };
      return selector ? selector(state) : state.session;
    });

    render(<GameHistory />);
    expect(screen.getByText('No hay partidas jugadas aún')).toBeInTheDocument();
  });

  it('muestra mensaje cuando no hay sesión', () => {
    vi.mocked(useSessionStore).mockReturnValue(null);

    render(<GameHistory />);
    expect(screen.getByText('No hay partidas jugadas aún')).toBeInTheDocument();
  });

  it('renderiza lista de partidas con datos básicos', () => {
    const mockPokemons: Pokemon[] = [
      { id: 25, name: 'pikachu', sprite: 'http://example.com/pikachu.png' },
      { id: 1, name: 'bulbasaur', sprite: 'http://example.com/bulbasaur.png' },
    ];

    const mockSession: GameSession = {
      id: 'session-1',
      startedAt: new Date(),
      lastUpdated: new Date(),
      history: {
        games: [
          {
            id: 'game-1',
            timestamp: new Date('2025-01-01T10:30:00'),
            pairCount: 8,
            player1Name: 'Ash',
            player1Score: 850,
            player2Name: 'Misty',
            player2Score: 720,
            winner: 1,
            duration: 125, // 2:05
            pokemons: mockPokemons,
          },
        ],
      },
      wins: { player1Wins: 1, player2Wins: 0, ties: 0 },
      player1Name: 'Ash',
      player2Name: 'Misty',
    };

    vi.mocked(useSessionStore).mockReturnValue(mockSession);

    render(<GameHistory />);

    // Verificar información de la partida
    expect(screen.getByText(/10:30/)).toBeInTheDocument();
    expect(screen.getByText('🏆 Ash')).toBeInTheDocument();
    expect(screen.getByText('8 parejas')).toBeInTheDocument();
    expect(screen.getByText(/02:05/)).toBeInTheDocument();
    expect(screen.getByText(/850/)).toBeInTheDocument();
    expect(screen.getByText(/720/)).toBeInTheDocument();
  });

  it('muestra badge de empate cuando hay tie', () => {
    const mockSession: GameSession = {
      id: 'session-1',
      startedAt: new Date(),
      lastUpdated: new Date(),
      history: {
        games: [
          {
            id: 'game-1',
            timestamp: new Date(),
            pairCount: 6,
            player1Name: 'Red',
            player1Score: 600,
            player2Name: 'Blue',
            player2Score: 600,
            winner: 'tie',
            duration: 90,
            pokemons: [],
          },
        ],
      },
      wins: { player1Wins: 0, player2Wins: 0, ties: 1 },
      player1Name: 'Red',
      player2Name: 'Blue',
    };

    vi.mocked(useSessionStore).mockReturnValue(mockSession);

    render(<GameHistory />);
    expect(screen.getByText('🏆 Empate')).toBeInTheDocument();
  });

  it('expande y colapsa detalles de partida al hacer click', () => {
    const mockPokemons: Pokemon[] = [
      { id: 25, name: 'pikachu', sprite: 'http://example.com/pikachu.png' },
      { id: 4, name: 'charmander', sprite: 'http://example.com/charmander.png' },
    ];

    const mockSession: GameSession = {
      id: 'session-1',
      startedAt: new Date(),
      lastUpdated: new Date(),
      history: {
        games: [
          {
            id: 'game-1',
            timestamp: new Date(),
            pairCount: 6,
            player1Name: 'Ash',
            player1Score: 600,
            player2Name: 'Gary',
            player2Score: 550,
            winner: 1,
            duration: 60,
            pokemons: mockPokemons,
          },
        ],
      },
      wins: { player1Wins: 1, player2Wins: 0, ties: 0 },
      player1Name: 'Ash',
      player2Name: 'Gary',
    };

    vi.mocked(useSessionStore).mockReturnValue(mockSession);

    render(<GameHistory />);

    // Inicialmente no se ven los Pokémon
    expect(screen.queryByText('Pokémon en esta partida:')).not.toBeInTheDocument();
    expect(screen.queryByText('Pikachu')).not.toBeInTheDocument();

    // Click para expandir - usar el div con role="button" (no el botón de borrar)
    const expandButtons = screen.getAllByRole('button');
    const expandHeader = expandButtons.find(btn => btn.classList.contains('history-header'));
    fireEvent.click(expandHeader!);

    // Ahora se ven los Pokémon
    expect(screen.getByText('Pokémon en esta partida:')).toBeInTheDocument();
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    expect(screen.getByText('Charmander')).toBeInTheDocument();

    // Verificar que se muestran los sprites
    const sprites = screen.getAllByRole('img');
    expect(sprites).toHaveLength(2);
    expect(sprites[0]).toHaveAttribute('src', 'http://example.com/pikachu.png');
    expect(sprites[1]).toHaveAttribute('src', 'http://example.com/charmander.png');

    // Click para colapsar
    fireEvent.click(expandHeader!);

    // Ya no se ven los detalles
    expect(screen.queryByText('Pokémon en esta partida:')).not.toBeInTheDocument();
  });

  it('muestra mensaje legacy para partidas sin datos de Pokémon', () => {
    const mockSession: GameSession = {
      id: 'session-1',
      startedAt: new Date(),
      lastUpdated: new Date(),
      history: {
        games: [
          {
            id: 'game-1',
            timestamp: new Date(),
            pairCount: 8,
            player1Name: 'Ash',
            player1Score: 800,
            player2Name: 'Misty',
            player2Score: 750,
            winner: 1,
            duration: 120,
            // Sin campo pokemons (partida antigua)
          },
        ],
      },
      wins: { player1Wins: 1, player2Wins: 0, ties: 0 },
      player1Name: 'Ash',
      player2Name: 'Misty',
    };

    vi.mocked(useSessionStore).mockReturnValue(mockSession);

    render(<GameHistory />);

    // Expandir detalles
    const expandButtons = screen.getAllByRole('button');
    const expandHeader = expandButtons.find(btn => btn.classList.contains('history-header'));
    fireEvent.click(expandHeader!);

    // Verificar mensaje legacy
    expect(screen.getByText('Partida anterior al sistema de Pokémon')).toBeInTheDocument();
    expect(screen.getByText('🎮')).toBeInTheDocument();
  });

  it('muestra mensaje legacy para partidas con array vacío de Pokémon', () => {
    const mockSession: GameSession = {
      id: 'session-1',
      startedAt: new Date(),
      lastUpdated: new Date(),
      history: {
        games: [
          {
            id: 'game-1',
            timestamp: new Date(),
            pairCount: 6,
            player1Name: 'Red',
            player1Score: 600,
            player2Name: 'Blue',
            player2Score: 580,
            winner: 1,
            duration: 90,
            pokemons: [], // Array vacío
          },
        ],
      },
      wins: { player1Wins: 1, player2Wins: 0, ties: 0 },
      player1Name: 'Red',
      player2Name: 'Blue',
    };

    vi.mocked(useSessionStore).mockReturnValue(mockSession);

    render(<GameHistory />);

    // Expandir detalles
    const expandButtons = screen.getAllByRole('button');
    const expandHeader = expandButtons.find(btn => btn.classList.contains('history-header'));
    fireEvent.click(expandHeader!);

    // Verificar mensaje legacy
    expect(screen.getByText('Partida anterior al sistema de Pokémon')).toBeInTheDocument();
  });

  it('formatea correctamente la duración en formato MM:SS', () => {
    const mockSession: GameSession = {
      id: 'session-1',
      startedAt: new Date(),
      lastUpdated: new Date(),
      history: {
        games: [
          {
            id: 'game-1',
            timestamp: new Date(),
            pairCount: 6,
            player1Name: 'Ash',
            player1Score: 600,
            player2Name: 'Gary',
            player2Score: 550,
            winner: 1,
            duration: 185, // 3 minutos 5 segundos
          },
          {
            id: 'game-2',
            timestamp: new Date(),
            pairCount: 6,
            player1Name: 'Ash',
            player1Score: 620,
            player2Name: 'Gary',
            player2Score: 600,
            winner: 1,
            duration: 45, // 0 minutos 45 segundos
          },
        ],
      },
      wins: { player1Wins: 2, player2Wins: 0, ties: 0 },
      player1Name: 'Ash',
      player2Name: 'Gary',
    };

    vi.mocked(useSessionStore).mockReturnValue(mockSession);

    render(<GameHistory />);

    expect(screen.getByText(/03:05/)).toBeInTheDocument();
    expect(screen.getByText(/00:45/)).toBeInTheDocument();
  });

  it('muestra "--:--" cuando no hay duration', () => {
    const mockSession: GameSession = {
      id: 'session-1',
      startedAt: new Date(),
      lastUpdated: new Date(),
      history: {
        games: [
          {
            id: 'game-1',
            timestamp: new Date(),
            pairCount: 6,
            player1Name: 'Ash',
            player1Score: 600,
            player2Name: 'Gary',
            player2Score: 550,
            winner: 1,
            // Sin duration
          },
        ],
      },
      wins: { player1Wins: 1, player2Wins: 0, ties: 0 },
      player1Name: 'Ash',
      player2Name: 'Gary',
    };

    vi.mocked(useSessionStore).mockReturnValue(mockSession);

    render(<GameHistory />);
    expect(screen.getByText(/--:--/)).toBeInTheDocument();
  });

  it('capitaliza correctamente los nombres de Pokémon', () => {
    const mockPokemons: Pokemon[] = [
      { id: 25, name: 'pikachu', sprite: 'http://example.com/pikachu.png' },
      { id: 143, name: 'snorlax', sprite: 'http://example.com/snorlax.png' },
    ];

    const mockSession: GameSession = {
      id: 'session-1',
      startedAt: new Date(),
      lastUpdated: new Date(),
      history: {
        games: [
          {
            id: 'game-1',
            timestamp: new Date(),
            pairCount: 6,
            player1Name: 'Ash',
            player1Score: 600,
            player2Name: 'Gary',
            player2Score: 550,
            winner: 1,
            duration: 60,
            pokemons: mockPokemons,
          },
        ],
      },
      wins: { player1Wins: 1, player2Wins: 0, ties: 0 },
      player1Name: 'Ash',
      player2Name: 'Gary',
    };

    vi.mocked(useSessionStore).mockReturnValue(mockSession);

    render(<GameHistory />);

    // Expandir
    const expandButtons = screen.getAllByRole('button');
    const expandHeader = expandButtons.find(btn => btn.classList.contains('history-header'));
    fireEvent.click(expandHeader!);

    // Verificar capitalización
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    expect(screen.getByText('Snorlax')).toBeInTheDocument();
  });

  it('permite navegación con teclado (Enter y Space)', () => {
    const mockPokemons: Pokemon[] = [
      { id: 25, name: 'pikachu', sprite: 'http://example.com/pikachu.png' },
    ];

    const mockSession: GameSession = {
      id: 'session-1',
      startedAt: new Date(),
      lastUpdated: new Date(),
      history: {
        games: [
          {
            id: 'game-1',
            timestamp: new Date(),
            pairCount: 6,
            player1Name: 'Ash',
            player1Score: 600,
            player2Name: 'Gary',
            player2Score: 550,
            winner: 1,
            duration: 60,
            pokemons: mockPokemons,
          },
        ],
      },
      wins: { player1Wins: 1, player2Wins: 0, ties: 0 },
      player1Name: 'Ash',
      player2Name: 'Gary',
    };

    vi.mocked(useSessionStore).mockReturnValue(mockSession);

    render(<GameHistory />);

    const expandButtons = screen.getAllByRole('button');
    const header = expandButtons.find(btn => btn.classList.contains('history-header'))!;

    // Inicialmente colapsado
    expect(screen.queryByText('Pokémon en esta partida:')).not.toBeInTheDocument();

    // Expandir con Enter
    fireEvent.keyDown(header, { key: 'Enter' });
    expect(screen.getByText('Pokémon en esta partida:')).toBeInTheDocument();

    // Colapsar con Space
    fireEvent.keyDown(header, { key: ' ' });
    expect(screen.queryByText('Pokémon en esta partida:')).not.toBeInTheDocument();
  });

  it('renderiza múltiples partidas correctamente', () => {
    const mockSession: GameSession = {
      id: 'session-1',
      startedAt: new Date(),
      lastUpdated: new Date(),
      history: {
        games: [
          {
            id: 'game-1',
            timestamp: new Date('2025-01-01T10:00:00'),
            pairCount: 6,
            player1Name: 'Ash',
            player1Score: 600,
            player2Name: 'Gary',
            player2Score: 550,
            winner: 1,
            duration: 60,
          },
          {
            id: 'game-2',
            timestamp: new Date('2025-01-01T11:00:00'),
            pairCount: 8,
            player1Name: 'Ash',
            player1Score: 750,
            player2Name: 'Gary',
            player2Score: 800,
            winner: 2,
            duration: 90,
          },
          {
            id: 'game-3',
            timestamp: new Date('2025-01-01T12:00:00'),
            pairCount: 10,
            player1Name: 'Ash',
            player1Score: 900,
            player2Name: 'Gary',
            player2Score: 900,
            winner: 'tie',
            duration: 120,
          },
        ],
      },
      wins: { player1Wins: 1, player2Wins: 1, ties: 1 },
      player1Name: 'Ash',
      player2Name: 'Gary',
    };

    vi.mocked(useSessionStore).mockReturnValue(mockSession);

    render(<GameHistory />);

    // Verificar que se muestran las 3 partidas
    expect(screen.getByText('🏆 Ash')).toBeInTheDocument();
    expect(screen.getByText('🏆 Gary')).toBeInTheDocument();
    expect(screen.getByText('🏆 Empate')).toBeInTheDocument();

    expect(screen.getByText('6 parejas')).toBeInTheDocument();
    expect(screen.getByText('8 parejas')).toBeInTheDocument();
    expect(screen.getByText('10 parejas')).toBeInTheDocument();
  });
});
