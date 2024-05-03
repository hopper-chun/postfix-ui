<script setup>
import { ref, computed } from 'vue'
import { add, format, isBefore, startOfWeek, startOfMonth, endOfWeek, endOfMonth, isSameDay, isSameMonth } from 'date-fns'
import { IconChevronDown } from '@/components/icon'

const props = defineProps({
  modelValue: { type: Date, default: new Date() },
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
  baseDate.value = add(baseDate.value, { months: -1 })
}
const nextMonth = () => {
  baseDate.value = add(baseDate.value, { months: 1 })
}
const handleClick = (day) => {
  emit('update:modelValue', day.currentDate)
}

// console.log(format(endDate, 'yyyy MM dd'))

const display = computed(() => {
  const startDate = startOfWeek(startOfMonth(baseDate.value))
  const endDate = endOfWeek(endOfMonth(baseDate.value))

  const monthTitle = format(baseDate.value, 'yyyy년 MM월')
  const weeks = generateMonth(startDate, endDate, baseDate.value, today, props.modelValue)
  return {
    monthTitle,
    weeks,
  }
})
</script>
<template>
  <body class="">
    <div class="w-full max-w-sm shadow-lg">
      <div class="rounded-t bg-white p-[20px] md:p-[32px]">
        <div class="flex items-center justify-between px-[16px]">
          <span tabindex="0" class="text-[18px] font-bold text-gray-800 focus:outline-none dark:text-gray-100">{{ display.monthTitle }}</span>
          <div class="flex items-center space-x-[8px]">
            <button aria-label="calendar backward" class="text-gray-500 hover:text-gray-700 focus:text-gray-700" @click="prevMonth">
              <IconChevronDown class="h-[24px] w-[24px] rotate-90" aria-hidden="true" />
            </button>
            <button aria-label="calendar forward" class="text-gray-500 hover:text-gray-700 focus:text-gray-700" @click="nextMonth">
              <IconChevronDown class="h-[24px] w-[24px] -rotate-90" aria-hidden="true" />
            </button>
          </div>
        </div>
        <div class="flex items-center justify-between overflow-x-auto pt-[20px]">
          <table class="w-full">
            <thead>
              <tr>
                <th v-for="day in ['일', '월', '화', '수', '목', '금', '토']" :key="day">
                  <div class="flex w-full justify-center">
                    <p class="text-center text-base font-medium text-gray-800 dark:text-gray-100">{{ day }}</p>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="week in display.weeks" :key="week">
                <td class="pt-[8px]" v-for="day in week" :key="day" @click="handleClick(day)">
                  <div class="flex w-full cursor-pointer justify-center px-[8px] py-[8px]" v-if="!day.isToday && !day.isSelectedDay">
                    <p class="text-base" :class="day.isCurrMonth ? 'font-semibold text-gray-500' : 'text-gray-300'">{{ day.d }}</p>
                  </div>

                  <div class="flex w-full cursor-pointer items-center justify-center rounded-full" v-else>
                    <a
                      role="link"
                      tabindex="0"
                      class="flex h-[32px] w-[32px] items-center justify-center rounded-full text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2"
                      :class="
                        day.isSelectedDay
                          ? 'bg-red-700 hover:bg-red-500 focus:bg-red-500 focus:ring-red-700'
                          : 'bg-indigo-200 hover:bg-indigo-100 focus:bg-indigo-100 focus:ring-indigo-200'
                      "
                      >{{ day.d }}</a
                    >
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </body>
</template>
