# 网络工具

网络工具提供了一系列用于处理网络请求、URL 操作和数据传输的实用函数。

## request

发送 HTTP 请求。

### 语法

```typescript
function request<T = any>(
  url: string,
  options?: {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS';
    headers?: Record<string, string>;
    data?: any;
    params?: Record<string, string | number | boolean>;
    timeout?: number;
    responseType?: 'json' | 'text' | 'blob' | 'arraybuffer' | 'formdata';
    withCredentials?: boolean;
    signal?: AbortSignal;
  }
): Promise<T>
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| url | string | 请求 URL |
| options | object | 可选。请求选项 |
| options.method | string | 可选。HTTP 方法，默认为 'GET' |
| options.headers | Record<string, string> | 可选。请求头 |
| options.data | any | 可选。请求体数据 |
| options.params | Record<string, string \| number \| boolean> | 可选。URL 查询参数 |
| options.timeout | number | 可选。请求超时时间（毫秒） |
| options.responseType | string | 可选。响应数据类型，默认为 'json' |
| options.withCredentials | boolean | 可选。是否发送凭证，默认为 false |
| options.signal | AbortSignal | 可选。用于取消请求的信号 |

### 返回值

返回一个 Promise，解析为响应数据。

### 示例

```javascript
import { request } from 'ft-base-tools';

// GET 请求
request('https://api.example.com/data')
  .then(data => console.log(data))
  .catch(error => console.error(error));

// 带查询参数的 GET 请求
request('https://api.example.com/users', {
  params: { page: 1, limit: 10 }
})
  .then(data => console.log(data))
  .catch(error => console.error(error));

// POST 请求
request('https://api.example.com/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  data: {
    name: '张三',
    age: 30
  }
})
  .then(data => console.log(data))
  .catch(error => console.error(error));

// 上传文件
const formData = new FormData();
formData.append('file', fileInput.files[0]);

request('https://api.example.com/upload', {
  method: 'POST',
  data: formData
})
  .then(data => console.log(data))
  .catch(error => console.error(error));

// 取消请求
const controller = new AbortController();
const { signal } = controller;

request('https://api.example.com/data', { signal })
  .then(data => console.log(data))
  .catch(error => {
    if (error.name === 'AbortError') {
      console.log('请求已取消');
    } else {
      console.error(error);
    }
  });

// 取消请求
controller.abort();
```

## get

发送 GET 请求。

### 语法

```typescript
function get<T = any>(
  url: string,
  params?: Record<string, string | number | boolean>,
  options?: Omit<RequestOptions, 'method' | 'params'>
): Promise<T>
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| url | string | 请求 URL |
| params | Record<string, string \| number \| boolean> | 可选。URL 查询参数 |
| options | Omit<RequestOptions, 'method' \| 'params'> | 可选。其他请求选项 |

### 返回值

返回一个 Promise，解析为响应数据。

### 示例

```javascript
import { get } from 'ft-base-tools';

// 简单 GET 请求
get('https://api.example.com/data')
  .then(data => console.log(data))
  .catch(error => console.error(error));

// 带查询参数的 GET 请求
get('https://api.example.com/users', { page: 1, limit: 10 })
  .then(data => console.log(data))
  .catch(error => console.error(error));

// 带自定义头的 GET 请求
get('https://api.example.com/data', null, {
  headers: {
    'Authorization': 'Bearer token123'
  }
})
  .then(data => console.log(data))
  .catch(error => console.error(error));
```

## post

发送 POST 请求。

### 语法

```typescript
function post<T = any>(
  url: string,
  data?: any,
  options?: Omit<RequestOptions, 'method' | 'data'>
): Promise<T>
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| url | string | 请求 URL |
| data | any | 可选。请求体数据 |
| options | Omit<RequestOptions, 'method' \| 'data'> | 可选。其他请求选项 |

### 返回值

返回一个 Promise，解析为响应数据。

### 示例

```javascript
import { post } from 'ft-base-tools';

// 简单 POST 请求
post('https://api.example.com/users', {
  name: '张三',
  age: 30
})
  .then(data => console.log(data))
  .catch(error => console.error(error));

// 带查询参数的 POST 请求
post('https://api.example.com/users', 
  { name: '张三', age: 30 },
  { params: { token: 'abc123' } }
)
  .then(data => console.log(data))
  .catch(error => console.error(error));

// 上传文件
const formData = new FormData();
formData.append('file', fileInput.files[0]);

post('https://api.example.com/upload', formData)
  .then(data => console.log(data))
  .catch(error => console.error(error));
