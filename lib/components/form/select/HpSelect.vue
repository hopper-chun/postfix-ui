<script setup>
import { toRefs, computed } from 'vue'
import useError from '@/composables/useError'
import useSelect from '@/composables/useSelect'

const props = defineProps({
  id: { type: String },
  label: { type: String },
  modelValue: { type: [String, Number, Object] },
  options: { type: Array, required: true },
  optionsLabel: { type: Function, default: (option) => option },
  optionsValue: { type: Function, default: (option) => option },
  disabled: { type: Boolean, default: false },
  required: { type: Boolean, default: false },
  defaultLabel: { type: String, default: '선택해주세요' },
  size: { type: String, default: 'md', validator: (value) => ['xs', 'sm', 'md'].indexOf(value) !== -1 },
  rounded: { type: String },
})

const emit = defineEmits(['update:modelValue'])

const { id, modelValue, options } = toRefs(props)
const { rootRef, error } = useError(id)
const { localValue, handleChange } = useSelect(id, modelValue, options, props.optionsValue, emit)

const theme = computed(() => ({
  padding: { xs: 'pl-[16px] py-1', sm: 'px-2.5 py-1.5', md: 'px-3 py-2' }[props.size],
  textSize: { xs: 'text-sm sm:text-[14px]', sm: 'text-sm sm:text-sm', md: 'text-base sm:text-sm' }[props.size],
  iconSize: { xs: 'h-[18px] w-[18px]', sm: 'h-5 w-5', md: 'h-5 w-5' }[props.size],
  rounded: props.rounded || 'rounded-button',
}))
</script>
<template>
  <HpInputWrapper :id="id" :label="label" :required="required" :size="size">
    <select
      ref="rootRef"
      :id="id"
      class="block h-[48px] w-full text-[14px] focus:outline-none"
      :class="[
        !error ? ` ${theme.focus}  ${theme.borderColor}` : ` ${theme.error.text}  ${theme.error.border}`,
        disabled ? theme.disabled : '',
        theme.border,
        theme.padding,
        theme.textSize,
        theme.rounded,
      ]"
      :value="optionsValue(localValue)"
      @change="handleChange($event.target.value)"
      :disabled="disabled"
    >
      <option v-if="!modelValue" value="">{{ defaultLabel }}</option>
      <option v-for="option in options" :key="option" :value="optionsValue(option)">
        {{ optionsLabel(option) }}
      </option>
    </select>
  </HpInputWrapper>
</template>
