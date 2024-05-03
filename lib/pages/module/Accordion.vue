<script setup>
import { reactive, ref } from 'vue'
import { RmButton, RmSmIconButton } from '@/components/element/button'
import { RmDividedSelect } from '@/components/form/select'
import { RmAccordion, RmIcon } from '@/components'
import { IconApi } from '@/components/icon'
import ToC from '@/layout/ToC.vue'
import SectionWrapper from '@/components/layout/SectionWrapper.vue'
import origin from './seed.js'

const { accordion } = origin

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
      <div class="mt-[8px] text-[32px] font-bold text-slate-700">Accordion</div>
      <div class="mt-[16px] w-[800px] text-[16px] text-slate-700">
        아코디언은 두개의 슬롯을 가지고 있다. <span class="font-bold">header, body</span> <br />
        각 슬롯은 <span class="font-bold">accState</span>(아코디언 상태), <span class="font-bold">handleClickAcc</span>(아코디언 on,off 메서드) 를 전달하고
        있다. <br />
        handleClickAcc는 아무것도 보내지 않으면 상태를 스위치하고, on, off를 보내면 해당 상태로 변경시킨다.
        <br />
        <br />
        아코디언은 프로퍼티로 <span class="font-bold">duration</span>을 받는다. 단위는 ms.
        <br />
        <br />
        프로젝트 내에서 아코디언을 한번만 쓸 리가 없으니 컴포넌트로 한번 감싸서 쓸 텐데, 그땐 header => title 로, body => contents 같은 식으로 내보내는 슬롯은
        좀 다르게 하는게 좋을 거 같다...
      </div>
      <div class="mt-[60px]">
        <div class="space-y-[80px]">
          <div>
            <SectionWrapper label="label" :ref="functionRefs('label')" @onIntersection="handleIntersection">
              <template #contents></template>
              <template #default>
                <RmAccordion :duration="100">
                  <template #header="{ handleClickAcc, accState }">
                    <div class="flex h-[48px] items-center justify-between border px-[12px] text-[18px] font-bold">
                      <div>헤더 타이틀</div>
                      <div class="flex h-[40px] w-[40px] cursor-pointer items-center justify-center" @click="handleClickAcc">
                        <RmIcon name="icon-chevron-right" :class="accState ? '-rotate-90' : 'rotate-90'" class="w-[12px]"></RmIcon>
                      </div>
                    </div>
                  </template>
                  <template #body>
                    <div class="-mt-[1px] border px-[12px] py-[28px] text-[14px]">보더를 넣을 때 margin-top 에 -1px을 주면 상단 보더가 탈락됩니다.</div>
                  </template>
                </RmAccordion>
              </template>
            </SectionWrapper>
          </div>
        </div>
      </div>
    </div>
    <ToC :list="elements" :state="nowObserving"></ToC>
  </div>
</template>
