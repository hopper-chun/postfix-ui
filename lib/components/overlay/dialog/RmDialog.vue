<script setup>
import { ref, watchEffect } from 'vue'

const props = defineProps({
  title: { type: [Boolean, String] },
  isClose: { type: Boolean, default: true },
  customStyle: { type: Object },
  fnBeforeClose: { type: Function },
})

const emit = defineEmits(['onOpen', 'onClose'])

const active = ref(false)
const isMouseDown = ref(false) // dialog 안에서 클릭 드래그 하다 자꾸 dialog 밖에서 up을 할때, dialog가 닫히는것을 방지

const open = () => {
  active.value = true
  isMouseDown.value = false
  emit('onOpen')
}
const close = () => {
  if (props.fnBeforeClose && !props.fnBeforeClose()) {
    alert('작업이 진행중입니다.')
    return
  }
  active.value = false
  isMouseDown.value = false
  emit('onClose')
}

const onMouseDown = () => {
  isMouseDown.value = true
}

const onMouseUp = () => {
  if (isMouseDown.value) {
    close()
  }
}

defineExpose({ open, close })

// watchEffect(() => {
// 다이얼로그, 모바일 메뉴 모두 이 효과를 사용해야하는데, 자꾸 서로 충돌함. 글로벌로 교통정리를 할 수 있는 기능 추가가 필요. 
//   if (active.value) {
//     document.body.style.overflowY = 'hidden'
//   } else {
//     document.body.style.overflowY = 'auto'
//   }
// })
</script>

<template>
  <transition
    enter-active-class="dialog_enter_active"
    enter-from-class="dialog_enter_from"
    enter-to-class="dialog_enter_to"
    leave-active-class="dialog_leave_active"
    leave-from-class="dialog_leave_from"
    leave-to-class="dialog_leave_to"
  >
    <template v-if="active">
      <div class="rm-dialog" @mousedown.self="onMouseDown" @mouseup.self="onMouseUp">
        <div class="rm-dialog--container" :style="customStyle">
          <div v-if="title" class="rm-dialog--header">
            <div class="title">{{ title }}</div>
            <div v-if="isClose" class="close" @click="close"></div>
          </div>
          <div class="rm-dialog--body">
            <slot :closeDialog="close" :isActive="active"> </slot>
          </div>
        </div>
      </div>
    </template>
  </transition>
</template>
