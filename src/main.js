import {
  createSSRApp
} from 'vue'
import App from './App.vue'
import * as Pinia from 'pinia'
// pinia 的本地数据缓存
import { createUnistorage } from 'pinia-plugin-unistorage'

// 引入 uView UI
import uView from '@/vk-uview-ui'

export function createApp() {
  const app = createSSRApp(App)
  // 引入pinia
  const store = Pinia.createPinia()
  store.use(createUnistorage())
  app.use(store)

  // 使用 uView UI
  app.use(uView)

  return {
    app,
    Pinia
  }
}
