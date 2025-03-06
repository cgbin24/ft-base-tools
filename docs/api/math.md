# 数学工具

数学工具提供了一系列用于精确计算和数学操作的实用函数。

## add

精确加法，解决 JavaScript 浮点数计算精度问题。

### 语法

```typescript
function add(a: number, b: number): number
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| a | number | 第一个加数 |
| b | number | 第二个加数 |

### 返回值

返回两个数的精确和。

### 示例

```javascript
import { add } from 'ft-base-tools';

// 普通 JavaScript 加法存在精度问题
console.log(0.1 + 0.2); // 0.30000000000000004

// 使用精确加法
console.log(add(0.1, 0.2)); // 0.3

// 多个数字相加
console.log(add(add(0.1, 0.2), 0.3)); // 0.6
```

## subtract

精确减法，解决 JavaScript 浮点数计算精度问题。

### 语法

```typescript
function subtract(a: number, b: number): number
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| a | number | 被减数 |
| b | number | 减数 |

### 返回值

返回两个数的精确差。

### 示例

```javascript
import { subtract } from 'ft-base-tools';

// 普通 JavaScript 减法存在精度问题
console.log(1.0 - 0.9); // 0.09999999999999998

// 使用精确减法
console.log(subtract(1.0, 0.9)); // 0.1

// 链式计算
console.log(subtract(subtract(1.0, 0.1), 0.2)); // 0.7
```

## multiply

精确乘法，解决 JavaScript 浮点数计算精度问题。

### 语法

```typescript
function multiply(a: number, b: number): number
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| a | number | 第一个因数 |
| b | number | 第二个因数 |

### 返回值

返回两个数的精确积。

### 示例

```javascript
import { multiply } from 'ft-base-tools';

// 普通 JavaScript 乘法存在精度问题
console.log(0.1 * 0.2); // 0.020000000000000004

// 使用精确乘法
console.log(multiply(0.1, 0.2)); // 0.02

// 链式计算
console.log(multiply(multiply(0.1, 0.2), 10)); // 0.2
```

## divide

精确除法，解决 JavaScript 浮点数计算精度问题。

### 语法

```typescript
function divide(a: number, b: number): number
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| a | number | 被除数 |
| b | number | 除数 |

### 返回值

返回两个数的精确商。

### 示例

```javascript
import { divide } from 'ft-base-tools';

// 普通 JavaScript 除法存在精度问题
console.log(0.3 / 0.1); // 2.9999999999999996

// 使用精确除法
console.log(divide(0.3, 0.1)); // 3

// 链式计算
console.log(divide(divide(0.6, 0.2), 3)); // 1
```

## round

将数字四舍五入到指定小数位数。

### 语法

```typescript
function round(num: number, decimals: number = 0): number
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| num | number | 要四舍五入的数字 |
| decimals | number | 可选。小数位数，默认为 0 |

### 返回值

返回四舍五入后的数字。

### 示例

```javascript
import { round } from 'ft-base-tools';

console.log(round(1.2345)); // 1
console.log(round(1.2345, 2)); // 1.23
console.log(round(1.2345, 3)); // 1.235
console.log(round(-1.2345, 2)); // -1.23
```

## floor

将数字向下舍入到指定小数位数。

### 语法

```typescript
function floor(num: number, decimals: number = 0): number
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| num | number | 要向下舍入的数字 |
| decimals | number | 可选。小数位数，默认为 0 |

### 返回值

返回向下舍入后的数字。

### 示例

```javascript
import { floor } from 'ft-base-tools';

console.log(floor(1.9999)); // 1
console.log(floor(1.9999, 2)); // 1.99
console.log(floor(1.9999, 3)); // 1.999
console.log(floor(-1.9999, 2)); // -2.00
```

## ceil

将数字向上舍入到指定小数位数。

### 语法

```typescript
function ceil(num: number, decimals: number = 0): number
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| num | number | 要向上舍入的数字 |
| decimals | number | 可选。小数位数，默认为 0 |

### 返回值

返回向上舍入后的数字。

### 示例

```javascript
import { ceil } from 'ft-base-tools';

console.log(ceil(1.0001)); // 2
console.log(ceil(1.0001, 2)); // 1.01
console.log(ceil(1.0001, 3)); // 1.001
console.log(ceil(-1.0001, 2)); // -1.00
```

## random

生成指定范围内的随机数。

### 语法

```typescript
function random(min?: number, max?: number): number
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| min | number | 可选。最小值，默认为 0 |
| max | number | 可选。最大值，默认为 1 |

### 返回值

返回指定范围内的随机数。

### 示例

```javascript
import { random } from 'ft-base-tools';

// 生成 0-1 之间的随机数
console.log(random()); // 例如：0.7531868305024663

// 生成 10-20 之间的随机数
console.log(random(10, 20)); // 例如：15.371467582692351
```

## randomInt

生成指定范围内的随机整数。

### 语法

```typescript
function randomInt(min: number, max: number): number
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| min | number | 最小值（包含） |
| max | number | 最大值（包含） |

### 返回值

返回指定范围内的随机整数。

### 示例

```javascript
import { randomInt } from 'ft-base-tools';

// 生成 1-10 之间的随机整数
console.log(randomInt(1, 10)); // 例如：7

