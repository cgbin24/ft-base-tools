# 对象工具

对象工具提供了一系列用于操作和处理 JavaScript 对象的实用函数。

## deepClone

深度克隆对象。

### 语法

```typescript
function deepClone<T>(obj: T): T
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| obj | T | 要克隆的对象 |

### 返回值

返回克隆后的对象。

### 示例

```javascript
import { deepClone } from 'ft-base-tools';

const original = {
  name: '张三',
  age: 30,
  address: {
    city: '北京',
    district: '朝阳区'
  },
  hobbies: ['读书', '旅游']
};

const clone = deepClone(original);

// 修改克隆对象不会影响原对象
clone.name = '李四';
clone.address.city = '上海';
clone.hobbies.push('游泳');

console.log(original.name); // '张三'
console.log(original.address.city); // '北京'
console.log(original.hobbies); // ['读书', '旅游']
```

## merge

深度合并多个对象。

### 语法

```typescript
function merge<T extends object>(...objects: T[]): T
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| objects | T[] | 要合并的对象列表 |

### 返回值

返回合并后的对象。

### 示例

```javascript
import { merge } from 'ft-base-tools';

const obj1 = { a: 1, b: { c: 2 } };
const obj2 = { b: { d: 3 }, e: 4 };
const obj3 = { a: 5, b: { f: 6 } };

const result = merge(obj1, obj2, obj3);

console.log(result);
/*
{
  a: 5,
  b: {
    c: 2,
    d: 3,
    f: 6
  },
  e: 4
}
*/
```

## pick

从对象中选取指定的属性。

### 语法

```typescript
function pick<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K>
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| obj | T | 源对象 |
| keys | K[] | 要选取的属性名数组 |

### 返回值

返回包含选取属性的新对象。

### 示例

```javascript
import { pick } from 'ft-base-tools';

const user = {
  id: 1,
  name: '张三',
  age: 30,
  email: 'zhangsan@example.com',
  address: '北京市朝阳区'
};

const userBasic = pick(user, ['id', 'name', 'age']);
console.log(userBasic);
/*
{
  id: 1,
  name: '张三',
  age: 30
}
*/
```

## omit

从对象中排除指定的属性。

### 语法

```typescript
function omit<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K>
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| obj | T | 源对象 |
| keys | K[] | 要排除的属性名数组 |

### 返回值

返回排除指定属性后的新对象。

### 示例

```javascript
import { omit } from 'ft-base-tools';

const user = {
  id: 1,
  name: '张三',
  age: 30,
  password: 'secret123',
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
};

// 排除敏感信息
const safeUser = omit(user, ['password', 'token']);
console.log(safeUser);
/*
{
  id: 1,
  name: '张三',
  age: 30
}
*/
```

## get

安全地获取对象的嵌套属性值。

### 语法

```typescript
function get<T = any>(
  obj: any,
  path: string | string[],
  defaultValue?: T
): T | undefined
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| obj | any | 要获取属性的对象 |
| path | string \| string[] | 属性路径，可以是点分隔的字符串或路径数组 |
| defaultValue | T | 可选。如果属性不存在，返回的默认值 |

### 返回值

返回属性值，如果属性不存在且未提供默认值，则返回 `undefined`。

### 示例

```javascript
import { get } from 'ft-base-tools';

const obj = {
  user: {
    info: {
      name: '张三',
      address: {
        city: '北京'
      }
    },
    settings: {
      theme: 'dark'
    }
  }
};

// 使用字符串路径
console.log(get(obj, 'user.info.name')); // '张三'
console.log(get(obj, 'user.info.address.city')); // '北京'

// 使用数组路径
console.log(get(obj, ['user', 'settings', 'theme'])); // 'dark'

// 属性不存在
console.log(get(obj, 'user.info.age')); // undefined

// 使用默认值
console.log(get(obj, 'user.info.age', 25)); // 25
console.log(get(obj, 'user.preferences.language', 'zh-CN')); // 'zh-CN'

