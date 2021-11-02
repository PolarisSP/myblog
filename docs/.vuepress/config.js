const private = require('./private/private')
const headConf = require('./config/headConf.js')
const navConf = require('./config/navConf.js')
const pluginConf = require('./config/pluginConf.js')
const sidebarConf = require('./config/sidebarConf.js')
// 把最后更改时间更改为 中国地区的样式
const moment = require('moment');
moment.locale("zh-cn") //显示中国的时间格式

module.exports = {
  base: '/myblog/',
  title: "Spgraceme",
  description: "记录代码生活",
  head: headConf,
  theme: "reco",
  // theme: '@vuepress/blog',
  themeConfig: {
    // 博客配置
    type: "blog",
    fullscreen: true,
    logo: "/images/favicon.svg",
    // blogConfig: {
    //   category: {
    //     location: 2,     // 在导航栏菜单中所占的位置，默认2
    //     text: '分类' // 默认文案 “分类”
    //   },
    //   tag: {
    //     location: 3,     // 在导航栏菜单中所占的位置，默认3
    //     text: '标签'      // 默认文案 “标签”
    //   }
    // },
    subSidebar: 'auto',//在所有页面中启用自动生成子侧边栏，原 sidebar 仍然兼容
    nav: navConf,
    sidebar: sidebarConf,//所有页面自动生成侧边栏
    author: "Spgraceme",
    authorAvatar: "/images/avatar.svg",
    mode: "light", //默认显示模式  modePicker: false 关闭该按钮
    modePicker: true,
    codeTheme: "tomorrow", // default 'tomorrow' okaidia
    smooth: "true", //平滑滚动
    // 评论设置 
    valineConfig: {
      appId: private.appId,
      appKey: private.appKey,
      recordIP: true,
      placeholder: '填写邮箱地址可以及时收到回复噢...',
      visitor: true,
    },
    lastUpdated: '最后更新于', 
    // friendLink: [
      // {
      //   title: '午后南杂',
      //   desc: 'Enjoy when you can, and endure when you must.',
      //   email: 'recoluan@qq.com',
      //   link: 'https://www.recoluan.com'
      // },
    // ],
  },
  editLinks: true,
  editLinkText: '在 GitHub 上编辑此页 ！',
  markdown: {
    lineNumbers: true, //代码显示行号
  }, // 搜索设置
  plugins: pluginConf
}
