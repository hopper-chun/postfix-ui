<script setup>
import { computed } from 'vue'
const props = defineProps({
  type: { type: String, default: 'button' },
  textAlign: { type: String },
  size: {
    type: String,
    default: 'md',
  },
})

const order = computed(() => {
  if (props.textAlign === 'right') {
    return '3'
  } else if (props.textAlign === 'centerRight') {
    return '3'
  } else {
    return '1'
  }
})
</script>

<template>
  <button :type="type" class="rm-smIconButton">
    <div class="rm-smIconButton--icon" :style="`order : ${order}`">
      <slot name="icon"></slot>
    </div>
    <div class="rm-smIconButton--text" style="order: 2">
      <slot></slot>
    </div>
  </button>
</template>
