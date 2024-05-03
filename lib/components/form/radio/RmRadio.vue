<script setup>
import { toRefs, computed } from 'vue'
import { useError, useInput, useTheme } from '@/composables'
import { RmLabel } from '@/components/element'

const props = defineProps({
  id: { type: String },
  modelValue: { type: [String, Number] },
  disabled: { type: Boolean, default: false },
  format: { type: Function, default: (o) => o },
  options: { type: Array },
  optionsLabel: { type: Function, default: (option) => option },
  optionsValue: { type: Function, default: (option) => option },
  isRow: { type: Boolean, default: false },
  label: { type: String },
  required: { type: Boolean, default: false },
  viewMode: { type: Boolean },
})
const emit = defineEmits(['update:modelValue'])

const { id, modelValue, format } = toRefs(props)
const { rootRef, error } = useError(id)
const { localValue, handleInput } = useInput(id, modelValue, format, emit)

const currentOption = computed(() => {
  let curOption
  props.options.forEach((option) => {
    if (Array.isArray(option)) {
      if (option.includes(props.modelValue)) {
        curOption = props.optionsLabel(option)
      }
    } else if (typeof option === 'string') {
      console.log('option 이 String임')
      return
    } else {
      if (props.modelValue === props.optionsValue(option)) {
        curOption = props.optionsLabel(option)
      }
    }
  })
  return curOption
})
</script>

<template>
  <div class="rm-radio">
    <RmLabel :label="label" :required="required" :id="id"></RmLabel>
    <div v-if="viewMode">
      <div class="rm-input--view_text">{{ currentOption }}</div>
    </div>
    <div v-else ref="rootRef" class="rm-radio--wrapper" :class="[{ isRow }, { error }, { disabled }]">
      <label v-for="(option, index) in options" :for="`${id}_${index}_${optionsValue(option)}`">
        <input
          :id="`${id}_${index}_${optionsValue(option)}`"
          :name="id"
          :disabled="disabled"
          type="radio"
          style="display: none"
          @input="handleInput"
          :value="optionsValue(option)"
          :key="optionsValue(option)"
          v-model="localValue"
        />

        <div style="display: flex; align-items: center">
          <span v-if="localValue === optionsValue(option)" class="rm-radio-box selected">
            <span class="dot"></span>
          </span>
          <span v-else class="rm-radio-box"></span>
          <span class="rm-radio-text" :class="[{ hasText: optionsLabel(option) }]"> {{ optionsLabel(option) }} </span>
        </div>
      </label>
    </div>
  </div>
</template>
