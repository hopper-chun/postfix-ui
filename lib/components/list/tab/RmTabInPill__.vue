<script setup>
import { computed } from 'vue'
import { useTab, useTheme } from '@/composables'

const props = defineProps({
  modelValue: { type: [Object, String, Number, Boolean], required: true },
  options: { type: Array, required: true },
  optionsLabel: { type: Function, default: (option) => option },
  optionsValue: { type: Function, default: (option) => option },
  activeClasses: { type: [String, Array, Object] },
  inactiveClasses: { type: [String, Array, Object] },
  innerClasses: { type: [String, Array, Object] },
  classes: { type: [String, Array, Object] },
})
const emit = defineEmits(['update:modelValue'])

const theme = useTheme()

const active = computed(() => {
  if (props.activeClasses) {
    return props.activeClasses
  } else return `bg-[#F3F4F6] ${theme.value.primary.text}`
})

const inactive = computed(() => {
  if (props.inactiveClasses) {
    return props.inactiveClasses
  } else return 'text-[#A3A3A3]'
})

const { handleChange } = useTab(emit)
// const handleChange = (value, index) => {
//   emit('update:modelValue', value)
// } 위와 아래는 같음.
</script>

<template>
  <nav class="flex" :class="classes ? classes : 'space-x-[8px]'" aria-label="Tabs">
    <a
      v-for="(option, index) in options"
      :key="optionsValue(option)"
      @click="handleChange(optionsValue(option, index))"
      :class="[
        modelValue === optionsValue(option, index) ? active : inactive,
        'flex cursor-pointer items-center font-medium',
        innerClasses ? innerClasses : 'h-[32px] rounded-[4px] px-[8px] text-sm sm:text-[12px]',
      ]"
      :aria-current="modelValue === optionsValue(option, index) ? 'page' : undefined"
    >
      {{ optionsLabel(option) }}
    </a>
  </nav>
</template>
