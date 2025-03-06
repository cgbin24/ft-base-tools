# 加密工具

加密工具提供了一系列用于数据加密、解密和哈希计算的实用函数。

## md5

计算字符串的 MD5 哈希值。

### 语法

```typescript
function md5(str: string): string
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| str | string | 要计算哈希值的字符串 |

### 返回值

返回 32 位小写的 MD5 哈希字符串。

### 示例

```javascript
import { md5 } from 'ft-base-tools';

const hash = md5('hello world');
console.log(hash); // 5eb63bbbe01eeed093cb22bb8f5acdc3
```

## sha1

计算字符串的 SHA-1 哈希值。

### 语法

```typescript
function sha1(str: string): string
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| str | string | 要计算哈希值的字符串 |

### 返回值

返回 40 位小写的 SHA-1 哈希字符串。

### 示例

```javascript
import { sha1 } from 'ft-base-tools';

const hash = sha1('hello world');
console.log(hash); // 2aae6c35c94fcfb415dbe95f408b9ce91ee846ed
```

## sha256

计算字符串的 SHA-256 哈希值。

### 语法

```typescript
function sha256(str: string): string
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| str | string | 要计算哈希值的字符串 |

### 返回值

返回 64 位小写的 SHA-256 哈希字符串。

### 示例

```javascript
import { sha256 } from 'ft-base-tools';

const hash = sha256('hello world');
console.log(hash); // b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9
```

## base64Encode

将字符串编码为 Base64 格式。

### 语法

```typescript
function base64Encode(str: string): string
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| str | string | 要编码的字符串 |

### 返回值

返回 Base64 编码后的字符串。

### 示例

```javascript
import { base64Encode } from 'ft-base-tools';

const encoded = base64Encode('hello world');
console.log(encoded); // aGVsbG8gd29ybGQ=
```

## base64Decode

将 Base64 编码的字符串解码为原始字符串。

### 语法

```typescript
function base64Decode(str: string): string
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| str | string | 要解码的 Base64 字符串 |

### 返回值

返回解码后的原始字符串。

### 示例

```javascript
import { base64Decode } from 'ft-base-tools';

const decoded = base64Decode('aGVsbG8gd29ybGQ=');
console.log(decoded); // hello world
```

## aesEncrypt

使用 AES 算法加密字符串。

### 语法

```typescript
function aesEncrypt(
  data: string,
  key: string,
  options?: {
    mode?: 'CBC' | 'ECB' | 'CFB' | 'OFB' | 'CTR';
    iv?: string;
    padding?: 'Pkcs7' | 'NoPadding' | 'ZeroPadding';
    output?: 'base64' | 'hex';
  }
): string
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| data | string | 要加密的数据 |
| key | string | 加密密钥 |
| options | object | 可选。加密选项 |
| options.mode | string | 可选。加密模式，默认为 'CBC' |
| options.iv | string | 可选。初始化向量，在 CBC、CFB、OFB、CTR 模式下需要 |
| options.padding | string | 可选。填充方式，默认为 'Pkcs7' |
| options.output | string | 可选。输出格式，默认为 'base64' |

### 返回值

返回加密后的字符串，格式由 options.output 决定。

### 示例

```javascript
import { aesEncrypt } from 'ft-base-tools';

// 基本用法
const encrypted = aesEncrypt('hello world', 'a16bytesecretkey');
console.log(encrypted); // 输出 base64 编码的加密结果

// 指定选项
const encryptedHex = aesEncrypt('hello world', 'a16bytesecretkey', {
  mode: 'CBC',
  iv: 'a16bytesecretiv.',
  padding: 'Pkcs7',
  output: 'hex'
});
console.log(encryptedHex); // 输出十六进制编码的加密结果
```

## aesDecrypt

使用 AES 算法解密字符串。

### 语法

