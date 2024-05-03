import { computed, ref } from 'vue'

const state = ref({ test: '' })
const change = (value) => {
  console.log('change', value)
  state.value.test = value
  console.log('changed', state.value)
}

export default () => {
  return {
    change,
    state: computed(() => state.value),
  }
}
