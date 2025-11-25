import { useState, useEffect } from 'react';
import { useGameStore } from './store/game-store';
import { useSessionStore } from './store/session-store';
import { GameBoard } from './components/GameBoard';
import { ScorePanel } from './components/ScorePanel';
import { GameControls } from './components/GameControls';
import { ConfigModal } from './components/ConfigModal';
import { VictoryModal } from './components/VictoryModal';
import { GameHistory } from './components/GameHistory';
import { useGameFlow } from './hooks/use-game-flow';
import { usePokemonLoader } from './hooks/use-pokemon-loader';
import { localStorageSessionService } from './services/storage/local-storage-session.service';
import type { GameResult } from './types/session';
import './App.css';
import './components/components.css';

function App() {
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [isVictoryOpen, setIsVictoryOpen] = useState(false);

  const {
    status,
    config,
    cards,
    player1,
    player2,
    matchedPairs,
    setConfig,
    setPlayerName,
    resetForNewGame,
    setStatus,
    endTimer,
    getDuration,
  } = useGameStore();

  const {
    session,
    startSession,
    addGameToHistory,
    incrementWins,
    loadSession,
  } = useSessionStore();

  const { isLoading, loadPokemons } = usePokemonLoader();
  
  // Hook para gestionar el flujo del juego
  useGameFlow();

  // Cargar sesión al montar el componente
  useEffect(() => {
    const savedSession = localStorageSessionService.loadSession();
    if (savedSession) {
      loadSession(savedSession);
      // Sincronizar nombres desde session-store a game-store al cargar
      setPlayerName(1, savedSession.player1Name);
      setPlayerName(2, savedSession.player2Name);
    } else {
      startSession();
    }
  }, [loadSession, startSession, setPlayerName]);

  // Persistir sesión cuando cambie
  useEffect(() => {
    if (session) {
      localStorageSessionService.saveSession(session);
    }
  }, [session]);

  // Detectar victoria y registrar en historial
  useEffect(() => {
    if (status === 'playing' && matchedPairs === config.pairCount && !isVictoryOpen) {
      // Marcar fin del timer
      endTimer();
      const duration = getDuration();

      // Extraer Pokémon únicos del array de cartas
      const uniquePokemons = Array.from(
        new Map(
          cards.map(card => [
            card.pokemonId,
            {
              id: card.pokemonId,
              name: card.pokemonName,
              sprite: card.sprite,
            }
          ])
        ).values()
      );

      // Game finished, determine winner
      let winner: 1 | 2 | 'tie';
      if (player1.score > player2.score) {
        winner = 1;
      } else if (player2.score > player1.score) {
        winner = 2;
      } else {
        winner = 'tie';
      }

      // Add to history
      const gameResult: GameResult = {
        id: `game-${Date.now()}`,
        timestamp: new Date(),
        pairCount: config.pairCount,
        player1Name: player1.name,
        player1Score: player1.score,
        player2Name: player2.name,
        player2Score: player2.score,
        winner,
        duration,
        pokemons: uniquePokemons,
      };

      addGameToHistory(gameResult);
      incrementWins(winner);
      setStatus('finished');
      setIsVictoryOpen(true);
    }
  }, [status, matchedPairs, config.pairCount, isVictoryOpen, cards, player1.score, player2.score, player1.name, player2.name, addGameToHistory, incrementWins, setStatus, endTimer, getDuration]);

  const handleStartNewGame = async (pairCount?: number) => {
    try {
      setIsConfigOpen(false);
      setIsVictoryOpen(false);

      if (pairCount) {
        setConfig({ pairCount: pairCount as 6 | 8 | 10 | 12 });
      }

      setStatus('loading');
      const deck = await loadPokemons(pairCount || config.pairCount);
      
      // Resetear el juego completo con scores en 0
      resetForNewGame(deck);
    } catch (error) {
      console.error('Error starting game:', error);
      alert('Error al cargar los Pokémon. Por favor, intenta de nuevo.');
      setStatus('configuring');
    }
  };

  const handleReset = async () => {
    try {
      setStatus('loading');
      const deck = await loadPokemons(config.pairCount);
      resetForNewGame(deck);
    } catch (error) {
      console.error('Error resetting game:', error);
      alert('Error al reiniciar el juego. Por favor, intenta de nuevo.');
    }
  };

  const handleSaveConfig = (pairCount: number) => {
    handleStartNewGame(pairCount);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">
          <span className="pokeball-emoji">⚪</span>
          Gotta Match 'Em All!
          <span className="pokeball-emoji">⚪</span>
        </h1>
        <p className="app-subtitle">Juego de memoria Pokémon • Gen 1</p>
      </header>

      <main className="app-main">
        {status === 'configuring' && (
          <div className="welcome-screen">
            <h2>¡Bienvenido entrenador!</h2>
            <p>Configura el juego para comenzar</p>
            <button
              onClick={() => setIsConfigOpen(true)}
              className="btn btn-primary btn-large"
            >
              ⚙️ Configurar Juego
            </button>
          </div>
        )}

        {status === 'loading' && (
          <div className="loading-screen">
            <div className="loading-spinner"></div>
            <p>Cargando Pokémon...</p>
          </div>
        )}

        {(status === 'playing' || status === 'finished') && (
          <>
            <ScorePanel />
            <GameBoard />
            <GameControls
              onNewGame={() => handleStartNewGame()}
              onReset={handleReset}
              onOpenConfig={() => setIsConfigOpen(true)}
              isPlaying={status === 'playing'}
            />
            <GameHistory />
          </>
        )}
      </main>

      <ConfigModal
        isOpen={isConfigOpen}
        onClose={() => setIsConfigOpen(false)}
        onSave={handleSaveConfig}
        currentPairs={config.pairCount}
      />

      <VictoryModal
        isOpen={isVictoryOpen}
        winner={
          player1.score > player2.score
            ? 'player1'
            : player2.score > player1.score
            ? 'player2'
            : 'tie'
        }
        player1={player1}
        player2={player2}
        player1Name={player1.name}
        player2Name={player2.name}
        onNewGame={() => {
          setIsVictoryOpen(false);
          handleStartNewGame();
        }}
        onClose={() => setIsVictoryOpen(false)}
      />

      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>
      )}
    </div>
  );
}

export default App;
