<script setup>
import { ref, watchEffect } from 'vue'

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

// watchEffect(() => {
//   if (props.currentState) {
//     accState.value = props.currentState
//   }
// })
</script>

<template>
  <div class="rm-accordion">
    <div class="rm-accordion--header">
      <slot name="header" :handleClickAcc="handleClickAcc" :accState="accState"> </slot>
    </div>
    <div class="rm-accordion--body" :class="{ open: accState }" :style="{ transitionDuration: `${duration}ms` }">
      <div class="expandable">
        <slot name="body" :handleClickAcc="handleClickAcc" :accState="accState"></slot>
      </div>
    </div>
  </div>
</template>
