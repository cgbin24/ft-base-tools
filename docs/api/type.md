# 类型工具

类型工具提供了一系列用于检查和转换 JavaScript 数据类型的实用函数。

## getType

获取值的精确类型。

### 语法

```typescript
function getType(value: any): string
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| value | any | 要检查类型的值 |

### 返回值

返回值的类型字符串，如 'String'、'Number'、'Array' 等。

### 示例

```javascript
import { getType } from 'ft-base-tools';

console.log(getType('hello')); // 'String'
console.log(getType(123)); // 'Number'
console.log(getType(true)); // 'Boolean'
console.log(getType(null)); // 'Null'
console.log(getType(undefined)); // 'Undefined'
console.log(getType({})); // 'Object'
console.log(getType([])); // 'Array'
console.log(getType(() => {})); // 'Function'
console.log(getType(new Date())); // 'Date'
console.log(getType(/regex/)); // 'RegExp'
console.log(getType(new Map())); // 'Map'
console.log(getType(new Set())); // 'Set'
```

## isString

检查值是否为字符串。

### 语法

```typescript
function isString(value: any): value is string
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| value | any | 要检查的值 |

### 返回值

如果值是字符串返回 `true`，否则返回 `false`。

### 示例

```javascript
import { isString } from 'ft-base-tools';

console.log(isString('hello')); // true
console.log(isString('')); // true
console.log(isString(123)); // false
console.log(isString({})); // false
```

## isNumber

检查值是否为数字。

### 语法

```typescript
function isNumber(value: any): value is number
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| value | any | 要检查的值 |

### 返回值

如果值是数字返回 `true`，否则返回 `false`。

### 示例

```javascript
import { isNumber } from 'ft-base-tools';

console.log(isNumber(123)); // true
console.log(isNumber(0)); // true
console.log(isNumber(NaN)); // true（注意：NaN 也是数字类型）
console.log(isNumber(Infinity)); // true
console.log(isNumber('123')); // false
```

## isBoolean

检查值是否为布尔值。

### 语法

```typescript
function isBoolean(value: any): value is boolean
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| value | any | 要检查的值 |

### 返回值

如果值是布尔值返回 `true`，否则返回 `false`。

### 示例

```javascript
import { isBoolean } from 'ft-base-tools';

console.log(isBoolean(true)); // true
console.log(isBoolean(false)); // true
console.log(isBoolean(0)); // false
console.log(isBoolean('true')); // false
```

## isFunction

检查值是否为函数。

### 语法

```typescript
function isFunction(value: any): value is Function
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| value | any | 要检查的值 |

### 返回值

如果值是函数返回 `true`，否则返回 `false`。

### 示例

```javascript
import { isFunction } from 'ft-base-tools';

console.log(isFunction(() => {})); // true
console.log(isFunction(function() {})); // true
console.log(isFunction(class {})); // true
console.log(isFunction({})); // false
```

## isObject

检查值是否为对象（不包括 null）。

### 语法

```typescript
function isObject(value: any): value is object
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| value | any | 要检查的值 |

### 返回值

如果值是对象返回 `true`，否则返回 `false`。

### 示例

```javascript
import { isObject } from 'ft-base-tools';

console.log(isObject({})); // true
console.log(isObject([])); // true（数组也是对象）
console.log(isObject(new Date())); // true
console.log(isObject(null)); // false
console.log(isObject('hello')); // false
```

## isPlainObject

检查值是否为纯对象（由 `{}` 或 `new Object()` 创建的对象）。

### 语法

```typescript
function isPlainObject(value: any): boolean
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| value | any | 要检查的值 |

### 返回值

如果值是纯对象返回 `true`，否则返回 `false`。

### 示例

```javascript
import { isPlainObject } from 'ft-base-tools';

console.log(isPlainObject({})); // true
console.log(isPlainObject({ a: 1 })); // true
console.log(isPlainObject(Object.create(null))); // true
console.log(isPlainObject([])); // false
console.log(isPlainObject(new Date())); // false
console.log(isPlainObject(null)); // false
```

## isArray

检查值是否为数组。

### 语法

```typescript
function isArray(value: any): value is any[]
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| value | any | 要检查的值 |

