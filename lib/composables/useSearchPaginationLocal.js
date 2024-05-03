import { reactive } from 'vue'

export default (tableConfig) => {
  const state = reactive({
    page: 1, // current page
  })

  const readQuery = () => {
    return { page: state.page, limit: tableConfig.limit }
  }

  const setPage = async (page) => {
    state.page = page
  }

  return {
    state,
    readQuery,
    setPage,
  }
}
