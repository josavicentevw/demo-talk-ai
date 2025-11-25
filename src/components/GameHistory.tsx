import { useState } from 'react';
import { useSessionStore } from '../store/session-store';
import { DEFAULT_PLAYER1_NAME, DEFAULT_PLAYER2_NAME } from '../constants/game';
import type { GameResult } from '../types/session';

export function GameHistory() {
  const [expandedGameId, setExpandedGameId] = useState<string | null>(null);
  const currentSession = useSessionStore((state) => state.session);
  const clearHistory = useSessionStore((state) => state.clearHistory);
  const playerNames = {
    player1: currentSession?.player1Name || DEFAULT_PLAYER1_NAME,
    player2: currentSession?.player2Name || DEFAULT_PLAYER2_NAME,
  };

  if (!currentSession || currentSession.history.games.length === 0) {
    return (
      <div className="game-history">
        <h3 className="history-title">📜 Historial de Partidas</h3>
        <p className="history-empty">No hay partidas jugadas aún</p>
      </div>
    );
  }

  const handleClearHistory = () => {
    if (window.confirm('¿Estás seguro de que quieres borrar todo el historial de partidas? Esta acción no se puede deshacer.')) {
      clearHistory();
      setExpandedGameId(null);
    }
  };

  const formatDate = (timestamp: Date) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatDuration = (seconds?: number) => {
    if (!seconds) return '--:--';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getWinnerName = (winner: 1 | 2 | 'tie') => {
    if (winner === 'tie') return 'Empate';
    return winner === 1 ? playerNames.player1 : playerNames.player2;
  };

  const toggleExpand = (gameId: string) => {
    setExpandedGameId(expandedGameId === gameId ? null : gameId);
  };

  const capitalizeFirst = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div className="game-history">
      <div className="history-header-container">
        <h3 className="history-title">📜 Historial de Partidas</h3>
        <button 
          onClick={handleClearHistory}
          className="clear-history-button"
          title="Borrar todo el historial"
        >
          🗑️ Borrar Historial
        </button>
      </div>
      <div className="history-list">
        {currentSession.history.games.map((game: GameResult) => {
          const isExpanded = expandedGameId === game.id;
          const hasPokemonData = game.pokemons && game.pokemons.length > 0;
          
          return (
            <div 
              key={game.id} 
              className={`history-item ${isExpanded ? 'expanded' : ''}`}
            >
              <div 
                className="history-header" 
                onClick={() => toggleExpand(game.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleExpand(game.id);
                  }
                }}
              >
                <div className="history-header-left">
                  <span className="history-expand-icon">
                    {isExpanded ? '▼' : '▶'}
                  </span>
                  <span className="history-time">{formatDate(game.timestamp)}</span>
                  <span className="history-winner-badge">
                    🏆 {getWinnerName(game.winner)}
                  </span>
                </div>
                <div className="history-header-right">
                  <span className="history-pairs">
                    {game.pairCount} parejas
                  </span>
                  <span className="history-duration">
                    ⏱️ {formatDuration(game.duration)}
                  </span>
                </div>
              </div>

              <div className="history-scores">
                <span className="score-item">
                  {playerNames.player1}: <strong>{game.player1Score}</strong>
                </span>
                <span className="score-divider">vs</span>
                <span className="score-item">
                  {playerNames.player2}: <strong>{game.player2Score}</strong>
                </span>
              </div>

              {isExpanded && (
                <div className="history-details">
                  {hasPokemonData ? (
                    <>
                      <h4 className="pokemon-section-title">
                        Pokémon en esta partida:
                      </h4>
                      <div className="pokemon-grid">
                        {game.pokemons!.map((pokemon) => (
                          <div 
                            key={pokemon.id} 
                            className="pokemon-thumbnail"
                            title={capitalizeFirst(pokemon.name)}
                          >
                            <img 
                              src={pokemon.sprite} 
                              alt={pokemon.name}
                              className="pokemon-sprite"
                              loading="lazy"
                            />
                            <span className="pokemon-name">
                              {capitalizeFirst(pokemon.name)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="legacy-game-notice">
                      <span className="legacy-icon">🎮</span>
                      <p>Partida anterior al sistema de Pokémon</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
