<script setup>
import { toRefs, ref, onMounted, computed, watchEffect } from 'vue'
import { IconCloseCircleFilled } from '@/components/icon/index'
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
  <div>
    <div class="relative">
      <RmLabel
        :label="label"
        :labelFontSize="theme.label_fontSize"
        :labelFontColor="theme.label_fontColor"
        :labelHelper="labelHelper"
        :required="required"
        :id="randomId"
      ></RmLabel>
      <div class="relative">
        <input
          :ref="inputRefFunc"
          :id="randomId"
          :style="`padding-right:${decorationPadding}`"
          class="block w-full focus:outline-none"
          :class="[
            cursorless ? 'cursor-none' : '',
            inputIcon ? 'pl-[42px]' : '',
            theme.fontSize,
            theme.text.color,
            theme.paddingX,
            theme.height,
            theme.radius,
            theme.border,
            theme.placeholder,
            disabled ? theme.disabled : theme.bgColor,
            !error ? `${theme.borderColor} ${theme.focus} ` : `${theme.error.text} ${theme.error.border}`,
          ]"
          :type="type"
          :placeholder="placeholder"
          :disabled="disabled"
          :value="localValue"
          @input="handleInput($event, numberOnly)"
          @focus="handleFocus"
          @blur="handleBlur"
          @focusout="isHashtag ? handleHashtags($event, isHashtag) : handleFocusout()"
          @keyup.space="isHashtag ? handleHashtags($event, isHashtag) : handleKeyupPress()"
          autocomplete="off"
          :maxlength="maxLength"
        />
        <div :ref="innerRefFunc" class="absolute inset-y-0 right-[16px] flex items-center space-x-[8px]">
          <div v-if="unit" class="flex items-center text-[14px] leading-[22px] text-[#A1A1AA]">{{ unit }}</div>
          <div class="flex items-center space-x-[8px]">
            <button v-if="showPassword" @click="handleShow" class="flex items-center text-[14px] leading-[22px] text-[#A1A1AA]">
              <div v-if="passwordInputState === 'password'">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-[20px] w-[20px]" fill="none" viewBox="0 0 24 24" stroke="#737373" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </div>
              <div v-else>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-[20px] w-[20px]" fill="none" viewBox="0 0 24 24" stroke="#737373" stroke-width="2">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                  />
                </svg>
              </div>
            </button>

            <button v-if="clear" @click="handleClear" class="flex items-center text-[14px] leading-[22px] text-[#A1A1AA]">
              <IconCloseCircleFilled class="w-[16px] text-black/30"></IconCloseCircleFilled>
            </button>
          </div>
        </div>
        <div v-if="inputIcon" class="absolute top-[15px] left-[16px] flex h-[18px] w-[18px] items-center justify-center">
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
    <!-- <div class="flex items-center justify-between">
        <div class="flex items-center">
          <div v-if="helperIcon" class="flex h-[18px] w-[18px] items-center justify-center">
            <slot name="helperIcon"></slot>
          </div>
          <div class="text-[12px] leading-[160%] text-[#737373]" v-html="helperText"></div>
        </div>
        <div v-if="maxLength" class="text-[12px] leading-[160%] text-[#737373]">{{ localValue.length }}/{{ maxLength }}</div>
      </div> -->
  </div>
</template>
