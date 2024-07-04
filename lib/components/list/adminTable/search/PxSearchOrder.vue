<script setup>
import { computed } from 'vue'

const props = defineProps({
  orderState: { type: Object, required: true },
  orderOptions: { type: Array, required: true },
  defaultLabel: { type: String, required: true },
})
const emits = defineEmits(['onSetSearchOrder'])
const currentSort = computed(() => {
  if (!props.orderState.orderField) {
    return ''
  }
  return JSON.stringify(props.orderState)
})

const handleChangeSort = (value) => {
  const sort = props.orderOptions.find((sort) => JSON.stringify(sort.value) === value)
  if (sort) {
    emits('onSetSearchOrder', sort.value)
    // props.searchOrder.setSearchOrder(sort.value)
  }
}
</script>
<template>
  <div class="px-searchOrder">
    <PxSelect
      id="tableSort"
      :options="orderOptions"
      :modelValue="currentSort"
      :optionsLabel="(option) => option?.label"
      :optionsValue="(option) => JSON.stringify(option.value)"
      @update:modelValue="handleChangeSort($event)"
      defaultLabel="정렬"
    >
    </PxSelect>
  </div>
</template>
