<script setup>
import _ from 'lodash'
import { format } from 'date-fns'

import { ref, watchEffect } from 'vue'
import PxDateDuration from './PxDateDuration.vue'
import PxMonthDuration from './PxMonthDuration.vue'

const props = defineProps({
  options: { type: Array, required: true },
  option: { type: [String, Number, Object] },
  modelValue: { type: String },
  disabled: { type: Boolean, default: false },
})
const emit = defineEmits(['update:option', 'update:modelValue', 'onKeyDownEnter', 'onAppendQuerys'])

defineExpose({ search })

const selectedFilter = ref({})

const local = ref({
  text: '',
  radio: '',
  checkes: [],
  beginDate: new Date(),
  endDate: new Date(),

  lastValue: null,
})
const originLocal = _.cloneDeep(local.value)

const clearLocalValue = (lastValue) => {
  // local.value = _.cloneDeep(originLocal)
  local.value.text = ''
  local.value.radio = ''
  local.value.checkes = []

  if (lastValue !== undefined) {
    if (local.value.lastValue !== lastValue) {
      local.value.lastValue = lastValue
      return true
    }
  }
  return false
}

const handleRadioUpdate = (key) => {
  emit('onAppendQuerys', [{ key, value: local.value.radio }])
  return clearLocalValue(local.value.radio)
}

function search() {
  let value = null
  if (local.value.text) {
    value = local.value.text
  } else if (local.value.checkes.length > 0) {
    value = local.value.checkes.join(',')
  } else if (selectedFilter.value.group === 'date') {
    value = [format(local.value.beginDate, 'yyyyMMdd'), format(local.value.endDate, 'yyyyMMdd')].join(',')
  } else if (selectedFilter.value.group === 'month') {
    value = [format(local.value.beginDate, 'yyyyMM'), format(local.value.endDate, 'yyyyMM')].join(',')
  } else if (selectedFilter.value.group === 'datepicker') {
    value = format(local.value.beginDate, 'yyyyMMdd')
  } else if (selectedFilter.value.group === 'monthpicker') {
    value = format(local.value.beginDate, 'yyyyMM')
  } else if (selectedFilter.value.group === 'yearpicker') {
    value = format(local.value.beginDate, 'yyyy')
  } else {
    return false
  }

  emit('onAppendQuerys', [{ key: selectedFilter.value.key, value }])
  return clearLocalValue(value)
}

watchEffect(() => {
  selectedFilter.value = props.options.length > 0 ? props.options[0] : {}
  clearLocalValue()
})
</script>

<template>
  <div class="px-selectinputradiocheck">
    <div class="searchOption">
      <PxSelect
        v-model="selectedFilter"
        @update:modelValue="clearLocalValue"
        :options="options"
        :optionsLabel="(option) => option.title"
        :optionsValue="(option) => option"
        :disabled="disabled"
        defaultLabel="검색옵션"
      ></PxSelect>
    </div>
    <template v-if="selectedFilter.group === 'radio'">
      <PxRadio
        :options="selectedFilter.options"
        :optionsValue="(option) => option[0]"
        :optionsLabel="(option) => option[1]"
        v-model="local.radio"
        class="search_radio"
        @update:modelValue="() => handleRadioUpdate(selectedFilter.key)"
      ></PxRadio>
    </template>
    <template v-else-if="selectedFilter.group === 'check'">
      <PxMultiCheckbox
        :options="selectedFilter.options"
        :optionsValue="(option) => option[0]"
        :optionsLabel="(option) => option[1]"
        v-model="local.checkes"
      ></PxMultiCheckbox>
    </template>
    <template v-else-if="selectedFilter.group === 'date'">
      <PxDateDuration :filterType="selectedFilter" v-model:beginDate="local.beginDate" v-model:endDate="local.endDate"></PxDateDuration>
    </template>
    <template v-else-if="selectedFilter.group === 'month'">
      <PxMonthDuration :filterType="selectedFilter" v-model:beginDate="local.beginDate" v-model:endDate="local.endDate"></PxMonthDuration>
    </template>
    <template v-else-if="selectedFilter.group === 'datepicker'">
      <PxDatePicker size="xs" v-model="local.beginDate" @update:modelValue="search"></PxDatePicker>
    </template>
    <template v-else-if="selectedFilter.group === 'monthpicker'">
      <PxMonthPicker size="xs" v-model="local.beginDate" @update:modelValue="search"></PxMonthPicker>
    </template>
    <template v-else-if="selectedFilter.group === 'yearpicker'">
      <PxMonthPicker size="xs" isYear v-model="local.beginDate" @update:modelValue="search"></PxMonthPicker>
    </template>
    <template v-else>
      <div class="search_input">
        <PxInput placeholder="검색어를 입력해주세요." v-model="local.text" :disabled="disabled" @keypress.enter="$emit('onKeyDownEnter')" class=""></PxInput>
      </div>
    </template>
  </div>
</template>
