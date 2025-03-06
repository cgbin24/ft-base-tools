# 安装

## 包管理器安装

### NPM

```bash
npm install ft-base-tools
```

### Yarn

```bash
yarn add ft-base-tools
```

### PNPM

```bash
pnpm add ft-base-tools
```

## CDN 使用

### jsDelivr

```html
<script src="https://cdn.jsdelivr.net/npm/ft-base-tools/dist/index.umd.js"></script>
```

### unpkg

```html
<script src="https://unpkg.com/ft-base-tools/dist/index.umd.js"></script>
```

## 开发环境

如果你只想在开发环境使用：

```bash
npm install ft-base-tools --save-dev
# 或
yarn add ft-base-tools --dev
# 或
pnpm add ft-base-tools -D
```

## 版本说明

- **最新稳定版**：推荐用于生产环境
- **最新测试版**：包含最新特性，但可能不稳定

安装特定版本：

```bash
npm install ft-base-tools@1.0.0
```

## 兼容性

### 浏览器兼容性

- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 16+
- IE 不支持（如需支持请使用相应的 polyfill）

### Node.js 兼容性

支持 Node.js 12.0.0 及以上版本。

## 构建工具集成

### Webpack

无需特殊配置，直接引入即可。支持 Tree Shaking。

### Vite

无需特殊配置，直接引入即可。支持 Tree Shaking。

### Rollup

无需特殊配置，直接引入即可。支持 Tree Shaking。

## 验证安装

安装完成后，可以通过以下代码验证是否安装成功：

```javascript
import { version } from 'ft-base-tools';

console.log(version); // 应输出当前版本号
```

## 故障排除

如果安装过程中遇到问题，可以尝试以下方法：

1. 清除缓存后重新安装
   ```bash
   npm cache clean --force
   npm install ft-base-tools
   ```

2. 检查 Node.js 版本是否满足要求
   ```bash
   node -v
   ```

3. 如果仍然有问题，请[提交 issue](https://github.com/cgbin24/ft-base-tools/issues) 