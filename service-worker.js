/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "a5749d198b0da7e37051fb5a51cc3c0c"
  },
  {
    "url": "about.html",
    "revision": "eeaade98f1b744314ea6dcf0f3404b9b"
  },
  {
    "url": "assets/css/0.styles.4e11a0a7.css",
    "revision": "b9cf6cfcb806b4a68aef27a84fe32b2d"
  },
  {
    "url": "assets/img/bg.2cfdbb33.svg",
    "revision": "2cfdbb338a1d44d700b493d7ecbe65d3"
  },
  {
    "url": "assets/img/iconfont.117d8006.svg",
    "revision": "117d8006a3c478fbc8c4ce04a36ddb5a"
  },
  {
    "url": "assets/img/iconfont.343c882d.svg",
    "revision": "343c882d838d1e3ca59b347444af4160"
  },
  {
    "url": "assets/img/iconfont.36767f3e.svg",
    "revision": "36767f3efa2e4c880f42a42e8b2075b0"
  },
  {
    "url": "assets/js/1.1756bb21.js",
    "revision": "f3f16a26abcf1a9c86831b650eda8fa3"
  },
  {
    "url": "assets/js/10.5c3620e9.js",
    "revision": "6edc9bea10244c136270377e4ef77ce7"
  },
  {
    "url": "assets/js/11.03fffc74.js",
    "revision": "cd93d57550a5912d9199152b982e1560"
  },
  {
    "url": "assets/js/12.c141f30e.js",
    "revision": "f10382c80dd74676bc6e97a033543502"
  },
  {
    "url": "assets/js/13.9816e5ba.js",
    "revision": "2d1002eb940dc7ebed9c8cb151e8a201"
  },
  {
    "url": "assets/js/14.73c0fd6a.js",
    "revision": "ecfefc776eb39a433f72c3db053ae12f"
  },
  {
    "url": "assets/js/15.d40ba907.js",
    "revision": "d009704479062fe4111b9a313d7e728f"
  },
  {
    "url": "assets/js/16.90f1e59e.js",
    "revision": "54c265922cf363cf9549d230b11be043"
  },
  {
    "url": "assets/js/17.86a4ab02.js",
    "revision": "e3c3a8607526da8f485e960955bf5de4"
  },
  {
    "url": "assets/js/18.fc8490c9.js",
    "revision": "c13aa90dddf438dc10a726eb66f96276"
  },
  {
    "url": "assets/js/19.ce8e6a2e.js",
    "revision": "93d047f049d31d89fbad8e4a684513d5"
  },
  {
    "url": "assets/js/20.cd73ae3c.js",
    "revision": "3d9a84805c6d9a18da9ab6fd361ed30b"
  },
  {
    "url": "assets/js/21.eef97c84.js",
    "revision": "2d06359f100d4bd4b63a0fb305925fff"
  },
  {
    "url": "assets/js/22.7b13750d.js",
    "revision": "59ad8c55c0841b6b0a18ef96703a922f"
  },
  {
    "url": "assets/js/23.79c868a2.js",
    "revision": "13c738173e5464ef18d04859bd83fa7d"
  },
  {
    "url": "assets/js/24.5b695e3c.js",
    "revision": "18dc36dc7f46053b22cd1ea2d2d828fe"
  },
  {
    "url": "assets/js/25.a3fb186c.js",
    "revision": "d42b6bdd22b09345c9ab9831e6b404e3"
  },
  {
    "url": "assets/js/26.62704656.js",
    "revision": "2bd56dc628370329be1d65b3478cf2a0"
  },
  {
    "url": "assets/js/27.4cb0caab.js",
    "revision": "a0d48655bedcdd94876e541217f88a69"
  },
  {
    "url": "assets/js/28.b8f6d14a.js",
    "revision": "f1c73b635fc44fa8fd2c9057f054ca50"
  },
  {
    "url": "assets/js/29.021c4080.js",
    "revision": "d27938a8cead0c6b019e6b069e5df12d"
  },
  {
    "url": "assets/js/3.ecb5bbb9.js",
    "revision": "27c8dffc0361aba9d5f06236047a4032"
  },
  {
    "url": "assets/js/30.510cbfdc.js",
    "revision": "2a9c0e57febad2050e9335cecfd59bd6"
  },
  {
    "url": "assets/js/31.c58e3261.js",
    "revision": "1a279c04496e4643e271d12feca00978"
  },
  {
    "url": "assets/js/32.9b111277.js",
    "revision": "bec6061c4c856543dbebecacbdbe2bdb"
  },
  {
    "url": "assets/js/33.319dca68.js",
    "revision": "3c90b591afc6b76bd61cc82c1a6395fa"
  },
  {
    "url": "assets/js/34.276009f6.js",
    "revision": "0757fd3dfabb619252c9bbb2cf870419"
  },
  {
    "url": "assets/js/35.e6b3d537.js",
    "revision": "d7f3455016fa37c16f8cd7bafde32b2e"
  },
  {
    "url": "assets/js/36.8d704d15.js",
    "revision": "c2dbfdc4b943824da5bf2b38e10df1ef"
  },
  {
    "url": "assets/js/37.d523d7bf.js",
    "revision": "246e27c9e66a6264151a989b7faa2125"
  },
  {
    "url": "assets/js/38.f3d9ff33.js",
    "revision": "7ea412047e46b6a0a846aa16b014495c"
  },
  {
    "url": "assets/js/39.9cf6e02e.js",
    "revision": "7be55b27ce0ec8987a3ffb4ee6d76a3d"
  },
  {
    "url": "assets/js/4.a11b5b39.js",
    "revision": "1fc14adbfcee40bcf8c0f32f7692763c"
  },
  {
    "url": "assets/js/40.dbe45772.js",
    "revision": "e40cefa25b38fa985a54934e37207fbc"
  },
  {
    "url": "assets/js/41.06113cb3.js",
    "revision": "e88d4bbfc24a55f860943cfaa79fb959"
  },
  {
    "url": "assets/js/42.4a6d44e3.js",
    "revision": "fe7454ee23396cb8a89ac63e58217f00"
  },
  {
    "url": "assets/js/5.3a0a8d35.js",
    "revision": "740b5d205bc8d869678a8520565f5283"
  },
  {
    "url": "assets/js/6.7f9e9372.js",
    "revision": "2180ce6f16e04d60564630d2e5830278"
  },
  {
    "url": "assets/js/7.b90e8c8a.js",
    "revision": "918bb9d42554b02763f022d660e7406f"
  },
  {
    "url": "assets/js/8.7eb38f04.js",
    "revision": "5a65da4fb6cc1cdbc20aeb76cc2080a1"
  },
  {
    "url": "assets/js/9.ac0933a5.js",
    "revision": "ebee3deff7b40afa5888d45bcab06903"
  },
  {
    "url": "assets/js/app.af8f0e25.js",
    "revision": "09cdc872fa6d297c603b28f7108ec6d6"
  },
  {
    "url": "categories/index.html",
    "revision": "0acffb91ccb5399219e4874d9e81c69e"
  },
  {
    "url": "categories/java/index.html",
    "revision": "9bdad0855fdc036a16f6b65182f268da"
  },
  {
    "url": "categories/JavaWeb/index.html",
    "revision": "04cb8d968bdf5d348fa8bfee5d7da55a"
  },
  {
    "url": "categories/JDK8/index.html",
    "revision": "db588c1f88362cbcdbe352fdcf641976"
  },
  {
    "url": "categories/Mysql/index.html",
    "revision": "ba8b0f321a0a8e961005fdce18a7acba"
  },
  {
    "url": "categories/Springboot/index.html",
    "revision": "5f0cc6094d87642168731939a6ea490c"
  },
  {
    "url": "categories/代码简洁/index.html",
    "revision": "8bf0a78c73c1f5592a346411c80b2705"
  },
  {
    "url": "categories/对象拷贝/index.html",
    "revision": "2ba84c99a5ab8e1b4ec3e780714f2e9d"
  },
  {
    "url": "categories/数据结构与算法/index.html",
    "revision": "2f69da34b235053bd08dd21e37f9e812"
  },
  {
    "url": "categories/日常实践/index.html",
    "revision": "412c84cf28cd0cc09cbcd1461c97abb3"
  },
  {
    "url": "categories/泛型 java基础/index.html",
    "revision": "d429df3d119f76648cad2377795f294b"
  },
  {
    "url": "categories/测试/index.html",
    "revision": "4fa6ee929e900d55bf6a0a3cca674fd7"
  },
  {
    "url": "categories/设计模式/index.html",
    "revision": "1301d1546c2d17113bab279072bd7dce"
  },
  {
    "url": "categories/过滤器 拦截器 Springboot/index.html",
    "revision": "3eb75f61a588119d641ade47d997b167"
  },
  {
    "url": "categories/锁/index.html",
    "revision": "2c2330cd6bb4ecb9e5dd1390335cf856"
  },
  {
    "url": "dailyPractice/cleanCode/index.html",
    "revision": "f4cf2ca8486dac13d95e0a85b7a6b05a"
  },
  {
    "url": "dailyPractice/cleanCode/one.html",
    "revision": "976341fcfb719ef3f79da10241d2f7b7"
  },
  {
    "url": "dailyPractice/cleanCode/three.html",
    "revision": "33b23398c16c8e46a48ae6c17344db7e"
  },
  {
    "url": "dailyPractice/cleanCode/two.html",
    "revision": "37a930e9ebc45b8868b6cfae2393d304"
  },
  {
    "url": "dailyPractice/index.html",
    "revision": "50684735d14b1466fa54ca21b8116353"
  },
  {
    "url": "DataStructAndAlgorithm/index.html",
    "revision": "23c5dceee087ac4b07332ce7b960c253"
  },
  {
    "url": "DataStructAndAlgorithm/one.html",
    "revision": "192a8cd8cf15308b2ac2a28449e5e694"
  },
  {
    "url": "designModel/index.html",
    "revision": "eab7d07410c4bcfb1678273ebdaf4135"
  },
  {
    "url": "iconfont/iconfont.css",
    "revision": "e150c959f85cd56ef0f0a954827111ac"
  },
  {
    "url": "iconfont/iconfont.eot",
    "revision": "25b4751a56a02ea48e41fd2c8b0c66c2"
  },
  {
    "url": "iconfont/iconfont.js",
    "revision": "4591ba278cbe745ef66e8a767c5b996f"
  },
  {
    "url": "iconfont/iconfont.svg",
    "revision": "343c882d838d1e3ca59b347444af4160"
  },
  {
    "url": "iconfont/iconfont.ttf",
    "revision": "0238cfbc253837f69055be3ac759bd3f"
  },
  {
    "url": "iconfont/iconfont.woff",
    "revision": "000a212d4229a27b9c5e26d04ad485ce"
  },
  {
    "url": "iconfont/iconfont.woff2",
    "revision": "5e8e8ce8bcaf8d51e66c45c0939270b7"
  },
  {
    "url": "images/avatar.svg",
    "revision": "7345cc3ebd2fbcbb56d480d17ac4b09f"
  },
  {
    "url": "images/bg-logo.svg",
    "revision": "a2d1cf1ad2becdd79823541dae101fcd"
  },
  {
    "url": "images/bookbook.png",
    "revision": "b2738d2ea909570149dcab0b4a0f52b6"
  },
  {
    "url": "images/designModel/编写高质量代码.png",
    "revision": "f3262ef8152517d3b11bfc3f2d2b12d3"
  },
  {
    "url": "images/favicon.svg",
    "revision": "9965b6a3ccafec1dcb32c3a834c6322a"
  },
  {
    "url": "images/gitee.svg",
    "revision": "f36d3ffccbc6ff3223ce8883054339fb"
  },
  {
    "url": "images/logo.png",
    "revision": "cf23526f451784ff137f161b8fe18d5a"
  },
  {
    "url": "images/mysql/Mysql的逻辑架构图.png",
    "revision": "0d2070e8f84c4801adbfa03bda1f98d9"
  },
  {
    "url": "images/mysql/update语句执行流程.png",
    "revision": "2e5bff4910ec189fe1ee6e2ecc7b4bbe"
  },
  {
    "url": "images/mysql/事务ABC 的执行流程.png",
    "revision": "823acf76e53c0bdba7beab45e72e90d6"
  },
  {
    "url": "images/mysql/思考不同隔离级别下.png",
    "revision": "7dea45932a6b722eb069d2264d0066f8"
  },
  {
    "url": "images/mysql/数据版本可见性规则.png",
    "revision": "882114aaf55861832b4270d44507695e"
  },
  {
    "url": "images/mysql/死锁举例.jpg",
    "revision": "4d0eeec7b136371b79248a0aed005a52"
  },
  {
    "url": "images/qq.jpg",
    "revision": "0ed63aeba802a232e66c7d31bdc49966"
  },
  {
    "url": "images/ruanyf.jpg",
    "revision": "a6b66f5b22ead995355c702c2c975674"
  },
  {
    "url": "images/spring/ServletContextAndEveryContext.png",
    "revision": "d3bd796e3ab45adda2ff8b4f203d9a78"
  },
  {
    "url": "images/springboot/Filter/FilterAndIntercepterFlatChart.jpg",
    "revision": "cbeffa748dea12fa1870aedb3232c782"
  },
  {
    "url": "images/springboot/Filter/FilterAndIntercepterGetInfo.jpg",
    "revision": "adadc9ddcaa346d248567259f6f3526f"
  },
  {
    "url": "images/springboot/Filter/IntertrepterAndFilter.jpg",
    "revision": "e4ba3806740a62ccc10e230f92076173"
  },
  {
    "url": "images/springboot/Filter/Java_Three_weapon.jpg",
    "revision": "88b5e840f1ea6a54476ac8f957439f43"
  },
  {
    "url": "images/wx.jpg",
    "revision": "fba0e37213a75dcefc44d4b920d29d7b"
  },
  {
    "url": "index.html",
    "revision": "1b7667b1162581545963b595bf612bff"
  },
  {
    "url": "java/index.html",
    "revision": "8aa04af68819e6c3f2f772f79416a3d6"
  },
  {
    "url": "java/JDK/fanxing.html",
    "revision": "981fa2487cbfd8c60c61715ecd8c1629"
  },
  {
    "url": "java/JDK/index.html",
    "revision": "9199be25e571d5cc31ecc7a29a5abb7f"
  },
  {
    "url": "java/JDK/objectMapper.html",
    "revision": "268d1e6f4dec6a022426ec1b23d363e2"
  },
  {
    "url": "java/JDK/Optional.html",
    "revision": "38859b05f23e08a8215cdd93e1380ed3"
  },
  {
    "url": "java/Mybatis/index.html",
    "revision": "28237c254dd4d1b9ab1d3ed682dfc813"
  },
  {
    "url": "java/Mybatis/one.html",
    "revision": "e726471c3140ba23b9e176248f8aec17"
  },
  {
    "url": "java/Mysql/dataindex.html",
    "revision": "c9add50c821ac1d2c906022840e4a3b4"
  },
  {
    "url": "java/Mysql/index.html",
    "revision": "02555af32aea4b2f4bdd68fc3197abca"
  },
  {
    "url": "java/Mysql/lock.html",
    "revision": "5064025f183fe3f40fa647903d56219f"
  },
  {
    "url": "java/Mysql/mysql.html",
    "revision": "7597be1e2698b4cc2f379162241642ec"
  },
  {
    "url": "java/Mysql/transaction.html",
    "revision": "d128ced746f43d0dfc4ab3b68611efae"
  },
  {
    "url": "java/Spring/index.html",
    "revision": "ac022474b3039240a5f9708983d88c60"
  },
  {
    "url": "java/Spring/ServletContext.html",
    "revision": "8c63d8e09f2b9f7c7ef1157a0c4e1250"
  },
  {
    "url": "java/Springboot/FilterAndIntercepter.html",
    "revision": "1682bd004b804f7376546126bfcc3141"
  },
  {
    "url": "java/Springboot/index.html",
    "revision": "80eed051679a64d7a97ef4c0e3dead2c"
  },
  {
    "url": "java/Springboot/mapStruct.html",
    "revision": "b9a40ebebebc56de04f8dd8084870188"
  },
  {
    "url": "java/Springboot/springbootAnnotation.html",
    "revision": "e1b2a373067a7f9e0eb5604ec420d1d8"
  },
  {
    "url": "tag/index.html",
    "revision": "de1a06b8ff50c1acf2500fbe954e3f1b"
  },
  {
    "url": "tag/JavaWeb/index.html",
    "revision": "0eae9b935623640f39f1548a51a43d90"
  },
  {
    "url": "tag/ServletContext/index.html",
    "revision": "2838eea1363599f99eaf593bb26ea3ee"
  },
  {
    "url": "tag/Spring/index.html",
    "revision": "8dc2afc450ee0c6c9fa926b5cb514f3b"
  },
  {
    "url": "timeline/index.html",
    "revision": "6aed23a3076415c84a385d570d20fb47"
  },
  {
    "url": "utils/js/click.js",
    "revision": "a8aae70860f6cee7a7823428f6047657"
  },
  {
    "url": "utils/js/jq3.5.1.js",
    "revision": "9ac39dc31635a363e377eda0f6fbe03f"
  },
  {
    "url": "views/About/author.html",
    "revision": "cff378934fc7f506ba9d3424fcf024b7"
  },
  {
    "url": "views/About/resume.html",
    "revision": "a544bf8132dcaf00b2b7c409ede39370"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
