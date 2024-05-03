import { reactive, onMounted, onBeforeUnmount, computed } from 'vue'

export default () => {
  const local = reactive({ isMobile: false, screenWidth: window.innerWidth, clientScreenWidth: document.documentElement.clientWidth })

  const handleResize = () => {
    // console.log('resize', window.innerWidth, window.innerHeight)
    local.isMobile = window.innerWidth < 640
    local.screenWidth = window.innerWidth
    local.clientScreenWidth = document.documentElement.clientWidth
    // 전체 screenWidth에서 스크롤 너비를 제외한 너비
  }

  onMounted(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize)
  })

  return {
    isMobile: computed(() => local.isMobile),
    screenWidth: computed(() => local.screenWidth),
    clientScreenWidth: computed(() => local.clientScreenWidth),
  }
}
