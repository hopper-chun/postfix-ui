import { computed, reactive, ref } from 'vue'

export default ({ filterTypes }) => {
  const state = reactive([])
  const filterTypesMap = filterTypes.reduce((acc, f) => {
    acc[f.key] = f
    return acc
  }, {})

  const localQuery = ref({})

  const readQuery = () => {
    state.length = 0
    for (const key in localQuery.value) {
      if (filterTypesMap[key]) {
        state.push([filterTypesMap[key], localQuery.value[key]])
      }
    }

    return state.reduce((acc, searchFilter) => {
      acc[searchFilter[0].key] = searchFilter[1]
      return acc
    }, {})
  }

  const appendQuery = async (filterKey, filterValue) => {
    const before = JSON.stringify(localQuery.value)

    // page를 지워야 한다.
    delete localQuery.value.page
    localQuery.value[filterKey] = filterValue

    readQuery()

    return before === JSON.stringify(localQuery.value)
  }

  const appendQuerys = async (querys) => {
    const before = JSON.stringify(localQuery.value)

    // page를 지워야 한다.
    delete localQuery.value.page

    querys.map(({ key, value }) => {
      // console.log(' key, value---', key, value)

      if (value) {
        localQuery.value[key] = value
      } else {
        delete localQuery.value[key]
      }
    })

    readQuery()

    return before === JSON.stringify(localQuery.value)
  }

  const clearQuery = async (removeKey) => {
    // console.log('removeKey', removeKey)
    if (removeKey) {
      delete localQuery.value[removeKey]
    } else {
      filterTypes.forEach((filterType) => {
        delete localQuery.value[filterType.key]
      })
    }
    readQuery()
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
