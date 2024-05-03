<script setup>
import { reactive, computed } from 'vue'
const props = defineProps({
  modelValue: { type: Number, required: true },
  min: { type: Number },
  max: { type: Number },
})
const emit = defineEmits(['update:modelValue'])
const mouseDown = reactive({
  startPos: 0,
  initLeft: 0,
})

const handleMouseDown = (event) => {
  mouseDown.startPos = event.x
  mouseDown.initLeft = props.modelValue
}
const handleMouseMove = (event) => {
  if (!mouseDown.startPos || !event.buttons) {
    return
  }

  emit('update:modelValue', mouseDown.initLeft + (mouseDown.startPos - event.x))
}
const handleMouseUp = () => {
  mouseDown.startPos = 0
  mouseDown.initLeft = 0
  if (props.modelValue > props.max) {
    emit('update:modelValue', props.max)
  } else if (props.modelValue < props.min) {
    emit('update:modelValue', props.min)
  }
  // 이 시점에서 modelValue가 max보다 크면 모델벨류를 max로, min보다 작으먄 min으로 올림 (modelValue는 한계 없이 늘고 줄어서, 한계값 이상의 modelValue가 들어오면 정상치로 돌아올 때까지 값을 조절하고 있어야 함)
}
const moveRange = computed(() => {
  let width = 0
  if (props.modelValue >= props.max) {
    width = props.max
  } else if (props.modelValue <= props.min) {
    width = props.min
  } else {
    width = props.modelValue
  }
  return width
})
</script>
<template>
  <div class="rm-verticalSeparator" @mousemove="handleMouseMove" @mouseup="handleMouseUp">
    <div class="rm-verticalSeparator--left">
      <slot name="left"></slot>
    </div>
    <div draggable="false" class="rm-verticalSeparator--bar" @mousedown="handleMouseDown" :style="`right: ${moveRange}px`">
      <div class="rm-verticalSeparator--bar_container">
        <div class="rm-verticalSeparator--icon"></div>
      </div>
    </div>
    <div class="rm-verticalSeparator--right" :style="`width: ${moveRange}px`">
      <slot name="right"></slot>
    </div>
  </div>
</template>
