/**
 * 数学计算工具类型定义
 */

export interface CalculateOptions {
  precision?: number;
  roundingMode?: 'round' | 'floor' | 'ceil';
}

export interface StatisticsResult {
  min: number;
  max: number;
  sum: number;
  average: number;
  median: number;
  variance: number;
  standardDeviation: number;
  count: number;
} 