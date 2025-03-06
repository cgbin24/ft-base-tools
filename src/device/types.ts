/**
 * 设备检测工具类型定义
 */

export interface BrowserInfo {
  name: string;
  version: string;
  engine: string;
  engineVersion: string;
  os: string;
  osVersion: string;
  device: 'mobile' | 'tablet' | 'desktop';
  language: string;
}

export interface NetworkInfo {
  online: boolean;
  type?: 'wifi' | 'cellular' | 'ethernet' | 'unknown';
  effectiveType?: '2g' | '3g' | '4g' | '5g';
} 