// 生成 -10 到 10 之间的随机整数
console.log(randomInt(-10, 10)); // 例如：-3
```

## clamp

将数值限制在指定范围内。

### 语法

```typescript
function clamp(num: number, min: number, max: number): number
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| num | number | 要限制的数值 |
| min | number | 最小值 |
| max | number | 最大值 |

### 返回值

返回限制在指定范围内的数值。

### 示例

```javascript
import { clamp } from 'ft-base-tools';

console.log(clamp(5, 1, 10)); // 5（在范围内，保持不变）
console.log(clamp(0, 1, 10)); // 1（小于最小值，返回最小值）
console.log(clamp(11, 1, 10)); // 10（大于最大值，返回最大值）
```

## sum

计算数组中所有数字的和。

### 语法

```typescript
function sum(arr: number[]): number
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| arr | number[] | 要计算的数字数组 |

### 返回值

返回数组中所有数字的和。

### 示例

```javascript
import { sum } from 'ft-base-tools';

console.log(sum([1, 2, 3, 4, 5])); // 15
console.log(sum([0.1, 0.2, 0.3])); // 0.6（精确计算）
```

## average

计算数组中所有数字的平均值。

### 语法

```typescript
function average(arr: number[]): number
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| arr | number[] | 要计算的数字数组 |

### 返回值

返回数组中所有数字的平均值。

### 示例

```javascript
import { average } from 'ft-base-tools';

console.log(average([1, 2, 3, 4, 5])); // 3
console.log(average([0.1, 0.2, 0.3])); // 0.2
```

## max

找出数组中的最大值。

### 语法

```typescript
function max(arr: number[]): number
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| arr | number[] | 要查找的数字数组 |

### 返回值

返回数组中的最大值。

### 示例

```javascript
import { max } from 'ft-base-tools';

console.log(max([1, 2, 3, 4, 5])); // 5
console.log(max([-10, -5, 0, 5, 10])); // 10
```

## min

找出数组中的最小值。

### 语法

```typescript
function min(arr: number[]): number
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| arr | number[] | 要查找的数字数组 |

### 返回值

返回数组中的最小值。

### 示例

```javascript
import { min } from 'ft-base-tools';

console.log(min([1, 2, 3, 4, 5])); // 1
console.log(min([-10, -5, 0, 5, 10])); // -10
```

## toRadians

将角度转换为弧度。

### 语法

```typescript
function toRadians(degrees: number): number
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| degrees | number | 角度值 |

### 返回值

返回对应的弧度值。

### 示例

```javascript
import { toRadians } from 'ft-base-tools';

console.log(toRadians(0)); // 0
console.log(toRadians(90)); // 1.5707963267948966 (π/2)
console.log(toRadians(180)); // 3.141592653589793 (π)
console.log(toRadians(360)); // 6.283185307179586 (2π)
```

## toDegrees

将弧度转换为角度。

### 语法

```typescript
function toDegrees(radians: number): number
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| radians | number | 弧度值 |

### 返回值

返回对应的角度值。

### 示例

```javascript
import { toDegrees } from 'ft-base-tools';

console.log(toDegrees(0)); // 0
console.log(toDegrees(Math.PI / 2)); // 90
console.log(toDegrees(Math.PI)); // 180
console.log(toDegrees(2 * Math.PI)); // 360
```

## distance

计算二维平面上两点之间的距离。

### 语法

```typescript
function distance(
  x1: number,
  y1: number,
  x2: number,
  y2: number
): number
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| x1 | number | 第一个点的 x 坐标 |
| y1 | number | 第一个点的 y 坐标 |
| x2 | number | 第二个点的 x 坐标 |
| y2 | number | 第二个点的 y 坐标 |

### 返回值

返回两点之间的欧几里得距离。

### 示例

```javascript
import { distance } from 'ft-base-tools';

console.log(distance(0, 0, 3, 4)); // 5
console.log(distance(1, 1, 4, 5)); // 5
```

## factorial

计算一个非负整数的阶乘。

### 语法

```typescript
function factorial(n: number): number
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| n | number | 要计算阶乘的非负整数 |

### 返回值

返回 n 的阶乘。

### 示例

```javascript
import { factorial } from 'ft-base-tools';

console.log(factorial(0)); // 1
console.log(factorial(1)); // 1
console.log(factorial(5)); // 120
console.log(factorial(10)); // 3628800
```

## gcd

计算两个或多个整数的最大公约数。

### 语法

```typescript
function gcd(a: number, b: number): number;
function gcd(...numbers: number[]): number;
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| a | number | 第一个整数 |
| b | number | 第二个整数 |
| numbers | number[] | 整数列表 |

### 返回值

返回最大公约数。

### 示例

```javascript
import { gcd } from 'ft-base-tools';

console.log(gcd(12, 18)); // 6
console.log(gcd(48, 180)); // 12
console.log(gcd(12, 18, 24)); // 6
```

## lcm

计算两个或多个整数的最小公倍数。

### 语法

```typescript
function lcm(a: number, b: number): number;
function lcm(...numbers: number[]): number;
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| a | number | 第一个整数 |
| b | number | 第二个整数 |
| numbers | number[] | 整数列表 |

### 返回值

返回最小公倍数。

### 示例

```javascript
import { lcm } from 'ft-base-tools';

console.log(lcm(12, 18)); // 36
console.log(lcm(4, 6)); // 12
console.log(lcm(3, 4, 5)); // 60
```