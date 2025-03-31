<script setup>
import { toRefs, useSlots } from 'vue'
import { useError, useInput } from '@/composables'

const props = defineProps({
  id: { type: String },
  modelValue: { type: [String, Number] },
  disabled: { type: Boolean, default: false },
  format: { type: Function, default: (o) => o },
  options: { type: Array },
  optionsLabel: { type: Function, default: (option) => option },
  optionsValue: { type: Function, default: (option) => option },
  row: { type: Boolean, default: false },
  label: { type: String },
  labelHelper: { type: String },
  required: { type: Boolean, default: false },
  viewMode: { type: Boolean },
  hover: { type: Boolean, default: true },
  md: { type: String },
})
const emit = defineEmits(['update:modelValue', 'onClickTooltip'])
const slots = useSlots()

const { id, modelValue, format } = toRefs(props)
const { rootRef, error } = useError(id)
const { localValue, handleInput } = useInput(id, modelValue, format, emit)
</script>

<template>
  <div class="px-radio labelSwitch" :class="{ viewMode }">
    <PxLabel :md="md" :label="label" :labelHelper="labelHelper" :required="required" :hover="hover" :id="id" @onClickTooltip="$emit('onClickTooltip', $event)">
      <template v-if="!!slots.tooltip" #tooltip>
        <slot name="tooltip"></slot>
      </template>
    </PxLabel>

    <div ref="rootRef" class="px-radio--wrapper" :class="[{ isRow: row }, { error }, { disabled }]">
      <label v-for="(option, index) in options" :for="`${id}_${index}_${optionsValue(option)}`">
        <input
          :id="`${id}_${index}_${optionsValue(option)}`"
          :name="id"
          :disabled="disabled || viewMode"
          type="radio"
          style="display: none"
          @input="handleInput"
          :value="optionsValue(option)"
          :key="optionsValue(option)"
          v-model="localValue"
        />

        <div style="display: flex; align-items: center">
          <span v-if="localValue === optionsValue(option)" class="px-radio-box selected">
            <span class="dot"></span>
          </span>
          <span v-else class="px-radio-box"></span>
          <span class="px-radio-text" :class="[{ hasText: optionsLabel(option) }]"> {{ optionsLabel(option) }} </span>
        </div>
      </label>
    </div>
  </div>
</template>
