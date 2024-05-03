<script setup>
import { RmDropdown } from '@/components/element/dropdown'

const props = defineProps({
  direction: { type: String, default: 'bottom' },
  menuAlign: { type: String, default: 'left' },
  hover: { type: Boolean },
  items: { type: [Array, Object] },
  modelValue: { type: (String, Array, Object) },
})
const emits = defineEmits(['update:modelValue'])

const handleClick = (item, index) => {
  emits('update:modelValue', { item, index })
}
</script>

<template>
  <div>
    <RmDropdown :direction="direction" :menuAlign="menuAlign" :hover="hover" :options="items">
      <template #trigger="{ open }">
        <template v-if="!items.trigger">
          <slot name="trigger" :open="open"></slot>
        </template>
        <template v-else>
          <span class="flex items-center justify-center rounded-[8px] border border-slate-500 px-[8px] py-[4px] text-[14px] text-slate-800">
            {{ items.trigger }}
          </span>
        </template>
      </template>
      <template #content="{ open }">
        <div class="overflow-hidden rounded-[8px] border border-slate-500 shadow-md">
          <div
            v-for="(item, index) in items.menu"
            @click="handleClick(item, index)"
            class="flex h-[40px] w-[100px] items-center bg-white pl-[4px] text-[13px] hover:bg-slate-100"
            :class="index !== 0 ? ' border-t' : ''"
          >
            {{ item }}
          </div>
        </div>
      </template>
    </RmDropdown>
  </div>
</template>
