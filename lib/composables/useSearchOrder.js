import { computed, reactive } from 'vue'

export default (router, { headers }) => {
  const state = reactive({
    orderField: '',
    orderType: '', // 'asc', 'desc' or ''
  })
  // const headers = opt.headers.filter((header) => {
  //   if (!header.isAdmin) {
  //     return true
  //   }
  //   return header.isAdmin === opt.isAdmin
  // })

  const options4Sort = headers.reduce((acc, header) => {
    if (Array.isArray(header.sort)) {
      header.sort.forEach((order) => {
        const { label, orderType } = Array.isArray(order)
          ? { label: order[1], orderType: order[0] } // ex [['asc', '낮은가격순' ], ['desc', '높은가격순' ], ]
          : { label: `${header.label} ${order === 'asc' ? '순' : '역순'}`, orderType: order } // ex: ['asc', 'desc']
        acc.push({ label, value: { orderField: header.field, orderType } })
      })
    }
    return acc
  }, [])

  // [
  //   { label: '이름 순', value: { orderField: 'name', orderType: 'asc' } },
  //   { label: '제목 순', value: { orderField: 'title', orderType: 'asc' } },
  //   { label: '제목 역순', value: { orderField: 'title', orderType: 'desc' } },
  //   { label: '부서 역순', value: { orderField: 'department', orderType: 'desc' } },
  // ]

  const readQuery = () => {
    const route = router.currentRoute.value
    const { query } = route

    state.orderField = query.orderField || ''
    state.orderType = query.orderType === 'asc' || query.orderType === 'desc' ? query.orderType : ''

    headers.forEach((header) => {
      if (header.sort) {
        header.sortStatus = (header.field === state.orderField && state.orderType) || ''
      }
      return header
    })

    if (state.orderField && state.orderType) {
      return state
    } else {
      return {}
    }
  }

  const setSearchOrder = async (arg) => {
    const route = router.currentRoute.value

    const query = {
      ...route.query,
    }

    if (arg && arg.orderType) {
      query.orderField = arg.orderField
      query.orderType = arg.orderType
    } else {
      delete query.orderField
      delete query.orderType
    }

    await router.push({
      path: route.path,
      query,
    })
  }

  return {
    state,
    options4Sort,
    readQuery,
    setSearchOrder,
  }
}
