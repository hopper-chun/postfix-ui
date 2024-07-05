<script setup>
import { computed } from 'vue'
import RmAdminTableSelect from '../components/RmAdminTableSelect.vue'

const props = defineProps({
  limit: { type: Number, required: true },
  size: { type: String },
})
const emit = defineEmits(['onChangeLimit'])
const options = [
  { label: '10개', value: 10 },
  { label: '20개', value: 20 },
  { label: '30개', value: 30 },
  { label: '50개', value: 50 },
  { label: '100개', value: 100 },
]

const handleChangeLimit = (value) => {
  emit('onChangeLimit', value)
}
</script>
<template>
  <RmCustomRadio
    id="searchPageLimit"
    :modelValue="limit"
    :options="options"
    :optionsLabel="(option) => option?.label"
    :optionsValue="(option) => option?.value"
    @update:modelValue="handleChangeLimit(Number($event))"
    classes="inline-flex  flex-col"
    outerClasses="w-[16px] h-[16px] mr-[4px] rounded-full"
    innerClasses="w-[8px] h-[8px] rounded-full bg-primary-600"
    activeClasses="border-primary-600"
    labelClasses="py-[3px] pr-[6px]"
  ></RmCustomRadio>
</template>
