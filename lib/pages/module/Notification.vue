<script setup>
import { reactive, ref } from 'vue'
import { PxButton, RmSmIconButton } from '@/components/element/button'
import { RmDividedSelect } from '@/components/form/select'
import { IconApi } from '@/components/icon'
// import { RmNotification } from '@/components/overlay'
import ToC from '@/layout/ToC.vue'
import SectionWrapper from '@/components/layout/SectionWrapper.vue'
import origin from './seed.js'

const { notification } = origin

const notiOptions = ref({})

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
    <div class="flex-1">
      <div class="font-bold text-slate-500">Module</div>
      <div class="mt-[8px] text-[32px] font-bold text-slate-700">Notification</div>
      <div class="mt-[16px] w-[800px] text-[16px] text-slate-700">about menu description.</div>
      <div class="mt-[60px]">
        <div class="space-y-[80px]">
          <div>
            <SectionWrapper label="label" :ref="functionRefs('label')" @onIntersection="handleIntersection">
              <template #contents></template>
              <div>
                <PxButton>open</PxButton>
                <div>
                  <!-- <RmNotification :items="notification"></RmNotification> -->
                </div>
              </div></SectionWrapper
            >
          </div>
        </div>
      </div>
    </div>
    <ToC :list="elements" :state="nowObserving"></ToC>
  </div>
</template>
