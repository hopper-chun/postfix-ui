<script setup>
import { computed, ref } from 'vue'
import { subDays, isAfter, startOfDay, startOfWeek, endOfWeek, startOfMonth, startOfYear, endOfMonth, endOfYear, addMonths } from 'date-fns'

const props = defineProps({
  filterType: { type: Object, required: true },
  beginDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  isSimple: { type: Boolean },
  isNumberOfDays: { type: Boolean }, // 기존의 TERM (일수) 기반 방식
})
const emit = defineEmits(['update:beginDate', 'update:endDate', 'onSearch'])

const constTabs = computed(() => {
  if (!props.isNumberOfDays) {
    const now = new Date()
    const today = startOfDay(now)
    const beginOfThisWeek = startOfWeek(now)
    const endOfThisWeek = endOfWeek(now)
    const beginOfThisMonth = startOfMonth(now)
    const endOfThisMonth = endOfMonth(now)
    const beginOfLastMonth = startOfMonth(addMonths(now, -1))
    const endOfLastMonth = endOfMonth(addMonths(now, -1))
    const beginOfThisYear = startOfYear(now)
    const endOfThisYear = endOfYear(now)

    // console.log('thisWeek', { thisWeek, thisMonth, beginOfThisYear, endOfLastMonth, endOfLastMonth })
    return [
      { label: '오늘', days: [today, today] },
      { label: '이번주', days: [beginOfThisWeek, endOfThisWeek] },
      { label: '이번달', days: [beginOfThisMonth, endOfThisMonth] },
      { label: '지난달', days: [beginOfLastMonth, endOfLastMonth] },
      { label: '올해', days: [beginOfThisYear, endOfThisYear] },
    ]
  } else {
    return [
      { days: '0', label: '오늘' },
      { days: '3', label: '3일' },
      { days: '7', label: '7일' },
      { days: '30', label: '1개월' },
      { days: '90', label: '3개월' },
      { days: '365', label: '1년' },
      // { term: 'all', label: '전체' },
    ]
  }
})

const local = ref({
  currentTabValue: '',
})

const calenderTextColor = computed(() => {
  if (local.value.currentTabValue === '') {
    return 'indigo'
  } else {
    return 'gray'
  }
})

const changeBeginDate = (beginDate) => {
  if (isAfter(startOfDay(beginDate), startOfDay(props.endDate))) {
    alert('시작일은 종료일 이전이여야 합니다.')
  } else {
    emit('update:beginDate', beginDate)
    // appendQuerys({ dateTerm: '', beginDate, endDate: state.value.endDate })
    emit('onSearch')
  }
}
const changeEndDate = (endDate) => {
  if (isAfter(startOfDay(props.beginDate), startOfDay(endDate))) {
    alert('종료일은 시작일 이후여야 합니다.')
  } else {
    emit('update:endDate', endDate)
    // appendQuerys({ dateTerm: '', beginDate: state.value.beginDate, endDate })
    emit('onSearch')
  }
}

const handleTabChanged = (days) => {
  if (!props.isNumberOfDays) {
    emit('update:beginDate', days[0])
    emit('update:endDate', days[1])
  } else {
    const endDate = new Date()
    const beginDate = subDays(endDate, dateTerm * 1)

    emit('update:beginDate', beginDate)
    emit('update:endDate', endDate)
  }
  emit('onSearch')
}
</script>
<template>
  <div class="date px-dateDuration">
    <PxTabInPill
      v-if="!isSimple"
      v-model="local.currentTabValue"
      :options="constTabs"
      :optionsLabel="(option) => option.label"
      :optionsValue="(option) => option.days"
      @update:modelValue="handleTabChanged"
      style="flex-shrink: 0"
    ></PxTabInPill>

    <div class="dateContainer">
      <PxDatePicker size="xs" class="datePicker" :class="calenderTextColor" :modelValue="props.beginDate" @update:modelValue="changeBeginDate"></PxDatePicker>
      <PxDatePicker size="xs" class="datePicker" :class="calenderTextColor" :modelValue="props.endDate" @update:modelValue="changeEndDate"></PxDatePicker>
    </div>
  </div>
</template>
