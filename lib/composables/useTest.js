import axios from 'axios'

export default () => {
  return {
    test: async (url) => {
      return await axios.get(url)
    },
  }
}
