/**
 * 数学计算工具模块
 */
import { CalculateOptions, StatisticsResult } from './types';

/**
 * 精确计算
 */
export const calculate = {
  /**
   * 精确加法
   * @param a 加数
   * @param b 加数
   * @param options 计算选项
   */
  add(a: number, b: number, options?: CalculateOptions): number {
    const { precision, roundingMode = 'round' } = options || {};
    
    // 将小数转为整数计算
    const factor1 = countDecimals(a);
    const factor2 = countDecimals(b);
    const factor = Math.pow(10, Math.max(factor1, factor2));
    
    const result = (a * factor + b * factor) / factor;
    
    return precision !== undefined ? round(result, precision, roundingMode) : result;
  },
  
  /**
   * 精确减法
   * @param a 被减数
   * @param b 减数
   * @param options 计算选项
   */
  subtract(a: number, b: number, options?: CalculateOptions): number {
    const { precision, roundingMode = 'round' } = options || {};
    
    // 将小数转为整数计算
    const factor1 = countDecimals(a);
    const factor2 = countDecimals(b);
    const factor = Math.pow(10, Math.max(factor1, factor2));
    
    const result = (a * factor - b * factor) / factor;
    
    return precision !== undefined ? round(result, precision, roundingMode) : result;
  },
  
  /**
   * 精确乘法
   * @param a 乘数
   * @param b 乘数
   * @param options 计算选项
   */
  multiply(a: number, b: number, options?: CalculateOptions): number {
    const { precision, roundingMode = 'round' } = options || {};
    
    // 将小数转为整数计算
    const factor1 = countDecimals(a);
    const factor2 = countDecimals(b);
    
    const result = (a * Math.pow(10, factor1) * (b * Math.pow(10, factor2))) / Math.pow(10, factor1 + factor2);
    
    return precision !== undefined ? round(result, precision, roundingMode) : result;
  },
  
  /**
   * 精确除法
   * @param a 被除数
   * @param b 除数
   * @param options 计算选项
   */
  divide(a: number, b: number, options?: CalculateOptions): number {
    if (b === 0) {
      throw new Error('Division by zero');
    }
    
    const { precision = 10, roundingMode = 'round' } = options || {};
    
    // 将小数转为整数计算
    const factor1 = countDecimals(a);
    const factor2 = countDecimals(b);
    
    const result = (a * Math.pow(10, factor1)) / (b * Math.pow(10, factor2)) * Math.pow(10, factor2 - factor1);
    
    return round(result, precision, roundingMode);
  }
};

/**
 * 计算小数位数
 * @param num 数字
 */
function countDecimals(num: number): number {
  if (Math.floor(num) === num) return 0;
  
  const str = num.toString();
  if (str.indexOf('.') !== -1) {
    return str.split('.')[1].length;
  }
  
  return 0;
}

/**
 * 数字舍入
 * @param num 数字
 * @param precision 精度
 * @param mode 舍入模式
 */
function round(num: number, precision: number = 0, mode: 'round' | 'floor' | 'ceil' = 'round'): number {
  const factor = Math.pow(10, precision);
  
  switch (mode) {
    case 'round':
      return Math.round(num * factor) / factor;
    case 'floor':
      return Math.floor(num * factor) / factor;
    case 'ceil':
      return Math.ceil(num * factor) / factor;
    default:
      return Math.round(num * factor) / factor;
  }
}

/**
 * 统计计算
 * @param numbers 数字数组
 */
export function statistics(numbers: number[]): StatisticsResult {
  if (!numbers.length) {
    throw new Error('Empty array');
  }
  
  // 排序数组（用于计算中位数）
  const sorted = [...numbers].sort((a, b) => a - b);
  
  // 最小值
  const min = sorted[0];
  
  // 最大值
  const max = sorted[sorted.length - 1];
  
  // 总和
  const sum = numbers.reduce((acc, val) => acc + val, 0);
  
  // 平均值
  const average = sum / numbers.length;
  
  // 中位数
  let median: number;
  const mid = Math.floor(sorted.length / 2);
  
  if (sorted.length % 2 === 0) {
    median = (sorted[mid - 1] + sorted[mid]) / 2;
  } else {
    median = sorted[mid];
  }
  
  // 方差
  const variance = numbers.reduce((acc, val) => acc + Math.pow(val - average, 2), 0) / numbers.length;
  
  // 标准差
  const standardDeviation = Math.sqrt(variance);
  
  return {
    min,
    max,
    sum,
    average,
    median,
    variance,
    standardDeviation,
    count: numbers.length
  };
}

/**
 * 随机数生成
 * @param min 最小值
 * @param max 最大值
 * @param isInteger 是否为整数
 */
export function random(min: number, max: number, isInteger: boolean = true): number {
  const rand = Math.random() * (max - min) + min;
  return isInteger ? Math.floor(rand) : rand;
}

/**
 * 角度转弧度
 * @param degrees 角度
 */
export function degreesToRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

/**
 * 弧度转角度
 * @param radians 弧度
 */
export function radiansToDegrees(radians: number): number {
  return radians * (180 / Math.PI);
}

/**
 * 计算两点之间的距离
 * @param x1 点1的x坐标
 * @param y1 点1的y坐标
 * @param x2 点2的x坐标
 * @param y2 点2的y坐标
 */
export function distance(x1: number, y1: number, x2: number, y2: number): number {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

/**
 * 线性插值
 * @param start 起始值
 * @param end 结束值
 * @param amount 插值比例 (0-1)
 */
export function lerp(start: number, end: number, amount: number): number {
  return start + (end - start) * amount;
}

/**
 * 限制数值范围
 * @param value 需要限制的值
 * @param min 最小值
 * @param max 最大值
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
} 