/**
 * 性能优化工具模块
 */
import { DebounceOptions, ThrottleOptions, LazyLoadOptions } from './types';

/**
 * 防抖函数
 * @param fn 需要防抖的函数
 * @param wait 等待时间
 * @param options 防抖选项
 */
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  wait: number = 300,
  options?: DebounceOptions
): (...args: Parameters<T>) => void {
  const { leading = false, trailing = true, maxWait } = options || {};
  
  let timeout: ReturnType<typeof setTimeout> | null = null;
  let lastCallTime: number = 0;
  let lastInvokeTime: number = 0;
  let lastArgs: Parameters<T> | null = null;
  let lastThis: any = null;
  let result: ReturnType<T>;
  
  function invokeFunc(time: number): ReturnType<T> {
    const args = lastArgs!;
    const thisArg = lastThis;
    
    lastArgs = lastThis = null;
    lastInvokeTime = time;
    
    result = fn.apply(thisArg, args);
    return result;
  }
  
  function startTimer(pendingFunc: () => void, wait: number): ReturnType<typeof setTimeout> {
    return setTimeout(pendingFunc, wait);
  }
  
  function cancelTimer(id: ReturnType<typeof setTimeout> | null): void {
    if (id !== null) {
      clearTimeout(id);
    }
  }
  
  function trailingEdge(time: number): void {
    timeout = null;
    
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    
    lastArgs = lastThis = null;
    return result;
  }
  
  function leadingEdge(time: number): ReturnType<T> {
    lastInvokeTime = time;
    timeout = startTimer(timerExpired, wait);
    
    return leading ? invokeFunc(time) : result;
  }
  
  function remainingWait(time: number): number {
    const timeSinceLastCall = time - lastCallTime;
    const timeSinceLastInvoke = time - lastInvokeTime;
    const timeWaiting = wait - timeSinceLastCall;
    
    return maxWait !== undefined
      ? Math.min(timeWaiting, maxWait - timeSinceLastInvoke)
      : timeWaiting;
  }
  
  function shouldInvoke(time: number): boolean {
    const timeSinceLastCall = time - lastCallTime;
    const timeSinceLastInvoke = time - lastInvokeTime;
    
    return (
      lastCallTime === 0 ||
      timeSinceLastCall >= wait ||
      timeSinceLastCall < 0 ||
      (maxWait !== undefined && timeSinceLastInvoke >= maxWait)
    );
  }
  
  function timerExpired(): void {
    const time = Date.now();
    
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    
    timeout = startTimer(timerExpired, remainingWait(time));
  }
  
  function debounced(this: any, ...args: Parameters<T>): ReturnType<T> {
    const time = Date.now();
    const isInvoking = shouldInvoke(time);
    
    lastArgs = args;
    lastThis = this;
    lastCallTime = time;
    
    if (isInvoking) {
      if (timeout === null) {
        return leadingEdge(lastCallTime);
      }
      
      if (maxWait !== undefined) {
        timeout = startTimer(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    
    if (timeout === null) {
      timeout = startTimer(timerExpired, wait);
    }
    
    return result;
  }
  
  debounced.cancel = function() {
    cancelTimer(timeout);
    lastInvokeTime = 0;
    timeout = lastArgs = lastThis = null;
  };
  
  debounced.flush = function() {
    return timeout === null ? result : trailingEdge(Date.now());
  };
  
  return debounced as (...args: Parameters<T>) => ReturnType<T>;
}

/**
 * 节流函数
 * @param fn 需要节流的函数
 * @param wait 等待时间
 * @param options 节流选项
 */
export function throttle<T extends (...args: any[]) => any>(
  fn: T,
  wait: number = 300,
  options?: ThrottleOptions
): (...args: Parameters<T>) => ReturnType<T> {
  return debounce(fn, wait, {
    leading: options?.leading !== false,
    trailing: options?.trailing !== false,
    maxWait: wait
  }) as (...args: Parameters<T>) => ReturnType<T>;
}

/**
 * 懒加载
 * @param selector 选择器
 * @param options 懒加载选项
 */
export function lazyload(selector: string, options?: LazyLoadOptions): void {
  const {
    root = null,
    rootMargin = '0px',
    threshold = 0,
    onLoad,
    onError
  } = options || {};
  
  // 检查浏览器是否支持 IntersectionObserver
  if (!('IntersectionObserver' in window)) {
    // 降级处理：立即加载所有图片
    document.querySelectorAll(selector).forEach(el => {
      loadElement(el as HTMLElement);
    });
    return;
  }
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target as HTMLElement;
        loadElement(element);
        observer.unobserve(element);
      }
    });
  }, {
    root,
    rootMargin,
    threshold
  });
  
  document.querySelectorAll(selector).forEach(el => {
    observer.observe(el);
  });
  
  function loadElement(element: HTMLElement): void {
    try {
      if (element.tagName === 'IMG') {
        const img = element as HTMLImageElement;
        const src = img.dataset.src;
        
        if (src) {
          img.src = src;
          img.addEventListener('load', () => {
            img.removeAttribute('data-src');
            if (onLoad) onLoad(img);
          });
          
          img.addEventListener('error', () => {
            if (onError) onError(img);
          });
        }
      } else if (element.tagName === 'VIDEO') {
        const video = element as HTMLVideoElement;
        const src = video.dataset.src;
        
        if (src) {
          video.src = src;
          video.addEventListener('loadeddata', () => {
            video.removeAttribute('data-src');
            if (onLoad) onLoad(video);
          });
          
          video.addEventListener('error', () => {
            if (onError) onError(video);
          });
        }
      } else {
        // 处理背景图片
        const src = element.dataset.src;
        
        if (src) {
          element.style.backgroundImage = `url(${src})`;
          
          // 创建一个临时图片来检测加载完成
          const tempImg = new Image();
          tempImg.src = src;
          
          tempImg.onload = () => {
            element.removeAttribute('data-src');
            if (onLoad) onLoad(element);
          };
          
          tempImg.onerror = () => {
            if (onError) onError(element);
          };
        }
      }
    } catch (e) {
      console.error('Error loading lazy element:', e);
      if (onError) onError(element);
    }
  }
}

