/**
 * 存储工具模块
 */
import { StorageOptions, CacheItem, StorageChangeEvent } from './types';

/**
 * LocalStorage 封装
 */
export const localStorage = {
  /**
   * 设置本地存储
   * @param key 键名
   * @param value 值
   * @param expire 过期时间（毫秒）
   */
  set(key: string, value: any, expire?: number): void {
    try {
      const item: CacheItem<any> = {
        value,
        created: Date.now()
      };
      
      if (expire) {
        item.expires = Date.now() + expire;
      }
      
      window.localStorage.setItem(key, JSON.stringify(item));
    } catch (e) {
      console.error('Error setting localStorage item:', e);
    }
  },
  
  /**
   * 获取本地存储
   * @param key 键名
   * @param defaultValue 默认值
   */
  get(key: string, defaultValue?: any): any {
    try {
      const itemStr = window.localStorage.getItem(key);
      
      if (!itemStr) {
        return defaultValue;
      }
      
      const item: CacheItem<any> = JSON.parse(itemStr);
      
      // 检查是否过期
      if (item.expires && item.expires < Date.now()) {
        window.localStorage.removeItem(key);
        return defaultValue;
      }
      
      return item.value;
    } catch (e) {
      console.error('Error getting localStorage item:', e);
      return defaultValue;
    }
  },
  
  /**
   * 删除本地存储
   * @param key 键名
   */
  remove(key: string): void {
    try {
      window.localStorage.removeItem(key);
    } catch (e) {
      console.error('Error removing localStorage item:', e);
    }
  },
  
  /**
   * 清空本地存储
   */
  clear(): void {
    try {
      window.localStorage.clear();
    } catch (e) {
      console.error('Error clearing localStorage:', e);
    }
  }
};

/**
 * SessionStorage 封装
 */
export const sessionStorage = {
  /**
   * 设置会话存储
   * @param key 键名
   * @param value 值
   */
  set(key: string, value: any): void {
    try {
      const item: CacheItem<any> = {
        value,
        created: Date.now()
      };
      
      window.sessionStorage.setItem(key, JSON.stringify(item));
    } catch (e) {
      console.error('Error setting sessionStorage item:', e);
    }
  },
  
  /**
   * 获取会话存储
   * @param key 键名
   * @param defaultValue 默认值
   */
  get(key: string, defaultValue?: any): any {
    try {
      const itemStr = window.sessionStorage.getItem(key);
      
      if (!itemStr) {
        return defaultValue;
      }
      
      const item: CacheItem<any> = JSON.parse(itemStr);
      
      return item.value;
    } catch (e) {
      console.error('Error getting sessionStorage item:', e);
      return defaultValue;
    }
  },
  
  /**
   * 删除会话存储
   * @param key 键名
   */
  remove(key: string): void {
    try {
      window.sessionStorage.removeItem(key);
    } catch (e) {
      console.error('Error removing sessionStorage item:', e);
    }
  },
  
  /**
   * 清空会话存储
   */
  clear(): void {
    try {
      window.sessionStorage.clear();
    } catch (e) {
      console.error('Error clearing sessionStorage:', e);
    }
  }
};

/**
 * Cookie 操作
 */
export const cookie = {
  /**
   * 设置 Cookie
   * @param name Cookie名
   * @param value Cookie值
   * @param options Cookie选项
   */
  set(name: string, value: string, options?: StorageOptions): void {
    try {
      const { expires, path = '/', domain, secure, sameSite = 'lax' } = options || {};
      
      let cookieStr = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
      
      if (expires) {
        const expiresDate = expires instanceof Date ? expires : new Date(Date.now() + expires);
        cookieStr += `; expires=${expiresDate.toUTCString()}`;
      }
      
      if (path) {
        cookieStr += `; path=${path}`;
      }
      
      if (domain) {
        cookieStr += `; domain=${domain}`;
      }
      
      if (secure) {
        cookieStr += '; secure';
      }
      
      cookieStr += `; samesite=${sameSite}`;
      
      document.cookie = cookieStr;
    } catch (e) {
      console.error('Error setting cookie:', e);
    }
  },
  
  /**
   * 获取 Cookie
   * @param name Cookie名
   */
  get(name: string): string | null {
    try {
      const cookies = document.cookie.split('; ');
      const encodedName = encodeURIComponent(name);
      
      for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split('=');
        
        if (cookieName === encodedName) {
          return decodeURIComponent(cookieValue);
        }
      }
      
      return null;
    } catch (e) {
      console.error('Error getting cookie:', e);
      return null;
    }
  },
  
  /**
   * 删除 Cookie
   * @param name Cookie名
   * @param options Cookie选项
   */
  remove(name: string, options?: { path?: string, domain?: string }): void {
    try {
      const { path = '/', domain } = options || {};
      
      // 设置过期时间为过去的时间，使Cookie立即过期
      this.set(name, '', {
        expires: new Date(0),
        path,
        domain
      });
    } catch (e) {
      console.error('Error removing cookie:', e);
    }
  }
};

