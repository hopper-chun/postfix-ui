import { computed, ref } from 'vue'

const state = ref({
  routeMeta: {},
})

export default () => {
  const setRouteMeta = async (value) => {
    state.value.routeMeta = value
  }

  return { setRouteMeta, routeMeta: computed(() => state.value.routeMeta) }
}
