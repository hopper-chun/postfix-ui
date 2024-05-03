import { computed, ref } from 'vue'

// 안쓰길 권함
// layoutFree 로 대체

const state = ref({
  sidebar: true,
  footer: true,
})

export default () => {
  const setValue = async (value) => {
    if (value === true || value === false) {
      state.value.sidebar = value
      state.value.footer = value
      return
    } else {
      for (const key in value) {
        state.value[key] = !!value[key]
      }
    }
  }

  return { setValue, screenMode: computed(() => state.value) }
}