// 处理数组
const arr = [{ id: 1, name: '张三' }, { id: 2, name: '李四' }];
console.log(get(arr, '1.name')); // '李四'
```

## set

安全地设置对象的嵌套属性值。

### 语法

```typescript
function set<T extends object>(
  obj: T,
  path: string | string[],
  value: any
): T
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| obj | T | 要设置属性的对象 |
| path | string \| string[] | 属性路径，可以是点分隔的字符串或路径数组 |
| value | any | 要设置的值 |

### 返回值

返回修改后的对象。

### 示例

```javascript
import { set } from 'ft-base-tools';

const obj = {
  user: {
    info: {
      name: '张三'
    }
  }
};

// 设置现有属性
set(obj, 'user.info.name', '李四');
console.log(obj.user.info.name); // '李四'

// 设置不存在的属性（自动创建路径）
set(obj, 'user.info.age', 30);
console.log(obj.user.info.age); // 30

// 使用数组路径
set(obj, ['user', 'settings', 'theme'], 'dark');
console.log(obj.user.settings.theme); // 'dark'

// 处理数组
const arr = [{ id: 1 }, { id: 2 }];
set(arr, '1.name', '李四');
console.log(arr[1].name); // '李四'
```

## has

检查对象是否包含指定的嵌套属性。

### 语法

```typescript
function has(
  obj: any,
  path: string | string[]
): boolean
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| obj | any | 要检查的对象 |
| path | string \| string[] | 属性路径，可以是点分隔的字符串或路径数组 |

### 返回值

如果对象包含指定属性返回 `true`，否则返回 `false`。

### 示例

```javascript
import { has } from 'ft-base-tools';

const obj = {
  user: {
    info: {
      name: '张三',
      address: {
        city: '北京'
      }
    }
  }
};

console.log(has(obj, 'user.info.name')); // true
console.log(has(obj, 'user.info.address.city')); // true
console.log(has(obj, ['user', 'info', 'age'])); // false
console.log(has(obj, 'user.settings')); // false
```

## isEmpty

检查值是否为空（空对象、空数组、空字符串、null 或 undefined）。

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

console.log(isEmpty({})); // true
console.log(isEmpty([])); // true
console.log(isEmpty('')); // true
console.log(isEmpty(null)); // true
console.log(isEmpty(undefined)); // true

console.log(isEmpty({ name: '张三' })); // false
console.log(isEmpty([1, 2, 3])); // false
console.log(isEmpty('hello')); // false
console.log(isEmpty(0)); // false
console.log(isEmpty(false)); // false
```

## isEqual

深度比较两个值是否相等。

### 语法

```typescript
function isEqual(value1: any, value2: any): boolean
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| value1 | any | 第一个值 |
| value2 | any | 第二个值 |

### 返回值

如果两个值相等返回 `true`，否则返回 `false`。

### 示例

```javascript
import { isEqual } from 'ft-base-tools';

// 基本类型
console.log(isEqual(1, 1)); // true
console.log(isEqual('hello', 'hello')); // true
console.log(isEqual(1, '1')); // false

// 对象
console.log(isEqual({ a: 1, b: 2 }, { a: 1, b: 2 })); // true
console.log(isEqual({ a: 1, b: 2 }, { b: 2, a: 1 })); // true（顺序不影响）
console.log(isEqual({ a: 1, b: 2 }, { a: 1, b: 3 })); // false

// 嵌套对象
console.log(isEqual(
  { a: 1, b: { c: 2 } },
  { a: 1, b: { c: 2 } }
)); // true

// 数组
console.log(isEqual([1, 2, 3], [1, 2, 3])); // true
console.log(isEqual([1, 2, 3], [1, 3, 2])); // false（顺序影响）

