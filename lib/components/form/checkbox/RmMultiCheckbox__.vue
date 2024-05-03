<script setup>
import { computed, nextTick, onMounted, toRefs } from 'vue'
import { IconCheck } from '@/components/Icon/index'
import { useError, useMultiCheckbox, useFunctionRef, useTheme } from '@/composables'

const props = defineProps({
  id: { type: String },
  modelValue: { type: [String, Number, Boolean, Array] },
  options: { type: Array },
  optionsLabel: { type: Function, default: (option) => option },
  optionsValue: { type: Function, default: (option) => option },
  circle: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  inline: { type: Boolean, default: true },
  label: { type: String },
})

const emit = defineEmits(['update:modelValue'])

const { functionRef, element } = useFunctionRef()
const { id, modelValue } = toRefs(props)
const { error } = useError(id, element)
const { localValue, handleCheck } = useMultiCheckbox(id, modelValue, emit)
const theme = useTheme(computed(() => {}))
// 라벨, 옵션,
const shape = computed(() => {
  if (!props.circle) {
    return 'w-[18px] h-[18px] rounded-[2px]'
  } else {
    return 'w-[24px] h-[24px] rounded-full'
  }
})

const color = (value) => {
  if (props.disabled) {
    return `text-white ${theme.value.disabled}`
  } else {
    const found = localValue.value.findIndex((v) => v === value)
    if (error.value) {
      if (found !== -1) {
        return `${theme.value.error.bg} text-white`
      } else {
        return `${theme.value.error.border} ${theme.value.error.textLite}`
      }
    } else {
      if (found !== -1) {
        return `${theme.value.primary.bg} text-white`
      } else {
        return 'border border-[#D4D4D4] text-[#E5E5E5]'
      }
    }
  }
}
</script>
<template>
  <div class="flex space-x-[20px]" :class="[inline ? 'flex-row items-center space-x-[20px]' : 'flex-col items-start']">
    <div v-for="(option, index) in options">
      <input
        :ref="functionRef"
        type="checkbox"
        :id="`${id}_${index}_${optionsValue(option)}`"
        class="hidden"
        :checked="localValue"
        @input="handleCheck($event.target.value)"
        :disabled="disabled"
        :value="optionsValue(option)"
      />
      <label :for="`${id}_${index}_${optionsValue(option)}`" class="-mt-[2px] text-[14px] leading-[22px]">
        <div class="flex h-[24px] items-center space-x-[8px]">
          <div :class="[shape, color(optionsValue(option))]" class="flex items-center justify-center">
            <IconCheck class="h-[18px]"></IconCheck>
          </div>
          <div :class="[error ? theme.error.text : theme.text.color]">
            {{ optionsLabel(option) }}
          </div>
        </div>
      </label>
    </div>
  </div>
</template>
