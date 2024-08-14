import { computed, ref } from 'vue'

const KEY = 'TMMS_ADMIN_MENU_EXPAND'

const isOpen = ref(localStorage.getItem(KEY) === 'close' ? 'close' : 'open')

export default () => {
  const open = () => {
    isOpen.value = 'open'
    localStorage.setItem(KEY, isOpen.value)
  }
  const close = () => {
    isOpen.value = 'close'
    localStorage.setItem(KEY, isOpen.value)
  }

  return {
    open,
    close,
    isOpen: computed(() => isOpen.value !== 'close'),
  }
}
