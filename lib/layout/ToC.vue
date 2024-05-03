<script setup>
import { useTheme } from '@/composables'
const theme = useTheme()

const props = defineProps({
  list: { type: Object, required: true },
  state: {
    type: String,
  },
})
const handle = (value) => {
  console.log(value.goto())
}
</script>
<template>
  <div class="sticky right-0 top-[120px] hidden h-full w-[200px] space-y-[8px] pl-[40px] 2xl:block">
    <div class="font-bold">CONTENTS</div>
    <div v-for="(value, key) in list">
      <div class="duration-400 cursor-pointer text-[14px] transition" @click="handle(value)" :class="state === key ? theme.primary.text : ' '">
        {{ key }}
      </div>
    </div>
  </div>
</template>
