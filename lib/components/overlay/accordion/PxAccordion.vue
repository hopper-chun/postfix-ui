<script setup>
import { ref } from 'vue'

const props = defineProps({
  duration: { type: [Number, String], default: 200 },
  currentState: { type: Boolean },
})

const accState = ref(props.currentState)

const handleClickAcc = (arg) => {
  if (arg === 'on') {
    accState.value = true
  } else if (arg === 'off') {
    accState.value = false
  } else {
    accState.value = !accState.value
  }
}
</script>

<template>
  <div class="px-accordion">
    <div class="px-accordion--header">
      <slot name="header" :handleClickAcc="handleClickAcc" :accState="accState"> </slot>
    </div>
    <div class="px-accordion--body" :class="{ open: accState }" :style="{ transitionDuration: `${duration}ms` }">
      <div class="expandable">
        <slot name="body" :handleClickAcc="handleClickAcc" :accState="accState"></slot>
      </div>
    </div>
  </div>
</template>
