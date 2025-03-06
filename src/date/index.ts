/**
 * 日期工具模块
 */
import { DateUnit, DateInput, FormatOptions, DateRange } from './types';

/**
 * 将输入转换为日期对象
 * @param date 日期输入
 */
function toDate(date: DateInput): Date {
  if (date instanceof Date) {
    return date;
  }
  
  if (typeof date === 'number') {
    return new Date(date);
  }
  
  if (typeof date === 'string') {
    // 尝试解析日期字符串
    const parsedDate = new Date(date);
    
    // 检查是否为有效日期
    if (!isNaN(parsedDate.getTime())) {
      return parsedDate;
    }
    
    throw new Error(`Invalid date string: ${date}`);
  }
  
  throw new Error('Invalid date input');
}

/**
 * 日期格式化
 * @param date 日期对象或时间戳
 * @param format 格式化模板，如 "YYYY-MM-DD HH:mm:ss"
 * @param options 格式化选项
 */
export function format(
  date: DateInput, 
  format: string = 'YYYY-MM-DD', 
  options?: FormatOptions
): string {
  try {
    const dateObj = toDate(date);
    const { locale = 'default', timezone } = options || {};
    
    // 如果指定了时区，使用Intl.DateTimeFormat
    if (timezone) {
      const formatter = new Intl.DateTimeFormat(locale, {
        timeZone: timezone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });
      
      const parts = formatter.formatToParts(dateObj);
      const formattedParts: Record<string, string> = {};
      
      parts.forEach(part => {
        formattedParts[part.type] = part.value;
      });
      
      // 替换格式字符串中的占位符
      return format
        .replace(/YYYY/g, formattedParts.year || String(dateObj.getFullYear()))
        .replace(/MM/g, formattedParts.month || String(dateObj.getMonth() + 1).padStart(2, '0'))
        .replace(/DD/g, formattedParts.day || String(dateObj.getDate()).padStart(2, '0'))
        .replace(/HH/g, formattedParts.hour || String(dateObj.getHours()).padStart(2, '0'))
        .replace(/mm/g, formattedParts.minute || String(dateObj.getMinutes()).padStart(2, '0'))
        .replace(/ss/g, formattedParts.second || String(dateObj.getSeconds()).padStart(2, '0'));
    }
    
    // 基本格式化
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    const hours = String(dateObj.getHours()).padStart(2, '0');
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');
    const seconds = String(dateObj.getSeconds()).padStart(2, '0');
    const milliseconds = String(dateObj.getMilliseconds()).padStart(3, '0');
    
    return format
      .replace(/YYYY/g, String(year))
      .replace(/MM/g, month)
      .replace(/DD/g, day)
      .replace(/HH/g, hours)
      .replace(/mm/g, minutes)
      .replace(/ss/g, seconds)
      .replace(/SSS/g, milliseconds);
  } catch (e) {
    console.error('Error formatting date:', e);
    return '';
  }
}

/**
 * 日期计算
 * @param date 基准日期
 * @param amount 增加的数量
 * @param unit 单位：day, month, year, hour, minute, second
 */
export function add(date: Date, amount: number, unit: DateUnit): Date {
  const result = new Date(date);
  
  switch (unit) {
    case 'year':
      result.setFullYear(result.getFullYear() + amount);
      break;
    case 'month':
      result.setMonth(result.getMonth() + amount);
      break;
    case 'day':
      result.setDate(result.getDate() + amount);
      break;
    case 'hour':
      result.setHours(result.getHours() + amount);
      break;
    case 'minute':
      result.setMinutes(result.getMinutes() + amount);
      break;
    case 'second':
      result.setSeconds(result.getSeconds() + amount);
      break;
    case 'millisecond':
      result.setMilliseconds(result.getMilliseconds() + amount);
      break;
    default:
      throw new Error(`Invalid date unit: ${unit}`);
  }
  
  return result;
}

/**
 * 时间差计算
 * @param date1 第一个日期
 * @param date2 第二个日期
 * @param unit 返回的单位
 */
export function diff(date1: Date, date2: Date, unit: DateUnit): number {
  const diffMs = date2.getTime() - date1.getTime();
  
  switch (unit) {
    case 'year':
      return date2.getFullYear() - date1.getFullYear();
    case 'month':
      return (date2.getFullYear() - date1.getFullYear()) * 12 + date2.getMonth() - date1.getMonth();
    case 'day':
      return Math.floor(diffMs / (1000 * 60 * 60 * 24));
    case 'hour':
      return Math.floor(diffMs / (1000 * 60 * 60));
    case 'minute':
      return Math.floor(diffMs / (1000 * 60));
    case 'second':
      return Math.floor(diffMs / 1000);
    case 'millisecond':
      return diffMs;
    default:
      throw new Error(`Invalid date unit: ${unit}`);
  }
}

