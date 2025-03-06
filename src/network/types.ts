/**
 * 网络请求相关类型定义
 */

export interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  data?: any;
  timeout?: number;
  withCredentials?: boolean;
  responseType?: 'json' | 'text' | 'blob' | 'arraybuffer';
}

export interface UploadOptions {
  headers?: Record<string, string>;
  onProgress?: (percent: number) => void;
  data?: Record<string, any>; // 附加数据
  withCredentials?: boolean;
  timeout?: number;
}

export interface WebSocketOptions {
  protocols?: string | string[];
  reconnect?: boolean;
  reconnectInterval?: number;
  maxReconnectAttempts?: number;
} 