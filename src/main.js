import { createApp } from 'vue'
import axios from 'axios'
import App from './App.vue'

import './tailwind.css'

import { install } from '../lib'

const app = createApp(App)

install(app, axios)

app.mount('#app')