/**
 * 工作日判断
 * @param date 需要判断的日期
 * @param excludeHolidays 是否排除法定节假日
 */
export function isWorkday(date: Date, excludeHolidays: boolean = false): boolean {
  const day = date.getDay();
  
  // 周末不是工作日
  if (day === 0 || day === 6) {
    return false;
  }
  
  // 如果需要排除法定节假日，这里需要一个节假日数据库
  // 这里只是一个简单的示例，实际应用中可能需要更复杂的逻辑
  if (excludeHolidays) {
    const holidays = getHolidays(date.getFullYear());
    const dateString = format(date, 'YYYY-MM-DD');
    
    return !holidays.includes(dateString);
  }
  
  return true;
}

/**
 * 获取指定年份的法定节假日
 * @param year 年份
 */
function getHolidays(year: number): string[] {
  // 这里应该返回指定年份的法定节假日列表
  // 实际应用中，可能需要从API获取或使用预定义的数据
  // 这里只是一个简单的示例
  return [
    `${year}-01-01`, // 元旦
    `${year}-05-01`, // 劳动节
    `${year}-10-01`, // 国庆节
    // 其他节假日...
  ];
}

/**
 * 相对时间
 * @param date 日期
 * @param baseDate 基准日期，默认为当前时间
 */
export function fromNow(date: Date, baseDate: Date = new Date()): string {
  const diffSeconds = Math.floor((baseDate.getTime() - date.getTime()) / 1000);
  
  if (diffSeconds < 0) {
    return '未来';
  }
  
  if (diffSeconds < 60) {
    return `${diffSeconds}秒前`;
  }
  
  const diffMinutes = Math.floor(diffSeconds / 60);
  
  if (diffMinutes < 60) {
    return `${diffMinutes}分钟前`;
  }
  
  const diffHours = Math.floor(diffMinutes / 60);
  
  if (diffHours < 24) {
    return `${diffHours}小时前`;
  }
  
  const diffDays = Math.floor(diffHours / 24);
  
  if (diffDays < 30) {
    return `${diffDays}天前`;
  }
  
  const diffMonths = Math.floor(diffDays / 30);
  
  if (diffMonths < 12) {
    return `${diffMonths}个月前`;
  }
  
  const diffYears = Math.floor(diffMonths / 12);
  
  return `${diffYears}年前`;
}

/**
 * 获取日期范围内的所有日期
 * @param start 开始日期
 * @param end 结束日期
 * @param step 步长（天数），默认为1
 * @returns 日期数组
 */
export function getDateRange(start: Date, end: Date, step: number = 1): Date[] {
  const dates: Date[] = [];
  const current = new Date(start);
  
  while (current <= end) {
    dates.push(new Date(current));
    current.setDate(current.getDate() + step);
  }
  
  return dates;
}

/**
 * 解析日期字符串为日期对象
 * @param dateStr 日期字符串
 * @param format 日期格式，默认为 'YYYY-MM-DD'
 * @returns 日期对象
 */
export function parse(dateStr: string, format: string = 'YYYY-MM-DD'): Date {
  // 默认日期部分
  let year = new Date().getFullYear();
  let month = 0;
  let day = 1;
  let hours = 0;
  let minutes = 0;
  let seconds = 0;
  
  // 解析格式字符串，找出各部分的位置
  const yearIndex = format.indexOf('YYYY');
  const monthIndex = format.indexOf('MM');
  const dayIndex = format.indexOf('DD');
  const hourIndex = format.indexOf('HH');
  const minuteIndex = format.indexOf('mm');
  const secondIndex = format.indexOf('ss');
  
  // 提取各部分的值
  if (yearIndex > -1) {
    year = parseInt(dateStr.substring(yearIndex, yearIndex + 4), 10);
  }
  
  if (monthIndex > -1) {
    month = parseInt(dateStr.substring(monthIndex, monthIndex + 2), 10) - 1;
  }
  
  if (dayIndex > -1) {
    day = parseInt(dateStr.substring(dayIndex, dayIndex + 2), 10);
  }
  
  if (hourIndex > -1) {
    hours = parseInt(dateStr.substring(hourIndex, hourIndex + 2), 10);
  }
  
  if (minuteIndex > -1) {
    minutes = parseInt(dateStr.substring(minuteIndex, minuteIndex + 2), 10);
  }
  
  if (secondIndex > -1) {
    seconds = parseInt(dateStr.substring(secondIndex, secondIndex + 2), 10);
  }
  
  return new Date(year, month, day, hours, minutes, seconds);
}

/**
 * 添加时间
 * @param date 日期对象或时间戳
 * @param amount 添加的数量
 * @param unit 时间单位：years, months, days, hours, minutes, seconds
 * @returns 新的日期对象
 */
