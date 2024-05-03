import { createRouter, createWebHistory } from 'vue-router'

import routes from './routes'

const router = createRouter({
  history: createWebHistory(),
  routes,
})

//router.beforeEach((to, from, next) => {
// if (to.matched.some((record) => record.meta.isLogin)) {
//   if (isLogin) {
//     next(true)
//   } else {
//     next({ path: '/account/login', query: { path: to.path } })
//   }
// } else {
//   next()
// }
//})

export default router
