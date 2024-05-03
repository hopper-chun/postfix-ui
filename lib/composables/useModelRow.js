import _ from 'lodash'

const getChanged = (origin, modified) => {
  const changed = _.reduce(
    modified,
    (result, value, key) => {
      // console.log('value', value, key, origin[key])

      if (!_.isEqual(value, origin[key])) {
        result[key] = value
      }
      return result
    },
    {}
  )
  if (Object.keys(changed).length === 0) {
    console.log('no changed')
    return null
  }
  return changed
}

export default (axios) => {
  if (!axios) throw new Error('Needed axios instance!')

  let origin = {}

  const read = async (url, cb) => {
    const res = await axios.get(url)
    origin = cb ? cb(res.data) : res.data
    return _.cloneDeep(origin)
  }

  const setOrigin = (row) => {
    origin = _.cloneDeep(row)
  }

  const create = async (url, newRow) => {
    if (!_.isEmpty(origin)) {
      newRow = getChanged(origin, newRow)
      if (!newRow) {
        // 변화된게 없으면 null이라 그걸 그냥 보내면 문제가 생긴다
        newRow = {}
      }
    }

    return (await axios.post(url, newRow)).data
  }

  const update = async (url, modified) => {
    // console.log('origin', origin)
    // console.log('modified', modified)
    const changed = getChanged(origin, modified)
    if (!changed) {
      return null
    }
    // console.log('changed', changed)

    return (await axios.patch(url, changed)).data
  }

  const put = async (url, modified) => {
    const changed = getChanged(origin, modified)
    if (!changed) {
      return
    }
    // console.log('changed', changed)

    return (await axios.put(url, changed)).data
  }

  const destroy = async (url, payload) => {
    const data = payload ? { data: payload } : null
    return (await axios.delete(url, data)).data
  }

  const changed = (modified) => {
    return getChanged(origin, modified)
  }
  return {
    read,
    create,
    update,
    put,
    destroy,
    changed,
    setOrigin,
  }
}
