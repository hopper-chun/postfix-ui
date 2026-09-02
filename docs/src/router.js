import { createRouter, createWebHistory } from 'vue-router'

import HomeView from './views/HomeView.vue'
import GettingStartedView from './views/GettingStartedView.vue'
import ButtonView from './views/ButtonView.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomeView },
    { path: '/guide/getting-started', component: GettingStartedView },
    { path: '/components/button', component: ButtonView },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})
