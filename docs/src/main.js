import { createApp } from 'vue'
import axios from 'axios'
import * as PostfixUI from '@postfix/ui'
import { register } from 'swiper/element/bundle'

import App from './App.vue'
import router from './router'
import './tailwind.css'
import './styles.css'

const app = createApp(App)
const httpClient = axios.create()

register()
app.use(router)
app.use(PostfixUI, httpClient)
app.mount('#app')
