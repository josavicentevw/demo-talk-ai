import type { Player } from '../types/game';

interface VictoryModalProps {
  isOpen: boolean;
  winner: 'player1' | 'player2' | 'tie' | null;
  player1: Player;
  player2: Player;
  player1Name: string;
  player2Name: string;
  onNewGame: () => void;
  onClose: () => void;
}

export function VictoryModal({
  isOpen,
  winner,
  player1,
  player2,
  player1Name,
  player2Name,
  onNewGame,
  onClose,
}: VictoryModalProps) {
  if (!isOpen || !winner) return null;

  const getWinnerMessage = () => {
    if (winner === 'tie') {
      return '🤝 ¡Empate!';
    }
    const winnerName = winner === 'player1' ? player1Name : player2Name;
    return `🏆 ¡${winnerName} gana!`;
  };

  const getWinnerEmoji = () => {
    if (winner === 'tie') return '🤝';
    return '🎉';
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content victory-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{getWinnerMessage()}</h2>
          <button onClick={onClose} className="close-btn">
            ✖
          </button>
        </div>

        <div className="modal-body">
          <div className="victory-emoji">{getWinnerEmoji()}</div>

          <div className="final-scores">
            <div
              className={`player-final-score ${
                winner === 'player1' ? 'winner' : ''
              }`}
            >
              <h3>{player1Name}</h3>
              <div className="final-score-value">{player1.score}</div>
              <div className="final-stats">
                <div>Parejas: {player1.pairsFound}</div>
                <div>Racha máx: {player1.currentStreak}</div>
              </div>
            </div>

            <div className="vs-divider">VS</div>

            <div
              className={`player-final-score ${
                winner === 'player2' ? 'winner' : ''
              }`}
            >
              <h3>{player2Name}</h3>
              <div className="final-score-value">{player2.score}</div>
              <div className="final-stats">
                <div>Parejas: {player2.pairsFound}</div>
                <div>Racha máx: {player2.currentStreak}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button onClick={onClose} className="btn btn-secondary">
            Ver tablero
          </button>
          <button onClick={onNewGame} className="btn btn-primary">
            🎮 Nueva Partida
          </button>
        </div>
      </div>
    </div>
  );
}
