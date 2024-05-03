<script setup>
import { computed } from 'vue'
import { useTheme } from '@/composables'

const props = defineProps({
  isBold: { type: Boolean },
})
const emit = defineEmits(['update:modelValue'])
const theme = useTheme()
</script>

<template>
  <span :class="[{ 'font-bold': isBold }, theme.text_xs, theme.leading]">
    <slot></slot>
  </span>
</template>
