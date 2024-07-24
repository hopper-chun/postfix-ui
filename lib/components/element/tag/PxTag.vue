<script setup>
import { computed } from 'vue'

const emit = defineEmits(['onRemove', 'onModify'])
const props = defineProps({
  color: { type: String, default: 'pri' },
  remove: { type: Boolean, default: false },
  modify: { type: Boolean, default: false },
  filled: { type: Boolean },
})

const isFilled = computed(() => {
  if (props.filled !== undefined) {
    return props.filled
  } else if (props.color && !props.color.endsWith('border')) {
    return true
  } else return false
})

const handleRemove = () => {
  emit('onRemove')
}
const handleModify = () => {
  emit('onModify')
}
</script>

<template>
  <div class="px-tag" :class="[color, { filled: isFilled }, { hasTag: remove || modify }]">
    <div style="display: flex; align-items: center">
      <slot></slot>
    </div>
    <button v-if="modify" @click="handleModify" class="px-tag--func modify"></button>
    <button v-if="remove" @click="handleRemove" class="px-tag--func remove"></button>
  </div>
</template>
