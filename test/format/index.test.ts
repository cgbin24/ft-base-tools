import { formatCurrency, formatFileSize, formatNumber, formatBankCard, round } from '../../src/format';

describe('Format Utils', () => {
  describe('formatCurrency', () => {
    it('should format currency correctly', () => {
      expect(formatCurrency(1234.56)).toBe('¥1,234.56');
      expect(formatCurrency(1000)).toBe('¥1,000.00');
      expect(formatCurrency(0.99)).toBe('¥0.99');
    });

    it('should handle custom options', () => {
      expect(formatCurrency(1234.56, { symbol: '$' })).toBe('$1,234.56');
      expect(formatCurrency(1234.56, { decimals: 0 })).toBe('¥1,235');
      expect(formatCurrency(1234.56, { symbolPosition: 'after' })).toBe('1,234.56¥');
      expect(formatCurrency(1234.56, { thousand: ' ', decimal: ',' })).toBe('¥1 234,56');
    });
  });

  describe('formatFileSize', () => {
    it('should format file size correctly', () => {
      expect(formatFileSize(1024)).toBe('1.00 KB');
      expect(formatFileSize(1048576)).toBe('1.00 MB');
      expect(formatFileSize(1073741824)).toBe('1.00 GB');
      expect(formatFileSize(500)).toBe('500 B');
    });

    it('should handle custom options', () => {
      expect(formatFileSize(1024, { decimals: 0 })).toBe('1 KB');
      expect(formatFileSize(1048576, { spacer: '' })).toBe('1.00MB');
      expect(formatFileSize(1024 * 1024 * 2.5, { standard: 'IEC' })).toBe('2.50 MiB');
    });
  });

  describe('formatNumber', () => {
    it('should format numbers correctly', () => {
      expect(formatNumber(1234.56)).toBe('1,234.56');
      expect(formatNumber(1000000)).toBe('1,000,000');
      expect(formatNumber(0.1234)).toBe('0.12');
    });

    it('should handle custom options', () => {
      expect(formatNumber(1234.56, { precision: 0 })).toBe('1,235');
      expect(formatNumber(1234.56, { thousand: ' ', decimal: ',' })).toBe('1 234,56');
      expect(formatNumber(0.1234, { precision: 4 })).toBe('0.1234');
    });
  });

  describe('formatBankCard', () => {
    it('should format bank card numbers correctly', () => {
      expect(formatBankCard('6225123412341234')).toBe('6225 1234 1234 1234');
      expect(formatBankCard('4111111111111111')).toBe('4111 1111 1111 1111');
    });

    it('should mask card numbers when specified', () => {
      expect(formatBankCard('6225123412341234', true)).toBe('6225 **** **** 1234');
      expect(formatBankCard('411111111111')).toBe('4111 1111 1111');
    });
  });

  describe('round', () => {
    it('should round numbers correctly', () => {
      expect(round(1.234, 2)).toBe(1.23);
      expect(round(1.235, 2)).toBe(1.24);
      expect(round(1.5)).toBe(2);
    });

    it('should handle different rounding modes', () => {
      expect(round(1.234, 2, 'floor')).toBe(1.23);
      expect(round(1.999, 0, 'floor')).toBe(1);
      
      expect(round(1.234, 2, 'ceil')).toBe(1.24);
      expect(round(1.001, 0, 'ceil')).toBe(2);
    });
  });
}); 