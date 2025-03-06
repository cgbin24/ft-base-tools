# 数组工具

数组工具提供了一系列用于处理数组的实用函数。

## arrayUnique

移除数组中的重复元素。

### 语法

```typescript
function arrayUnique<T>(arr: T[]): T[]
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| arr | T[] | 要去重的数组 |

### 返回值

返回一个新数组，包含原数组中的唯一元素。

### 示例

```javascript
import { arrayUnique } from 'ft-base-tools';

const arr = [1, 2, 2, 3, 4, 4, 5];
const result = arrayUnique(arr);
console.log(result); // [1, 2, 3, 4, 5]
```

## arrayFlatten

将多维数组扁平化为一维数组。

### 语法

```typescript
function arrayFlatten<T>(arr: any[], depth?: number): T[]
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| arr | any[] | 要扁平化的数组 |
| depth | number | 可选。指定要扁平化的层级。默认为 Infinity（完全扁平化） |

### 返回值

返回一个新的扁平化后的数组。

### 示例

```javascript
import { arrayFlatten } from 'ft-base-tools';

const arr = [1, [2, [3, [4]], 5]];
const result1 = arrayFlatten(arr);
console.log(result1); // [1, 2, 3, 4, 5]

const result2 = arrayFlatten(arr, 1);
console.log(result2); // [1, 2, [3, [4]], 5]
```

## arrayChunk

将数组分割成指定大小的小数组。

### 语法

```typescript
function arrayChunk<T>(arr: T[], size: number): T[][]
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| arr | T[] | 要分割的数组 |
| size | number | 每个小数组的大小 |

### 返回值

返回一个新的二维数组，包含分割后的小数组。

### 示例

```javascript
import { arrayChunk } from 'ft-base-tools';

const arr = [1, 2, 3, 4, 5, 6, 7];
const result = arrayChunk(arr, 3);
console.log(result); // [[1, 2, 3], [4, 5, 6], [7]]
```

## arrayIntersect

返回两个数组的交集。

### 语法

```typescript
function arrayIntersect<T>(arr1: T[], arr2: T[]): T[]
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| arr1 | T[] | 第一个数组 |
| arr2 | T[] | 第二个数组 |

### 返回值

返回一个新数组，包含两个数组中共有的元素。

### 示例

```javascript
import { arrayIntersect } from 'ft-base-tools';

const arr1 = [1, 2, 3, 4];
const arr2 = [3, 4, 5, 6];
const result = arrayIntersect(arr1, arr2);
console.log(result); // [3, 4]
```

## arrayDifference

返回第一个数组中存在但第二个数组中不存在的元素。

### 语法

```typescript
function arrayDifference<T>(arr1: T[], arr2: T[]): T[]
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| arr1 | T[] | 第一个数组 |
| arr2 | T[] | 第二个数组 |

### 返回值

返回一个新数组，包含在第一个数组中但不在第二个数组中的元素。

### 示例

```javascript
import { arrayDifference } from 'ft-base-tools';

const arr1 = [1, 2, 3, 4];
const arr2 = [3, 4, 5, 6];
const result = arrayDifference(arr1, arr2);
console.log(result); // [1, 2]
```

## arrayShuffle

随机打乱数组元素的顺序。

### 语法

```typescript
function arrayShuffle<T>(arr: T[]): T[]
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| arr | T[] | 要打乱的数组 |

### 返回值

返回一个新数组，包含原数组的所有元素，但顺序随机。

### 示例

```javascript
import { arrayShuffle } from 'ft-base-tools';

const arr = [1, 2, 3, 4, 5];
const result = arrayShuffle(arr);
console.log(result); // 例如：[3, 1, 5, 2, 4]（顺序随机）
```

## arrayToObject

将数组转换为对象。

### 语法

```typescript
function arrayToObject<T, K extends string | number | symbol>(
  arr: T[],
  keyFn: (item: T, index: number) => K
): Record<K, T>
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| arr | T[] | 要转换的数组 |
| keyFn | (item: T, index: number) => K | 用于生成对象键的函数 |

### 返回值

返回一个对象，其键由 keyFn 函数生成，值为数组中的元素。

### 示例

```javascript
import { arrayToObject } from 'ft-base-tools';

const users = [
  { id: 1, name: '张三' },
  { id: 2, name: '李四' },
  { id: 3, name: '王五' }
];

const result = arrayToObject(users, user => user.id);
console.log(result);
/*
{
  1: { id: 1, name: '张三' },
  2: { id: 2, name: '李四' },
  3: { id: 3, name: '王五' }
}
*/
``` 