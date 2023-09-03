const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: '../public',
  assetsDir: 'build',
  indexPath: process.env.NODE_ENV === 'production'
    ? 'build/index.html'
    : 'index.html'
})
