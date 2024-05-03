<script setup>
import { RmLabel } from '.'
// import { useTheme } from '@/composables'
const props = defineProps({
  id: { type: String },
  required: { type: Boolean },
  label: { type: String },
  labelHelper: { type: String },
  viewMode: { type: Boolean },
})
</script>
<template>
  <div class="rm-formForView">
    <div v-if="viewMode" class="rm-formForView--view" :class="[{ viewMode }]">
      <RmLabel :id="id" :label="label" :labelHelper="labelHelper"> </RmLabel>
    </div>
    <div v-else class="rm-formForView--edit">
      <RmLabel :label="label" :required="required" :labelHelper="labelHelper"> </RmLabel>
    </div>
    <div class="rm-formForView--body" :class="[{ viewMode }]">
      <slot></slot>
    </div>
  </div>
</template>
