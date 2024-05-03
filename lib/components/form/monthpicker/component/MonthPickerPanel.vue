<script setup>
import { ref, computed } from 'vue'
import { add, format, isBefore, startOfWeek, startOfMonth, endOfWeek, endOfMonth, isSameDay, isSameMonth } from 'date-fns'
import { IconChevronDown } from '@/components/icon'

const props = defineProps({
  modelValue: { type: Date, default: new Date() },
  isYear: { type: Boolean },
})
const emit = defineEmits(['update:modelValue'])

const generateWeek = (startDate, baseDate, today, selectedDate) => {
  return [...Array(7)].map((_, index) => {
    const currentDate = add(startDate, { days: index })
    return {
      currentDate,
      d: format(currentDate, 'd'),
      isToday: isSameDay(currentDate, today),
      isCurrMonth: isSameMonth(currentDate, baseDate),
      isSelectedDay: isSameDay(currentDate, selectedDate),
    }
  })
}
const generateMonth = (startDate, endDate, baseDate, today, selectedDate) => {
  return [...Array(6)].reduce((acc, _, index) => {
    const beginDate = add(startDate, { days: index * 7 })
    const week = generateWeek(beginDate, baseDate, today, selectedDate)
    if (isBefore(week[0].currentDate, endDate)) {
      acc.push(week)
    }
    return acc
  }, [])
}

const today = new Date()

const baseDate = ref(props.modelValue)

const prevMonth = () => {
  baseDate.value = add(baseDate.value, { months: props.isYear ? -12 : -1 })
}
const nextMonth = () => {
  baseDate.value = add(baseDate.value, { months: props.isYear ? 12 : 1 })
}
const handleClick = () => {
  emit('update:modelValue', baseDate.value)
}

// console.log(format(endDate, 'yyyy MM dd'))

const display = computed(() => {
  const startDate = startOfWeek(startOfMonth(baseDate.value))
  const endDate = endOfWeek(endOfMonth(baseDate.value))

  const monthTitle = format(baseDate.value, props.isYear ? 'yyyy년' : 'yyyy년 MM월')
  const weeks = generateMonth(startDate, endDate, baseDate.value, today, props.modelValue)
  return {
    monthTitle,
    weeks,
  }
})
</script>
<template>
  <body class="w-[300px]">
    <div class="flex items-center justify-center">
      <div class="w-full max-w-sm shadow-lg">
        <div class="rounded-t bg-white p-[20px] md:p-[32px]">
          <div class="flex items-center justify-between px-[16px]">
            <span tabindex="0" class="cursor-pointer text-base font-bold text-gray-800 focus:outline-none dark:text-gray-100" @click="handleClick">{{
              display.monthTitle
            }}</span>
            <div class="flex items-center">
              <button aria-label="calendar backward" class="text-gray-500 hover:text-gray-700 focus:text-gray-700" @click="prevMonth">
                <IconChevronDown class="h-[24px] w-[24px] rotate-90" aria-hidden="true" />
              </button>
              <button aria-label="calendar forward" class="text-gray-500 hover:text-gray-700 focus:text-gray-700" @click="nextMonth">
                <IconChevronDown class="h-[24px] w-[24px] -rotate-90" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
</template>
