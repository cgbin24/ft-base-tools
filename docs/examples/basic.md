# 基础示例

本页面提供了一些基础的使用示例，帮助你快速上手 ft-base-tools。

## 数组操作

### 数组去重

```javascript
import { arrayUnique } from 'ft-base-tools';

const arr = [1, 2, 2, 3, 3, 4, 5, 5];
const uniqueArr = arrayUnique(arr);
console.log(uniqueArr); // [1, 2, 3, 4, 5]
```

### 数组扁平化

```javascript
import { arrayFlatten } from 'ft-base-tools';

const nestedArr = [1, [2, [3, 4], 5], 6];
const flatArr = arrayFlatten(nestedArr);
console.log(flatArr); // [1, 2, 3, 4, 5, 6]
```

### 数组分块

```javascript
import { arrayChunk } from 'ft-base-tools';

const arr = [1, 2, 3, 4, 5, 6, 7, 8];
const chunkedArr = arrayChunk(arr, 3);
console.log(chunkedArr); // [[1, 2, 3], [4, 5, 6], [7, 8]]
```

## 日期处理

### 日期格式化

```javascript
import { formatDate } from 'ft-base-tools';

const now = new Date();
console.log(formatDate(now, 'YYYY-MM-DD')); // 例如：2025-01-01
console.log(formatDate(now, 'YYYY年MM月DD日')); // 例如：2025年01月01日
console.log(formatDate(now, 'HH:mm:ss')); // 例如：14:30:45
```

### 日期计算

```javascript
import { addDays, diffDays } from 'ft-base-tools';

const today = new Date();
const tomorrow = addDays(today, 1);
console.log(`明天是 ${formatDate(tomorrow, 'YYYY-MM-DD')}`);

const nextWeek = addDays(today, 7);
const daysDiff = diffDays(today, nextWeek);
console.log(`相差 ${daysDiff} 天`); // 相差 7 天
```

### 相对时间

```javascript
import { getRelativeTimeString } from 'ft-base-tools';

const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
console.log(getRelativeTimeString(fiveMinutesAgo)); // 5分钟前

const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
console.log(getRelativeTimeString(yesterday)); // 昨天
```

## 格式化

### 数字格式化

```javascript
import { formatNumber } from 'ft-base-tools';

console.log(formatNumber(1234567.89)); // 1,234,567.89
console.log(formatNumber(1234567.89, { decimals: 0 })); // 1,234,568
console.log(formatNumber(1234567.89, { thousandsSeparator: ' ' })); // 1 234 567.89
```

### 货币格式化

```javascript
import { formatMoney } from 'ft-base-tools';

console.log(formatMoney(1234567.89)); // ¥1,234,567.89
console.log(formatMoney(1234567.89, { currency: 'USD' })); // $1,234,567.89
console.log(formatMoney(1234567.89, { currency: 'EUR' })); // €1,234,567.89
```

### 文件大小格式化

```javascript
import { formatFileSize } from 'ft-base-tools';

console.log(formatFileSize(1024)); // 1.00 KB
console.log(formatFileSize(1024 * 1024)); // 1.00 MB
console.log(formatFileSize(1024 * 1024 * 1024)); // 1.00 GB
```

### 百分比格式化

```javascript
import { formatPercent } from 'ft-base-tools';

console.log(formatPercent(0.1234)); // 12.34%
console.log(formatPercent(0.1234, { decimals: 1 })); // 12.3%
console.log(formatPercent(0.5)); // 50.00%
```

## 加密工具

### MD5 加密

```javascript
import { md5 } from 'ft-base-tools';

const hash = md5('hello world');
console.log(hash); // 5eb63bbbe01eeed093cb22bb8f5acdc3
```

### Base64 编码/解码

```javascript
import { base64Encode, base64Decode } from 'ft-base-tools';

const encoded = base64Encode('hello world');
console.log(encoded); // aGVsbG8gd29ybGQ=

const decoded = base64Decode(encoded);
console.log(decoded); // hello world
```

## DOM 操作

### 获取元素

```javascript
import { $, $$ } from 'ft-base-tools';

// 获取单个元素
const header = $('#header');
console.log(header);

// 获取多个元素
const buttons = $$('.btn');
console.log(buttons);
```

### 添加/移除类

```javascript
import { addClass, removeClass, toggleClass } from 'ft-base-tools';

const element = document.getElementById('example');

addClass(element, 'active');
removeClass(element, 'hidden');
toggleClass(element, 'highlight');
```

### 事件处理

```javascript
import { on, off } from 'ft-base-tools';

const button = document.getElementById('btn');

const handleClick = () => {
  console.log('按钮被点击了');
};

// 添加事件监听
on(button, 'click', handleClick);

// 移除事件监听
off(button, 'click', handleClick);
```

## 设备检测

### 检测设备类型

```javascript
import { isMobile, isIOS, isAndroid } from 'ft-base-tools';

console.log(`是否移动设备: ${isMobile()}`);
console.log(`是否 iOS 设备: ${isIOS()}`);
console.log(`是否 Android 设备: ${isAndroid()}`);
```

### 检测浏览器

```javascript
import { isChrome, isSafari, isFirefox, isIE } from 'ft-base-tools';

console.log(`是否 Chrome 浏览器: ${isChrome()}`);
console.log(`是否 Safari 浏览器: ${isSafari()}`);
console.log(`是否 Firefox 浏览器: ${isFirefox()}`);
console.log(`是否 IE 浏览器: ${isIE()}`);
```

## 网络工具

### HTTP 请求

```javascript
import { request } from 'ft-base-tools';

// GET 请求
request('https://api.example.com/data')
  .then(data => console.log(data))
  .catch(error => console.error(error));

// POST 请求
request('https://api.example.com/users', {
  method: 'POST',
  data: { name: '张三', age: 30 }
})
  .then(data => console.log(data))
  .catch(error => console.error(error));
```

### URL 参数处理

```javascript
import { getUrlParams, buildUrl } from 'ft-base-tools';

// 获取 URL 参数
// 假设当前 URL 为 https://example.com?id=123&name=张三
const params = getUrlParams();
console.log(params.id); // 123
console.log(params.name); // 张三

// 构建 URL
const url = buildUrl('https://example.com', { id: 123, name: '张三' });
console.log(url); // https://example.com?id=123&name=张三
```

## 数学计算

### 精确计算

```javascript
import { add, subtract, multiply, divide } from 'ft-base-tools';

console.log(0.1 + 0.2); // 0.30000000000000004
console.log(add(0.1, 0.2)); // 0.3

console.log(1.0 - 0.9); // 0.09999999999999998
console.log(subtract(1.0, 0.9)); // 0.1

console.log(0.1 * 0.2); // 0.020000000000000004
console.log(multiply(0.1, 0.2)); // 0.02

console.log(0.3 / 0.1); // 2.9999999999999996
console.log(divide(0.3, 0.1)); // 3
```

### 随机数生成

```javascript
import { random, randomInt } from 'ft-base-tools';

// 生成 0-1 之间的随机数
console.log(random()); // 例如：0.7531868305024663

// 生成指定范围内的随机数
console.log(random(1, 10)); // 例如：5.371467582692351

// 生成指定范围内的随机整数
console.log(randomInt(1, 10)); // 例如：7
``` 