### 返回值

如果值是数组返回 `true`，否则返回 `false`。

### 示例

```javascript
import { isArray } from 'ft-base-tools';

console.log(isArray([])); // true
console.log(isArray([1, 2, 3])); // true
console.log(isArray({})); // false
console.log(isArray('hello')); // false
```

## isDate

检查值是否为 Date 对象。

### 语法

```typescript
function isDate(value: any): value is Date
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| value | any | 要检查的值 |

### 返回值

如果值是 Date 对象返回 `true`，否则返回 `false`。

### 示例

```javascript
import { isDate } from 'ft-base-tools';

console.log(isDate(new Date())); // true
console.log(isDate(Date.now())); // false（这是一个数字）
console.log(isDate('2023-01-01')); // false
```

## isRegExp

检查值是否为正则表达式。

### 语法

```typescript
function isRegExp(value: any): value is RegExp
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| value | any | 要检查的值 |

### 返回值

如果值是正则表达式返回 `true`，否则返回 `false`。

### 示例

```javascript
import { isRegExp } from 'ft-base-tools';

console.log(isRegExp(/test/)); // true
console.log(isRegExp(new RegExp('test'))); // true
console.log(isRegExp('/test/')); // false（这是一个字符串）
```

## isNull

检查值是否为 null。

### 语法

```typescript
function isNull(value: any): value is null
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| value | any | 要检查的值 |

### 返回值

如果值是 null 返回 `true`，否则返回 `false`。

### 示例

```javascript
import { isNull } from 'ft-base-tools';

console.log(isNull(null)); // true
console.log(isNull(undefined)); // false
console.log(isNull(0)); // false
console.log(isNull('')); // false
```

## isUndefined

检查值是否为 undefined。

### 语法

```typescript
function isUndefined(value: any): value is undefined
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| value | any | 要检查的值 |

### 返回值

如果值是 undefined 返回 `true`，否则返回 `false`。

### 示例

```javascript
import { isUndefined } from 'ft-base-tools';

console.log(isUndefined(undefined)); // true
console.log(isUndefined(void 0)); // true
console.log(isUndefined(null)); // false
console.log(isUndefined('')); // false
```

## isNullOrUndefined

检查值是否为 null 或 undefined。

### 语法

```typescript
function isNullOrUndefined(value: any): value is null | undefined
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| value | any | 要检查的值 |

### 返回值

如果值是 null 或 undefined 返回 `true`，否则返回 `false`。

### 示例

```javascript
import { isNullOrUndefined } from 'ft-base-tools';

console.log(isNullOrUndefined(null)); // true
console.log(isNullOrUndefined(undefined)); // true
console.log(isNullOrUndefined(0)); // false
console.log(isNullOrUndefined('')); // false
```

## isEmpty

检查值是否为空（空字符串、空数组、空对象、null 或 undefined）。

### 语法

```typescript
function isEmpty(value: any): boolean
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| value | any | 要检查的值 |

### 返回值

如果值为空返回 `true`，否则返回 `false`。

### 示例

```javascript
import { isEmpty } from 'ft-base-tools';

console.log(isEmpty('')); // true
console.log(isEmpty([])); // true
console.log(isEmpty({})); // true
console.log(isEmpty(null)); // true
console.log(isEmpty(undefined)); // true
console.log(isEmpty(0)); // false
console.log(isEmpty(false)); // false
console.log(isEmpty('hello')); // false
console.log(isEmpty([1, 2])); // false
console.log(isEmpty({ a: 1 })); // false
```

## isPromise

检查值是否为 Promise。

### 语法

```typescript
function isPromise(value: any): value is Promise<any>
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| value | any | 要检查的值 |

### 返回值

如果值是 Promise 返回 `true`，否则返回 `false`。

### 示例

```javascript
import { isPromise } from 'ft-base-tools';

