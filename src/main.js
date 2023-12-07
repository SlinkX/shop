import './assets/main.scss'
import ElementUI from "element-plus"
import 'element-plus/theme-chalk/src/index.scss'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)
app.use(ElementUI)

app.mount('#app')
