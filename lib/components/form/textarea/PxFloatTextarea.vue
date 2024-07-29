<script setup>
import { computed, toRefs } from 'vue'
import { useError, useTextarea, useFunctionRef, useMakeId } from '@/composables'
import HelperText from '@/components/form/components/HelperText.vue'

const props = defineProps({
  id: { type: String },
  label: { type: String },
  modelValue: { type: [String, Number], required: true },
  disabled: { type: Boolean, default: false },
  helperText: { type: String },
  resize: { type: Boolean, default: false },
  rows: { type: Number },
  maxlength: { type: [String, Number] },
  autoGrow: { type: Boolean, default: false },
})
const emit = defineEmits(['update:modelValue', 'onBlur'])

const { functionRef: inputRefFunc, element: inputRef } = useFunctionRef()
const { functionRef: containerRefFunc, element: containerRef } = useFunctionRef()

const { id, modelValue } = toRefs(props)
const { error } = useError(id, inputRef)
const { isFocused, localValue, handleInput, handleFocus, handleBlur } = useTextarea(id, modelValue, emit)

const isFloating = computed(() => {
  if (isFocused.value === true || localValue.value || localValue.value === 0) {
    return true
  } else {
    return false
  }
})

const randomId = useMakeId()
</script>

<template>
  <div class="px-floatTextarea">
    <div :ref="containerRefFunc" style="width: 100%">
      <div class="px-floatTextarea--wrapper" :class="[{ disabled }, { error }]">
        <textarea
          :ref="inputRefFunc"
          placeholder=" "
          :disabled="disabled"
          :value="localValue"
          @focus="handleFocus"
          @blur="handleBlur"
          @input="handleInput($event.target.value)"
          :id="randomId"
          :rows="rows"
          class="px-input--field"
          spellcheck="false"
          :maxlength="maxlength"
        ></textarea>
        <label :for="randomId" class="px-floatTextarea--label" :class="[{ isFloating }]">{{ label }}</label>
      </div>
      <HelperText :id="id" :error="error" :helperText="helperText" :maxLength="maxlength" :localValue="localValue">
        <template #helperIcon> <slot name="helperIcon"></slot> </template>
      </HelperText>
    </div>
  </div>
</template>
