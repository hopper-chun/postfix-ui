<script setup>
// import { useTheme } from '@/composables'
// const theme = useTheme()
const props = defineProps({
  label: { type: String },
  labelHelper: { type: String },
  id: { type: String },
  required: { type: Boolean },
})
</script>
<template>
  <div v-if="label" class="px-label">
    <label :for="id" class="px-label--text">
      {{ label }}
      <span v-if="required" class="px-label--required"></span>
    </label>
    <div v-if="labelHelper" class="px-label--helper">{{ labelHelper }}</div>
  </div>
</template>
