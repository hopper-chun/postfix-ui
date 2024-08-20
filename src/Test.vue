<script setup>
const emit = defineEmits(['onClick2'])

const handle = () => {
  console.log('emit---')
  emit('onClick2')
}
</script>

<template>
  <div @click="handle">AAA</div>
</template>
