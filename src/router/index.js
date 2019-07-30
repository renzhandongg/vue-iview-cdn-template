// import Vue from 'vue'
// import Router from 'vue-router'
import iView from 'iview'
// Vue.use(Router)
import Router from 'vue-router'

const router = new Router({
    routes: [{
        path: '/',
        name: 'index',
        component: () => import('../views/index.vue'),
        children: [{
                path: '/user',
                name: 'user',
                meta: {
                    title: '用户'
                },
                component: () => import('../views/user/index.vue'),
            }
        ]
    }, ]
})
router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    // 获取缓存的 请求取消标识 数组，取消所有关联的请求
    let cancelArr = window.axiosCancel || [];
    cancelArr.forEach((ele, index) => {
        ele.cancel("取消了请求") // 在失败函数中返回这里自定义的错误信息
        delete window.axiosCancel[index]
    })
    if (to.path === '/') {
        next('/user')
    } else {
        next()
    }
})
router.afterEach(() => {
    iView.LoadingBar.finish()
})
export default router;