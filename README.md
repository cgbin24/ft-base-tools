# ft-base-tools

高效、轻量的前端工具库，提供丰富的 JavaScript 工具函数。

## 特性

- **轻量级**：零依赖，体积小，性能高
- **类型支持**：使用 TypeScript 编写，提供完整类型定义
- **模块化**：支持按需引入，减小打包体积
- **全面覆盖**：包含数组、日期、DOM、格式化等多种常用工具函数
- **文档完善**：详细的 API 文档和使用示例

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

## 文档

查看完整文档：[https://cgbin24.github.io/ft-base-tools/](https://cgbin24.github.io/ft-base-tools/)

## 开发

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

### 构建

```bash
npm run build
```

### 测试

```bash
npm test
```

### 文档开发

```bash
npm run docs:dev
```

### 文档构建

```bash
npm run docs:build
```

### 文档预览

```bash
npm run docs:preview
```

## 文档部署

本项目使用 GitHub Actions 自动部署文档到 GitHub Pages。每当推送到 `main` 分支时，如果 `docs` 目录下的文件有变更，将自动触发构建和部署流程。

### 手动部署

如果需要手动部署文档，可以按照以下步骤操作：

1. 构建文档
   ```bash
   npm run docs:build
   ```

2. 将 `docs/.vitepress/dist` 目录下的文件部署到 GitHub Pages 或其他静态网站托管服务。

## 贡献指南

欢迎提交问题和贡献代码，请参阅[贡献指南](./docs/guide/contributing.md)了解更多信息。

## 许可证

[MIT](./LICENSE)