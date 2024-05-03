<script setup>
import { toRefs, computed } from 'vue'
import { useError, useInput, useTheme } from '@/composables'

const props = defineProps({
  id: { type: String },
  modelValue: { type: [String, Number] },
  disabled: { type: Boolean, default: false },
  format: { type: Function, default: (o) => o },
  options: { type: Array },
  optionsLabel: { type: Function, default: (option) => option },
  optionsValue: { type: Function, default: (option) => option },
  styles: { type: Object },
  isVertical: { type: Boolean, default: false },
  label: { type: String },
  required: { type: Boolean, default: false },
})
const emit = defineEmits(['update:modelValue'])

const { id, modelValue, format } = toRefs(props)
const { rootRef, error } = useError(id)
const { localValue, handleInput } = useInput(id, modelValue, format, emit)
const theme = useTheme(computed(() => props.styles))
</script>

<template>
  <div class="w-full space-y-[4px]">
    <div class="relative">
      <RmLabel :label="label" :labelFontSize="theme.label_fontSize" :labelFontColor="theme.label_fontColor" :required="required" :id="id"></RmLabel>
      <div
        ref="rootRef"
        class="w-full space-x-[16px] rounded-[4px] bg-white px-[16px] pl-[16px] text-[14px]"
        :class="[!error ? ` ${theme.text.color}` : `${theme.error.text}`, !props.isVertical ? 'flex h-[48px] items-center justify-center' : '']"
      >
        <label v-for="(option, index) in options" :for="`${id}_${index}_${optionsValue(option)}`">
          <input
            :id="`${id}_${index}_${optionsValue(option)}`"
            :name="id"
            :disabled="disabled"
            type="radio"
            class="hidden"
            @input="handleInput"
            :value="optionsValue(option)"
            :key="optionsValue(option)"
            v-model="localValue"
          />

          <div class="flex items-center space-x-[8px]">
            <span
              v-if="localValue === optionsValue(option)"
              class="flex h-[18px] w-[18px] items-center justify-center rounded-full border-[1px] border-black bg-white"
              ><span class="h-[10px] w-[10px] rounded-full bg-black"></span
            ></span>
            <span v-else class="h-[18px] w-[18px] rounded-full border border-[#D4D4D4] bg-white"></span>
            <span> {{ optionsLabel(option) }} </span>
          </div>
        </label>
      </div>
    </div>
  </div>
</template>