/**
 * 性能监控
 */
export const monitor = {
  /**
   * 测量函数执行时间
   * @param fn 需要测量的函数
   * @param args 函数参数
   */
  timing<T extends (...args: any[]) => any>(fn: T, ...args: Parameters<T>): { result: ReturnType<T>, time: number } {
    const start = performance.now();
    const result = fn(...args);
    const end = performance.now();
    
    return {
      result,
      time: end - start
    };
  },
  
  /**
   * 获取页面性能指标
   */
  getPageMetrics(): Record<string, number> {
    if (!window.performance || !window.performance.timing) {
      return {};
    }
    
    const timing = window.performance.timing;
    const metrics: Record<string, number> = {};
    
    // DNS解析时间
    metrics.dns = timing.domainLookupEnd - timing.domainLookupStart;
    
    // TCP连接时间
    metrics.tcp = timing.connectEnd - timing.connectStart;
    
    // 请求响应时间
    metrics.request = timing.responseEnd - timing.requestStart;
    
    // DOM解析时间
    metrics.dom = timing.domComplete - timing.domLoading;
    
    // 页面加载时间
    metrics.load = timing.loadEventEnd - timing.navigationStart;
    
    // 首次渲染时间
    metrics.fcp = timing.domContentLoadedEventEnd - timing.navigationStart;
    
    return metrics;
  }
};

/**
 * 资源预加载
 * @param resources 资源URL数组
 * @param type 资源类型
 */
export function preload(resources: string[], type: 'image' | 'script' | 'style' | 'audio' | 'video' | 'font'): Promise<void[]> {
  const promises: Promise<void>[] = [];
  
  resources.forEach(url => {
    const promise = new Promise<void>((resolve, reject) => {
      switch (type) {
        case 'image':
          const img = new Image();
          img.onload = () => resolve();
          img.onerror = reject;
          img.src = url;
          break;
          
        case 'script':
          const script = document.createElement('script');
          script.onload = () => resolve();
          script.onerror = reject;
          script.src = url;
          script.async = true;
          document.head.appendChild(script);
          break;
          
        case 'style':
          const link = document.createElement('link');
          link.rel = 'preload';
          link.as = 'style';
          link.onload = () => resolve();
          link.onerror = reject;
          link.href = url;
          document.head.appendChild(link);
          break;
          
        case 'audio':
        case 'video':
          const media = document.createElement(type);
          media.preload = 'auto';
          media.onloadeddata = () => resolve();
          media.onerror = reject;
          media.src = url;
          break;
          
        case 'font':
          const fontLink = document.createElement('link');
          fontLink.rel = 'preload';
          fontLink.as = 'font';
          fontLink.type = 'font/woff2'; // 假设是woff2格式
          fontLink.crossOrigin = 'anonymous';
          fontLink.onload = () => resolve();
          fontLink.onerror = reject;
          fontLink.href = url;
          document.head.appendChild(fontLink);
          break;
          
        default:
          reject(new Error(`Unsupported resource type: ${type}`));
      }
    });
    
    promises.push(promise);
  });
  
  return Promise.all(promises);
} 