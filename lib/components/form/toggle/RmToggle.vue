<script setup>
import { toRefs, ref, onMounted, computed, nextTick } from 'vue'
import { useError, useToggle, useFunctionRef, useTheme, useMakeId } from '@/composables'

const props = defineProps({
  label: { type: String },
  disabled: { type: Boolean, default: false },
  prevent: { type: Boolean, default: false },
  modelValue: { type: [String, Number, Boolean] },
  options: { type: Array, default: () => [false, true], validator: (values) => values.length >= 2 },
  id: { type: String },
})
const emit = defineEmits(['update:modelValue'])

const { functionRef: containerRefFunc, element: containerRef } = useFunctionRef()
const { functionRef: innerRefFunc, element: innerRef } = useFunctionRef()

const { id, modelValue, options } = toRefs(props)
const { error } = useError(id, containerRef)

const { localValue, handleToggle } = useToggle(id, modelValue, options, emit)

const distance = ref('20')

const handleClick = () => {
  if (props.disabled || props.prevent) {
    // disabled의 스타일을 쓰지 않고 클릭만 막으려는 경우가 있어서 prevent를 추가함
    return
  } else {
    localValue.value = !localValue.value
    handleToggle()
  }
}

const calcDistance = () => {
  const padding = window.getComputedStyle(containerRef.value, null).getPropertyValue('padding-left')
  let result = containerRef.value.clientWidth - parseInt(padding) * 2 - innerRef.value.clientWidth
  distance.value = result
}
onMounted(() => {
  nextTick(() => {
    calcDistance()
  })
})
</script>

<template>
  <div @click="handleClick" @update:modelValue="handleToggle" class="rm-toggle cursor-pointer" :class="[{ hasText: label }]">
    <div v-if="label" class="rm-toggle--label">
      {{ label }}
    </div>
    <div :id="id" :ref="containerRefFunc" class="rm-toggle--box" :class="[{ error }, { disabled }, { selected: localValue }]">
      <div :ref="innerRefFunc" class="dot" :style="localValue ? `transform: translateX(${distance}px)` : 'transform: translateX(0)'"></div>
    </div>
  </div>
</template>
