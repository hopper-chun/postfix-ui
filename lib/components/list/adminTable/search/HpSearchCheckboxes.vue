<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  filters: { type: Array, required: true },
  filterType: { type: String, required: true },
  options: { type: Array, required: true },
  optionsLabel: { type: Function, default: (option) => option.label },
  optionsValue: { type: Function, default: (option) => option.key },
})
const localValues = ref([])
const checkAll = ref(false)

const reload = () => {
  const mapper = props.filters.reduce((acc, filter) => {
    acc[filter[0].key] = filter[1]
    return acc
  }, {})

  console.log('mapper[props.filterType]', mapper, mapper[props.filterType])

  localValues.value = mapper[props.filterType] ? mapper[props.filterType].split(',') : []
  checkAll.value = !localValues.value || localValues.value.length === 0
}

watch(
  () => props.filters,
  () => reload()
)
reload()

const handleCheckUpdate = () => {
  context.emit('onAppendQuerys', [{ key: props.filterType, value: localValues.value.join(',') }])
}

const handleCheckAllUpdate = () => {
  context.emit('onRemoveQuery', props.filterType)
}
</script>
<template>
  <div class="flex space-x-4">
    <HpCheckbox size="xs" v-model="checkAll" @update:modelValue="handleCheckAllUpdate">전체</HpCheckbox>
    <HpMultiCheckbox
      size="xs"
      :options="options"
      :optionsValue="optionsValue"
      :optionsLabel="optionsLabel"
      v-model="localValues"
      @update:modelValue="handleCheckUpdate"
    ></HpMultiCheckbox>
  </div>
</template>
