const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']
module.exports = {
    configureWebpack: {
        devtool: 'source-map'
    },
    productionSourceMap: false,
    devServer: {
        port: 8889, // 端口
    },
    // 生产环境 sourceMap
    publicPath: './',
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(options => {
                options[0].template = './src/assets/index.html'
                options[0].favicon = './favicon.ico'
                return options
            })
    },
    css: {
        sourceMap: false, // 是否为 CSS 开启 source map
    },
    configureWebpack: {
        plugins: [
            new CompressionWebpackPlugin({
                filename: '[path].gz[query]',
                algorithm: 'gzip',
                test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
                threshold: 10240,
                minRatio: 0.8
            })
        ],
        resolve: {
            // 格式化地址前缀
            alias: {
                'api': '@/api'
            }
        },
        externals: { // 在这里配置后，减少了压缩的包内容，需要在public/index.html通过cdn方式再引入,注意对应的版本
            vue: "Vue",
            vuex: "Vuex",
            axios: 'axios',
            "vue-router": "VueRouter",
            'iview': 'iview'
        }
    },
}