# 格式化工具

格式化工具提供了一系列用于格式化各种数据的实用函数。

## formatNumber

格式化数字，支持千分位分隔符、小数位数控制等。

### 语法

```typescript
function formatNumber(
  num: number,
  options?: {
    decimals?: number;
    decimalSeparator?: string;
    thousandsSeparator?: string;
  }
): string
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| num | number | 要格式化的数字 |
| options | object | 可选。格式化选项 |
| options.decimals | number | 可选。小数位数，默认为 2 |
| options.decimalSeparator | string | 可选。小数分隔符，默认为 '.' |
| options.thousandsSeparator | string | 可选。千分位分隔符，默认为 ',' |

### 返回值

返回格式化后的数字字符串。

### 示例

```javascript
import { formatNumber } from 'ft-base-tools';

console.log(formatNumber(1234567.89)); // 1,234,567.89
console.log(formatNumber(1234567.89, { decimals: 0 })); // 1,234,568
console.log(formatNumber(1234567.89, { decimals: 3 })); // 1,234,567.890
console.log(formatNumber(1234567.89, { thousandsSeparator: ' ' })); // 1 234 567.89
console.log(formatNumber(1234567.89, { decimalSeparator: ',' })); // 1,234,567,89
console.log(formatNumber(1234567.89, {
  decimals: 2,
  decimalSeparator: ',',
  thousandsSeparator: '.'
})); // 1.234.567,89
```

## formatMoney

格式化货币金额，支持不同货币符号和格式。

### 语法

```typescript
function formatMoney(
  amount: number,
  options?: {
    currency?: string;
    locale?: string;
    decimals?: number;
  }
): string
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| amount | number | 要格式化的金额 |
| options | object | 可选。格式化选项 |
| options.currency | string | 可选。货币代码，默认为 'CNY' |
| options.locale | string | 可选。本地化语言代码，默认为 'zh-CN' |
| options.decimals | number | 可选。小数位数，默认为 2 |

### 返回值

返回格式化后的货币金额字符串。

### 示例

```javascript
import { formatMoney } from 'ft-base-tools';

console.log(formatMoney(1234567.89)); // ¥1,234,567.89
console.log(formatMoney(1234567.89, { currency: 'USD' })); // $1,234,567.89
console.log(formatMoney(1234567.89, { currency: 'EUR' })); // €1,234,567.89
console.log(formatMoney(1234567.89, { currency: 'JPY', decimals: 0 })); // ¥1,234,568
console.log(formatMoney(1234567.89, { locale: 'en-US', currency: 'USD' })); // $1,234,567.89
console.log(formatMoney(1234567.89, { locale: 'de-DE', currency: 'EUR' })); // 1.234.567,89 €
```

## formatFileSize

将字节数格式化为人类可读的文件大小字符串。

### 语法

```typescript
function formatFileSize(
  bytes: number,
  options?: {
    precision?: number;
    locale?: string;
  }
): string
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| bytes | number | 文件大小（字节数） |
| options | object | 可选。格式化选项 |
| options.precision | number | 可选。小数位数，默认为 2 |
| options.locale | string | 可选。本地化语言代码，默认为 'zh-CN' |

### 返回值

返回格式化后的文件大小字符串。

### 示例

```javascript
import { formatFileSize } from 'ft-base-tools';

console.log(formatFileSize(1024)); // 1.00 KB
console.log(formatFileSize(1024 * 1024)); // 1.00 MB
console.log(formatFileSize(1024 * 1024 * 1024)); // 1.00 GB
console.log(formatFileSize(1024 * 1024 * 1024 * 1024)); // 1.00 TB
console.log(formatFileSize(1024 * 1024, { precision: 0 })); // 1 MB
console.log(formatFileSize(1024 * 1024, { locale: 'en-US' })); // 1.00 MB
```

## formatPercent

将数字格式化为百分比字符串。

### 语法

```typescript
function formatPercent(
  value: number,
  options?: {
    decimals?: number;
    symbol?: string;
  }
): string
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| value | number | 要格式化的数值（0-1 之间的小数） |
| options | object | 可选。格式化选项 |
| options.decimals | number | 可选。小数位数，默认为 2 |
| options.symbol | string | 可选。百分比符号，默认为 '%' |

### 返回值

返回格式化后的百分比字符串。

### 示例

```javascript
import { formatPercent } from 'ft-base-tools';

console.log(formatPercent(0.1234)); // 12.34%
console.log(formatPercent(0.1234, { decimals: 1 })); // 12.3%
console.log(formatPercent(0.1234, { decimals: 0 })); // 12%
console.log(formatPercent(0.1234, { symbol: '％' })); // 12.34％
console.log(formatPercent(1)); // 100.00%
```

## formatPhoneNumber

格式化手机号码，支持不同国家/地区的格式。

### 语法

```typescript
function formatPhoneNumber(
  phoneNumber: string,
  options?: {
    country?: string;
    format?: 'default' | 'hidden' | 'masked';
  }
): string
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| phoneNumber | string | 要格式化的手机号码 |
| options | object | 可选。格式化选项 |
| options.country | string | 可选。国家/地区代码，默认为 'CN' |
| options.format | 'default' \| 'hidden' \| 'masked' | 可选。格式化类型，默认为 'default' |

### 返回值

返回格式化后的手机号码字符串。

### 示例

```javascript
import { formatPhoneNumber } from 'ft-base-tools';

// 中国手机号
console.log(formatPhoneNumber('13812345678')); // 138 1234 5678
console.log(formatPhoneNumber('13812345678', { format: 'masked' })); // 138 **** 5678
console.log(formatPhoneNumber('13812345678', { format: 'hidden' })); // 138 **** ****

// 美国手机号
console.log(formatPhoneNumber('2125551234', { country: 'US' })); // (212) 555-1234
console.log(formatPhoneNumber('2125551234', { country: 'US', format: 'masked' })); // (212) ***-1234
```

## formatIDCard

格式化身份证号码。

### 语法

```typescript
function formatIDCard(
  idCard: string,
  options?: {
    format?: 'default' | 'hidden' | 'masked';
  }
): string
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| idCard | string | 要格式化的身份证号码 |
| options | object | 可选。格式化选项 |
| options.format | 'default' \| 'hidden' \| 'masked' | 可选。格式化类型，默认为 'default' |

### 返回值

返回格式化后的身份证号码字符串。

### 示例

```javascript
import { formatIDCard } from 'ft-base-tools';

console.log(formatIDCard('110101199001011234')); // 110101 19900101 1234
console.log(formatIDCard('110101199001011234', { format: 'masked' })); // 110101 ******** 1234
console.log(formatIDCard('110101199001011234', { format: 'hidden' })); // ****** ******** ****
```

## formatBankCard

格式化银行卡号。

### 语法

```typescript
function formatBankCard(
  cardNumber: string,
  options?: {
    format?: 'default' | 'hidden' | 'masked';
  }
): string
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| cardNumber | string | 要格式化的银行卡号 |
| options | object | 可选。格式化选项 |
| options.format | 'default' \| 'hidden' \| 'masked' | 可选。格式化类型，默认为 'default' |

### 返回值

返回格式化后的银行卡号字符串。

### 示例

```javascript
import { formatBankCard } from 'ft-base-tools';

console.log(formatBankCard('6225123412341234')); // 6225 1234 1234 1234
console.log(formatBankCard('6225123412341234', { format: 'masked' })); // 6225 **** **** 1234
console.log(formatBankCard('6225123412341234', { format: 'hidden' })); // **** **** **** ****
``` 