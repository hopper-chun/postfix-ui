<script setup>
import { computed, toRefs } from 'vue'
import { useError, useTheme, useMakeId, useFunctionRef } from '@/composables'
import RmToggle from './RmToggle.vue'
import HelperText from '@/components/form/components/HelperText.vue'
import RmLabel from '@/components/element/label/RmLabel.vue'

const props = defineProps({
  id: { type: String },
  labelHelper: { type: String },
  helperText: { type: String },
  helperIcon: { type: Boolean, default: false },
  modelValue: { type: [String, Number, Boolean] },
  required: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  options: { type: Array, default: () => [false, true], validator: (values) => values.length >= 2 },
  label: { type: String, required: true },
  description: { type: String },
  icon: { type: Boolean, default: false },
})

const { functionRef, element } = useFunctionRef()
const theme = useTheme(computed(() => props.styles))
const { id } = toRefs(props)
const { error } = useError(id, element)

const randomId = useMakeId()
</script>

<template>
  <div>
    <RmLabel
      :label="label"
      :labelFontSize="theme.label_fontSize"
      :labelFontColor="theme.label_fontColor"
      :labelHelper="labelHelper"
      :required="required"
      :id="randomId"
    ></RmLabel>
    <div
      :ref="functionRef"
      class="flex w-full items-center justify-between"
      :class="[
        theme.fontSize,
        theme.paddingX,
        theme.height,
        theme.radius,
        theme.border,
        !error ? ` ${theme.borderColor} ${theme.focus}` : `${theme.error.text} ${theme.error.border}`,
      ]"
    >
      <div class="flex-1 leading-[22px] text-[#a3a3a3]" v-if="description">{{ description }}</div>
      <RmToggle
        :isSmall="true"
        :id="id"
        :modelValue="modelValue"
        @update:modelValue="$emit('update:modelValue', $event)"
        :options="options"
        :disabled="disabled"
      ></RmToggle>
    </div>
    <HelperText :id="id" :error="error" :helperText="helperText" :helperIcon="helperIcon">
      <template #helperIcon> <slot name="helperIcon"></slot> </template>
    </HelperText>
  </div>
</template>
