// import '@/tailwind.css'
export * from './components'
export * from './composables'
export * as filters from './filters'

import * as components from './components'

import './css/common.css'

let axiosInstance = null

export { axiosInstance }

export const install = (app, axios) => {
  // console.log('Library axiosInstance interceptors:', axiosInstance.interceptors)

  if (!axios) throw new Error('Needed axios instance!')

  axiosInstance = axios

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
