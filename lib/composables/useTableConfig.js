import { reactive, watch } from 'vue'

export default ({ storageId, headers: originHeaders }) => {
  watch(
    () => storageId,
    () => {
      // console.log('=============== storageId', storageId)
    }
  )
  const state = reactive({
    limit: 0,
    headers: originHeaders.map((header) => ({ ...header })),
  })

  const resetLimit = () => {
    state.limit = 30
  }
  const resetHeaders = () => {
    state.headers = state.headers.map((header, index) => {
      header.using = originHeaders[index].default === false ? false : true
      return header
    })
  }

  const load = () => {
    const storage = JSON.parse(localStorage.getItem(storageId))
    if (storage && storage.limit) {
      state.limit = storage.limit
    } else {
      resetLimit()
    }
    if (storage && storage.headers) {
      state.headers = state.headers.map((header, index) => {
        header.using = storage.headers[index]?.using
        return header
      })
    } else {
      resetHeaders()
    }
  }
  load()

  const saveLimit = (limit) => {
    if (limit) {
      state.limit = limit
    } else {
      resetLimit()
    }

    localStorage.setItem(storageId, JSON.stringify({ limit: state.limit, headers: state.headers.map((header) => ({ using: header.using })) }))
  }
  const saveHeaders = (headers) => {
    if (headers) {
      state.headers = state.headers.map((header, index) => {
        header.using = headers[index].using
        return header
      })
    } else {
      resetHeaders()
    }

    localStorage.setItem(storageId, JSON.stringify({ limit: state.limit, headers: state.headers.map((header) => ({ using: header.using })) }))
  }

  return {
    state,
    saveLimit,
    saveHeaders,
  }
}
