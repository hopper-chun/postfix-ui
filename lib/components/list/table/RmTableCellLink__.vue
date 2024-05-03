<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  label: { type: [String, Array], required: true },
  icon: { type: String },
  routerLink: { type: [Object, Array] },
  textColor: { type: [String, Array], default: 'text-blue-500' },
  newWindow: { type: [Boolean, Array] },
})
const emit = defineEmits(['onClick'])

const router = useRouter()
const isArray = computed(() => Array.isArray(props.label))

const handleClick = (index) => {
  const routerLink = isArray.value ? props.routerLink && props.routerLink.length > index && props.routerLink[index] : props.routerLink
  const newWindow = isArray.value ? props.newWindow && props.newWindow.length > index && props.newWindow[index] : props.newWindow
  if (routerLink) {
    if (newWindow) {
      let routeData = router.resolve(routerLink)
      window.open(routeData.href, '', '_blank')
    } else {
      router.push(routerLink)
    }
  }
  emit('onClick', index)
}
</script>
<template>
  <div>
    <template v-if="!isArray">
      <template v-if="icon">
        <RmSmIconButton textAlign="right" @click="handleClick"
          >{{ label }}
          <template v-slot:icon>
            <RmIcon :name="icon" class="w-[12px]"></RmIcon>
          </template>
        </RmSmIconButton>
      </template>
      <template v-else-if="!icon">
        <button @click="handleClick" class="text-[12px] leading-[19px] text-[#4F46E5]">{{ label }}</button>
      </template>
    </template>

    <!-- <span v-if="!isArray" :class="textColor" class="cursor-pointer whitespace-nowrap" @click="handleClick">{{ label }}</span> -->
    <template v-else>
      <span
        v-for="(l, index) in label"
        :key="l"
        :class="Array.isArray(textColor) ? textColor[index] : textColor"
        class="cursor-pointer whitespace-nowrap"
        @click="handleClick(index)"
        >{{ l }}</span
      >
    </template>
  </div>
</template>
