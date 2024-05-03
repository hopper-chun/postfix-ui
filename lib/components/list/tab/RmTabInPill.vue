<script setup>
import { computed } from 'vue'
import { RmTab } from '.'
import { useTab, useTheme } from '@/composables'

const props = defineProps({
  modelValue: { type: [Object, String, Number, Boolean], required: true },
  options: { type: Array, required: true },
  optionsLabel: { type: Function, default: (option) => option },
  optionsValue: { type: Function, default: (option) => option },
})
// const emit = defineEmits(['update:modelValue'])

// const { handleChange } = useTab(emit)
</script>

<template>
  <div class="rm-tabInPill">
    <RmTab
      :modelValue="modelValue"
      @update:modelValue="$emit('update:modelValue', $event)"
      :options="options"
      :optionsLabel="optionsLabel"
      :optionsValue="optionsValue"
    ></RmTab>
  </div>
</template>
