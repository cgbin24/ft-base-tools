# 性能工具

性能工具提供了一系列用于优化代码执行效率和用户体验的实用函数。

## debounce

创建一个防抖函数，延迟调用函数直到上次调用后的指定时间已经过去。

### 语法

```typescript
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  options?: {
    leading?: boolean;
    trailing?: boolean;
    maxWait?: number;
  }
): T & { cancel: () => void; flush: () => void }
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| func | Function | 要防抖的函数 |
| wait | number | 需要延迟的毫秒数 |
| options | object | 可选。配置选项 |
| options.leading | boolean | 可选。指定在延迟开始前调用。默认为 false |
| options.trailing | boolean | 可选。指定在延迟结束后调用。默认为 true |
| options.maxWait | number | 可选。最大等待时间，超过这个时间函数会被调用 |

### 返回值

返回新的防抖函数，该函数具有 `cancel` 和 `flush` 方法。

### 示例

```javascript
import { debounce } from 'ft-base-tools';

// 基本用法
const debouncedSave = debounce(() => {
  console.log('保存数据');
}, 300);

// 在用户输入时调用
document.querySelector('input').addEventListener('input', debouncedSave);
// 只有当用户停止输入 300 毫秒后才会执行保存操作

// 带选项的用法
const debouncedResize = debounce(() => {
  console.log('调整大小');
}, 200, { leading: true, trailing: true, maxWait: 1000 });

window.addEventListener('resize', debouncedResize);
// 窗口大小改变时立即执行一次，然后等待 200 毫秒后再次执行
// 如果持续调整大小超过 1000 毫秒，则强制执行一次

// 取消防抖
debouncedSave.cancel();

// 立即执行
debouncedSave.flush();
```

## throttle

创建一个节流函数，限制函数在指定时间内最多执行一次。

### 语法

```typescript
function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  options?: {
    leading?: boolean;
    trailing?: boolean;
  }
): T & { cancel: () => void; flush: () => void }
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| func | Function | 要节流的函数 |
| wait | number | 需要节流的毫秒数 |
| options | object | 可选。配置选项 |
| options.leading | boolean | 可选。指定在节流开始前调用。默认为 true |
| options.trailing | boolean | 可选。指定在节流结束后调用。默认为 true |

### 返回值

返回新的节流函数，该函数具有 `cancel` 和 `flush` 方法。

### 示例

```javascript
import { throttle } from 'ft-base-tools';

// 基本用法
const throttledScroll = throttle(() => {
  console.log('滚动事件');
}, 100);

window.addEventListener('scroll', throttledScroll);
// 滚动事件最多每 100 毫秒触发一次

// 带选项的用法
window.addEventListener('resize', throttle(() => {
  // 这里是节流函数的回调
  console.log('窗口大小改变了！');
}, 500));
// 每 500 毫秒最多执行一次回调函数
```

## memoize

创建一个会缓存结果的函数，避免重复计算。

### 语法

```typescript
function memoize<T extends (...args: any[]) => any>(
  func: T,
  resolver?: (...args: Parameters<T>) => any
): T & { cache: Map<any, any>; clear: () => void }
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| func | Function | 要缓存结果的函数 |
| resolver | Function | 可选。自定义缓存键的解析函数 |

### 返回值

返回新的记忆化函数，该函数具有 `cache` 属性和 `clear` 方法。

### 示例

```javascript
import { memoize } from 'ft-base-tools';

// 基本用法
const fibonacci = memoize((n) => {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
});

console.log(fibonacci(40)); // 快速计算，因为中间结果被缓存

// 自定义缓存键
const getUser = memoize(
  (id, force = false) => {
    return fetch(`/api/users/${id}`).then(res => res.json());
  },
  (id) => id // 只使用 id 作为缓存键，忽略 force 参数
);

// 清除缓存
fibonacci.clear();
console.log(fibonacci.cache); // 空的 Map
```

## once

创建一个只执行一次的函数。

### 语法

```typescript
function once<T extends (...args: any[]) => any>(func: T): T
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| func | Function | 要包装的函数 |

### 返回值

返回新的函数，该函数最多只会被调用一次。

### 示例

```javascript
import { once } from 'ft-base-tools';

// 基本用法
const initialize = once(() => {
  console.log('初始化应用');
  // 执行初始化逻辑
});

// 多次调用，但只会执行一次
initialize();
initialize();
initialize();
// 控制台只会输出一次 "初始化应用"
```

## delay

延迟执行函数。

### 语法

```typescript
function delay(
  func: (...args: any[]) => any,
  wait: number,
  ...args: any[]
): number
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| func | Function | 要延迟的函数 |
| wait | number | 延迟的毫秒数 |
| ...args | any[] | 传递给函数的参数 |

### 返回值

返回定时器 ID，可用于取消延迟执行。

### 示例

```javascript
import { delay } from 'ft-base-tools';

