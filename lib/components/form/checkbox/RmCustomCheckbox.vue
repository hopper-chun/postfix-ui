<script setup>
import { computed, toRefs, useSlots } from 'vue'
import { IconCheck } from '@/components/Icon/index'
import { useError, useCheckbox, useFunctionRef, useMakeId, useTheme } from '@/composables'

const slots = useSlots()

const props = defineProps({
  id: { type: String },
  classes: { type: [String, Array, Object] },
  activeClasses: { type: [String, Array, Object] },
  labelClasses: { type: [String, Array, Object] },
  modelValue: { type: [String, Number, Boolean, Array, Object] },
  options: { type: Array, default: () => [false, true], validator: (values) => values.length >= 2 },
  disabled: { type: Boolean, default: false },
  styles: { type: Object },
})

const emit = defineEmits(['update:modelValue'])

const { functionRef, element } = useFunctionRef()
const { id, modelValue, options } = toRefs(props)
const { error } = useError(id, element)
const { localValue, handleToggle } = useCheckbox(id, modelValue, options, emit)
const theme = useTheme(computed(() => props.styles))
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
        return props.activeClasses
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
const randomId = useMakeId()
</script>
<template>
  <div class="flex items-center justify-center">
    <div>
      <input :ref="functionRef" type="checkbox" :id="randomId" class="hidden" :checked="localValue" @input="handleCheck" :disabled="disabled" />
      <label :for="randomId" class="inline-block cursor-pointer select-none text-[14px] leading-[22px]">
        <div class="flex items-center" :class="slots.default ? 'space-x-[8px]' : ''">
          <div :class="[classes, color]" class="flex items-center justify-center">
            <slot name="icon">
              <IconCheck class="h-[16px]"></IconCheck>
            </slot>
          </div>
          <div :class="[error ? theme.error.text : labelClasses]">
            <slot></slot>
          </div>
        </div>
      </label>
    </div>
  </div>
</template>
