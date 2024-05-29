import { defineConfig } from 'themekit-js'

// https://vitepress.dev/reference/site-config
const ThemeConfigJp={
  nav: []   
};
 
const ThemeConfigCn={
  nav: [
    { text: '关于我', link: '/README' },
    { text: '开始探索', link: '/简体中文/探索/README' },
    { text: 'eFACILITY', link: '/简体中文/eFACILITY/' },
  ], 
  sidebar: { 
    '/简体中文/开发人员/': [
      {
        text: 'Guide',
        items: [
          { text: 'Index', link: '/guide/' },
          { text: 'One', link: '/guide/one' },
          { text: 'Two', link: '/guide/two' }
        ]
      }
    ]
  } 
};
 
const ThemeConfigEn ={ 
  nav: [
    { text: 'ABOUT ME', link: '/English/' },
    { text: 'HELLO', link: '/English/HelloWorld/' }, 
    { text: 'eFACILITY', link: '/English/eFACILITY' } 
  ]
};
 
const siteBase="/"
export default defineConfig({
  title: "Seedunk",  
  base:siteBase,
  themeName: "default theme + customization",
  description: "A VitePress Site",
  lang:"root",
  locales: {  
    "English": {
      label: 'English',
      lang: 'English',  
      link: '/English/',
      themeConfig: ThemeConfigEn 
    }, 
    "日本語": {
      label: '日本語',
      lang: '日本語',  
      link: '/日本語/',
      themeConfig: ThemeConfigJp 
    }, 
    root: {
      label: '简体中文',
      lang: '简体中文',   
      themeConfig:  ThemeConfigCn
    }
  },   
  themeConfig: {
    logo:  '/seedunk.png', 
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ], 
    socialLinks: [
      { icon: 'github', link: 'https://seedunk.github.io' }
    ],
    footer: {
      message: '<a href=\"'+siteBase+'English/"\>English</a>&nbsp;&nbsp;&nbsp;<a href=\"/"\>简体中文</a>&nbsp;&nbsp;&nbsp;<a href=\"'+siteBase+'日本語/"\>日本語</a>',
      copyright: 'Copyright © 2019-2024 Seedunk'
    }
  }
})
