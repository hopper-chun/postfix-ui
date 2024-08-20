<script setup>
import Test from './Test.vue'

const handle = () => {
  console.log('click2')
}
</script>

<template>
  <div class_="w-[400px] h-[400px] bg-red-500">
    <PxButton> Hello World</PxButton>

    <component :is="Test" v-on:onClick2="handle"></component>
  </div>
</template>
