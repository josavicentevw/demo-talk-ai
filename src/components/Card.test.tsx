import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Card } from './Card';
import type { Card as CardType } from '../types/game';

const mockSelectCard = vi.fn();
const mockIsProcessing = { value: false };

// Mock del store de Zustand
vi.mock('../store/game-store', () => ({
  useGameStore: vi.fn((selector) => {
    const state = {
      selectCard: mockSelectCard,
      isProcessing: mockIsProcessing.value,
    };
    return selector ? selector(state) : state;
  }),
}));

describe('Card', () => {
  const mockCard: CardType = {
    id: 'pikachu-a',
    pokemonId: 25,
    pokemonName: 'pikachu',
    sprite: 'https://example.com/pikachu.png',
    state: 'hidden',
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockIsProcessing.value = false;
  });

  it('renders card with hidden state', () => {
    render(<Card card={mockCard} />);
    const card = screen.getByRole('img', { hidden: true });
    expect(card).toBeDefined();
  });

  it('renders card with revealed state showing Pokemon name', () => {
    const revealedCard = { ...mockCard, state: 'revealed' as const };
    render(<Card card={revealedCard} />);
    expect(screen.getByText('pikachu')).toBeDefined();
  });

  it('renders card with matched state', () => {
    const matchedCard = { ...mockCard, state: 'matched' as const };
    const { container } = render(<Card card={matchedCard} />);
    const cardElement = container.querySelector('.card-matched');
    expect(cardElement).toBeDefined();
  });

  it('calls selectCard when clicked in hidden state', async () => {
    const user = userEvent.setup();
    const { container } = render(<Card card={mockCard} />);
    const cardElement = container.querySelector('.card');
    if (cardElement) {
      await user.click(cardElement);
    }
    expect(mockSelectCard).toHaveBeenCalledWith('pikachu-a');
  });

  it('does not call selectCard when isProcessing is true', async () => {
    mockIsProcessing.value = true;
    
    const user = userEvent.setup();
    const { container } = render(<Card card={mockCard} />);
    const cardElement = container.querySelector('.card');
    if (cardElement) {
      await user.click(cardElement);
    }
    expect(mockSelectCard).not.toHaveBeenCalled();
  });
});
