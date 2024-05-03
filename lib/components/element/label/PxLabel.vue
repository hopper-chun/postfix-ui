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
  <div style="color: orange">label: {{ label }}</div>
  <!-- <div v-if="label" class="rm-label">
    <label :for="id" class="rm-label--text">
      {{ label }}
      <span v-if="required" class="rm-label--required"></span>
    </label>
    <div v-if="labelHelper" class="rm-label--helper">{{ labelHelper }}</div>
  </div> -->
</template>
