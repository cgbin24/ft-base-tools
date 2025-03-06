# 存储工具

存储工具提供了一系列用于操作本地存储（localStorage、sessionStorage）和 Cookie 的实用函数。

## localStorage

### setLocalStorage

将数据存储到 localStorage 中。

#### 语法

```typescript
function setLocalStorage(
  key: string,
  value: any,
  options?: {
    expire?: number;
  }
): void
```

#### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| key | string | 存储键名 |
| value | any | 要存储的数据，非字符串值会被自动 JSON 序列化 |
| options | object | 可选。存储选项 |
| options.expire | number | 可选。过期时间（毫秒），从当前时间算起 |

#### 示例

```javascript
import { setLocalStorage } from 'ft-base-tools';

// 存储字符串
setLocalStorage('username', '张三');

// 存储对象
setLocalStorage('userInfo', {
  id: 1,
  name: '张三',
  age: 30
});

// 设置过期时间（1小时后过期）
setLocalStorage('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...', {
  expire: 60 * 60 * 1000
});
```

### getLocalStorage

从 localStorage 中获取数据。

#### 语法

```typescript
function getLocalStorage<T = any>(
  key: string,
  defaultValue?: T
): T | null
```

#### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| key | string | 存储键名 |
| defaultValue | T | 可选。如果数据不存在或已过期，返回的默认值 |

#### 返回值

返回存储的数据，如果数据不存在或已过期且未提供默认值，则返回 `null`。

#### 示例

```javascript
import { getLocalStorage } from 'ft-base-tools';

// 获取字符串
const username = getLocalStorage('username');
console.log(username); // '张三'

// 获取对象
const userInfo = getLocalStorage('userInfo');
console.log(userInfo); // { id: 1, name: '张三', age: 30 }

// 使用默认值
const settings = getLocalStorage('settings', { theme: 'light', fontSize: 14 });
console.log(settings); // 如果 'settings' 不存在，返回 { theme: 'light', fontSize: 14 }
```

### removeLocalStorage

从 localStorage 中移除数据。

#### 语法

```typescript
function removeLocalStorage(key: string): void
```

#### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| key | string | 要移除的存储键名 |

#### 示例

```javascript
import { removeLocalStorage } from 'ft-base-tools';

// 移除特定项
removeLocalStorage('username');
```

### clearLocalStorage

清空 localStorage 中的所有数据。

#### 语法

```typescript
function clearLocalStorage(): void
```

#### 示例

```javascript
import { clearLocalStorage } from 'ft-base-tools';

// 清空所有数据
clearLocalStorage();
```

## sessionStorage

### setSessionStorage

将数据存储到 sessionStorage 中。

#### 语法

```typescript
function setSessionStorage(key: string, value: any): void
```

#### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| key | string | 存储键名 |
| value | any | 要存储的数据，非字符串值会被自动 JSON 序列化 |

#### 示例

```javascript
import { setSessionStorage } from 'ft-base-tools';

// 存储字符串
setSessionStorage('currentPage', 'home');

// 存储对象
setSessionStorage('formData', {
  name: '张三',
  email: 'zhangsan@example.com'
});
```

### getSessionStorage

从 sessionStorage 中获取数据。

#### 语法

```typescript
function getSessionStorage<T = any>(
  key: string,
  defaultValue?: T
): T | null
```

#### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| key | string | 存储键名 |
| defaultValue | T | 可选。如果数据不存在，返回的默认值 |

#### 返回值

返回存储的数据，如果数据不存在且未提供默认值，则返回 `null`。

#### 示例

```javascript
import { getSessionStorage } from 'ft-base-tools';

// 获取字符串
const currentPage = getSessionStorage('currentPage');
console.log(currentPage); // 'home'

// 获取对象
const formData = getSessionStorage('formData');
console.log(formData); // { name: '张三', email: 'zhangsan@example.com' }

// 使用默认值
const filters = getSessionStorage('filters', { category: 'all', sort: 'newest' });
console.log(filters); // 如果 'filters' 不存在，返回 { category: 'all', sort: 'newest' }
```

### removeSessionStorage

从 sessionStorage 中移除数据。

#### 语法

```typescript
function removeSessionStorage(key: string): void
```

#### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| key | string | 要移除的存储键名 |

#### 示例

```javascript
import { removeSessionStorage } from 'ft-base-tools';

// 移除特定项
removeSessionStorage('formData');
```

### clearSessionStorage

清空 sessionStorage 中的所有数据。

#### 语法

```typescript
function clearSessionStorage(): void
```

#### 示例

```javascript
import { clearSessionStorage } from 'ft-base-tools';

// 清空所有数据
clearSessionStorage();
```

## Cookie

### setCookie

设置 Cookie。

#### 语法

```typescript
function setCookie(
  name: string,
  value: string,
  options?: {
    expires?: number | Date;
    path?: string;
    domain?: string;
    secure?: boolean;
    sameSite?: 'strict' | 'lax' | 'none';
  }
): void
```

#### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| name | string | Cookie 名称 |
| value | string | Cookie 值 |
| options | object | 可选。Cookie 选项 |
| options.expires | number \| Date | 可选。过期时间，可以是天数（number）或具体日期（Date） |
| options.path | string | 可选。Cookie 路径，默认为 '/' |
| options.domain | string | 可选。Cookie 域名 |
| options.secure | boolean | 可选。是否仅通过 HTTPS 传输，默认为 false |
| options.sameSite | string | 可选。SameSite 属性，可选值为 'strict'、'lax' 或 'none' |