```

## put

发送 PUT 请求。

### 语法

```typescript
function put<T = any>(
  url: string,
  data?: any,
  options?: Omit<RequestOptions, 'method' | 'data'>
): Promise<T>
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| url | string | 请求 URL |
| data | any | 可选。请求体数据 |
| options | Omit<RequestOptions, 'method' \| 'data'> | 可选。其他请求选项 |

### 返回值

返回一个 Promise，解析为响应数据。

### 示例

```javascript
import { put } from 'ft-base-tools';

// 更新用户信息
put('https://api.example.com/users/123', {
  name: '张三',
  age: 31
})
  .then(data => console.log(data))
  .catch(error => console.error(error));
```

## del

发送 DELETE 请求。

### 语法

```typescript
function del<T = any>(
  url: string,
  options?: Omit<RequestOptions, 'method'>
): Promise<T>
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| url | string | 请求 URL |
| options | Omit<RequestOptions, 'method'> | 可选。其他请求选项 |

### 返回值

返回一个 Promise，解析为响应数据。

### 示例

```javascript
import { del } from 'ft-base-tools';

// 删除用户
del('https://api.example.com/users/123')
  .then(data => console.log(data))
  .catch(error => console.error(error));

// 带查询参数的 DELETE 请求
del('https://api.example.com/users/123', {
  params: { permanent: true }
})
  .then(data => console.log(data))
  .catch(error => console.error(error));
```

## getUrlParams

解析 URL 查询参数。

### 语法

```typescript
function getUrlParams(url?: string): Record<string, string>
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| url | string | 可选。要解析的 URL，默认为当前页面 URL |

### 返回值

返回包含查询参数的对象。

### 示例

```javascript
import { getUrlParams } from 'ft-base-tools';

// 假设当前 URL 为 https://example.com?id=123&name=张三&active=true
const params = getUrlParams();
console.log(params.id); // 123
console.log(params.name); // 张三
console.log(params.active); // true

// 解析指定 URL
const customParams = getUrlParams('https://example.com?page=1&limit=10');
console.log(customParams.page); // 1
console.log(customParams.limit); // 10
```

## buildUrl

构建带查询参数的 URL。

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
| params | Record<string, string \| number \| boolean \| undefined \| null> | 可选。查询参数对象 |

### 返回值

返回构建好的 URL 字符串。

### 示例

```javascript
import { buildUrl } from 'ft-base-tools';

const url1 = buildUrl('https://example.com');
console.log(url1); // https://example.com

const url2 = buildUrl('https://example.com', { id: 123, name: '张三' });
console.log(url2); // https://example.com?id=123&name=张三

// 忽略 undefined 和 null 值
const url3 = buildUrl('https://example.com', { id: 123, name: null, age: undefined });
console.log(url3); // https://example.com?id=123
```

## parseUrl

解析 URL 各个部分。

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
| url | string | 要解析的 URL |

### 返回值

返回包含 URL 各个部分的对象。

### 示例

```javascript
import { parseUrl } from 'ft-base-tools';

const urlInfo = parseUrl('https://example.com:8080/path/to/page?id=123&name=张三#section1');
console.log(urlInfo.protocol); // https:
console.log(urlInfo.host); // example.com:8080
console.log(urlInfo.hostname); // example.com
console.log(urlInfo.port); // 8080
console.log(urlInfo.pathname); // /path/to/page
console.log(urlInfo.search); // ?id=123&name=张三
console.log(urlInfo.hash); // #section1
console.log(urlInfo.params); // { id: '123', name: '张三' }
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
// https://example.com/api/users

console.log(joinUrl('https://example.com/', '/api/', '/users'));
// https://example.com/api/users

console.log(joinUrl('https://example.com', 'api/users', '123'));
// https://example.com/api/users/123
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

## serializeJSON

将 JavaScript 对象序列化为 JSON 字符串。

### 语法

```typescript
function serializeJSON(data: any): string
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| data | any | 要序列化的数据 |

### 返回值

返回序列化后的 JSON 字符串。

### 示例

```javascript
import { serializeJSON } from 'ft-base-tools';

const data = {
  name: '张三',
  age: 30,
  hobbies: ['读书', '旅游'],
  address: {
    city: '北京',
    street: '朝阳区'
  }
};

const jsonString = serializeJSON(data);
console.log(jsonString);
// {"name":"张三","age":30,"hobbies":["读书","旅游"],"address":{"city":"北京","street":"朝阳区"}}
```

## parseJSON

