<script setup>
import { subDays, isAfter, isBefore, format, parseISO, parse } from 'date-fns'

const emit = defineEmits(['onAppendQuerys'])

const changeBeginDate = (date) => {
  emit('onAppendQuerys', [{ key: 'yyyymmdd', value: format(date, 'yyyyMMdd') }])
}
</script>

<template>
  <div class="px-searchDate day">
    <PxDatePicker
      size="xs"
      class="datePicker"
      :modelValue="$route.query?.yyyymmdd ? parse($route.query.yyyymmdd, 'yyyyMMdd', new Date()) : new Date()"
      @update:modelValue="changeBeginDate"
    ></PxDatePicker>
  </div>
</template>
