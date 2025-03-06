/**
 * DOM工具类型定义
 */

export interface ScrollToOptions {
  top?: number;
  left?: number;
  behavior?: 'auto' | 'smooth';
  duration?: number;
}

export interface ElementPosition {
  top: number;
  left: number;
  right: number;
  bottom: number;
  width: number;
  height: number;
}

export type EventCallback = (event: Event) => void; 