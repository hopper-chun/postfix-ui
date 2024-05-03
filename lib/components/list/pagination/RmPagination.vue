<script setup>
import { toRefs } from 'vue'
import { IconChevronRight } from '@/components/icon'
import usePagination from '@/composables/usePagination'

const props = defineProps({
  limit: { type: Number, required: true },
  total: { type: Number, required: true },
  currentPage: { type: Number, required: true },
  align: { type: String },
})
const emit = defineEmits(['onChangePage'])

const { limit, total, currentPage } = toRefs(props)

const { range, isNext, isPrev, click, clickPrev, clickNext } = usePagination({ limit, total, currentPage }, emit)
</script>

<template>
  <nav class="rm-pagination">
    <a @click="clickPrev" class="rm-pagination--nav prev" :class="[{ active: isPrev }]"> </a>

    <div class="rm-pagination--range">
      <template v-for="i in range" :key="i">
        <span v-if="i === '...'" class="rangelist reduce"> ... </span>
        <a v-else @click="click(i)" :class="[{ current: i === currentPage }, { edge: i === 1 || i === range[range.length - 1] }]" class="page rangelist"
          >{{ i }}
        </a>
      </template>
    </div>
    <a @click="clickNext" class="rm-pagination--nav next" :class="[{ active: isNext }]"> </a>
  </nav>
</template>
