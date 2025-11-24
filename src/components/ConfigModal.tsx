import { useState } from 'react';

interface ConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (numberOfPairs: number) => void;
  currentPairs: number;
}

export function ConfigModal({
  isOpen,
  onClose,
  onSave,
  currentPairs,
}: ConfigModalProps) {
  const [pairs, setPairs] = useState(currentPairs);

  const handleSave = () => {
    onSave(pairs);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>⚙️ Configuración del Juego</h2>
          <button onClick={onClose} className="close-btn">
            ✖
          </button>
        </div>

        <div className="modal-body">
          <div className="config-section">
            <label htmlFor="pairs-input" className="config-label">
              Número de parejas:
            </label>
            <div className="pairs-selector">
              <button
                onClick={() => setPairs(Math.max(4, pairs - 1))}
                className="btn-adjust"
                disabled={pairs <= 4}
              >
                -
              </button>
              <input
                id="pairs-input"
                type="number"
                min="4"
                max="15"
                value={pairs}
                onChange={(e) =>
                  setPairs(Math.min(15, Math.max(4, Number(e.target.value))))
                }
                className="pairs-input"
              />
              <button
                onClick={() => setPairs(Math.min(15, pairs + 1))}
                className="btn-adjust"
                disabled={pairs >= 15}
              >
                +
              </button>
            </div>
            <p className="config-hint">Total de cartas: {pairs * 2}</p>
          </div>

          <div className="preset-buttons">
            <button onClick={() => setPairs(6)} className="btn-preset">
              Fácil (6 parejas)
            </button>
            <button onClick={() => setPairs(10)} className="btn-preset">
              Medio (10 parejas)
            </button>
            <button onClick={() => setPairs(15)} className="btn-preset">
              Difícil (15 parejas)
            </button>
          </div>
        </div>

        <div className="modal-footer">
          <button onClick={onClose} className="btn btn-secondary">
            Cancelar
          </button>
          <button onClick={handleSave} className="btn btn-primary">
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}
