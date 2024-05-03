<script setup>
import { computed, toRefs, useSlots } from 'vue'
import { IconCheck } from '@/components/Icon/index'
import { useError, useCheckbox, useFunctionRef, useTheme } from '@/composables'

const slots = useSlots()

const props = defineProps({
  id: { type: String, required: true },
  modelValue: { type: [String, Number, Boolean] },
  options: { type: Array, default: () => [false, true], validator: (values) => values.length >= 2 },
  circle: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
})

const emit = defineEmits(['update:modelValue'])

const { functionRef, element } = useFunctionRef()
const { id, modelValue, options } = toRefs(props)
const { error } = useError(id, element)
const { localValue, handleToggle } = useCheckbox(id, modelValue, options, emit)
const theme = useTheme(computed(() => {}))
// 라벨, 옵션,
const shape = computed(() => {
  if (!props.circle) {
    return 'w-[18px] h-[18px] rounded-[2px]'
  } else {
    return 'w-[20px] h-[20px] rounded-full'
  }
})

const color = computed(() => {
  if (props.disabled) {
    return `text-white ${theme.value.disabled}`
  } else {
    if (error.value) {
      if (localValue.value) {
        return `${theme.value.error.bg} text-white`
      } else if (!localValue.value) {
        return `${theme.value.error.border} ${theme.value.error.textLite}`
      }
    } else {
      if (localValue.value) {
        return `${theme.value.primary.bg} text-white`
      } else if (!localValue.value) {
        return 'border border-[#D4D4D4] text-[#E5E5E5]'
      }
    }
  }
})
const handleCheck = () => {
  if (!props.disabled) {
    handleToggle()
  }
}
</script>
<template>
  <div class="flex items-center justify-center">
    <div>
      <input :ref="functionRef" type="checkbox" :id="id" class="hidden" :checked="localValue" @input="handleCheck" :disabled="disabled" />
      <label :for="id" class="inline-block cursor-pointer select-none text-[14px] leading-[22px]">
        <div class="flex h-[24px] items-center" :class="slots.default ? 'space-x-[8px]' : ''">
          <div :class="[shape, color]" class="flex items-center justify-center">
            <IconCheck class="h-[16px]"></IconCheck>
          </div>
          <div :class="[error ? theme.error.text : theme.text.color]">
            <slot></slot>
          </div>
        </div>
      </label>
    </div>
  </div>
</template>
