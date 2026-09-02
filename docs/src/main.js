import { createApp } from 'vue'
import axios from 'axios'
import * as PostfixUI from '@postfix/ui'

import App from './App.vue'
import router from './router'
import './tailwind.css'
import './styles.css'

const app = createApp(App)
const httpClient = axios.create()

app.use(router)
app.use(PostfixUI, httpClient)
app.mount('#app')
