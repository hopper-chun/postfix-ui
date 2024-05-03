<script setup>
import { toRefs, ref, onMounted, computed, watchEffect } from 'vue'
import { IconCloseCircleFilled } from '@/components/icon/index'
import RmInput from './RmInput.vue'
import { useError, useInput, useTheme, useFunctionRef, useMakeId } from '@/composables'
import HelperText from '@/components/form/components/HelperText.vue'

const props = defineProps({
  id: { type: String },
  label: { type: String },
  type: { type: String, default: 'text' },
  modelValue: { type: [String, Number] },
  disabled: { type: Boolean, default: false },
  placeholder: { type: String },
  required: { type: Boolean, default: false },
  format: { type: Function, default: (o) => o },
  labelHelper: { type: String },
  helperText: { type: String },
  numberOnly: { type: Boolean, default: false },
  helperIcon: { type: Boolean, default: false },
  inputIcon: { type: Boolean, default: false },
  unit: { type: String },
  clear: { type: Boolean, default: false },
  showPassword: { type: Boolean, default: false },
  maxLength: { type: [String, Number] },
  styles: { type: Object },
  horizontal: { type: Boolean },
  labelWidth: { type: Number, default: 100 },
})
const emit = defineEmits(['update:modelValue'])

const theme = useTheme(computed(() => props.styles))

const randomId = useMakeId()
</script>

<template>
  <div class="space-y-[4px]">
    <component
      :is="theme.formWrapper()"
      :horizontal="horizontal"
      :labelWidth="labelWidth"
      :label="label"
      :labelFontSize="theme.label_fontSize"
      :labelFontColor="theme.label_fontColor"
      :labelHelper="labelHelper"
      :required="required"
      :id="randomId"
    >
      <div class="relative">
        <RmInput
          :id="randomId"
          :modelValue="modelValue"
          :disabled="disabled"
          :placeholder="placeholder"
          :required="required"
          :numberOnly="numberOnly"
          :inputIcon="inputIcon"
          :unit="unit"
          :clear="clear"
          :showPassword="showPassword"
          :maxLength="maxLength"
          :styles="styles"
          @update:modelValue="$emit('update:modelValue', $event)"
        ></RmInput>
      </div>
    </component>
  </div>
</template>
