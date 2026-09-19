import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/vision-docs/',
  lang: 'zh-CN',
  title: '青橙战队 · 视觉组',
  description: '青橙战队视觉组使用指南：入门、任务、进度与往期赛季',
  // head 里的路径不会被自动加 base 前缀，需与 base 保持一致
  head: [['link', { rel: 'icon', type: 'image/jpeg', href: '/vision-docs/images/uika.jpeg' }]],

  themeConfig: {
    nav: [
      { text: '使用指南', link: '/guide/' },
      { text: '27赛季任务', link: '/guide/freshman/task-27' },
      { text: '往期赛季', link: '/guide/seasons' }
    ],

    sidebar: [
      {
        text: '使用指南',
        items: [{ text: '总览', link: '/guide/' }]
      },
      {
        text: '入门',
        items: [
          {
            text: '新生入门',
            link: '/guide/freshman/',
            collapsed: false,
            items: [
              { text: '写在最前面的话', link: '/guide/freshman/preface' },
              { text: '27赛季招新任务', link: '/guide/freshman/task-27' }
            ]
          },
          { text: '老生入门', link: '/guide/veteran' }
        ]
      },
      {
        text: '赛季',
        items: [
          { text: '当前进度', link: '/guide/progress' },
          { text: '往期赛季', link: '/guide/seasons' }
        ]
      }
    ],

    search: { provider: 'local' },

    footer: {
      message: '青橙战队视觉组',
      copyright: '© 2026 dRcLoD'
    }
  }
})
