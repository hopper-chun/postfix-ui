<script setup>
import { computed, nextTick, onMounted, toRefs } from 'vue'
import { IconCheck } from '@/components/Icon/index'
import { useError, useMultiCheckbox, useFunctionRef, useTheme } from '@/composables'

const props = defineProps({
  id: { type: String },
  modelValue: { type: [String, Number, Boolean, Array] },
  options: { type: Array },
  optionsLabel: { type: Function, default: (option) => option },
  optionsValue: { type: Function, default: (option) => option },
  circle: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  isRow: { type: Boolean },
  label: { type: String },
  viewMode: { type: Boolean },
  labelHelper: { type: String },
})

const emit = defineEmits(['update:modelValue'])

const { functionRef, element } = useFunctionRef()
const { id, modelValue } = toRefs(props)
const { error } = useError(id, element)
const { localValue, handleCheck } = useMultiCheckbox(id, modelValue, emit)
const theme = useTheme(computed(() => {}))
// 라벨, 옵션,
const shape = computed(() => {
  if (!props.circle) {
    return 'w-[18px] h-[18px] rounded-[2px]'
  } else {
    return 'w-[24px] h-[24px] rounded-full'
  }
})

const selected = (value) => {
  const found = localValue.value.findIndex((v) => v === value)

  if (found !== -1) {
    return true
  } else {
    return false
  }
}
</script>
<template>
  <div class="rm-multiCheckbox" :class="[{ isRow }]">
    <div v-for="(option, index) in options" style="font-size: 0px">
      <input
        :ref="functionRef"
        type="checkbox"
        :id="`${id}_${index}_${optionsValue(option)}`"
        style="display: none"
        :checked="localValue"
        @input="handleCheck($event.target.value)"
        :disabled="disabled || viewMode"
        :value="optionsValue(option)"
      />
      <label :for="`${id}_${index}_${optionsValue(option)}`" style="display: inline-block">
        <div class="rm-checkbox--wrapper">
          <div class="rm-checkbox--box" :class="[{ disabled }, { error }, { selected: selected(optionsValue(option)) }]"></div>
          <div class="rm-checkbox--text" :class="[{ error }, { hasText: optionsLabel(option) }]">
            {{ optionsLabel(option) }}
          </div>
        </div>
      </label>
    </div>
  </div>
</template>