```typescript
function aesDecrypt(
  encryptedData: string,
  key: string,
  options?: {
    mode?: 'CBC' | 'ECB' | 'CFB' | 'OFB' | 'CTR';
    iv?: string;
    padding?: 'Pkcs7' | 'NoPadding' | 'ZeroPadding';
    input?: 'base64' | 'hex';
  }
): string
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| encryptedData | string | 要解密的数据 |
| key | string | 解密密钥，必须与加密时使用的密钥相同 |
| options | object | 可选。解密选项 |
| options.mode | string | 可选。解密模式，默认为 'CBC' |
| options.iv | string | 可选。初始化向量，在 CBC、CFB、OFB、CTR 模式下需要 |
| options.padding | string | 可选。填充方式，默认为 'Pkcs7' |
| options.input | string | 可选。输入格式，默认为 'base64' |

### 返回值

返回解密后的原始字符串。

### 示例

```javascript
import { aesEncrypt, aesDecrypt } from 'ft-base-tools';

// 加密
const encrypted = aesEncrypt('hello world', 'a16bytesecretkey');

// 解密
const decrypted = aesDecrypt(encrypted, 'a16bytesecretkey');
console.log(decrypted); // hello world

// 使用十六进制格式
const encryptedHex = aesEncrypt('hello world', 'a16bytesecretkey', {
  output: 'hex'
});

const decryptedFromHex = aesDecrypt(encryptedHex, 'a16bytesecretkey', {
  input: 'hex'
});
console.log(decryptedFromHex); // hello world
```

## rsaEncrypt

使用 RSA 公钥加密数据。

### 语法

```typescript
function rsaEncrypt(
  data: string,
  publicKey: string,
  options?: {
    padding?: 'PKCS1Padding' | 'NoPadding' | 'OAEPPadding';
    output?: 'base64' | 'hex';
  }
): string
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| data | string | 要加密的数据 |
| publicKey | string | RSA 公钥，PEM 格式 |
| options | object | 可选。加密选项 |
| options.padding | string | 可选。填充方式，默认为 'PKCS1Padding' |
| options.output | string | 可选。输出格式，默认为 'base64' |

### 返回值

返回加密后的字符串，格式由 options.output 决定。

### 示例

```javascript
import { rsaEncrypt } from 'ft-base-tools';

// RSA 公钥（示例）
const publicKey = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCJxJ9MV8aYkJ5A5Jsc5z8Mbvn7
rOkRFUq4jJ5qk7pZfAYQl5UOgCn5NLjQkV8x5JQa9ZyPm5CzKBdA7v0JYj8jKUFh
3XY5+uLv9VRBQnL4DQrAGQvHJvUUv4aPJFaa5W0YS1J5JkVJDQjI4XJDPIHgJn5L
CyEJzz8J9q2RG5XnpQIDAQAB
-----END PUBLIC KEY-----`;

// 加密
const encrypted = rsaEncrypt('hello world', publicKey);
console.log(encrypted); // 输出 base64 编码的加密结果

// 指定选项
const encryptedHex = rsaEncrypt('hello world', publicKey, {
  padding: 'PKCS1Padding',
  output: 'hex'
});
console.log(encryptedHex); // 输出十六进制编码的加密结果
```

## rsaDecrypt

使用 RSA 私钥解密数据。

### 语法

```typescript
function rsaDecrypt(
  encryptedData: string,
  privateKey: string,
  options?: {
    padding?: 'PKCS1Padding' | 'NoPadding' | 'OAEPPadding';
    input?: 'base64' | 'hex';
  }
): string
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| encryptedData | string | 要解密的数据 |
| privateKey | string | RSA 私钥，PEM 格式 |
| options | object | 可选。解密选项 |
| options.padding | string | 可选。填充方式，默认为 'PKCS1Padding' |
| options.input | string | 可选。输入格式，默认为 'base64' |

### 返回值

返回解密后的原始字符串。

### 示例

