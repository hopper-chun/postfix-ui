<script setup>
const props = defineProps({
  text: { type: String },
  active: { type: Boolean },
  extraClass: { type: [String, Object] },
})
</script>

<template>
  <div class="px-colorTableCell">
    <div :class="{ active }">{{ text }}</div>
  </div>
</template>
