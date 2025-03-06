/**
 * 字符串工具类型定义
 */

export type CaseType = 'camel' | 'pascal' | 'kebab' | 'snake';

export interface TruncateOptions {
  length: number;
  suffix?: string;
  preserveWords?: boolean;
}

export interface TemplateOptions {
  delimiter?: RegExp | string;
  escape?: boolean;
} 