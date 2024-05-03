<script setup>
import { ref, computed } from 'vue'
import { add, format, isBefore, startOfWeek, startOfMonth, endOfWeek, endOfMonth, isSameDay, isSameMonth } from 'date-fns'

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
    <div class="rm-datepiccker--panel">
      <div class="rm-datepiccker--panel_container">
        <div class="rm-datepiccker--panel_nav">
          <span tabindex="0" class="month">{{ display.monthTitle }}</span>
          <div class="button_wrapper">
            <button aria-label="calendar backward" class="month_prev" @click="prevMonth"></button>
            <button aria-label="calendar forward" class="month_next" @click="nextMonth"></button>
          </div>
        </div>
        <div class="rm-datepiccker--panel_calendar">
          <table>
            <thead>
              <tr>
                <th v-for="day in ['일', '월', '화', '수', '목', '금', '토']" :key="day">
                  <div>
                    <p class="day_week">{{ day }}</p>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="week in display.weeks" :key="week">
                <td v-for="day in week" :key="day" @click="handleClick(day)">
                  <div class="day" v-if="!day.isToday && !day.isSelectedDay">
                    <p class="" :class="[{ isBlur: !day.isCurrMonth }]">{{ day.d }}</p>
                  </div>

                  <div class="day" v-else>
                    <a role="link" tabindex="0" :class="[{ isSelectedDay: day.isSelectedDay }]">{{ day.d }}</a>
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
