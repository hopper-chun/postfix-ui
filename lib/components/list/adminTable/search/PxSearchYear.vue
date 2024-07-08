<script setup>
import { subDays, isAfter, isBefore, format, parseISO, parse } from 'date-fns'

const emit = defineEmits(['onAppendQuerys'])

const changeBeginDate = (date) => {
  emit('onAppendQuerys', [{ key: 'yyyy', value: format(date, 'yyyy') }])
}
</script>

<template>
  <div class="px-searchDate year">
    <PxMonthPicker
      isYear
      size="xs"
      class="datePicker"
      :modelValue="$route.query?.yyyy ? parse($route.query.yyyy, 'yyyy', new Date()) : new Date()"
      @update:modelValue="changeBeginDate"
    ></PxMonthPicker>
  </div>
</template>
