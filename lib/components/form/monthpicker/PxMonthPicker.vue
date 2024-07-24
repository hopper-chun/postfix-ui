<script setup>
import { ref, watchEffect, onMounted, onUnmounted, useSlots } from 'vue'
import { format, parse, isValid } from 'date-fns'
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
  id: { type: String },
  labelHelper: { type: String },
  required: { type: Boolean },
  placeholder: { type: String },
  viewMode: { type: Boolean, default: false },
  hover: { type: Boolean, default: true },
  lang: { type: String, default: 'ko' },
})
const emit = defineEmits(['update:modelValue'])
const slots = useSlots()

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
  <div class="px-datepicker" :ref="functionRef">
    <PxLabel :viewMode="viewMode" :label="label" :labelHelper="labelHelper" :required="required" :id="id">
      <template v-if="!!slots.tooltip" #tooltip>
        <slot name="tooltip"></slot>
      </template>
    </PxLabel>
    <div @click="handleClick" ref="inputRef" class="px-datepicker--input_Wrapper">
      <PxInput
        type="text"
        :viewMode="viewMode"
        v-model="localValue"
        @keypress.enter="handlerKeyEnter"
        :disabled="disabled"
        :placeholder="placeholder"
        isDatePicker
        :clear="isClear"
        @onClear="handleClear"
      >
      </PxInput>
    </div>
    <div class="px-datepicker--panel_wrapper" v-if="show">
      <MonthPickerPanel :isYear="props.isYear" :modelValue="modelValue" :lang="lang" @update:modelValue="handleClose($event)"></MonthPickerPanel>
    </div>
  </div>
</template>
