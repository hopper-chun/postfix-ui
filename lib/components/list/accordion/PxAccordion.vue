<script setup>
import { ref } from 'vue'

const props = defineProps({
  duration: { type: [Number, String], default: 200 },
  currentState: { type: Boolean },
})

const accState = ref(props.currentState)

const useSlotFunc = ref(false)

const handleClickAccContainer = (arg) => {
  if (useSlotFunc.value) {
    return
  }

  if (arg === 'on') {
    accState.value = true
  } else if (arg === 'off') {
    accState.value = false
  } else {
    accState.value = !accState.value
  }
}

const handleClickAcc = (arg) => {
  useSlotFunc.value = true

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
    <div class="px-accordion--header" @click="handleClickAccContainer">
      <slot name="header" :handleClickAcc="handleClickAcc" :accState="accState"> </slot>
    </div>
    <div class="px-accordion--body" :class="{ open: accState }" :style="{ transitionDuration: `${duration}ms` }">
      <div class="expandable">
        <slot name="body" :handleClickAcc="handleClickAcc" :accState="accState"></slot>
      </div>
    </div>
  </div>
</template>
