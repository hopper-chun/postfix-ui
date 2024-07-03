<script setup>
import { computed } from 'vue'
import * as Icons from '@/components/icon/index.js'

const props = defineProps({
  name: { type: String, required: true },
  isLocal: { type: Boolean },
})

const IconComponent = computed(() => {
  // convert kebab-case to camelCase
  const camelName = props.name.replace(/\-./g, (l) => l[1].toUpperCase())

  // convert first letter to uppercase
  const componentName = camelName.charAt(0).toUpperCase() + camelName.slice(1)
  if (props.isLocal) {
    return componentName
  } else {
    if (!Icons[componentName]) {
      return componentName
    } else {
      return Icons[componentName]
    }
  }
})
</script>

<template>
  <div class="px-icon">
    <component :is="IconComponent"></component>
  </div>
</template>