将 JSON 字符串解析为 JavaScript 对象。

### 语法

```typescript
function parseJSON<T = any>(jsonString: string, defaultValue?: T): T
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| jsonString | string | 要解析的 JSON 字符串 |
| defaultValue | T | 可选。解析失败时返回的默认值 |

### 返回值

返回解析后的 JavaScript 对象，解析失败且未提供默认值时抛出异常。

### 示例

```javascript
import { parseJSON } from 'ft-base-tools';

// 有效的 JSON 字符串
const jsonString = '{"name":"张三","age":30,"hobbies":["读书","旅游"]}';
const data = parseJSON(jsonString);
console.log(data.name); // 张三
console.log(data.hobbies[0]); // 读书

// 无效的 JSON 字符串，使用默认值
const invalidJson = '{name:"张三"}'; // 缺少引号
const defaultData = { name: '默认名称', age: 0 };
const result = parseJSON(invalidJson, defaultData);
console.log(result.name); // 默认名称
```

## fetchJsonp

发送 JSONP 请求。

### 语法

```typescript
function fetchJsonp<T = any>(
  url: string,
  options?: {
    callbackParam?: string;
    callbackName?: string;
    timeout?: number;
    params?: Record<string, string | number | boolean>;
  }
): Promise<T>
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| url | string | 请求 URL |
| options | object | 可选。请求选项 |
| options.callbackParam | string | 可选。回调参数名，默认为 'callback' |
| options.callbackName | string | 可选。回调函数名，默认自动生成 |
| options.timeout | number | 可选。请求超时时间（毫秒），默认为 10000 |
| options.params | Record<string, string \| number \| boolean> | 可选。额外的查询参数 |

### 返回值

返回一个 Promise，解析为响应数据。

### 示例

```javascript
import { fetchJsonp } from 'ft-base-tools';

// 基本用法
fetchJsonp('https://api.example.com/data')
  .then(data => console.log(data))
  .catch(error => console.error(error));

// 自定义选项
fetchJsonp('https://api.example.com/data', {
  callbackParam: 'jsonp',
  timeout: 5000,
  params: { id: 123 }
})
  .then(data => console.log(data))
  .catch(error => console.error(error));
```

## download

下载文件。

### 语法

```typescript
function download(
  content: Blob | string | ArrayBuffer,
  filename: string,
  options?: {
    mimeType?: string;
  }
): void
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| content | Blob \| string \| ArrayBuffer | 文件内容 |
| filename | string | 文件名 |
| options | object | 可选。下载选项 |
| options.mimeType | string | 可选。MIME 类型，默认根据内容类型自动判断 |

### 示例

```javascript
import { download } from 'ft-base-tools';

// 下载文本文件
download('Hello, World!', 'hello.txt', { mimeType: 'text/plain' });

// 下载 JSON 文件
const data = { name: '张三', age: 30 };
download(JSON.stringify(data, null, 2), 'data.json', { mimeType: 'application/json' });

// 下载 Blob
fetch('https://example.com/image.jpg')
  .then(response => response.blob())
  .then(blob => {
    download(blob, 'image.jpg');
  });
```

## downloadUrl

从 URL 下载文件。

### 语法

```typescript
function downloadUrl(
  url: string,
  filename?: string,
  options?: {
    method?: 'GET' | 'POST';
    headers?: Record<string, string>;
    data?: any;
  }
): Promise<void>
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| url | string | 文件 URL |
| filename | string | 可选。文件名，默认从 URL 或响应头中获取 |
| options | object | 可选。请求选项 |
| options.method | 'GET' \| 'POST' | 可选。HTTP 方法，默认为 'GET' |
| options.headers | Record<string, string> | 可选。请求头 |
| options.data | any | 可选。请求体数据，仅在 POST 请求时有效 |

### 返回值

返回一个 Promise，下载完成后解析。

### 示例

```javascript
import { downloadUrl } from 'ft-base-tools';

// 下载文件
downloadUrl('https://example.com/files/document.pdf')
  .then(() => console.log('下载完成'))
  .catch(error => console.error('下载失败', error));

// 指定文件名
downloadUrl('https://example.com/files/document.pdf', '我的文档.pdf')
  .then(() => console.log('下载完成'))
  .catch(error => console.error('下载失败', error));

// 带认证的下载
downloadUrl('https://api.example.com/files/document.pdf', 'document.pdf', {
  headers: {
    'Authorization': 'Bearer token123'
  }
})
  .then(() => console.log('下载完成'))
  .catch(error => console.error('下载失败', error));
``` 