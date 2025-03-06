/**
 * 数组工具模块
 */
import { SortOrder, GroupByFunction } from './types';

/**
 * 数组去重
 * @param arr 需要去重的数组
 * @returns 去重后的数组
 */
export function unique<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}

/**
 * 数组排序
 * @param arr 需要排序的数组
 * @param key 如果是对象数组，指定排序的键
 * @param order 排序方式，默认升序
 */
export function sort<T>(arr: T[], key?: string, order: SortOrder = 'asc'): T[] {
  const result = [...arr];
  
  return result.sort((a, b) => {
    let valueA = key ? (a as any)[key] : a;
    let valueB = key ? (b as any)[key] : b;
    
    // 字符串比较
    if (typeof valueA === 'string' && typeof valueB === 'string') {
      return order === 'asc' 
        ? valueA.localeCompare(valueB) 
        : valueB.localeCompare(valueA);
    }
    
    // 数字比较
    return order === 'asc' ? valueA - valueB : valueB - valueA;
  });
}

/**
 * 数组分组
 * @param arr 需要分组的数组
 * @param key 分组依据的键或函数
 */
export function groupBy<T>(arr: T[], key: string | GroupByFunction<T>): Record<string, T[]> {
  return arr.reduce((result, item) => {
    const groupKey = typeof key === 'function' ? key(item) : (item as any)[key];
    
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    
    result[groupKey].push(item);
    return result;
  }, {} as Record<string, T[]>);
}

/**
 * 数组交集
 * @param arr1 第一个数组
 * @param arr2 第二个数组
 */
export function intersection<T>(arr1: T[], arr2: T[]): T[] {
  const set = new Set(arr2);
  return arr1.filter(item => set.has(item));
}

/**
 * 数组并集
 * @param arr1 第一个数组
 * @param arr2 第二个数组
 */
export function union<T>(arr1: T[], arr2: T[]): T[] {
  return unique([...arr1, ...arr2]);
}

/**
 * 数组差集
 * @param arr1 第一个数组
 * @param arr2 第二个数组
 */
export function difference<T>(arr1: T[], arr2: T[]): T[] {
  const set = new Set(arr2);
  return arr1.filter(item => !set.has(item));
}

/**
 * 数组扁平化
 * @param arr 需要扁平化的数组
 * @param depth 扁平化深度，默认为Infinity
 */
export function flatten<T>(arr: any[], depth: number = Infinity): T[] {
  return arr.flat(depth);
}

/**
 * 数组分块
 * @param arr 需要分块的数组
 * @param size 每块的大小
 */
export function chunk<T>(arr: T[], size: number): T[][] {
  return Array.from({ length: Math.ceil(arr.length / size) }, (_, index) => 
    arr.slice(index * size, index * size + size)
  );
}

/**
 * 数组洗牌
 * @param arr 需要洗牌的数组
 */
export function shuffle<T>(arr: T[]): T[] {
  const result = [...arr];
  
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  
  return result;
} 