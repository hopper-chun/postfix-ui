<script setup>
import { reactive, ref } from 'vue'
import { PxButton, RmSmIconButton, RmCustomButton } from '@/components/element/button'
import { PxButtonList } from '@/components'
import { RmDividedSelect } from '@/components/form/select'
import { IconApi } from '@/components/icon'
import ToC from '@/layout/ToC.vue'
import SectionWrapper from '@/components/layout/SectionWrapper.vue'
import origin from './seed'

const { button } = origin

const options = ref({
  color: 'pri',
  size: 'normal',
  disabled: false,
  radius: '',
  horizontal: true,
  labelWidth: 70,
  isWide: false,
})
const temp = ref('')
const optionList = ref({
  size: ['sm', 'smNw', 'normal', 'normalNw', 'lg', 'lgNw'],
  color: ['pri', 'secondary', 'transparent', 'black'],
  radius: ['rounded-none', 'rounded-[4px]', 'rounded-full'],
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
  options.value[option] = !options.value[option]
}
</script>
<template>
  <div class="relative flex w-full">
    <div class="flex-1">
      <div class="font-bold text-slate-500">Element</div>
      <div class="mt-[8px] text-[32px] font-bold text-slate-700">Button</div>
      <div class="mt-[16px] w-[800px] text-[16px] text-slate-700">about menu description.</div>
      <div class="mt-[60px]">
        <div class="space-y-[80px]">
          <div>
            <SectionWrapper label="usage" :ref="functionRefs('usage')" @onIntersection="handleIntersection">
              <template #contents> </template>
              <div>
                <div class="flex justify-center space-x-[8px] border-b pb-[20px]">
                  <div class="w-[70px]">
                    <PxButton size="sm" :isWide="true" :color="options.disabled ? 'pri' : 'inactive'" @click="handleClick('disabled')"> disabled </PxButton>
                  </div>
                  <div class="w-[70px]">
                    <PxButton size="sm" :isWide="true" :color="options.isWide ? 'pri' : 'inactive'" @click="handleClick('isWide')"> isWide </PxButton>
                  </div>
                </div>
                <div class="my-[20px] flex">
                  <div class="flex flex-1 items-center justify-center px-[30px]">
                    <PxButton
                      :color="options.color"
                      :size="options.size"
                      :isWide="options.isWide"
                      :disabled="options.disabled"
                      :styles="{ radius: options.radius }"
                    >
                      BUTTON</PxButton
                    >
                    <div @click="handleChange">클릭</div>
                  </div>
                  <div class="flex-1">
                    <div v-for="i in ['color', 'size']">
                      <RmDividedSelect
                        :label="i"
                        v-model="options[i]"
                        :options="optionList[i]"
                        :styles="{
                          fontSize: 'text-[14px]',
                          height: 'h-[30px]',
                          border: 'border-b',
                          radius: 'rounded-none',
                          paddingX: 'px-0',
                        }"
                        :horizontal="options.horizontal"
                        :labelWidth="options.labelWidth"
                      ></RmDividedSelect>
                    </div>
                    <RmDividedSelect
                      label="radius"
                      v-model="options.radius"
                      :options="optionList.radius"
                      :styles="{
                        fontSize: 'text-[14px]',
                        height: 'h-[30px]',
                        border: 'border-b',
                        radius: 'rounded-none',
                        paddingX: 'px-0',
                      }"
                      :horizontal="options.horizontal"
                      :labelWidth="options.labelWidth"
                    ></RmDividedSelect>
                  </div>
                </div>
              </div>
            </SectionWrapper>
          </div>
          <div>
            <PxButtonList
              label="개별 디자인 여부"
              :options="[
                { label: '인쇄 옵션01', value: 'option-01' },
                { label: '인쇄 옵션02', value: 'option02' },
                { label: 'YES', value: true },
                { label: 'NO', value: false },
              ]"
              :optionsLabel="(option) => option.label"
              :optionsValue="(option) => option.value"
              v-model="temp"
            ></PxButtonList>
            <div class="w-[300px]">
              <PxButtonList
                label="2222222222"
                :options="[
                  { label: '인쇄 옵션01', value: 'option-01' },
                  { label: '인쇄 옵션02', value: 'option02' },
                  { label: 'YES', value: true },
                  { label: 'NO', value: false },
                  { label: 'YES', value: true },
                  { label: 'NO', value: false },
                ]"
                :optionsLabel="(option) => option.label"
                :optionsValue="(option) => option.value"
                v-model="temp"
                classes="mt-[4px] flex flex-wrap space-x-[4px]"
              >
                <template v-slot="{ isSelect, optionsLabel }">
                  <div class="w-[100px]">
                    <PxButton isWide :color="isSelect ? 'pri' : 'inactive'">{{ optionsLabel }}</PxButton>
                  </div>
                </template>
              </PxButtonList>
            </div>
          </div>
          <!-- <div>
            <SectionWrapper label="example" :code="button.RmSmIconButton" :ref="functionRefs('example')" @onIntersection="handleIntersection">
              <template #contents> <div>small button with Icon</div> </template>
              <div class="flex flex-col items-center space-y-[20px]">
                <div class="flex items-center space-x-[20px]">
                  <RmSmIconButton size="md" textAlign="centerRight">
                    <template #icon>
                      <IconApi class="w-[14px]"></IconApi>
                    </template>
                    <span> BUTTON </span>
                  </RmSmIconButton>
                  <RmSmIconButton size="md" textAlign="right">
                    <template #icon>
                      <IconApi class="w-[14px]"></IconApi>
                    </template>
                    <span>BUTTON</span> </RmSmIconButton
                  ><RmSmIconButton size="md" textAlign="left">
                    <template #icon>
                      <IconApi class="w-[14px]"></IconApi>
                    </template>
                    <span>BUTTON</span>
                  </RmSmIconButton>
                </div>
                <div class="flex items-center space-x-[20px]">
                  <RmSmIconButton size="lg" textAlign="centerRight">
                    <template #icon>
                      <IconApi class="w-[14px]"></IconApi>
                    </template>
                    <span> BUTTON </span>
                  </RmSmIconButton>
                  <RmSmIconButton size="lg" textAlign="right">
                    <template #icon>
                      <IconApi class="w-[14px]"></IconApi>
                    </template>
                    <span>BUTTON</span> </RmSmIconButton
                  ><RmSmIconButton size="lg" textAlign="left">
                    <template #icon>
                      <IconApi class="w-[14px]"></IconApi>
                    </template>
                    <span>BUTTON</span>
                  </RmSmIconButton>
                </div>
              </div>
            </SectionWrapper>
          </div>
          <div>
            <SectionWrapper label="button with icon" contentsOnly :ref="functionRefs('button with icon')" @onIntersection="handleIntersection">
              <template #contents>
                PxButton 의 내용은 slot이기 때문에 버튼 내부는 커스터마이징 가능하며, 아이콘, 이미지까지 넣을 수 있음.
                <br />
              </template>
              <div class="flex items-center justify-center space-x-[40px]">
                <div>
                  <PxButton><span class="rounded-[4px] bg-white py-[2px] px-[60px] text-[#00A3FF]">customizing!</span></PxButton>
                </div>
                <div>
                  <PxButton>
                    <div class="flex items-center space-x-[8px]">
                      <span><IconApi class="w-[18px]"></IconApi></span>
                      <span>API</span>
                    </div>
                  </PxButton>
                </div>
              </div></SectionWrapper
            >
          </div>
          <div>
            <SectionWrapper label="Rounded Button" :code="button.roundedButton" :ref="functionRefs('Rounded Button')" @onIntersection="handleIntersection">
              <template #contents>
                <div>isWide 프로퍼티를 주고, 컨테이너의 크기를 버튼의 사이즈에 맞게 한 후 styles에 rounded-full을 주면 원형 버튼이 만들어진다.</div>
              </template>
              <div class="flex items-center justify-center space-x-[20px]">
                <div class="w-[32px]">
                  <PxButton color="pri" isWide size="sm" :styles="{ radius: 'rounded-full' }">
                    <IconApi class="w-[18px]"></IconApi>
                  </PxButton>
                </div>
                <div class="w-[40px]">
                  <PxButton color="pri" isWide :styles="{ radius: 'rounded-full' }">
                    <IconApi class="w-[21px]"></IconApi>
                  </PxButton>
                </div>
                <div class="w-[48px]">
                  <PxButton color="pri" isWide size="lg" :styles="{ radius: 'rounded-full' }">
                    <IconApi class="w-[24px]"></IconApi>
                  </PxButton>
                </div>
              </div>
            </SectionWrapper>
          </div> -->
        </div>
      </div>
    </div>
    <ToC :list="elements" :state="nowObserving"></ToC>
  </div>
</template>
