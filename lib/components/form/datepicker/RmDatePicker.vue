<script setup>
import { computed, ref, watchEffect, onMounted, onUnmounted } from 'vue'
import { format, parse, parseISO, isValid } from 'date-fns'
// import IconClose from '@/components/icon/IconClose'
import { useFunctionRef } from '@/composables'
import DatePickerPanel from './component/DatePickerPanel.vue'
import { RmIcon } from '@/components/Icon'
import { RmInput } from '../input'

const props = defineProps({
  modelValue: { type: [Date, String, Number] },
  rounded: { type: String },
  isClear: { type: Boolean },
  disabled: { type: Boolean },
  label: { type: String },
  placeholder: { type: String },
})

const emit = defineEmits(['update:modelValue'])
const { functionRef, element } = useFunctionRef()

const local = ref({
  text: '',
  date: new Date(),
})
const inputRef = ref(null)
const inputHeight = ref(0)
const show = ref(false)

const loadProps = () => {
  if (!props.modelValue) {
    local.value.date = new Date()
    local.value.text = ''
    return
  }

  if (typeof props.modelValue === 'string' || props.modelValue instanceof String) {
    local.value.date = parseISO(props.modelValue)
  } else if (Number.isInteger(props.modeValue)) {
    local.value.date = new Date(props.modelValue)
  } else {
    local.value.date = props.modelValue
  }
  local.value.text = format(local.value.date, 'yyyy-MM-dd')
}

watchEffect(() => {
  inputHeight.value = inputRef?.value?.clientHeight

  loadProps()
})

const handleClose = (value) => {
  local.value.date = value
  local.value.text = format(local.value.date, 'yyyy-MM-dd')

  emit('update:modelValue', value)
  show.value = false
}

const handleClear = () => {}

const handleClick = () => {
  if (props.disabled) {
    return
  }
  show.value = !show.value
}

const clickHandler = 'ontouchstart' in document.documentElement ? 'touchstart' : 'click'

const outsideClick = (e) => {
  if (!element.value.contains(e.target)) {
    show.value = false
    loadProps()
  }
}

onMounted(() => {
  window.addEventListener(clickHandler, outsideClick)
})

onUnmounted(() => {
  window.removeEventListener(clickHandler, outsideClick)
})

const handlerKeyEnter = () => {
  const date = parse(local.value.text, 'yyyy-MM-dd', 0)
  if (!isValid(date)) {
    // local.value.text = format(props.modelValue, 'yyyy-MM-dd')

    alert('잘못된 날짜입니다. 다시 입력해 주세요.')
    loadProps()
    return
  }
  handleClose(date)
}
</script>

<template>
  <div class="rm-datepicker" :ref="functionRef">
    <div @click="handleClick" ref="inputRef" class="rm-datepicker--input_Wrapper">
      <RmInput type="text" v-model="local.text" @keypress.enter="handlerKeyEnter" :disabled="disabled" :label="label" :placeholder="placeholder"></RmInput>
      <div v-if="isClear" class="rm-datepicker--clear" @click="handleClear"></div>
      <div class="rm-datepicker--icon">
        <slot name="icon"></slot>
      </div>
    </div>
    <div class="rm-datepicker--panel_wrapper" v-if="show">
      <DatePickerPanel :modelValue="local.date" @update:modelValue="handleClose($event)"></DatePickerPanel>
    </div>
  </div>
</template>
