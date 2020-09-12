module.exports = {
  publicPath: './',
  lintOnSave: false,
  configureWebpack: {
    resolve: {
      alias: {
        components: '@/components',
        common: '@/common',
        assets: '@/assets',
        network: '@/network',
        views: '@/views'
      }
    }
  },
  devServer: {
    proxy: {
      '/public': {
        target: 'http://127.0.0.1/heimamm/public',
        pathRewrite: {
          '/public': ''
        }
      }
    }
  }
}