/**
 * 数组工具类型定义
 */

export type SortOrder = 'asc' | 'desc';

export type GroupByFunction<T> = (item: T) => string; 