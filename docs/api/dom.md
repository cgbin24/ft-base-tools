# DOM 工具

DOM 工具提供了一系列用于操作和查询 DOM 元素的实用函数。

## $

选择单个 DOM 元素。

### 语法

```typescript
function $(selector: string, context?: Document | Element): Element | null
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| selector | string | CSS 选择器 |
| context | Document \| Element | 可选。查询上下文，默认为 document |

### 返回值

返回匹配选择器的第一个元素，如果没有匹配项则返回 null。

### 示例

```javascript
import { $ } from 'ft-base-tools';

// 获取 ID 为 "app" 的元素
const app = $('#app');

// 在特定上下文中查询
const container = $('.container');
const button = $('button', container);
```

## $$

选择多个 DOM 元素。

### 语法

```typescript
function $$(selector: string, context?: Document | Element): Element[]
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| selector | string | CSS 选择器 |
| context | Document \| Element | 可选。查询上下文，默认为 document |

### 返回值

返回匹配选择器的所有元素组成的数组。

### 示例

```javascript
import { $$ } from 'ft-base-tools';

// 获取所有段落元素
const paragraphs = $$('p');

// 在特定上下文中查询
const container = $('.container');
const buttons = $$('button', container);

// 遍历元素
buttons.forEach(button => {
  button.classList.add('btn-primary');
});
```

## addClass

为元素添加一个或多个类名。

### 语法

```typescript
function addClass(element: Element, className: string): void
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| element | Element | 目标元素 |
| className | string | 要添加的类名，多个类名用空格分隔 |

### 示例

```javascript
import { $, addClass } from 'ft-base-tools';

const button = $('#submit-btn');
addClass(button, 'btn-primary');

// 添加多个类名
addClass(button, 'btn-large btn-animated');
```

## removeClass

从元素中移除一个或多个类名。

### 语法

```typescript
function removeClass(element: Element, className: string): void
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| element | Element | 目标元素 |
| className | string | 要移除的类名，多个类名用空格分隔 |

### 示例

```javascript
import { $, removeClass } from 'ft-base-tools';

const button = $('#submit-btn');
removeClass(button, 'btn-disabled');

// 移除多个类名
removeClass(button, 'btn-large btn-animated');
```

## toggleClass

切换元素的类名。

### 语法

```typescript
function toggleClass(element: Element, className: string): void
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| element | Element | 目标元素 |
| className | string | 要切换的类名 |

### 示例

```javascript
import { $, toggleClass } from 'ft-base-tools';

const button = $('#toggle-btn');
toggleClass(button, 'active');

// 点击按钮时切换类名
button.addEventListener('click', () => {
  toggleClass(button, 'active');
});
```

## hasClass

检查元素是否包含指定的类名。

### 语法

```typescript
function hasClass(element: Element, className: string): boolean
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| element | Element | 目标元素 |
| className | string | 要检查的类名 |

### 返回值

如果元素包含指定的类名，返回 `true`，否则返回 `false`。

### 示例

```javascript
import { $, hasClass } from 'ft-base-tools';

const button = $('#submit-btn');
if (hasClass(button, 'btn-disabled')) {
  console.log('按钮已禁用');
} else {
  console.log('按钮可用');
}
```

## css

获取或设置元素的样式。

### 语法

```typescript
function css(element: Element, property: string): string;
function css(element: Element, property: string, value: string | number): void;
function css(element: Element, properties: Record<string, string | number>): void;
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| element | Element | 目标元素 |
| property | string | CSS 属性名 |
| value | string \| number | 可选。CSS 属性值 |
| properties | Record<string, string \| number> | CSS 属性对象 |

### 返回值

当只提供属性名时，返回对应的属性值；设置属性时无返回值。

### 示例

```javascript
import { $, css } from 'ft-base-tools';

const box = $('#box');

// 获取样式
const width = css(box, 'width');
console.log(`宽度: ${width}`);

// 设置单个样式
css(box, 'color', 'red');
css(box, 'fontSize', 16); // 数字会自动添加 'px'

