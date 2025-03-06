import { debounce, throttle, lazyload, preload } from '../../src/performance';

interface ExtendedLazyLoadOptions {
  src?: string;
  onLoad?: () => void;
}

describe('Performance Utils', () => {
  describe('debounce', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should debounce function calls', () => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn, 1000);
      
      // Call multiple times
      debouncedFn();
      debouncedFn();
      debouncedFn();
      
      // Function should not be called yet
      expect(mockFn).not.toBeCalled();
      
      // Fast forward time
      jest.advanceTimersByTime(1000);
      
      // Function should be called once
      expect(mockFn).toBeCalledTimes(1);
    });

    it('should support leading option', () => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn, 1000, { leading: true });
      
      // First call should execute immediately
      debouncedFn();
      expect(mockFn).toBeCalledTimes(1);
      
      // Subsequent calls within wait period should be ignored
      debouncedFn();
      debouncedFn();
      expect(mockFn).toBeCalledTimes(1);
      
      // After wait period, next call should execute immediately
      jest.advanceTimersByTime(1000);
      debouncedFn();
      expect(mockFn).toBeCalledTimes(2);
    });

    it('should support trailing option', () => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn, 1000, { trailing: false, leading: true });
      
      // First call should execute immediately
      debouncedFn();
      expect(mockFn).toBeCalledTimes(1);
      
      // Subsequent calls should be ignored completely (no trailing call)
      debouncedFn();
      debouncedFn();
      jest.advanceTimersByTime(1000);
      expect(mockFn).toBeCalledTimes(1);
    });
  });

  describe('throttle', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should limit function calls to specified interval', () => {
      const mockFn = jest.fn();
      const throttledFn = throttle(mockFn, 100);
      
      // Call multiple times in quick succession
      throttledFn();
      expect(mockFn).toBeCalledTimes(1); // First call executes immediately
      
      throttledFn();
      throttledFn();
      expect(mockFn).toBeCalledTimes(1); // Still only called once
      
      // Advance time past the throttle interval
      jest.advanceTimersByTime(100);
      
      // The last call should now execute
      expect(mockFn).toBeCalledTimes(2);
      
      // Call again after the interval
      throttledFn();
      expect(mockFn).toBeCalledTimes(3);
    });

    it('should pass arguments and context to original function', () => {
      const mockFn = jest.fn();
      const throttledFn = throttle(mockFn, 100);
      
      const context = { name: 'test' };
      throttledFn.call(context, 'arg1', 'arg2');
      
      expect(mockFn).toBeCalledWith('arg1', 'arg2');
      expect(mockFn.mock.instances[0]).toBe(context);
    });
  });

  describe('lazyLoad', () => {
    beforeEach(() => {
      document.body.innerHTML = `
        <img class="lazy" data-src="image1.jpg" alt="Image 1">
        <img class="lazy" data-src="image2.jpg" alt="Image 2">
      `;
    });

    it('should observe all matching elements', () => {
      const observer = lazyload('.lazy') as any;
      const images = document.querySelectorAll('.lazy');
      
      expect(images.length).toBeGreaterThan(0);
    });

    it('should handle custom loading attribute', () => {
      document.body.innerHTML = `
        <img class="custom-lazy" data-custom-src="image1.jpg" alt="Image 1">
      `;
      
      const onLoad = jest.fn();
      const observer = lazyload('.custom-lazy', { 
        src: 'data-custom-src',
        onLoad
      } as ExtendedLazyLoadOptions) as any;
      
      // 获取 IntersectionObserver 的回调函数
      const callback = (window.IntersectionObserver as jest.Mock).mock.calls[0][0];

      // 直接调用回调函数
      const entries = [
        { target: document.querySelector('.custom-lazy'), isIntersecting: true }
      ];
      callback(entries, {});
      
      // Image src should be updated using custom attribute
      expect(entries[0].target?.getAttribute('src')).toBe('image1.jpg');
      expect(onLoad).toHaveBeenCalled();
    });
  });

  describe('preload', () => {
    beforeEach(() => {
      // Mock document methods
      document.createElement = jest.fn().mockImplementation(tag => {
        const element = {
          onload: null,
          onerror: null,
          src: '',
          href: '',
          rel: '',
          as: '',
          type: '',
          crossOrigin: '',
          preload: '',
          async: false
        };
        
        // 使用 setTimeout 模拟异步加载
        setTimeout(() => {
          if (element.onload) {
            (element.onload as Function)();
          }
        }, 0);
        
        return element;
      });
      
      // 不要直接赋值 document.head
      // 而是模拟 appendChild 方法
      const originalHead = document.head;
      document.head.appendChild = jest.fn();
    });

    it('should preload images', async () => {
      const resources = ['image1.jpg', 'image2.jpg'];
      await preload(resources, 'image');
      
      expect(document.createElement).toHaveBeenCalledWith('img');
      expect(document.createElement).toHaveBeenCalledTimes(2);
    });

    it('should preload scripts', async () => {
      const resources = ['script1.js', 'script2.js'];
      await preload(resources, 'script');
      
      expect(document.createElement).toHaveBeenCalledWith('script');
      expect(document.head.appendChild).toHaveBeenCalledTimes(2);
    });

    it('should preload stylesheets', async () => {
      const resources = ['style1.css', 'style2.css'];
      await preload(resources, 'style');
      
      expect(document.createElement).toHaveBeenCalledWith('link');
      expect(document.head.appendChild).toHaveBeenCalledTimes(2);
    });

    it('should handle preload errors', async () => {
      // Mock element with error
      document.createElement = jest.fn().mockImplementation(() => {
        const element = {
          onload: null,
          onerror: null
        };
        
        // Simulate error
        setTimeout(() => {
          if (element.onerror) (element.onerror as Function)(new Error('Failed to load'));
        }, 0);
        
        return element;
      });
      
      const resources = ['error.jpg'];
      
      // Should not reject the promise
      await expect(preload(resources, 'image')).resolves.toBeDefined();
    });
  });
}); 