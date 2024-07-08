<script setup>
import { subDays, isAfter, isBefore, format, parseISO, parse } from 'date-fns'

const emit = defineEmits(['onAppendQuerys'])

const changeBeginDate = (date) => {
  emit('onAppendQuerys', [{ key: 'yyyymm', value: format(date, 'yyyyMM') }])
}
</script>

<template>
  <div class="px-searchDate month">
    <PxMonthPicker
      size="xs"
      class="datePicker"
      :modelValue="$route.query?.yyyymm ? parse($route.query.yyyymm, 'yyyyMM', new Date()) : new Date()"
      @update:modelValue="changeBeginDate"
    ></PxMonthPicker>
  </div>
</template>
