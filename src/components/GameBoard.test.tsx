import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { GameBoard } from './GameBoard';
import type { Card } from '../types/game';

// Mock del store
vi.mock('../store/game-store', () => ({
  useGameStore: () => ({
    cards: mockCards,
    config: { pairCount: 6 },
    selectCard: vi.fn(),
    isProcessing: false,
  }),
}));

// Mock del componente Card
vi.mock('./Card', () => ({
  Card: ({ card }: { card: Card }) => (
    <div data-testid={`card-${card.id}`}>{card.pokemonName}</div>
  ),
}));

const mockCards: Card[] = [
  {
    id: 'pikachu-a',
    pokemonId: 25,
    pokemonName: 'pikachu',
    sprite: 'sprite1.png',
    state: 'hidden',
  },
  {
    id: 'pikachu-b',
    pokemonId: 25,
    pokemonName: 'pikachu',
    sprite: 'sprite1.png',
    state: 'hidden',
  },
  {
    id: 'charmander-a',
    pokemonId: 4,
    pokemonName: 'charmander',
    sprite: 'sprite2.png',
    state: 'hidden',
  },
  {
    id: 'charmander-b',
    pokemonId: 4,
    pokemonName: 'charmander',
    sprite: 'sprite2.png',
    state: 'hidden',
  },
];

describe('GameBoard', () => {
  it('renders all cards', () => {
    render(<GameBoard />);
    expect(screen.getByTestId('card-pikachu-a')).toBeDefined();
    expect(screen.getByTestId('card-pikachu-b')).toBeDefined();
    expect(screen.getByTestId('card-charmander-a')).toBeDefined();
    expect(screen.getByTestId('card-charmander-b')).toBeDefined();
  });

  it('renders cards in a grid layout', () => {
    const { container } = render(<GameBoard />);
    const gameBoard = container.querySelector('.game-board');
    expect(gameBoard).toBeDefined();
  });

  it('renders correct number of cards', () => {
    render(<GameBoard />);
    const cards = screen.getAllByTestId(/card-/);
    expect(cards).toHaveLength(4);
  });
});
