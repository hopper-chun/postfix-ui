<script setup>
const props = defineProps({
  color: { type: String, default: 'black' },
  position: { type: String, default: 'center' },
})
</script>
<template>
  <div class="px-speechBubble" :class="[{ black: color === 'black' }, { pri: color === 'pri' }, { sec: color === 'sec' }]">
    <div class="px-speechBubble--message">
      <slot></slot>
    </div>
    <div
      class="px-speechBubble--tail bottom-[3px]"
      :class="[{ left: position === 'left' }, { right: position === 'right' }, { center: position === 'center' }]"
    ></div>
  </div>
</template>