// 设置多个样式
css(box, {
  backgroundColor: '#f0f0f0',
  padding: '10px',
  borderRadius: '4px'
});
```

## attr

获取或设置元素的属性。

### 语法

```typescript
function attr(element: Element, name: string): string | null;
function attr(element: Element, name: string, value: string): void;
function attr(element: Element, attributes: Record<string, string>): void;
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| element | Element | 目标元素 |
| name | string | 属性名 |
| value | string | 可选。属性值 |
| attributes | Record<string, string> | 属性对象 |

### 返回值

当只提供属性名时，返回对应的属性值；设置属性时无返回值。

### 示例

```javascript
import { $, attr } from 'ft-base-tools';

const link = $('#my-link');

// 获取属性
const href = attr(link, 'href');
console.log(`链接地址: ${href}`);

// 设置单个属性
attr(link, 'target', '_blank');

// 设置多个属性
attr(link, {
  title: '点击访问',
  rel: 'noopener noreferrer',
  'data-id': '123'
});
```

## removeAttr

移除元素的属性。

### 语法

```typescript
function removeAttr(element: Element, name: string): void
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| element | Element | 目标元素 |
| name | string | 要移除的属性名 |

### 示例

```javascript
import { $, removeAttr } from 'ft-base-tools';

const link = $('#my-link');
removeAttr(link, 'target');
```

## on

为元素添加事件监听器。

### 语法

```typescript
function on(
  element: Element | Document | Window,
  event: string,
  handler: EventListenerOrEventListenerObject,
  options?: boolean | AddEventListenerOptions
): void
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| element | Element \| Document \| Window | 目标元素 |
| event | string | 事件类型，如 'click'、'input' 等 |
| handler | EventListenerOrEventListenerObject | 事件处理函数 |
| options | boolean \| AddEventListenerOptions | 可选。事件监听选项 |

### 示例

```javascript
import { $, on } from 'ft-base-tools';

const button = $('#submit-btn');

// 添加点击事件
on(button, 'click', (e) => {
  console.log('按钮被点击了');
  e.preventDefault();
});

// 使用事件选项
on(button, 'click', handleClick, { once: true });

// 监听多个事件
on(button, 'mouseenter', () => {
  console.log('鼠标进入');
});

on(button, 'mouseleave', () => {
  console.log('鼠标离开');
});
```

## off

移除元素的事件监听器。

### 语法

```typescript
function off(
  element: Element | Document | Window,
  event: string,
  handler: EventListenerOrEventListenerObject,
  options?: boolean | EventListenerOptions
): void
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| element | Element \| Document \| Window | 目标元素 |
| event | string | 事件类型 |
| handler | EventListenerOrEventListenerObject | 事件处理函数 |
| options | boolean \| EventListenerOptions | 可选。事件监听选项 |

### 示例

```javascript
import { $, on, off } from 'ft-base-tools';

const button = $('#submit-btn');

// 定义事件处理函数
const handleClick = () => {
  console.log('按钮被点击了');
};

// 添加事件监听
on(button, 'click', handleClick);

// 移除事件监听
off(button, 'click', handleClick);
```

## delegate

使用事件委托为元素添加事件监听器。

### 语法

```typescript
function delegate(
  element: Element | Document,
  selector: string,
  event: string,
  handler: (e: Event, delegateTarget: Element) => void,
  options?: boolean | AddEventListenerOptions
): void
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| element | Element \| Document | 委托元素 |
| selector | string | 目标元素的选择器 |
| event | string | 事件类型 |
| handler | (e: Event, delegateTarget: Element) => void | 事件处理函数 |
| options | boolean \| AddEventListenerOptions | 可选。事件监听选项 |

### 示例

```javascript
import { $, delegate } from 'ft-base-tools';

const list = $('#todo-list');

// 为列表项添加点击事件委托
delegate(list, 'li', 'click', (e, target) => {
  console.log('点击了列表项:', target.textContent);
  target.classList.toggle('completed');
});

// 这样即使后续动态添加的列表项也能响应点击事件
const newItem = document.createElement('li');
newItem.textContent = '新任务';
list.appendChild(newItem);
```

