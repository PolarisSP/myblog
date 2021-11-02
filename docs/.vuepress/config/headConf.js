module.exports = [
  ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }],
    ['meta', { name: "baidu_union_verify", content: "a0036ccf0b657813fb236f80f376c429" }],
    ["link", { rel: "icon", href: "/images/favicon.svg" }],
    ['meta', { name: 'Keywords', content: 'vuepress介绍,vuepress博客,博客搭建,spgraceme' }],
    // 作者
    ['meta', { name: 'author', content: 'spgraceme' }],
    // 百度统计
    ['script', {}, `var _hmt = _hmt || [];
    (function() {
      var hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?668842dc21c1b8f215b000531ec8f69e";
      var s = document.getElementsByTagName("script")[0]; 
      s.parentNode.insertBefore(hm, s);
    })();`],
    // ['script', { src: "/utils/js/jq3.5.1.js" }, ``],
    // ['script', { src: "/utils/js/click.js" }, ``],
  ]