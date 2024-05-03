<script setup>
import { toRefs } from 'vue'
import { IconChevronRight } from '@/components/icon'
import { usePagination, useTheme } from '@/composables'

const props = defineProps({
  limit: { type: Number, required: true },
  total: { type: Number, required: true },
  currentPage: { type: Number, required: true },
})
const emit = defineEmits(['onChangePage'])

const theme = useTheme()
const { limit, total, currentPage } = toRefs(props)

const { range, isNext, isPrev, click, clickPrev, clickNext } = usePagination({ limit, total, currentPage }, emit)
</script>

<template>
  <nav class="flex items-center justify-between border-t border-gray-200 px-[16px] sm:px-0">
    <div class="-mt-px flex w-0 flex-1">
      <a
        @click="clickPrev"
        class="inline-flex items-center border-t-2 border-transparent pt-[16px] pr-[4px] text-[14px] font-medium text-gray-500"
        :class="isPrev ? 'cursor-pointer hover:border-gray-300 hover:text-gray-700' : 'text-gray-300'"
      >
        <span class="flex h-[24px] w-[24px] items-center justify-center"><IconChevronRight class="h-[12px] rotate-180"></IconChevronRight></span>
        <span>이전</span>
      </a>
    </div>
    <div class="hidden md:-mt-px md:flex">
      <template v-for="i in range" :key="i">
        <span v-if="i === '...'" class="inline-flex items-center border-t-2 border-transparent px-[16px] pt-[16px] text-[14px] font-medium text-gray-500">
          ...
        </span>
        <a
          v-else
          @click="click(i)"
          :class="
            i === currentPage
              ? `${theme.primary.border} ${theme.primary.text}`
              : 'cursor-pointer border-transparent text-gray-500 hover:border-gray-300  hover:text-gray-700'
          "
          class="inline-flex items-center border-t-2 px-[16px] pt-[16px] text-[14px] font-medium"
        >
          {{ i }}
        </a>
      </template>
    </div>
    <div class="-mt-px flex w-0 flex-1 justify-end">
      <a
        @click="clickNext"
        class="inline-flex items-center border-t-2 border-transparent pt-[16px] pl-[4px] text-[14px] font-medium text-gray-500"
        :class="isNext ? 'cursor-pointer hover:border-gray-300  hover:text-gray-700' : 'text-gray-300'"
      >
        <span>다음</span>
        <span class="flex h-[24px] w-[24px] items-center justify-center"><IconChevronRight class="h-[12px]"></IconChevronRight></span>
      </a>
    </div>
  </nav>
</template>