// 混合类型
console.log(isEqual(
  { a: 1, b: [1, 2, { c: 3 }] },
  { a: 1, b: [1, 2, { c: 3 }] }
)); // true
```

## flattenObject

将嵌套对象扁平化为单层对象。

### 语法

```typescript
function flattenObject(
  obj: Record<string, any>,
  options?: {
    delimiter?: string;
    prefix?: string;
  }
): Record<string, any>
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| obj | Record<string, any> | 要扁平化的对象 |
| options | object | 可选。扁平化选项 |
| options.delimiter | string | 可选。键名分隔符，默认为 '.' |
| options.prefix | string | 可选。键名前缀 |

### 返回值

返回扁平化后的对象。

### 示例

```javascript
import { flattenObject } from 'ft-base-tools';

const obj = {
  name: '张三',
  age: 30,
  address: {
    city: '北京',
    district: '朝阳区',
    detail: {
      street: '建国路',
      number: 100
    }
  },
  hobbies: ['读书', '旅游']
};

const flattened = flattenObject(obj);
console.log(flattened);
/*
{
  'name': '张三',
  'age': 30,
  'address.city': '北京',
  'address.district': '朝阳区',
  'address.detail.street': '建国路',
  'address.detail.number': 100,
  'hobbies.0': '读书',
  'hobbies.1': '旅游'
}
*/

// 使用自定义分隔符
const flattenedWithCustomDelimiter = flattenObject(obj, { delimiter: '_' });
console.log(flattenedWithCustomDelimiter);
/*
{
  'name': '张三',
  'age': 30,
  'address_city': '北京',
  'address_district': '朝阳区',
  'address_detail_street': '建国路',
  'address_detail_number': 100,
  'hobbies_0': '读书',
  'hobbies_1': '旅游'
}
*/
```

## unflattenObject

将扁平化的对象还原为嵌套对象。

### 语法

```typescript
function unflattenObject(
  obj: Record<string, any>,
  options?: {
    delimiter?: string;
  }
): Record<string, any>
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| obj | Record<string, any> | 要还原的扁平对象 |
| options | object | 可选。还原选项 |
| options.delimiter | string | 可选。键名分隔符，默认为 '.' |

### 返回值

返回还原后的嵌套对象。

### 示例

```javascript
import { unflattenObject } from 'ft-base-tools';

const flatObj = {
  'name': '张三',
  'age': 30,
  'address.city': '北京',
  'address.district': '朝阳区',
  'address.detail.street': '建国路',
  'address.detail.number': 100,
  'hobbies.0': '读书',
  'hobbies.1': '旅游'
};

const nested = unflattenObject(flatObj);
console.log(nested);
/*
{
  name: '张三',
  age: 30,
  address: {
    city: '北京',
    district: '朝阳区',
    detail: {
      street: '建国路',
      number: 100
    }
  },
  hobbies: ['读书', '旅游']
}
*/

// 使用自定义分隔符
const flatObjWithCustomDelimiter = {
  'name': '张三',
  'age': 30,
  'address_city': '北京',
  'address_district': '朝阳区'
};

const nestedWithCustomDelimiter = unflattenObject(flatObjWithCustomDelimiter, { delimiter: '_' });
console.log(nestedWithCustomDelimiter);
/*
{
  name: '张三',
  age: 30,
  address: {
    city: '北京',
    district: '朝阳区'
  }
}
*/
```

## mapValues

对对象的所有值应用转换函数。

### 语法

```typescript
function mapValues<T, U>(
  obj: Record<string, T>,
  fn: (value: T, key: string, obj: Record<string, T>) => U
): Record<string, U>
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| obj | Record<string, T> | 源对象 |
| fn | Function | 转换函数，接收值、键和原对象作为参数 |

### 返回值

返回转换后的新对象。

### 示例

```javascript
import { mapValues } from 'ft-base-tools';

const prices = {
  apple: 5,
  banana: 3,
  orange: 4
};

// 将所有价格乘以 2
const doublePrices = mapValues(prices, price => price * 2);
console.log(doublePrices);
/*
{
  apple: 10,
  banana: 6,
  orange: 8
}
*/

// 格式化价格
const formattedPrices = mapValues(prices, (price, key) => `${key}: ¥${price.toFixed(2)}`);
console.log(formattedPrices);
/*
{
  apple: 'apple: ¥5.00',
  banana: 'banana: ¥3.00',
  orange: 'orange: ¥4.00'
}
*/
```

