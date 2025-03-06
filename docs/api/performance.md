# 性能工具

性能工具提供了一系列用于优化和监控应用性能的实用函数。

## debounce

创建一个防抖函数，延迟调用函数直到上一次调用后的指定时间已经过去。

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
| func | T | 要防抖的函数 |
| wait | number | 延迟的毫秒数 |
| options | object | 可选。配置选项 |
| options.leading | boolean | 可选。是否在延迟开始前调用函数，默认为 false |
| options.trailing | boolean | 可选。是否在延迟结束后调用函数，默认为 true |
| options.maxWait | number | 可选。最大等待时间，超过此时间必定调用一次函数 |

### 返回值

返回新的防抖函数，该函数还具有 `cancel` 和 `flush` 方法。

### 示例

```javascript
import { debounce } from 'ft-base-tools';

// 基本用法
const debouncedSave = debounce(() => {
  console.log('保存数据');
  saveToServer();
}, 500);

// 在输入框值变化时调用
inputElement.addEventListener('input', debouncedSave);

// 带选项的用法
const debouncedSearch = debounce(searchFunction, 300, {
  leading: true,  // 立即执行第一次调用
  trailing: true, // 延迟结束后也执行
  maxWait: 1000   // 最多等待1秒
});

// 取消防抖
debouncedSearch.cancel();

// 立即调用
debouncedSearch.flush();
```

## throttle

创建一个节流函数，限制函数在一段时间内最多执行一次。

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
| func | T | 要节流的函数 |
| wait | number | 限制的毫秒数 |
| options | object | 可选。配置选项 |
| options.leading | boolean | 可选。是否在节流开始前调用函数，默认为 true |
| options.trailing | boolean | 可选。是否在节流结束后调用函数，默认为 true |

### 返回值

返回新的节流函数，该函数还具有 `cancel` 和 `flush` 方法。

### 示例

```javascript
import { throttle } from 'ft-base-tools';

// 基本用法
const throttledScroll = throttle(() => {
  console.log('滚动事件处理');
  updateScrollIndicator();
}, 100);

// 在滚动时调用
window.addEventListener('scroll', throttledScroll);

// 带选项的用法
const throttledResize = throttle(resizeHandler, 200, {
  leading: false,  // 不立即执行第一次调用
  trailing: true   // 节流结束后执行最后一次调用
});

// 取消节流
throttledResize.cancel();

// 立即调用
throttledResize.flush();
```

## memoize

创建一个会缓存结果的函数，避免重复计算。

### 语法

```typescript
function memoize<T extends (...args: any[]) => any>(
  func: T,
  options?: {
    resolver?: (...args: Parameters<T>) => string;
    maxSize?: number;
    ttl?: number;
  }
): T & { cache: Map<string, any>; clear: () => void }
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| func | T | 要缓存结果的函数 |
| options | object | 可选。配置选项 |
| options.resolver | (...args: Parameters<T>) => string | 可选。自定义参数解析器，用于生成缓存键 |
| options.maxSize | number | 可选。缓存的最大条目数 |
| options.ttl | number | 可选。缓存条目的生存时间（毫秒） |

### 返回值

返回新的带缓存的函数，该函数还具有 `cache` 属性和 `clear` 方法。

### 示例

```javascript
import { memoize } from 'ft-base-tools';

// 基本用法
const fibonacci = memoize((n) => {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
});

console.log(fibonacci(40)); // 快速计算，因为中间结果被缓存

// 自定义解析器
const getUser = memoize(
  (id, includeDetails) => fetchUserFromAPI(id, includeDetails),
  {
    resolver: (id, includeDetails) => `${id}-${includeDetails}`,
    maxSize: 100, // 最多缓存100个用户
    ttl: 60000    // 缓存1分钟
  }
);

// 清除缓存
getUser.clear();

// 访问缓存
console.log(getUser.cache.size); // 缓存中的条目数
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
| func | T | 要包装的函数 |

### 返回值

返回新的函数，该函数最多只会被调用一次。

### 示例

