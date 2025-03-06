# 贡献指南

感谢你考虑为 ft-base-tools 做出贡献！本文档将指导你如何参与项目开发。

## 行为准则

请确保你的行为符合我们的行为准则：

- 尊重所有贡献者，无论其经验水平、性别、种族、宗教信仰或国籍
- 使用友好和包容的语言
- 接受建设性批评
- 关注项目和社区的最佳利益

## 如何贡献

### 报告 Bug

如果你发现了 Bug，请通过 GitHub Issues 报告，并确保：

1. 检查现有 Issues，避免重复报告
2. 使用清晰的标题描述问题
3. 详细描述复现步骤、预期行为和实际行为
4. 提供环境信息（操作系统、浏览器、Node.js 版本等）
5. 如果可能，提供最小复现示例

### 提出新功能

如果你有新功能的想法，请：

1. 先在 Issues 中讨论，确保该功能符合项目方向
2. 清晰描述新功能的用途和价值
3. 如果可能，提供实现思路或伪代码

### 提交代码

1. Fork 项目仓库
2. 创建你的特性分支：`git checkout -b feature/amazing-feature`
3. 提交你的更改：`git commit -m 'Add some amazing feature'`
4. 推送到分支：`git push origin feature/amazing-feature`
5. 提交 Pull Request

### Pull Request 指南

- 确保 PR 描述清晰地说明了更改内容和原因
- 包含相关 Issue 的引用（如适用）
- 更新相关文档
- 确保所有测试通过
- 遵循代码风格指南

## 开发设置

### 环境准备

确保你的开发环境满足以下要求：

- Node.js 14.0.0 或更高版本
- npm 6.0.0 或更高版本（或等效的 yarn/pnpm）

### 安装依赖

```bash
# 克隆仓库
git clone https://github.com/cgbin24/ft-base-tools.git
cd ft-base-tools

# 安装依赖
npm install
# 或
yarn
# 或
pnpm install
```

### 开发工作流

1. 运行开发服务器：

```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
```

2. 运行测试：

```bash
npm test
# 或
yarn test
# 或
pnpm test
```

3. 构建项目：

```bash
npm run build
# 或
yarn build
# 或
pnpm build
```

## 代码风格

我们使用 ESLint 和 Prettier 来保持代码风格一致。请确保你的代码符合项目的代码风格指南。

```bash
# 运行代码检查
npm run lint
# 或
yarn lint
# 或
pnpm lint

# 自动修复代码风格问题
npm run lint:fix
# 或
yarn lint:fix
# 或
pnpm lint:fix
```

### 代码风格指南

- 使用 2 个空格缩进
- 使用分号结束语句
- 使用单引号表示字符串
- 避免不必要的注释
- 函数和变量使用驼峰命名法
- 类使用帕斯卡命名法
- 常量使用全大写下划线命名法

## 测试指南

为确保代码质量，我们要求为所有新功能和修复添加测试。

### 编写测试

我们使用 Jest 作为测试框架。测试文件应放在 `tests` 目录中，并以 `.test.ts` 或 `.spec.ts` 结尾。

```typescript
// 示例测试
import { arrayUnique } from '../src/array';

describe('arrayUnique', () => {
  it('should remove duplicates from array', () => {
    expect(arrayUnique([1, 2, 2, 3, 3, 4])).toEqual([1, 2, 3, 4]);
  });
  
  it('should handle empty array', () => {
    expect(arrayUnique([])).toEqual([]);
  });
  
  it('should handle array with no duplicates', () => {
    expect(arrayUnique([1, 2, 3])).toEqual([1, 2, 3]);
  });
});
```

### 运行测试

```bash
# 运行所有测试
npm test

# 运行特定测试文件
npm test -- array.test.ts

# 生成测试覆盖率报告
npm run test:coverage
```

## 文档指南

我们使用 VitePress 生成文档。文档源文件位于 `docs` 目录中。

### 编写文档

- 使用 Markdown 格式
- 为每个函数提供清晰的描述、参数说明、返回值说明和示例
- 使用代码块展示示例代码
- 保持文档与代码同步更新

### 本地预览文档

```bash
npm run docs:dev
# 或
yarn docs:dev
# 或
pnpm docs:dev
```

然后在浏览器中访问 `http://localhost:5173` 预览文档。

## 发布流程

项目维护者负责发布新版本。发布流程如下：

1. 更新版本号（遵循语义化版本规范）
2. 更新 CHANGELOG.md
3. 创建发布标签
4. 发布到 npm

## 获取帮助

如果你在贡献过程中需要帮助，可以：

- 在 GitHub Issues 中提问
- 通过电子邮件联系维护者
- 在 Pull Request 中提出具体问题

再次感谢你的贡献！ 