# 字符串工具

字符串工具提供了一系列用于处理和操作字符串的实用函数。

## trim

去除字符串两端的空白字符。

### 语法

```typescript
function trim(str: string): string
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| str | string | 要处理的字符串 |

### 返回值

返回去除两端空白字符后的字符串。

### 示例

```javascript
import { trim } from 'ft-base-tools';

console.log(trim('  Hello World  ')); // 'Hello World'
console.log(trim('\t\nHello\r\n')); // 'Hello'
```

## trimLeft

去除字符串左侧的空白字符。

### 语法

```typescript
function trimLeft(str: string): string
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| str | string | 要处理的字符串 |

### 返回值

返回去除左侧空白字符后的字符串。

### 示例

```javascript
import { trimLeft } from 'ft-base-tools';

console.log(trimLeft('  Hello World  ')); // 'Hello World  '
console.log(trimLeft('\t\nHello\r\n')); // 'Hello\r\n'
```

## trimRight

去除字符串右侧的空白字符。

### 语法

```typescript
function trimRight(str: string): string
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| str | string | 要处理的字符串 |

### 返回值

返回去除右侧空白字符后的字符串。

### 示例

```javascript
import { trimRight } from 'ft-base-tools';

console.log(trimRight('  Hello World  ')); // '  Hello World'
console.log(trimRight('\t\nHello\r\n')); // '\t\nHello'
```

## capitalize

将字符串的首字母大写。

### 语法

```typescript
function capitalize(str: string): string
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| str | string | 要处理的字符串 |

### 返回值

返回首字母大写的字符串。

### 示例

```javascript
import { capitalize } from 'ft-base-tools';

console.log(capitalize('hello')); // 'Hello'
console.log(capitalize('hello world')); // 'Hello world'
console.log(capitalize('')); // ''
```

## camelCase

将字符串转换为驼峰命名格式。

### 语法

```typescript
function camelCase(str: string): string
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| str | string | 要处理的字符串 |

### 返回值

返回驼峰命名格式的字符串。

### 示例

```javascript
import { camelCase } from 'ft-base-tools';

console.log(camelCase('hello world')); // 'helloWorld'
console.log(camelCase('hello-world')); // 'helloWorld'
console.log(camelCase('hello_world')); // 'helloWorld'
console.log(camelCase('HelloWorld')); // 'helloWorld'
```

## kebabCase

将字符串转换为短横线命名格式（kebab-case）。

### 语法

```typescript
function kebabCase(str: string): string
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| str | string | 要处理的字符串 |

### 返回值

返回短横线命名格式的字符串。

### 示例

```javascript
import { kebabCase } from 'ft-base-tools';

console.log(kebabCase('hello world')); // 'hello-world'
console.log(kebabCase('helloWorld')); // 'hello-world'
console.log(kebabCase('HelloWorld')); // 'hello-world'
console.log(kebabCase('hello_world')); // 'hello-world'
```

## snakeCase

将字符串转换为下划线命名格式（snake_case）。

### 语法

```typescript
function snakeCase(str: string): string
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| str | string | 要处理的字符串 |

### 返回值

返回下划线命名格式的字符串。

### 示例

```javascript
import { snakeCase } from 'ft-base-tools';

console.log(snakeCase('hello world')); // 'hello_world'
console.log(snakeCase('helloWorld')); // 'hello_world'
console.log(snakeCase('HelloWorld')); // 'hello_world'
console.log(snakeCase('hello-world')); // 'hello_world'
```

## pascalCase

将字符串转换为帕斯卡命名格式（PascalCase）。

### 语法

```typescript
function pascalCase(str: string): string
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| str | string | 要处理的字符串 |

### 返回值

返回帕斯卡命名格式的字符串。

### 示例

```javascript
import { pascalCase } from 'ft-base-tools';

console.log(pascalCase('hello world')); // 'HelloWorld'
console.log(pascalCase('hello-world')); // 'HelloWorld'
console.log(pascalCase('hello_world')); // 'HelloWorld'
console.log(pascalCase('helloWorld')); // 'HelloWorld'
```

## truncate

截断字符串并添加省略号。

### 语法

```typescript
function truncate(
  str: string,
  length: number,
  options?: {
    suffix?: string;
    wordBoundary?: boolean;
  }
): string
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| str | string | 要截断的字符串 |
| length | number | 最大长度 |
| options | object | 可选。截断选项 |
| options.suffix | string | 可选。省略号字符串，默认为 '...' |
| options.wordBoundary | boolean | 可选。是否在单词边界截断，默认为 false |

### 返回值

返回截断后的字符串。

### 示例

```javascript
import { truncate } from 'ft-base-tools';

const text = '这是一段很长的文本，需要被截断以适应显示区域';

// 基本用法
console.log(truncate(text, 10)); // '这是一段很长...'

// 自定义后缀
console.log(truncate(text, 10, { suffix: '……' })); // '这是一段很长……'

// 在单词边界截断（对中文无效，主要用于英文）
const englishText = 'This is a long text that needs to be truncated';
console.log(truncate(englishText, 15, { wordBoundary: true })); // 'This is a long...'
```

## escapeHtml

转义 HTML 特殊字符。

### 语法

```typescript
function escapeHtml(str: string): string
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| str | string | 要转义的字符串 |

### 返回值

返回转义后的字符串。

### 示例

