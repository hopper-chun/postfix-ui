<script setup>
import { toRefs } from 'vue'
import { useError, useInput, useTheme } from '@/composables'

const props = defineProps({
  id: { type: String },
  modelValue: { type: [String, Number] },
  disabled: { type: Boolean, default: false },
  format: { type: Function, default: (o) => o },
  classes: { type: [String, Array, Object] },
  outerClasses: { type: [String, Array, Object] },
  activeClasses: { type: [String, Array, Object] },
  innerClasses: { type: [String, Array, Object] },
  labelClasses: { type: [String, Array, Object] },
  options: { type: Array },
  optionsLabel: { type: Function, default: (option) => option },
  optionsValue: { type: Function, default: (option) => option },
})

const emit = defineEmits(['update:modelValue'])
const theme = useTheme()
const { id, modelValue, format } = toRefs(props)
const { rootRef, error } = useError(id)
const { localValue, handleInput } = useInput(id, modelValue, format, emit)
</script>

<template>
  <div class="w-full space-y-[4px]">
    <div class="relative">
      <div
        ref="rootRef"
        :class="[
          !error ? ` ${theme.text.color} ${theme.focus}` : ` ${theme.error.text} ${theme.error.border}`,
          classes ? classes : 'flex h-[48px] w-full items-center justify-center space-x-[16px] rounded-[4px] bg-white px-[16px] pl-[16px] text-[14px]',
        ]"
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

          <div class="flex items-center">
            <span
              v-if="localValue === optionsValue(option)"
              class="flex items-center justify-center rounded-full border"
              :class="[outerClasses, activeClasses]"
            >
              <span class="rounded-full" :class="innerClasses"></span>
            </span>
            <span v-else class="rounded-full border border-[#D4D4D4]" :class="outerClasses"></span>
            <span :class="labelClasses"> {{ optionsLabel(option) }} </span>
          </div>
        </label>
      </div>
    </div>
  </div>
</template>
