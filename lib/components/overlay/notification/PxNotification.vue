<script setup>
import { ref, watch } from 'vue'
import { useGlobalNoti } from '@/composables'

const props = defineProps({
  expireTime: { type: Number, default: 3000 },
})
const { noti, clearNoti } = useGlobalNoti()

const show = ref(false)
const handleModelUpdate = () => {
  clearNoti()
}
watch(
  () => noti.value.description,
  () => {
    show.value = !!noti.value.description
  }
)
</script>

<template>
  <PxSimpleNotification
    :title="noti.title"
    :desc="noti.description"
    v-model="show"
    @update:modelValue="handleModelUpdate"
    :expireTime="expireTime"
  ></PxSimpleNotification>
</template>
