<script setup>
import { reactive, ref } from 'vue'
import { PxButton, RmSmIconButton } from '@/components/element/button'
import { RmDividedSelect } from '@/components/form/select'
import { RmInput } from '@/components/form/input'
import { IconApi } from '@/components/icon'
import { SimpleDialog, CommonDialog, NewModal } from '@/components/overlay/dialog/extra'
import ToC from '@/layout/ToC.vue'
import SectionWrapper from '@/components/layout/SectionWrapper.vue'
import origin from './seed.js'

const { dialog } = origin

const dialogOptions = ref({
  item: '',
})

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
      <div class="mt-[8px] text-[32px] font-bold text-slate-700">Dialog</div>
      <div class="mt-[16px] w-[800px] text-[14px] text-slate-700">
        다이얼로그는 default 슬롯을 가진다.
        <br />
        bg-color, border-radius 는 .rm-dialog--container 를 변경하면 된다. <br />
        이전까지 헤더를 각각의 다이얼로그에서 직접 만들어줬지만, 새 다이얼로그에선 헤더를 분리했다. <br />
        title을 주면 헤더가 생성되며 자동으로 title과 x버튼이 생성된다. 타이틀이 필요 없는 경우엔 title 만 주고 비워두면 된다.
        <br />
        타이틀만 쓰고 close는 비워두고 싶은 경우는 :isClose-"false" 로 주면 된다. 기본값이 true.
      </div>
      <div class="mt-[60px]">
        <div class="space-y-[80px]">
          <div>
            <SectionWrapper label="Basic" :code="dialog.simple" :ref="functionRefs('Basic')" @onIntersection="handleIntersection">
              <template #contents>
                <div>
                  1. 단순 메시지를 전달하기 위한 다이얼로그 <br />
                  2. 데이터를 받고, 수정하고, 보내는 다이얼로그 <br />
                </div>
                <div></div>
              </template>
              <div class="flex items-center justify-center">
                <div>
                  <SimpleDialog></SimpleDialog>
                </div>
              </div>
              <div>
                <NewModal></NewModal>
              </div>
            </SectionWrapper>
          </div>
          <div>
            <SectionWrapper :code="dialog.common">
              <template #contents>
                <div>다이얼로그가 열리거나 닫힐 때, 데이터를 불러오거나 수정, 전송할 수 있다.</div>
              </template>
              <div>
                <div class="flex items-center justify-center space-x-[10px]">
                  <CommonDialog :items="dialogOptions" v-model="dialogOptions.item"></CommonDialog>
                  <div><RmInput v-model="dialogOptions.item"></RmInput></div>
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
