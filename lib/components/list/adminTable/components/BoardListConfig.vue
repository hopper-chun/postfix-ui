<script setup>
import _ from 'lodash'

const props = defineProps({
  modelValue: { type: Object, required: true },
})
</script>
<template>
  <div class="px-boardListConfig">
    <div v-for="option in modelValue.state.headers" class="option">
      <PxToggle
        :label="option.label"
        :id="option.field"
        :modelValue="option.using"
        :disabled="option.essential"
        @update:modelValue="
          ($event) => {
            option.using = $event
            $emit('onToggle')
          }
        "
      ></PxToggle>
    </div>
  </div>
</template>
