import { createRouter, createWebHistory } from 'vue-router'

import routes from './router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.path === from.path) return false
    return savedPosition || { top: 0, left: 0 }
  },
})

export default router
