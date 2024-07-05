<script setup>
import { computed } from 'vue'
import { subDays, isAfter, isBefore, format, parseISO, parse } from 'date-fns'

const emit = defineEmits(['onAppendQuerys'])

const changeBeginDate = (date) => {
  console.log('date', date)

  emit('onAppendQuerys', [{ key: 'yyyymmdd', value: format(date, 'yyyyMMdd') }])
}
</script>

<template>
  <div class="flex items-center space-x-[12px]">
    <PxDatePicker
      size="xs"
      class="flex h-[48px] w-[160px] items-center"
      :modelValue="$route.query?.yyyymmdd ? parse($route.query.yyyymmdd, 'yyyyMMdd', new Date()) : new Date()"
      @update:modelValue="changeBeginDate"
    ></PxDatePicker>
  </div>
</template>
