/**
 * 存储工具类型定义
 */

export interface StorageOptions {
  expires?: number | Date;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
}

export interface CacheItem<T> {
  value: T;
  expires?: number;
  created: number;
}

export interface StorageChangeEvent {
  key: string;
  oldValue: any;
  newValue: any;
  storageArea: Storage;
} 