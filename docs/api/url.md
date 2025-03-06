# URL 工具

URL 工具提供了一系列用于处理和操作 URL 的实用函数。

## parseUrl

解析 URL 字符串为各个组成部分。

### 语法

```typescript
function parseUrl(url: string): {
  protocol: string;
  host: string;
  hostname: string;
  port: string;
  pathname: string;
  search: string;
  hash: string;
  params: Record<string, string>;
}
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| url | string | 要解析的 URL 字符串 |

### 返回值

返回包含 URL 各个部分的对象。

### 示例

```javascript
import { parseUrl } from 'ft-base-tools';

const urlInfo = parseUrl('https://example.com:8080/path/to/page?id=123&name=张三#section1');
console.log(urlInfo.protocol); // 'https:'
console.log(urlInfo.host); // 'example.com:8080'
console.log(urlInfo.hostname); // 'example.com'
console.log(urlInfo.port); // '8080'
console.log(urlInfo.pathname); // '/path/to/page'
console.log(urlInfo.search); // '?id=123&name=张三'
console.log(urlInfo.hash); // '#section1'
console.log(urlInfo.params); // { id: '123', name: '张三' }
```

## getUrlParams

从 URL 中获取查询参数。

### 语法

```typescript
function getUrlParams(url?: string): Record<string, string>
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| url | string | 可选。要解析的 URL 字符串，默认为当前页面 URL |

### 返回值

返回包含所有查询参数的对象。

### 示例

```javascript
import { getUrlParams } from 'ft-base-tools';

// 假设当前 URL 为 https://example.com?id=123&name=张三&active=true
const params = getUrlParams();
console.log(params.id); // '123'
console.log(params.name); // '张三'
console.log(params.active); // 'true'

// 解析指定 URL
const customParams = getUrlParams('https://example.com?page=1&limit=10');
console.log(customParams.page); // '1'
console.log(customParams.limit); // '10'
```

## buildUrl

构建 URL 字符串，支持添加查询参数。

### 语法

```typescript
function buildUrl(
  baseUrl: string,
  params?: Record<string, string | number | boolean | undefined | null>
): string
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| baseUrl | string | 基础 URL |
| params | Record<string, string \| number \| boolean \| undefined \| null> | 可选。要添加的查询参数 |

### 返回值

返回构建好的 URL 字符串。

### 示例

```javascript
import { buildUrl } from 'ft-base-tools';

// 基本用法
console.log(buildUrl('https://example.com')); // 'https://example.com'

// 添加查询参数
console.log(buildUrl('https://example.com', { id: 123, name: '张三' }));
// 'https://example.com?id=123&name=张三'

// 忽略 undefined 和 null 值
console.log(buildUrl('https://example.com', { id: 123, name: null, age: undefined }));
// 'https://example.com?id=123'

// 处理已有查询参数的 URL
console.log(buildUrl('https://example.com?sort=desc', { page: 1, limit: 10 }));
// 'https://example.com?sort=desc&page=1&limit=10'
```

## joinUrl

连接 URL 路径片段。

### 语法

```typescript
function joinUrl(...parts: string[]): string
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| parts | string[] | URL 路径片段 |

### 返回值

返回连接后的 URL 字符串。

### 示例

```javascript
import { joinUrl } from 'ft-base-tools';

console.log(joinUrl('https://example.com', 'api', 'users'));
// 'https://example.com/api/users'

console.log(joinUrl('https://example.com/', '/api/', '/users'));
// 'https://example.com/api/users'

console.log(joinUrl('https://example.com', 'api/users', '123'));
// 'https://example.com/api/users/123'
```

## isAbsoluteUrl

检查 URL 是否为绝对 URL。

### 语法

```typescript
function isAbsoluteUrl(url: string): boolean
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| url | string | 要检查的 URL |

### 返回值

如果是绝对 URL 返回 `true`，否则返回 `false`。

### 示例

```javascript
import { isAbsoluteUrl } from 'ft-base-tools';

console.log(isAbsoluteUrl('https://example.com')); // true
console.log(isAbsoluteUrl('http://example.com')); // true
console.log(isAbsoluteUrl('//example.com')); // true
console.log(isAbsoluteUrl('/path/to/page')); // false
console.log(isAbsoluteUrl('path/to/page')); // false
```

## getBaseUrl

获取 URL 的基础部分（协议 + 主机）。

### 语法

```typescript
function getBaseUrl(url?: string): string
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| url | string | 可选。要解析的 URL，默认为当前页面 URL |

### 返回值

返回 URL 的基础部分。

### 示例

```javascript
import { getBaseUrl } from 'ft-base-tools';

console.log(getBaseUrl('https://example.com/path/to/page?id=123#section'));
// 'https://example.com'

console.log(getBaseUrl('https://sub.example.com:8080/path'));
// 'https://sub.example.com:8080'

// 在浏览器中，不传参数则使用当前页面 URL
// 假设当前页面为 https://example.com/app
console.log(getBaseUrl()); // 'https://example.com'
```

## getPathname

获取 URL 的路径部分。

### 语法

