import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './tailwind4app.css'
import plugin from './plugin'

createApp(App).use(router).use(plugin).mount('#app')
