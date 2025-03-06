---
layout: home
hero:
  name: 前端工具库
  text: 高效、轻量的JavaScript工具集合
  tagline: 简化前端开发，提高工作效率
  image:
    src: /logo.png
    alt: 前端工具库
  actions:
    - theme: brand
      text: 快速开始
      link: /guide/getting-started
    - theme: alt
      text: 在GitHub上查看
      link: https://github.com/cgbin24/ft-base-tools

features:
  - icon: 🚀
    title: 高效轻量
    details: 零依赖，体积小，性能高，按需引入不臃肿
  - icon: 🛠️
    title: 功能丰富
    details: 涵盖数组、日期、DOM、格式化等多种常用工具函数
  - icon: 📦
    title: 模块化设计
    details: 支持按需引入，Tree-Shaking友好
  - icon: 📝
    title: 类型完备
    details: 使用TypeScript编写，提供完整类型定义
---

# 前端工具库

## 简介

这是一个实用的前端工具库，提供了丰富的JavaScript工具函数，帮助开发者更高效地完成日常开发任务。

## 特性

- **轻量级**：零依赖，体积小，性能高
- **类型支持**：使用TypeScript编写，提供完整类型定义
- **模块化**：支持按需引入，减小打包体积
- **全面覆盖**：包含数组、日期、DOM、格式化等多种常用工具函数
- **文档完善**：详细的API文档和使用示例

## 安装

```bash
npm install ft-base-tools
# 或者
yarn add ft-base-tools
# 或者
pnpm add ft-base-tools
```

## 使用示例

```javascript
import { arrayUnique, formatDate } from 'ft-base-tools';

// 数组去重
const arr = [1, 2, 2, 3, 3, 4];
const uniqueArr = arrayUnique(arr);
console.log(uniqueArr); // [1, 2, 3, 4]

// 日期格式化
const date = new Date();
const formattedDate = formatDate(date, 'YYYY-MM-DD');
console.log(formattedDate); // 例如：2025-01-01
```

## 贡献指南

欢迎提交问题和贡献代码，请参阅[贡献指南](/guide/contributing)了解更多信息。

## 许可证

[MIT](https://opensource.org/licenses/MIT) 