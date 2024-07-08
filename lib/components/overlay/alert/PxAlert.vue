<script setup>
import { ref } from 'vue'

const emit = defineEmits(['onOpen', 'onClose'])

const active = ref(false)

const open = () => {
  active.value = true
  emit('onOpen')
}
const close = () => {
  active.value = false
  emit('onClose')
}

defineExpose({ open, close })
</script>

<template>
  <transition
    enter-active-class="transition duration-300 ease-in"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <template v-if="active">
      <!-- <div class="fixed inset-0 z-30 flex items-center justify-center bg-black/40" @click.self="close"> -->
      <div class="px-alert" @click.stop="">
        <slot :closeDialog="close"></slot>
      </div>
    </template>
  </transition>
</template>
