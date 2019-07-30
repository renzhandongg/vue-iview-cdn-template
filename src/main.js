import Vue from 'vue'
import App from './App.vue'
import store from './store' //引入store
import router from './router' //引入路由
import './style/index.css'
import iView from 'iview'; //加载速度慢
// import './iview'
import config from '@/config'
import '@/style/common.css';
import '!vue-style-loader!css-loader!sass-loader!@/scss/main.scss'
//给vue原型添加axios属性
Vue.config.productionTip = false //阻止启动生产消息，常用作指令。

/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config
Vue.use(iView);

new Vue({
    router,
    store, //使用store
    render: h => h(App),
}).$mount('#app')