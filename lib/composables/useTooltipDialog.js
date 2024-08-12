import { ref, computed } from 'vue'

const tooltip = ref('')
const isActive = ref(false)

export default () => {
  const setTooltip = (arg) => {
    tooltip.value = arg
    isActive.value = true
    // console.log('.value.value.value.value.value.value.value', tooltip.value, isActive.value)
  }

  return {
    tooltip: computed(() => tooltip.value),
    isActive,
    setTooltip,
  }
}
