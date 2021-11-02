module.exports = [
    // 导航栏
    { text: "主页", link: "/", icon: "reco-home" },
    {
        text: 'java', link: '/java/', icon:"reco-document",
        items: [
          {
            text: 'Spring',
            link: '/java/Spring/'
          },
          {
            text: 'Springboot',
            link: '/java/Springboot/'
          },
          {
            text: 'Mybatis',
            link: '/java/Mybatis/'
          },
          {
            text: 'JDK',
            link: '/java/JDK/'
          },
          {
            text: 'Mysql',
            link: '/java/Mysql/'
          }
        ]
    },
    {
      text: '设计模式',
      link: '/designModel/',
      icon:"reco-document",
    },
    {
      text: '日常实践',
      link: '/dailyPractice/',
      icon:"reco-document",
      items: [
        {
          text: '代码整洁之道',
          link: '/dailyPractice/cleanCode/',
        }
      ]
    },
    {
      text: '数据结构与算法',
      link: '/DataStructAndAlgorithm/',
      icon:"reco-document"
    },
    {
      text: "工具箱",
      icon: "iconfont icon-tools",
      items: [
        { text: "在线PS", link: "https://www.uupoop.com/" },
        { text: "奶牛快传", link: "https://cowtransfer.com/" },
        { text: "编程语言排行榜", link: "https://www.tiobe.com/tiobe-index/" },
      ]
    },
    { text: "时间线", link: "/timeline/", icon: "reco-date" },
    {
      text: "关于",
      icon: "reco-message",
      items: [
        // {
        //   text: "关于我",
        //   link: "/views/About/author",
        //   icon: "reco-account"
        // },
        // {
        //   text: "简历",
        //   link: "/views/About/resume",
        //   icon: "reco-document"
        // },
        
        // {
        //   text: "CSDN",
        //   link: "https://blog.csdn.net/weixin_43742708",
        //   icon: "reco-csdn",
        // },
        {
          text: "GitHub",
          link: "https://github.com/PolarisSP",
          icon: "reco-github",
        },
        {
          text: "Gitee",
          link: "https://gitee.com/polarissp",
          icon: "reco-mayun",
        },
      ]
    }
  ]