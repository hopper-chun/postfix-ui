<script setup>
import { computed } from 'vue'
import { useTheme } from '@/composables'
const props = defineProps({
  type: { type: String, default: 'button' },
  classes: { type: [String, Array, Object] },
  styles: { type: Object },
  disabled: { type: Boolean },
  isFull: { type: Boolean },
  cursorless: { type: Boolean },
})

const theme = useTheme(computed(() => props.styles))
</script>
<template>
  <button
    :type="type"
    class="flex items-center justify-center text-[14px]"
    :class="[cursorless ? 'cursor-none' : disabled ? 'cursor-default' : 'cursor-pointer', classes, theme.radius, theme.hover]"
  >
    <slot></slot>
  </button>
</template>
