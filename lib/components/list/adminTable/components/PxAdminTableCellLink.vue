<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  label: { type: [String, Array], required: true },
  icon: { type: String },
  router: { type: [Object, Array], required: true },
  routerLink: { type: [Object, Array] },
  textColor: { type: [String, Array], default: 'blue' },
  newWindow: { type: [Boolean, Array] },
  isNarrow: { type: Boolean },
})

const emit = defineEmits(['onClick'])

const isArray = computed(() => Array.isArray(props.label))

const handleClick = (index) => {
  const routerLink = isArray.value ? props.routerLink && props.routerLink.length > index && props.routerLink[index] : props.routerLink
  const newWindow = isArray.value ? props.newWindow && props.newWindow.length > index && props.newWindow[index] : props.newWindow
  if (routerLink) {
    if (newWindow) {
      let routeData = props.router.resolve(routerLink)
      window.open(routeData.href, '', '_blank')
    } else {
      props.router.push(routerLink)
    }
  }
  emit('onClick', index)
}
</script>
<template>
  <div class="px-adminTableCellLink">
    <template v-if="!isArray">
      <template v-if="icon">
        <PxButton size="xs" color="gray" @click="handleClick">{{ label }}</PxButton>
      </template>
      <template v-else-if="!icon">
        <button @click="handleClick" class="px-adminTableCellLink--label">
          {{ label }}
        </button>
      </template>
    </template>

    <template v-else>
      <span
        class="px-adminTableCellLink--array"
        v-for="(l, index) in label"
        :key="l"
        :class="Array.isArray(textColor) ? textColor[index] : textColor"
        @click="handleClick(index)"
        >{{ l }}</span
      >
    </template>
  </div>
</template>
