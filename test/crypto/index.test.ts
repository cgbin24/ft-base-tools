import { md5, base64Encode, base64Decode, urlEncode, urlDecode, uuid, random, escapeHtml, csrfToken } from '../../src/crypto';

describe('Crypto Utils', () => {
  describe('md5', () => {
    it('should generate consistent hash for same input', () => {
      const hash1 = md5('test');
      const hash2 = md5('test');
      expect(hash1).toBe(hash2);
      
      const hash3 = md5('different');
      expect(hash1).not.toBe(hash3);
    });
  });

  describe('base64', () => {
    it('should encode and decode strings correctly', () => {
      const original = 'Hello, World!';
      const encoded = base64Encode(original);
      expect(encoded).toBe('SGVsbG8sIFdvcmxkIQ==');
      
      const decoded = base64Decode(encoded);
      expect(decoded).toBe(original);
    });

    it('should handle unicode characters', () => {
      const original = '你好，世界！';
      const encoded = base64Encode(original);
      const decoded = base64Decode(encoded);
      expect(decoded).toBe(original);
    });
  });

  describe('urlEncode', () => {
    it('should encode URLs correctly', () => {
      expect(urlEncode('Hello World')).toBe('Hello%20World');
      expect(urlEncode('a=1&b=2')).toBe('a%3D1%26b%3D2');
    });

    it('should handle component vs full URL encoding', () => {
      const url = 'https://example.com?q=test value';
      expect(urlEncode(url, false)).toBe('https://example.com?q=test%20value');
      expect(urlEncode(url)).toBe('https%3A%2F%2Fexample.com%3Fq%3Dtest%20value');
    });
  });

  describe('urlDecode', () => {
    it('should decode URLs correctly', () => {
      expect(urlDecode('Hello%20World')).toBe('Hello World');
      expect(urlDecode('a%3D1%26b%3D2')).toBe('a=1&b=2');
    });
  });

  describe('uuid', () => {
    it('should generate valid UUIDs', () => {
      const id = uuid();
      expect(id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
    });

    it('should generate different UUIDs on each call', () => {
      const id1 = uuid();
      const id2 = uuid();
      expect(id1).not.toBe(id2);
    });
  });

  describe('random', () => {
    it('should generate random numbers within range', () => {
      for (let i = 0; i < 100; i++) {
        const num = random(1, 10);
        expect(num).toBeGreaterThanOrEqual(1);
        expect(num).toBeLessThanOrEqual(10);
        expect(Number.isInteger(num)).toBe(true);
      }
    });

    it('should support non-integer random numbers', () => {
      for (let i = 0; i < 100; i++) {
        const num = random(1, 10, false);
        expect(num).toBeGreaterThanOrEqual(1);
        expect(num).toBeLessThanOrEqual(10);
      }
    });
  });

  describe('escapeHtml', () => {
    it('should escape HTML special characters', () => {
      expect(escapeHtml('<script>alert("XSS")</script>')).toBe('&lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;');
      expect(escapeHtml('a & b')).toBe('a &amp; b');
    });
  });

  describe('csrfToken', () => {
    it('should generate a token', () => {
      const token = csrfToken();
      expect(typeof token).toBe('string');
      expect(token.length).toBeGreaterThan(0);
    });

    it('should generate different tokens on each call', () => {
      const token1 = csrfToken();
      const token2 = csrfToken();
      expect(token1).not.toBe(token2);
    });
  });
}); 