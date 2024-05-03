<script setup>
import { reactive, computed, ref } from 'vue'
import { useThemeDefault, useTheme } from '@/composables'
import ToC from '@/layout/ToC.vue'
import SectionWrapper from '@/components/layout/SectionWrapper.vue'
import { RmDividedInput } from '@/components/form/input'
import { RmSelect, RmDividedSelect, RmSelectEx1 } from '@/components/form/select'
import { IconCheck } from '@/components/icon'
import origin from './seed'

const theme = useTheme(computed(() => {}))

const SelectOptions = ref({
  label: 'label',
  value: '',
  defaultLabel: 'please Choose option',
  labelHelper: 'helper',
  required: true,
  helperText: 'this is helper text (+icon)',
  helperIcon: true,
  horizontal: true,
  labelWidth: 140,
})

const styleList = reactive({
  fontSize: '',
  textColor: '',
  paddingX: '',
  height: '',
  radius: '',
  bgColor: '',
  borderColor: '',
  border: '',
  // labelWidth: '',
  select_paddingY: '',
  select_optionFontSize: '',
  select_optionHover: '',
  select_optionSelected: '',
  select_optionBorder: '',
  select_maxHeight: '',
  select_marginTop: '',
  label_fontSize: '',
  label_fontColor: '',
})

const styleOptionList = reactive({
  fontSize: ['text-[14px]', 'text-[16px]', 'text-[20px]', 'text-[28px]'],
  textColor: ['text-black', 'text-red-600', theme.value.primary.text],
  paddingX: ['px-[12px]', 'px-[16px]', 'px-[20px]'],
  height: ['h-[48px]', 'h-[56px]', 'h-[64px]'],
  radius: ['rounded-none', 'rounded-[8px]', 'rounded-[12px]'],
  bgColor: ['bg-white', 'bg-gray-100', 'bg-red-100'],
  borderColor: ['border-gray-300', 'border-red-300', theme.value.primary.border],
  border: ['border', 'border-b', 'border-y'],
  // labelWidth: ['null', '100', '150'],
  select_paddingY: ['py-[4px]', 'py-[8px]', 'py-[16px]'],
  select_optionFontSize: ['text-[14px]', 'text-[16px]', 'text-[20px]'],
  select_optionHover: [`hover:bg-[#E6F6FF] hover:${theme.value.primary.text}`, 'hover:bg-slate-600 hover:text-white', 'hover:bg-red-100 hover:text-red-700'],
  select_optionSelected: ['bg-white text-black', `${theme.value.primary.bg} text-white`, 'bg-red-600 text-white'],
  select_optionBorder: ['border', 'border-y', 'border-none'],
  select_maxHeight: ['max-h-[100px]', 'max-h-[200px]', 'max-h-[300px]'],
  select_marginTop: ['mt-0', 'mt-[4px]', 'mt-[12px]'],
  label_fontSize: ['text-[14px]', 'text-[16px]', 'text-[20px] font-bold'],
  label_fontColor: ['text-black', 'text-red-700', 'text-[#0085FF]'],
})

