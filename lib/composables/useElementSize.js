import { computed, ref, onMounted, onBeforeUnmount } from 'vue'

export default (el) => {
  const contentRect = ref({ width: 0, height: 0 })

  const observer = new ResizeObserver((entries) => {
    for (let entry of entries) {
      const { width, height } = entry.contentRect

      contentRect.value.width = width
      contentRect.value.height = height
    }
  })

  onMounted(() => {
    observer.observe(el.value)
  })

  onBeforeUnmount(() => {
    observer.unobserve(el.value)
  })

  return {
    width: computed(() => contentRect.value.width),
    height: computed(() => contentRect.value.height),
  }
}
