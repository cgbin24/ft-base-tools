/**
 * 日期工具类型定义
 */

export type DateUnit = 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second' | 'millisecond';

export type DateInput = Date | string | number;

export interface FormatOptions {
  locale?: string;
  timezone?: string;
}

export interface DateRange {
  start: Date;
  end: Date;
} 