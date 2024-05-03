<script setup>
import { toRefs } from 'vue'
import { IconChevronRight } from '@/components/icon'
import usePagination from '@/composables/usePagination'

const props = defineProps({
  limit: { type: Number, required: true },
  total: { type: Number, required: true },
  currentPage: { type: Number, required: true },
})
const emit = defineEmits(['onChangePage'])

const { limit, total, currentPage } = toRefs(props)

const { range, isNext, isPrev, click, clickPrev, clickNext } = usePagination({ limit, total, currentPage }, emit)
</script>

<template>
  <nav class="px-[16px] flex items-center sm:px-0 h-[56px]">
    <div class="flex items-center">
      <a
        @click="clickPrev"
        class="inline-flex items-center text-[14px] font-medium text-gray-500"
        :class="isPrev ? 'hover:text-gray-700  cursor-pointer' : 'text-gray-300'"
      >
        <span class="border border-[#e5e7eb] rounded-[4px] w-[24px] h-[24px] flex items-center justify-center"
          ><IconChevronRight class="h-[12px] text-[#323232] rotate-180"></IconChevronRight
        ></span>
      </a>
    </div>
    <div class="md:-mt-px flex items-center space-x-[2px]">
      <template v-for="i in range" :key="i">
        <span v-if="i === '...'" class="border-transparent text-gray-500 w-[24px] h-[24px] justify-center inline-flex items-center text-[12px] font-medium">
          ...
        </span>
        <a
          v-else
          @click="click(i)"
          :class="i === currentPage ? 'text-[#6b7280] bg-[#f3f4f6] border-[#e5e7eb]' : 'border-transparent text-[#D1D5DB] hover:text-gray-700 cursor-pointer'"
          class="border rounded-[4px] w-[24px] h-[24px] justify-center inline-flex items-center text-[12px]"
        >
          {{ i }}
        </a>
      </template>
    </div>
    <div class="flex">
      <a
        @click="clickNext"
        class="inline-flex items-center text-[14px] font-medium text-gray-500"
        :class="isNext ? 'hover:text-gray-700 hover:border-gray-300  cursor-pointer' : 'text-gray-300'"
      >
        <span class="border border-[#e5e7eb] rounded-[4px] w-[24px] h-[24px] flex items-center justify-center"
          ><IconChevronRight class="h-[12px] text-[#323232]"></IconChevronRight
        ></span>
      </a>
    </div>
  </nav>
</template>
