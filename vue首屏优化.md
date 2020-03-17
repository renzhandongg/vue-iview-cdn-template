
FP FCP FMP
FP:第一个像素点呈现到页面
FCP:首次内容绘制,出来大致的框架架构
FMP:首次有效的绘制,真正的页面里面有数据内容

1,分包  ->代码切割,动态
webpack
commonsChunkPlugin -> splitChunkPlugin

CSR SSR 同构 预渲染

quicklink使用

骨架屏 -> vue-skeleton-webpack-plugin
      -> page-skeleton-webpack-plugin

service worker ->PWA
//资源以高优先级加载
preload -> 当前页面 ,允许指定加载优先级,允许浏览器决定资源类型的能力
prefetch ->下一个页面 (后台闲置的时候加载)
 link prefetch <link rel="prefetch" href="./src/assets/logo.png">
 DNS prefetch <link rel="dns-prefetch" href="www.google.com">
 prerender 后台渲染整个页面
perconnect 预先做一些请求的操作,关键路径上消除了RTTs,并且减少了半秒以上的延迟