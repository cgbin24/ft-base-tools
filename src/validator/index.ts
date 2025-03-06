/**
 * 验证工具模块
 */
import { ValidationResult, ValidationOptions, PasswordOptions } from './types';

/**
 * 手机号验证
 * @param phone 手机号码
 * @param options 验证选项
 */
export function isPhone(phone: string, options?: ValidationOptions): ValidationResult {
  const { strict = true, message } = options || {};
  
  // 中国大陆手机号正则表达式
  const pattern = strict 
    ? /^1[3-9]\d{9}$/ // 严格模式：1开头，第二位3-9，共11位
    : /^1\d{10}$/;    // 宽松模式：1开头，共11位
  
  const valid = pattern.test(phone);
  
  return {
    valid,
    message: valid ? undefined : message || '请输入有效的手机号码'
  };
}

/**
 * 邮箱验证
 * @param email 邮箱地址
 * @param options 验证选项
 */
export function isEmail(email: string, options?: ValidationOptions): ValidationResult {
  const { strict = true, message } = options || {};
  
  // 邮箱正则表达式
  const pattern = strict
    ? /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ // 严格模式
    : /^[^@]+@[^@]+\.[^@]+$/; // 宽松模式
  
  const valid = pattern.test(email);
  
  return {
    valid,
    message: valid ? undefined : message || '请输入有效的邮箱地址'
  };
}

/**
 * 身份证验证
 * @param idCard 身份证号码
 * @param options 验证选项
 */
export function isIdCard(idCard: string, options?: ValidationOptions): ValidationResult {
  const { strict = true, message } = options || {};
  
  // 移除空格
  idCard = idCard.replace(/\s/g, '');
  
  // 基本格式验证
  const pattern = /(^\d{15}$)|(^\d{17}(\d|X|x)$)/;
  
  if (!pattern.test(idCard)) {
    return {
      valid: false,
      message: message || '身份证号码格式不正确'
    };
  }
  
  // 如果不是严格模式，只验证基本格式
  if (!strict) {
    return { valid: true };
  }
  
  // 严格模式下的验证
  // 15位身份证转换为18位
  if (idCard.length === 15) {
    idCard = convertTo18(idCard);
  }
  
  // 验证出生日期
  const birthDate = idCard.substring(6, 14);
  const year = parseInt(birthDate.substring(0, 4));
  const month = parseInt(birthDate.substring(4, 6));
  const day = parseInt(birthDate.substring(6, 8));
  
  const date = new Date(year, month - 1, day);
  
  if (
    date.getFullYear() !== year ||
    date.getMonth() + 1 !== month ||
    date.getDate() !== day
  ) {
    return {
      valid: false,
      message: message || '身份证号码中的出生日期无效'
    };
  }
  
  // 验证校验码
  const factors = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
  const checkCodes = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
  
  let sum = 0;
  for (let i = 0; i < 17; i++) {
    sum += parseInt(idCard.charAt(i)) * factors[i];
  }
  
  const checkCode = checkCodes[sum % 11];
  const lastChar = idCard.charAt(17).toUpperCase();
  
  if (checkCode !== lastChar) {
    return {
      valid: false,
      message: message || '身份证号码校验码错误'
    };
  }
  
  return { valid: true };
}

/**
 * 15位身份证转18位
 * @param idCard15 15位身份证号码
 */
function convertTo18(idCard15: string): string {
  let idCard18 = idCard15.substring(0, 6) + '19' + idCard15.substring(6);
  
  // 计算校验码
  const factors = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
  const checkCodes = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
  
  let sum = 0;
  for (let i = 0; i < 17; i++) {
    sum += parseInt(idCard18.charAt(i)) * factors[i];
  }
  
  const checkCode = checkCodes[sum % 11];
  
  return idCard18 + checkCode;
}

/**
 * URL 验证
 * @param url URL地址
 * @param options 验证选项
 */
export function isUrl(url: string, options?: ValidationOptions): ValidationResult {
  const { strict = true, message } = options || {};
  
  try {
    // 使用URL构造函数验证
    new URL(url);
    
    // 严格模式下，还需要验证协议
    if (strict) {
      const protocols = ['http:', 'https:'];
      const urlObj = new URL(url);
      
      if (!protocols.includes(urlObj.protocol)) {
        return {
          valid: false,
          message: message || 'URL必须使用HTTP或HTTPS协议'
        };
      }
    }
    
    return { valid: true };
  } catch (e) {
    return {
      valid: false,
      message: message || '请输入有效的URL地址'
    };
  }
}

/**
 * 强密码验证
 * @param password 密码
 * @param options 密码选项
 */
export function isStrongPassword(password: string, options?: PasswordOptions): ValidationResult {
  const {
    minLength = 8,
    requireLowercase = true,
    requireUppercase = true,
    requireNumber = true,
    requireSpecialChar = true
  } = options || {};
  
  // 长度验证
  if (password.length < minLength) {
    return {
      valid: false,
      message: `密码长度不能少于${minLength}个字符`
    };
  }
  
  // 小写字母验证
  if (requireLowercase && !/[a-z]/.test(password)) {
    return {
      valid: false,
      message: '密码必须包含小写字母'
    };
  }
  
  // 大写字母验证
  if (requireUppercase && !/[A-Z]/.test(password)) {
    return {
      valid: false,
      message: '密码必须包含大写字母'
    };
  }
  
  // 数字验证
  if (requireNumber && !/\d/.test(password)) {
    return {
      valid: false,
      message: '密码必须包含数字'
    };
  }
  
  // 特殊字符验证
  if (requireSpecialChar && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return {
      valid: false,
      message: '密码必须包含特殊字符'
    };
  }
  
  return { valid: true };
}

export function isPassword(password: string, options?: PasswordOptions): ValidationResult {
  // 实现密码验证逻辑
}