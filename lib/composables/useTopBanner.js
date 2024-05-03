import { computed, ref } from 'vue'

import { addSeconds, getUnixTime, fromUnixTime, isPast } from 'date-fns'

const KEY = 'TOP_BANNER_ON_AT'
const status = ref(true)

export default () => {
  const onClose = (sleepSec) => {
    if (sleepSec > 0) {
      localStorage.setItem(KEY, getUnixTime(addSeconds(new Date(), sleepSec)))
    }
    status.value = false
  }

  const isActive = computed(() => {
    // 수동으로 꺼놨으면 꺼짐
    if (!status.value) {
      return false
    }
    const onAt = localStorage.getItem(KEY)

    // 저장된거 없으면 켜짐
    if (!onAt) {
      return true
    }

    // 저장된게 날짜인데 미래라면 꺼짐
    if (!isPast(fromUnixTime(onAt))) {
      return false
    }

    // 뭐 이상한게 저장되어 있으니 지워버리고 켜짐
    localStorage.removeItem(KEY)
    return true
  })
  return {
    onClose,
    isActive,
  }
}
