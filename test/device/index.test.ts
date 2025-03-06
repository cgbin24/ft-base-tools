import { getBrowser, getNetworkInfo, supports, getDevicePixelRatio } from '../../src/device';

describe('Device Utils', () => {
  const originalUserAgent = navigator.userAgent;
  
  afterEach(() => {
    Object.defineProperty(navigator, 'userAgent', {
      value: originalUserAgent,
      configurable: true
    });
  });
  
  describe('getBrowser', () => {
    it('should detect Chrome browser', () => {
      Object.defineProperty(navigator, 'userAgent', {
        value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        configurable: true
      });
      
      const info = getBrowser();
      expect(info.name).toBe('Chrome');
      expect(info.engine).toBe('Blink');
      expect(info.os).toBe('Windows');
      expect(info.device).toBe('desktop');
    });

    it('should detect mobile device', () => {
      Object.defineProperty(navigator, 'userAgent', {
        value: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1',
        configurable: true
      });
      
      const info = getBrowser();
      expect(info.device).toBe('mobile');
      expect(info.os).toBe('iOS');
    });

    // 更多测试...
  });
}); 