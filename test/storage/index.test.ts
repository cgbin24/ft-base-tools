import { localStorage, sessionStorage, cookie, CacheManager } from '../../src/storage';

describe('Storage Utils', () => {
  beforeEach(() => {
    // 清空所有存储
    window.localStorage.clear();
    window.sessionStorage.clear();
    document.cookie.split(';').forEach(cookie => {
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
    });
  });

  describe('localStorage', () => {
    it('should set and get items', () => {
      localStorage.set('testKey', 'testValue');
      expect(localStorage.get('testKey')).toBe('testValue');
    });

    it('should handle objects', () => {
      const testObj = { name: 'Test', value: 123 };
      localStorage.set('testObj', testObj);
      expect(localStorage.get('testObj')).toEqual(testObj);
    });

    it('should handle expiration', () => {
      jest.useFakeTimers();
      
      localStorage.set('expireTest', 'value', 1000); // 1 second expiration
      expect(localStorage.get('expireTest')).toBe('value');
      
      // Advance time by 2 seconds
      jest.advanceTimersByTime(2000);
      
      expect(localStorage.get('expireTest')).toBeUndefined();
      
      jest.useRealTimers();
    });

    it('should remove items', () => {
      localStorage.set('removeTest', 'value');
      expect(localStorage.get('removeTest')).toBe('value');
      
      localStorage.remove('removeTest');
      expect(localStorage.get('removeTest')).toBeUndefined();
    });

    it('should clear all items', () => {
      localStorage.set('test1', 'value1');
      localStorage.set('test2', 'value2');
      
      localStorage.clear();
      
      expect(localStorage.get('test1')).toBeUndefined();
      expect(localStorage.get('test2')).toBeUndefined();
    });
  });

  describe('sessionStorage', () => {
    it('should set and get items', () => {
      sessionStorage.set('testKey', 'testValue');
      expect(sessionStorage.get('testKey')).toBe('testValue');
    });

    it('should handle objects', () => {
      const testObj = { name: 'Test', value: 123 };
      sessionStorage.set('testObj', testObj);
      expect(sessionStorage.get('testObj')).toEqual(testObj);
    });

    it('should remove items', () => {
      sessionStorage.set('removeTest', 'value');
      expect(sessionStorage.get('removeTest')).toBe('value');
      
      sessionStorage.remove('removeTest');
      expect(sessionStorage.get('removeTest')).toBeUndefined();
    });
  });

  describe('cookie', () => {
    it('should set and get cookies', () => {
      cookie.set('cookieTest', 'cookieValue');
      expect(cookie.get('cookieTest')).toBe('cookieValue');
    });

    it('should handle cookie options', () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      cookie.set('optionsTest', 'value', {
        expires: tomorrow,
        path: '/',
        secure: true,
        sameSite: 'strict'
      });
      
      expect(cookie.get('optionsTest')).toBe('value');
    });

    it('should remove cookies', () => {
      cookie.set('removeTest', 'value');
      expect(cookie.get('removeTest')).toBe('value');
      
      cookie.remove('removeTest');
      expect(cookie.get('removeTest')).toBeUndefined();
    });
  });

  describe('cache', () => {
    it('should set and get cache items', () => {
      const cache = new CacheManager();
      cache.set('cacheTest', 'cacheValue');
      expect(cache.get('cacheTest')).toBe('cacheValue');
    });

    it('should handle cache expiration', () => {
      jest.useFakeTimers();
      
      const cache = new CacheManager();
      cache.set('expireTest', 'value', 1000); // 1 second expiration
      expect(cache.get('expireTest')).toBe('value');
      
      // Advance time by 2 seconds
      jest.advanceTimersByTime(2000);
      
      expect(cache.get('expireTest')).toBeUndefined();
      
      jest.useRealTimers();
    });

    it('should get all cache items', () => {
      const cache = new CacheManager();
      cache.set('test1', 'value1');
      cache.set('test2', 'value2');
      
      const allCache = cache.getAll();
      expect(allCache).toEqual({
        test1: 'value1',
        test2: 'value2'
      });
    });
  });
}); 