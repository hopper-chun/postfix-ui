<script setup>
import { computed, ref } from 'vue'
import { subMonths, isAfter, startOfMonth, endOfMonth } from 'date-fns'

const constTabs = [
  { term: '1', label: '1개월' },
  { term: '2', label: '2개월' },
  { term: '3', label: '3개월' },
  { term: '4', label: '4개월' },
  { term: '5', label: '5개월' },
  { term: '6', label: '6개월' },
  { term: '12', label: '1년' },
]

// const constTabs = [
//   { term: '1', label: '이번달' },
//   { term: '2', label: '지난달' },
//   { term: '3', label: '1/4분기' },
//   { term: '4', label: '2/4분기' },
//   { term: '5', label: '3/4분기' },
//   { term: '6', label: '4/4분기' },
//   { term: '5', label: '상반기' },
//   { term: '5', label: '하반기' },
// ]

const props = defineProps({
  filterType: { type: Object, required: true },
  beginDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  isSimple: { type: Boolean },
})
const emit = defineEmits(['update:beginDate', 'update:endDate', 'onSearch'])

const local = ref({
  currentTabValue: '',
})

const calenderTextColor = computed(() => {
  if (local.value.currentTabValue === '') {
    return 'text-indigo-500'
  } else {
    return 'text-gray-700'
  }
})

const changeBeginDate = (beginDate) => {
  // if (isAfter(startOfMonth(beginDate), startOfMonth(props.endDate))) {
  //   alert('시작일은 종료일 이전이여야 합니다.')
  // } else {
  //   emit('update:beginDate', beginDate)
  //   // appendQuerys({ dateTerm: '', beginDate, endDate: state.value.endDate })
  //   emit('onSearch')
  // }

  // alert 대신에 종료일을 시작일과 맞추도록 한다.
  if (isAfter(startOfMonth(beginDate), startOfMonth(props.endDate))) {
    emit('update:endDate', beginDate)
  }
  emit('update:beginDate', beginDate)
  emit('onSearch')
}

const changeEndDate = (endDate) => {
  // if (isAfter(startOfMonth(props.beginDate), startOfMonth(endDate))) {
  //   alert('종료일은 시작일 이후여야 합니다.')
  // } else {
  //   emit('update:endDate', endDate)
  //   // appendQuerys({ dateTerm: '', beginDate: state.value.beginDate, endDate })
  //   emit('onSearch')
  // }

  // alert 대신에 시작일을 종료일과 맞추도록 한다.
  if (isAfter(startOfMonth(props.beginDate), startOfMonth(endDate))) {
    emit('update:beginDate', endDate)
  }
  emit('update:endDate', endDate)
  emit('onSearch')
}

const handleTabChanged = (dateTerm) => {
  const endDate = endOfMonth(new Date())
  const beginDate = startOfMonth(subMonths(new Date(), dateTerm * 1 - 1))

  emit('update:beginDate', beginDate)
  emit('update:endDate', endDate)

  emit('onSearch')
}
</script>
<template>
  <div class="month px-dateDuration">
    <PxTabInPill
      v-if="!isSimple"
      v-model="local.currentTabValue"
      :options="constTabs"
      :optionsLabel="(option) => option.label"
      :optionsValue="(option) => option.term"
      @update:modelValue="handleTabChanged"
      style="flex-shrink: 0"
    ></PxTabInPill>
    <div class="dateContainer">
      <PxMonthPicker size="xs" class="datePicker" :class="calenderTextColor" :modelValue="props.beginDate" @update:modelValue="changeBeginDate"></PxMonthPicker>
      <PxMonthPicker size="xs" class="datePicker" :class="calenderTextColor" :modelValue="props.endDate" @update:modelValue="changeEndDate"></PxMonthPicker>
    </div>
  </div>
</template>
