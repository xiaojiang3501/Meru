import { defineConfig } from 'vite'
import { viteMockServe } from 'vite-plugin-mock'
import vue from '@vitejs/plugin-vue'
import path from 'path'




export default defineConfig({

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  plugins: [
    vue(),
    viteMockServe({ // 設定 mock 的目錄
      mockPath: './src/mock',
      supportTs: false
    }),
  ]

})
