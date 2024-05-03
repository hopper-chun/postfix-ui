<script setup>
import { toRefs, computed } from 'vue'
import { useError, useToggle, useFunctionRef, useTheme, useMakeId } from '@/composables'

const props = defineProps({
  isSmall: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  modelValue: { type: [String, Number, Boolean] },
  options: { type: Array, default: () => [false, true], validator: (values) => values.length >= 2 },
  id: { type: String },
})
const emit = defineEmits(['update:modelValue'])

const { functionRef, element } = useFunctionRef()

const { id, modelValue, options } = toRefs(props)
const { error } = useError(id, element)
// 토글 형태상 에러메시지가 들어갈 공간이 없음.
const { localValue, handleToggle } = useToggle(id, modelValue, options, emit)

const theme = useTheme(computed(() => {}))

const handleClick = () => {
  if (props.disabled) {
    return
  } else {
    localValue.value = !localValue.value
  }
  handleToggle()
}
</script>

<template>
  <template v-if="isSmall">
    <div @click="handleClick" @update:modelValue="handleToggle" class="cursor-pointer">
      <div
        :id="id"
        :ref="functionRef"
        class="h-[14px] w-[24px] rounded-full p-[2px] transition-all duration-200"
        :class="[error && localValue ? theme.error.bg : error ? theme.error.bgLite : localValue ? theme.primary.bg : 'bg-[#E5E7EB]']"
      >
        <div class="h-[10px] w-[10px] rounded-full bg-white transition-all duration-200" :class="localValue ? 'translate-x-[10px]' : 'translate-x-0'"></div>
      </div>
    </div>
  </template>
  <template v-else>
    <div @click="handleClick" @update:modelValue="handleToggle" class="cursor-pointer">
      <div
        :id="id"
        :ref="functionRef"
        class="h-[24px] w-[44px] rounded-full p-[2px] transition-all duration-200"
        :class="[error && localValue ? theme.error.bg : error ? theme.error.bgLite : localValue ? theme.primary.bg : 'bg-[#E5E7EB]']"
      >
        <div class="h-[20px] w-[20px] rounded-full bg-white transition-all duration-200" :class="localValue ? 'translate-x-[20px]' : 'translate-x-0'"></div>
      </div>
    </div>
  </template>
</template>
