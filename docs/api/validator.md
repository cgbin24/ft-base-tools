# 验证工具

验证工具提供了一系列用于数据验证的实用函数。

## isEmail

验证字符串是否为有效的电子邮件地址。

### 语法

```typescript
function isEmail(value: string): boolean
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| value | string | 要验证的字符串 |

### 返回值

如果是有效的电子邮件地址返回 `true`，否则返回 `false`。

### 示例

```javascript
import { isEmail } from 'ft-base-tools';

console.log(isEmail('user@example.com')); // true
console.log(isEmail('user.name+tag@example.co.uk')); // true
console.log(isEmail('invalid-email')); // false
console.log(isEmail('user@example')); // false
```

## isUrl

验证字符串是否为有效的 URL。

### 语法

```typescript
function isUrl(value: string): boolean
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| value | string | 要验证的字符串 |

### 返回值

如果是有效的 URL 返回 `true`，否则返回 `false`。

### 示例

```javascript
import { isUrl } from 'ft-base-tools';

console.log(isUrl('https://example.com')); // true
console.log(isUrl('http://example.com/path?query=value')); // true
console.log(isUrl('example.com')); // false（缺少协议）
console.log(isUrl('https://')); // false
```

## isPhoneNumber

验证字符串是否为有效的手机号码。

### 语法

```typescript
function isPhoneNumber(
  value: string,
  options?: {
    country?: 'CN' | 'US' | 'UK' | 'JP' | 'KR' | 'INT';
  }
): boolean
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| value | string | 要验证的字符串 |
| options | object | 可选。验证选项 |
| options.country | string | 可选。国家/地区代码，默认为 'CN'（中国） |

### 返回值

如果是有效的手机号码返回 `true`，否则返回 `false`。

### 示例

```javascript
import { isPhoneNumber } from 'ft-base-tools';

// 中国手机号
console.log(isPhoneNumber('13812345678')); // true
console.log(isPhoneNumber('138-1234-5678')); // true

// 美国手机号
console.log(isPhoneNumber('212-555-1234', { country: 'US' })); // true
console.log(isPhoneNumber('(212) 555-1234', { country: 'US' })); // true

// 国际格式
console.log(isPhoneNumber('+86 138 1234 5678', { country: 'INT' })); // true
```

## isIDCard

验证字符串是否为有效的身份证号码。

### 语法

```typescript
function isIDCard(
  value: string,
  options?: {
    country?: 'CN';
  }
): boolean
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| value | string | 要验证的字符串 |
| options | object | 可选。验证选项 |
| options.country | string | 可选。国家/地区代码，目前仅支持 'CN'（中国） |

### 返回值

如果是有效的身份证号码返回 `true`，否则返回 `false`。

### 示例

```javascript
import { isIDCard } from 'ft-base-tools';

// 中国身份证号（18位）
console.log(isIDCard('110101199001011234')); // true

// 中国身份证号（15位，旧版）
console.log(isIDCard('110101900101123')); // true

// 无效的身份证号
console.log(isIDCard('12345678')); // false
```

## isCreditCard

验证字符串是否为有效的信用卡号码。

### 语法

```typescript
function isCreditCard(value: string): boolean
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| value | string | 要验证的字符串 |

### 返回值

如果是有效的信用卡号码返回 `true`，否则返回 `false`。

### 示例

```javascript
import { isCreditCard } from 'ft-base-tools';

console.log(isCreditCard('4111111111111111')); // true（Visa）
console.log(isCreditCard('5555555555554444')); // true（MasterCard）
console.log(isCreditCard('371449635398431')); // true（American Express）
console.log(isCreditCard('1234567890123456')); // false
```

## isPostalCode

验证字符串是否为有效的邮政编码。

### 语法

```typescript
function isPostalCode(
  value: string,
  options?: {
    country?: 'CN' | 'US' | 'UK' | 'JP' | 'KR';
  }
): boolean
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| value | string | 要验证的字符串 |
| options | object | 可选。验证选项 |
| options.country | string | 可选。国家/地区代码，默认为 'CN'（中国） |

### 返回值

如果是有效的邮政编码返回 `true`，否则返回 `false`。

### 示例

```javascript
import { isPostalCode } from 'ft-base-tools';

// 中国邮政编码
console.log(isPostalCode('100000')); // true

// 美国邮政编码
console.log(isPostalCode('90210', { country: 'US' })); // true
console.log(isPostalCode('90210-1234', { country: 'US' })); // true

// 英国邮政编码
console.log(isPostalCode('SW1A 1AA', { country: 'UK' })); // true
```

