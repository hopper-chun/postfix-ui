<script setup>
import _ from 'lodash'
import { format, parse } from 'date-fns'

import { ref, watch, inject } from 'vue'
import PxDateDuration from './PxDateDuration.vue'
import PxMonthDuration from './PxMonthDuration.vue'

const LocalUserPicker = inject('LocalUserPicker', undefined)

const props = defineProps({
  options: { type: Array, required: true },
  option: { type: [String, Number, Object] },
  modelValue: { type: String },
  route: { type: Object },
  disabled: { type: Boolean, default: false },
})
const emit = defineEmits(['update:option', 'update:modelValue', 'onKeyDownEnter', 'onAppendQuerys', 'onSelectedFilter'])

defineExpose({ search, clearDate })

const selectedFilter = ref({})

const local = ref({
  text: '',
  radio: '',
  checkes: [],
  beginDate: new Date(),
  endDate: new Date(),
})

const clearLocalValue = () => {
  local.value.text = ''
  local.value.radio = ''
  local.value.checkes = []

  // 초기화 할 때 datepicker 도 초기화 해달라는 요청이 있었음
}

function clearDate() {
  local.value.beginDate = new Date()
  local.value.endDate = new Date()
}
// const handleRadioUpdate = (key) => {
//   emit('onAppendQuerys', [{ key, value: local.value.radio }])
//   clearLocalValue()
// }

// function search() {
//   let value = null
//   if (local.value.text) {
//     value = local.value.text
//   } else if (local.value.radio) {
//     value = local.value.radio
//   } else if (local.value.checkes.length > 0) {
//     value = local.value.checkes.join(',')
//   } else if (selectedFilter.value.group === 'date') {
//     value = [format(local.value.beginDate, 'yyyyMMdd'), format(local.value.endDate, 'yyyyMMdd')].join(',')
//   } else if (selectedFilter.value.group === 'month') {
//     value = [format(local.value.beginDate, 'yyyyMM'), format(local.value.endDate, 'yyyyMM')].join(',')
//   } else if (selectedFilter.value.group === 'datepicker') {
//     value = format(local.value.beginDate, 'yyyyMMdd')
//   } else if (selectedFilter.value.group === 'monthpicker') {
//     value = format(local.value.beginDate, 'yyyyMM')
//   } else if (selectedFilter.value.group === 'yearpicker') {
//     value = format(local.value.beginDate, 'yyyy')
//   } else {
//     // return false
//   }

//   emit('onAppendQuerys', [{ key: selectedFilter.value.key, value }])

//   clearLocalValue()

//   // return true
// }

function search() {
  const { key, group } = selectedFilter.value

  let value
  if (group === 'text') {
    value = local.value.text
  } else if (group === 'radio') {
    value = local.value.radio
  } else if (group === 'select') {
    value = local.value.radio
  } else if (group === 'check') {
    value = local.value.checkes.join(',')
  } else if (group === 'date') {
    value = [format(local.value.beginDate, 'yyyyMMdd'), format(local.value.endDate, 'yyyyMMdd')].join(',')
  } else if (group === 'month') {
    value = [format(local.value.beginDate, 'yyyyMM'), format(local.value.endDate, 'yyyyMM')].join(',')
  } else if (group === 'datepicker') {
    value = format(local.value.beginDate, 'yyyyMMdd')
  } else if (group === 'monthpicker') {
    value = format(local.value.beginDate, 'yyyyMM')
  } else if (group === 'yearpicker') {
    value = format(local.value.beginDate, 'yyyy')
  } else if (group === 'user') {
    value = local.value.text
  } else {
    throw '잘못된 filterType 입니다.'
  }

  emit('onAppendQuerys', [{ key, value }])
  clearLocalValue()
}

watch(
  () => props.options,
  () => {
    // selectedFilter.value = props.options?.length > 0 ? props.options[0] : {}
    clearLocalValue()
    setSelectedFilter()
  }
)

const onSelectedFilter = (value) => {
  emit('onSelectedFilter', value)
  clearLocalValue()
}

