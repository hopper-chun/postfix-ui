<script setup>
import { computed, toRefs } from 'vue'
import { IconCheck } from '@/components/icon'
import { useError, useMultiCheckbox, useFunctionRef, useMakeId } from '@/composables'

const props = defineProps({
  id: { type: String },
  modelValue: { type: Array, required: true },
  options: { type: Array, required: true },
  optionsLabel: { type: Function, default: (option) => option },
  optionsValue: { type: Function, default: (option) => option },
  disabled: { type: Boolean, default: () => false },
  required: { type: Boolean, default: () => false },
  labelHelper: { type: String },
  helperText: { type: String },
  label: { type: String },
})

const emit = defineEmits(['update:modelValue'])
const { functionRef, element } = useFunctionRef()

const { id, modelValue } = toRefs(props)

const { error } = useError(id, element)
const { localValue, handleCheck } = useMultiCheckbox(id, modelValue, emit)

const isNarrow = false
const randomId = useMakeId()
</script>

<template>
  <div class="space-y-[4px]">
    <div v-if="label" class="flex space-x-[8px] leading-[22px]">
      <label :for="id" class="text-[14px]">{{ label }}</label>
      <div v-if="labelHelper" class="text-[12px] text-[#737373]">{{ labelHelper }}</div>
    </div>
    <div class="relative">
      <div
        class="flex w-full items-center justify-center space-x-[16px] rounded-[4px] border border-[#D4D4D4] bg-white px-[16px] text-[14px]"
        :class="isNarrow ? 'h-[24px] px-[8px]' : ' h-[48px] px-[16px]'"
      >
        <label v-for="(option, index) in options" :for="randomId">
          <div class="flex items-center space-x-[8px]">
            <input
              :ref="functionRef"
              :id="randomId"
              :disabled="disabled"
              :value="optionsValue(option)"
              v-model="localValue"
              @input="handleCheck($event.target.value)"
              type="checkbox"
              class="hidden"
            />

            <div class="flex items-center space-x-[8px]">
              <span
                v-if="localValue.includes(optionsValue(option))"
                class="flex h-[18px] w-[18px] items-center justify-center rounded-[2px] border-[1px] border-[#4F46E5] bg-[#4F46E5]"
                ><IconCheck class="w-[12px] text-white"></IconCheck>
              </span>
              <span v-else class="flex h-[18px] w-[18px] items-center justify-center rounded-[2px] border-[1px] border-[#D4D4D4] bg-white"
                ><IconCheck class="w-[12px] text-[#D4D4D4]"></IconCheck>
              </span>
              <span> {{ optionsLabel(option) }}</span>
            </div>
            <!-- <div>
              <span> {{ optionsLabel(option) }} </span>
            </div> -->
          </div>
          <!-- <div>{{ option }} {{ modelValue }}</div> -->
        </label>
      </div>
    </div>
    <div v-if="helperText" class="flex items-center leading-[160%]">
      <div v-if="icon" class="flex h-[18px] w-[18px] items-center justify-center">
        <slot name="icon"></slot>
      </div>
      <div class="text-[12px] text-[#737373]" v-html="helperText"></div>
    </div>
    <PxError :id="id"></PxError>
  </div>
</template>
