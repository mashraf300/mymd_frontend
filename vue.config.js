const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  devServer: {
    proxy: {
      '/api': {
        target: 'https://mymdapi-819126018066.us-central1.run.app',
        changeOrigin: true,
      },
    },
  },
  transpileDependencies: true
})
