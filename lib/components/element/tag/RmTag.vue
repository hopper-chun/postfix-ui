<script setup>
import { computed } from 'vue'
import { RmIcon } from '@/components/Icon'
import { useTheme } from '@/composables'

const emit = defineEmits(['onRemove', 'onModify'])
const props = defineProps({
  color: { type: String, default: 'pri' },
  filled: { type: Boolean, default: false },
  isRemove: { type: Boolean, default: false },
  isModify: { type: Boolean, default: false },
})
const theme = useTheme()
// x없는게 디폴트. 라벨 대신 슬롯으로. 사이즈, x 유무, rounded 가 프로퍼티
// const styleSize = computed(() => {
//   if (props.size === 'sm') {
//     return [props.isRemove ? 'pl-[8px] pr-[6px]' : ' px-[8px]', 'text-[12px] leading-[1] space-x-[4px]  h-[24px] flex items-center']
//   } else if (props.size === 'md') {
//     return [props.isRemove ? 'pl-[16px] pr-[12px]' : ' px-[8px]', 'text-[14px] leading-[1] space-x-[8px] h-[36px] flex items-center']
//   } else if (props.size === 'lg') {
//     return [props.isRemove ? 'pl-[24px] pr-[18px]' : 'px-[8px]', 'text-[16px] leading-[1] space-x-[12px] h-[48px] flex items-center']
//   } else if (props.size === 'extra') {
//     return 'text-[12px] leading-[1] px-[8px] h-[20px] flex items-center'
//   }
// })

// const styleRadius = computed(() => {
//   if (props.radiusFull) {
//     return 'rounded-full'
//   } else {
//     return 'rounded-[4px]'
//   }
// })

// const styleBg = computed(() => {
//   if (props.color === 'pri') {
//     return props.outlined ? `border ${theme.value.primary.border} ${theme.value.primary.text}` : ` ${theme.value.primary.bg} text-white`
//   } else if (props.color === 'gray') {
//     return props.outlined ? 'border border-gray-500 text-gray-500' : 'bg-[#E5E7EB]'
//   } else if (props.color === 'active') {
//     return 'bg-[#1F2937] text-white'
//   }
// })

const handleRemove = () => {
  emit('onRemove')
}
const handleModify = () => {
  emit('onModify')
}
</script>

<!-- 컬러 ... 일반적으로 black, pri,  -->
<template>
  <div class="rm-tag" :class="[color, { filled: filled }, { hasTag: isRemove || isModify }]">
    <div style="display: flex; align-items: center">
      <slot></slot>
    </div>
    <button v-if="isModify" @click="handleModify" class="rm-tag--func modify"></button>
    <button v-if="isRemove" @click="handleRemove" class="rm-tag--func remove"></button>
  </div>
</template>
