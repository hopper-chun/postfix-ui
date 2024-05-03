<script setup>
import { PxError } from '@/components/element/error'

const props = defineProps({
  id: { type: String },
  helperText: { type: String },
  helperIcon: { type: Boolean, default: false },
  maxLength: { type: [String, Number] },
  localValue: { type: [String, Number] },
  error: { type: String },
})
</script>
<template>
  <div class="px-helperText">
    <div class="px-helperText--wrapper">
      <template v-if="error">
        <PxError :id="id"></PxError>
      </template>
      <template v-else>
        <div v-if="helperIcon" class="px-helperText--icon">
          <slot name="helperIcon"></slot>
        </div>
        <div class="px-helperText--text" v-html="helperText"></div
      ></template>
    </div>
    <div v-if="maxLength" class="px-helperText--length">{{ localValue.length }}/{{ maxLength }}</div>
  </div>
</template>
