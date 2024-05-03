<script setup>
import _ from 'lodash'
import { format } from 'date-fns'

import { ref, watchEffect } from 'vue'
import RmDateDuration from './RmDateDuration.vue'

import { RmRadio, RmSelect, RmMultiCheckbox, RmInput } from '@/components/form'

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
})
const originLocal = _.cloneDeep(local.value)

const clearLocalValue = () => {
  local.value = _.cloneDeep(originLocal)
}

const handleRadioUpdate = (key) => {
  emit('onAppendQuerys', [{ key, value: local.value.radio }])
  clearLocalValue()
}

function search() {
  let value = null
  if (local.value.text) {
    value = local.value.text
  } else if (local.value.checkes.length > 0) {
    value = local.value.checkes.join(',')
  } else if (selectedFilter.value.group === 'date') {
    value = [format(local.value.beginDate, 'yyyyMMdd'), format(local.value.endDate, 'yyyyMMdd')].join(',')
  } else {
    return false
  }

  emit('onAppendQuerys', [{ key: selectedFilter.value.key, value }])
  clearLocalValue()

  return true
}

watchEffect(() => {
  selectedFilter.value = props.options.length > 0 ? props.options[0] : {}
  clearLocalValue()
})
</script>

<template>
  <div class="rm-searchForms">
    <div class="rm-searchForms--select">
      <RmSelect
        v-model="selectedFilter"
        @update:modelValue="clearLocalValue"
        :options="options"
        :optionsLabel="(option) => option.title"
        :optionsValue="(option) => option"
        :disabled="disabled"
        defaultLabel="검색옵션"
      ></RmSelect>
    </div>
    <template v-if="selectedFilter.group === 'radio'">
      <RmRadio
        :options="selectedFilter.options"
        :optionsValue="(option) => option[0]"
        :optionsLabel="(option) => option[1]"
        v-model="local.radio"
        class="rm-searchForms--radio"
        @update:modelValue="() => handleRadioUpdate(selectedFilter.key)"
      ></RmRadio>
    </template>
    <template v-else-if="selectedFilter.group === 'check'">
      <RmMultiCheckbox
        :options="selectedFilter.options"
        :optionsValue="(option) => option[0]"
        :optionsLabel="(option) => option[1]"
        v-model="local.checkes"
      ></RmMultiCheckbox>
    </template>
    <template v-else-if="selectedFilter.group === 'date'">
      <RmDateDuration :filterType="selectedFilter" v-model:beginDate="local.beginDate" v-model:endDate="local.endDate"></RmDateDuration>
    </template>
    <template v-else>
      <div class="rm-searchForms--input">
        <RmInput placeholder="검색어를 입력해주세요." v-model="local.text" :disabled="disabled" @keypress.enter="$emit('onKeyDownEnter')"></RmInput>
      </div>
    </template>
  </div>
</template>