```javascript
import { rsaEncrypt, rsaDecrypt } from 'ft-base-tools';

// RSA 密钥对（示例）
const publicKey = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCJxJ9MV8aYkJ5A5Jsc5z8Mbvn7
rOkRFUq4jJ5qk7pZfAYQl5UOgCn5NLjQkV8x5JQa9ZyPm5CzKBdA7v0JYj8jKUFh
3XY5+uLv9VRBQnL4DQrAGQvHJvUUv4aPJFaa5W0YS1J5JkVJDQjI4XJDPIHgJn5L
CyEJzz8J9q2RG5XnpQIDAQAB
-----END PUBLIC KEY-----`;

const privateKey = `-----BEGIN PRIVATE KEY-----
MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBAInEn0xXxpiQnkDk
mxznPwxu+fus6REVSriMnmqTull8BhCXlQ6AKfk0uNCRXzHklBr1nI+bkLMoF0Du
/QliPyMpQWHddjn64u/1VEFCcvgNCsAZC8cm9RS/ho8kVprlbRhLUnkmRUkNCMjh
ckM8geAmfksLIQnPPwn2rZEbleelAgMBAAECgYAXQM9dgBhEkBXhxI3KZbK0fAKS
3yrjzZzYATYwl9ZCc5TLnKp7FiGrZY7s1Gk5jzOk7r1+MOfSkn+xVPPLOOyT3CYI
kXfEPmWaEDXYPtILXQa5AOGJmVTvDv8DhKy+JRZvYf3eUUPjAKHcHZ0S6DHJICKI
jO4jKJMxuOZi/lj8QQJBAMCkKVeik9wXEIGX8Xv/X8kHKYYwkbwOaGJk9xO+jM0G
Qnc9pvlJ+dBJP1j9cBJ7yUkWQNbcxKHLLWvLxz6Ld+UCQQCz/l+CzKUQ6htuaXBj
C9E/nVKONwQFH5Z8TvnYIJ3MYnuFUlgJGpOyB6pn/oPMNsgUCZz7RpQaqTe3J+xZ
+JbhAkEAiZ/xQgQ5SXHh+xOQJ6TcAQIDx5dYG9YSsjQyEm4fGAg+vGySV5JH5J/1
iFQGpjFB1+7KPdHLiNXiKrwZRvvM9QJAQmYxLUE796AYy0wWq+nKvbR8DAPKqxQr
UpXWy1wwQCBZ8ZNQWJ8cQqGCD6zqm8Z3qMOCUqXHSrJRY0HnYLGBAQJBAIqXbG9/
W47uLx4S6z3aSVu9X1jdOqHjX+KFaLO8FfLJpYbpK5f/9Y9zKDvZJ3qP6WLk4M8e
xq6pGXKIZQLtXuU=
-----END PRIVATE KEY-----`;

// 加密
const encrypted = rsaEncrypt('hello world', publicKey);

// 解密
const decrypted = rsaDecrypt(encrypted, privateKey);
console.log(decrypted); // hello world
```

## hmacSHA256

使用 HMAC-SHA256 算法计算消息认证码。

### 语法

```typescript
function hmacSHA256(
  message: string,
  key: string,
  options?: {
    output?: 'base64' | 'hex';
  }
): string
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| message | string | 要计算 HMAC 的消息 |
| key | string | 密钥 |
| options | object | 可选。计算选项 |
| options.output | string | 可选。输出格式，默认为 'hex' |

### 返回值

返回 HMAC-SHA256 计算结果，格式由 options.output 决定。

### 示例

```javascript
import { hmacSHA256 } from 'ft-base-tools';

const hmac = hmacSHA256('hello world', 'secret-key');
console.log(hmac); // 输出十六进制编码的 HMAC 结果

const hmacBase64 = hmacSHA256('hello world', 'secret-key', { output: 'base64' });
console.log(hmacBase64); // 输出 base64 编码的 HMAC 结果
```