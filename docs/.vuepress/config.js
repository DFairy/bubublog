module.exports = {
  title: '布布blog',
  description: '人生是一场永不止步的前进',
  base: '/bubublog/',
  head: [['link', { rel: 'icon', href: `/img/favicon.ico` }]],
  markdown: {
    lineNumbers: true, // 代码行数
  },
  themeConfig: {
    serviceWorker: {
      updatePopup: {
        // 刷新内容的弹窗
        message: '就在刚刚,dfairy更新了内容',
        buttonText: '点这里',
      },
    },
    lastUpdated: 'Last Updated', // 最后更新时间
    nav:[
      { text: 'vue3', link: '/vue3/' },
    ],
    sidebar:{
      '/vue3/':[
        '/vue3/',
        {
          title:'封装组件',
          children:[
            '/vue3/package/i18n.md',
            '/vue3/package/svg.md'
          ]

        }
      ]
    },
    sidebarDepth: 3,
  }
}
