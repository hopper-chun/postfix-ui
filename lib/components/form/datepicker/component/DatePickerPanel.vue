<script setup>
import { ref, computed, watchEffect } from 'vue'
import { add, format, isBefore, startOfWeek, startOfMonth, endOfWeek, endOfMonth, isSameDay, isSameMonth } from 'date-fns'

const props = defineProps({
  modelValue: { type: Date, default: new Date() },
  lang: { tpye: 'String', default: 'ko' },
  dotDays: { type: Array },
  cbMonth: { type: Function },
})

const emit = defineEmits(['update:modelValue'])

const weeksTitle = computed(() => {
  if (props.lang === 'ko') {
    return ['일', '월', '화', '수', '목', '금', '토']
  } else if (props.lang === 'jp') {
    return ['日', '月', '火', '水', '木', '金', '土']
  } else {
    return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  }
})

const dateTitle = computed(() => {
  if (props.lang === 'ko') {
    return 'yyyy년 M월'
  } else if (props.lang === 'jp') {
    return 'yyyy年 M月'
  } else {
    return 'yyyy MM'
  }
})

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

const display = computed(() => {
  const startDate = startOfWeek(startOfMonth(baseDate.value))
  const endDate = endOfWeek(endOfMonth(baseDate.value))

  const monthTitle = format(baseDate.value, dateTitle.value)
  const weeks = generateMonth(startDate, endDate, baseDate.value, today, props.modelValue)
  return {
    monthTitle,
    weeks,
  }
})

const findDot = (day) => {
  return props.dotDays && props.dotDays.length > 0 ? props.dotDays.indexOf(parseInt(day)) !== -1 : false
}
watchEffect(() => {
  props.cbMonth && props.cbMonth(format(baseDate.value, 'yyyyMM'))
})
</script>
<template>
  <body class="date">
    <div class="px-datepicker--panel">
      <div class="px-datepicker--panel_container">
        <div class="px-datepicker--panel_nav">
          <span tabindex="0" class="month">{{ display.monthTitle }}</span>
          <div class="button_wrapper">
            <button aria-label="calendar backward" class="month_prev" @click="prevMonth"></button>
            <button aria-label="calendar forward" class="month_next" @click="nextMonth"></button>
          </div>
        </div>
        <div class="px-datepicker--panel_calendar">
          <table>
            <thead>
              <tr>
                <th v-for="day in weeksTitle" :key="day">
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
                    <p class="" :class="[{ isBlur: !day.isCurrMonth, isDot: day.isCurrMonth && findDot(day.d) }]">{{ day.d }}</p>
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
