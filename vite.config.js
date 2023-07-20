import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import AutoImport from 'unplugin-auto-import/vite'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    uni(),
    AutoImport({
      // include: [
      //   /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
      //   /\.vue$/,
      //   /\.vue\?vue/ // .vue
      // ],
      imports: [
        'vue',
        'pinia',
        'uni-app'
      ],
      dts: 'auto-imports.d.ts',
      eslintrc: {
        enabled: false,
        filepath: './.eslintrc-auto-import.json'
      }
    })
  ],
  envPrefix: ['VUE_APP_', 'VITE_'], // 很重要，使用VUE_APP_开头的环境变量
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/uni.scss";'
      }
    }
  }
})
