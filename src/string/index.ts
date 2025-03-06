/**
 * 字符串工具模块
 */
import { CaseType, TruncateOptions, TemplateOptions } from './types';

/**
 * 字符串截断
 * @param str 需要截断的字符串
 * @param options 截断选项
 */
export function truncate(str: string, options: TruncateOptions | number): string {
  const opts = typeof options === 'number' ? { length: options } : options;
  const { length, suffix = '...', preserveWords = false } = opts;
  
  if (str.length <= length) {
    return str;
  }
  
  if (!preserveWords) {
    return str.slice(0, length) + suffix;
  }
  
  // 保留完整单词
  const truncated = str.slice(0, length);
  const lastSpaceIndex = truncated.lastIndexOf(' ');
  
  if (lastSpaceIndex === -1) {
    return truncated + suffix;
  }
  
  return truncated.slice(0, lastSpaceIndex) + suffix;
}

/**
 * 驼峰转换
 * @param str 需要转换的字符串
 * @param type 转换类型
 */
export function caseConvert(str: string, type: CaseType): string {
  // 先统一转为小写，并去除首尾空格
  str = str.trim().toLowerCase();
  
  // 移除特殊字符，只保留字母、数字和空格、连字符、下划线
  str = str.replace(/[^\w\s-]/g, '');
  
  switch (type) {
    case 'camel': // 小驼峰: helloWorld
      return str
        .replace(/[-_\s]+(.)?/g, (_, c) => c ? c.toUpperCase() : '')
        .replace(/^[A-Z]/, c => c.toLowerCase());
      
    case 'pascal': // 大驼峰: HelloWorld
      return str
        .replace(/[-_\s]+(.)?/g, (_, c) => c ? c.toUpperCase() : '')
        .replace(/^[a-z]/, c => c.toUpperCase());
      
    case 'kebab': // 短横线: hello-world
      return str.replace(/[_\s]+/g, '-').replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
      
    case 'snake': // 下划线: hello_world
      return str.replace(/[-\s]+/g, '_').replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
      
    default:
      return str;
  }
}

/**
 * URL 参数解析
 * @param url URL字符串
 * @returns 解析后的参数对象
 */
export function parseUrlParams(url: string): Record<string, string> {
  const params: Record<string, string> = {};
  
  try {
    // 提取查询字符串
    const queryString = url.includes('?') 
      ? url.split('?')[1] 
      : url;
    
    // 如果没有查询参数，返回空对象
    if (!queryString) {
      return params;
    }
    
    // 处理hash部分
    const queryWithoutHash = queryString.includes('#') 
      ? queryString.split('#')[0] 
      : queryString;
    
    // 分割参数
    const pairs = queryWithoutHash.split('&');
    
    // 解析每个参数
    for (const pair of pairs) {
      const [key, value] = pair.split('=');
      
      if (key) {
        params[decodeURIComponent(key)] = value 
          ? decodeURIComponent(value) 
          : '';
      }
    }
  } catch (e) {
    console.error('Error parsing URL parameters:', e);
  }
  
  return params;
}

/**
 * 模板字符串处理
 * @param template 模板字符串，如 "Hello, {name}!"
 * @param data 数据对象，如 { name: "World" }
 * @param options 选项
 */
export function template(
  template: string, 
  data: Record<string, any>, 
  options?: TemplateOptions
): string {
  const { delimiter = /\{(.+?)\}/g, escape = true } = options || {};
  
  return template.replace(
    delimiter, 
    (match, key) => {
      // 移除可能的空格
      key = key.trim();
      
      // 获取数据值
      const value = key.split('.').reduce((obj: any, prop: string) => {
        return obj && obj[prop] !== undefined ? obj[prop] : '';
      }, data);
      
      // 转义HTML
      if (escape && typeof value === 'string') {
        return escapeHtml(String(value));
      }
      
      return value !== undefined ? String(value) : match;
    }
  );
}

/**
 * HTML转义
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
 * 生成随机字符串
 * @param length 字符串长度
 * @param chars 可选字符集
 */
export function randomString(
  length: number = 8, 
  chars: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
): string {
  let result = '';
  const charsLength = chars.length;
  
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * charsLength));
  }
  
  return result;
}

/**
 * 字符串补全
 * @param str 原始字符串
 * @param length 目标长度
 * @param char 填充字符
 * @param end 是否在末尾填充，默认在开头
 */
export function pad(str: string, length: number, char: string = ' ', end: boolean = false): string {
  const strLength = str.length;
  
  if (strLength >= length) {
    return str;
  }
  
  const padString = char.repeat(length - strLength);
  
  return end ? str + padString : padString + str;
} 