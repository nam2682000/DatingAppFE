import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './output.css'; 

// Import Element Plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css' // Import CSS của Element Plus

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)

app.mount('#app')
