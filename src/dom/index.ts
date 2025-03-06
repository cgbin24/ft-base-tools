/**
 * DOM工具模块
 */
import { ScrollToOptions, ElementPosition, EventCallback } from './types';

/**
 * 元素选择器
 * @param selector 选择器字符串
 * @param parent 父元素，默认为document
 */
export function $(selector: string, parent: Element | Document = document): Element | null {
  return parent.querySelector(selector);
}

/**
 * 多元素选择器
 * @param selector 选择器字符串
 * @param parent 父元素，默认为document
 */
export function $$(selector: string, parent: Element | Document = document): Element[] {
  return Array.from(parent.querySelectorAll(selector));
}

/**
 * 类名操作
 * @param el 目标元素
 * @param className 类名
 * @param action 操作类型：add, remove, toggle, has
 */
export const className = function(
  el: Element, 
  className: string, 
  action: 'add' | 'remove' | 'toggle' | 'has'
): boolean | void {
  if (!el || !className) {
    return action === 'has' ? false : undefined;
  }
  
  switch (action) {
    case 'add':
      el.classList.add(className);
      break;
    case 'remove':
      el.classList.remove(className);
      break;
    case 'toggle':
      return el.classList.toggle(className);
    case 'has':
      return el.classList.contains(className);
  }
} as {
  (el: Element, className: string, action: 'add' | 'remove' | 'toggle' | 'has'): boolean | void;
  add(el: Element, className: string): void;
  remove(el: Element, className: string): void;
  toggle(el: Element, className: string): boolean;
  has(el: Element, className: string): boolean;
};

// 添加方法
className.add = function(el: Element, className: string): void {
  if (!el.classList.contains(className)) {
    el.classList.add(className);
  }
};

className.remove = function(el: Element, className: string): void {
  el.classList.remove(className);
};

className.toggle = function(el: Element, className: string): boolean {
  return el.classList.toggle(className);
};

className.has = function(el: Element, className: string): boolean {
  return el.classList.contains(className);
};

/**
 * 事件处理
 * @param el 目标元素
 * @param event 事件名称
 * @param handler 事件处理函数
 * @param options 事件选项
 */
export function on(
  el: Element | Window | Document, 
  event: string, 
  handler: EventListenerOrEventListenerObject, 
  options?: boolean | AddEventListenerOptions
): void {
  if (!el) return;
  
  el.addEventListener(event, handler, options);
}

/**
 * 移除事件处理
 * @param el 目标元素
 * @param event 事件名称
 * @param handler 事件处理函数
 * @param options 事件选项
 */
export function off(
  el: Element | Window | Document, 
  event: string, 
  handler: EventListenerOrEventListenerObject, 
  options?: boolean | EventListenerOptions
): void {
  if (!el) return;
  
  el.removeEventListener(event, handler, options);
}

/**
 * 元素尺寸和位置
 * @param el 目标元素
 */
export function getRect(el: Element): ElementPosition {
  const rect = el.getBoundingClientRect();
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  return {
    top: rect.top + scrollTop,
    left: rect.left + scrollLeft,
    right: rect.right + scrollLeft,
    bottom: rect.bottom + scrollTop,
    width: rect.width,
    height: rect.height
  };
}

/**
 * 平滑滚动
 * @param el 目标元素
 * @param options 滚动选项
 */
export function scrollTo(el: Element | Window, options: ScrollToOptions): void {
  const { top, left, behavior = 'smooth', duration = 500 } = options;
  
  // 如果浏览器支持原生平滑滚动，则使用原生方法
  if ('scrollBehavior' in document.documentElement.style) {
    if (el === window) {
      window.scrollTo({
        top,
        left,
        behavior
      });
    } else {
      (el as Element).scrollTo({
        top,
        left,
        behavior
      });
    }
    return;
  }
  
  // 否则使用自定义动画
  const startTime = Date.now();
  const startTop = el === window ? window.pageYOffset : (el as Element).scrollTop;
  const startLeft = el === window ? window.pageXOffset : (el as Element).scrollLeft;
  const targetTop = top !== undefined ? top : startTop;
  const targetLeft = left !== undefined ? left : startLeft;
  
  const easeInOutQuad = (t: number): number => {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  };
  
  const animation = () => {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeProgress = easeInOutQuad(progress);
    
    if (el === window) {
      window.scrollTo(
        startLeft + (targetLeft - startLeft) * easeProgress,
        startTop + (targetTop - startTop) * easeProgress
      );
    } else {
      (el as Element).scrollTop = startTop + (targetTop - startTop) * easeProgress;
      (el as Element).scrollLeft = startLeft + (targetLeft - startLeft) * easeProgress;
    }
    
    if (progress < 1) {
      requestAnimationFrame(animation);
    }
  };
  
  animation();
}

