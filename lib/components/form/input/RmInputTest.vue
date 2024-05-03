<script setup>
import { toRefs, ref, onMounted, computed, watchEffect } from 'vue'
import { useError, useInput, useTheme, useFunctionRef, useMakeId } from '@/composables'
import HelperText from '@/components/form/components/HelperText.vue'
import RmLabel from '@/components/element/label/RmLabel.vue'

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
  cursorless: { type: Boolean, default: false },
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
const { localValue, handleInput, handleFocus, handleBlur, handleHashtags, handleFocusout, handleKeyupPress } = useInput(id, modelValue, format, emit)
// 반응성을 주기 위해 useTheme에 넘기는 데이터를 computed로 하였음. 그 이유로 usetheme에서 보내는 theme 자체도 usetheme 안에서 computed로 인해 reactivity를 가지며, .value를 붙여야 함
const theme = useTheme(computed(() => props.styles))

const resizeObserver = new ResizeObserver((entries) => {
  if (entries.length === 0) {
    return
  }
  clientWidth.value = entries[0].contentRect.width
})

onMounted(() => {
  resizeObserver.observe(innerRef.value)
})

const randomId = useMakeId()
</script>

<template>
  <div class="rm-input">
    <div class="relative">
      <RmLabel :label="label" :labelHelper="labelHelper" :required="required" :id="randomId"></RmLabel>
      <div class="relative">
        <input
          :ref="inputRefFunc"
          :id="randomId"
          :style="`padding-right:${decorationPadding}`"
          class="rm-input--field"
          :class="[{ disabled }, { error }, { inputIcon }]"
          :type="type"
          :placeholder="placeholder"
          :disabled="disabled"
          :value="localValue"
          @input="handleInput($event, { numberOnly })"
          @focus="handleFocus"
          @blur="handleBlur"
          @focusout="isHashtag ? handleHashtags($event, isHashtag) : handleFocusout()"
          @keyup.space="isHashtag ? handleHashtags($event, isHashtag) : handleKeyupPress()"
          autocomplete="off"
          :maxlength="maxLength"
        />
        <div :ref="innerRefFunc" class="rm-input--funcWrapper">
          <div v-if="unit" class="rm-input--unit">{{ unit }}</div>
          <div class="rm-input--button">
            <button v-if="showPassword" @click="handleShow" class="show_password">
              <div v-if="passwordInputState === 'password'" class="show_password__icon pw_show"></div>
              <div v-else class="show_password__icon pw_hidden"></div>
            </button>

            <button v-if="clear" @click="handleClear" class="clear">
              <div class="clear__icon"></div>
              <!-- <IconCloseCircleFilled class="w-[16px] text-black/30"></IconCloseCircleFilled> -->
            </button>
          </div>
        </div>
        <div v-if="inputIcon" class="rm-input--inputIcon">
          <slot name="inputIcon"></slot>
        </div>
      </div>
    </div>
    <div>
      <!-- this is empty div for align of lower textSpace and label -->
    </div>
    <HelperText :id="id" :error="error" :helperText="helperText" :helperIcon="helperIcon" :maxLength="maxLength" :localValue="localValue">
      <template #helperIcon> <slot name="helperIcon"></slot> </template>
    </HelperText>
  </div>
</template>
