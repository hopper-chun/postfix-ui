<script setup>
import { toRefs, ref, watchEffect } from 'vue'
import { useError, useFunctionRef } from '@/composables'
import { PxError } from '@/components/element/error'
import RmToggle from './RmToggle.vue'

const props = defineProps({
  label: { type: String },
  description: { type: String },
  disabled: { type: Boolean, default: false },
  modelValue: { type: [String, Number, Boolean] },
  options: { type: Array, default: () => [false, true], validator: (values) => values.length >= 2 },
  id: { type: String },
})
const emit = defineEmits(['update:modelValue'])
// const { id } = toRefs(props)
const { functionRef, element } = useFunctionRef()
const { id } = toRefs(props)
const { error, clearError } = useError(id, element)

const localValue = ref(null)

watchEffect(() => {
  localValue.value = props.modelValue
})
const handleClick = () => {
  localValue.value = !localValue.value
  emit('update:modelValue', localValue.value)
  clearError()
}
</script>

<template>
  <div>
    <div :ref="functionRef" class="inline-flex cursor-pointer items-center" @click="handleClick">
      <RmToggle
        :id="id"
        :modelValue="modelValue"
        @update.stop:modelValue="$emit('update:modelValue', $event)"
        :options="options"
        :disabled="disabled"
      ></RmToggle>
      <div class="flex items-center space-x-[4px] pl-[12px]">
        <span class="text-[14px]">{{ label }}</span>
        <span class="text-[12px] text-gray-500">{{ description }}</span>
      </div>
    </div>
    <div v-if="error">
      <PxError :id="id"></PxError>
    </div>
  </div>
</template>
