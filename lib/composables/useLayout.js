// 2024-04-08 deprecated. use useRouteMeta
import { computed, ref } from 'vue'

const state = ref({
  layoutFree: false,
})

export default () => {
  const setLayoutFree = async (value) => {
    state.value.layoutFree = !!value
  }

  return { setLayoutFree, layoutFree: computed(() => state.value.layoutFree) }
}
