<script setup>
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
  <PxRadio
    id="searchPageLimit"
    :modelValue="limit"
    :options="options"
    :optionsLabel="(option) => option?.label"
    :optionsValue="(option) => option?.value"
    @update:modelValue="handleChangeLimit(Number($event))"
  ></PxRadio>
</template>
