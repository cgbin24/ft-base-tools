/**
 * 加密与安全工具类型定义
 */

export interface HashOptions {
  encoding?: 'hex' | 'base64' | 'utf8';
  iterations?: number;
}

export interface EncryptOptions {
  iv?: string;
  mode?: string;
  padding?: string;
}

export interface UuidOptions {
  version?: 1 | 4 | 5;
  namespace?: string;
  name?: string;
} 