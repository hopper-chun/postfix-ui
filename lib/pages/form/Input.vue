<script setup>
import { nextTick, onMounted, reactive, ref } from 'vue'
import { IconCheck } from '@/components/icon'
import { RmInput, RmInputTest, RmDividedInput, RmFloatInput } from '@/components/form/input/index'
import { RmDatePicker } from '@/components'
import { RmDividedSelect } from '@/components/form/select'
import { l1, l2, l3, l4, l5 } from '@/components'
import { useError, useTheme } from '@/composables'
import ToC from '@/layout/ToC.vue'
import origin from './seed'
import SectionWrapper from '@/components/layout/SectionWrapper.vue'

const { clearError, causeError } = useError()
const { InputExample } = origin
const theme = useTheme()
const inputValue = ref('text')
const inputNumber = ref('1234')
const options = ref({
  id: '1234',
  label: 'label',
  type: '',
  optionValue: '1234',
  disabled: false,
  placeholder: 'choose options and input text ',
  required: false,
  labelHelper: '',
  helperText: '',
  numberOnly: false,
  helperIcon: false,
  inputIcon: false,
  unit: '원',
  clear: false,
  showPassword: false,
  maxLength: null,
  styles: null,
  horizontal: true,
  labelWidth: 100,
})
const handleButton = (i) => {
  options.value[i] = !options.value[i]
}

const state = ref('props')
const handleSwitch = () => {
  if (state.value === 'props') {
    state.value = 'style'
  } else {
    state.value = 'props'
  }
}

const date = new Date()

const styleList = reactive({
  fontSize: '',
  textColor: '',
  paddingX: '',
  height: '',
  radius: '',
  bgColor: '',
  borderColor: '',
  border: 'border',
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
  label_fontSize: ['text-[14px]', 'text-[16px]', 'text-[20px] font-bold'],
  label_fontColor: ['text-black', 'text-red-700', 'text-[#0085FF]'],
})

const elements = ref({})

const functionRefs = (label) => (el) => {
  elements.value[label] = el
}
const nowObserving = ref(null)
const handleIntersection = (data) => {
  nowObserving.value = data
}

// section에서 true,false값과 함께 라벨값을 같이 여기에 던지고, 여기선 그걸 받아서 임의의 ref변수에 담아놓은 후, 그걸 ToC에 프롭스으로 던짐. TOC는 그걸 WATCH로 보고있다가 스타일을 변경함. WATCH가 안되면 COMPUTED로 해보기.

const onSubmit = () => {
  causeError({ id: 'id_01', msg: 'Your password must be less than 4 characters.' })
}
clearError()
</script>

