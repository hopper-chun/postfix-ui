<script setup>
import { reactive, ref } from 'vue'
import { PxButton, RmSmIconButton } from '@/components/element/button'
import { RmDividedSelect } from '@/components/form/select'
import { IconApi } from '@/components/icon'
import ToC from '@/layout/ToC.vue'
import SectionWrapper from '@/components/layout/SectionWrapper.vue'
import origin from './seed.js'

const {} = origin

const options = ref({})

const elements = ref({})
const functionRefs = (label) => (el) => (elements.value[label] = el)

const nowObserving = ref(null)
const handleIntersection = (data) => {
  nowObserving.value = data
}

// const functionRefsa = (label) => {
//   const name = label
//   const a = (el) => {
//     const temp = el
//     elements.value[name] = temp
//   }
//   return a
// }
</script>
<template>
  <div class="relative flex w-full">
    <div class="max-w-[950px] flex-1">
      <div class="font-bold text-slate-500">subMenu</div>
      <div class="mt-[8px] text-[32px] font-bold text-slate-700">Menu</div>
      <div class="mt-[16px] w-[800px] text-[16px] text-slate-700">about menu description.</div>
      <div class="mt-[60px]">
        <div class="space-y-[80px]">
          <div>
            <SectionWrapper label="Usage" :ref="functionRefs('Usage')" @onIntersection="handleIntersection">
              <template #contents></template>
            </SectionWrapper>
          </div>
        </div>
      </div>
    </div>
    <ToC :list="elements" :state="nowObserving"></ToC>
  </div>
</template>
