import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'ft-base-tools',
  description: '高效、轻量的前端工具库',
  lang: 'zh-CN',
  lastUpdated: true,
  
  themeConfig: {
    // logo: '/logo.png',
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/getting-started' },
      { text: 'API', link: '/api/array' },
      { text: '示例', link: '/examples/basic' },
      { text: 'GitHub', link: 'https://github.com/cgbin24/ft-base-tools' }
    ],
    
    sidebar: {
      '/guide/': [
        {
          text: '指南',
          items: [
            { text: '快速开始', link: '/guide/getting-started' },
            { text: '安装', link: '/guide/installation' }
          ]
        }
      ],
      '/api/': [
        {
          text: 'API 文档',
          items: [
            { text: '数组工具', link: '/api/array' },
            { text: '加密工具', link: '/api/crypto' },
            { text: '日期工具', link: '/api/date' },
            { text: '设备工具', link: '/api/device' },
            { text: 'DOM 工具', link: '/api/dom' },
            { text: '格式化工具', link: '/api/format' },
            { text: '数学工具', link: '/api/math' },
            { text: '网络工具', link: '/api/network' },
            { text: '对象工具', link: '/api/object' },
            { text: '字符串工具', link: '/api/string' },
            { text: '类型工具', link: '/api/type' },
            { text: '验证工具', link: '/api/validate' },
            { text: '浏览器工具', link: '/api/performance' },
          ]
        }
      ],
      '/examples/': [
        {
          text: '使用示例',
          items: [
            { text: '基础示例', link: '/examples/basic' },
            { text: '高级示例', link: '/examples/advanced' }
          ]
        }
      ]
    },
    
    footer: {
      message: '基于 MIT 许可发布',
      copyright: 'Copyright © 2025-present'
    },
    
    search: {
      provider: 'local'
    }
  }
}) 