const elements = ref({})
const { people, selectDesign, options01, options02, options03 } = origin
const functionRefs = (label) => (el) => {
  elements.value[label] = el
}
const nowObserving = ref(null)
const handleIntersection = (data) => {
  nowObserving.value = data
}
const { setTheme } = useThemeDefault()
setTheme({ fontSize: 'text-[16px]' })
</script>
<template>
  <div class="relative flex w-full">
    <div class="flex-1">
      <div class="font-bold text-slate-500">Form</div>
      <div class="mt-[8px] text-[32px] font-bold text-slate-700">Select</div>
      <div class="mt-[16px] w-[800px] text-[16px] text-slate-700">
        셀렉트에 필요한 새로운 스타일? 호버에 대한것? 옵션들의 높낮이/폰트크기? 내부 패딩? 내부 보더는 알아서 하라고 하고... 셀렉트와 옵션 사이의 마진도?
        <br />
        새로운 slot : exapnd, checked (아이콘)
        <br />
        사용되는 slot : header, expand, option, checked

        <div class="mt-[15px] text-[14px]">
          구성 : demo에는 프로퍼티 스타일 구분 제거. 상단 디폴트 라벨, 하단 스타일 grid 2단으로 <br />
          최우선으로 옵션 넣는거부터. option 넣어서 optionLabel/Value 로 나눠 넣고, 다른 정보가 있는 경우 slot에서 빼내는 방법
          <br />
          이후 체크드, expand 커스터마이징 방법
        </div>
        <div class="text-[16px] font-bold text-red-600">Select의 새로운 프로퍼티 truncate 해석 및 example들 새 베이스에 맞게 바꾸기.</div>
      </div>
      <div class="mt-[60px]">
        <div class="space-y-[80px]">
          <div>
            <SectionWrapper label="Usage" :contentsOnly="true" :ref="functionRefs('Usage')" @onIntersection="handleIntersection">
              <template #contents> RmSelect는 다양한 커스터마이징을 지원한다. </template>

              <div class="">
                <RmSelect
                  :label="SelectOptions.label"
                  id="select-01"
                  v-model="SelectOptions.value"
                  :options="people"
                  :optionsLabel="(option) => option.name"
                  :optionsValue="(option) => option.id"
                  :defaultLabel="SelectOptions.defaultLabel"
                  :styles="{
                    fontSize: styleList.fontSize,
                    text: { color: styleList.textColor },
                    paddingX: styleList.paddingX,
                    height: styleList.height,
                    radius: styleList.radius,
                    bgColor: styleList.bgColor,
                    borderColor: styleList.borderColor,
                    border: styleList.border,
                    labelWidth: styleList.labelWidth,
                    label_fontSize: styleList.label_fontSize,
                    label_fontColor: styleList.label_fontColor,
                    select_paddingY: styleList.select_paddingY,
                    select_optionFontSize: styleList.select_optionFontSize,
                    select_optionHover: styleList.select_optionHover,
                    select_optionSelected: styleList.select_optionSelected,
                    select_optionBorder: styleList.select_optionBorder,
                    select_maxHeight: styleList.select_maxHeight,
                    select_marginTop: styleList.select_marginTop,
                  }"
                  :labelHelper="SelectOptions.labelHelper"
                  :required="SelectOptions.required"
                >
                  <template #header="{ localValue }">
                    <div v-if="localValue" class="flex items-center space-x-[6px]">
                      <div>{{ localValue.id }}.</div>
                      <div class="w-[26px] overflow-hidden rounded-full"><img :src="localValue.avatar" alt="" /></div>
                      <div>{{ localValue.name }}</div>
                    </div>
                  </template>
                  <template #option="{ option }">
                    <div class="flex items-center space-x-[6px]">
                      <div>{{ option.id }}.</div>
                      <div class="w-[26px] overflow-hidden rounded-full"><img :src="option.avatar" alt="" /></div>
                      <div>{{ option.name }}</div>
                    </div></template
                  >
                </RmSelect>
                <div class="w-[200px]">
                  <RmSelect
                    :label="SelectOptions.label"
                    id="select-01"
                    truncate
                    v-model="SelectOptions.value"
                    :options="people"
                    :optionsLabel="(option) => option.name"
                    :optionsValue="(option) => option.id"
                    :defaultLabel="SelectOptions.defaultLabel"
                    :styles="{
                      fontSize: styleList.fontSize,
                      text: { color: styleList.textColor },
                      paddingX: styleList.paddingX,
                      height: styleList.height,
                      radius: styleList.radius,
                      bgColor: styleList.bgColor,
                      borderColor: styleList.borderColor,
                      border: styleList.border,
                      labelWidth: styleList.labelWidth,
                      label_fontSize: styleList.label_fontSize,
                      label_fontColor: styleList.label_fontColor,
                      select_paddingY: styleList.select_paddingY,
                      select_optionFontSize: styleList.select_optionFontSize,
                      select_optionHover: styleList.select_optionHover,
                      select_optionSelected: styleList.select_optionSelected,
                      select_optionBorder: styleList.select_optionBorder,
                      select_maxHeight: styleList.select_maxHeight,
                      select_marginTop: styleList.select_marginTop,
                    }"
                    :labelHelper="SelectOptions.labelHelper"
                    :required="SelectOptions.required"
                  >
                    <!-- 헤더 내부에서 turncate 쓰는 예 -->
                    <!-- <template #header="{ localValue }">
                      <div v-if="localValue" class="flex items-center space-x-[6px] truncate">
               
                        <div>{{ localValue.id }}.</div>
                        <div class="w-[26px] shrink-0 overflow-hidden rounded-full"><img :src="localValue.avatar" alt="" /></div>
                        <div class="truncate">{{ localValue.name }}</div>
                      </div>
                    </template> -->
                    <!-- <template #option="{ option }">
                      <div class="flex items-center space-x-[6px]">
                        <div>{{ option.id }}.</div>
                        <div class="w-[26px] overflow-hidden rounded-full"><img :src="option.avatar" alt="" /></div>
                        <div>{{ option.name }}</div>
                      </div></template
                    > -->
                  </RmSelect>
                </div>
              </div>
              <div class="my-[20px] grid grid-cols-2 gap-[40px]">
                <div>
                  <div v-for="(value, key, index) in styleList" :class="{ hidden: index > 8 }">
                    <RmDividedSelect
                      :label="key"
                      v-model="styleList[key]"
                      defaultLabel="please select style"
                      :options="styleOptionList[key]"
                      :styles="{
                        labelWidth: 160,
                        fontSize: 'text-[14px]',
                        height: 'h-[30px]',
                        border: 'border-b',
                        radius: 'rounded-none',
                        paddingX: 'px-[12px]',
                      }"
                      :horizontal="SelectOptions.horizontal"
                      :labelWidth="SelectOptions.labelWidth"
                    ></RmDividedSelect>
                  </div>
                </div>
                <div>
                  <div v-for="(value, key, index) in styleList" :class="{ hidden: index < 9 }">
                    <RmDividedSelect
                      :label="key"
                      v-model="styleList[key]"
                      defaultLabel="please select style"
                      :options="styleOptionList[key]"
                      :styles="{
                        labelWidth: 160,
                        fontSize: 'text-[14px]',
                        height: 'h-[30px]',
                        border: 'border-b',
                        radius: 'rounded-none',
                        paddingX: 'px-[12px]',
                      }"
                      :horizontal="SelectOptions.horizontal"
                      :labelWidth="SelectOptions.labelWidth"
                    ></RmDividedSelect>
                  </div>
                  <RmDividedInput
                    label="defaultLabel"
                    v-model="SelectOptions.defaultLabel"
                    :styles="{
                      labelWidth: 160,
                      fontSize: 'text-[14px]',
                      height: 'h-[30px]',
                      border: 'border-b',
                      radius: 'rounded-none',
                      paddingX: 'px-[12px]',
                    }"
                    :horizontal="SelectOptions.horizontal"
                    :labelWidth="SelectOptions.labelWidth"
                    class="mt-[36px]"
                  ></RmDividedInput>
                </div>
              </div>

              <div class="border-t pt-[16px] text-[14px]">
                &lt;RmSelect label="label" id="select_01" defaultLabel="please Choose option" :styles={
                <span v-for="(value, key, index) in styleList" :class="{ hidden: value === '' || value === 'null' }" class="mr-[4px]">
                  <span v-show="value !== 'null'">'{{ key }}: {{ value }}',</span>
                </span>
                }>
              </div>
            </SectionWrapper>
          </div>
          <div>
            <SectionWrapper label="Example" :code="selectDesign.default" :ref="functionRefs('Example')" @onIntersection="handleIntersection">
              <div>
                <RmSelect
                  label="Default select"
                  id="select-01"
                  v-model="SelectOptions.value"
                  :options="people"
                  :optionsLabel="(option) => option.name"
                  :optionsValue="(option) => option.id"
                  :defaultLabel="SelectOptions.defaultLabel"
                  :styles="{
                    fontSize: styleList.fontSize,
                    text: { color: styleList.textColor },
                    paddingX: styleList.paddingX,
                    height: styleList.height,
                    radius: styleList.radius,
                    bgColor: styleList.bgColor,
                    borderColor: styleList.borderColor,
                    border: styleList.border,
                    labelWidth: styleList.labelWidth,
                    label_fontSize: styleList.label_fontSize,
                    label_fontColor: styleList.label_fontColor,
                    select_paddingY: styleList.select_paddingY,
                    select_optionFontSize: styleList.select_optionFontSize,
                    select_optionHover: styleList.select_optionHover,
                    select_optionSelected: styleList.select_optionSelected,
                    select_optionBorder: styleList.select_optionBorder,
                    select_maxHeight: styleList.select_maxHeight,
                    select_marginTop: styleList.select_marginTop,
                  }"
                  :helperText="SelectOptions.helperText"
                  :helperIcon="SelectOptions.helperIcon"
                  :labelHelper="SelectOptions.labelHelper"
                  :required="SelectOptions.required"
                >
                  <template #helperIcon>
                    <IconCheck class="w-[12px] text-gray-400"></IconCheck>
                  </template>
                </RmSelect>
              </div>
            </SectionWrapper>
            <SectionWrapper :code="selectDesign.monolithic">
              <div>
                <RmSelectEx1
                  label="monolithic select"
                  id="select-01"
                  v-model="SelectOptions.value"
                  :options="people"
                  :optionsLabel="(option) => option.name"
                  :optionsValue="(option) => option.id"
                  :defaultLabel="SelectOptions.defaultLabel"
                  :styles="{
                    fontSize: styleList.fontSize,
                    text: { color: styleList.textColor },
                    paddingX: styleList.paddingX,
                    height: styleList.height,
                    radius: styleList.radius,
                    bgColor: styleList.bgColor,
                    borderColor: styleList.borderColor,
                    border: styleList.border,
                    labelWidth: styleList.labelWidth,
                    label_fontSize: styleList.label_fontSize,
                    label_fontColor: styleList.label_fontColor,
                    select_paddingY: styleList.select_paddingY,
                    select_optionFontSize: styleList.select_optionFontSize,
                    select_optionHover: styleList.select_optionHover,
                    select_optionSelected: styleList.select_optionSelected,
                    select_optionBorder: styleList.select_optionBorder,
                    select_maxHeight: styleList.select_maxHeight,
                    select_marginTop: styleList.select_marginTop,
                  }"
                  :helperText="SelectOptions.helperText"
                  :helperIcon="SelectOptions.helperIcon"
                  :labelHelper="SelectOptions.labelHelper"
                  :required="SelectOptions.required"
                >
                  <template #helperIcon>
                    <IconCheck class="w-[12px] text-gray-400"></IconCheck>
                  </template>
                </RmSelectEx1>
              </div>
            </SectionWrapper>
          </div>
          <div>
            <SectionWrapper label="Options" :codeOnly="true" :code="options01" :ref="functionRefs('Options')" @onIntersection="handleIntersection">
              <template #contents>
                <div>
                  options 프로퍼티는 RmSelect에 부여될 값들의 배열입니다. <br />
                  배열은 리스트렌더링되며, 객체로 구성된 경우 다음과 같은 프로퍼티를 거쳐 사용해야만 합니다. <br />
                  <code>:optionsLabel="(option) => option.name" / :optionsValue="(option) => option.id"</code><br />
                </div>
              </template>
            </SectionWrapper>
          </div>
          <div>
            <SectionWrapper
              label="Option Customizing"
              :codeOnly="true"
              :code="options02"
              :ref="functionRefs('Option Customizing')"
              @onIntersection="handleIntersection"
            >
              <template #contents>
                <div>
                  options에 다양한 정보를 넣고 출력할 수 있습니다. <br />
                  RmSelect는 header, option 슬롯을 지원하며, options에서 받은 다양한 정보를 가공하고 스타일링할 수 있게 됩니다 <br />
                  header는 선택된 값을, option은 options를 리스트렌더링한 값을 가지고 있습니다.
                </div>
              </template>
            </SectionWrapper>
          </div>
          <div>
            <SectionWrapper
              label="Icon Customizing"
              :codeOnly="true"
              :code="options03"
              :ref="functionRefs('Icon Customizing')"
              @onIntersection="handleIntersection"
            >
              <template #contents>
                <div>expand 와 checked 아이콘을 커스커마이징 할 수 있습니다. 각각 expand, checked 슬롯을 사용합니다.</div>
              </template>
            </SectionWrapper>
          </div>
        </div>
      </div>
    </div>
    <ToC :list="elements" :state="nowObserving"></ToC>
  </div>
</template>
