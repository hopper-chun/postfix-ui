<script setup>
import { watchEffect } from 'vue'

const props = defineProps({
  items: { type: (String, Array, Object) },
})

watchEffect(() => {
  items.length
})
</script>
<template>
  <div class="w-[280px] h-[100px] px-[12px] py-[12px] rounded-[12px] flex items-center justify-center shadow-md border">
    {{ items.desc }}
  </div>
</template>
