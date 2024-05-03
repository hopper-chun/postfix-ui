<script setup>
import { reactive, ref } from 'vue'
import { useTheme } from '@/composables'
import { RmPagination, RmPaginationVanilla, RmPaginationButton } from '@/components/list/pagination'
import { RmTable } from '@/components/list/table'
import ToC from '@/layout/ToC.vue'
import SectionWrapper from '@/components/layout/SectionWrapper.vue'
import origin from './seed.js'

const { pagination } = origin
const theme = useTheme()
const options = ref({})

const elements = ref({})
const functionRefs = (label) => (el) => {
  elements.value[label] = el
}
const nowObserving = ref(null)
const handleIntersection = (data) => {
  nowObserving.value = data
}
</script>
<template>
  <div class="relative flex w-full">
    <div class="max-w-[950px] flex-1">
      <div class="font-bold text-slate-500">List</div>
      <div class="mt-[8px] text-[32px] font-bold text-slate-700">Pagination</div>
      <div class="mt-[16px] w-[800px] text-[16px] text-slate-700">about menu description.</div>
      <div class="mt-[60px]">
        <div class="space-y-[80px]">
          <div>
            <SectionWrapper label="Usage" :ref="functionRefs('Usage')" @onIntersection="handleIntersection">
              <template #contents></template>
              <div>
                <div class="space-y-[20px]">
                  <div class="text-[12px]"><RmTable :headers="pagination.header" :rows="pagination.people"></RmTable></div>
                  <div><RmPagination :limit="3" :total="100" :currentPage="10"></RmPagination></div>
                </div>
              </div>
            </SectionWrapper>
          </div>
          <div>
            <SectionWrapper label="Example" :code="pagination.vanilla" :ref="functionRefs('Example')" @onIntersection="handleIntersection">
              <template #contents></template>
              <div>
                <div class="space-y-[20px]">
                  <div class="text-[12px]"><RmTable :headers="pagination.header" :rows="pagination.people"></RmTable></div>
                  <div><RmPaginationVanilla :limit="3" :total="100" :currentPage="10"></RmPaginationVanilla></div>
                </div>
              </div>
            </SectionWrapper>

            <SectionWrapper :code="pagination.button">
              <template #contents></template>
              <div>
                <div class="space-y-[20px]">
                  <div class="text-[12px]"><RmTable :headers="pagination.header" :rows="pagination.people"></RmTable></div>
                  <div class="flex items-center">
                    <RmPaginationButton :limit="3" :total="100" :currentPage="10"></RmPaginationButton
                    ><span class="ml-[10px] text-[13px]">[총 <span :class="[theme.primary.text]">100</span>개]</span>
                  </div>
                </div>
              </div>
            </SectionWrapper>
          </div>
        </div>
      </div>
    </div>
    <ToC :list="elements" :state="nowObserving"></ToC>
  </div>
</template>
