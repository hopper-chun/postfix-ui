import { reactive } from 'vue'

export default (router, tableConfig) => {
  const state = reactive({
    page: 1, // current page
  })

  const readQuery = () => {
    const route = router.currentRoute.value
    const { query } = route

    state.page = (query.page && Number.parseInt(query.page)) || 1

    return { page: state.page, limit: tableConfig.limit }
  }

  const setPage = async (page) => {
    const route = router.currentRoute.value
    const { query } = route

    await router.push({
      path: route.path,
      query: {
        ...query,
        page,
      },
    })
  }

  return {
    state,
    readQuery,
    setPage,
  }
}
