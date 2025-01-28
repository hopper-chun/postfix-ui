<script setup>
import { computed, ref } from 'vue'
import { subMonths, isAfter, startOfMonth } from 'date-fns'

const constTabs = [
  { term: '1', label: '1개월' },
  { term: '2', label: '2개월' },
  { term: '3', label: '3개월' },
  { term: '4', label: '4개월' },
  { term: '5', label: '5개월' },
  { term: '6', label: '6개월' },
  { term: '12', label: '1년' },
]

const props = defineProps({
  filterType: { type: Object, required: true },
  beginDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  isSimple: { type: Boolean },
})
const emit = defineEmits(['update:beginDate', 'update:endDate'])

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
  if (isAfter(startOfMonth(beginDate), startOfMonth(props.endDate))) {
    alert('시작일은 종료일 이전이여야 합니다.')
  } else {
    emit('update:beginDate', beginDate)
    // appendQuerys({ dateTerm: '', beginDate, endDate: state.value.endDate })
  }
}
const changeEndDate = (endDate) => {
  if (isAfter(startOfMonth(props.beginDate), startOfMonth(endDate))) {
    alert('종료일은 시작일 이후여야 합니다.')
  } else {
    emit('update:endDate', endDate)
    // appendQuerys({ dateTerm: '', beginDate: state.value.beginDate, endDate })
  }
}

const handleTabChanged = (dateTerm) => {
  let endDate = new Date()
  let beginDate = subMonths(endDate, dateTerm * 1)

  emit('update:beginDate', beginDate)
  emit('update:endDate', endDate)
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
