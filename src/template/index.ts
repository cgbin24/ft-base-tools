/**
 * 字符串模板工具模块
 */
import { TemplateOptions } from '../string/types';

/**
 * 简单模板引擎
 * @param template 模板字符串
 * @param data 数据对象
 * @param options 模板选项
 */
export function render(template: string, data: Record<string, any>, options?: TemplateOptions): string {
  const { delimiter = /\{\{(.+?)\}\}/, escape = true } = options || {};
  
  // 处理嵌套属性访问，如 user.name
  const getValue = (key: string, data: Record<string, any>): any => {
    return key.split('.').reduce((obj: any, prop: string) => {
      return obj && obj[prop] !== undefined ? obj[prop] : '';
    }, data);
  };
  
  // 转义HTML特殊字符
  const escapeHtml = (str: string): string => {
    if (!escape) return str;
    
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  };
  
  // 替换模板变量
  return template.replace(delimiter, (_, key) => {
    const trimmedKey = key.trim();
    const value = getValue(trimmedKey, data);
    return escapeHtml(String(value));
  });
}

/**
 * 条件渲染
 * @param condition 条件表达式
 * @param trueTemplate 条件为真时的模板
 * @param falseTemplate 条件为假时的模板
 */
export function conditional(condition: boolean, trueTemplate: string, falseTemplate: string = ''): string {
  return condition ? trueTemplate : falseTemplate;
}

/**
 * 列表渲染
 * @param items 列表数据
 * @param template 项目模板
 * @param options 模板选项
 */
export function each<T>(items: T[], template: string, options?: TemplateOptions): string {
  if (!items || !items.length) {
    return '';
  }
  
  return items.map((item, index) => {
    // 创建包含索引的数据对象
    const itemData = {
      item,
      index,
      first: index === 0,
      last: index === items.length - 1,
      ...(typeof item === 'object' ? item : { value: item })
    };
    
    return render(template, itemData as Record<string, any>, options);
  }).join('');
}

/**
 * 格式化模板
 * 类似于 C# 的 string.Format 或 Java 的 String.format
 * @param template 模板字符串，使用 {0}, {1} 等作为占位符
 * @param args 替换参数
 */
export function format(template: string, ...args: any[]): string {
  return template.replace(/{(\d+)}/g, (match, index) => {
    const i = Number(index);
    return i >= 0 && i < args.length ? String(args[i]) : match;
  });
}

/**
 * 多语言模板
 * @param key 语言键
 * @param data 数据对象
 * @param locale 语言环境
 * @param fallback 回退语言
 */
export function i18n(
  key: string,
  data: Record<string, any> = {},
  locale: string = 'zh-CN',
  fallback: string = 'en-US'
): string {
  // 这里应该从语言包中获取模板，这里简化处理
  // 实际项目中应该使用专门的i18n库
  const templates: Record<string, Record<string, string>> = {
    'zh-CN': {
      'greeting': '你好，{{name}}！',
      'welcome': '欢迎来到{{site}}',
      'error': '发生错误：{{message}}'
    },
    'en-US': {
      'greeting': 'Hello, {{name}}!',
      'welcome': 'Welcome to {{site}}',
      'error': 'Error occurred: {{message}}'
    }
  };
  
  // 获取模板
  const localeTemplates = templates[locale] || templates[fallback];
  const template = localeTemplates[key] || key;
  
  // 渲染模板
  return render(template, data);
} 