const setSelectedFilter = () => {
  selectedFilter.value = props.options?.length > 0 ? props.options[0] : {}

  const { key, group } = selectedFilter.value
  if (props.route) {
    if (group === 'text') {
      return
      // local.value.text = props.route?.query?.[key]
    } else if (group === 'radio') {
      local.value.radio = props.route?.query?.[key]
    } else if (group === 'select') {
      local.value.radio = props.route?.query?.[key]
    } else if (group === 'check') {
      local.value.checkes = props.route?.query?.[key].split(',')
    } else if (group === 'date') {
      const [begin, end] = props.route?.query?.[key].split(',')
      local.value.beginDate = parse(begin, 'yyyyMMdd', new Date())
      local.value.endDate = parse(end, 'yyyyMMdd', new Date())
      // [format(local.value.beginDate, 'yyyyMMdd'), format(local.value.endDate, 'yyyyMMdd')].join(',')
    } else if (group === 'month') {
      const [begin, end] = props.route?.query?.[key].split(',')
      local.value.beginDate = parse(begin, 'yyyyMM', new Date())
      local.value.endDate = parse(end, 'yyyyMM', new Date())
      // props.route?.query?.[key] = [format(local.value.beginDate, 'yyyyMM'), format(local.value.endDate, 'yyyyMM')].join(',')
    } else if (group === 'datepicker') {
      local.value.beginDate = parse(props.route?.query?.[key], 'yyyyMMdd', new Date())
      // props.route?.query?.[key] = format(local.value.beginDate, 'yyyyMMdd')
    } else if (group === 'monthpicker') {
      local.value.beginDate = parse(props.route?.query?.[key], 'yyyyMM', new Date())
      // props.route?.query?.[key] = format(local.value.beginDate, 'yyyyMM')
    } else if (group === 'yearpicker') {
      local.value.beginDate = parse(props.route?.query?.[key], 'yyyy', new Date())
      // props.route?.query?.[key] = format(local.value.beginDate, 'yyyy')
    } else if (group === 'user') {
      local.value.text = props.route?.query?.[key]
    } else {
      throw '잘못된 filterType 입니다.'
    }
  }
}

setSelectedFilter()

// watch(
//   () => props.route?.query,
//   () => {
//     if (props.route?.query) {
//       const { key, group } = selectedFilter.value
//       if (group === 'radio') {
//         local.value.radio = props.route?.query?.[key]
//         console.log('여긴 안봐?')
//       }
//       console.log('??', props.route.query, 'group', group, 'key', key, 'selectedFilter.value?', selectedFilter.value, 'local.value.radio ', local.value.radio)
//     }
//   },
//   { immediate: true }
// )
</script>

<template>
  <div class="px-selectinputradiocheck">
    <div class="searchOption">
      <PxSelect
        v-model="selectedFilter"
        @update:modelValue="onSelectedFilter"
        :options="options"
        :optionsLabel="(option) => option.title"
        :optionsValue="(option) => option"
        :disabled="disabled"
        defaultLabel="검색옵션"
      ></PxSelect>
    </div>
    <template v-if="selectedFilter.group === 'radio'">
      {{ local.radio }}
      <PxRadio
        :options="selectedFilter.options"
        :optionsValue="(option) => option[0]"
        :optionsLabel="(option) => option[1]"
        v-model="local.radio"
        @update:modelValue="search"
        class="search_radio"
      ></PxRadio>
      <!-- @update:modelValue="() => handleRadioUpdate(selectedFilter.key)" -->
    </template>
    <template v-else-if="selectedFilter.group === 'select'">
      <PxSelect
        :options="selectedFilter.options"
        :optionsValue="(option) => option[0]"
        :optionsLabel="(option) => option[1]"
        v-model="local.radio"
        class="flex min-h-[34px] items-center justify-center"
        @update:modelValue="search"
        :defaultLabel="selectedFilter.defaultLabel || '선택해주세요'"
      ></PxSelect>
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
      <PxDateDuration :filterType="selectedFilter" v-model:beginDate="local.beginDate" v-model:endDate="local.endDate" @onSearch="search"></PxDateDuration>
    </template>
    <template v-else-if="selectedFilter.group === 'month'">
      <PxMonthDuration :filterType="selectedFilter" v-model:beginDate="local.beginDate" v-model:endDate="local.endDate" @onSearch="search"></PxMonthDuration>
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
    <template v-else-if="selectedFilter.group === 'user'">
      <template v-if="LocalUserPicker">
        <component :is="LocalUserPicker" v-model="local.text" @update:modelValue="search" :params="selectedFilter.params" />
      </template>
    </template>
    <template v-else>
      <div class="search_input">
        <PxInput
          :inputFilter="selectedFilter.inputFilter || undefined"
          :placeholder="selectedFilter.placeholder || '검색어를 입력해주세요.'"
          v-model="local.text"
          :disabled="disabled"
          @keypress.enter="$emit('onKeyDownEnter')"
          class=""
        ></PxInput>
      </div>
    </template>
  </div>
</template>
