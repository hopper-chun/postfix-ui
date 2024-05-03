<script setup>
import { toRefs } from 'vue'
import { IconArrowLeftMd } from '@/components/icon'
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
  <nav class="px-[16px] flex items-center justify-between sm:px-0">
    <div class="-mt-px w-0 flex-1 flex">
      <a
        @click="clickPrev"
        class="border-t-2 border-transparent pt-[16px] pr-[4px] inline-flex items-center text-[14px] font-bold text-black"
        :class="isPrev ? ' cursor-pointer' : 'text-gray-300'"
      >
        <span class="w-[24px] h-[24px] flex items-center justify-center"><IconArrowLeftMd class="w-[16px]"></IconArrowLeftMd></span>
        <span>Prev</span>
      </a>
    </div>
    <div class="hidden md:-mt-px md:flex">
      <template v-for="i in range" :key="i">
        <span v-if="i === '...'" class="text-[#C8C8C8] pt-[16px] px-[16px] inline-flex items-center text-[14px] font-bold"> ... </span>
        <a
          v-else
          @click="click(i)"
          :class="i === currentPage ? ' text-black ' : ' text-[#C8C8C8] hover:text-gray-700 cursor-pointer'"
          class="pt-[16px] px-[16px] inline-flex items-center text-[14px] font-bold"
        >
          {{ String(i).padStart(2, '0') }}
        </a>
      </template>
    </div>
    <div class="-mt-px w-0 flex-1 flex justify-end">
      <a
        @click="clickNext"
        class="border-t-2 border-transparent pt-[16px] pl-[4px] inline-flex items-center text-[14px] font-bold text-black"
        :class="isNext ? '  cursor-pointer' : 'text-gray-300'"
      >
        <span>Next</span>
        <span class="w-[24px] h-[24px] flex items-center justify-center"><IconArrowLeftMd class="w-[16px] rotate-180"></IconArrowLeftMd></span>
      </a>
    </div>
  </nav>
</template>
