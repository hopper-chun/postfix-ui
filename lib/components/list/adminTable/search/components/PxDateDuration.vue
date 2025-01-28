<script setup>
import { computed, ref } from 'vue'
import { subDays, isAfter, startOfDay } from 'date-fns'

const constTabs = [
  { term: '0', label: '오늘' },
  { term: '3', label: '3일' },
  { term: '7', label: '7일' },
  { term: '30', label: '1개월' },
  { term: '90', label: '3개월' },
  { term: '365', label: '1년' },
  // { term: 'all', label: '전체' },
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
  }
}
const changeEndDate = (endDate) => {
  if (isAfter(startOfDay(props.beginDate), startOfDay(endDate))) {
    alert('종료일은 시작일 이후여야 합니다.')
  } else {
    emit('update:endDate', endDate)
    // appendQuerys({ dateTerm: '', beginDate: state.value.beginDate, endDate })
  }
}

const handleTabChanged = (dateTerm) => {
  let endDate = new Date()
  let beginDate = subDays(endDate, dateTerm * 1)

  emit('update:beginDate', beginDate)
  emit('update:endDate', endDate)
}
</script>
<template>
  <div class="date px-dateDuration">
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
      <PxDatePicker size="xs" class="datePicker" :class="calenderTextColor" :modelValue="props.beginDate" @update:modelValue="changeBeginDate"></PxDatePicker>
      <PxDatePicker size="xs" class="datePicker" :class="calenderTextColor" :modelValue="props.endDate" @update:modelValue="changeEndDate"></PxDatePicker>
    </div>
  </div>
</template>
