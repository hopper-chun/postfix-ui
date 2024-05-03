<script setup>
import { reactive, ref } from 'vue'
import { RmRadio, RmCustomRadio, RmInputRadio } from '@/components/form/radio'
import { IconCheck } from '@/components/icon'
import ToC from '@/layout/ToC.vue'
import SectionWrapper from '@/components/layout/SectionWrapper.vue'
import origin from './seed'

const { radio } = origin

const optionsWithValue = [
  { value: 'option1', label: '옵션 1' },
  { value: 'option2', label: '옵션 2' },
  { value: 'option3', label: '옵션 3' },
]

const simpleOptions = ['옵션 1', '옵션 2', '옵션 3']

const items = ref({
  simple: '',
  values: '',
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
      <div class="font-bold text-slate-500">Form</div>
      <div class="mt-[8px] text-[32px] font-bold text-slate-700">Radio</div>
      <div class="mt-[16px] w-[800px] text-[16px] text-slate-700">about menu description.</div>
      <div class="mt-[60px]">
        <div class="space-y-[80px]">
          <div>
            <SectionWrapper label="usage" :code="radio.usage" :ref="functionRefs('usage')" @onIntersection="handleIntersection">
              <template #contents>
                <div>
                  options 프로퍼티에 배열을 주면 값들을 뱉는다. <br />
                  key값이 필요한 경우 optionsValue, optionsLabel 로 분리해서 던져주면 분리해서 받는다.
                </div>
              </template>
              <div class="flex items-center justify-center space-x-[20px]">
                <div>
                  <div class="flex items-center justify-center">[ {{ items.simple }} ]</div>
                  <RmRadio id="radio-1" :options="simpleOptions" v-model="items.simple"></RmRadio>
                  <RmCustomRadio
                    classes="w-[40px] h-[40px] rounded-[4px]"
                    innerClasses="w-[20px] h-[20px] rotate-45 bg-slate-600 rounded-[4px]"
                    activeClasses="bg-white border-slate-600 rounded-[4px]"
                    labelClasses="text-[20px] text-slate-500 font-bold"
                    id="radio-1"
                    :options="simpleOptions"
                    v-model="items.simple"
                  ></RmCustomRadio>
                </div>
                <div>
                  <div class="flex items-center justify-center">[ {{ items.values }} ]</div>
                  <RmRadio
                    id="radio-2"
                    :options="optionsWithValue"
                    :optionsValue="(option) => option.value"
                    :optionsLabel="(option) => option.label"
                    v-model="items.values"
                  ></RmRadio>
                </div>
              </div>
            </SectionWrapper>
          </div>
          <div>
            <SectionWrapper label="example" :code="radio.RmInputRadio" :ref="functionRefs('example')" @onIntersection="handleIntersection">
              <template #contents></template>
              <div class="flex justify-center">
                <div class="w-[360px]">
                  <RmInputRadio
                    id="radio-2"
                    label="label"
                    labelHelper="this is labelHelper"
                    helperText="this is not input but radio  but has label and helperTexts and required"
                    :helperIcon="true"
                    :required="true"
                    :options="optionsWithValue"
                    :optionsValue="(option) => option.value"
                    :optionsLabel="(option) => option.label"
                    v-model="items.values"
                  >
                    <template #helperIcon> <IconCheck class="w-[12px]"> </IconCheck> </template
                  ></RmInputRadio>
                </div>
              </div>
              <div class="mt-[30px] flex justify-center">
                <div class="w-[360px]">
                  <RmRadio
                    id="radio-2"
                    :options="optionsWithValue"
                    :optionsValue="(option) => option.value"
                    :optionsLabel="(option) => option.label"
                    v-model="items.values"
                    isRow
                  ></RmRadio>
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