## isIP

验证字符串是否为有效的 IP 地址。

### 语法

```typescript
function isIP(
  value: string,
  options?: {
    version?: 4 | 6;
  }
): boolean
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| value | string | 要验证的字符串 |
| options | object | 可选。验证选项 |
| options.version | number | 可选。IP 版本，可以是 4 或 6，默认同时支持两种版本 |

### 返回值

如果是有效的 IP 地址返回 `true`，否则返回 `false`。

### 示例

```javascript
import { isIP } from 'ft-base-tools';

// IPv4
console.log(isIP('192.168.1.1')); // true
console.log(isIP('192.168.1.1', { version: 4 })); // true
console.log(isIP('192.168.1.1', { version: 6 })); // false

// IPv6
console.log(isIP('2001:0db8:85a3:0000:0000:8a2e:0370:7334')); // true
console.log(isIP('2001:db8:85a3::8a2e:370:7334')); // true（缩写形式）
console.log(isIP('2001:db8:85a3::8a2e:370:7334', { version: 6 })); // true
console.log(isIP('2001:db8:85a3::8a2e:370:7334', { version: 4 })); // false
```

## isDate

验证字符串是否为有效的日期。

### 语法

```typescript
function isDate(
  value: string,
  options?: {
    format?: string;
    strict?: boolean;
  }
): boolean
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| value | string | 要验证的字符串 |
| options | object | 可选。验证选项 |
| options.format | string | 可选。日期格式，例如 'YYYY-MM-DD' |
| options.strict | boolean | 可选。是否严格验证，默认为 false |

### 返回值

如果是有效的日期返回 `true`，否则返回 `false`。

### 示例

```javascript
import { isDate } from 'ft-base-tools';

console.log(isDate('2025-01-01')); // true
console.log(isDate('2025/01/01')); // true
console.log(isDate('01/01/2025')); // true
console.log(isDate('2025-02-30')); // false（2月没有30日）

// 指定格式
console.log(isDate('2025-01-01', { format: 'YYYY-MM-DD' })); // true
console.log(isDate('01/01/2025', { format: 'MM/DD/YYYY' })); // true
console.log(isDate('2025-01-01', { format: 'MM/DD/YYYY' })); // false（格式不匹配）

// 严格模式
console.log(isDate('2025-01-01', { strict: true })); // true
console.log(isDate('2025-1-1', { format: 'YYYY-MM-DD', strict: true })); // false（月和日需要两位数）
```

## isNumber

验证值是否为有效的数字。

### 语法

```typescript
function isNumber(
  value: any,
  options?: {
    min?: number;
    max?: number;
    integer?: boolean;
    positive?: boolean;
    negative?: boolean;
  }
): boolean
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| value | any | 要验证的值 |
| options | object | 可选。验证选项 |
| options.min | number | 可选。最小值 |
| options.max | number | 可选。最大值 |
| options.integer | boolean | 可选。是否必须为整数，默认为 false |
| options.positive | boolean | 可选。是否必须为正数，默认为 false |
| options.negative | boolean | 可选。是否必须为负数，默认为 false |

### 返回值

如果是有效的数字且满足条件返回 `true`，否则返回 `false`。

### 示例

```javascript
import { isNumber } from 'ft-base-tools';

console.log(isNumber(123)); // true
console.log(isNumber('123')); // true
console.log(isNumber('abc')); // false

// 范围验证
console.log(isNumber(5, { min: 1, max: 10 })); // true
console.log(isNumber(15, { min: 1, max: 10 })); // false

// 整数验证
console.log(isNumber(5, { integer: true })); // true
console.log(isNumber(5.5, { integer: true })); // false

// 正数/负数验证
console.log(isNumber(5, { positive: true })); // true
console.log(isNumber(-5, { positive: true })); // false
console.log(isNumber(-5, { negative: true })); // true
console.log(isNumber(5, { negative: true })); // false
```

## isInteger

验证值是否为整数。

### 语法

```typescript
function isInteger(
  value: any,
  options?: {
    min?: number;
    max?: number;
    positive?: boolean;
    negative?: boolean;
  }
): boolean
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| value | any | 要验证的值 |
| options | object | 可选。验证选项 |
| options.min | number | 可选。最小值 |
| options.max | number | 可选。最大值 |
| options.positive | boolean | 可选。是否必须为正数，默认为 false |
| options.negative | boolean | 可选。是否必须为负数，默认为 false |

