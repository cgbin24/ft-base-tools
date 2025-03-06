/**
 * 加密与安全工具模块
 */
import { HashOptions, EncryptOptions, UuidOptions } from './types';

/**
 * MD5加密
 * @param message 需要加密的消息
 * @param options 加密选项
 */
export function md5(message: string, options?: HashOptions): string {
  // 注意：浏览器环境下实现MD5需要引入第三方库
  // 这里提供一个简单的实现，实际项目中建议使用成熟的库如crypto-js
  
  // 简单实现，仅作示例
  function simpleHash(str: string): string {
    let hash = 0;
    if (str.length === 0) return hash.toString(16);
    
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    
    return Math.abs(hash).toString(16).padStart(8, '0');
  }
  
  return simpleHash(message);
}

/**
 * Base64编码
 * @param str 需要编码的字符串
 */
export function base64Encode(str: string): string {
  try {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_, p1) => {
      return String.fromCharCode(parseInt(p1, 16));
    }));
  } catch (e) {
    console.error('Error encoding to base64:', e);
    return '';
  }
}

/**
 * Base64解码
 * @param str 需要解码的Base64字符串
 */
export function base64Decode(str: string): string {
  try {
    return decodeURIComponent(Array.prototype.map.call(atob(str), (c) => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  } catch (e) {
    console.error('Error decoding from base64:', e);
    return '';
  }
}

/**
 * URL编码
 * @param str 需要编码的URL
 * @param component 是否编码整个URL
 */
export function urlEncode(str: string, component: boolean = true): string {
  try {
    return component ? encodeURIComponent(str) : encodeURI(str);
  } catch (e) {
    console.error('Error encoding URL:', e);
    return str;
  }
}

/**
 * URL解码
 * @param str 需要解码的URL
 * @param component 是否解码整个URL
 */
export function urlDecode(str: string, component: boolean = true): string {
  try {
    return component ? decodeURIComponent(str) : decodeURI(str);
  } catch (e) {
    console.error('Error decoding URL:', e);
    return str;
  }
}

/**
 * 生成UUID
 * @param options UUID选项
 */
export function uuid(options?: UuidOptions): string {
  const { version = 4 } = options || {};
  
  if (version === 4) {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
  
  // 简化版本，实际项目中建议使用成熟的UUID库
  return 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'.replace(/[x]/g, () => {
    return Math.floor(Math.random() * 16).toString(16);
  });
}

/**
 * 生成随机数
 * @param min 最小值
 * @param max 最大值
 * @param isInteger 是否为整数
 */
export function random(min: number, max: number, isInteger: boolean = true): number {
  const rand = Math.random() * (max - min) + min;
  return isInteger ? Math.floor(rand) : rand;
}

/**
 * 防XSS处理
 * @param html HTML字符串
 */
export function escapeHtml(html: string): string {
  return html
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * 生成CSRF Token
 */
export function csrfToken(): string {
  return base64Encode(uuid() + Date.now().toString());
} 