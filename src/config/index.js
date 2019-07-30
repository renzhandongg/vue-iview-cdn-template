export default {
    url: {
        basicUrl: process.env.NODE_ENV === 'development' ?
            'http://10.25.26.193:8080/reconmendSys/' : 'http://10.25.26.193:8080/reconmendSys/',
    },
    /**
     * @description 默认打开的首页的路由name值，默认为home
     */
    homeName: 'user',
};