### 返回值

如果是整数且满足条件返回 `true`，否则返回 `false`。

### 示例

```javascript
import { isInteger } from 'ft-base-tools';

console.log(isInteger(123)); // true
console.log(isInteger('123')); // true
console.log(isInteger(123.45)); // false
console.log(isInteger('abc')); // false

// 范围验证
console.log(isInteger(5, { min: 1, max: 10 })); // true
console.log(isInteger(15, { min: 1, max: 10 })); // false

// 正数/负数验证
console.log(isInteger(5, { positive: true })); // true
console.log(isInteger(-5, { positive: true })); // false
console.log(isInteger(-5, { negative: true })); // true
```

## isString

验证值是否为字符串。

### 语法

```typescript
function isString(
  value: any,
  options?: {
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp | string;
  }
): boolean
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| value | any | 要验证的值 |
| options | object | 可选。验证选项 |
| options.minLength | number | 可选。最小长度 |
| options.maxLength | number | 可选。最大长度 |
| options.pattern | RegExp \| string | 可选。匹配的正则表达式或字符串 |

### 返回值

如果是字符串且满足条件返回 `true`，否则返回 `false`。

### 示例

```javascript
import { isString } from 'ft-base-tools';

console.log(isString('hello')); // true
console.log(isString(123)); // false

// 长度验证
console.log(isString('hello', { minLength: 3 })); // true
console.log(isString('hi', { minLength: 3 })); // false
console.log(isString('hello', { maxLength: 10 })); // true
console.log(isString('hello world', { maxLength: 10 })); // false
console.log(isString('hello', { minLength: 3, maxLength: 10 })); // true

// 模式验证
console.log(isString('hello', { pattern: /^[a-z]+$/ })); // true
console.log(isString('Hello', { pattern: /^[a-z]+$/ })); // false
console.log(isString('hello', { pattern: 'hello' })); // true
```

## isBoolean

验证值是否为布尔值。

### 语法

```typescript
function isBoolean(value: any): boolean
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| value | any | 要验证的值 |

### 返回值

如果是布尔值返回 `true`，否则返回 `false`。

### 示例

```javascript
import { isBoolean } from 'ft-base-tools';

console.log(isBoolean(true)); // true
console.log(isBoolean(false)); // true
console.log(isBoolean('true')); // false
console.log(isBoolean(1)); // false
console.log(isBoolean(0)); // false
```

## isArray

验证值是否为数组。

### 语法

```typescript
function isArray(
  value: any,
  options?: {
    minLength?: number;
    maxLength?: number;
    itemType?: 'string' | 'number' | 'boolean' | 'object' | 'any';
  }
): boolean
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| value | any | 要验证的值 |
| options | object | 可选。验证选项 |
| options.minLength | number | 可选。最小长度 |
| options.maxLength | number | 可选。最大长度 |
| options.itemType | string | 可选。数组项的类型 |

### 返回值

如果是数组且满足条件返回 `true`，否则返回 `false`。

### 示例

```javascript
import { isArray } from 'ft-base-tools';

console.log(isArray([1, 2, 3])); // true
console.log(isArray('hello')); // false

// 长度验证
console.log(isArray([1, 2, 3], { minLength: 2 })); // true
console.log(isArray([1], { minLength: 2 })); // false
console.log(isArray([1, 2, 3], { maxLength: 5 })); // true
console.log(isArray([1, 2, 3, 4, 5, 6], { maxLength: 5 })); // false

// 类型验证
console.log(isArray([1, 2, 3], { itemType: 'number' })); // true
console.log(isArray(['a', 'b', 'c'], { itemType: 'string' })); // true
console.log(isArray([1, 'a', true], { itemType: 'any' })); // true
console.log(isArray([1, 'a', true], { itemType: 'number' })); // false
```

## isObject

验证值是否为对象。

### 语法

```typescript
function isObject(
  value: any,
  options?: {
    schema?: Record<string, any>;
    allowNull?: boolean;
  }
): boolean
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| value | any | 要验证的值 |
| options | object | 可选。验证选项 |
| options.schema | Record<string, any> | 可选。对象模式，用于验证对象的属性 |
| options.allowNull | boolean | 可选。是否允许 null 值，默认为 false |

