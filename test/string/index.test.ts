import { truncate, caseConvert, parseUrlParams, template, escapeHtml, randomString, pad } from '../../src/string';

describe('String Utils', () => {
  describe('truncate', () => {
    it('should truncate string to specified length', () => {
      expect(truncate('Hello World', 5)).toBe('Hello...');
    });

    it('should not truncate if string is shorter than length', () => {
      expect(truncate('Hello', 10)).toBe('Hello');
    });

    it('should preserve words when specified', () => {
      expect(truncate('Hello World', { length: 8, preserveWords: true })).toBe('Hello...');
    });
  });

  describe('caseConvert', () => {
    it('should convert to camelCase', () => {
      expect(caseConvert('hello-world', 'camel')).toBe('helloWorld');
      expect(caseConvert('hello_world', 'camel')).toBe('helloWorld');
      expect(caseConvert('Hello World', 'camel')).toBe('helloWorld');
    });

    it('should convert to PascalCase', () => {
      expect(caseConvert('hello-world', 'pascal')).toBe('HelloWorld');
    });

    it('should convert to kebab-case', () => {
      expect(caseConvert('helloWorld', 'kebab')).toBe('hello-world');
    });

    it('should convert to snake_case', () => {
      expect(caseConvert('helloWorld', 'snake')).toBe('hello_world');
    });
  });

  describe('parseUrlParams', () => {
    it('should parse URL query parameters', () => {
      const url = 'https://example.com?name=John&age=30&active=true';
      const params = parseUrlParams(url);
      
      expect(params).toEqual({
        name: 'John',
        age: '30',
        active: 'true'
      });
    });
    
    it('should handle URL without query parameters', () => {
      expect(parseUrlParams('https://example.com')).toEqual({});
    });
    
    it('should decode URI components', () => {
      const url = 'https://example.com?message=Hello%20World&q=search%20term';
      expect(parseUrlParams(url)).toEqual({
        message: 'Hello World',
        q: 'search term'
      });
    });
  });

  describe('randomString', () => {
    it('should generate string of specified length', () => {
      expect(randomString(10).length).toBe(10);
      expect(randomString(20).length).toBe(20);
    });
    
    it('should use specified character set', () => {
      const digits = '0123456789';
      const result = randomString(100, digits);
      
      // All characters should be digits
      expect(result.split('').every(char => digits.includes(char))).toBe(true);
    });
  });

  describe('pad', () => {
    it('should pad string to specified length', () => {
      expect(pad('123', 5, '0')).toBe('00123');
      expect(pad('abc', 6, '-')).toBe('---abc');
    });
    
    it('should pad at end when specified', () => {
      expect(pad('123', 5, '0', true)).toBe('12300');
      expect(pad('abc', 6, '-', true)).toBe('abc---');
    });
    
    it('should not pad if string is already longer', () => {
      expect(pad('12345', 3, '0')).toBe('12345');
    });
  });

  // 更多测试...
}); 