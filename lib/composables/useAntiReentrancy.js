import { ref } from 'vue'

export default () => {
  const doing = ref(false)

  const antiReentrancyFn = (fn) => {
    return async (arg) => {
      if (doing.value) {
        return
      }
      doing.value = true

      try {
        return await fn(arg)
      } finally {
        doing.value = false
      }
    }
  }
  return {
    doing,
    antiReentrancyFn,
  }
}
