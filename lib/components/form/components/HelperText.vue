<script setup>
import { useSlots } from 'vue'
import { PxError } from '@/components/element/error'

const props = defineProps({
  id: { type: String },
  helperText: { type: String },
  maxLength: { type: [String, Number] },
  localValue: { type: [String, Number] },
  error: { type: String },
  maxLengthLabel: { type: Boolean, default: true }, // 인풋의 maxLength 수치를 가시화
})

const slots = useSlots()
</script>
<template>
  <div class="px-helperText">
    <div class="px-helperText--wrapper">
      <template v-if="error">
        <PxError :id="id"></PxError>
      </template>
      <template v-else>
        <div v-if="!!slots.helperIcon" class="px-helperText--icon">
          <slot name="helperIcon"></slot>
        </div>
        <div class="px-helperText--text" v-html="helperText"></div
      ></template>
    </div>
    <div v-if="maxLength && maxLengthLabel" class="px-helperText--length">{{ localValue.length }}/{{ maxLength }}</div>
  </div>
</template>
