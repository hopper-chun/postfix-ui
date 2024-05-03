<script setup>
import { computed } from 'vue'
import * as Icons from '@/components/icon/index.js'

const props = defineProps({
  name: { type: String, required: true },
  isLib: { type: Boolean },
})

const IconComponent = computed(() => {
  // convert kebab-case to camelCase
  const camelName = props.name.replace(/\-./g, (l) => l[1].toUpperCase())

  // convert first letter to uppercase
  const componentName = camelName.charAt(0).toUpperCase() + camelName.slice(1)

  // isLib을 쓰면 라이브러리 것을 가져와서 씀
  if (props.isLib) {
    return Icons[componentName]
  } else {
    return componentName
  }
})
</script>

<template>
  <div class="px-icon">
    <component :is="IconComponent"></component>
  </div>
</template>