console.log(isPromise(Promise.resolve())); // true
console.log(isPromise(new Promise(() => {}))); // true
console.log(isPromise({ then: () => {} })); // true（类 Promise 对象）
console.log(isPromise({})); // false
```

## isMap

检查值是否为 Map。

### 语法

```typescript
function isMap(value: any): value is Map<any, any>
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| value | any | 要检查的值 |

### 返回值

如果值是 Map 返回 `true`，否则返回 `false`。

### 示例

```javascript
import { isMap } from 'ft-base-tools';

console.log(isMap(new Map())); // true
console.log(isMap({})); // false
```

## isSet

检查值是否为 Set。

### 语法

```typescript
function isSet(value: any): value is Set<any>
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| value | any | 要检查的值 |

### 返回值

如果值是 Set 返回 `true`，否则返回 `false`。

### 示例

```javascript
import { isSet } from 'ft-base-tools';

console.log(isSet(new Set())); // true
console.log(isSet([])); // false
```

## toNumber

将值转换为数字。

### 语法

```typescript
function toNumber(value: any, defaultValue?: number): number
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| value | any | 要转换的值 |
| defaultValue | number | 可选。转换失败时返回的默认值 |

### 返回值

返回转换后的数字，如果转换失败且未提供默认值，则返回 NaN。

### 示例

```javascript
import { toNumber } from 'ft-base-tools';

console.log(toNumber(123)); // 123
console.log(toNumber('123')); // 123
console.log(toNumber('123.45')); // 123.45
console.log(toNumber('abc')); // NaN
console.log(toNumber('abc', 0)); // 0（使用默认值）
console.log(toNumber(true)); // 1
console.log(toNumber(false)); // 0
console.log(toNumber(null)); // 0
console.log(toNumber(undefined)); // NaN
console.log(toNumber(undefined, 0)); // 0（使用默认值）
```

## toString

将值转换为字符串。

### 语法

```typescript
function toString(value: any, defaultValue?: string): string
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| value | any | 要转换的值 |
| defaultValue | string | 可选。转换失败时返回的默认值 |

### 返回值

返回转换后的字符串，如果转换失败且未提供默认值，则返回空字符串。

### 示例

```javascript
import { toString } from 'ft-base-tools';

console.log(toString('hello')); // 'hello'
console.log(toString(123)); // '123'
console.log(toString(true)); // 'true'
console.log(toString(false)); // 'false'
console.log(toString(null)); // ''
console.log(toString(null, 'null')); // 'null'（使用默认值）
console.log(toString(undefined)); // ''
console.log(toString(undefined, 'undefined')); // 'undefined'（使用默认值）
console.log(toString([1, 2, 3])); // '1,2,3'
console.log(toString({ a: 1 })); // '[object Object]'
```

## toBoolean

将值转换为布尔值。

### 语法

```typescript
function toBoolean(value: any): boolean
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| value | any | 要转换的值 |

### 返回值

返回转换后的布尔值。

### 示例

```javascript
import { toBoolean } from 'ft-base-tools';

console.log(toBoolean(true)); // true
console.log(toBoolean(false)); // false
console.log(toBoolean(1)); // true
console.log(toBoolean(0)); // false
console.log(toBoolean('')); // false
console.log(toBoolean('false')); // true（非空字符串转换为 true）
console.log(toBoolean(null)); // false
console.log(toBoolean(undefined)); // false
console.log(toBoolean({})); // true
console.log(toBoolean([])); // true
```

## toArray

将值转换为数组。

### 语法

```typescript
function toArray<T>(value: T | T[]): T[]
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| value | T \| T[] | 要转换的值 |

### 返回值

返回转换后的数组。

### 示例

```javascript
import { toArray } from 'ft-base-tools';

console.log(toArray(1)); // [1]
console.log(toArray('hello')); // ['hello']
console.log(toArray([1, 2, 3])); // [1, 2, 3]（已经是数组，保持不变）
console.log(toArray(null)); // []
console.log(toArray(undefined)); // []
``` 