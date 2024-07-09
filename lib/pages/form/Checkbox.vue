<script setup>
import { reactive, ref } from 'vue'
import { RmCheckbox, RmCustomCheckbox, RmMultiCheckbox, RmCustomMultiCheckbox } from '@/components/form/checkbox'
import { PxButton } from '@/components/element/button'
import PxIcon from '@/components/Icon/PxIcon.vue'
import ToC from '@/layout/ToC.vue'
import SectionWrapper from '@/components/layout/SectionWrapper.vue'
import origin from './seed'

const { checkbox } = origin

const items = ref({
  value: false,
  optionValue: '동의하지 않습니다',
  optionsValue1: [],
  optionsValue2: [],
  circle: false,
  disabled: false,
})

const elements = ref({})
const functionRefs = (label) => (el) => {
  elements.value[label] = el
}
const nowObserving = ref(null)
const handleIntersection = (data) => {
  nowObserving.value = data
}

const handleClick = (option) => {
  items.value[option] = !items.value[option]
}
</script>
<template>
  <div class="relative flex w-full">
    <div class="flex-1">
      <div class="font-bold text-slate-500">Form</div>
      <div class="mt-[8px] text-[32px] font-bold text-slate-700">Checkbox</div>
      <div class="mt-[16px] w-[800px] text-[16px] text-slate-700">about menu description.</div>

      <div class="mt-[60px]">
        <div class="space-y-[80px]">
          <div>
            <SectionWrapper label="Usage" :ref="functionRefs('Usage')" @onIntersection="handleIntersection">
              <template #contents> <div>프로퍼티는 circle과 disabled.</div> </template>
              <div>
                <div class="flex justify-center space-x-[8px] border-b pb-[20px]">
                  <div class="w-[70px]">
                    <PxButton size="sm" :isFull="true" :color="items.disabled ? 'pri' : 'transparent'" @click="handleClick('disabled')"> disabled </PxButton>
                  </div>
                  <div class="w-[70px]">
                    <PxButton size="sm" :isFull="true" :color="items.circle ? 'pri' : 'transparent'" @click="handleClick('circle')"> circle </PxButton>
                  </div>
                </div>
                <div class="my-[20px] flex items-center justify-center">
                  <div class="flex h-[40px] w-[40px] items-center justify-center bg-black/50">
                    <RmCheckbox id="tt" v-model="items.value"> </RmCheckbox>
                  </div>
                  <RmCheckbox id="checkbox-0" :circle="items.circle" :disabled="items.disabled" v-model="items.value">check</RmCheckbox>
                  <RmCustomCheckbox innerClasses="bg-red-400 text-white" id="checkbox-001" classes="w-[30px] h-[30px] rounded-[8px]" v-model="items.value">
                    <div class="text-[16px]">checked</div>
                    <template #icon>
                      <PxIcon name="icon-api"></PxIcon>
                    </template>
                  </RmCustomCheckbox>
                </div>
              </div>
            </SectionWrapper>
          </div>
          <div>
            <SectionWrapper label="Simple checkbox" :code="checkbox.simple" :ref="functionRefs('Simple checkbox')" @onIntersection="handleIntersection">
              <template #contents>
                <div>
                  일반적인 사용방법이다. <br />
                  참 거짓에 따라 label이 변하게 하고 싶다면 options="['거짓일 경우', '참일 경우']"의 형태로 넣으면 된다.
                </div>
              </template>
              <div class="flex items-center justify-center space-x-[40px]">
                <RmCheckbox id="checkbox-1" v-model="items.value">동의합니다.</RmCheckbox>
                <RmCheckbox id="checkbox-2" v-model="items.optionValue" :options="['동의하지 않습니다', '동의합니다']">{{ items.optionValue }}</RmCheckbox>
              </div>
            </SectionWrapper>
          </div>
          <div>
            <SectionWrapper label="Multi checkbox" :code="checkbox.multi" :ref="functionRefs('Multi checkbox')" @onIntersection="handleIntersection">
              <template #contents>
                <div>
                  options에 배열을 넣으면 여러개의 내용물을 뱉는다. <br />
                  만약 라벨과 key가 한 묶음인 배열이라면 optionsValue, optionsLabel로 각각 key 와 라벨을 분리해서 넣어주면 된다.
                </div>
              </template>
              <div class="flex items-center justify-center space-x-[40px]">
                <div class="flex w-[200px] flex-col items-center space-y-[12px]">
                  <div>
                    {{ items.optionsValue1 }}
                  </div>
                  <div>
                    <RmMultiCheckbox id="checkbox-3" isRow v-model="items.optionsValue1" :options="['사과', '바나나']"></RmMultiCheckbox>
                  </div>
                  <div>
                    <RmCustomMultiCheckbox
                      id="checkbox-003"
                      v-model="items.optionsValue1"
                      labelClasses="font-bold text-[20px]"
                      innerClasses="bg-red-400 text-white"
                      classes="w-[30px] h-[30px] rounded-[8px]"
                      :options="['사과', '바나나']"
                    >
                      <template #icon>
                        <PxIcon name="icon-api" class="w-[20px]"></PxIcon>
                      </template>
                    </RmCustomMultiCheckbox>
                  </div>
                </div>
                <div class="flex w-[200px] flex-col items-center space-y-[12px]">
                  <div>
                    {{ items.optionsValue2 }}
                  </div>
                  <div>
                    <RmMultiCheckbox
                      id="checkbox-4"
                      v-model="items.optionsValue2"
                      :options="[
                        { label: '사과', value: 'apple' },
                        { label: '바나나', value: 'banana' },
                      ]"
                      :optionsValue="(option) => option.value"
                      :optionsLabel="(option) => option.label"
                    ></RmMultiCheckbox>
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
