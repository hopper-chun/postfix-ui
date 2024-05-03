import { ref } from 'vue'

export default () => {
  const element = ref(null)
  const functionRef = (el) => {
    element.value = el
  }
  return {
    functionRef,
    element,
  }
}
