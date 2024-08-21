import axios from 'axios'
import { computed, reactive } from 'vue'

export default () => {
  // if (!axios) throw new Error('Needed axios instance!')

  const state = reactive({ count: 0, rows: [] })

  const clearRows = () => {
    state.count = 0
    state.rows = []
  }

  const load = async (path, params, cb) => {
    // const startTime = new Date()

    clearRows()

    try {
      const res = await axios.get(path, params)
      // const endTime = new Date()
      // console.log('excel parsing elapsed time: ', (endTime - startTime) / 1000, 'sec')

      if (Array.isArray(res.data)) {
        state.count = res.data.length
        // state.rows = !cb ? res.data : res.data.map((row) => cb(row, state.count))
        state.rows = !cb ? res.data : res.data.map((row, index) => cb(row, index, res.data))
      } else {
        const { count, rows } = res.data
        state.count = count
        // state.rows = !cb ? rows : rows.map((row) => cb(row, count))
        state.rows = !cb ? rows : rows.map((row, index) => cb(row, index, rows))
      }

      // console.log(path, params, state.rows)
    } catch (ex) {
      state.rows = []
      throw ex
    }
  }

  return {
    load,
    clearRows,
    count: computed(() => {
      return state.count
    }),
    rows: computed(() => {
      return state.rows
    }),
  }
}