// 基本用法
const timerId = delay(() => {
  console.log('3 秒后执行');
}, 3000);

// 带参数的用法
delay((name) => {
  console.log(`你好，${name}！`);
}, 1000, '张三');
// 1 秒后输出 "你好，张三！"

// 取消延迟执行
clearTimeout(timerId);
```

## defer

将函数推迟到当前调用栈清空后执行。

### 语法

```typescript
function defer(
  func: (...args: any[]) => any,
  ...args: any[]
): number
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| func | Function | 要推迟的函数 |
| ...args | any[] | 传递给函数的参数 |

### 返回值

返回定时器 ID，可用于取消推迟执行。

### 示例

```javascript
import { defer } from 'ft-base-tools';

// 基本用法
const timerId = defer(() => {
  console.log('当前调用栈清空后执行');
});

// 带参数的用法
defer((a, b) => {
  console.log(a + b);
}, 3, 4);
// 输出 7

// 取消推迟执行
clearTimeout(timerId);
```

## raf

使用 requestAnimationFrame 执行函数。

### 语法

```typescript
function raf(callback: FrameRequestCallback): number
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| callback | FrameRequestCallback | 在下一次重绘之前调用的函数 |

### 返回值

返回请求 ID，可用于取消请求。

### 示例

```javascript
import { raf } from 'ft-base-tools';

// 基本用法
const requestId = raf((timestamp) => {
  console.log(`当前时间戳: ${timestamp}`);
  // 执行动画逻辑
});

// 取消请求
cancelAnimationFrame(requestId);
```

## caf

取消之前的 requestAnimationFrame 请求。

### 语法

```typescript
function caf(id: number): void
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| id | number | 要取消的请求 ID |

### 示例

```javascript
import { raf, caf } from 'ft-base-tools';

// 创建请求
const requestId = raf(() => {
  console.log('动画帧');
});

// 取消请求
caf(requestId);
```

## nextTick

在下一个微任务中执行回调函数。

### 语法

```typescript
function nextTick(callback: (...args: any[]) => any): void
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| callback | Function | 要执行的回调函数 |

### 示例

```javascript
import { nextTick } from 'ft-base-tools';

// 基本用法
console.log('开始');

nextTick(() => {
  console.log('在微任务中执行');
});

console.log('结束');

// 输出顺序:
// "开始"
// "结束"
// "在微任务中执行"
```

## measureTime

测量函数执行时间。

### 语法

```typescript
function measureTime<T>(
  fn: () => T,
  options?: {
    label?: string;
    console?: boolean;
  }
): { result: T; time: number }
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| fn | Function | 要测量的函数 |
| options | object | 可选。配置选项 |
| options.label | string | 可选。输出标签 |
| options.console | boolean | 可选。是否在控制台输出结果。默认为 true |

### 返回值

返回一个对象，包含函数的返回值和执行时间（毫秒）。

### 示例

```javascript
import { measureTime } from 'ft-base-tools';

// 基本用法
const { result, time } = measureTime(() => {
  let sum = 0;
  for (let i = 0; i < 1000000; i++) {
    sum += i;
  }
  return sum;
});

console.log(`结果: ${result}, 耗时: ${time}ms`);

// 带选项的用法
measureTime(() => {
  // 执行一些耗时操作
  return '完成';
}, {
  label: '复杂计算',
  console: true
});
// 控制台输出: "复杂计算: XXXms"
```

## batchProcessing

分批处理大量数据，避免阻塞主线程。

### 语法

```typescript
function batchProcessing<T, R>(
  items: T[],
  processor: (item: T, index: number) => R,
  options?: {
    batchSize?: number;
    delay?: number;
    onBatchComplete?: (results: R[], batchIndex: number) => void;
    onComplete?: (allResults: R[]) => void;
  }
): { cancel: () => void }
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| items | T[] | 要处理的数据项数组 |
| processor | Function | 处理每个数据项的函数 |
| options | object | 可选。配置选项 |
| options.batchSize | number | 可选。每批处理的数据项数量。默认为 100 |
| options.delay | number | 可选。批次之间的延迟毫秒数。默认为 0 |
| options.onBatchComplete | Function | 可选。每批处理完成的回调 |
| options.onComplete | Function | 可选。所有数据处理完成的回调 |

### 返回值

返回一个对象，包含 `cancel` 方法用于取消处理。

### 示例

```javascript
import { batchProcessing } from 'ft-base-tools';

// 基本用法
const items = Array.from({ length: 10000 }, (_, i) => i);

