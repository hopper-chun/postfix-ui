<script setup>
import { ref, watchEffect, onMounted, onUnmounted, useSlots } from 'vue'
import { format, parse, parseISO, isValid } from 'date-fns'
import { useFunctionRef } from '@/composables'
import DatePickerPanel from './component/DatePickerPanel.vue'

const props = defineProps({
  modelValue: { type: [Date, String, Number] },
  id: { type: String },
  labelHelper: { type: String },
  required: { type: Boolean },
  clear: { type: Boolean },
  disabled: { type: Boolean },
  label: { type: String },
  lang: { type: String, default: 'ko' },
  format: { type: Function, default: (o) => o },
  placeholder: { type: String },
  viewMode: { type: Boolean, default: false },
  hover: { type: Boolean, default: true },
  dotDays: { type: Array },
  cbMonth: { type: Function },
  md: { type: String },
})

const emit = defineEmits(['update:modelValue', 'onClickTooltip'])
const slots = useSlots()

const { functionRef, element } = useFunctionRef()

const local = ref({
  text: '',
  date: new Date(),
})
const inputRef = ref(null)
const inputHeight = ref(0)

const show = ref(false)
const reverse = ref(false)
const loadProps = () => {
  if (!props.modelValue) {
    local.value.date = new Date()
    local.value.text = ''
    return
  }

  if (typeof props.modelValue === 'string' || props.modelValue instanceof String) {
    local.value.date = parseISO(props.modelValue)
  } else if (Number.isInteger(props.modelValue)) {
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
  loadProps()

  emit('update:modelValue', value)

  show.value = false
}

const handleClear = (e) => {
  e.stopPropagation()
  emit('update:modelValue', null)
}

const handleClick = () => {
  if (props.disabled || props.viewMode) {
    return
  }
  show.value = !show.value

  if (inputRef.value.getBoundingClientRect().top + 380 > window.innerHeight) {
    reverse.value = true
  } else {
    reverse.value = false
  }
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
    alert('잘못된 날짜입니다. 다시 입력해 주세요.')
    loadProps()
    return
  }
  handleClose(date)
}

// 클릭할 때, 이놈의 offsetTop + 높이가 screenHeight를 넘어서면 메뉴가 위에서 뜨게?
</script>

<template>
  <div class="px-datepicker labelSwitch" :ref="functionRef">
    <PxLabel
      :viewMode="viewMode"
      :label="label"
      :labelHelper="labelHelper"
      :required="required"
      :id="id"
      :md="md"
      @onClickTooltip="$emit('onClickTooltip', $event)"
    >
      <template v-if="!!slots.tooltip" #tooltip>
        <slot name="tooltip"></slot>
      </template>
    </PxLabel>
    <div @click="handleClick" ref="inputRef" class="px-datepicker--input_Wrapper">
      <PxInput
        type="text"
        :viewMode="viewMode"
        v-model="local.text"
        @keypress.enter="handlerKeyEnter"
        :disabled="disabled"
        :placeholder="placeholder"
        isDatePicker
        :clear="clear"
        @onClear="handleClear"
      >
      </PxInput>
    </div>
    <div class="px-datepicker--panel_wrapper" v-if="show" :class="{ reverse }">
      <DatePickerPanel :modelValue="local.date" :lang="lang" :cbMonth="cbMonth" :dotDays="dotDays" @update:modelValue="handleClose($event)"></DatePickerPanel>
    </div>
  </div>
</template>
