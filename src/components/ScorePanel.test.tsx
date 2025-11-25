import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ScorePanel } from './ScorePanel';

// Mock de los stores
vi.mock('../store/game-store', () => ({
  useGameStore: () => ({
    player1: {
      id: 1,
      name: 'Jugador 1',
      score: 150,
      pairsFound: 3,
      currentStreak: 2,
      missedAttempts: 1,
    },
    player2: {
      id: 2,
      name: 'Jugador 2',
      score: 100,
      pairsFound: 2,
      currentStreak: 0,
      missedAttempts: 2,
    },
    currentPlayer: 1,
    gameStatus: 'playing',
  }),
}));

vi.mock('../store/session-store', () => ({
  useSessionStore: (selector?: (state: any) => any) => {
    const mockState = {
      session: {
        wins: {
          player1Wins: 5,
          player2Wins: 3,
          ties: 1,
        },
      },
    };
    return selector ? selector(mockState) : mockState;
  },
}));

vi.mock('./PlayerNameEditor', () => ({
  PlayerNameEditor: ({ playerId }: { playerId: number }) => (
    <div data-testid={`player-name-${playerId}`}>Jugador {playerId}</div>
  ),
}));

describe('ScorePanel', () => {
  it('renders both players', () => {
    render(<ScorePanel />);
    expect(screen.getByTestId('player-name-1')).toBeDefined();
    expect(screen.getByTestId('player-name-2')).toBeDefined();
  });

  it('displays player 1 score', () => {
    render(<ScorePanel />);
    expect(screen.getByText('150')).toBeDefined();
  });

  it('displays player 2 score', () => {
    render(<ScorePanel />);
    expect(screen.getByText('100')).toBeDefined();
  });

  it('displays pairs found for both players', () => {
    render(<ScorePanel />);
    const parejas = screen.getAllByText(/Parejas:/);
    expect(parejas).toHaveLength(2);
  });

  it('displays win count for both players', () => {
    render(<ScorePanel />);
    expect(screen.getByText('5 🏆')).toBeDefined();
    expect(screen.getByText('3 🏆')).toBeDefined();
  });

  it('shows active player with green border', () => {
    render(<ScorePanel />);
    const cards = document.querySelectorAll('.player-card');
    expect(cards[0].classList.contains('active')).toBe(true);
    expect(cards[1].classList.contains('active')).toBe(false);
  });

  it('displays streak for player 1', () => {
    render(<ScorePanel />);
    expect(screen.getByText('🔥 2')).toBeDefined();
  });

  it('displays VS divider', () => {
    render(<ScorePanel />);
    expect(screen.getByText('VS')).toBeDefined();
  });
});
