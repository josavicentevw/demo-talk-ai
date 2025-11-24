import { useState } from 'react';
import { useGameStore } from '../store/game-store';
import { useSessionStore } from '../store/session-store';
import { DEFAULT_PLAYER1_NAME, DEFAULT_PLAYER2_NAME } from '../constants/game';

interface PlayerNameEditorProps {
  playerId: 1 | 2;
}

export function PlayerNameEditor({ playerId }: PlayerNameEditorProps) {
  const session = useSessionStore((state) => state.session);
  const updatePlayerNames = useSessionStore((state) => state.updatePlayerNames);
  const playerNames = {
    player1: session?.player1Name || DEFAULT_PLAYER1_NAME,
    player2: session?.player2Name || DEFAULT_PLAYER2_NAME,
  };
  const { setPlayerName } = useGameStore();
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState('');

  const currentName = playerId === 1 ? playerNames.player1 : playerNames.player2;

  const handleStartEdit = () => {
    setTempName(currentName);
    setIsEditing(true);
  };

  const handleSave = () => {
    const trimmedName = tempName.trim();
    if (trimmedName) {
      // Actualizar en session-store
      updatePlayerNames(
        playerId === 1 ? trimmedName : playerNames.player1,
        playerId === 2 ? trimmedName : playerNames.player2
      );
      // Sincronizar con game-store
      setPlayerName(playerId, trimmedName);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setTempName('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  if (isEditing) {
    return (
      <div className="player-name-editor editing">
        <input
          type="text"
          value={tempName}
          onChange={(e) => setTempName(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleSave}
          autoFocus
          maxLength={20}
          className="name-input"
        />
      </div>
    );
  }

  return (
    <div className="player-name-editor" onClick={handleStartEdit}>
      <h3 className="player-name">{currentName}</h3>
      <button className="edit-icon" aria-label="Editar nombre">
        ✏️
      </button>
    </div>
  );
}
