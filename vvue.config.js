module.exports = {
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
  }
}