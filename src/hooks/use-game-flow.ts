import { useEffect, useRef } from 'react';
import { useGameStore } from '../store/game-store';
import { CARD_FLIP_DELAY } from '../constants/game';

/**
 * Hook personalizado para gestionar el flujo del juego
 * Maneja la lógica de selección de cartas, matching y delays
 */
export function useGameFlow() {
  const {
    selectedCards,
    cards,
    setProcessing,
    matchCards,
    unmatchCards,
    switchTurn,
    recordMiss,
    clearSelection,
  } = useGameStore();

  const timeoutRef = useRef<number | null>(null);
  const processingRef = useRef(false);

  useEffect(() => {
    // Limpiar timeout al desmontar
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    // Solo procesamos cuando hay exactamente 2 cartas seleccionadas
    if (selectedCards.length !== 2) {
      return;
    }

    // Evitar procesamiento múltiple
    if (processingRef.current) {
      return;
    }

    processingRef.current = true;
    setProcessing(true);

    // Obtener las cartas seleccionadas del estado
    const card1 = cards.find((c) => c.id === selectedCards[0]);
    const card2 = cards.find((c) => c.id === selectedCards[1]);

    if (!card1 || !card2) {
      setProcessing(false);
      processingRef.current = false;
      return;
    }

    // Verificar si las cartas coinciden (mismo pokemonId)
    const isMatch = card1.pokemonId === card2.pokemonId;

    if (isMatch) {
      // ¡Match! Marcar las cartas como emparejadas
      matchCards([card1.id, card2.id]);
      
      // Delay corto antes de limpiar y permitir continuar
      timeoutRef.current = window.setTimeout(() => {
        clearSelection();
        setProcessing(false);
        processingRef.current = false;
      }, 600);
    } else {
      // No match - esperar CARD_FLIP_DELAY antes de voltear las cartas
      recordMiss();
      
      timeoutRef.current = window.setTimeout(() => {
        unmatchCards();
        switchTurn();
        setProcessing(false);
        processingRef.current = false;
      }, CARD_FLIP_DELAY);
    }
  }, [selectedCards.length, selectedCards[0], selectedCards[1], cards, setProcessing, matchCards, unmatchCards, switchTurn, recordMiss, clearSelection]);
}
