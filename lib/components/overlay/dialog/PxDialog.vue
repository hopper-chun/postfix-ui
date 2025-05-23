<script setup>
import { ref, watch, onBeforeUnmount, onMounted } from 'vue'

const props = defineProps({
  header: { type: Boolean, default: true },
  title: { type: String },
  closeButton: { type: Boolean, default: true },
  closeClickOutside: { type: Boolean, default: true },
  fnBeforeClose: { type: Function },
  size: { type: String },
})

const emit = defineEmits(['onOpen', 'onClose'])

const active = ref(false)
const isMouseDown = ref(false) // dialog 안에서 클릭 드래그 하다 자꾸 dialog 밖에서 up을 할때, dialog가 닫히는것을 방지
const bodyState = ref('')

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
    props.closeClickOutside && close()
  }
  isMouseDown.value = false
}

watch(
  () => active.value,
  () => {
    if (document.querySelector('body').style.overflow !== 'hidden') {
      if (active.value === true) {
        document.querySelector('body').style.overflowY = 'hidden'
      } else {
        document.querySelector('body').style.overflowY = bodyState.value
      }
    }
  }
)

onMounted(() => {
  bodyState.value = document.querySelector('body').style.overflowY
})

onBeforeUnmount(() => {
  // 다이얼로그가 켜진 상태에서 close()없이 다른 페이지로 이동할 경우, watch가 active의 변화를 감지하지 못해서 언마운트 시점에서 강제로 auto 부여
  // 언마운트 시점에서도 active가 여전히 true면 무조건 overflow-y-auto로 변경
  // 이 설정이 언젠가 overflow-hidden가 디폴트인 페이지 세팅에서 문제를 일으킬 수 있음...
  if (document.querySelector('body').style.overflow !== 'hidden' && active.value) {
    // 얘가 상기 조건 없이 아무때나 발동하면 일부 멀쩡한 다이얼로그가 맛이 감.. 24.11.20
    // 다이얼로그가 닫히거나 켜진채로 사라져야 할 때(탭이 변경되거나 해서 v-if등으로 close()없이 사라질 때) 그 행위를 유발하는 과정 전에 await close() 등으로 close를 발동시키고 이동시킬 것
    document.querySelector('body').style.overflowY = bodyState.value
  }
})

defineExpose({ open, close })
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
      <div class="px-dialog" :class="size" @mousedown.self="onMouseDown" @mouseup.self="onMouseUp">
        <div class="px-dialog--container">
          <div v-if="header" class="px-dialog--header">
            <div class="title">{{ title }}</div>
            <div v-if="closeButton" class="close" @click="close"></div>
          </div>
          <div class="px-dialog--body">
            <slot :closeDialog="close" :isActive="active"> </slot>
          </div>
        </div>
      </div>
    </template>
  </transition>
</template>
