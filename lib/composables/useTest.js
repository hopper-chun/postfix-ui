import { axiosInstance } from '@'

export default () => {
  return {
    test: async (url) => {
      return await axiosInstance.get(url)
    },
  }
}
