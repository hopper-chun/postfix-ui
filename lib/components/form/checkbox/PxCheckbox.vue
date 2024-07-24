<script setup>
import { toRefs, useSlots } from 'vue'
import { useError, useCheckbox, useFunctionRef } from '@/composables'

const slots = useSlots()

const props = defineProps({
  id: { type: String, required: true },
  modelValue: { type: [String, Number, Boolean] },
  options: { type: Array, default: () => [false, true], validator: (values) => values.length >= 2 },
  disabled: { type: Boolean, default: false },
  viewMode: { type: Boolean, default: false },
  label: { type: String },
  labelHelper: { type: String },
  required: { type: Boolean, default: false },
  hover: { type: Boolean, default: true },
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
  <div :class="[{ viewMode }]" style="position: relative">
    <PxLabel v-if="label" :label="label" :hover="hover" :labelHelper="labelHelper" :required="required" :id="id">
      <template v-if="!!slots.tooltip" #tooltip>
        <slot name="tooltip"></slot>
      </template>
    </PxLabel>
    <div class="px-checkbox">
      <input :ref="functionRef" type="checkbox" :id="id" :checked="localValue" @input="handleCheck" :disabled="disabled || viewMode" style="display: none" />
      <label :for="id" style="display: inline-block">
        <div class="px-checkbox--wrapper" :class="[{ disabled, viewMode }]">
          <div class="px-checkbox--box" :class="[{ selected: localValue }, { disabled }, { error }]"></div>
          <div class="px-checkbox--text" :class="[{ error }, { hasText: slots.default }]">
            <slot></slot>
          </div>
        </div>
      </label>
    </div>
  </div>
</template>
