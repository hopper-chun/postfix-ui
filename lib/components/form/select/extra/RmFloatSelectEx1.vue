<script setup>
import { toRefs, ref, onMounted, computed, onUnmounted } from 'vue'
import { IconChevronDown, IconCheck } from '@/components/icon'
import { useError, useSelect, useTheme, useFunctionRef, useMakeId } from '@/composables'
import HelperText from '@/components/form/components/HelperText.vue'

const props = defineProps({
  label: { type: String },
  id: { type: String },
  disabled: { type: Boolean, default: false },
  modelValue: { type: [String, Number, Object], required: true },
  labelHelper: { type: String },
  helperText: { type: String },
  helperIcon: { type: Boolean },
  required: { type: Boolean },
  options: { type: Array, required: true },
  optionsLabel: { type: Function, default: (option) => option },
  optionsValue: { type: Function, default: (option) => option },
  styles: { type: Object },
})

const emit = defineEmits(['update:modelValue'])

const { functionRef: containerRefFunc, element: containerRef } = useFunctionRef()
const { functionRef: selectRefFunc, element: selectRef } = useFunctionRef()

const { id, modelValue, options } = toRefs(props)
const { error } = useError(id, selectRef)
const { localValue, handleChange } = useSelect(id, modelValue, options, props.optionsValue, emit)
const theme = useTheme(computed(() => props.styles))

const handleSelect = (value) => {
  handleChange(value)
  isOpen.value = false
}

const handleOpen = () => {
  if (!props.disabled) {
    isOpen.value = !isOpen.value
  }
}

const isOpen = ref(false)

const clickHandler = 'ontouchstart' in document.documentElement ? 'touchstart' : 'click'

const outsideClick = (e) => {
  if (!containerRef.value.contains(e.target)) {
    isOpen.value = false
  }
}

const floatingLabel = computed(() => {
  if (localValue.value !== '' || isOpen.value) {
    return 'text-[12px] -translate-y-[25%]'
  } else {
    return theme.value.fontSize
  }
})

const randomId = useMakeId()

onMounted(() => {
  window.addEventListener(clickHandler, outsideClick)
})

onUnmounted(() => {
  window.removeEventListener(clickHandler, outsideClick)
})
</script>

<template>
  <div :ref="containerRefFunc">
    <div class="relative select-none">
      <div class="relative">
        <div
          :ref="selectRefFunc"
          :id="randomId"
          @click="handleOpen"
          class="relative flex items-center pr-[42px] focus:outline-none focus:ring-1"
          :class="[
            theme.height,
            theme.border,
            theme.radius,
            theme.paddingX,
            disabled ? 'bg-[#eeeeee]' : `${theme.bgColor}`,
            !error ? `${theme.borderColor} ${theme.focus}` : theme.error.border,
          ]"
          tabindex="0"
        >
          <div class="absolute inset-0 flex transform items-center text-[#A3A3A3] transition-all duration-300" :class="[theme.paddingX, floatingLabel]">
            {{ label }}
          </div>
          <!-- truncate가 너비가 상대값인 컨테이너에 들어오면, whitespace때문에 주어진 크기보다 더 큰 범위를 차지하는 경우가 생김. 그래서 absolute를 주고 inset-x-0으로 범위를 제한했음. 
            이걸 막으려면 상위 컨테이너에서 overflow-hidden을 주어야 했는데, 그러면 하단 옵션창이 뜨지 않았음. -->

          <span
            class="absolute inset-x-0 truncate pt-[12px] pr-[32px] leading-[22px]"
            :class="[theme.fontSize, theme.paddingX, localValue ? theme.text.color : 'text-[#A3A3A3]']"
          >
            <slot name="header" :localValue="localValue">
              {{ optionsLabel(localValue) }}
            </slot>
          </span>

          <div class="absolute inset-y-0 right-[10px] flex items-center justify-center">
            <slot name="expand">
              <IconChevronDown class="w-[18px]"></IconChevronDown>
            </slot>
          </div>
        </div>
        <transition
          enter-active-class="transition duration-100 ease-in"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <div
            v-if="isOpen"
            class="SCROLL absolute inset-x-0 top-[100%] z-10 w-full overflow-hidden overflow-y-auto"
            :class="[theme.select_maxHeight, theme.select_marginTop, theme.select_optionBorder, theme.bgColor, theme.borderColor, theme.radius]"
          >
            <div
              v-for="option in options"
              @click="handleSelect(option)"
              class="relative flex cursor-default items-center justify-between pr-[32px] leading-[22px]"
              :class="[
                theme.paddingX,
                theme.select_paddingY,
                theme.select_optionFontSize,
                theme.select_optionHover,

                optionsLabel(localValue) === optionsLabel(option) ? theme.select_optionSelected : '',
              ]"
            >
              <slot name="option" :option="option">
                <span class="truncate">
                  {{ optionsLabel(option) }}
                </span>
              </slot>
              <span v-if="optionsLabel(localValue) === optionsLabel(option)" class="absolute right-[10px] flex items-center justify-center">
                <slot name="checked">
                  <iconCheck class="w-[18px]"></iconCheck>
                </slot>
              </span>
            </div>
          </div>
        </transition>
      </div>
    </div>
    <HelperText :id="id" :error="error" :helperText="helperText" :helperIcon="helperIcon">
      <template #helperIcon> <slot name="helperIcon"></slot> </template>
    </HelperText>
  </div>
</template>

<style scoped>
.floating:focus-within ~ label,
.floating:not(:placeholder-shown) ~ label {
  @apply -translate-y-[25%] transform text-[9px] text-[#9D9D9D] sm:text-[10px];
}

.SCROLL::-webkit-scrollbar {
  width: 5px;
  height: 8px;
}

.SCROLL::-webkit-scrollbar-thumb {
  border-radius: 3px;
  background-color: #d9d9d9;
}
</style>
