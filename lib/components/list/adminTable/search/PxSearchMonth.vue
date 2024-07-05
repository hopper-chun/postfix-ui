<script setup>
import { computed } from 'vue'
import { subDays, isAfter, isBefore, format, parseISO, parse } from 'date-fns'

const emit = defineEmits(['onAppendQuerys'])

const changeBeginDate = (date) => {
  console.log('date', date)

  emit('onAppendQuerys', [{ key: 'yyyymm', value: format(date, 'yyyyMM') }])
}
</script>

<template>
  <div class="flex items-center space-x-[12px]">
    <RmMonthPicker
      size="xs"
      class="flex h-[48px] w-[160px] items-center"
      :modelValue="$route.query?.yyyymm ? parse($route.query.yyyymm, 'yyyyMM', new Date()) : new Date()"
      @update:modelValue="changeBeginDate"
    ></RmMonthPicker>
  </div>
</template>
