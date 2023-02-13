import App from './App'

import uView from './uni_modules/vk-uview-ui';

// // #ifdef H5
// import VConsole from 'vconsole'
// // 白天模式 const vConsole = new VConsole()
// const vConsole = new VConsole({ theme: 'dark' })
// // #endif

import {
  install
} from '@icon-park/vue-next/es/all';
import * as Pinia from 'pinia'

import {
  createSSRApp
} from 'vue'
export function createApp() {
  const app = createSSRApp(App)

  // 使用 uView UI
  app.use(uView)

  install(app, 'i');

  app.use(Pinia.createPinia())

  return {
    app
  }
}
