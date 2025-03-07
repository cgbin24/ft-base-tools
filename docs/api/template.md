# 模板工具

模板工具提供了一系列用于处理字符串模板和生成 HTML 的实用函数。

> 注意⚠️：当阅读当前文档时，你可能会看到这样一种方式`{-{`，这里本应是双括号没有中间`-`的，是因为这是 VitePress 在解析 Markdown 文件时与 Vue 模板语法冲突导致的问题。VitePress 使用 Vue 作为渲染引擎，所以当 Markdown 文件中包含 {{ 和 }} 这样的模板语法标记时，Vue 会尝试将其解析为模板表达式，而不是将其视为普通文本。

## compile

编译模板字符串，生成渲染函数。

### 语法

```typescript
function compile(
  template: string,
  options?: {
    openTag?: string;
    closeTag?: string;
    escape?: boolean;
  }
): (data: Record<string, any>) => string
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| template | string | 模板字符串 |
| options | object | 可选。编译选项 |
| options.openTag | string | 可选。开始标记，默认为 '{-{' |
| options.closeTag | string | 可选。结束标记，默认为 '}}' |
| options.escape | boolean | 可选。是否自动转义 HTML，默认为 true |

### 返回值

返回一个渲染函数，该函数接受数据对象作为参数，返回渲染后的字符串。

### 示例

```js
import { compile } from 'ft-base-tools';

// 基本用法
const tpl = '你好，{-{name}}！今天是{-{date}}。';
const render = compile(tpl);

const data = {
  name: '张三',
  date: '2025年1月1日'
};

console.log(render(data));
// 输出: '你好，张三！今天是2025年1月1日。'

// 自定义标记
const customTpl = '你好，${name}！今天是${date}。';
const customRender = compile(customTpl, {
  openTag: '${',
  closeTag: '}'
});

console.log(customRender(data));
// 输出: '你好，张三！今天是2025年1月1日。'

// 禁用 HTML 转义
const htmlTpl = '<div>{-{content}}</div>';
const htmlRender = compile(htmlTpl, { escape: false });

console.log(htmlRender({ content: '<strong>加粗文本</strong>' }));
// 输出: '<div><strong>加粗文本</strong></div>'
```

## render

直接渲染模板字符串。

### 语法

```typescript
function render(
  template: string,
  data: Record<string, any>,
  options?: {
    openTag?: string;
    closeTag?: string;
    escape?: boolean;
  }
): string
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| template | string | 模板字符串 |
| data | Record<string, any> | 渲染数据 |
| options | object | 可选。渲染选项 |
| options.openTag | string | 可选。开始标记，默认为 '{-{' |
| options.closeTag | string | 可选。结束标记，默认为 '}}' |
| options.escape | boolean | 可选。是否自动转义 HTML，默认为 true |

### 返回值

返回渲染后的字符串。

### 示例

```javascript
import { render } from 'ft-base-tools';

// 基本用法
const template = '你好，{-{name}}！今天是{-{date}}。';
const data = {
  name: '张三',
  date: '2025年1月1日'
};

console.log(render(template, data));
// '你好，张三！今天是2025年1月1日。'

// 自定义标记
console.log(render('你好，${name}！', { name: '张三' }, {
  openTag: '${',
  closeTag: '}'
}));
// '你好，张三！'
```

## compileToFunction

编译模板字符串，支持 JavaScript 表达式。

### 语法

```typescript
function compileToFunction(
  template: string,
  options?: {
    openTag?: string;
    closeTag?: string;
    escape?: boolean;
  }
): (data: Record<string, any>) => string
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| template | string | 模板字符串 |
| options | object | 可选。编译选项 |
| options.openTag | string | 可选。开始标记，默认为 '{-{' |
| options.closeTag | string | 可选。结束标记，默认为 '}}' |
| options.escape | boolean | 可选。是否自动转义 HTML，默认为 true |

### 返回值

返回一个渲染函数，该函数接受数据对象作为参数，返回渲染后的字符串。

### 示例

```javascript
import { compileToFunction } from 'ft-base-tools';

// 使用 JavaScript 表达式
const template = `
<ul>
  {-{ for (let i = 0; i < items.length; i++) { }}
    <li>{-{ items[i].name }} - {-{ items[i].price }}元</li>
  {-{ } }}
</ul>
`;

