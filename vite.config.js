import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'

import path from "path"


export default defineConfig({
  plugins:[
    // ...
    vue(),
    AutoImport({
      resolvers:[ElementPlusResolver()],
    }),
    Components({
      dirs:['src/components','src/views'],
      resolvers:[ElementPlusResolver()],
    }),
  ],
  resolve:{
    alias:{
      '@':path.join(__dirname, 'src')
    },
  },
  server:{
    proxy:{
      '/api':{
        target:'http://localhost:8003',
        changeOrigin:true,
        // rewrite:(path) => path.replace(/^\/api/, ''),
        timeout:2000
      },
    },
    host:'0.0.0.0',
    fs:{
      // 可以为项目根目录的上一级提供服务
      allow:['..']
    }
  }
})
