<script setup>
import { computed, ref, watchEffect, onMounted, onUnmounted } from 'vue'
import { format, parse, isValid } from 'date-fns'
import { IconClose } from '@/components/icon'
import { useFunctionRef } from '@/composables'
import MonthPickerPanel from './component/MonthPickerPanel.vue'

const props = defineProps({
  modelValue: { type: Date },
  isYear: { type: Boolean },
  size: { type: String, default: 'md', validator: (value) => ['xs', 'sm', 'md'].indexOf(value) !== -1 },
  rounded: { type: String },
  isClear: { type: Boolean },
  disabled: { type: Boolean },
  label: { type: String },
  placeholder: { type: String },
})
const emit = defineEmits(['update:modelValue'])
const localValue = ref()
const { functionRef, element } = useFunctionRef()

watchEffect(() => {
  localValue.value = format(props.modelValue, props.isYear ? 'yyyy' : 'yyyy-MM')
})

const handleClose = (value) => {
  emit('update:modelValue', value)
  show.value = false
}
const handleClear = () => {}

const handleClick = () => {
  show.value = !show.value
}

const handlerKeyEnter = () => {
  const date = parse(localValue.value, props.isYear ? 'yyyy' : 'yyyy-MM', 0)
  if (!isValid(date)) {
    localValue.value = format(props.modelValue, props.isYear ? 'yyyy' : 'yyyy-MM')

    return alert('잘못된 날짜입니다. 다시 입력해 주세요.')
  }
  handleClose(date)
}

const show = ref(false)

const clickHandler = 'ontouchstart' in document.documentElement ? 'touchstart' : 'click'

const outsideClick = (e) => {
  if (!element.value.contains(e.target)) {
    show.value = false
  }
}

onMounted(() => {
  window.addEventListener(clickHandler, outsideClick)
})

onUnmounted(() => {
  window.removeEventListener(clickHandler, outsideClick)
})
</script>

<template>
  <div class="rm-datepicker" :ref="functionRef">
    <div ref="inputRef" class="rm-datepicker--input_Wrapper" @click="handleClick">
      <RmInput type="text" v-model="localValue" @keypress.enter="handlerKeyEnter" :disabled="disabled" :label="label" :placeholder="placeholder"></RmInput>
      <div v-if="isClear" class="rm-datepicker--clear" @click="handleClear"></div>
      <div class="rm-datepicker--icon">
        <slot name="icon"></slot>
      </div>
    </div>
    <div class="rm-datepicker--panel_wrapper _absolute _z-10 _bg-gray-300" v-if="show">
      <MonthPickerPanel :isYear="props.isYear" :modelValue="modelValue" @update:modelValue="handleClose($event)"></MonthPickerPanel>
    </div>
  </div>
</template>
