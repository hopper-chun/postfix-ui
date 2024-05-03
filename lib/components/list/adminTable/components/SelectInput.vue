<script setup>
import { RmSelect } from '@/components/form/select'
import { RmInput } from '@/components/form/Input'
const props = defineProps({
  options: { type: Array, required: true },
  option: { type: [String, Number, Object] },
  modelValue: { type: String },
  disabled: { type: Boolean, default: false },
})
defineEmits(['update:option', 'update:modelValue', 'onKeyDownEnter'])
</script>
<template>
  <div class="flex items-center space-x-[8px]">
    <div class="w-[120px]">
      <RmSelect
        :modelValue="option"
        @update:modelValue="$emit('update:option', $event)"
        :options="options"
        :optionsLabel="(option) => option.title"
        :optionsValue="(option) => option.key"
        :disabled="disabled"
        :styles="{ fontSize: 'text-[13px]' }"
      ></RmSelect>
    </div>
    <div class="w-[324px]">
      <RmInput
        placeholder="검색어를 입력해주세요."
        :modelValue="modelValue"
        @update:modelValue="$emit('update:modelValue', $event)"
        @keypress.enter="$emit('onKeyDownEnter')"
        :styles="{ fontSize: 'text-[13px]' }"
      ></RmInput>
    </div>
  </div>
</template>
