// import '@/tailwind.css'

export * from './components'
// export * from './composables'
// export * as filters from './filters'

import * as components from './components'
// import '@/css/common.css'

const all = Object.assign({}, components)

export default {
  install: (app) => {
    Object.keys(all).forEach((name) => {
      app.component(name, all[name])
    })
  },
  all,
}
