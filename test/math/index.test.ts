import { calculate, statistics, random, degreesToRadians, radiansToDegrees, distance, lerp, clamp } from '../../src/math';

describe('Math Utils', () => {
  describe('calculate', () => {
    it('should perform precise addition', () => {
      // JavaScript normally: 0.1 + 0.2 = 0.30000000000000004
      expect(calculate.add(0.1, 0.2)).toBeCloseTo(0.3);
      expect(calculate.add(1.23, 4.56)).toBeCloseTo(5.79);
    });

    it('should perform precise subtraction', () => {
      expect(calculate.subtract(0.3, 0.1)).toBeCloseTo(0.2);
      expect(calculate.subtract(5.79, 1.23)).toBeCloseTo(4.56);
    });

    it('should perform precise multiplication', () => {
      expect(calculate.multiply(0.1, 0.2)).toBeCloseTo(0.02);
      expect(calculate.multiply(1.23, 4.56)).toBeCloseTo(5.6088);
    });

    it('should perform precise division', () => {
      expect(calculate.divide(0.3, 0.1)).toBeCloseTo(3);
      expect(calculate.divide(5.6088, 1.23)).toBeCloseTo(4.56);
    });

    it('should handle precision option', () => {
      expect(calculate.add(1.234, 2.345, { precision: 2 })).toBe(3.58);
      expect(calculate.subtract(5.678, 1.234, { precision: 2 })).toBe(4.44);
    });

    it('should handle rounding mode option', () => {
      expect(calculate.add(1.235, 0, { precision: 2, roundingMode: 'floor' })).toBe(1.23);
      expect(calculate.add(1.235, 0, { precision: 2, roundingMode: 'ceil' })).toBe(1.24);
    });
  });

  describe('statistics', () => {
    it('should calculate basic statistics', () => {
      const numbers = [1, 2, 3, 4, 5];
      const stats = statistics(numbers);
      
      expect(stats.min).toBe(1);
      expect(stats.max).toBe(5);
      expect(stats.sum).toBe(15);
      expect(stats.average).toBe(3);
      expect(stats.median).toBe(3);
      expect(stats.count).toBe(5);
    });

    it('should calculate variance and standard deviation', () => {
      const numbers = [1, 2, 3, 4, 5];
      const stats = statistics(numbers);
      
      // Variance: ((1-3)² + (2-3)² + (3-3)² + (4-3)² + (5-3)²) / 5 = 2
      expect(stats.variance).toBeCloseTo(2);
      
      // Standard deviation: √2 ≈ 1.414
      expect(stats.standardDeviation).toBeCloseTo(1.414, 3);
    });

    it('should handle empty array', () => {
      expect(() => statistics([])).toThrow();
    });
  });

  describe('random', () => {
    it('should generate random numbers within range', () => {
      for (let i = 0; i < 100; i++) {
        const num = random(1, 10);
        expect(num).toBeGreaterThanOrEqual(1);
        expect(num).toBeLessThanOrEqual(10);
      }
    });
  });

  describe('angle conversion', () => {
    it('should convert degrees to radians', () => {
      expect(degreesToRadians(0)).toBe(0);
      expect(degreesToRadians(90)).toBeCloseTo(Math.PI / 2);
      expect(degreesToRadians(180)).toBeCloseTo(Math.PI);
      expect(degreesToRadians(360)).toBeCloseTo(2 * Math.PI);
    });

    it('should convert radians to degrees', () => {
      expect(radiansToDegrees(0)).toBe(0);
      expect(radiansToDegrees(Math.PI / 2)).toBeCloseTo(90);
      expect(radiansToDegrees(Math.PI)).toBeCloseTo(180);
      expect(radiansToDegrees(2 * Math.PI)).toBeCloseTo(360);
    });
  });

  describe('distance', () => {
    it('should calculate distance between two points', () => {
      expect(distance(0, 0, 3, 4)).toBe(5); // Pythagorean triple 3-4-5
      expect(distance(1, 1, 4, 5)).toBe(5);
      expect(distance(-1, -1, 2, 3)).toBe(5);
    });
  });

  describe('lerp', () => {
    it('should perform linear interpolation', () => {
      expect(lerp(0, 10, 0)).toBe(0);
      expect(lerp(0, 10, 0.5)).toBe(5);
      expect(lerp(0, 10, 1)).toBe(10);
      
      expect(lerp(10, 20, 0.25)).toBe(12.5);
    });
  });

  describe('clamp', () => {
    it('should clamp values to specified range', () => {
      expect(clamp(5, 0, 10)).toBe(5); // Within range
      expect(clamp(-5, 0, 10)).toBe(0); // Below min
      expect(clamp(15, 0, 10)).toBe(10); // Above max
      
      expect(clamp(3.5, 2.5, 7.5)).toBe(3.5);
    });
  });
}); 