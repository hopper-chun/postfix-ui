<script setup>
import { toRefs } from 'vue'
import { IconQuestionMark } from '@/components/icon'
import { useError, useFunctionRef } from '@/composables'
import { PxError } from '@/components/element/error'
import RmToggle from './RmToggle.vue'

const props = defineProps({
  id: { type: String },
  modelValue: { type: [String, Number, Boolean] },
  disabled: { type: Boolean, default: false },
  options: { type: Array, default: () => [false, true], validator: (values) => values.length >= 2 },
  label: { type: String, required: true },
  description: { type: String },
  question: { type: Boolean, default: false },
  hover: { type: String },
})

const { functionRef, element } = useFunctionRef()
const { id } = toRefs(props)
const { error } = useError(id, element)
</script>
<template>
  <div>
    <div :ref="functionRef" class="flex w-full items-center justify-between rounded-[12px] border border-[#E5E5E5] bg-[#F9FAFB] px-[16px] pt-[22px] pb-[16px]">
      <div class="space-y-[6px] self-start">
        <div class="flex items-center space-x-[4px]">
          <div class="text-[18px] font-bold leading-[18px] text-[#374151]">{{ label }}</div>
          <div v-if="question" class="group relative">
            <IconQuestionMark class="w-[16px] text-[#6B7280]"></IconQuestionMark>
            <div class="absolute -left-[6px] bottom-[calc(100%+8px)] hidden group-hover:block">
              <div class="whitespace-nowrap rounded-[8px] bg-[#262626] py-[8px] px-[10px] text-[12px] leading-[15px] text-white" v-html="hover"></div>
              <div class="absolute -bottom-[3px] left-[10px] h-[8px] w-[8px] rotate-45 bg-[#262626]"></div>
            </div>
          </div>
        </div>
        <div class="mt-[6px] flex-1 text-[14px] leading-[22px] text-[#6B7280]" v-if="description">{{ description }}</div>
      </div>
      <RmToggle :id="id" :modelValue="modelValue" @update:modelValue="$emit('update:modelValue', $event)" :options="options" :disabled="disabled"></RmToggle>
    </div>
    <div v-if="error">
      <PxError :id="id"></PxError>
    </div>
  </div>
</template>