## mapKeys

对对象的所有键应用转换函数。

### 语法

```typescript
function mapKeys<T>(
  obj: Record<string, T>,
  fn: (key: string, value: T, obj: Record<string, T>) => string
): Record<string, T>
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| obj | Record<string, T> | 源对象 |
| fn | Function | 转换函数，接收键、值和原对象作为参数 |

### 返回值

返回转换后的新对象。

### 示例

```javascript
import { mapKeys } from 'ft-base-tools';

const user = {
  firstName: '三',
  lastName: '张',
  age: 30
};

// 转换键名
const transformedUser = mapKeys(user, key => {
  if (key === 'firstName') return 'first_name';
  if (key === 'lastName') return 'last_name';
  return key;
});

console.log(transformedUser);
/*
{
  first_name: '三',
  last_name: '张',
  age: 30
}
*/

// 将所有键转换为大写
const uppercaseKeys = mapKeys(user, key => key.toUpperCase());
console.log(uppercaseKeys);
/*
{
  FIRSTNAME: '三',
  LASTNAME: '张',
  AGE: 30
}
*/
```

## objectToArray

将对象转换为键值对数组。

### 语法

```typescript
function objectToArray<T>(
  obj: Record<string, T>,
  options?: {
    keyName?: string;
    valueName?: string;
  }
): Array<{ [key: string]: string | T }>
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| obj | Record<string, T> | 要转换的对象 |
| options | object | 可选。转换选项 |
| options.keyName | string | 可选。键名属性名，默认为 'key' |
| options.valueName | string | 可选。值属性名，默认为 'value' |

### 返回值

返回键值对数组。

### 示例

```javascript
import { objectToArray } from 'ft-base-tools';

const colors = {
  red: '#FF0000',
  green: '#00FF00',
  blue: '#0000FF'
};

// 默认转换
const colorArray = objectToArray(colors);
console.log(colorArray);
/*
[
  { key: 'red', value: '#FF0000' },
  { key: 'green', value: '#00FF00' },
  { key: 'blue', value: '#0000FF' }
]
*/

// 自定义属性名
const customArray = objectToArray(colors, { keyName: 'name', valueName: 'hex' });
console.log(customArray);
/*
[
  { name: 'red', hex: '#FF0000' },
  { name: 'green', hex: '#00FF00' },
  { name: 'blue', hex: '#0000FF' }
]
*/
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
| keyFn | Function | 生成对象键的函数，接收数组项和索引作为参数 |

### 返回值

返回转换后的对象。

### 示例

```javascript
import { arrayToObject } from 'ft-base-tools';

const users = [
  { id: 1, name: '张三', age: 30 },
  { id: 2, name: '李四', age: 25 },
  { id: 3, name: '王五', age: 35 }
];

// 使用 id 作为键
const userMap = arrayToObject(users, user => user.id);
console.log(userMap);
/*
{
  1: { id: 1, name: '张三', age: 30 },
  2: { id: 2, name: '李四', age: 25 },
  3: { id: 3, name: '王五', age: 35 }
}
*/

// 使用 name 作为键
const userByName = arrayToObject(users, user => user.name);
console.log(userByName);
/*
{
  '张三': { id: 1, name: '张三', age: 30 },
  '李四': { id: 2, name: '李四', age: 25 },
  '王五': { id: 3, name: '王五', age: 35 }
}
*/

// 使用索引作为键
const userByIndex = arrayToObject(users, (user, index) => `user${index + 1}`);
console.log(userByIndex);
/*
{
  'user1': { id: 1, name: '张三', age: 30 },
  'user2': { id: 2, name: '李四', age: 25 },
  'user3': { id: 3, name: '王五', age: 35 }
}
*/
``` 