export function addTime(
  date: Date | number,
  amount: number,
  unit: 'years' | 'months' | 'days' | 'hours' | 'minutes' | 'seconds'
): Date {
  const d = new Date(date);
  
  switch (unit) {
    case 'years':
      d.setFullYear(d.getFullYear() + amount);
      break;
    case 'months':
      d.setMonth(d.getMonth() + amount);
      break;
    case 'days':
      d.setDate(d.getDate() + amount);
      break;
    case 'hours':
      d.setHours(d.getHours() + amount);
      break;
    case 'minutes':
      d.setMinutes(d.getMinutes() + amount);
      break;
    case 'seconds':
      d.setSeconds(d.getSeconds() + amount);
      break;
  }
  
  return d;
}

/**
 * 计算两个日期之间的差值
 * @param date1 第一个日期
 * @param date2 第二个日期
 * @param unit 返回的单位：years, months, days, hours, minutes, seconds, milliseconds
 * @returns 差值
 */
export function diffTime(
  date1: Date | number,
  date2: Date | number,
  unit: 'years' | 'months' | 'days' | 'hours' | 'minutes' | 'seconds' | 'milliseconds' = 'milliseconds'
): number {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diff = d2.getTime() - d1.getTime();
  
  switch (unit) {
    case 'years':
      return d2.getFullYear() - d1.getFullYear();
    case 'months':
      return (d2.getFullYear() - d1.getFullYear()) * 12 + d2.getMonth() - d1.getMonth();
    case 'days':
      return Math.floor(diff / (1000 * 60 * 60 * 24));
    case 'hours':
      return Math.floor(diff / (1000 * 60 * 60));
    case 'minutes':
      return Math.floor(diff / (1000 * 60));
    case 'seconds':
      return Math.floor(diff / 1000);
    default:
      return diff;
  }
}

/**
 * 判断是否为闰年
 * @param year 年份或日期对象
 * @returns 是否为闰年
 */
export function isLeapYear(year: number | Date): boolean {
  const y = year instanceof Date ? year.getFullYear() : year;
  
  // 闰年规则：能被4整除但不能被100整除，或者能被400整除
  return (y % 4 === 0 && y % 100 !== 0) || (y % 400 === 0);
}

/**
 * 获取相对时间描述
 * @param date 日期对象或时间戳
 * @param baseDate 基准日期，默认为当前时间
 * @param options 选项
 * @returns 相对时间描述
 */
export function relativeTime(
  date: Date | number,
  baseDate: Date | number = new Date(),
  options?: {
    future?: string;
    past?: string;
    s?: string;
    m?: string;
    mm?: string;
    h?: string;
    hh?: string;
    d?: string;
    dd?: string;
    M?: string;
    MM?: string;
    y?: string;
    yy?: string;
  }
): string {
  const dateObj = new Date(date);
  const base = new Date(baseDate);
  const now = base.getTime();
  const diff = now - dateObj.getTime();
  
  const isFuture = diff < 0;
  const absDiff = Math.abs(diff);
  
  const {
    future = '%s后',
    past = '%s前',
    s = '几秒',
    m = '1分钟',
    mm = '%d分钟',
    h = '1小时',
    hh = '%d小时',
    d = '1天',
    dd = '%d天',
    M = '1个月',
    MM = '%d个月',
    y = '1年',
    yy = '%d年'
  } = options || {};
  
  let result;
  
  if (absDiff < 1000 * 45) { // 45秒内
    result = s;
  } else if (absDiff < 1000 * 60 * 45) { // 45分钟内
    const minutes = Math.round(absDiff / (1000 * 60));
    result = minutes === 1 ? m : mm.replace('%d', String(minutes));
  } else if (absDiff < 1000 * 60 * 60 * 22) { // 22小时内
    const hours = Math.round(absDiff / (1000 * 60 * 60));
    result = hours === 1 ? h : hh.replace('%d', String(hours));
  } else if (absDiff < 1000 * 60 * 60 * 24 * 26) { // 26天内
    const days = Math.round(absDiff / (1000 * 60 * 60 * 24));
    result = days === 1 ? d : dd.replace('%d', String(days));
  } else if (absDiff < 1000 * 60 * 60 * 24 * 345) { // 345天内
    const months = Math.round(absDiff / (1000 * 60 * 60 * 24 * 30));
    result = months === 1 ? M : MM.replace('%d', String(months));
  } else {
    const years = Math.round(absDiff / (1000 * 60 * 60 * 24 * 365));
    result = years === 1 ? y : yy.replace('%d', String(years));
  }
  
  return isFuture ? future.replace('%s', result) : past.replace('%s', result);
} 