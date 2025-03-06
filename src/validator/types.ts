/**
 * 验证工具类型定义
 */

export interface ValidationResult {
  valid: boolean;
  message?: string;
}

export interface ValidationOptions {
  strict?: boolean;
  message?: string;
}

export interface PasswordOptions {
  minLength?: number;
  requireLowercase?: boolean;
  requireUppercase?: boolean;
  requireNumber?: boolean;
  requireSpecialChar?: boolean;
} 