<script setup>
import { useTheme } from '@/composables'

const props = defineProps({
  isBold: { type: Boolean },
})
const emit = defineEmits(['update:modelValue'])
const theme = useTheme()
</script>

<template>
  <span :class="[{ 'font-bold': isBold }, theme.text_base, theme.leading]">
    <slot></slot>
  </span>
</template>
