<script setup>
defineProps({
  label: { type: String, required: true },
  to: { type: Object, required: true },
  addClass: { type: [String, Object, Array], default: 'text-blue-500' },
})
const emit = defineEmits(['onClick'])
</script>

<template>
  <router-link :to="to" :class="addClass">
    {{ label }}
  </router-link>
</template>
