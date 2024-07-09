<script setup>
import { reactive, ref } from 'vue'
import { PxButton, RmSmIconButton } from '@/components/element/button'
import { RmDividedSelect } from '@/components/form/select'
import { IconSettings } from '@/components/icon'
import { RmDropdown } from '@/components/element'
import SimpleDropdown from '@/components/element/dropdown/extra/SimpleDropdown.vue'
import ToC from '@/layout/ToC.vue'
import SectionWrapper from '@/components/layout/SectionWrapper.vue'
import origin from './seed.js'

const { dropdown } = origin

const dropdownOptions = ref({
  currentValue: [],
  hover: false,
  direction: 'bottom',
  menuAlign: 'left',
})

const optionList = {
  direction: ['bottom', 'left', 'right', 'top'],
  menuAlign: ['left', 'right'],
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
  dropdownOptions.value[option] = !dropdownOptions.value[option]
}
</script>
<template>
  <div class="relative flex w-full">
    <div class="flex-1">
      <div class="font-bold text-slate-500">Element</div>
      <div class="mt-[8px] text-[32px] font-bold text-slate-700">Dropdown</div>
      <div class="mt-[16px] w-[800px] text-[16px] text-slate-700">about menu description.</div>
      <div class="mt-[16px] w-[800px] text-[16px] text-slate-700">
        3. 내부 디자인이 보다 자유로움 => divider로 분리되어있다던지, option 외의 기타 정보가 표기되어 있다던지. 보여주는 정보는 정해져 있되, 디자인과 배치 등은
        자유로울 수 있도록.
        <br />
        구성요소? divide(index로 통제), 방향성, hover/click 스위치, shadow, slot으로 정보와 기능 나누기, ++ 특수로 체크박스가 있는 드랍다운
        <br />
        복잡한 구조 <br />
        1) 내부에 정보가 있는 구조. 일반적으로 slot으로 따로 빼서 디자인하면 되겠지만, 만약 이러한 내부정보가 하나를 넘어간다면? <br />
        2) {트리거, 내부정보, 메뉴} / 내부정보가 없으면 그대로 메뉴를 출력. 내부정보가 있다면 내부정보 출력 (내부정보 안에 아이콘 또는 이미지주소, 텍스트,
        인덱스 등 다 넣어놓고 풀어서 정해진 디자인대로 나오도록.) / 또는 {트리거:xx, 그룹:[{내부정보, 메뉴},{메뉴}, {...}] } 이런 식으로 해서 각 요소를 divide로
        분리 <br />3) dropdown in dropdown
      </div>

      <div class="mt-[60px]">
        <div class="space-y-[80px]">
          <div>
            <SectionWrapper label="Usage" :ref="functionRefs('Usage')" @onIntersection="handleIntersection">
              <template #contents></template>
              <div class="flex flex-col items-center justify-center space-y-[30px]">
                <div class="flex justify-center space-x-[8px] border-b pb-[20px]">
                  <div class="w-[70px]">
                    <PxButton size="sm" :isFull="true" :color="dropdownOptions.hover ? 'pri' : 'transparent'" @click="handleClick('hover')"> hover </PxButton>
                  </div>
                </div>

                <div class="flex w-full items-center justify-center space-x-[20px]">
                  <div class="flex flex-1 flex-col items-center space-y-[12px]">
                    <div class="flex items-center justify-center space-x-[60px]">
                      <div>
                        <RmDropdown :hover="dropdownOptions.hover" :options="dropdown.simple.menu"> 드랍다운 테스트 </RmDropdown>
                      </div>
                      <div>
                        <SimpleDropdown
                          :items="dropdown.simple"
                          :hover="dropdownOptions.hover"
                          :direction="dropdownOptions.direction"
                          :menuAlign="dropdownOptions.menuAlign"
                          v-model="dropdownOptions.currentValue"
                        >
                        </SimpleDropdown>
                      </div>
                      <div>
                        <SimpleDropdown
                          :items="dropdown.simple2"
                          :hover="dropdownOptions.hover"
                          :direction="dropdownOptions.direction"
                          :menuAlign="dropdownOptions.menuAlign"
                          v-model="dropdownOptions.currentValue"
                        >
                          <template #trigger="{ open }">
                            <div class="flex h-[30px] w-[30px] items-center justify-center rounded-[8px] border border-slate-500">
                              <IconSettings class="w-[20px] transition duration-500" :class="open ? 'text-slate-800' : 'text-slate-500'"></IconSettings>
                            </div>
                          </template>
                        </SimpleDropdown>
                      </div>
                    </div>
                    <div class="text-[13px]">selected : {{ dropdownOptions.currentValue }}</div>
                  </div>
                  <div class="flex-1">
                    <RmDividedSelect
                      label="direction"
                      v-model="dropdownOptions.direction"
                      :options="optionList.direction"
                      :styles="{
                        fontSize: 'text-[14px]',
                        height: 'h-[30px]',
                        border: 'border-b',
                        radius: 'rounded-none',
                        paddingX: 'px-0',
                      }"
                      :horizontal="true"
                      :labelWidth="100"
                    ></RmDividedSelect>
                    <RmDividedSelect
                      label="menuAlign"
                      v-model="dropdownOptions.menuAlign"
                      :options="optionList.menuAlign"
                      :styles="{
                        fontSize: 'text-[14px]',
                        height: 'h-[30px]',
                        border: 'border-b',
                        radius: 'rounded-none',
                        paddingX: 'px-0',
                      }"
                      :horizontal="true"
                      :labelWidth="100"
                    ></RmDividedSelect>
                  </div>
                </div>
              </div>
            </SectionWrapper>
          </div>
          <!-- <div>
            <SectionWrapper label="Multi Dropdown" :ref="functionRefs('Multi Dropdown')" @onIntersection="handleIntersection">
              <div>
                <MultiDropdown
                  :items="dropdown.multi"
                  :hover="dropdownOptions.hover"
                  :direction="dropdownOptions.direction"
                  :menuAlign="dropdownOptions.menuAlign"
                  v-model="dropdownOptions.currentValue"
                >
                  <template #trigger="{ open }"> </template>
                </MultiDropdown></div
            ></SectionWrapper>
          </div> -->
        </div>
      </div>
    </div>
    <ToC :list="elements" :state="nowObserving"></ToC>
  </div>
</template>
