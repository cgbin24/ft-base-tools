/**
 * 网络工具模块
 */
import { RequestOptions, UploadOptions, WebSocketOptions } from './types';

/**
 * HTTP 请求封装
 * @param url 请求地址
 * @param options 请求选项
 */
export function request<T = any>(url: string, options?: RequestOptions): Promise<T> {
  const {
    method = 'GET',
    headers = {},
    data = null,
    timeout = 30000,
    withCredentials = false,
    responseType = 'json'
  } = options || {};

  return new Promise<T>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    
    // 设置超时
    xhr.timeout = timeout;
    
    // 设置响应类型
    xhr.responseType = responseType;
    
    // 设置跨域凭证
    xhr.withCredentials = withCredentials;
    
    // 打开连接
    xhr.open(method, url, true);
    
    // 设置请求头
    Object.entries(headers).forEach(([key, value]) => {
      xhr.setRequestHeader(key, value);
    });
    
    // 监听状态变化
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== 4) return;
      
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(xhr.response);
      } else {
        reject({
          status: xhr.status,
          statusText: xhr.statusText,
          response: xhr.response
        });
      }
    };
    
    // 错误处理
    xhr.onerror = () => {
      reject({
        status: xhr.status,
        statusText: 'Network Error',
        response: xhr.response
      });
    };
    
    // 超时处理
    xhr.ontimeout = () => {
      reject({
        status: xhr.status,
        statusText: 'Timeout Error',
        response: xhr.response
      });
    };
    
    // 发送请求
    if (method === 'GET' || !data) {
      xhr.send();
    } else {
      // 处理不同类型的数据
      if (data instanceof FormData) {
        xhr.send(data);
      } else if (typeof data === 'object') {
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        xhr.send(JSON.stringify(data));
      } else {
        xhr.send(data);
      }
    }
  });
}

/**
 * GET 请求
 * @param url 请求地址
 * @param options 请求选项
 */
export function get<T = any>(url: string, options?: Omit<RequestOptions, 'method'>): Promise<T> {
  return request<T>(url, { ...options, method: 'GET' });
}

/**
 * POST 请求
 * @param url 请求地址
 * @param data 请求数据
 * @param options 请求选项
 */
export function post<T = any>(url: string, data?: any, options?: Omit<RequestOptions, 'method' | 'data'>): Promise<T> {
  return request<T>(url, { ...options, method: 'POST', data });
}

/**
 * PUT 请求
 * @param url 请求地址
 * @param data 请求数据
 * @param options 请求选项
 */
export function put<T = any>(url: string, data?: any, options?: Omit<RequestOptions, 'method' | 'data'>): Promise<T> {
  return request<T>(url, { ...options, method: 'PUT', data });
}

/**
 * DELETE 请求
 * @param url 请求地址
 * @param options 请求选项
 */
export function del<T = any>(url: string, options?: Omit<RequestOptions, 'method'>): Promise<T> {
  return request<T>(url, { ...options, method: 'DELETE' });
}

/**
 * 文件上传
 * @param url 上传地址
 * @param file 文件对象
 * @param options 上传选项
 */
export function upload<T = any>(url: string, file: File, options?: UploadOptions): Promise<T> {
  const {
    headers = {},
    onProgress,
    data = {},
    withCredentials = false,
    timeout = 0 // 上传默认不设超时
  } = options || {};
  
  return new Promise<T>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    
    // 添加文件
    formData.append('file', file);
    
    // 添加其他数据
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
    
    // 设置超时
    if (timeout > 0) {
      xhr.timeout = timeout;
    }
    
    // 设置跨域凭证
    xhr.withCredentials = withCredentials;
    
    // 监听上传进度
    if (onProgress) {
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          const percent = Math.round((e.loaded / e.total) * 100);
          onProgress(percent);
        }
      };
    }
    
    // 打开连接
    xhr.open('POST', url, true);
    
    // 设置请求头
    Object.entries(headers).forEach(([key, value]) => {
      xhr.setRequestHeader(key, value);
    });
    
    // 监听状态变化
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== 4) return;
      
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const response = xhr.responseType === 'json' ? xhr.response : JSON.parse(xhr.responseText);
          resolve(response);
        } catch (e) {
          resolve(xhr.response as T);
        }
      } else {
        reject({
          status: xhr.status,
          statusText: xhr.statusText,
          response: xhr.response
        });
      }
    };
    
    // 错误处理
    xhr.onerror = () => {
      reject({
        status: xhr.status,
        statusText: 'Network Error',
        response: xhr.response
      });
    };
    
    // 超时处理
    xhr.ontimeout = () => {
      reject({
        status: xhr.status,
        statusText: 'Timeout Error',
        response: xhr.response
      });
    };
    
    // 发送请求
    xhr.send(formData);
  });
}

/**
 * 文件下载
 * @param url 下载地址
 * @param filename 保存的文件名
 */
export function downloadFile(url: string, filename?: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'blob';
    
    xhr.onload = () => {
      if (xhr.status === 200) {
        const blob = xhr.response;
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename || url.substring(url.lastIndexOf('/') + 1);
        link.click();
        URL.revokeObjectURL(link.href);
        resolve();
      } else {
        reject(new Error(`Download failed with status ${xhr.status}`));
      }
    };
    
    xhr.onerror = () => {
      reject(new Error('Network error during download'));
    };
    
    xhr.send();
  });
}

