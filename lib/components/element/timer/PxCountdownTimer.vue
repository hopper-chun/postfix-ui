<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as filters from '@/filters'

const timerSec = ref(0)
let timerHandle = null

const start = (seconds) => {
  timerSec.value = seconds
  timerHandle = window.setInterval(() => {
    if (timerSec.value > 0) {
      timerSec.value -= 1
    } else {
      stop()
    }
  }, 1000)
}

const stop = () => {
  timerHandle && window.clearTimeout(timerHandle)
  timerHandle = null
}

onMounted(() => start(60 * 3))
onBeforeUnmount(() => stop())

defineExpose({ start, stop })
</script>

<template>
  <div class="px-countdownTimer">
    {{ filters.displaySeconds(timerSec) }}
  </div>
</template>
