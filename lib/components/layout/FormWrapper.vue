<script setup>
import { RmLabel } from '@/components/element/label'
const props = defineProps({
  horizontal: { type: Boolean },
  labelWidth: { type: [String, Number] },
  label: { type: String },
  labelFontSize: { type: String },
  labelFontColor: { type: String },
  labelHelper: { type: String },
  id: { type: String },
  required: { type: Boolean },
})
</script>
<template>
  <div :class="horizontal ? 'sm:grid sm:items-center' : ''" :style="horizontal ? `grid-template-columns : ${labelWidth}px 1fr;` : ''">
    <div v-if="label" class="flex space-x-[8px] leading-[160%]" :class="[horizontal ? '' : 'mb-[4px]']">
      <label :for="id" class="break-all relative" :class="[labelFontSize, labelFontColor]"
        >{{ label }}<span v-if="required" class="absolute top-[5px] -right-[6px] h-[4px] w-[4px] rounded-full bg-red-500"></span
      ></label>
      <div v-if="labelHelper" class="pl-[4px] translate-y-[1px] text-[12px] text-[#737373]">{{ labelHelper }}</div>
    </div>
    <slot> </slot>
  </div>
</template>
<style></style>
