/**
 * Mezcla un array usando el algoritmo Fisher-Yates
 * @param array Array a mezclar
 * @returns Nuevo array mezclado
 */
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Divide un array en chunks de un tamaño específico
 * @param array Array a dividir
 * @param size Tamaño de cada chunk
 * @returns Array de chunks
 */
export function chunkArray<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

/**
 * Selecciona elementos aleatorios únicos de un array
 * @param array Array fuente
 * @param count Número de elementos a seleccionar
 * @returns Array con elementos aleatorios únicos
 */
export function getRandomItems<T>(array: T[], count: number): T[] {
  const shuffled = shuffleArray(array);
  return shuffled.slice(0, Math.min(count, array.length));
}
