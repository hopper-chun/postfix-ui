import { ref, watch, onBeforeUnmount } from 'vue'

export default ({ modelValue, expireTime }, emit) => {
  const show = ref(false)
  watch(
    () => modelValue.value,
    () => {
      if (modelValue.value) {
        show.value = true
        setTimeoutHandler()
      }
    }
  )
  watch(
    () => show.value,
    () => {
      if (!show.value) {
        emit('update:modelValue', false)
        clearTimeoutHandler()
      }
    }
  )

  let timeoutHander = null
  const setTimeoutHandler = () => {
    if (!expireTime.value) {
      return
    }

    clearTimeoutHandler()
    timeoutHander = setTimeout(() => {
      show.value = false
    }, expireTime.value)
  }
  const clearTimeoutHandler = () => {
    if (timeoutHander) {
      clearTimeout(timeoutHander)
    }
  }

  onBeforeUnmount(() => {
    clearTimeoutHandler()
  })
  return {
    show,
  }
}
