// import '@/tailwind.css'

export * from './components'
export * from './composables'
export * as filters from './filters'

import * as components from './components'

import './css/common.css'

export const install = (app) => {
  const all = Object.assign(
    {
      SwiperContainer: 'swiper-container',
      SwiperSlide: 'swiper-slide',
    },
    components
  )

  Object.keys(all).forEach((name) => {
    app.component(name, all[name])
  })
}
