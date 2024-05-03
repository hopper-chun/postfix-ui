<script setup>
const emit = defineEmits(['onRemove', 'onModify'])
const props = defineProps({
  color: { type: String, default: 'pri' },
  filled: { type: Boolean, default: false },
  isRemove: { type: Boolean, default: false },
  isModify: { type: Boolean, default: false },
})

const handleRemove = () => {
  emit('onRemove')
}
const handleModify = () => {
  emit('onModify')
}
</script>

<!-- 컬러 ... 일반적으로 black, pri,  -->
<template>
  <div class="px-tag" :class="[color, { filled: filled }, { hasTag: isRemove || isModify }]">
    <div style="display: flex; align-items: center">
      <slot></slot>
    </div>
    <button v-if="isModify" @click="handleModify" class="px-tag--func modify"></button>
    <button v-if="isRemove" @click="handleRemove" class="px-tag--func remove"></button>
  </div>
</template>
