import { useGameStore } from '../store/game-store';
import { Card } from './Card';
import './Card.css';

export function GameBoard() {
  const { cards, config } = useGameStore();

  // Calculate grid columns based on number of pairs
  const getGridCols = () => {
    const totalCards = config.pairCount * 2;
    if (totalCards <= 12) return 4; // 3x4 or 2x6
    if (totalCards <= 20) return 5; // 4x5
    return 6; // 5x6 or larger
  };

  const gridCols = getGridCols();

  return (
    <div className="game-board-container">
      <div
        className="game-board"
        style={{
          gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
        }}
      >
        {cards.map((card) => (
          <Card key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
}
