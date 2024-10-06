import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import postcssPxtoRem from 'postcss-pxtorem'
import vitePluginInlineStylePxToRem from './lib/index';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    vitePluginInlineStylePxToRem({
      rootValue: 37.5, // 按照自己的设计稿修改
      unitPrecision: 2, // 保留到2位小数
    })
  ],
  build:{
    minify: false,
  },
  css: {
    postcss: {
      plugins: [
        postcssPxtoRem({
          rootValue: 37.5, // 按照自己的设计稿修改
          unitPrecision: 2, // 保留到5位小数
          selectorBlackList: ['ignore', 'tab-bar', 'tab-bar-item'],  // 忽略转换正则匹配项
          propList: ['*'],
          replace: true,
          mediaQuery: false,
          minPixelValue: 0
        })
      ]
    },
    preprocessorOptions: {
      extract: false,
      less: {
        globalVars: {},
        modifyVars: {},
        javascriptEnabled: true,
      }
    }
  },
})
