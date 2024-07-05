<script setup>
import { computed } from 'vue'
import { subDays, isAfter, isBefore, format, parseISO, parse } from 'date-fns'

const emit = defineEmits(['onAppendQuerys'])

const changeBeginDate = (date) => {
  console.log('date', date)

  emit('onAppendQuerys', [{ key: 'yyyy', value: format(date, 'yyyy') }])
}
</script>

<template>
  <div class="flex items-center space-x-[12px]">
    <RmMonthPicker
      isYear
      size="xs"
      class="flex h-[48px] w-[160px] items-center"
      :modelValue="$route.query?.yyyy ? parse($route.query.yyyy, 'yyyy', new Date()) : new Date()"
      @update:modelValue="changeBeginDate"
    ></RmMonthPicker>
  </div>
</template>
