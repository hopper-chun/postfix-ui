<script setup>
import { ref, computed, useSlots } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { useTooltipDialog } from '@/composables'

const { setTooltip } = useTooltipDialog()

const props = defineProps({
  label: { type: String },
  labelHelper: { type: String },
  id: { type: String },
  required: { type: Boolean },
  hover: { type: Boolean, default: true },
  md: { type: String },
})

const emit = defineEmits(['onClickTooltip'])

const slots = useSlots()

const isTooltipClick = ref(false)

const useTooltip = computed(() => {
  if (!!slots.tooltip || props.md) {
    return true
  } else false
})

const tooltipRef = ref(null)

const tooltipContentRef = ref(null)

const isTooltipHover = ref(false)

const handleTooltipClick = () => {
  if (props.md) {
    setTooltip(tooltipContentRef.value.innerHTML)
  } else {
    emit('onClickTooltip', tooltipContentRef.value.innerHTML)

    isTooltipClick.value = !isTooltipClick.value
  }
}

// 클릭이 들어오면 클릭을 따른다.
// 클릭이 없으면 호버를 따른다
const isActive = computed(() => {
  if (!props.hover) {
    return isTooltipClick.value
  }
  if (isTooltipClick.value) {
    return true
  } else {
    return isTooltipHover.value
  }
})

const tooltipHover = () => {
  if (!props.hover) {
    return
  }
  isTooltipHover.value = true
}

const tooltipLeave = () => {
  if (!props.hover) {
    return
  }
  isTooltipHover.value = false
}

onClickOutside(tooltipRef, (event) => {
  if (isActive.value) {
    isTooltipClick.value = false
  }
})
</script>
<template>
  <div v-if="label" class="px-label">
    <label :for="id" class="px-label--text">
      {{ label }}
      <span v-if="required" class="px-label--required"></span>
    </label>
    <div v-if="labelHelper" class="px-label--helper">{{ labelHelper }}</div>

    <!-- 이만큼을 speechBubble로 만들고? -->
    <div v-if="useTooltip" ref="tooltipRef" :class="{ isHover: isActive }" class="px-label--tooltipContainer">
      <button class="px-label--tooltipIcon" @click="handleTooltipClick"></button>

      <div class="px-label--tooltipWrapper">
        <div class="px-label--tooltip" ref="tooltipContentRef">
          <slot name="tooltip">{{ md }}</slot>
        </div>
      </div>
    </div>
  </div>
</template>
