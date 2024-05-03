<script setup>
import { computed } from 'vue'
import { useTheme, useThemeDefault } from '@/composables'

const props = defineProps({
  styles: { type: Object },
})
const theme = useTheme(computed(() => props.styles))
</script>
<template>
  <div>
    <div :class="theme.fontSize">테마 테스트</div>
    <div>
      <slot></slot>
    </div>
  </div>
</template>
