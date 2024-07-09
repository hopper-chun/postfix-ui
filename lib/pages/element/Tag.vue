<script setup>
import { reactive, ref } from 'vue'
import { RmTag, RmCustomTag } from '@/components/element/tag'
import { PxButton } from '@/components/element/button'
import { RmDividedSelect } from '@/components/form/select'
import { IconSettings } from '@/components/icon'
import origin from './seed'
import ToC from '@/layout/ToC.vue'
import SectionWrapper from '@/components/layout/SectionWrapper.vue'

const { tag } = origin

const tagOptions = ref({
  size: 'md',
  color: 'gray',
  filled: false,
  radiusFull: false,
  isRemove: false,
})

const optionLists = {
  size: ['sm', 'md', 'lg', 'extra'],
  color: ['pri', 'sec', 'ter'],
}

const elements = ref({})
const functionRefs = (label) => (el) => {
  elements.value[label] = el
}
const nowObserving = ref(null)
const handleIntersection = (data) => {
  nowObserving.value = data
}

const handleClick = (option) => {
  tagOptions.value[option] = !tagOptions.value[option]
}
</script>
<template>
  <div class="relative flex w-full">
    <div class="flex-1">
      <div class="font-bold text-slate-500">Element</div>
      <div class="mt-[8px] text-[32px] font-bold text-slate-700">Tag</div>
      <div class="mt-[16px] w-[800px] text-[16px] text-slate-700">about menu description.</div>
      <div class="mt-[60px]">
        <div class="space-y-[80px]">
          <div>
            <SectionWrapper label="Usage" contentsOnly :ref="functionRefs('Usage')" @onIntersection="handleIntersection">
              <template #contents></template>
              <div>
                <div class="flex justify-center space-x-[8px] border-b pb-[20px]">
                  <div class="w-[70px]">
                    <PxButton size="sm" :isWide="true" :color="tagOptions.filled ? 'pri' : 'inactive'" @click="handleClick('filled')"> filled </PxButton>
                  </div>
                  <div class="w-[70px]">
                    <PxButton size="sm" :isWide="true" :color="tagOptions.isRemove ? 'pri' : 'inactive'" @click="handleClick('isRemove')"> isRemove </PxButton>
                  </div>
                  <div class="w-[70px]">
                    <PxButton size="sm" :isWide="true" :color="tagOptions.radiusFull ? 'pri' : 'inactive'" @click="handleClick('radiusFull')">
                      radiusFull
                    </PxButton>
                  </div>
                </div>
                <div class="my-[20px] flex">
                  <div class="flex flex-1 items-center justify-center px-[30px]">
                    <RmTag :color="tagOptions.color" :filled="tagOptions.filled" :isRemove="tagOptions.isRemove" isModify>
                      <div>
                        {{ tagOptions.size === 'extra' ? '99' : 'Default' }}
                      </div>
                    </RmTag>
                  </div>
                  <div class="flex-1">
                    <RmDividedSelect
                      label="size"
                      v-model="tagOptions.size"
                      :options="optionLists.size"
                      :styles="{
                        fontSize: 'text-[14px]',
                        height: 'h-[30px]',
                        border: 'border-b',
                        radius: 'rounded-none',
                        paddingX: 'px-0',
                      }"
                      horizontal
                      :labelWidth="70"
                    ></RmDividedSelect>
                    <RmDividedSelect
                      label="color"
                      v-model="tagOptions.color"
                      :options="optionLists.color"
                      :styles="{
                        fontSize: 'text-[14px]',
                        height: 'h-[30px]',
                        border: 'border-b',
                        radius: 'rounded-none',
                        paddingX: 'px-0',
                      }"
                      horizontal
                      :labelWidth="70"
                    ></RmDividedSelect>
                  </div>
                </div>
              </div>
            </SectionWrapper>
          </div>
          <div>
            <SectionWrapper label="Event" codeOnly :code="tag.clickEvent" :ref="functionRefs('Event')" @onIntersection="handleIntersection">
              <template #contents>
                <div>
                  RmTag의 cancel 버튼은 기본적으로 클릭 이벤트를 emit하고 있다.
                  <br />
                  이를 사용하기 위해선, <code>@handleClick</code>을 사용하면 된다.
                </div>
              </template>
            </SectionWrapper>
          </div>
          <div>
            <SectionWrapper label="tag with icon" :code="tag.icon" :ref="functionRefs('tag with icon')" @onIntersection="handleIntersection">
              <template #contents>
                <div>RmTag의 라벨은 slot으로 받기 때문에, 그 안의 내용물은 가능한 대로 커스터마이징 할 수 있다.</div>
              </template>
              <div class="flex justify-center">
                <RmTag filled color="pri">
                  <div class="flex items-center space-x-[8px]">
                    <span><IconSettings class="w-[20px]"></IconSettings></span>
                    <span>Default</span>
                  </div>
                </RmTag>
              </div>
            </SectionWrapper>
          </div>
        </div>
      </div>
    </div>
    <ToC :list="elements" :state="nowObserving"></ToC>
  </div>
</template>