```javascript
import { once } from 'ft-base-tools';

// 基本用法
const initialize = once(() => {
  console.log('初始化应用');
  setupApp();
});

// 多次调用，但只会执行一次
initialize();
initialize(); // 不会执行
initialize(); // 不会执行
```

## delay

延迟执行函数。

### 语法

```typescript
function delay<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  ...args: Parameters<T>
): Promise<ReturnType<T>>
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| func | T | 要延迟执行的函数 |
| wait | number | 延迟的毫秒数 |
| args | Parameters<T> | 传递给函数的参数 |

### 返回值

返回一个 Promise，解析为函数的返回值。

### 示例

```javascript
import { delay } from 'ft-base-tools';

// 基本用法
delay(() => {
  console.log('3秒后执行');
}, 3000);

// 带参数
delay((name) => {
  console.log(`你好，${name}！`);
  return `问候 ${name}`;
}, 2000, '张三')
  .then(result => {
    console.log(result); // "问候 张三"
  });

// 异步函数
async function example() {
  console.log('开始');
  await delay(() => {
    console.log('2秒后');
  }, 2000);
  console.log('结束');
}
```

## measure

测量函数执行时间。

### 语法

```typescript
function measure<T extends (...args: any[]) => any>(
  func: T,
  options?: {
    name?: string;
    callback?: (duration: number, result: ReturnType<T>, ...args: Parameters<T>) => void;
  }
): T
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| func | T | 要测量的函数 |
| options | object | 可选。配置选项 |
| options.name | string | 可选。测量名称，用于日志输出 |
| options.callback | function | 可选。测量完成后的回调函数 |

### 返回值

返回包装后的函数，执行时会测量时间。

### 示例

```javascript
import { measure } from 'ft-base-tools';

// 基本用法
const measuredSort = measure(sortArray, {
  name: '数组排序',
  callback: (duration) => {
    console.log(`排序耗时: ${duration}ms`);
  }
});

// 调用函数
const sortedArray = measuredSort(largeArray);

// 异步函数测量
const measuredFetch = measure(async (url) => {
  const response = await fetch(url);
  return response.json();
}, {
  name: 'API请求',
  callback: (duration, result, url) => {
    console.log(`请求 ${url} 耗时: ${duration}ms`);
  }
});

// 调用异步函数
measuredFetch('https://api.example.com/data')
  .then(data => {
    console.log(data);
  });
```

## benchmark

对函数进行基准测试，多次执行并计算平均时间。

### 语法

```typescript
function benchmark<T extends (...args: any[]) => any>(
  func: T,
  options?: {
    iterations?: number;
    warmup?: number;
    args?: Parameters<T>;
  }
): Promise<{
  mean: number;
  min: number;
  max: number;
  total: number;
  iterations: number;
}>
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| func | T | 要测试的函数 |
| options | object | 可选。配置选项 |
| options.iterations | number | 可选。测试迭代次数，默认为 100 |
| options.warmup | number | 可选。预热迭代次数，默认为 5 |
| options.args | Parameters<T> | 可选。传递给函数的参数 |

### 返回值

返回一个 Promise，解析为包含测试结果的对象。

### 示例

```javascript
import { benchmark } from 'ft-base-tools';

// 基本用法
async function runBenchmark() {
  const result = await benchmark(() => {
    // 要测试的代码
    const arr = [];
    for (let i = 0; i < 1000; i++) {
      arr.push(i);
    }
    return arr.reduce((sum, val) => sum + val, 0);
  }, {
    iterations: 1000, // 执行1000次
    warmup: 10        // 预热10次
  });
  
  console.log(`平均执行时间: ${result.mean.toFixed(3)}ms`);
  console.log(`最小执行时间: ${result.min.toFixed(3)}ms`);
  console.log(`最大执行时间: ${result.max.toFixed(3)}ms`);
  console.log(`总执行时间: ${result.total.toFixed(3)}ms`);
  console.log(`迭代次数: ${result.iterations}`);
}

