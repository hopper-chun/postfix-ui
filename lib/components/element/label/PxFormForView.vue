<script setup>
const props = defineProps({
  id: { type: String },
  required: { type: Boolean },
  label: { type: String },
  labelHelper: { type: String },
  viewMode: { type: Boolean },
  md: { type: String },
})
</script>
<template>
  <div class="px-formForView labelSwitch">
    <div v-if="viewMode" class="px-formForView--view" :class="[{ viewMode }]">
      <PxLabel :id="id" :label="label" :md="md" :labelHelper="labelHelper"> </PxLabel>
    </div>
    <div v-else class="px-formForView--edit">
      <PxLabel :label="label" :md="md" :required="required" :labelHelper="labelHelper"> </PxLabel>
    </div>
    <div class="px-formForView--body" :class="[{ viewMode }]">
      <slot></slot>
    </div>
  </div>
</template>
