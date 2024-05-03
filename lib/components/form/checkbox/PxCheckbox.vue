<script setup>
import { toRefs, useSlots } from 'vue'
import { useError, useCheckbox, useFunctionRef } from '@/composables'

const slots = useSlots()

const props = defineProps({
  id: { type: String, required: true },
  modelValue: { type: [String, Number, Boolean] },
  options: { type: Array, default: () => [false, true], validator: (values) => values.length >= 2 },
  disabled: { type: Boolean, default: false },
})

const emit = defineEmits(['update:modelValue'])

const { functionRef, element } = useFunctionRef()
const { id, modelValue, options } = toRefs(props)
const { error } = useError(id, element)
const { localValue, handleToggle } = useCheckbox(id, modelValue, options, emit)

const handleCheck = () => {
  if (!props.disabled) {
    handleToggle()
  }
}
</script>
<template>
  <div class="px-checkbox">
    <input :ref="functionRef" type="checkbox" :id="id" :checked="localValue" @input="handleCheck" :disabled="disabled" style="display: none" />
    <label :for="id" style="display: inline-block">
      <div class="px-checkbox--wrapper" :class="[{ disabled }]">
        <div class="px-checkbox--box" :class="[{ selected: localValue }, { disabled }, { error }]"></div>
        <div class="px-checkbox--text" :class="[{ error }, { hasText: slots.default }]">
          <slot></slot>
        </div>
      </div>
    </label>
  </div>
</template>