/**
 * WebSocket 封装
 */
export class WebSocketClient {
  private ws: WebSocket | null = null;
  private url: string;
  private protocols?: string | string[];
  private reconnect: boolean;
  private reconnectInterval: number;
  private maxReconnectAttempts: number;
  private reconnectAttempts: number = 0;
  private listeners: Record<string, Function[]> = {};
  
  constructor(url: string, options?: WebSocketOptions) {
    this.url = url;
    this.protocols = options?.protocols;
    this.reconnect = options?.reconnect || false;
    this.reconnectInterval = options?.reconnectInterval || 3000;
    this.maxReconnectAttempts = options?.maxReconnectAttempts || 5;
    
    this.connect();
  }
  
  /**
   * 连接WebSocket
   */
  private connect(): void {
    try {
      this.ws = this.protocols 
        ? new WebSocket(this.url, this.protocols) 
        : new WebSocket(this.url);
      
      this.ws.onopen = this.handleOpen.bind(this);
      this.ws.onclose = this.handleClose.bind(this);
      this.ws.onerror = this.handleError.bind(this);
      this.ws.onmessage = this.handleMessage.bind(this);
    } catch (e) {
      this.emit('error', e);
      this.attemptReconnect();
    }
  }
  
  /**
   * 处理连接打开
   */
  private handleOpen(event: Event): void {
    this.reconnectAttempts = 0;
    this.emit('open', event);
  }
  
  /**
   * 处理连接关闭
   */
  private handleClose(event: CloseEvent): void {
    this.emit('close', event);
    this.attemptReconnect();
  }
  
  /**
   * 处理错误
   */
  private handleError(event: Event): void {
    this.emit('error', event);
  }
  
  /**
   * 处理消息
   */
  private handleMessage(event: MessageEvent): void {
    try {
      const data = JSON.parse(event.data);
      this.emit('message', data);
    } catch (e) {
      this.emit('message', event.data);
    }
  }
  
  /**
   * 尝试重连
   */
  private attemptReconnect(): void {
    if (!this.reconnect || this.reconnectAttempts >= this.maxReconnectAttempts) {
      return;
    }
    
    this.reconnectAttempts++;
    
    setTimeout(() => {
      this.emit('reconnect', this.reconnectAttempts);
      this.connect();
    }, this.reconnectInterval);
  }
  
  /**
   * 发送消息
   * @param data 消息数据
   */
  send(data: any): void {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      this.emit('error', new Error('WebSocket is not connected'));
      return;
    }
    
    try {
      const message = typeof data === 'object' ? JSON.stringify(data) : data;
      this.ws.send(message);
    } catch (e) {
      this.emit('error', e);
    }
  }
  
  /**
   * 关闭连接
   * @param code 关闭代码
   * @param reason 关闭原因
   */
  close(code?: number, reason?: string): void {
    if (!this.ws) return;
    
    this.reconnect = false; // 禁用重连
    this.ws.close(code, reason);
  }
  
  /**
   * 添加事件监听器
   * @param event 事件名称
   * @param callback 回调函数
   */
  on(event: string, callback: Function): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    
    this.listeners[event].push(callback);
  }
  
  /**
   * 移除事件监听器
   * @param event 事件名称
   * @param callback 回调函数
   */
  off(event: string, callback?: Function): void {
    if (!this.listeners[event]) return;
    
    if (callback) {
      this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
    } else {
      delete this.listeners[event];
    }
  }
  
  /**
   * 触发事件
   * @param event 事件名称
   * @param args 事件参数
   */
  private emit(event: string, ...args: any[]): void {
    if (!this.listeners[event]) return;
    
    this.listeners[event].forEach(callback => {
      try {
        callback(...args);
      } catch (e) {
        console.error(`Error in ${event} listener:`, e);
      }
    });
  }
  
  /**
   * 获取连接状态
   */
  getState(): number {
    return this.ws ? this.ws.readyState : -1;
  }
  
  /**
   * 检查是否已连接
   */
  isConnected(): boolean {
    return this.ws !== null && this.ws.readyState === WebSocket.OPEN;
  }
}

/**
 * 带重试的函数执行
 * @param fn 需要执行的函数
 * @param retries 重试次数
 * @param timeout 超时时间
 */
export function withRetry<T>(fn: () => Promise<T>, retries: number = 3, timeout: number = 5000): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    let attempts = 0;
    
    const execute = () => {
      attempts++;
      
      // 创建超时Promise
      const timeoutPromise = new Promise<never>((_, timeoutReject) => {
        setTimeout(() => timeoutReject(new Error('Request timeout')), timeout);
      });
      
      // 竞争Promise
      Promise.race([fn(), timeoutPromise])
        .then(resolve)
        .catch(error => {
          if (attempts < retries) {
            console.warn(`Attempt ${attempts} failed, retrying...`);
            execute();
          } else {
            reject(error);
          }
        });
    };
    
    execute();
  });
} 