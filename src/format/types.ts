/**
 * 格式化工具类型定义
 */

export interface CurrencyOptions {
  decimals?: number;
  symbol?: string;
  thousand?: string;
  decimal?: string;
  symbolPosition?: 'before' | 'after';
}

export interface FileSizeOptions {
  decimals?: number;
  spacer?: string;
  base?: 1000 | 1024;
  standard?: 'SI' | 'IEC' | 'JEDEC';
}

export interface TimeFormatOptions {
  locale?: string;
  timezone?: string;
} 