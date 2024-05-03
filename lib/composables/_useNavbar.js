import { useRoute } from 'vue-router'

export default (emit) => {
  const route = useRoute()

  const handleClickNavItem = (item) => {
    emit('onClickNavItem', item.subItems?.length > 0 ? item.subItems[0] : item)
  }

  const handleClickHome = () => {
    emit('onClickHome')
  }

  const isActive = (item) => {
    if (item.path === '/') {
      return false
    }

    if (route.path.startsWith(item.path)) {
      return true
    } else if (item.subItems?.length > 0) {
      return route.path.startsWith(item.subItems[0].path)
    } else {
      return false
    }
  }

  return {
    isActive,
    handleClickNavItem,
    handleClickHome,
  }
}
