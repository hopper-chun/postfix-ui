<script setup>
import { computed, ref } from 'vue'
import { subDays, isAfter, isBefore, format, parseISO } from 'date-fns'
// import { useTheme } from 'remain-ui-lib2'

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

const theme = useTheme(computed(() => {}))

const local = ref({
  currentTabValue: '',
})

// const state = computed(() => {
//   const ret = {
//     dateType: '',
//     beginDate: new Date(),
//     endDate: new Date(),
//   }
//   // const filters = props.searchFilter.filters.value.filter((f) => f[0].group === 'date')
//   const mapper = props.filters.reduce((acc, filter) => {
//     acc[filter[0].key] = filter[1]
//     return acc
//   }, {})
//   // console.log('mapper', mapper)

//   const dateType = mapper['dateType']
//   const dateTerm = mapper['dateTerm']
//   const beginDate = mapper['beginDate']
//   const endDate = mapper['endDate']

//   ret.dateType = dateType || props.dateOptions[0].key

//   if (beginDate && endDate) {
//     ret.currentTabValue = ''
//     ret.beginDate = parseISO(beginDate)
//     ret.endDate = parseISO(endDate)
//   } else if (dateTerm) {
//     ret.currentTabValue = dateTerm
//     if (dateTerm !== 'all') {
//       ret.beginDate = subDays(new Date(), dateTerm * 1)
//       ret.endDate = new Date()
//     }
//   } else {
//     ret.currentTabValue = 'all'
//   }

//   return ret
// })

const calenderTextColor = computed(() => {
  if (local.value.currentTabValue === '') {
    return 'text-indigo-500'
    // } else if (local.value.currentTabValue === 'all') {
    //   return 'text-gray-300'
  } else {
    return 'text-gray-700'
  }
})

// // JSON.stringify(constTabs[constTabs.length - 2]), // 1년으로 초기값 설정

// function querys() {
//   const ret = [
//     { key: 'dateType', value: state.value.dateType },
//     { key: 'dateTerm', value: state.value.currentTabValue },
//   ]

//   if (state.value.currentTabValue === '') {
//     ret.push({ key: 'beginDate', value: format(state.value.beginDate, 'yyyy-MM-dd') })
//     ret.push({ key: 'endDate', value: format(state.value.endDate, 'yyyy-MM-dd') })
//   }
//   return ret
// }

// const appendQuerys = (arg) => {
//   // props.searchFilter.appendQuerys([
//   emit('onAppendQuerys', [
//     { key: 'dateType', value: state.value.dateType },
//     { key: 'dateTerm', value: arg?.dateTerm || '' },
//     { key: 'beginDate', value: (arg?.beginDate && format(arg.beginDate, 'yyyy-MM-dd')) || '' },
//     { key: 'endDate', value: (arg?.endDate && format(arg.endDate, 'yyyy-MM-dd')) || '' },
//   ])
// }

const changeBeginDate = (beginDate) => {
  if (isAfter(beginDate, props.endDate)) {
    alert('시작일은 종료일 이전이여야 합니다.')
  } else {
    emit('update:beginDate', beginDate)
    // appendQuerys({ dateTerm: '', beginDate, endDate: state.value.endDate })
  }
}
const changeEndDate = (endDate) => {
  if (isBefore(endDate, props.beginDate)) {
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
  <div class="sm:flex sm:items-center sm:space-x-[12px]">
    <RmTabInPill
      v-if="!isSimple"
      v-model="local.currentTabValue"
      :options="constTabs"
      :optionsLabel="(option) => option.label"
      :optionsValue="(option) => option.term"
      @update:modelValue="handleTabChanged"
      class="shrink-0"
    ></RmTabInPill>
    <!-- :activeClasses="`rounded-[4px] ${theme.primary.text} bg-[#F3F4F6]`" -->
    <!-- innerClasses="h-[32px] rounded-[4px] px-[4px] text-sm sm:text-[12px]" -->
    <div class="flex items-center space-x-[8px]">
      <RmDatePicker
        size="xs"
        class="flex h-[34px] w-[120px] items-center"
        :class="calenderTextColor"
        :modelValue="props.beginDate"
        @update:modelValue="changeBeginDate"
      ></RmDatePicker>
      <RmDatePicker
        size="xs"
        class="flex h-[34px] w-[120px] items-center"
        :class="calenderTextColor"
        :modelValue="props.endDate"
        @update:modelValue="changeEndDate"
      ></RmDatePicker>
    </div>
  </div>
</template>