const render = compileToFunction(template);

const data = {
  items: [
    { name: '苹果', price: 5 },
    { name: '香蕉', price: 3 },
    { name: '橙子', price: 4 }
  ]
};

console.log(render(data));
/*
<ul>
    <li>苹果 - 5元</li>
    <li>香蕉 - 3元</li>
    <li>橙子 - 4元</li>
</ul>
*/

// 条件渲染
const conditionalTemplate = `
<div>
  {-{ if (user.isVIP) { }}
    <span>VIP用户：{-{ user.name }}</span>
  {-{ } else { }}
    <span>普通用户：{-{ user.name }}</span>
  {-{ } }}
</div>
`;

const conditionalRender = compileToFunction(conditionalTemplate);

console.log(conditionalRender({ user: { name: '张三', isVIP: true } }));
// <div><span>VIP用户：张三</span></div>

console.log(conditionalRender({ user: { name: '李四', isVIP: false } }));
// <div><span>普通用户：李四</span></div>
```

## createTemplate

创建一个可重用的模板引擎实例。

### 语法

```typescript
function createTemplate(
  options?: {
    openTag?: string;
    closeTag?: string;
    escape?: boolean;
    cache?: boolean;
  }
): {
  compile: (template: string) => (data: Record<string, any>) => string;
  render: (template: string, data: Record<string, any>) => string;
  registerHelper: (name: string, fn: Function) => void;
  clearCache: () => void;
}
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| options | object | 可选。模板引擎选项 |
| options.openTag | string | 可选。开始标记，默认为 '{-{' |
| options.closeTag | string | 可选。结束标记，默认为 '}}' |
| options.escape | boolean | 可选。是否自动转义 HTML，默认为 true |
| options.cache | boolean | 可选。是否缓存编译后的模板，默认为 true |

### 返回值

返回一个模板引擎实例，包含 compile、render、registerHelper 和 clearCache 方法。

### 示例

```javascript
import { createTemplate } from 'ft-base-tools';

// 创建模板引擎实例
const template = createTemplate({
  openTag: '<%',
  closeTag: '%>',
  escape: true,
  cache: true
});

// 注册自定义助手函数
template.registerHelper('formatDate', (date) => {
  const d = new Date(date);
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
});

template.registerHelper('formatMoney', (amount) => {
  return `¥${amount.toFixed(2)}`;
});

// 使用模板引擎
const html = template.render(`
<div>
  <h1><%title%></h1>
  <p>日期：<%formatDate(date)%></p>
  <ul>
    <% for (let i = 0; i < products.length; i++) { %>
      <li><%products[i].name%> - <%formatMoney(products[i].price)%></li>
    <% } %>
  </ul>
</div>
`, {
  title: '订单详情',
  date: '2025-01-01',
  products: [
    { name: '苹果', price: 5 },
    { name: '香蕉', price: 3 },
    { name: '橙子', price: 4 }
  ]
});

console.log(html);
/*
<div>
  <h1>订单详情</h1>
  <p>日期：2025年1月1日</p>
  <ul>
      <li>苹果 - ¥5.00</li>
      <li>香蕉 - ¥3.00</li>
      <li>橙子 - ¥4.00</li>
  </ul>
</div>
*/

// 清除模板缓存
template.clearCache();
```

## escapeHtml

转义 HTML 特殊字符。

### 语法

```typescript
function escapeHtml(str: string): string
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| str | string | 要转义的字符串 |

### 返回值

返回转义后的字符串。

### 示例

```javascript
import { escapeHtml } from 'ft-base-tools';

console.log(escapeHtml('<div>Hello & World</div>'));
// '&lt;div&gt;Hello &amp; World&lt;/div&gt;'
```

## unescapeHtml

解码被转义的 HTML 特殊字符。

### 语法

```typescript
function unescapeHtml(str: string): string
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| str | string | 要解码的字符串 |

### 返回值

返回解码后的字符串。

### 示例

```javascript
import { unescapeHtml } from 'ft-base-tools';

console.log(unescapeHtml('&lt;div&gt;Hello &amp; World&lt;/div&gt;'));
// '<div>Hello & World</div>'
```

## createElementString

生成 HTML 元素字符串。

### 语法

