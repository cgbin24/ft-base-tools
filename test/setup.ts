// 全局测试设置
// 这里可以添加全局的模拟和设置

// 模拟 localStorage 和 sessionStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    }
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });
Object.defineProperty(window, 'sessionStorage', { value: localStorageMock });

// 模拟 IntersectionObserver
class IntersectionObserverMock {
  readonly root: Element | null = null;
  readonly rootMargin: string = '';
  readonly thresholds: ReadonlyArray<number> = [];
  
  observe = jest.fn();
  disconnect = jest.fn();
  takeRecords = jest.fn(() => []);
  unobserve = jest.fn();
  simulateIntersection = jest.fn();
}

// 确保使用构造函数而不是类本身
window.IntersectionObserver = jest.fn().mockImplementation(function(callback) {
  const observer = new IntersectionObserverMock();
  observer.simulateIntersection = (entries) => callback(entries, observer);
  return observer;
});

// 清除控制台警告和错误
global.console = {
  ...console,
  warn: jest.fn(),
  error: jest.fn()
}; 