```typescript
function getPathname(url?: string): string
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| url | string | 可选。要解析的 URL，默认为当前页面 URL |

### 返回值

返回 URL 的路径部分。

### 示例

```javascript
import { getPathname } from 'ft-base-tools';

console.log(getPathname('https://example.com/path/to/page?id=123#section'));
// '/path/to/page'

console.log(getPathname('https://example.com'));
// '/'

// 在浏览器中，不传参数则使用当前页面 URL
// 假设当前页面为 https://example.com/app/dashboard
console.log(getPathname()); // '/app/dashboard'
```

## getQueryString

获取 URL 的查询字符串部分。

### 语法

```typescript
function getQueryString(url?: string): string
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| url | string | 可选。要解析的 URL，默认为当前页面 URL |

### 返回值

返回 URL 的查询字符串部分（包括前导 `?`）。

### 示例

```javascript
import { getQueryString } from 'ft-base-tools';

console.log(getQueryString('https://example.com/path?id=123&name=张三'));
// '?id=123&name=张三'

console.log(getQueryString('https://example.com/path'));
// ''

// 在浏览器中，不传参数则使用当前页面 URL
// 假设当前页面为 https://example.com/app?theme=dark&lang=zh
console.log(getQueryString()); // '?theme=dark&lang=zh'
```

## addQueryParams

向 URL 添加查询参数。

### 语法

```typescript
function addQueryParams(
  url: string,
  params: Record<string, string | number | boolean | undefined | null>
): string
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| url | string | 原始 URL |
| params | Record<string, string \| number \| boolean \| undefined \| null> | 要添加的查询参数 |

### 返回值

返回添加查询参数后的 URL。

### 示例

```javascript
import { addQueryParams } from 'ft-base-tools';

console.log(addQueryParams('https://example.com', { id: 123, name: '张三' }));
// 'https://example.com?id=123&name=张三'

console.log(addQueryParams('https://example.com?sort=desc', { page: 1, limit: 10 }));
// 'https://example.com?sort=desc&page=1&limit=10'

// 忽略 undefined 和 null 值
console.log(addQueryParams('https://example.com', { id: 123, name: null, age: undefined }));
// 'https://example.com?id=123'
```

## removeQueryParams

从 URL 中移除指定的查询参数。

### 语法

```typescript
function removeQueryParams(url: string, params: string | string[]): string
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| url | string | 原始 URL |
| params | string \| string[] | 要移除的查询参数名称或名称数组 |

### 返回值

返回移除查询参数后的 URL。

### 示例

```javascript
import { removeQueryParams } from 'ft-base-tools';

console.log(removeQueryParams('https://example.com?id=123&name=张三&age=30', 'name'));
// 'https://example.com?id=123&age=30'

console.log(removeQueryParams('https://example.com?id=123&name=张三&age=30', ['id', 'age']));
// 'https://example.com?name=张三'

// 移除不存在的参数
console.log(removeQueryParams('https://example.com?id=123', 'name'));
// 'https://example.com?id=123'

// 移除所有参数
console.log(removeQueryParams('https://example.com?id=123&name=张三', ['id', 'name']));
// 'https://example.com'
```

## updateQueryParams

更新 URL 中的查询参数。

### 语法

```typescript
function updateQueryParams(
  url: string,
  params: Record<string, string | number | boolean | undefined | null>
): string
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| url | string | 原始 URL |
| params | Record<string, string \| number \| boolean \| undefined \| null> | 要更新的查询参数 |

### 返回值

返回更新查询参数后的 URL。

### 示例

```javascript
import { updateQueryParams } from 'ft-base-tools';

console.log(updateQueryParams('https://example.com?id=123&name=张三', { id: 456, age: 30 }));
// 'https://example.com?id=456&name=张三&age=30'

// 设置参数为 null 或 undefined 会移除该参数
console.log(updateQueryParams('https://example.com?id=123&name=张三', { name: null, age: 30 }));
// 'https://example.com?id=123&age=30'
```

## getUrlHash

获取 URL 的哈希部分。

### 语法

```typescript
function getUrlHash(url?: string): string
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| url | string | 可选。要解析的 URL，默认为当前页面 URL |

### 返回值

返回 URL 的哈希部分（包括前导 `#`）。

### 示例

```javascript
import { getUrlHash } from 'ft-base-tools';

console.log(getUrlHash('https://example.com/path?id=123#section'));
// '#section'

console.log(getUrlHash('https://example.com/path'));
// ''

// 在浏览器中，不传参数则使用当前页面 URL
// 假设当前页面为 https://example.com/app#dashboard
console.log(getUrlHash()); // '#dashboard'
```

## isValidUrl

验证 URL 是否有效。

### 语法

```typescript
function isValidUrl(url: string): boolean
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| url | string | 要验证的 URL |

### 返回值

如果 URL 有效返回 `true`，否则返回 `false`。

### 示例

```javascript
import { isValidUrl } from 'ft-base-tools';

console.log(isValidUrl('https://example.com')); // true
console.log(isValidUrl('http://sub.example.co.uk/path')); // true
console.log(isValidUrl('ftp://files.example.com')); // true
console.log(isValidUrl('example.com')); // false（缺少协议）
console.log(isValidUrl('https://')); // false
console.log(isValidUrl('not a url')); // false
```