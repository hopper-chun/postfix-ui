<script setup>
import { toRefs, computed } from 'vue'
import { useError, useInput, useTheme, useFunctionRef, useMakeId } from '@/composables'
import { RmRadio } from '@/components'
import HelperText from '@/components/form/components/HelperText.vue'
import RmLabel from '@/components/element/label/RmLabel.vue'

const props = defineProps({
  id: { type: String },
  label: { type: String },
  modelValue: { type: [String, Number] },
  disabled: { type: Boolean, default: false },
  required: { type: Boolean, default: false },
  format: { type: Function, default: (o) => o },
  labelHelper: { type: String },
  helperText: { type: String },
  helperIcon: { type: Boolean, default: false },
  options: { type: Array },
  optionsLabel: { type: Function, default: (option) => option },
  optionsValue: { type: Function, default: (option) => option },
  isRow: { type: Boolean },
  viewMode: { type: Boolean },
})
const emit = defineEmits(['update:modelValue'])
const theme = useTheme(computed(() => props.styles))
const { functionRef, element } = useFunctionRef()
const { id, modelValue, format } = toRefs(props)
const { error } = useError(id, element)
const { localValue, handleInput } = useInput(id, modelValue, format, emit)

const currentOption = computed(() => {
  let curOption
  props.options.forEach((option) => {
    if (Array.isArray(option)) {
      if (option.includes(props.modelValue)) {
        curOption = props.optionsLabel(option)
      }
    } else if (typeof option === 'string') {
      console.log('option 이 String임')
      return
    } else {
      if (props.modelValue === props.optionsValue(option)) {
        curOption = props.optionsLabel(option)
      }
    }
  })
  return curOption
})

const randomId = useMakeId()
</script>

<template>
  <div class="rm-inputRadio">
    <template v-if="viewMode">
      <div class="rm-input--view" :class="[{ viewMode }]">
        <RmLabel :id="id" :label="label" :labelHelper="labelHelper"> </RmLabel>
        <div class="rm-input--view_text">
          {{ currentOption }}
        </div>
      </div>
    </template>
    <template v-else>
      <div class="w-full">
        <RmLabel :label="label" :labelHelper="labelHelper" :required="required" :id="id"></RmLabel>
        <div class="relative">
          <div :ref="functionRef" class="rm-input--field" :class="[{ disabled }, { error }]">
            <RmRadio
              v-model="localValue"
              @update:modelValue="$emit('update:modelValue', $event)"
              :disabled="disabled"
              :required="required"
              :name="id"
              :format="format"
              :options="options"
              :optionsLabel="optionsLabel"
              :optionsValue="optionsValue"
              :isRow="isRow"
            ></RmRadio>
          </div>
        </div>
        <HelperText :id="id" :error="error" :helperText="helperText" :helperIcon="helperIcon" :localValue="localValue">
          <template #helperIcon> <slot name="helperIcon"></slot> </template>
        </HelperText>
      </div>
    </template>
  </div>
</template>