// 带参数的基准测试
async function compareSortAlgorithms() {
  const testArray = Array.from({ length: 10000 }, () => Math.random());
  
  const quickSortResult = await benchmark(quickSort, {
    iterations: 100,
    args: [testArray.slice()]
  });
  
  const mergeSortResult = await benchmark(mergeSort, {
    iterations: 100,
    args: [testArray.slice()]
  });
  
  console.log(`快速排序平均时间: ${quickSortResult.mean.toFixed(3)}ms`);
  console.log(`归并排序平均时间: ${mergeSortResult.mean.toFixed(3)}ms`);
}
```

## profile

创建一个性能分析器，用于测量代码块的执行时间。

### 语法

```typescript
function profile(name?: string): {
  start: (label: string) => void;
  end: (label: string) => number;
  mark: (label: string) => void;
  getTimings: () => Record<string, { start: number; end: number; duration: number }>;
  clear: () => void;
  report: () => void;
}
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| name | string | 可选。分析器名称 |

### 返回值

返回一个性能分析器对象，包含 start、end、mark、getTimings、clear 和 report 方法。

### 示例

```javascript
import { profile } from 'ft-base-tools';

// 创建分析器
const profiler = profile('应用初始化');

// 开始测量
profiler.start('加载配置');
// 加载配置的代码
loadConfig();
profiler.end('加载配置');

// 测量另一个代码块
profiler.start('初始化组件');
// 初始化组件的代码
initComponents();
profiler.end('初始化组件');

// 添加标记点
profiler.mark('用户交互开始');

// 获取所有计时
const timings = profiler.getTimings();
console.log(timings);
/*
{
  '加载配置': { start: 1234567890, end: 1234567900, duration: 10 },
  '初始化组件': { start: 1234567901, end: 1234567930, duration: 29 },
  '用户交互开始': { time: 1234567940 }
}
*/

// 输出报告
profiler.report();
/*
应用初始化性能报告:
- 加载配置: 10ms
- 初始化组件: 29ms
- 标记 - 用户交互开始: 1234567940ms
总计: 39ms
*/

// 清除计时
profiler.clear();
```

## lazyLoad

延迟加载资源，如图片、脚本或组件。

### 语法

```typescript
function lazyLoad<T>(
  loader: () => Promise<T>,
  options?: {
    condition?: () => boolean;
    timeout?: number;
    retry?: number;
    retryDelay?: number;
    onLoad?: (result: T) => void;
    onError?: (error: Error) => void;
  }
): Promise<T>
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| loader | () => Promise<T> | 加载资源的函数 |
| options | object | 可选。配置选项 |
| options.condition | () => boolean | 可选。加载条件，返回 true 时才加载 |
| options.timeout | number | 可选。超时时间（毫秒） |
| options.retry | number | 可选。失败重试次数 |
| options.retryDelay | number | 可选。重试延迟（毫秒） |
| options.onLoad | (result: T) => void | 可选。加载成功回调 |
| options.onError | (error: Error) => void | 可选。加载失败回调 |

### 返回值

返回一个 Promise，解析为加载的资源。

### 示例

```javascript
import { lazyLoad } from 'ft-base-tools';

// 延迟加载图片
function loadImage(src) {
  return lazyLoad(() => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  }, {
    condition: () => isInViewport(placeholderElement),
    retry: 3,
    retryDelay: 1000,
    onLoad: (img) => {
      console.log('图片加载成功', img.src);
      placeholderElement.appendChild(img);
    },
    onError: (error) => {
      console.error('图片加载失败', error);
      placeholderElement.innerHTML = '加载失败';
    }
  });
}

// 延迟加载组件
function loadComponent(name) {
  return lazyLoad(() => {
    switch (name) {
      case 'Chart':
        return import('./components/Chart.js');
      case 'Table':
        return import('./components/Table.js');
      default:
        throw new Error(`未知组件: ${name}`);
    }
  }, {
    timeout: 5000,
    onLoad: (module) => {
      console.log(`组件 ${name} 加载成功`);
    }
  });
}
```

## requestIdleCallback

在浏览器空闲时执行任务，兼容不支持原生 requestIdleCallback 的浏览器。

### 语法

```typescript
function requestIdleCallback(
  callback: (deadline: { timeRemaining: () => number; didTimeout: boolean }) => void,
  options?: {
    timeout?: number;
  }
): number
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| callback | function | 在空闲时执行的回调函数 |
| options | object | 可选。配置选项 |
| options.timeout | number | 可选。超时时间（毫秒） |