#### 示例

```javascript
import { setCookie } from 'ft-base-tools';

// 基本用法
setCookie('username', '张三');

// 设置过期时间（7天后过期）
setCookie('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...', {
  expires: 7
});

// 设置具体过期日期
const expiryDate = new Date();
expiryDate.setMonth(expiryDate.getMonth() + 1);
setCookie('subscription', 'premium', {
  expires: expiryDate
});

// 设置安全 Cookie
setCookie('sessionId', '123456', {
  secure: true,
  sameSite: 'strict'
});
```

### getCookie

获取 Cookie 值。

#### 语法

```typescript
function getCookie(name: string): string | null
```

#### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| name | string | Cookie 名称 |

#### 返回值

返回 Cookie 值，如果 Cookie 不存在则返回 `null`。

#### 示例

```javascript
import { getCookie } from 'ft-base-tools';

const username = getCookie('username');
console.log(username); // '张三'

const nonExistent = getCookie('nonExistent');
console.log(nonExistent); // null
```

### removeCookie

删除 Cookie。

#### 语法

```typescript
function removeCookie(
  name: string,
  options?: {
    path?: string;
    domain?: string;
  }
): void
```

#### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| name | string | Cookie 名称 |
| options | object | 可选。Cookie 选项 |
| options.path | string | 可选。Cookie 路径，默认为 '/' |
| options.domain | string | 可选。Cookie 域名 |

#### 示例

```javascript
import { removeCookie } from 'ft-base-tools';

// 删除 Cookie
removeCookie('username');

// 删除特定路径下的 Cookie
removeCookie('sessionId', { path: '/admin' });
```

### getAllCookies

获取所有 Cookie。

#### 语法

```typescript
function getAllCookies(): Record<string, string>
```

#### 返回值

返回包含所有 Cookie 的对象，键为 Cookie 名称，值为 Cookie 值。

#### 示例

```javascript
import { getAllCookies } from 'ft-base-tools';

const cookies = getAllCookies();
console.log(cookies);
// 例如：{ username: '张三', token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' }
```

## 通用存储

### storage

通用存储接口，可以选择使用 localStorage、sessionStorage 或内存存储。

#### 语法

```typescript
const storage = {
  set(key: string, value: any, options?: StorageOptions): void;
  get<T = any>(key: string, defaultValue?: T): T | null;
  remove(key: string): void;
  clear(): void;
  type: 'localStorage' | 'sessionStorage' | 'memory';
  setType(type: 'localStorage' | 'sessionStorage' | 'memory'): void;
}
```

#### 方法

| 方法 | 描述 |
| --- | --- |
| set | 存储数据 |
| get | 获取数据 |
| remove | 移除数据 |
| clear | 清空所有数据 |
| setType | 设置存储类型 |

#### 示例

```javascript
import { storage } from 'ft-base-tools';

// 默认使用 localStorage
storage.set('username', '张三');
console.log(storage.get('username')); // '张三'

// 切换到 sessionStorage
storage.setType('sessionStorage');
storage.set('currentPage', 'home');
console.log(storage.get('currentPage')); // 'home'

// 切换到内存存储（页面刷新后数据会丢失）
storage.setType('memory');
storage.set('tempData', { id: 123 });
console.log(storage.get('tempData')); // { id: 123 }

// 移除数据
storage.remove('tempData');

// 清空当前存储类型的所有数据
storage.clear();
```

## 缓存

### cache

简单的内存缓存系统，支持过期时间。

#### 语法

```typescript
const cache = {
  set(key: string, value: any, ttl?: number): void;
  get<T = any>(key: string): T | null;
  has(key: string): boolean;
  remove(key: string): void;
  clear(): void;
  size(): number;
  keys(): string[];
}
```

#### 方法

| 方法 | 描述 |
| --- | --- |
| set | 设置缓存项，可选过期时间（毫秒） |
| get | 获取缓存项 |
| has | 检查缓存项是否存在且未过期 |
| remove | 移除缓存项 |
| clear | 清空所有缓存 |
| size | 获取缓存项数量 |
| keys | 获取所有缓存键名 |

#### 示例

```javascript
import { cache } from 'ft-base-tools';

// 设置缓存
cache.set('user', { id: 1, name: '张三' });

// 设置带过期时间的缓存（5秒后过期）
cache.set('token', 'abc123', 5000);

// 获取缓存
const user = cache.get('user');
console.log(user); // { id: 1, name: '张三' }

// 检查缓存是否存在
if (cache.has('token')) {
  console.log('Token 存在');
}

// 等待 5 秒后，token 将过期
setTimeout(() => {
  console.log(cache.has('token')); // false
  console.log(cache.get('token')); // null
}, 5500);

// 获取缓存大小
console.log(cache.size()); // 2（或 1，如果 token 已过期）

// 获取所有缓存键
console.log(cache.keys()); // ['user', 'token']（或 ['user']，如果 token 已过期）

// 移除缓存
cache.remove('user');

// 清空所有缓存
cache.clear();
``` 