/**
 * 元素可见性检测
 * @param el 目标元素
 * @param partiallyVisible 是否允许部分可见
 */
export function isVisible(el: Element, partiallyVisible: boolean = false): boolean {
  if (!el) return false;
  
  const rect = el.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;
  
  // 检查元素是否在视口内
  const vertInView = partiallyVisible
    ? rect.top <= windowHeight && rect.bottom >= 0
    : rect.top >= 0 && rect.bottom <= windowHeight;
    
  const horInView = partiallyVisible
    ? rect.left <= windowWidth && rect.right >= 0
    : rect.left >= 0 && rect.right <= windowWidth;
    
  return vertInView && horInView;
}

/**
 * 元素属性操作
 * @param el 目标元素
 * @param name 属性名
 * @param value 属性值
 */
export const attr = function(el: Element, name: string, value?: string): string | null {
  if (!el) return null;
  
  if (value === undefined) {
    return el.getAttribute(name);
  }
  
  el.setAttribute(name, value);
  return value;
} as {
  (el: Element, name: string, value?: string): string | null;
  get(el: Element, name: string): string | null;
  set(el: Element, name: string, value: string): string;
  remove(el: Element, name: string): void;
};

// 添加方法
attr.get = function(el: Element, name: string): string | null {
  return el.getAttribute(name);
};

attr.set = function(el: Element, name: string, value: string): string {
  el.setAttribute(name, value);
  return value;
};

attr.remove = function(el: Element, name: string): void {
  el.removeAttribute(name);
};

/**
 * 元素样式操作
 * @param el 目标元素
 * @param property 样式属性
 * @param value 样式值
 */
export const css = function(el: HTMLElement, property: string | Record<string, string>, value?: string): string | null {
  if (!el) return null;
  
  // 获取样式
  if (typeof property === 'string' && value === undefined) {
    return window.getComputedStyle(el).getPropertyValue(property);
  }
  
  // 设置单个样式
  if (typeof property === 'string' && value !== undefined) {
    el.style.setProperty(property, value);
    return value;
  }
  
  // 设置多个样式
  if (typeof property === 'object') {
    Object.entries(property).forEach(([prop, val]) => {
      el.style.setProperty(prop, val);
    });
  }
  
  return null;
} as {
  (el: HTMLElement, property: string | Record<string, string>, value?: string): string | null;
  get(el: HTMLElement, property: string): string | null;
  set(el: HTMLElement, property: string | Record<string, string>, value?: string): string | null;
};

css.get = function(el: HTMLElement, property: string): string | null {
  return window.getComputedStyle(el).getPropertyValue(property);
};

css.set = function(el: HTMLElement, property: string | Record<string, string>, value?: string): string | null {
  // 设置单个样式
  if (typeof property === 'string' && value !== undefined) {
    el.style.setProperty(property, value);
    return value;
  }
  
  // 设置多个样式
  if (typeof property === 'object') {
    Object.entries(property).forEach(([prop, val]) => {
      el.style.setProperty(prop, val);
    });
  }
  
  return null;
};

/**
 * 表单数据获取
 * @param form 表单元素
 */
export function formToObject(form: HTMLFormElement): Record<string, string | string[]> {
  if (!form) return {};
  
  const formData = new FormData(form);
  const result: Record<string, string | string[]> = {};
  
  formData.forEach((value, key) => {
    if (result[key] === undefined) {
      result[key] = value.toString();
    } else if (Array.isArray(result[key])) {
      (result[key] as string[]).push(value.toString());
    } else {
      result[key] = [result[key] as string, value.toString()];
    }
  });
  
  return result;
} 