```typescript
function createElementString(
  tag: string,
  attributes?: Record<string, string | number | boolean>,
  children?: string | string[]
): string
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| tag | string | HTML 标签名 |
| attributes | Record<string, string \| number \| boolean> | 可选。元素属性 |
| children | string \| string[] | 可选。子元素或内容 |

### 返回值

返回生成的 HTML 元素字符串。

### 示例

```javascript
import { createElementString } from 'ft-base-tools';

// 创建简单元素
console.log(createElementString('div'));
// '<div></div>'

// 创建带属性的元素
console.log(createElementString('a', {
  href: 'https://example.com',
  target: '_blank',
  class: 'link'
}));
// '<a href="https://example.com" target="_blank" class="link"></a>'

// 创建带内容的元素
console.log(createElementString('p', {}, '这是一段文本'));
// '<p>这是一段文本</p>'

// 创建带子元素的元素
console.log(createElementString('ul', { class: 'list' }, [
  createElementString('li', {}, '项目 1'),
  createElementString('li', {}, '项目 2'),
  createElementString('li', {}, '项目 3')
]));
/*
'<ul class="list"><li>项目 1</li><li>项目 2</li><li>项目 3</li></ul>'
*/
```

## parseTemplate

解析模板字符串中的标记。

### 语法

```typescript
function parseTemplate(
  template: string,
  options?: {
    openTag?: string;
    closeTag?: string;
  }
): {
  tokens: Array<{ type: 'text' | 'expression', value: string }>;
  render: (data: Record<string, any>) => string;
}
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| template | string | 模板字符串 |
| options | object | 可选。解析选项 |
| options.openTag | string | 可选。开始标记，默认为 '{-{' |
| options.closeTag | string | 可选。结束标记，默认为 '}}' |

### 返回值

返回一个对象，包含解析后的标记数组和渲染函数。

### 示例

```javascript
import { parseTemplate } from 'ft-base-tools';

const template = '你好，{-{name}}！今天是{-{date}}。';
const parsed = parseTemplate(template);

console.log(parsed.tokens);
/*
[
  { type: 'text', value: '你好，' },
  { type: 'expression', value: 'name' },
  { type: 'text', value: '！今天是' },
  { type: 'expression', value: 'date' },
  { type: 'text', value: '。' }
]
*/

console.log(parsed.render({ name: '张三', date: '2025年1月1日' }));
// '你好，张三！今天是2025年1月1日。'
```

## registerHelper

注册全局模板助手函数。

### 语法

```typescript
function registerHelper(name: string, fn: Function): void
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| name | string | 助手函数名称 |
| fn | Function | 助手函数 |

### 示例

```javascript
import { registerHelper, render } from 'ft-base-tools';

// 注册格式化日期的助手函数
registerHelper('formatDate', (date) => {
  const d = new Date(date);
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
});

// 注册格式化金额的助手函数
registerHelper('formatMoney', (amount) => {
  return `¥${amount.toFixed(2)}`;
});

// 使用助手函数
const template = `
<div>
  <p>日期：{-{formatDate(date)}}</p>
  <p>金额：{-{formatMoney(amount)}}</p>
</div>
`;

console.log(render(template, {
  date: '2025-01-01',
  amount: 99.9
}));
/*
<div>
  <p>日期：2025年1月1日</p>
  <p>金额：¥99.90</p>
</div>
*/
```

## getHelpers

获取所有已注册的全局模板助手函数。

### 语法

```typescript
function getHelpers(): Record<string, Function>
```

### 返回值

返回包含所有已注册助手函数的对象。

### 示例

```javascript
import { getHelpers, registerHelper } from 'ft-base-tools';

// 注册助手函数
registerHelper('formatDate', (date) => {
  const d = new Date(date);
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
});

// 获取所有助手函数
const helpers = getHelpers();
console.log(Object.keys(helpers)); // ['formatDate']

// 直接调用助手函数
console.log(helpers.formatDate('2025-01-01')); // '2025年1月1日'
```

```javascript
// 修复前后的示例代码，确保所有的 {-{ 都有对应的 }}
const template = '你好，{-{ name }}！今年{-{ age }}岁了。';
const data = {
  name: '张三',
  age: 25
};
const result = render(template, data);
// 输出: 你好，张三！今年25岁了。
```