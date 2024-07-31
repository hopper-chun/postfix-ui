<script setup>
import { toRefs, useSlots } from 'vue'
import { useError, useInput, useFunctionRef } from '@/composables'
import HelperText from '@/components/form/components/HelperText.vue'

const props = defineProps({
  id: { type: String },
  label: { type: String },
  modelValue: { type: [String, Number] },
  disabled: { type: Boolean, default: false },
  required: { type: Boolean, default: false },
  format: { type: Function, default: (o) => o },
  labelHelper: { type: String },
  helperText: { type: String },
  options: { type: Array },
  optionsLabel: { type: Function, default: (option) => option },
  optionsValue: { type: Function, default: (option) => option },
  row: { type: Boolean },
  viewMode: { type: Boolean },
  hover: { type: Boolean, default: true },
})
const emit = defineEmits(['update:modelValue', 'onClickTooltip'])
const slots = useSlots()

const { functionRef, element } = useFunctionRef()
const { id, modelValue, format } = toRefs(props)
const { error } = useError(id, element)
const { localValue } = useInput(id, modelValue, format, emit)
</script>

<template>
  <div class="px-inputRadio">
    <div :class="{ viewMode }">
      <div class="labelSwitch">
        <PxLabel :label="label" :hover="hover" :labelHelper="labelHelper" :required="required" :id="id" @onClickTooltip="$emit('onClickTooltip', $event)">
          <template v-if="!!slots.tooltip" #tooltip>
            <slot name="tooltip"></slot>
          </template>
        </PxLabel>
        <div style="position: relative">
          <div :ref="functionRef" class="px-input--field" :class="[{ disabled }, { error }]">
            <PxRadio
              v-model="localValue"
              @update:modelValue="$emit('update:modelValue', $event)"
              :disabled="disabled"
              :required="required"
              :name="id"
              :format="format"
              :options="options"
              :optionsLabel="optionsLabel"
              :optionsValue="optionsValue"
              :row="row"
              :viewMode="viewMode"
            ></PxRadio>
          </div>
        </div>
      </div>
      <HelperText :id="id" :error="error" :helperText="helperText" :localValue="localValue">
        <template #helperIcon> <slot name="helperIcon"></slot> </template>
      </HelperText>
    </div>
  </div>
</template>
