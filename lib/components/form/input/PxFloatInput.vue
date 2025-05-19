<script setup>
import { toRefs, ref, computed, onMounted } from 'vue'
import { useError, useInput, useFunctionRef, useMakeId } from '@/composables'
import HelperText from '@/components/form/components/HelperText.vue'

const props = defineProps({
  id: { type: String },
  label: { type: String, required: true },
  type: { type: String, default: 'text' },
  modelValue: { type: [Number, String] },
  disabled: { type: Boolean, default: false },
  format: { type: Function, default: (o) => o },
  inputIcon: { type: Boolean, default: false },
  numberOnly: { type: Boolean, default: false },
  helperText: { type: String },
  unit: { type: String },
  clear: { type: Boolean, default: false },
  showPassword: { type: Boolean, default: false },
  maxLength: { type: [String, Number] },
})
const emit = defineEmits(['update:modelValue', 'onBlur'])

const clientWidth = ref(0)
const decorationPadding = computed(() => {
  return 20 + clientWidth.value + 'px'
})

const handleClear = () => {
  localValue.value = ''
  emit('update:modelValue', localValue.value)
}
const passwordInputState = ref('password')
const handleShow = () => {
  if (inputRef.value.type === 'password') {
    inputRef.value.type = 'text'
    passwordInputState.value = 'text'
  } else if (inputRef.value.type === 'text') {
    inputRef.value.type = 'password'
    passwordInputState.value = 'password'
  }
}
const { functionRef: innerRefFunc, element: innerRef } = useFunctionRef()
const { functionRef: inputRefFunc, element: inputRef } = useFunctionRef()

const { id, modelValue, format } = toRefs(props)
const { error } = useError(id, inputRef)
const { isFocused, localValue, handleInput, handleFocus, handleBlur } = useInput(id, modelValue, format, emit)

const resizeObserver = new ResizeObserver((entries) => {
  if (entries.length === 0) {
    return
  }
  clientWidth.value = entries[0].contentRect.width
})

onMounted(() => {
  resizeObserver.observe(innerRef.value)
})

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
  <div class="px-floatInput">
    <div class="px-floatInput--wrapper">
      <div style="height: 100%; width: 100%; position: relative">
        <input
          :ref="inputRefFunc"
          placeholder=" "
          :style="`padding-right:${decorationPadding}`"
          class="px-input--field"
          :class="[{ disabled }, { error }, { inputIcon }]"
          :id="randomId"
          :type="type"
          :placeholder="placeholder"
          :disabled="disabled"
          :value="localValue"
          @input="handleInput($event, { numberOnly })"
          @focus="handleFocus"
          @blur="handleBlur"
          autocomplete="off"
          :maxlength="maxLength"
        />
        <label :for="randomId" class="px-floatInput--label" :class="[{ inputIcon }, { isFloating }]">{{ label }}</label>
        <div :ref="innerRefFunc" class="px-input--funcWrapper">
          <div v-if="unit" class="px-input--unit">
            <span v-show="localValue">{{ unit }}</span>
          </div>
          <div class="px-input--button">
            <button v-if="showPassword" @click="handleShow" class="show_password">
              <div v-if="passwordInputState === 'password'" class="show_password__icon pw_show"></div>
              <div v-else class="show_password__icon pw_hidden"></div>
            </button>

            <button v-if="clear" @click="handleClear" class="clear">
              <div class="clear__icon"></div>
            </button>
          </div>
        </div>

        <div v-if="inputIcon" class="px-input--inputIcon">
          <slot name="inputIcon"></slot>
        </div>
      </div>

    </div>

    <HelperText :id="id" :error="error" :helperText="helperText" :maxLength="maxLength" :localValue="localValue">
      <template #helperIcon> <slot name="helperIcon"></slot> </template>
    </HelperText>
  </div>
</template>
