import { computed } from 'vue'

export default ({ size, roundedFull }) => {
  const classes = computed(() => {
    if (size.value === 'xs') {
      return [!roundedFull.value ? `px-2.5 py-1 text-xs rounded-md` : 'px-3 py-1.5 text-xs rounded-full ', 'focus:ring-offset-1']
    } else if (size.value === 'sm') {
      return [!roundedFull.value ? `px-3 py-2 text-sm leading-4 rounded-md` : 'px-3.5 py-2 text-sm rounded-full ', 'focus:ring-offset-2']
    } else if (size.value === 'md') {
      return [!roundedFull.value ? `px-4 py-2 text-sm rounded-md` : 'px-4 py-2 text-sm rounded-full ', 'focus:ring-offset-2']
    } else if (size.value === 'lg') {
      return [!roundedFull.value ? `px-4 py-2 text-base rounded-md` : 'px-5 py-2 text-base rounded-full ', 'focus:ring-offset-2']
    } else if (size.value === 'xl') {
      return [!roundedFull.value ? `px-6 py-3 text-base rounded-lg` : 'px-6 py-3 text-base rounded-full ', 'focus:ring-offset-2']
    } else {
      throw 'Invalid size'
    }
  })

  return {
    classes,
  }
}
