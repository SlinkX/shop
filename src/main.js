import './assets/main.scss'
import ElementUI from "element-plus"
import 'element-plus/theme-chalk/src/index.scss'
import { createApp } from 'vue'
import pinia from '@/pinia/pinia'
 
import App from './App.vue'
import router from './router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
  
const app = createApp(App)
 
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
app.use(router)
app.use(ElementUI) 
app.use(pinia)
app.mount('#app')
