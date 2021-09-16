const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  chainWebpack: config => {
    config.module
      .rule('markdown')
      .test(/\.md$/)
      .use('vue-loader')
        .loader('vue-loader')
        .options({
          compilerOptions: {
            preserveWhitespace: false
          }
        })
        .end()
      .use('md-loader')
        .loader(path.resolve(__dirname, './md-loader'))
  }
}