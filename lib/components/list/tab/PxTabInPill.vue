<script setup>
const props = defineProps({
  modelValue: { type: [Object, String, Number, Boolean], required: true },
  options: { type: Array, required: true },
  optionsLabel: { type: Function, default: (option) => option },
  optionsValue: { type: Function, default: (option) => option },
})
</script>

<template>
  <div class="px-tabInPill">
    <PxTab
      :modelValue="modelValue"
      @update:modelValue="$emit('update:modelValue', $event)"
      :options="options"
      :optionsLabel="optionsLabel"
      :optionsValue="optionsValue"
    ></PxTab>
  </div>
</template>
