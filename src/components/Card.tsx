import { useGameStore } from '../store/game-store';
import type { Card as CardType } from '../types/game';

interface CardProps {
  card: CardType;
}

export function Card({ card }: CardProps) {
  const { selectCard, isProcessing } = useGameStore();

  const handleClick = () => {
    if (card.state === 'hidden' && !isProcessing) {
      selectCard(card.id);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`
        card
        ${card.state === 'hidden' ? 'card-hidden' : 'card-revealed'}
        ${card.state === 'matched' ? 'card-matched' : ''}
      `}
    >
      <div className="card-inner">
        {/* Card back */}
        <div className="card-face card-back">
          <div className="pokeball-icon">
            <div className="pokeball-top"></div>
            <div className="pokeball-center"></div>
            <div className="pokeball-bottom"></div>
          </div>
        </div>

        {/* Card front */}
        <div className="card-face card-front">
          {card.sprite && (
            <img
              src={card.sprite}
              alt={card.pokemonName}
              className="pokemon-sprite"
              style={{ width: '175%', maxWidth: '350px', height: 'auto' }}
            />
          )}
          <p className="pokemon-name">{card.pokemonName}</p>
        </div>
      </div>
    </div>
  );
}
