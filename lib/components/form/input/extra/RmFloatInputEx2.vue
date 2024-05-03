<script setup>
import { toRefs, ref, computed, onMounted } from 'vue'
import { IconCloseCircleFilled } from '@/components/icon/index'
import { useError, useInput, useTheme, useFunctionRef, useMakeId } from '@/composables'
import HelperText from '@/components/form/components/HelperText.vue'

const props = defineProps({
  id: { type: String },
  label: { type: String, required: true },
  type: { type: String, default: 'text' },
  modelValue: { type: [String, Number] },
  disabled: { type: Boolean, default: false },
  format: { type: Function, default: (o) => o },
  inputIcon: { type: Boolean, default: false },
  numberOnly: { type: Boolean, default: false },
  helperText: { type: String },
  helperIcon: { type: Boolean, default: false },
  unit: { type: String },
  clear: { type: Boolean, default: false },
  showPassword: { type: Boolean, default: false },
  maxLength: { type: [String, Number] },
  styles: { type: Object },
})
const emit = defineEmits(['update:modelValue'])

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
const { localValue, handleInput, handleFocus, handleBlur } = useInput(id, modelValue, format, emit)

const theme = useTheme(computed(() => props.styles))

const resizeObserver = new ResizeObserver((entries) => {
  if (entries.length === 0) {
    return
  }
  clientWidth.value = entries[0].contentRect.width
})

onMounted(() => {
  resizeObserver.observe(innerRef.value)

  // clientWidth.value = element.value.clientWidth
})

const randomId = useMakeId()
</script>

<template>
  <div>
    <div class="w-full bg-white" :class="theme.height">
      <div class="relative h-full w-full">
        <input
          :ref="inputRefFunc"
          placeholder=" "
          :style="`padding-right:${decorationPadding}`"
          class="absolute block w-full appearance-none outline-none"
          :class="[
            inputIcon ? 'pl-[42px]' : '',
            theme.radius,
            theme.fontSize,
            theme.text.color,
            theme.paddingX,
            theme.height,
            theme.radius,
            theme.border,
            disabled ? 'bg-[#eeeeee]' : `${theme.bgColor}`,
            !error ? `  ${theme.borderColor} ${theme.focus}` : `${theme.error.text} ${theme.error.border}`,
          ]"
          :id="randomId"
          :type="type"
          :placeholder="placeholder"
          :disabled="disabled"
          :value="localValue"
          @input="handleInput"
          @focus="handleFocus"
          @blur="handleBlur"
          autocomplete="off"
          :maxlength="maxLength"
        />
        <label
          :for="randomId"
          class="pointer-events-none absolute inset-y-0 flex origin-[0%] items-center text-[#737373] duration-200 ease-linear"
          :class="[theme.paddingX, theme.fontSize, inputIcon ? 'pl-[42px]' : '']"
          ><span class="px-[4px]" :class="disabled ? 'bg-[#eeeeee]' : `${theme.bgColor}`">{{ label }}</span></label
        >
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
    <HelperText :id="id" :error="error" :helperText="helperText" :helperIcon="helperIcon" :maxLength="maxLength" :localValue="localValue">
      <template #helperIcon> <slot name="helperIcon"></slot> </template>
    </HelperText>
  </div>
</template>

<style scoped>
input:focus-within ~ label,
input:not(:placeholder-shown) ~ label {
  @apply -translate-y-[50%] transform text-[9px] text-[#9D9D9D] sm:text-[12px];
}
</style>
