# 日期工具

日期工具提供了一系列用于处理日期和时间的实用函数。

## formatDate

将日期格式化为指定的字符串格式。

### 语法

```typescript
function formatDate(date: Date | number | string, format: string): string
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| date | Date \| number \| string | 要格式化的日期，可以是 Date 对象、时间戳或日期字符串 |
| format | string | 格式化模板字符串 |

### 格式化标记

| 标记 | 描述 | 示例 |
| --- | --- | --- |
| YYYY | 四位数年份 | 2025 |
| YY | 两位数年份 | 25 |
| MM | 两位数月份（01-12） | 01 |
| M | 一位数月份（1-12） | 1 |
| DD | 两位数日期（01-31） | 01 |
| D | 一位数日期（1-31） | 1 |
| HH | 两位数小时，24小时制（00-23） | 13 |
| H | 一位数小时，24小时制（0-23） | 13 |
| hh | 两位数小时，12小时制（01-12） | 01 |
| h | 一位数小时，12小时制（1-12） | 1 |
| mm | 两位数分钟（00-59） | 05 |
| m | 一位数分钟（0-59） | 5 |
| ss | 两位数秒钟（00-59） | 09 |
| s | 一位数秒钟（0-59） | 9 |
| SSS | 三位数毫秒（000-999） | 078 |
| A | AM/PM 标记 | AM |
| a | am/pm 标记 | am |

### 返回值

返回格式化后的日期字符串。

### 示例

```javascript
import { formatDate } from 'ft-base-tools';

const date = new Date(2025, 0, 1, 13, 5, 9, 78);

console.log(formatDate(date, 'YYYY-MM-DD')); // 2025-01-01
console.log(formatDate(date, 'YYYY年MM月DD日')); // 2025年01月01日
console.log(formatDate(date, 'HH:mm:ss')); // 13:05:09
console.log(formatDate(date, 'h:m:s a')); // 1:5:9 pm
console.log(formatDate(date, 'YYYY-MM-DD HH:mm:ss.SSS')); // 2025-01-01 13:05:09.078

// 使用时间戳
console.log(formatDate(1735689909078, 'YYYY-MM-DD')); // 2025-01-01

// 使用日期字符串
console.log(formatDate('2025-01-01', 'MM/DD/YYYY')); // 01/01/2025
```

## parseDate

将日期字符串解析为 Date 对象。

### 语法

```typescript
function parseDate(dateString: string, format?: string): Date
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| dateString | string | 要解析的日期字符串 |
| format | string | 可选。日期字符串的格式模板。如果不提供，将尝试自动识别常见格式 |

### 返回值

返回解析后的 Date 对象。

### 示例

```javascript
import { parseDate } from 'ft-base-tools';

const date1 = parseDate('2025-01-01');
console.log(date1); // Wed Jan 01 2025 00:00:00

const date2 = parseDate('01/01/2025', 'MM/DD/YYYY');
console.log(date2); // Wed Jan 01 2025 00:00:00

const date3 = parseDate('2025年01月01日', 'YYYY年MM月DD日');
console.log(date3); // Wed Jan 01 2025 00:00:00
```

## addDays

向日期添加指定的天数。

### 语法

```typescript
function addDays(date: Date, days: number): Date
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| date | Date | 原始日期 |
| days | number | 要添加的天数，可以为负数 |

### 返回值

返回一个新的 Date 对象，表示添加天数后的日期。

### 示例

```javascript
import { addDays, formatDate } from 'ft-base-tools';

const date = new Date(2025, 0, 1); // 2025-01-01
const newDate = addDays(date, 5);
console.log(formatDate(newDate, 'YYYY-MM-DD')); // 2025-01-06

const prevDate = addDays(date, -5);
console.log(formatDate(prevDate, 'YYYY-MM-DD')); // 2024-12-27
```

## diffDays

计算两个日期之间的天数差异。

### 语法

```typescript
function diffDays(date1: Date, date2: Date): number
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| date1 | Date | 第一个日期 |
| date2 | Date | 第二个日期 |

### 返回值

返回两个日期之间的天数差异（绝对值）。

### 示例

```javascript
import { diffDays } from 'ft-base-tools';

const date1 = new Date(2025, 0, 1); // 2025-01-01
const date2 = new Date(2025, 0, 10); // 2025-01-10

const diff = diffDays(date1, date2);
console.log(diff); // 9
```

## isLeapYear

判断指定年份是否为闰年。

### 语法

```typescript
function isLeapYear(year: number): boolean
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| year | number | 要判断的年份 |

### 返回值

如果是闰年返回 true，否则返回 false。

### 示例

```javascript
import { isLeapYear } from 'ft-base-tools';

console.log(isLeapYear(2024)); // true
console.log(isLeapYear(2025)); // false
console.log(isLeapYear(2000)); // true
console.log(isLeapYear(1900)); // false
```

## getWeekNumber

获取指定日期是一年中的第几周。

### 语法

```typescript
function getWeekNumber(date: Date): number
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| date | Date | 要计算的日期 |

### 返回值

返回一个数字，表示该日期是一年中的第几周（1-53）。

### 示例

```javascript
import { getWeekNumber } from 'ft-base-tools';

const date = new Date(2025, 0, 1); // 2025-01-01
const weekNumber = getWeekNumber(date);
console.log(weekNumber); // 1
```

## getRelativeTimeString

获取相对于当前时间的友好字符串表示。

### 语法

```typescript
function getRelativeTimeString(date: Date | number | string, locale?: string): string
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| date | Date \| number \| string | 要计算的日期 |
| locale | string | 可选。本地化语言代码，默认为 'zh-CN' |

### 返回值

返回一个字符串，表示相对于当前时间的友好描述。

### 示例

```javascript
import { getRelativeTimeString } from 'ft-base-tools';

// 假设当前时间是 2025-01-01 12:00:00
const date1 = new Date(2025, 0, 1, 11, 55); // 5分钟前
console.log(getRelativeTimeString(date1)); // 5分钟前

const date2 = new Date(2024, 11, 31); // 昨天
console.log(getRelativeTimeString(date2)); // 昨天

const date3 = new Date(2024, 11, 25); // 7天前
console.log(getRelativeTimeString(date3)); // 7天前

const date4 = new Date(2025, 0, 2); // 明天
console.log(getRelativeTimeString(date4)); // 明天

// 使用英语
console.log(getRelativeTimeString(date1, 'en-US')); // 5 minutes ago
```