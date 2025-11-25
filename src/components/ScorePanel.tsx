import { useGameStore } from '../store/game-store';
import { useSessionStore } from '../store/session-store';
import { PlayerNameEditor } from './PlayerNameEditor';

export function ScorePanel() {
  const { player1, player2, currentPlayer, gameStatus } = useGameStore();
  const session = useSessionStore((state) => state.session);
  const wins = session?.wins || { player1Wins: 0, player2Wins: 0, ties: 0 };

  const isPlayer1Active = currentPlayer === 1;
  const isPlayer2Active = currentPlayer === 2;

  return (
    <div className="score-panel">
      {/* Player 1 */}
      <div
        className={`player-card ${isPlayer1Active ? 'active' : ''}`}
      >
        <div className="player-header">
          <PlayerNameEditor playerId={1} />
          <div className="wins-badge">{wins.player1Wins} 🏆</div>
        </div>
        <div className="score-display">
          <span className="score-value">{player1.score}</span>
          <span className="score-label">puntos</span>
        </div>
        <div className="player-stats">
          <div className="stat-item">
            <span className="stat-label">Parejas:</span>
            <span className="stat-value">{player1.pairsFound}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Racha:</span>
            <span className="stat-value">
              {player1.currentStreak > 0 ? `🔥 ${player1.currentStreak}` : '-'}
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Fallos:</span>
            <span className="stat-value">{player1.missedAttempts}</span>
          </div>
        </div>
      </div>

      {/* VS Divider with Active Player Indicator */}
      <div className="vs-divider">
        {gameStatus === 'playing' && (
          <div className="turn-indicator">
            <div className={`arrow-indicator ${isPlayer1Active ? 'left' : 'right'}`}>
              {isPlayer1Active ? '◄' : '►'}
            </div>
            <div className="turn-text">
              Turno de<br />
              <strong>{isPlayer1Active ? player1.name : player2.name}</strong>
            </div>
          </div>
        )}
        <span className="vs-text">VS</span>
      </div>

      {/* Player 2 */}
      <div
        className={`player-card ${isPlayer2Active ? 'active' : ''}`}
      >
        <div className="player-header">
          <PlayerNameEditor playerId={2} />
          <div className="wins-badge">{wins.player2Wins} 🏆</div>
        </div>
        <div className="score-display">
          <span className="score-value">{player2.score}</span>
          <span className="score-label">puntos</span>
        </div>
        <div className="player-stats">
          <div className="stat-item">
            <span className="stat-label">Parejas:</span>
            <span className="stat-value">{player2.pairsFound}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Racha:</span>
            <span className="stat-value">
              {player2.currentStreak > 0 ? `🔥 ${player2.currentStreak}` : '-'}
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Fallos:</span>
            <span className="stat-value">{player2.missedAttempts}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