```javascript
import { escapeHtml } from 'ft-base-tools';

console.log(escapeHtml('<div>Hello & World</div>'));
// '&lt;div&gt;Hello &amp; World&lt;/div&gt;'
```

## unescapeHtml

解码被转义的 HTML 特殊字符。

### 语法

```typescript
function unescapeHtml(str: string): string
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| str | string | 要解码的字符串 |

### 返回值

返回解码后的字符串。

### 示例

```javascript
import { unescapeHtml } from 'ft-base-tools';

console.log(unescapeHtml('&lt;div&gt;Hello &amp; World&lt;/div&gt;'));
// '<div>Hello & World</div>'
```

## stripTags

移除字符串中的 HTML 标签。

### 语法

```typescript
function stripTags(str: string): string
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| str | string | 要处理的字符串 |

### 返回值

返回移除 HTML 标签后的字符串。

### 示例

```javascript
import { stripTags } from 'ft-base-tools';

console.log(stripTags('<p>Hello <b>World</b>!</p>'));
// 'Hello World!'
```

## randomString

生成指定长度的随机字符串。

### 语法

```typescript
function randomString(
  length: number,
  options?: {
    digits?: boolean;
    lowercase?: boolean;
    uppercase?: boolean;
    special?: boolean;
    custom?: string;
  }
): string
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| length | number | 字符串长度 |
| options | object | 可选。生成选项 |
| options.digits | boolean | 可选。是否包含数字，默认为 true |
| options.lowercase | boolean | 可选。是否包含小写字母，默认为 true |
| options.uppercase | boolean | 可选。是否包含大写字母，默认为 true |
| options.special | boolean | 可选。是否包含特殊字符，默认为 false |
| options.custom | string | 可选。自定义字符集 |

### 返回值

返回生成的随机字符串。

### 示例

```javascript
import { randomString } from 'ft-base-tools';

// 默认选项（包含数字、小写字母和大写字母）
console.log(randomString(8)); // 例如：'a7Bf9Xz2'

// 只包含数字
console.log(randomString(6, {
  digits: true,
  lowercase: false,
  uppercase: false
})); // 例如：'472591'

// 包含特殊字符
console.log(randomString(10, { special: true })); // 例如：'a7!Bf9@Xz'

// 使用自定义字符集
console.log(randomString(5, { custom: 'ABCDEF123456' })); // 例如：'A25FC'
```

## template

简单的字符串模板替换函数。

### 语法

```typescript
function template(
  str: string,
  data: Record<string, any>,
  options?: {
    openTag?: string;
    closeTag?: string;
  }
): string
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| str | string | 模板字符串 |
| data | Record<string, any> | 替换数据 |
| options | object | 可选。模板选项 |
| options.openTag | string | 可选。开始标记，默认为 '{{' |
| options.closeTag | string | 可选。结束标记，默认为 '}}' |

### 返回值

返回替换后的字符串。

### 示例

```javascript
import { template } from 'ft-base-tools';

const tmpl = '你好，{{name}}！今天是{{date}}。';
const data = {
  name: '张三',
  date: '2025年1月1日'
};

console.log(template(tmpl, data));
// '你好，张三！今天是2025年1月1日。'

// 使用自定义标记
const customTmpl = '你好，${name}！今天是${date}。';
console.log(template(customTmpl, data, {
  openTag: '${',
  closeTag: '}'
}));
// '你好，张三！今天是2025年1月1日。'
```

## byteSize

计算字符串的字节大小。

### 语法

```typescript
function byteSize(str: string): number
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| str | string | 要计算的字符串 |

### 返回值

返回字符串的字节大小。

### 示例

```javascript
import { byteSize } from 'ft-base-tools';

console.log(byteSize('Hello')); // 5
console.log(byteSize('你好')); // 6（中文字符在 UTF-8 中通常占 3 个字节）
```

## countSubstrings

计算子字符串在字符串中出现的次数。

### 语法

```typescript
function countSubstrings(
  str: string,
  substring: string,
  options?: {
    caseSensitive?: boolean;
  }
): number
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| str | string | 要搜索的字符串 |
| substring | string | 要计数的子字符串 |
| options | object | 可选。搜索选项 |
| options.caseSensitive | boolean | 可选。是否区分大小写，默认为 true |

### 返回值

返回子字符串出现的次数。

### 示例

```javascript
import { countSubstrings } from 'ft-base-tools';

console.log(countSubstrings('hello hello world', 'hello')); // 2
console.log(countSubstrings('Hello hello world', 'hello')); // 1
console.log(countSubstrings('Hello hello world', 'hello', { caseSensitive: false })); // 2
```

## isEmail

检查字符串是否为有效的电子邮件地址。

### 语法

```typescript
function isEmail(str: string): boolean
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| str | string | 要检查的字符串 |

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

检查字符串是否为有效的 URL。

### 语法

```typescript
function isUrl(str: string): boolean
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| str | string | 要检查的字符串 |

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

检查字符串是否为有效的手机号码。

### 语法

```typescript
function isPhoneNumber(
  str: string,
  options?: {
    country?: 'CN' | 'US' | 'UK' | 'JP' | 'KR' | 'INT';
  }
): boolean
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| str | string | 要检查的字符串 |
| options | object | 可选。检查选项 |
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

检查字符串是否为有效的身份证号码。

### 语法

```typescript
function isIDCard(
  str: string,
  options?: {
    country?: 'CN';
  }
): boolean
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| str | string | 要检查的字符串 |
| options | object | 可选。检查选项 |
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