<script setup>
import { toRefs, useSlots } from 'vue'
import { useError, useMakeId, useFunctionRef } from '@/composables'
import HelperText from '@/components/form/components/HelperText.vue'

const props = defineProps({
  id: { type: String },
  labelHelper: { type: String },
  helperText: { type: String },
  helperIcon: { type: Boolean, default: false },
  modelValue: { type: [String, Number, Boolean] },
  prevent: { type: Boolean, default: false },
  required: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  options: { type: Array, default: () => [false, true], validator: (values) => values.length >= 2 },
  label: { type: String },
  description: { type: String },
  viewMode: { type: Boolean, default: false },
  hover: { type: Boolean, default: true },
})

const { functionRef, element } = useFunctionRef()
const slots = useSlots()

const { id } = toRefs(props)
const { error } = useError(id, element)

const randomId = useMakeId()
</script>

<template>
  <div class="px-toggle-form" :class="{ viewMode: viewMode }">
    <PxLabel :label="label" :labelHelper="labelHelper" :hover="hover" :required="required" :id="randomId">
      <template v-if="!!slots.tooltip" #tooltip>
        <slot name="tooltip"></slot>
      </template>
    </PxLabel>
    <div :ref="functionRef" class="px-input--field">
      <div class="px-toggle--description">
        <div v-if="description">{{ description }}</div>
      </div>
      <PxToggle
        :id="id"
        :modelValue="modelValue"
        @update:modelValue="$emit('update:modelValue', $event)"
        :options="options"
        :disabled="disabled"
        :prevent="prevent"
        :viewMode="viewMode"
      ></PxToggle>
    </div>
    <HelperText :id="id" :error="error" :helperText="helperText" :helperIcon="helperIcon">
      <template #helperIcon> <slot name="helperIcon"></slot> </template>
    </HelperText>
  </div>
</template>
