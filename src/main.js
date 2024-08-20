import { createApp } from 'vue'
import App from './App.vue'

import './tailwind.css'

import { install } from '../lib'

const app = createApp(App)

install(app)

app.mount('#app')
