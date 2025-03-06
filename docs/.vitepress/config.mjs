import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '前端工具库',
  description: '高效、轻量的前端工具库',
  lang: 'zh-CN',
  lastUpdated: true,
  
  themeConfig: {
    logo: '/logo.png',
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/getting-started' },
      { text: 'API', link: '/api/date' },
      { text: '示例', link: '/examples/basic' },
      { text: 'GitHub', link: 'https://github.com/yourusername/your-repo' }
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
            { text: '日期工具', link: '/api/date' },
            { text: 'DOM 工具', link: '/api/dom' }
          ]
        }
      ],
      '/examples/': [
        {
          text: '使用示例',
          items: [
            { text: '基础示例', link: '/examples/basic' }
          ]
        }
      ]
    },
    
    footer: {
      message: '基于 MIT 许可发布',
      copyright: 'Copyright © 2023-present'
    },
    
    search: {
      provider: 'local'
    }
  }
}) 