const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer:{
    port:8085
  },
  assetsDir: 'static',
  parallel: false,
  publicPath: './',
})
