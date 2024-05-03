<script setup>
import { computed } from 'vue'
import { useTheme } from '@/composables'

const props = defineProps({
  isBold: { type: Boolean },
  size: { type: String, default: 'sm' },
  mobile: { type: String },
})
const theme = useTheme()

const computedSize = computed(() => {
  if (props.size === 'xs') {
    return theme.value.text_xs
  } else if (props.size === 'sm') {
    return theme.value.text_sm
  } else if (props.size === 'md') {
    return theme.value.text_md
  } else if (props.size === 'lg') {
    return theme.value.text_lg
  } else if (props.size === 'xl') {
    return theme.value.text_xl
  }
})
</script>

<template>
  <span :class="[{ 'font-bold': isBold }, mobile ? `sm:${computedSize} ${computedMobileSize}` : computedSize, theme.leading]">
    <slot></slot>
  </span>
</template>