/**
 * 缓存管理
 */
export class CacheManager {
  private storage: Storage;
  private prefix: string;
  
  /**
   * 构造函数
   * @param storage 存储对象，默认为localStorage
   * @param prefix 键名前缀
   */
  constructor(storage: 'local' | 'session' = 'local', prefix: string = 'cache_') {
    this.storage = storage === 'local' ? window.localStorage : window.sessionStorage;
    this.prefix = prefix;
  }
  
  /**
   * 设置缓存
   * @param key 键名
   * @param value 值
   * @param expire 过期时间（毫秒）
   */
  set(key: string, value: any, expire?: number): void {
    try {
      const prefixedKey = this.prefix + key;
      const item: CacheItem<any> = {
        value,
        created: Date.now()
      };
      
      if (expire) {
        item.expires = Date.now() + expire;
      }
      
      this.storage.setItem(prefixedKey, JSON.stringify(item));
    } catch (e) {
      console.error('Error setting cache item:', e);
    }
  }
  
  /**
   * 获取缓存
   * @param key 键名
   * @param defaultValue 默认值
   */
  get(key: string, defaultValue?: any): any {
    try {
      const prefixedKey = this.prefix + key;
      const itemStr = this.storage.getItem(prefixedKey);
      
      if (!itemStr) {
        return defaultValue;
      }
      
      const item: CacheItem<any> = JSON.parse(itemStr);
      
      // 检查是否过期
      if (item.expires && item.expires < Date.now()) {
        this.storage.removeItem(prefixedKey);
        return defaultValue;
      }
      
      return item.value;
    } catch (e) {
      console.error('Error getting cache item:', e);
      return defaultValue;
    }
  }
  
  /**
   * 删除缓存
   * @param key 键名
   */
  remove(key: string): void {
    try {
      const prefixedKey = this.prefix + key;
      this.storage.removeItem(prefixedKey);
    } catch (e) {
      console.error('Error removing cache item:', e);
    }
  }
  
  /**
   * 清空所有缓存
   */
  clear(): void {
    try {
      // 只清除带有前缀的项
      const keys = [];
      
      for (let i = 0; i < this.storage.length; i++) {
        const key = this.storage.key(i);
        
        if (key && key.startsWith(this.prefix)) {
          keys.push(key);
        }
      }
      
      keys.forEach(key => {
        this.storage.removeItem(key);
      });
    } catch (e) {
      console.error('Error clearing cache:', e);
    }
  }
  
  /**
   * 获取所有缓存
   */
  getAll(): Record<string, any> {
    try {
      const result: Record<string, any> = {};
      
      for (let i = 0; i < this.storage.length; i++) {
        const key = this.storage.key(i);
        
        if (key && key.startsWith(this.prefix)) {
          const itemStr = this.storage.getItem(key);
          
          if (itemStr) {
            const item: CacheItem<any> = JSON.parse(itemStr);
            
            // 检查是否过期
            if (item.expires && item.expires < Date.now()) {
              this.storage.removeItem(key);
              continue;
            }
            
            const originalKey = key.slice(this.prefix.length);
            result[originalKey] = item.value;
          }
        }
      }
      
      return result;
    } catch (e) {
      console.error('Error getting all cache items:', e);
      return {};
    }
  }
}

export const cache = new CacheManager(); 