/**
 * 格式化工具模块
 */
import { CurrencyOptions, FileSizeOptions, TimeFormatOptions } from './types';
import { format as dateFormat } from '../date';

/**
 * 金额格式化
 * @param amount 金额数值
 * @param options 格式化选项
 */
export function formatCurrency(amount: number, options?: CurrencyOptions): string {
  const {
    decimals = 2,
    symbol = '¥',
    thousand = ',',
    decimal = '.',
    symbolPosition = 'before'
  } = options || {};
  
  try {
    // 处理数值
    const fixedAmount = amount.toFixed(decimals);
    const [intPart, decimalPart] = fixedAmount.split('.');
    
    // 添加千分位分隔符
    const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, thousand);
    
    // 组合整数部分和小数部分
    const formattedAmount = decimals > 0
      ? `${formattedInt}${decimal}${decimalPart}`
      : formattedInt;
    
    // 添加货币符号
    return symbolPosition === 'before'
      ? `${symbol}${formattedAmount}`
      : `${formattedAmount}${symbol}`;
  } catch (e) {
    console.error('Error formatting currency:', e);
    return `${symbol}${amount}`;
  }
}

/**
 * 数字千分位
 * @param num 数字
 * @param separator 分隔符，默认为逗号
 */
export function formatThousands(num: number, separator: string = ','): string {
  try {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
  } catch (e) {
    console.error('Error formatting thousands:', e);
    return num.toString();
  }
}

/**
 * 文件大小格式化
 * @param bytes 字节数
 * @param options 格式化选项
 */
export function formatFileSize(bytes: number, options?: FileSizeOptions): string {
  const {
    decimals = 2,
    spacer = ' ',
    base = 1024,
    standard = 'IEC'
  } = options || {};
  
  if (bytes === 0) return `0${spacer}B`;
  
  try {
    const units = {
      SI: ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
      IEC: ['B', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'],
      JEDEC: ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    };
    
    const unitArray = units[standard];
    const i = Math.floor(Math.log(bytes) / Math.log(base));
    
    return `${parseFloat((bytes / Math.pow(base, i)).toFixed(decimals))}${spacer}${unitArray[i]}`;
  } catch (e) {
    console.error('Error formatting file size:', e);
    return `${bytes}${spacer}B`;
  }
}

/**
 * 时间格式化
 * @param time 时间戳或日期对象
 * @param format 格式化模板
 * @param options 格式化选项
 */
export function formatTime(
  time: number | Date,
  format: string = 'YYYY-MM-DD HH:mm:ss',
  options?: TimeFormatOptions
): string {
  return dateFormat(time, format, options);
}

/**
 * 百分比格式化
 * @param value 数值
 * @param total 总数
 * @param decimals 小数位数
 */
export function formatPercent(value: number, total: number, decimals: number = 2): string {
  if (total === 0) return '0%';
  
  try {
    const percent = (value / total) * 100;
    return `${percent.toFixed(decimals)}%`;
  } catch (e) {
    console.error('Error formatting percent:', e);
    return `${value}/${total}`;
  }
}

/**
 * 手机号格式化
 * @param phone 手机号码
 * @param format 格式化模板，默认：XXX-XXXX-XXXX
 */
export function formatPhone(phone: string, format: string = 'XXX-XXXX-XXXX'): string {
  try {
    // 移除非数字字符
    const digits = phone.replace(/\D/g, '');
    
    if (!digits) return phone;
    
    let result = format;
    let digitIndex = 0;
    
    // 替换X为数字
    for (let i = 0; i < result.length && digitIndex < digits.length; i++) {
      if (result[i] === 'X') {
        result = result.substring(0, i) + digits[digitIndex] + result.substring(i + 1);
        digitIndex++;
      }
    }
    
    // 如果还有剩余数字，追加到末尾
    if (digitIndex < digits.length) {
      result += digits.substring(digitIndex);
    }
    
    return result;
  } catch (e) {
    console.error('Error formatting phone:', e);
    return phone;
  }
}

/**
 * 身份证格式化
 * @param idCard 身份证号码
 * @param mask 是否掩码处理，默认为true
 */
export function formatIdCard(idCard: string, mask: boolean = true): string {
  try {
    // 移除空格
    const cleanId = idCard.replace(/\s/g, '');
    
    if (!cleanId) return idCard;
    
    // 掩码处理
    if (mask) {
      if (cleanId.length === 18) {
        return `${cleanId.substring(0, 6)}********${cleanId.substring(14)}`;
      } else if (cleanId.length === 15) {
        return `${cleanId.substring(0, 6)}******${cleanId.substring(12)}`;
      }
      return cleanId;
    }
    
    // 格式化显示
    if (cleanId.length === 18) {
      return `${cleanId.substring(0, 6)} ${cleanId.substring(6, 14)} ${cleanId.substring(14)}`;
    } else if (cleanId.length === 15) {
      return `${cleanId.substring(0, 6)} ${cleanId.substring(6, 12)} ${cleanId.substring(12)}`;
    }
    
    return cleanId;
  } catch (e) {
    console.error('Error formatting ID card:', e);
    return idCard;
  }
}

/**
 * 银行卡格式化
 * @param cardNumber 银行卡号
 * @param mask 是否掩码处理，默认为true
 */
export function formatBankCard(cardNumber: string, mask: boolean = true): string {
  try {
    // 移除空格和其他非数字字符
    const digits = cardNumber.replace(/\D/g, '');
    
    if (!digits) return cardNumber;
    
    // 掩码处理
    if (mask) {
      if (digits.length > 8) {
        return `${digits.substring(0, 4)} **** **** ${digits.substring(digits.length - 4)}`;
      }
      return digits;
    }
    
    // 每4位添加空格
    return digits.replace(/(\d{4})(?=\d)/g, '$1 ');
  } catch (e) {
    console.error('Error formatting bank card:', e);
    return cardNumber;
  }
}

/**
 * 数字舍入
 * @param num 数字
 * @param precision 精度
 * @param mode 舍入模式：round(四舍五入)、floor(向下舍入)、ceil(向上舍入)
 */
export function round(
  num: number,
  precision: number = 0,
  mode: 'round' | 'floor' | 'ceil' = 'round'
): number {
  try {
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
  } catch (e) {
    console.error('Error rounding number:', e);
    return num;
  }
}

/**
 * 格式化数字
 * @param value 要格式化的数字
 * @param options 格式化选项
 * @returns 格式化后的字符串
 */
export function formatNumber(value: number, options?: {
  precision?: number;  // 小数位数
  thousand?: string;   // 千位分隔符
  decimal?: string;    // 小数点符号
  prefix?: string;     // 前缀
  suffix?: string;     // 后缀
}): string {
  const {
    precision = 0,
    thousand = ',',
    decimal = '.',
    prefix = '',
    suffix = ''
  } = options || {};

  // 处理精度
  const toFixed = value.toFixed(precision);
  
  // 分割整数和小数部分
  const parts = toFixed.split('.');
  
  // 处理整数部分的千位分隔
  const integerPart = parts[0];
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, thousand);
  
  // 组合结果
  let result = formattedInteger;
  if (precision > 0 && parts.length > 1) {
    result += decimal + parts[1];
  }
  
  return prefix + result + suffix;
} 