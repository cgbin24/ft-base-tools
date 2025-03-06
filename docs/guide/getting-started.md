# 快速开始

## 介绍

ft-base-tools 是一个高效、轻量的前端工具库，提供了丰富的 JavaScript 工具函数，帮助开发者更高效地完成日常开发任务。

## 安装

你可以通过 npm、yarn 或 pnpm 安装：

```bash
# 使用 npm
npm install ft-base-tools

# 使用 yarn
yarn add ft-base-tools

# 使用 pnpm
pnpm add ft-base-tools
```

## 基本使用

### 完整引入

```javascript
// 引入所有工具函数
import * as ftTools from 'ft-base-tools';

// 使用
const arr = [1, 2, 2, 3, 4, 4];
const uniqueArr = ftTools.arrayUnique(arr);
console.log(uniqueArr); // [1, 2, 3, 4]
```

### 按需引入（推荐）

```javascript
// 只引入需要的函数
import { arrayUnique, formatDate } from 'ft-base-tools';

// 使用数组去重
const arr = [1, 2, 2, 3, 4, 4];
const uniqueArr = arrayUnique(arr);
console.log(uniqueArr); // [1, 2, 3, 4]

// 使用日期格式化
const date = new Date();
const formattedDate = formatDate(date, 'YYYY-MM-DD');
console.log(formattedDate); // 例如：2025-01-01
```

### 按模块引入

```javascript
// 引入特定模块下的所有函数
import * as arrayUtils from 'ft-base-tools/array';
import * as dateUtils from 'ft-base-tools/date';

// 使用
const arr = [1, 2, 2, 3, 4, 4];
const uniqueArr = arrayUtils.unique(arr);
console.log(uniqueArr); // [1, 2, 3, 4]

const date = new Date();
const formattedDate = dateUtils.format(date, 'YYYY-MM-DD');
console.log(formattedDate); // 例如：2025-01-01
```

## 浏览器直接使用

你也可以通过 CDN 在浏览器中直接使用：

```html
<script src="https://cdn.jsdelivr.net/npm/ft-base-tools/dist/index.umd.js"></script>
<script>
  // 通过全局变量 ftTools 使用
  const arr = [1, 2, 2, 3, 4, 4];
  const uniqueArr = ftTools.arrayUnique(arr);
  console.log(uniqueArr); // [1, 2, 3, 4]
</script>
```

## 下一步

- 查看[安装指南](/guide/installation)了解更多安装选项
- 浏览[API文档](/api/array)了解所有可用的工具函数
- 查看[使用示例](/examples/basic)获取更多使用灵感 