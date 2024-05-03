import { computed } from 'vue'

export default ({ size }) => {
  const classes = computed(() => {
    if (size.value === 'xs') {
      return 'p-1'
    } else if (size.value === 'sm') {
      return 'p-1.5'
    } else if (size.value === 'md') {
      return 'p-2'
    } else if (size.value === 'lg') {
      return 'p-2'
    } else if (size.value === 'xl') {
      return 'p-3'
    } else {
      throw 'Invalid size'
    }
  })

  return {
    classes,
  }
}
