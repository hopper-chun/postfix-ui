<script setup>
import { computed } from 'vue'
const props = defineProps({
  size: { type: [String, Number], require: true },
  radius: { type: [String, Number] },
  unit: { type: String, default: 'px' },
})
const computedRadius = computed(() => {
  if (props.radius) {
    if (props.radius === 'full') {
      return 'rounded-full'
    } else {
      return `rounded-[${props.radius}px]`
    }
  } else {
    return ''
  }
})
</script>
<template>
  <span :class="[computedRadius]" class="inline-block" :style="[`width:${size}${unit}; height:${size}${unit}`]">
    <slot></slot>
  </span>
</template>
