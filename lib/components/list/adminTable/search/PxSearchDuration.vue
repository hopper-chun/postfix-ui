<script setup>
import { computed } from 'vue'
import { subDays, isAfter, isBefore, format, parseISO } from 'date-fns'

const props = defineProps({
  filters: { type: Array, required: true },
  dateOptions: {
    type: Array,
    required: true,
  },
  isSimple: { type: Boolean },
  searchType: { type: String },
})
const emit = defineEmits(['onAppendQuerys'])
defineExpose({ querys })

const constTabs = computed(() => {
  if (props.searchType === 'month') {
    return [
      { term: '1', label: '1개월' },
      { term: '3', label: '3개월' },
      { term: '6', label: '1년' },
      { term: '12', label: '전체' },
    ]
  } else {
    return [
      { term: '0', label: '오늘' },
      { term: '3', label: '3일' },
      { term: '7', label: '7일' },
      { term: '30', label: '1개월' },
      { term: '90', label: '3개월' },
      { term: '365', label: '1년' },
      { term: 'all', label: '전체' },
    ]
  }
})

const state = computed(() => {
  const ret = {
    dateType: '',
    currentTabValue: 'all',
    beginDate: new Date(),
    endDate: new Date(),
  }

  const mapper = props.filters.reduce((acc, filter) => {
    acc[filter[0].key] = filter[1]
    return acc
  }, {})

  const dateType = mapper['dateType']
  const dateTerm = mapper['dateTerm']
  const beginDate = mapper['beginDate']
  const endDate = mapper['endDate']

  ret.dateType = dateType || props.dateOptions[0].key

  if (beginDate && endDate) {
    ret.currentTabValue = ''
    ret.beginDate = parseISO(beginDate)
    ret.endDate = parseISO(endDate)
  } else if (dateTerm) {
    ret.currentTabValue = dateTerm
    if (dateTerm !== 'all') {
      ret.beginDate = subDays(new Date(), dateTerm * 1)
      ret.endDate = new Date()
    }
  } else {
    ret.currentTabValue = 'all'
  }

  return ret
})

// JSON.stringify(constTabs[constTabs.length - 2]), // 1년으로 초기값 설정

function querys() {
  const ret = [
    { key: 'dateType', value: state.value.dateType },
    { key: 'dateTerm', value: state.value.currentTabValue },
  ]

  if (state.value.currentTabValue === '') {
    if (props.searchType === 'month') {
      ret.push({ key: 'beginDate', value: format(state.value.beginDate, 'yyyy-MM') })
      ret.push({ key: 'endDate', value: format(state.value.endDate, 'yyyy-MM') })
    } else {
      ret.push({ key: 'beginDate', value: format(state.value.beginDate, 'yyyy-MM-dd') })
      ret.push({ key: 'endDate', value: format(state.value.endDate, 'yyyy-MM-dd') })
    }
  }
  return ret
}

const appendQuerys = (arg) => {
  // props.searchFilter.appendQuerys([
  if (props.searchType === 'month') {
    emit('onAppendQuerys', [
      { key: 'dateType', value: state.value.dateType },
      { key: 'dateTerm', value: arg?.dateTerm || '' },
      { key: 'beginDate', value: (arg?.beginDate && format(arg.beginDate, 'yyyy-MM')) || '' },
      { key: 'endDate', value: (arg?.endDate && format(arg.endDate, 'yyyy-MM')) || '' },
    ])
  } else {
    emit('onAppendQuerys', [
      { key: 'dateType', value: state.value.dateType },
      { key: 'dateTerm', value: arg?.dateTerm || '' },
      { key: 'beginDate', value: (arg?.beginDate && format(arg.beginDate, 'yyyy-MM-dd')) || '' },
      { key: 'endDate', value: (arg?.endDate && format(arg.endDate, 'yyyy-MM-dd')) || '' },
    ])
  }
}

const changeBeginDate = (beginDate) => {
  if (isAfter(beginDate, state.value.endDate)) {
    alert('시작일은 종료일 이전이여야 합니다.')
  } else {
    appendQuerys({ dateTerm: '', beginDate, endDate: state.value.endDate })
  }
}
const changeEndDate = (endDate) => {
  if (isBefore(endDate, state.value.beginDate)) {
    alert('종료일은 시작일 이후여야 합니다.')
  } else {
    appendQuerys({ dateTerm: '', beginDate: state.value.beginDate, endDate })
  }
}

const handleTabChanged = (dateTerm) => {
  appendQuerys({ dateTerm })
}
</script>
<template>
  <div class="px-searchDuration">
    <div class="px-searchDuration--select" v-if="dateOptions.length > 1">
      <PxSelect v-model="state.dateType" :options="dateOptions" :optionsLabel="(option) => option.label" :optionsValue="(option) => option.key"></PxSelect>
    </div>
    <PxTabInPill
      v-if="!isSimple"
      v-model="state.currentTabValue"
      :options="constTabs"
      :optionsLabel="(option) => option.label"
      :optionsValue="(option) => option.term"
      @update:modelValue="handleTabChanged"
    ></PxTabInPill>

    <div class="px-searchDuration--date">
      <template v-if="searchType === 'month'">
        <PxMonthPicker size="xs" class="datePicker" :modelValue="state.beginDate" @update:modelValue="changeBeginDate"></PxMonthPicker>
        <PxMonthPicker size="xs" class="datePicker" :modelValue="state.endDate" @update:modelValue="changeEndDate"></PxMonthPicker>
      </template>
      <template v-else>
        <PxDatePicker size="xs" class="datePicker" :modelValue="state.beginDate" @update:modelValue="changeBeginDate"></PxDatePicker>
        <PxDatePicker size="xs" class="datePicker" :modelValue="state.endDate" @update:modelValue="changeEndDate"></PxDatePicker>
      </template>
    </div>
  </div>
</template>
