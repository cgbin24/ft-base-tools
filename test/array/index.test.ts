import { unique, sort, groupBy, intersection, union, difference, flatten, chunk, shuffle } from '../../src/array';

describe('Array Utils', () => {
  describe('unique', () => {
    it('should remove duplicates from array', () => {
      expect(unique([1, 2, 2, 3, 4, 4, 5])).toEqual([1, 2, 3, 4, 5]);
      expect(unique(['a', 'b', 'a', 'c'])).toEqual(['a', 'b', 'c']);
    });

    it('should handle empty array', () => {
      expect(unique([])).toEqual([]);
    });
  });

  describe('sort', () => {
    it('should sort numbers in ascending order by default', () => {
      expect(sort([3, 1, 4, 2])).toEqual([1, 2, 3, 4]);
    });

    it('should sort numbers in descending order', () => {
      expect(sort([3, 1, 4, 2], 'desc')).toEqual([4, 3, 2, 1]);
    });

    it('should sort objects by key', () => {
      const data = [
        { id: 3, name: 'Charlie' },
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' }
      ];
      expect(sort(data, 'id', 'asc')).toEqual([
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
        { id: 3, name: 'Charlie' }
      ]);
    });
  });

  describe('groupBy', () => {
    it('should group array items by key', () => {
      const data = [
        { category: 'A', value: 1 },
        { category: 'B', value: 2 },
        { category: 'A', value: 3 },
        { category: 'C', value: 4 }
      ];
      
      const result = groupBy(data, 'category');
      expect(result).toEqual({
        A: [{ category: 'A', value: 1 }, { category: 'A', value: 3 }],
        B: [{ category: 'B', value: 2 }],
        C: [{ category: 'C', value: 4 }]
      });
    });

    it('should handle custom grouping function', () => {
      const data = [1, 2, 3, 4, 5, 6];
      const result = groupBy(data, (item) => item % 2 === 0 ? 'even' : 'odd');
      
      expect(result).toEqual({
        even: [2, 4, 6],
        odd: [1, 3, 5]
      });
    });
  });

  describe('intersection', () => {
    it('should return common elements between arrays', () => {
      expect(intersection([1, 2, 3], [2, 3, 4])).toEqual([2, 3]);
      expect(intersection([1, 2, 3], [4, 5, 6])).toEqual([]);
    });
    
    it('should handle multiple arrays through chaining', () => {
      const result1 = intersection([1, 2, 3, 4], [2, 3, 4, 5]);
      const result2 = intersection(result1, [3, 4, 5]);
      expect(result2).toEqual([3, 4]);
    });
  });

  describe('union', () => {
    it('should return unique elements from all arrays', () => {
      expect(union([1, 2, 3], [2, 3, 4])).toEqual([1, 2, 3, 4]);
      expect(union([1, 2], [3, 4])).toEqual([1, 2, 3, 4]);
    });
    
    it('should handle multiple arrays through chaining', () => {
      const result1 = union([1, 2], [2, 3]);
      const result2 = union(result1, [3, 4]);
      expect(result2).toEqual([1, 2, 3, 4]);
    });
  });

  describe('difference', () => {
    it('should return elements in first array not in second', () => {
      expect(difference([1, 2, 3, 4], [2, 4])).toEqual([1, 3]);
      expect(difference([1, 2, 3], [1, 2, 3])).toEqual([]);
    });
  });

  describe('flatten', () => {
    it('should flatten nested arrays', () => {
      expect(flatten([1, [2, 3], [4, [5, 6]]])).toEqual([1, 2, 3, 4, 5, 6]);
      expect(flatten([1, 2, 3])).toEqual([1, 2, 3]);
    });
    
    it('should handle empty arrays', () => {
      expect(flatten([])).toEqual([]);
      expect(flatten([[], []])).toEqual([]);
    });
  });

  describe('chunk', () => {
    it('should split array into chunks of specified size', () => {
      expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
      expect(chunk([1, 2, 3, 4], 2)).toEqual([[1, 2], [3, 4]]);
    });
    
    it('should handle edge cases', () => {
      expect(chunk([], 2)).toEqual([]);
      expect(chunk([1, 2, 3], 5)).toEqual([[1, 2, 3]]);
    });
  });

  describe('shuffle', () => {
    it('should shuffle array elements', () => {
      const original = [1, 2, 3, 4, 5];
      const shuffled = shuffle([...original]);
      
      // Length should be the same
      expect(shuffled.length).toBe(original.length);
      
      // All elements should still be present
      expect(shuffled.sort()).toEqual(original.sort());
      
      // There's a tiny chance the shuffle doesn't change the array,
      // but it's extremely unlikely with 5 elements
      let isDifferent = false;
      for (let i = 0; i < 10; i++) {
        const result = shuffle([...original]);
        if (JSON.stringify(result) !== JSON.stringify(original)) {
          isDifferent = true;
          break;
        }
      }
      expect(isDifferent).toBe(true);
    });
  });
}); 