### 返回值

如果是对象且满足条件返回 `true`，否则返回 `false`。

### 示例

```javascript
import { isObject } from 'ft-base-tools';

console.log(isObject({ name: 'John' })); // true
console.log(isObject([])); // false（数组不被视为对象）
console.log(isObject(null)); // false
console.log(isObject(null, { allowNull: true })); // true

// 模式验证
const schema = {
  name: { type: 'string', required: true },
  age: { type: 'number', required: true, min: 0 },
  email: { type: 'string', pattern: /^.+@.+\..+$/ }
};

console.log(isObject({ name: 'John', age: 30, email: 'john@example.com' }, { schema })); // true
console.log(isObject({ name: 'John', age: -5, email: 'john@example.com' }, { schema })); // false（age 小于 0）
console.log(isObject({ name: 'John', email: 'john@example.com' }, { schema })); // false（缺少 age）
```

## validate

通用数据验证函数，支持复杂的验证规则。

### 语法

```typescript
function validate(
  value: any,
  rules: ValidationRule | ValidationRule[],
  options?: {
    stopOnFirstError?: boolean;
  }
): ValidationResult
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| value | any | 要验证的值 |
| rules | ValidationRule \| ValidationRule[] | 验证规则或规则数组 |
| options | object | 可选。验证选项 |
| options.stopOnFirstError | boolean | 可选。是否在第一个错误处停止，默认为 true |

### 返回值

返回验证结果对象，包含 `valid` 和 `errors` 属性。

### 示例

```javascript
import { validate } from 'ft-base-tools';

// 简单验证
const emailResult = validate('user@example.com', {
  type: 'email',
  message: '请输入有效的电子邮件地址'
});
console.log(emailResult.valid); // true
console.log(emailResult.errors); // []

// 多规则验证
const passwordResult = validate('abc', [
  { type: 'string', message: '密码必须是字符串' },
  { type: 'string', minLength: 6, message: '密码长度不能少于6个字符' },
  { type: 'string', pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, message: '密码必须包含大小写字母和数字' }
]);
console.log(passwordResult.valid); // false
console.log(passwordResult.errors); // ['密码长度不能少于6个字符']

// 对象验证
const userResult = validate({
  name: 'John',
  age: 17,
  email: 'john@example'
}, {
  type: 'object',
  schema: {
    name: { type: 'string', required: true },
    age: { type: 'number', min: 18, message: '年龄必须大于或等于18岁' },
    email: { type: 'email', message: '请输入有效的电子邮件地址' }
  }
}, { stopOnFirstError: false });

console.log(userResult.valid); // false
console.log(userResult.errors); // ['年龄必须大于或等于18岁', '请输入有效的电子邮件地址']
```

## createValidator

创建自定义验证器。

### 语法

```typescript
function createValidator(
  rules: Record<string, ValidationRule | ValidationRule[]>
): {
  validate: (data: Record<string, any>) => ValidationResult;
  validateField: (field: string, value: any) => ValidationResult;
}
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| rules | Record<string, ValidationRule \| ValidationRule[]> | 验证规则对象 |

### 返回值

返回一个包含 `validate` 和 `validateField` 方法的验证器对象。

### 示例

```javascript
import { createValidator } from 'ft-base-tools';

// 创建表单验证器
const formValidator = createValidator({
  username: [
    { type: 'string', required: true, message: '用户名不能为空' },
    { type: 'string', minLength: 3, maxLength: 20, message: '用户名长度必须在3-20个字符之间' }
  ],
  email: { type: 'email', message: '请输入有效的电子邮件地址' },
  password: [
    { type: 'string', required: true, message: '密码不能为空' },
    { type: 'string', minLength: 6, message: '密码长度不能少于6个字符' },
    { type: 'string', pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, message: '密码必须包含大小写字母和数字' }
  ],
  age: { type: 'number', min: 18, message: '年龄必须大于或等于18岁' }
});

// 验证整个表单
const formData = {
  username: 'john',
  email: 'john@example.com',
  password: 'Password123',
  age: 25
};

const formResult = formValidator.validate(formData);
console.log(formResult.valid); // true
console.log(formResult.errors); // []

// 验证单个字段
const emailResult = formValidator.validateField('email', 'invalid-email');
console.log(emailResult.valid); // false
console.log(emailResult.errors); // ['请输入有效的电子邮件地址']
``` 