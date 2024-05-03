<script setup>
import { toRefs, ref, onMounted, computed, nextTick } from 'vue'
import { useError, useToggle, useFunctionRef, useTheme, useMakeId } from '@/composables'

const props = defineProps({
  label: { type: String },
  classes: { type: [String, Array, Object] },
  innerClasses: { type: [String, Array, Object] },
  activeClasses: { type: [String, Array, Object] },
  labelClasses: { type: [String, Array, Object] },
  disabled: { type: Boolean, default: false },
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

const theme = useTheme(computed(() => {}))

const distance = ref('20')
const handleClick = () => {
  if (props.disabled) {
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
  <div @click="handleClick" @update:modelValue="handleToggle" class="cursor-pointer" :class="label ? 'flex w-full items-center justify-between' : ''">
    <div v-if="label" :class="labelClasses">
      {{ label }}
    </div>
    <div
      :id="id"
      :ref="containerRefFunc"
      class="rounded-full transition-all duration-200"
      :class="[
        error && localValue ? theme.error.bg : error ? theme.error.bgLite : localValue ? activeClasses : theme.disabled,
        classes,
        disabled ? 'opacity-40' : '',
      ]"
    >
      <div
        :ref="innerRefFunc"
        class="rounded-full transition-all duration-200"
        :class="[innerClasses]"
        :style="localValue ? `transform: translateX(${distance}px)` : 'transform: translateX(0)'"
      ></div>
    </div>
  </div>
</template>
