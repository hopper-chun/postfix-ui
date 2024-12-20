<script setup>
import { ref } from 'vue'

const props = defineProps({
  duration: { type: [Number, String], default: 200 },
  currentState: { type: Boolean },
})

const isOpen = ref(props.currentState)

const useSlotFunc = ref(false)

const handleClickAccContainer = (arg) => {
  if (useSlotFunc.value) {
    return
  }

  if (arg === 'on') {
    isOpen.value = true
  } else if (arg === 'off') {
    isOpen.value = false
  } else {
    isOpen.value = !isOpen.value
  }
}

const handleClickAcc = (arg) => {
  useSlotFunc.value = true

  if (arg === 'on') {
    isOpen.value = true
  } else if (arg === 'off') {
    isOpen.value = false
  } else {
    isOpen.value = !isOpen.value
  }
}
</script>

<template>
  <div class="px-accordion">
    <div class="px-accordion--header" @click="handleClickAccContainer">
      <slot name="header" :handleClickAcc="handleClickAcc" :isOpen="isOpen"> </slot>
    </div>
    <div class="px-accordion--body" :class="{ open: isOpen }" :style="{ transitionDuration: `${duration}ms` }">
      <div class="expandable">
        <slot name="body" :handleClickAcc="handleClickAcc" :isOpen="isOpen"></slot>
      </div>
    </div>
  </div>
</template>
