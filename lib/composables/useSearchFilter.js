import { computed, reactive } from 'vue'

export default (router, { filterTypes }) => {
  const state = reactive([])
  const filterTypesMap = filterTypes.reduce((acc, f) => {
    acc[f.key] = f
    return acc
  }, {})

  const readQuery = () => {
    const route = router.currentRoute.value
    const { query } = route

    state.length = 0
    // filterTypes.forEach((filterType) => {
    //   if (query[filterType.key]) {
    //     state.push([filterType, query[filterType.key]])
    //   }
    // })

    // console.log('query', query)
    for (const key in query) {
      // console.log('key', key, query[key])

      if (filterTypesMap[key]) {
        state.push([filterTypesMap[key], query[key]])
      }
    }

    // console.log('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=', state)

    return state.reduce((acc, searchFilter) => {
      acc[searchFilter[0].key] = searchFilter[1]
      return acc
    }, {})
  }

  const appendQuery = async (filterKey, filterValue) => {
    const route = router.currentRoute.value
    const before = JSON.stringify(route.query)

    const query = {
      ...route.query,
    }

    // page를 지워야 한다.
    delete query.page
    query[filterKey] = filterValue
    // console.log('query---', query)

    await router.push({
      path: route.path,
      query,
    })

    return before === JSON.stringify(query)
  }

  const appendQuerys = async (querys) => {
    const route = router.currentRoute.value
    const before = JSON.stringify(route.query)

    const query = {
      ...route.query,
    }

    // page를 지워야 한다.
    delete query.page

    querys.map(({ key, value }) => {
      // console.log(' key, value---', key, value)

      if (value) {
        query[key] = value
      } else {
        delete query[key]
      }
    })
    // console.log('query---', query)

    await router.push({
      path: route.path,
      query,
    })

    return before === JSON.stringify(query)
  }

  const clearQuery = async (removeKey) => {
    console.log('removeKey', removeKey)
    const route = router.currentRoute.value

    const query = {
      ...route.query,
    }

    if (removeKey) {
      delete query[removeKey]
    } else {
      filterTypes.forEach((filterType) => {
        delete query[filterType.key]
      })
      delete query['orderField']
      delete query['orderType']
      delete query['page']
    }

    await router.push({
      path: route.path,
      query,
    })
  }

  return {
    state,
    filterTypes,
    readQuery,
    appendQuery,
    appendQuerys,
    clearQuery,
  }
}