const { cancel } = batchProcessing(
  items,
  (item) => item * 2,
  {
    batchSize: 500,
    delay: 10,
    onBatchComplete: (results, batchIndex) => {
      console.log(`完成批次 ${batchIndex + 1}`);
    },
    onComplete: (allResults) => {
      console.log(`所有 ${allResults.length} 项处理完成`);
    }
  }
);

// 取消处理
// cancel();
```

## idleCallback

在浏览器空闲时执行低优先级任务。

### 语法

```typescript
function idleCallback(
  callback: (deadline: { timeRemaining: () => number; didTimeout: boolean }) => void,
  options?: { timeout?: number }
): number
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| callback | Function | 在空闲时期被调用的函数 |
| options | object | 可选。配置选项 |
| options.timeout | number | 可选。超时时间，超过这个时间任务会被强制执行 |

### 返回值

返回请求 ID，可用于取消请求。

### 示例

```javascript
import { idleCallback, cancelIdleCallback } from 'ft-base-tools';

// 基本用法
const id = idleCallback((deadline) => {
  // 检查还剩多少时间
  console.log(`剩余时间: ${deadline.timeRemaining()}ms`);
  
  // 执行低优先级任务
  while (deadline.timeRemaining() > 0 && tasksRemaining()) {
    doTask();
  }
  
  // 如果还有任务，再次请求
  if (tasksRemaining()) {
    idleCallback(callback);
  }
}, { timeout: 2000 });

// 取消请求
cancelIdleCallback(id);

// 辅助函数
function tasksRemaining() {
  // 检查是否还有任务
  return true;
}

function doTask() {
  // 执行一个小任务
}
```

## cancelIdleCallback

取消之前的 idleCallback 请求。

### 语法

```typescript
function cancelIdleCallback(id: number): void
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| id | number | 要取消的请求 ID |

### 示例

```javascript
import { idleCallback, cancelIdleCallback } from 'ft-base-tools';

// 创建请求
const id = idleCallback(() => {
  console.log('浏览器空闲时执行');
});

// 取消请求
cancelIdleCallback(id);
```

## asyncPool

限制并发异步任务数量。

### 语法

```typescript
function asyncPool<T, R>(
  concurrency: number,
  items: T[],
  iteratorFn: (item: T, index: number) => Promise<R>
): Promise<R[]>
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| concurrency | number | 同时运行的任务数量上限 |
| items | T[] | 要处理的数据项数组 |
| iteratorFn | Function | 处理每个数据项的异步函数 |

### 返回值

返回一个 Promise，解析为所有任务的结果数组。

### 示例

```javascript
import { asyncPool } from 'ft-base-tools';

// 基本用法
async function fetchUserData(id) {
  const response = await fetch(`https://api.example.com/users/${id}`);
  return response.json();
}

const userIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// 最多同时运行 3 个请求
asyncPool(3, userIds, fetchUserData)
  .then(users => {
    console.log(`获取了 ${users.length} 个用户的数据`);
  })
  .catch(error => {
    console.error('获取用户数据时出错:', error);
  });
```

## retry

自动重试失败的异步操作。

### 语法

```typescript
function retry<T>(
  fn: () => Promise<T>,
  options?: {
    retries?: number;
    interval?: number;
    exponential?: boolean;
    factor?: number;
    onRetry?: (error: Error, attempt: number) => void;
  }
): Promise<T>
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| fn | Function | 要重试的异步函数 |
| options | object | 可选。配置选项 |
| options.retries | number | 可选。最大重试次数。默认为 3 |
| options.interval | number | 可选。重试间隔（毫秒）。默认为 1000 |
| options.exponential | boolean | 可选。是否使用指数退避策略。默认为 true |
| options.factor | number | 可选。指数退避因子。默认为 2 |
| options.onRetry | Function | 可选。每次重试前调用的函数 |

### 返回值

返回一个 Promise，解析为异步操作的结果，或在达到最大重试次数后拒绝。

### 示例

```javascript
import { retry } from 'ft-base-tools';

// 基本用法
async function fetchData() {
  // 模拟可能失败的请求
  const response = await fetch('https://api.example.com/data');
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}

// 最多重试 5 次，每次间隔 2 秒
retry(fetchData, {
  retries: 5,
  interval: 2000,
  onRetry: (error, attempt) => {
    console.log(`尝试 ${attempt}: 失败 - ${error.message}`);
  }
})
  .then(data => {
    console.log('成功获取数据:', data);
  })
  .catch(error => {
    console.error('所有重试都失败了:', error);
  });

// 使用指数退避策略
retry(fetchData, {
  retries: 4,
  interval: 1000,
  exponential: true,
  factor: 3
});
// 重试间隔: 1s, 3s, 9s, 27s
``` 