## ready

当 DOM 完全加载后执行回调函数。

### 语法

```typescript
function ready(callback: () => void): void
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| callback | () => void | DOM 加载完成后要执行的回调函数 |

### 示例

```javascript
import { ready } from 'ft-base-tools';

ready(() => {
  console.log('DOM 已加载完成');
  // 初始化应用
  initApp();
});
```

## createElement

创建 DOM 元素。

### 语法

```typescript
function createElement<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  attributes?: Record<string, string>,
  children?: (string | Element)[]
): HTMLElementTagNameMap[K]
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| tag | string | 元素标签名 |
| attributes | Record<string, string> | 可选。元素属性对象 |
| children | (string \| Element)[] | 可选。子元素或文本内容 |

### 返回值

返回创建的 DOM 元素。

### 示例

```javascript
import { createElement } from 'ft-base-tools';

// 创建简单元素
const div = createElement('div');

// 创建带属性的元素
const link = createElement('a', {
  href: 'https://example.com',
  target: '_blank',
  class: 'external-link'
});

// 创建带子元素的元素
const list = createElement('ul', { class: 'list' }, [
  createElement('li', {}, ['项目 1']),
  createElement('li', {}, ['项目 2']),
  createElement('li', {}, ['项目 3'])
]);

// 添加到文档
document.body.appendChild(list);
```

## getScrollPosition

获取页面或元素的滚动位置。

### 语法

```typescript
function getScrollPosition(element?: Element): { x: number; y: number }
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| element | Element | 可选。要获取滚动位置的元素，默认为 window |

### 返回值

返回包含水平和垂直滚动位置的对象。

### 示例

```javascript
import { $, getScrollPosition } from 'ft-base-tools';

// 获取窗口滚动位置
const windowScroll = getScrollPosition();
console.log(`窗口滚动位置: x=${windowScroll.x}, y=${windowScroll.y}`);

// 获取特定元素的滚动位置
const container = $('.scroll-container');
const containerScroll = getScrollPosition(container);
console.log(`容器滚动位置: x=${containerScroll.x}, y=${containerScroll.y}`);
```

## scrollTo

滚动页面或元素到指定位置。

### 语法

```typescript
function scrollTo(
  x: number,
  y: number,
  options?: {
    element?: Element;
    behavior?: 'auto' | 'smooth';
  }
): void
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| x | number | 水平滚动位置 |
| y | number | 垂直滚动位置 |
| options | object | 可选。滚动选项 |
| options.element | Element | 可选。要滚动的元素，默认为 window |
| options.behavior | 'auto' \| 'smooth' | 可选。滚动行为，默认为 'auto' |

### 示例

```javascript
import { $, scrollTo } from 'ft-base-tools';

// 平滑滚动窗口到顶部
scrollTo(0, 0, { behavior: 'smooth' });

// 滚动特定元素
const container = $('.scroll-container');
scrollTo(0, 100, { element: container, behavior: 'smooth' });
```

## getOffset

获取元素相对于文档的偏移位置。

### 语法

```typescript
function getOffset(element: Element): { top: number; left: number }
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| element | Element | 目标元素 |

### 返回值

返回包含元素顶部和左侧偏移量的对象。

### 示例

```javascript
import { $, getOffset } from 'ft-base-tools';

const element = $('#my-element');
const offset = getOffset(element);
console.log(`元素偏移: top=${offset.top}px, left=${offset.left}px`);
```

## getSize

获取元素的尺寸。

### 语法

```typescript
function getSize(element: Element): { width: number; height: number }
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| element | Element | 目标元素 |

### 返回值

返回包含元素宽度和高度的对象。

### 示例

```javascript
import { $, getSize } from 'ft-base-tools';

const element = $('#my-element');
const size = getSize(element);
console.log(`元素尺寸: width=${size.width}px, height=${size.height}px`);
```
``` 