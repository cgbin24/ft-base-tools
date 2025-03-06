declare const global: any;

import { request, get, post, put, del, WebSocketClient, withRetry } from '../../src/network';

// 模拟XMLHttpRequest
global.XMLHttpRequest = jest.fn(() => ({
  open: jest.fn(),
  send: jest.fn(),
  setRequestHeader: jest.fn(),
  readyState: 4,
  status: 200,
  response: JSON.stringify({ success: true }),
  onreadystatechange: null,
  responseType: '',
  withCredentials: false,
  timeout: 0
}));

interface ExtendedWebSocketOptions {
  onOpen?: () => void;
  onMessage?: (data: any) => void;
  onClose?: () => void;
  onError?: (error: any) => void;
  autoReconnect?: boolean;
}

describe('Network Utils', () => {
  // 模拟XMLHttpRequest
  let mockXhr: any;
  
  beforeEach(() => {
    mockXhr = {
      open: jest.fn(),
      send: jest.fn(),
      setRequestHeader: jest.fn(),
      readyState: 4,
      status: 200,
      response: JSON.stringify({ success: true }),
      responseText: JSON.stringify({ success: true }),
      onreadystatechange: null,
      responseType: '',
      withCredentials: false,
      timeout: 0,
      upload: {
        onprogress: null
      }
    };
    
    global.XMLHttpRequest = jest.fn(() => mockXhr);
  });

  describe('request', () => {
    it('should make a GET request', async () => {
      const promise = request('https://example.com/api');
      
      // 模拟请求完成
      mockXhr.readyState = 4;
      mockXhr.status = 200;
      mockXhr.onreadystatechange && mockXhr.onreadystatechange();
      
      const result = await promise;
      expect(result).toEqual({ success: true });
      expect(mockXhr.open).toHaveBeenCalledWith('GET', 'https://example.com/api', true);
    });

    it('should make a POST request with data', async () => {
      const data = { name: 'Test', value: 123 };
      const promise = request('https://example.com/api', {
        method: 'POST',
        data
      });
      
      // 模拟请求完成
      mockXhr.readyState = 4;
      mockXhr.status = 200;
      mockXhr.onreadystatechange && mockXhr.onreadystatechange();
      
      await promise;
      expect(mockXhr.open).toHaveBeenCalledWith('POST', 'https://example.com/api', true);
      expect(mockXhr.send).toHaveBeenCalledWith(JSON.stringify(data));
    });

    it('should handle request errors', async () => {
      const promise = request('https://example.com/api');
      
      // 模拟请求失败
      mockXhr.readyState = 4;
      mockXhr.status = 500;
      mockXhr.statusText = 'Internal Server Error';
      mockXhr.onreadystatechange && mockXhr.onreadystatechange();
      
      await expect(promise).rejects.toThrow('Request failed with status 500: Internal Server Error');
    });

    it('should handle timeout', async () => {
      const promise = request('https://example.com/api', { timeout: 1000 });
      
      // 模拟超时
      mockXhr.ontimeout && mockXhr.ontimeout();
      
      await expect(promise).rejects.toThrow('Request timeout');
    });
  });

  describe('convenience methods', () => {
    it('should make GET request', async () => {
      const spy = jest.spyOn(global, 'XMLHttpRequest');
      
      const promise = get('https://example.com/api');
      
      // 模拟请求完成
      mockXhr.readyState = 4;
      mockXhr.status = 200;
      mockXhr.onreadystatechange && mockXhr.onreadystatechange();
      
      await promise;
      expect(mockXhr.open).toHaveBeenCalledWith('GET', 'https://example.com/api', true);
      
      spy.mockRestore();
    });

    it('should make POST request', async () => {
      const data = { name: 'Test' };
      const promise = post('https://example.com/api', data);
      
      // 模拟请求完成
      mockXhr.readyState = 4;
      mockXhr.status = 200;
      mockXhr.onreadystatechange && mockXhr.onreadystatechange();
      
      await promise;
      expect(mockXhr.open).toHaveBeenCalledWith('POST', 'https://example.com/api', true);
      expect(mockXhr.send).toHaveBeenCalledWith(JSON.stringify(data));
    });

    it('should make PUT request', async () => {
      const data = { name: 'Test' };
      const promise = put('https://example.com/api', data);
      
      // 模拟请求完成
      mockXhr.readyState = 4;
      mockXhr.status = 200;
      mockXhr.onreadystatechange && mockXhr.onreadystatechange();
      
      await promise;
      expect(mockXhr.open).toHaveBeenCalledWith('PUT', 'https://example.com/api', true);
    });

    it('should make DELETE request', async () => {
      const promise = del('https://example.com/api');
      
      // 模拟请求完成
      mockXhr.readyState = 4;
      mockXhr.status = 200;
      mockXhr.onreadystatechange && mockXhr.onreadystatechange();
      
      await promise;
      expect(mockXhr.open).toHaveBeenCalledWith('DELETE', 'https://example.com/api', true);
    });
  });

  describe('WebSocketClient', () => {
    let mockWebSocket;
    
    beforeEach(() => {
      mockWebSocket = {
        send: jest.fn(),
        close: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn()
      };
      
      global.WebSocket = jest.fn(() => mockWebSocket);
    });
    
    it('should connect to WebSocket server', () => {
      const client = new WebSocketClient('wss://example.com');
      expect(global.WebSocket).toHaveBeenCalledWith('wss://example.com');
    });
    
    it('should send messages', () => {
      const client = new WebSocketClient('wss://example.com');
      client.send({ type: 'test', data: 'message' });
      
      expect(mockWebSocket.send).toHaveBeenCalledWith(JSON.stringify({ 
        type: 'test', 
        data: 'message' 
      }));
    });
    
    it('should handle connection events', () => {
      const onOpen = jest.fn();
      const onMessage = jest.fn();
      const onClose = jest.fn();
      const onError = jest.fn();
      
      const client = new WebSocketClient('wss://example.com', {
        onOpen,
        onMessage,
        onClose,
        onError
      } as any);
      
      // 模拟连接打开
      const openCallback = mockWebSocket.addEventListener.mock.calls.find(
        call => call[0] === 'open'
      )[1];
      openCallback();
      expect(onOpen).toHaveBeenCalled();
      
      // 模拟接收消息
      const messageCallback = mockWebSocket.addEventListener.mock.calls.find(
        call => call[0] === 'message'
      )[1];
      const messageEvent = { data: JSON.stringify({ type: 'test', data: 'response' }) };
      messageCallback(messageEvent);
      expect(onMessage).toHaveBeenCalledWith({ type: 'test', data: 'response' });
    });
  });

  describe('withRetry', () => {
    it('should retry failed requests', async () => {
      const mockFn = jest.fn()
        .mockRejectedValueOnce(new Error('Failed'))
        .mockRejectedValueOnce(new Error('Failed again'))
        .mockResolvedValueOnce('Success');
      
      const result = await withRetry(mockFn, 3, 100);
      
      expect(result).toBe('Success');
      expect(mockFn).toHaveBeenCalledTimes(3);
    });

    it('should fail after max retries', async () => {
      const mockFn = jest.fn().mockRejectedValue(new Error('Always fails'));
      
      await expect(withRetry(mockFn, 2, 100)).rejects.toThrow('Always fails');
      expect(mockFn).toHaveBeenCalledTimes(2);
    });

    it('should handle timeout', async () => {
      jest.useFakeTimers();
      
      // 创建一个永不解决的Promise
      const mockFn = jest.fn(() => new Promise(() => {}));
      
      const promise = withRetry(mockFn, 1, 100);
      
      // 前进超时时间
      jest.advanceTimersByTime(100);
      
      await expect(promise).rejects.toThrow('Request timeout');
      
      jest.useRealTimers();
    });
  });
}); 