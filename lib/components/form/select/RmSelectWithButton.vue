<script setup>
import { ref, watchEffect, computed } from 'vue'
import { useTheme } from '@/composables'

const props = defineProps({
  label: { type: String },
  id: { type: String },
  options: { type: Array },
  optionsLabel: { type: Function, default: (option) => option },
  optionsValue: { type: Function, default: (option) => option },
  modelValue: { type: [String, Number, Object] },
  isGrid: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
})
const emit = defineEmits(['update:modelValue'])
const theme = useTheme(computed(() => {}))
const localValue = ref('')

watchEffect(() => {
  localValue.value = props.modelValue
})
const handleInput = ($event) => {
  emit('update:modelValue', $event.target.value)
}
</script>
<template>
  <div>
    <div>{{ label }}</div>
    <div :class="isGrid ? '' : 'space-x-[8px]'">
      <label v-for="option in options" class="cursor-pointer">
        <input
          type="radio"
          class="hidden"
          :name="id"
          :id="option"
          v-model="localValue"
          :key="optionsValue(option)"
          :value="optionsValue(option)"
          @input="handleInput"
          :disabled="disabled"
        />
        <div
          class="inline-flex h-[48px] items-center justify-center rounded-[8px] border px-[32px] text-[14px]"
          :class="[
            localValue === optionsValue(option) ? `${theme.primary.bg} ${theme.primary.border} text-white` : 'border-[#E5E7EB] bg-[#F9FAFB] text-[#6B7280]',
            isGrid ? 'mr-[8px] mb-[8px]' : '',
          ]"
        >
          {{ optionsLabel(option) }}
        </div>
      </label>
    </div>
  </div>
</template>
