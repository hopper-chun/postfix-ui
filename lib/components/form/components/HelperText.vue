<script setup>
import { ref, computed } from 'vue'
import { useTheme } from '@/composables'
import { RmError } from '@/components/element/error'

const props = defineProps({
  id: { type: String },
  helperText: { type: String },
  helperIcon: { type: Boolean, default: false },
  maxLength: { type: [String, Number] },
  localValue: { type: [String, Number] },
  error: { type: String },
})

const theme = useTheme(computed(() => {}))
</script>
<template>
  <div class="rm-helperText">
    <div class="rm-helperText--wrapper">
      <template v-if="error">
        <RmError :id="id"></RmError>
      </template>
      <template v-else>
        <div v-if="helperIcon" class="rm-helperText--icon">
          <slot name="helperIcon"></slot>
        </div>
        <div class="rm-helperText--text" v-html="helperText"></div
      ></template>
    </div>
    <div v-if="maxLength" class="rm-helperText--length" :class="theme.subFontSize">{{ localValue.length }}/{{ maxLength }}</div>
  </div>
</template>