### 返回值

返回一个 ID，可用于取消回调。

### 示例

```javascript
import { requestIdleCallback, cancelIdleCallback } from 'ft-base-tools';

// 基本用法
const idleId = requestIdleCallback((deadline) => {
  // 检查还有多少时间可用
  console.log(`剩余时间: ${deadline.timeRemaining()}ms`);
  
  // 如果有足够的时间，执行任务
  if (deadline.timeRemaining() > 5 || deadline.didTimeout) {
    performNonUrgentTask();
  } else {
    // 没有足够的时间，将任务分割或推迟
    scheduleTaskForLater();
  }
}, {
  timeout: 2000 // 最多等待2秒
});

// 取消回调
cancelIdleCallback(idleId);

// 分批处理大量数据
function processBatch(data, batchSize, processItem) {
  let currentIndex = 0;
  
  function processNextBatch() {
    requestIdleCallback((deadline) => {
      // 处理一批数据，直到没有时间或处理完成
      while (currentIndex < data.length && 
             (deadline.timeRemaining() > 0 || deadline.didTimeout)) {
        processItem(data[currentIndex]);
        currentIndex++;
        
        // 如果已处理一批数据，暂停并让出控制权
        if (currentIndex % batchSize === 0) {
          break;
        }
      }
      
      // 如果还有数据，继续处理下一批
      if (currentIndex < data.length) {
        processNextBatch();
      } else {
        console.log('所有数据处理完成');
      }
    });
  }
  
  processNextBatch();
}
```

## cancelIdleCallback

取消先前通过 requestIdleCallback 安排的回调。

### 语法

```typescript
function cancelIdleCallback(id: number): void
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| id | number | 要取消的回调 ID |

### 示例

```javascript
import { requestIdleCallback, cancelIdleCallback } from 'ft-base-tools';

const idleId = requestIdleCallback(() => {
  performNonUrgentTask();
});

// 取消回调
cancelIdleCallback(idleId);
```

## requestAnimationFrame

请求动画帧，兼容不支持原生 requestAnimationFrame 的浏览器。

### 语法

```typescript
function requestAnimationFrame(callback: FrameRequestCallback): number
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| callback | FrameRequestCallback | 在下一次重绘之前调用的函数 |

### 返回值

返回一个 ID，可用于取消请求。

### 示例

```javascript
import { requestAnimationFrame, cancelAnimationFrame } from 'ft-base-tools';

// 基本用法
let position = 0;
let animationId;

function animate() {
  position += 5;
  element.style.transform = `translateX(${position}px)`;
  
  if (position < 500) {
    animationId = requestAnimationFrame(animate);
  }
}

// 开始动画
animationId = requestAnimationFrame(animate);

// 取消动画
cancelAnimationFrame(animationId);

// 平滑滚动
function smoothScroll(targetY, duration) {
  const startY = window.scrollY;
  const distance = targetY - startY;
  const startTime = performance.now();
  
  function step(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeProgress = easeInOutCubic(progress);
    
    window.scrollTo(0, startY + distance * easeProgress);
    
    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }
  
  requestAnimationFrame(step);
}

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
```

## cancelAnimationFrame

取消先前通过 requestAnimationFrame 安排的回调。

### 语法

```typescript
function cancelAnimationFrame(id: number): void
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| id | number | 要取消的请求 ID |

### 示例

```javascript
import { requestAnimationFrame, cancelAnimationFrame } from 'ft-base-tools';

const animationId = requestAnimationFrame(() => {
  updateAnimation();
});

// 取消动画
cancelAnimationFrame(animationId);
``` 