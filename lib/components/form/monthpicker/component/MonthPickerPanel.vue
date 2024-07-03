<script setup>
import { ref, computed } from 'vue'
import { add, format, startOfYear, isSameMonth, isSameYear } from 'date-fns'

const props = defineProps({
  modelValue: { type: Date, default: new Date() },
  isYear: { type: Boolean },
  lang: { type: String, default: 'ko' },
})
const emit = defineEmits(['update:modelValue'])

const monthsTitle = computed(() => {
  if (props.lang === 'ko') {
    return '월'
  } else if (props.lang === 'jp') {
    return '月'
  } else {
    return ''
  }
})
const yearsTitle = computed(() => {
  if (props.lang === 'ko') {
    return '년'
  } else if (props.lang === 'jp') {
    return '年'
  } else {
    return ''
  }
})

const generateYear = (startMonth, selectedDate) => {
  return [...Array(12)].map((_, index) => {
    const currentMonth = add(startMonth, { months: index })

    return {
      currentMonth,
      m: format(currentMonth, `M${monthsTitle.value}`),
      isSelectedDay: isSameMonth(currentMonth, selectedDate),
      isCurrMonth: isSameMonth(currentMonth, today),
    }
  })
}

const generateYears = (startYear, selectedDate) => {
  return [...Array(9)].map((_, index) => {
    const currentYear = add(startYear, { years: index - 4 })

    return {
      currentYear,
      y: format(currentYear, `yyyy${yearsTitle.value}`),
      isSelectedDay: isSameYear(currentYear, selectedDate),
      isCurrYear: isSameYear(currentYear, today),
    }
  })
}

const today = new Date()

const baseDate = ref(props.modelValue)

const prevMonth = () => {
  if (props.isYear) {
    baseDate.value = add(baseDate.value, { years: -9 })
  } else {
    baseDate.value = add(baseDate.value, { years: -1 })
  }
}
const nextMonth = () => {
  if (props.isYear) {
    baseDate.value = add(baseDate.value, { years: 9 })
  } else {
    baseDate.value = add(baseDate.value, { years: 1 })
  }
}
const handleClick = (date) => {
  if (props.isYear) {
    emit('update:modelValue', date.currentYear)
  } else {
    emit('update:modelValue', date.currentMonth)
  }
}

const display = computed(() => {
  const startMonth = startOfYear(baseDate.value)

  const monthTitle = format(baseDate.value, `yyyy${yearsTitle.value}`)
  const yearTitle = format(props.modelValue, `yyyy${yearsTitle.value}`)

  const month = generateYear(startMonth, props.modelValue)
  const year = generateYears(startMonth, props.modelValue)

  return {
    month,
    year,
    startMonth,

    monthTitle,
    yearTitle,
  }
})
</script>
<template>
  <body class="month" :class="{ isYear: isYear }">
    <div class="px-datepicker--panel">
      <div class="px-datepicker--panel_container">
        <div class="px-datepicker--panel_nav">
          <span tabindex="0" class="month">
            {{ isYear ? display.yearTitle : display.monthTitle }}
          </span>
          <div class="button_wrapper">
            <button aria-label="calendar backward" class="month_prev" @click="prevMonth"></button>
            <button aria-label="calendar forward" class="month_next" @click="nextMonth"></button>
          </div>
        </div>
        <div class="px-datepicker--panel_calendar">
          <div v-if="!isYear">
            <div
              v-for="month in display.month"
              @click="handleClick(month)"
              class="day"
              :class="month.isSelectedDay ? 'isSelectedDay' : month.isCurrMonth ? 'isCurrMonth' : ''"
            >
              {{ month.m }}
            </div>
          </div>
          <div v-else>
            <div
              v-for="year in display.year"
              @click="handleClick(year)"
              class="day"
              :class="year.isSelectedDay ? 'isSelectedDay' : year.isCurrYear ? 'isCurrMonth' : ''"
            >
              {{ year.y }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
</template>
