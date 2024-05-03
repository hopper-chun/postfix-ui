import { ref, onBeforeUpdate } from 'vue'

export default () => {
  const elements = ref([])

  const getFunctionRef = (index) => (el) => {
    elements.value[index] = el
  }

  onBeforeUpdate(() => {
    elements.value = []
  })
  return {
    elements,
    getFunctionRef,
  }
}
