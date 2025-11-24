import { describe, it, expect } from 'vitest';
import { shuffleArray, chunkArray, getRandomItems } from './array-helpers';

describe('array-helpers', () => {
  describe('shuffleArray', () => {
    it('returns array with same length', () => {
      const input = [1, 2, 3, 4, 5];
      const result = shuffleArray(input);
      expect(result).toHaveLength(input.length);
    });

    it('contains all original elements', () => {
      const input = [1, 2, 3, 4, 5];
      const result = shuffleArray(input);
      expect(result.sort()).toEqual(input.sort());
    });

    it('does not mutate original array', () => {
      const input = [1, 2, 3, 4, 5];
      const original = [...input];
      shuffleArray(input);
      expect(input).toEqual(original);
    });

    it('returns different order (statistically)', () => {
      const input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      const results = new Set();
      
      // Mezclar 10 veces y verificar que al menos haya variación
      for (let i = 0; i < 10; i++) {
        const shuffled = shuffleArray(input).join(',');
        results.add(shuffled);
      }
      
      // Debería haber al menos 5 ordenaciones diferentes
      expect(results.size).toBeGreaterThanOrEqual(5);
    });
  });

  describe('chunkArray', () => {
    it('divides array into chunks of specified size', () => {
      const input = [1, 2, 3, 4, 5, 6];
      const result = chunkArray(input, 2);
      expect(result).toEqual([[1, 2], [3, 4], [5, 6]]);
    });

    it('handles last chunk with remaining elements', () => {
      const input = [1, 2, 3, 4, 5];
      const result = chunkArray(input, 2);
      expect(result).toEqual([[1, 2], [3, 4], [5]]);
    });

    it('returns single chunk if size >= array length', () => {
      const input = [1, 2, 3];
      const result = chunkArray(input, 5);
      expect(result).toEqual([[1, 2, 3]]);
    });
  });

  describe('getRandomItems', () => {
    it('returns requested number of items', () => {
      const input = [1, 2, 3, 4, 5];
      const result = getRandomItems(input, 3);
      expect(result).toHaveLength(3);
    });

    it('returns unique items', () => {
      const input = [1, 2, 3, 4, 5];
      const result = getRandomItems(input, 3);
      const uniqueResult = [...new Set(result)];
      expect(uniqueResult).toHaveLength(result.length);
    });

    it('handles count larger than array', () => {
      const input = [1, 2, 3];
      const result = getRandomItems(input, 5);
      expect(result).toHaveLength(3);
    });

    it('does not mutate original array', () => {
      const input = [1, 2, 3, 4, 5];
      const original = [...input];
      getRandomItems(input, 3);
      expect(input).toEqual(original);
    });
  });
});