<template>
  <div class="relative flex flex-1">
    <div class="flex-1">
      <div class="font-bold text-slate-500">Form</div>
      <div class="mt-[8px] text-[32px] font-bold text-slate-700">Input</div>
      <!-- <div class="flex flex-col space-y-[5px]"><l1>티원</l1><l2>티투</l2><l3>티스리</l3><l4 isBold>티포</l4><l5 isBold>티파이브</l5></div> -->
      <div class="mt-[60px]">
        <div class="space-y-[80px]">
          <div>
            <SectionWrapper label="Usage" :ref="functionRefs('Usage')" @onIntersection="handleIntersection">
              <template #contents>
                <div>
                  RmInput은 몇가지 기능을 위한 property와 스타일을 제공합니다. <br />
                  프로퍼티는 RmInput의 props에 의해 작동하며, 스타일은 props로 부여하는 것은 동일하나 <code>useTheme</code> 에 의해 기본적으로 정의됩니다.
                </div>
              </template>
              <div class="flex justify-center space-x-[8px] border-b pb-[20px]">
                <button
                  v-for="i in ['disabled', 'required', 'numberOnly', 'helperIcon', 'inputIcon', 'clear', 'showPassword']"
                  class="flex h-[32px] items-center justify-center rounded-[8px] border px-[8px] text-[14px]"
                  :class="options[i] ? `${theme.primary.bg} text-white` : ''"
                  @click="handleButton(i)"
                >
                  {{ i }}
                </button>
              </div>
              <div class="my-[20px] flex">
                <div class="flex flex-1 items-center justify-center px-[20px]">
                  <div class="w-[360px]">
                    <RmDatePicker isClear v-model="date"></RmDatePicker>

                    <RmInput
                      :label="options.label"
                      v-model="options.optionValue"
                      :labelHelper="options.labelHelper"
                      :helperText="options.helperText"
                      :helperIcon="options.helperIcon"
                      :inputIcon="options.inputIcon"
                      :numberOnly="options.numberOnly"
                      :placeholder="options.placeholder"
                      :unit="options.unit"
                      :required="options.required"
                      :clear="options.clear"
                      :showPassword="options.showPassword"
                      :maxLength="options.maxLength"
                      :disabled="options.disabled"
                    >
                      <template #prefix> https://www. </template>
                    </RmInput>
                    <!-- <RmInput
                      :label="options.label"
                      v-model="options.optionValue"
                      :labelHelper="options.labelHelper"
                      :helperText="options.helperText"
                      :helperIcon="options.helperIcon"
                      :inputIcon="options.inputIcon"
                      :numberOnly="options.numberOnly"
                      :placeholder="options.placeholder"
                      :unit="options.unit"
                      :required="options.required"
                      :clear="options.clear"
                      :showPassword="options.showPassword"
                      :maxLength="options.maxLength"
                      :disabled="options.disabled"
                    >
                      <template #helperIcon> <IconCheck class="w-[12px] text-gray-400"></IconCheck></template>
                      <template #inputIcon> <IconCheck class="w-[12px] text-gray-400"></IconCheck> </template>
                    </RmInput> -->
                  </div>
                </div>

                <div class="flex-1">
                  <div class="mb-[8px] flex items-center text-[14px]">
                    <button
                      @click="handleSwitch"
                      class="flex h-[32px] flex-1 items-center justify-center rounded-[8px] hover:bg-[#E6F6FF]"
                      :class="[state === 'props' ? `font-bold ${theme.primary.text}` : '']"
                    >
                      property
                    </button>
                    <div class="h-[12px] w-[1px] bg-slate-400"></div>
                    <button
                      @click="handleSwitch"
                      class="flex h-[32px] flex-1 items-center justify-center rounded-[8px] hover:bg-[#E6F6FF]"
                      :class="[state === 'style' ? `font-bold ${theme.primary.text}` : '']"
                    >
                      style
                    </button>
                  </div>
                  <template v-if="state === 'props'">
                    <div v-for="i in ['label', 'labelHelper', 'helperText', 'unit', 'maxLength']">
                      <RmDividedInput
                        :label="i"
                        v-model="options[i]"
                        :placeholder="i === 'maxLength' ? 'enter the number only' : ''"
                        :styles="{
                          labelWidth: 100,
                          fontSize: 'text-[14px]',
                          height: 'h-[30px]',
                          border: 'border-b',
                          radius: 'rounded-none',
                          paddingX: 'px-0',
                        }"
                        :horizontal="options.horizontal"
                        :labelWidth="options.labelWidth"
                      ></RmDividedInput>
                    </div>
                  </template>
                  <template v-else>
                    <div v-for="(value, key) in styleList">
                      <RmDividedSelect
                        :label="key"
                        v-model="styleList[key]"
                        defaultLabel="please select style"
                        :options="styleOptionList[key]"
                        :styles="{
                          labelWidth: 100,
                          fontSize: 'text-[14px]',
                          height: 'h-[30px]',
                          border: 'border-b',
                          radius: 'rounded-none',
                          paddingX: 'px-[12px]',
                        }"
                        :horizontal="options.horizontal"
                        :labelWidth="options.labelWidth"
                      ></RmDividedSelect>
                    </div>
                  </template>
                </div>
              </div>
              <div class="border-t pt-[16px] text-[14px]">
                <!-- <span v-if="options."></span> -->
                <div>
                  &lt;RmInput
                  <span class="space-x-[4px]">
                    <span v-if="options.label">:label="{{ options.label }}"</span>
                    <span>v-model="optionValue" </span>

                    <span v-if="options.placeholder"> :placeholder="{{ options.placeholder }}"</span>
                    <span v-if="options.disabled"> :disabled="{{ options.disabled }}" </span>
                    <span v-if="options.required">:required="{{ options.required }}"</span>
                    <span v-if="options.numberOnly"> :numberOnly="{{ options.numberOnly }}"</span>
                    <span v-if="options.helperIcon"> :helperIcon="{{ options.helperIcon }}" </span>
                    <span v-if="options.inputIcon"> :inputIcon="{{ options.inputIcon }}"</span>
                    <span v-if="options.clear">:clear="{{ options.clear }}"</span>
                    <span v-if="options.showPassword"> :showPassword="{{ options.showPassword }}"</span>
                    <span v-if="options.labelHelper"> :labelHelper="{{ options.labelHelper }}"</span>
                    <span v-if="options.helperText">:helperText="{{ options.helperText }}"</span>
                    <span v-if="options.unit"> :unit="{{ options.unit }}" </span>
                    <span v-if="options.maxLength"> :maxLength="{{ options.maxLength }}" </span>
                  </span>
                  <br />

                  :styles="{

                  <span v-for="(value, key, index) in styleList" :class="{ hidden: value === '' || value === 'null' }" class="mr-[4px]">
                    <span v-show="value !== 'null'">'{{ key }}: {{ value }},</span>
                  </span>
                  }" />
                </div>
              </div>
            </SectionWrapper>
          </div>
          <div>
            <SectionWrapper label="Basic design" :contentsOnly="true" :ref="functionRefs('Basic design')" @onIntersection="handleIntersection">
              <div class="space-y-[12px]">
                <div class="flex space-x-[16px]">
                  <RmInputTest v-model="inputValue" label="basic input" :required="true" placeholder="basic input" :maxLength="40" class="flex-1"></RmInputTest>
                </div>
                <RmInputTest :disabled="true" v-model="inputValue" label="disabled" :required="true" placeholder="basic input" class="w-full"></RmInputTest>
                <RmInputTest
                  v-model="inputValue"
                  label="rounded-full"
                  :required="true"
                  placeholder="basic input"
                  class="w-full"
                  :styles="{ radius: 'rounded-full' }"
                ></RmInputTest>
                <RmInputTest
                  v-model="inputValue"
                  label="border only bottom"
                  :required="true"
                  placeholder="basic input"
                  class="w-full"
                  :styles="{ border: 'border-b', radius: 'rounded-none', paddingX: 'px-0' }"
                ></RmInputTest>
              </div>
            </SectionWrapper>
          </div>
          <div>
            <SectionWrapper label="Error" :ref="functionRefs('Error')" @onIntersection="handleIntersection">
              <template #contents>
                <div class="text-[30px] font-bold text-red-600">Error</div>
              </template>
              <div>
                <form @submit.prevent="onSubmit">
                  <RmInputTest
                    v-model="inputValue"
                    label="input with Helper text"
                    labelHelper="this is label helper text"
                    helperText="this is helper text (+icon)"
                    :helperIcon="true"
                    id="id_01"
                    placeholder="enter the text"
                  >
                    <template #helperIcon> <IconCheck class="w-[12px] text-gray-400"></IconCheck></template>
                  </RmInputTest>
                  <RmFloatInput v-model="inputValue" label="input with Helper text" :helperIcon="true" id="id_01" placeholder="enter the text"> </RmFloatInput>
                  <div class="mt-1 flex justify-end">
                    <button type="submit" class="rounded border border-gray-300 bg-white px-4 py-1 text-gray-700 hover:bg-gray-50">submit</button>
                  </div>
                </form>
              </div>
            </SectionWrapper>
          </div>
          <div>
            <SectionWrapper label="NumberOnly" :code="InputExample.number" :ref="functionRefs('NumberOnly')" @onIntersection="handleIntersection">
              <template #contents>
                <div><code>numberOnly</code> props를 통해 input의 내용을 number로 제한할 수 있습니다. 단, 최대한 표현할 수 있는 수에는 한계가 있습니다.</div>
                <div>단위를 표기하고 싶다면 <code>unit</code> props를 사용하십시오.</div>
              </template>
              <div class="space-y-[12px]">
                <RmInputTest v-model="inputNumber" :numberOnly="true" label="NumberOnly"></RmInputTest>
                <RmInputTest v-model="inputNumber" :numberOnly="true" label="NumberOnly with unit" unit="원"></RmInputTest>
              </div>
            </SectionWrapper>
          </div>
          <div>
            <SectionWrapper label="Password" :code="InputExample.password" :ref="functionRefs('Password')" @onIntersection="handleIntersection">
              <RmInputTest
                v-model="inputValue"
                label="input for password"
                placeholder="enter your password"
                type="password"
                :showPassword="true"
                :clear="true"
              ></RmInputTest>
            </SectionWrapper>
          </div>
          <div>
            <SectionWrapper label="HelperText" :code="InputExample.helperText" :ref="functionRefs('HelperText')" @onIntersection="handleIntersection">
              <RmInputTest
                v-model="inputValue"
                label="input with Helper text"
                labelHelper="this is label helper text"
                helperText="this is helper text (+icon)"
                :helperIcon="true"
                placeholder="enter the text"
              >
                <template #helperIcon>
                  <IconCheck class="w-[8px] text-slate-400"></IconCheck>
                </template>
              </RmInputTest>
            </SectionWrapper>
          </div>
          <div>
            <SectionWrapper label="Input with Icon" :code="InputExample.icon" :ref="functionRefs('Input with Icon')" @onIntersection="handleIntersection">
              <template #contents>
                <div>
                  인풋 내부에 slot을 이용해 아이콘을 추가할 수 있습니다. RmInputTest에 <code>:inputIcon="true"</code> 을 추가하십시오.<br />
                  slot의 사용법은 코드를 참고하시기 바랍니다.
                </div>
              </template>
              <RmInputTest v-model="inputValue" label="input with Icon" :inputIcon="true" placeholder="enter the text">
                <template #inputIcon> <IconCheck class="w-[40px] text-gray-400"></IconCheck> </template
              ></RmInputTest>
            </SectionWrapper>
          </div>
        </div>
      </div>
      <div></div>
    </div>
    <ToC :list="elements" :state="nowObserving"></ToC>
  </div>
</template>
<style>
code {
  padding: 2px 4px;
  background-color: #e6f6ff;
}
</style>
