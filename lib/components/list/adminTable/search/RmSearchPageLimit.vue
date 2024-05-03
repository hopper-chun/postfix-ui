<script setup>
import { computed } from 'vue'
import { RmAdminTableSelect } from '@/components/form/select'
import { RmRadio } from '@/components/form'

const props = defineProps({
  useLocale: { type: Boolean },
  limit: { type: Number, required: true },
  size: { type: String },
  use10000: { type: Boolean },
})
const emit = defineEmits(['onChangeLimit'])
const options = computed(() => {
  if (props.useLocale) {
    return [
      { label: '10', value: 10 },
      { label: '20', value: 20 },
      { label: '30', value: 30 },
      { label: '50', value: 50 },
      { label: '100', value: 100 },
    ].concat(
      props.use10000
        ? [
            { label: '1,000', value: 1000 },
            { label: '10,000', value: 10000 },
          ]
        : []
    )
  } else {
    return [
      { label: '10개', value: 10 },
      { label: '20개', value: 20 },
      { label: '30개', value: 30 },
      { label: '50개', value: 50 },
      { label: '100개', value: 100 },
    ].concat(
      props.use10000
        ? [
            { label: '1,000개', value: 1000 },
            { label: '10,000개', value: 10000 },
          ]
        : []
    )
  }
})

const handleChangeLimit = (value) => {
  emit('onChangeLimit', value)
}
</script>
<template>
  <RmRadio
    id="searchPageLimit"
    :modelValue="limit"
    :options="options"
    :optionsLabel="(option) => option?.label"
    :optionsValue="(option) => option?.value"
    @update:modelValue="handleChangeLimit(Number($event))"
    isRow
  ></RmRadio>
</template>
