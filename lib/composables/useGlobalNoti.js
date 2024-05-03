import { computed, reactive } from 'vue'

const state = reactive({
  title: '',
  description: '',
  icon: '',
})

export default () => {
  const clearNoti = () => {
    state.title = ''
    state.description = ''
    state.icon = ''
  }

  const setNoti = ({ title, description, icon }) => {
    state.title = title
    state.description = description
    state.icon = icon

    // console.log('state', state)
  }
  return {
    noti: computed(() => state),
    setNoti,
    clearNoti,
  }
}
