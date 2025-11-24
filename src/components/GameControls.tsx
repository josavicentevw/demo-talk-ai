interface GameControlsProps {
  onNewGame: () => void;
  onReset: () => void;
  onOpenConfig: () => void;
  isPlaying: boolean;
}

export function GameControls({
  onNewGame,
  onReset,
  onOpenConfig,
  isPlaying,
}: GameControlsProps) {
  return (
    <div className="game-controls">
      <button onClick={onNewGame} className="btn btn-primary">
        🎮 Nueva Partida
      </button>
      {isPlaying && (
        <button onClick={onReset} className="btn btn-secondary">
          🔄 Reiniciar
        </button>
      )}
      <button onClick={onOpenConfig} className="btn btn-secondary">
        ⚙️ Configuración
      </button>
    </div>
  );
}
