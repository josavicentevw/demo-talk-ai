import { useSessionStore } from '../store/session-store';
import { DEFAULT_PLAYER1_NAME, DEFAULT_PLAYER2_NAME } from '../constants/game';
import type { GameResult } from '../types/session';

export function GameHistory() {
  const currentSession = useSessionStore((state) => state.session);
  const playerNames = {
    player1: currentSession?.player1Name || DEFAULT_PLAYER1_NAME,
    player2: currentSession?.player2Name || DEFAULT_PLAYER2_NAME,
  };

  if (!currentSession || currentSession.history.games.length === 0) {
    return (
      <div className="game-history">
        <h3 className="history-title">📜 Historial</h3>
        <p className="history-empty">No hay partidas jugadas aún</p>
      </div>
    );
  }

  const formatDate = (timestamp: Date) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getWinnerName = (winner: 1 | 2 | 'tie') => {
    if (winner === 'tie') return 'Empate';
    return winner === 1 ? playerNames.player1 : playerNames.player2;
  };

  return (
    <div className="game-history">
      <h3 className="history-title">📜 Historial</h3>
      <div className="history-list">
        {currentSession.history.games.map((game: GameResult, index: number) => (
          <div key={index} className="history-item">
            <div className="history-header">
              <span className="history-time">{formatDate(game.timestamp)}</span>
              <span className="history-winner">{getWinnerName(game.winner)}</span>
            </div>
            <div className="history-scores">
              <span className="score-item">
                {playerNames.player1}: {game.player1Score}
              </span>
              <span className="score-divider">-</span>
              <span className="score-item">
                {playerNames.player2}: {game.player2Score}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
