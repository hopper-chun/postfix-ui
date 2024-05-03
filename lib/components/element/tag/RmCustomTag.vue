<script setup>
import { RmIcon } from '@/components'

const emit = defineEmits(['onRemove', 'onModify'])
const props = defineProps({
  size: { type: String, default: 'md' },
  radiusFull: { type: Boolean, default: false },
  classes: { type: [String, Array, Object] },
  isRemove: { type: Boolean, default: false },
  isModify: { type: Boolean, default: false },
  color: { type: String, default: 'gray' },
  outlined: { type: Boolean, default: false },
})

const handleRemove = () => {
  emit('onRemove')
}
const handleModify = () => {
  emit('onModify')
}
</script>
<template>
  <div>
    <div class="inline-flex items-center" :class="classes">
      <div class="flex items-center">
        <slot></slot>
      </div>
      <div class="flex items-center space-x-[12px]">
        <button v-if="isModify" @click="handleModify" class="flex h-[20px] w-[20px] items-center justify-center">
          <slot name="icon">
            <RmIcon name="icon-modify" class="w-[16px]" />
          </slot>
        </button>
        <button v-if="isRemove" @click="handleRemove" class="flex h-[20px] w-[20px] items-center justify-center">
          <slot name="icon">
            <RmIcon name="icon-close-circle-filled2" class="w-[16px]" />
          </slot>
        </button>
      </div>
    </div>
  </div>
</template>
