<script setup>
import { toRefs, useSlots } from 'vue'

import { useError, useMultiCheckbox, useFunctionRef } from '@/composables'

const props = defineProps({
  id: { type: String },
  modelValue: { type: [String, Number, Boolean, Array] },
  options: { type: Array, required: true },
  optionsLabel: { type: Function, default: (option) => option },
  optionsValue: { type: Function, default: (option) => option },
  disabled: { type: Boolean, default: false },
  row: { type: Boolean },
  label: { type: String },
  viewMode: { type: Boolean },
  labelHelper: { type: String },
  required: { type: Boolean, default: false },
  hover: { type: Boolean, default: true },
  md: { type: String },
})

const emit = defineEmits(['update:modelValue', 'onClickTooltip'])
const slots = useSlots()

const { functionRef, element } = useFunctionRef()
const { id, modelValue } = toRefs(props)
const { error } = useError(id, element)
const { localValue, handleCheck } = useMultiCheckbox(id, modelValue, emit)

const selected = (value) => {
  const found = localValue.value.findIndex((v) => v === value)

  if (found !== -1) {
    return true
  } else {
    return false
  }
}
</script>
<template>
  <div :class="[{ viewMode }]" class="labelSwitch" style="position: relative">
    <PxLabel
      v-if="label"
      :label="label"
      :hover="hover"
      :labelHelper="labelHelper"
      :required="required"
      :id="id"
      :md="md"
      @onClickTooltip="$emit('onClickTooltip', $event)"
    >
      <template v-if="!!slots.tooltip" #tooltip>
        <slot name="tooltip"></slot>
      </template>
    </PxLabel>
    <div class="px-multiCheckbox" :class="[{ isRow: row }]">
      <div v-for="(option, index) in options" style="font-size: 0px">
        <input
          :ref="functionRef"
          type="checkbox"
          :id="`${id}_${index}_${optionsValue(option)}`"
          style="display: none"
          :checked="localValue"
          @input="handleCheck($event.target.value)"
          :disabled="disabled || viewMode"
          :value="optionsValue(option)"
        />
        <label :for="`${id}_${index}_${optionsValue(option)}`" style="display: inline-block">
          <div class="px-checkbox--wrapper" :class="{ viewMode }">
            <div class="px-checkbox--box" :class="[{ disabled }, { error }, { selected: selected(optionsValue(option)) }]"></div>
            <div class="px-checkbox--text" :class="[{ error }, { hasText: optionsLabel(option) }]">
              {{ optionsLabel(option) }}
            </div>
          </div>
        </label>
      </div>
    </div>
  </div>
</template>
