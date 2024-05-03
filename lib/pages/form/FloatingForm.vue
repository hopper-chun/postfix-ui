<script setup>
import { reactive, ref } from 'vue'

import useThemeDefault from '@/composables/useThemeDefault'
import { IconCheck } from '@/components/icon'
import { RmFloatInput, RmFloatInputEx1, RmFloatInputEx2 } from '@/components/form/input/index.js'
import { RmFloatSelect, RmFloatSelectEx2 } from '@/components/form/select'
import { RmFloatTextarea, RmFloatTextareaEx2 } from '@/components/form/textarea'
import ToC from '@/layout/ToC.vue'
import origin from './seed'
import SectionWrapper from '@/components/layout/SectionWrapper.vue'

const { people, floatingInputEx1, floatingInputEx2, floatingTextareaEx1, floatingTextareaEx2, floatingSelectEx1, floatingSelectEx2 } = origin

const inputValue = ref('1234')
const inputNumber = ref('')
const SelectOptions = ref({
  label: 'label',
  value: '',
  defaultLabel: 'please Choose option',
  labelHelper: 'helper',
  required: true,
})
const options = ref({
  id: '1234',
  label: 'label',
  type: '',
  optionValue: '',
  disabled: false,
  placeholder: 'choose options and input text ',
  required: false,
  helperText: '',
  numberOnly: false,
  helperIcon: false,
  inputIcon: false,
  unit: '',
  clear: false,
  showPassword: false,
  maxLength: null,
  styles: null,
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
      <div class="mt-[8px] text-[32px] font-bold text-slate-700">Floating Form</div>
      <div class="mt-[16px] w-[800px] text-[16px] text-slate-700">about input description.</div>
      <div>
        인풋, textarea, select 순으로 플로팅 디자인. <br />
        최상단에는 플로팅 바리에이션, 그 아래는 기능별로
      </div>
      <div class="mt-[60px]">
        <div class="space-y-[80px]">
          <div>
            <SectionWrapper label="basic" :ref="functionRefs('basic')" @onIntersection="handleIntersection">
              <template #contents>
                <div>floating form의 구성요소들은 일반 form과 대부분의 프로퍼티/스타일을 공유하지만, 일부 요소는 그렇지 않다.</div>
              </template>
            </SectionWrapper>
          </div>
          <div>
            <SectionWrapper label="Floating Input" :code="floatingInputEx1" :ref="functionRefs('Floating Input')" @onIntersection="handleIntersection">
              <template #contents>
                <div>플로팅 인풋은 Label helperText를 가지지 않는다.</div>
              </template>
              <div class="flex justify-center">
                <div class="w-[360px]">
                  <RmFloatInputEx1
                    label="Default floating input"
                    v-model="options.optionValue"
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
                    :styles="{
                      fontSize: styleList.fontSize,
                      text: { color: styleList.textColor },
                      paddingX: styleList.paddingX,
                      height: styleList.height,
                      radius: styleList.radius,
                      bgColor: styleList.bgColor,
                      borderColor: styleList.borderColor,
                      border: styleList.border,
                    }"
                  >
                    <template #helperIcon> <IconCheck class="w-[12px] text-gray-400"></IconCheck></template>
                    <template #inputIcon> <IconCheck class="w-[12px] text-gray-400"></IconCheck> </template>
                  </RmFloatInputEx1>
                </div>
              </div>
            </SectionWrapper>
            <SectionWrapper :code="floatingInputEx2">
              <div class="flex justify-center">
                <div class="w-[360px]">
                  <RmFloatInputEx2
                    label="Outlined floating input"
                    v-model="options.optionValue"
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
                    :styles="{
                      fontSize: styleList.fontSize,
                      text: { color: styleList.textColor },
                      paddingX: styleList.paddingX,
                      height: styleList.height,
                      radius: styleList.radius,
                      bgColor: styleList.bgColor,
                      borderColor: styleList.borderColor,
                      border: styleList.border,
                    }"
                  >
                    <template #helperIcon> <IconCheck class="w-[12px] text-gray-400"></IconCheck></template>
                    <template #inputIcon> <IconCheck class="w-[12px] text-gray-400"></IconCheck> </template>
                  </RmFloatInputEx2>
                </div></div
            ></SectionWrapper>
            <SectionWrapper :contentsOnly="true">
              <div class="space-y-[20px]">
                <div class="flex items-center space-x-[20px]">
                  <div class="flex-1">
                    <RmFloatInput v-model="inputNumber" :numberOnly="true" label="NumberOnly"></RmFloatInput>
                  </div>
                  <div class="flex-1">
                    <RmFloatInput v-model="inputNumber" :numberOnly="true" label="NumberOnly with unit" unit="원"></RmFloatInput>
                  </div>
                </div>

                <div class="flex items-center space-x-[20px]">
                  <div class="flex-1">
                    <RmFloatInput
                      v-model="inputValue"
                      label="input for password"
                      placeholder="enter your password"
                      type="password"
                      :showPassword="true"
                      :clear="true"
                    ></RmFloatInput>
                  </div>
                  <div class="flex-1">
                    <RmFloatInput v-model="inputValue" label="input with Icon" :inputIcon="true" placeholder="enter the text">
                      <template #inputIcon> <IconCheck class="w-[12px] text-gray-400"></IconCheck> </template
                    ></RmFloatInput>
                  </div>
                </div>
                <div class="flex items-center space-x-[20px]">
                  <div class="flex-1">
                    <RmFloatInput
                      v-model="inputValue"
                      label="input with Helper text"
                      helperText="this is helper text (+icon)"
                      :helperIcon="true"
                      placeholder="enter the text"
                    >
                      <template #helperIcon> <IconCheck class="w-[12px] text-gray-400"></IconCheck></template>
                    </RmFloatInput>
                  </div>
                  <div class="flex-1">
                    <RmFloatInput
                      label="input with Helper text"
                      v-model="inputValue"
                      placeholder=" "
                      @update:modelValue="$emit('update:modelValue', $event)"
                      :styles="{
                        radius: 'rounded-[12px]',
                        borderColor: 'border-[#e5e7eb]',
                        bgColor: 'bg-[#f9fafb]',
                        height: 'h-[74px]',
                        fontSize: 'text-16px',
                      }"
                      :labelClasses="`text-[12px] leading-[19px] -translate-y-[20%] text-[#737373]`"
                      classes="pt-[30px] px-[36px]"
                    ></RmFloatInput>
                  </div>
                </div></div
            ></SectionWrapper>
          </div>
          <div>
            <SectionWrapper label="Floating Textarea" :code="floatingTextareaEx1" :ref="functionRefs('Floating Textarea')" @onIntersection="handleIntersection">
              <template #contents>
                <div></div>
              </template>
              <div class="flex justify-center">
                <div class="w-[360px]">
                  <RmFloatTextarea
                    label="Default floating textarea"
                    :id="options.id"
                    :required="options.required"
                    :disabled="options.disabled"
                    :labelHelper="options.labelHelper"
                    :helperText="options.helperText"
                    :helperIcon="options.helperIcon"
                    v-model="inputValue"
                    :rows="10"
                    :maxlength="options.maxLength"
                  ></RmFloatTextarea>
                </div>
              </div>
            </SectionWrapper>
            <SectionWrapper :code="floatingTextareaEx2">
              <div class="flex justify-center">
                <div class="w-[360px]">
                  <RmFloatTextareaEx2
                    label="Outlined floating textarea"
                    :id="options.id"
                    :required="options.required"
                    :disabled="options.disabled"
                    :labelHelper="options.labelHelper"
                    :helperText="options.helperText"
                    :helperIcon="options.helperIcon"
                    v-model="inputValue"
                    :maxlength="options.maxLength"
                  ></RmFloatTextareaEx2>
                </div>
              </div>
            </SectionWrapper>
          </div>
          <div>
            <SectionWrapper label="Floating Select" :code="floatingSelectEx1" :ref="functionRefs('Floating Select')" @onIntersection="handleIntersection">
              <template #contents> <div>select</div> </template>
              <div class="flex justify-center">
                <div class="w-[360px]">
                  <RmFloatSelect
                    label="기본값 한글 믐믐믐 이름 이메일 Default floating select"
                    id="select-01"
                    v-model="SelectOptions.value"
                    :options="people"
                    :optionsLabel="(option) => option.name"
                    :optionsValue="(option) => option.id"
                    :defaultLabel="SelectOptions.defaultLabel"
                    :required="SelectOptions.required"
                  >
                  </RmFloatSelect>
                </div>
              </div>
            </SectionWrapper>
            <SectionWrapper :code="floatingSelectEx2">
              <div class="flex justify-center">
                <div class="w-[360px]">
                  <RmFloatSelectEx2
                    label="Outlined floating select"
                    id="select-01"
                    v-model="SelectOptions.value"
                    :options="people"
                    :optionsLabel="(option) => option.name"
                    :optionsValue="(option) => option.id"
                    :defaultLabel="SelectOptions.defaultLabel"
                    :required="SelectOptions.required"
                  >
                  </RmFloatSelectEx2>
                </div>
              </div>
            </SectionWrapper>
          </div>
          <!-- <div>
            <SectionWrapper label="Basic design" :ref="functionRefs('Basic design')" @onIntersection="handleIntersection">
              <div class="space-y-[12px]">
                <div class="flex space-x-[16px]">
                  <RmFloatInput
                    v-model="inputValue"
                    label="basic input"
                    :required="true"
                    placeholder="basic input"
                    :maxLength="40"
                    class="flex-1"
                  ></RmFloatInput>
                </div>
                <RmFloatInput :disabled="true" v-model="inputValue" label="disabled" :required="true" placeholder="basic input" class="w-full"></RmFloatInput>
                <RmFloatInput
                  v-model="inputValue"
                  label="rounded-full"
                  :required="true"
                  placeholder="basic input"
                  class="w-full"
                  :styles="{ radius: 'rounded-full' }"
                ></RmFloatInput>
                <RmFloatInput
                  v-model="inputValue"
                  label="border only bottom"
                  :required="true"
                  placeholder="basic input"
                  class="w-full"
                  :styles="{ border: 'border-b', radius: 'rounded-none', paddingX: 'px-0' }"
                ></RmFloatInput>
              </div>
            </SectionWrapper>
          </div>
          <div>
            <SectionWrapper label="UseInput" :ref="functionRefs('UseInput')" @onIntersection="handleIntersection">
              <template #contents>
                <div>TextOnly</div>
              </template>
              <div>1234</div>
            </SectionWrapper>
          </div>
          <div>
            <SectionWrapper label="NumberOnly" :ref="functionRefs('NumberOnly')" @onIntersection="handleIntersection">
              <template #contents>
                <div><code>numberOnly</code> props를 통해 input의 내용을 number로 제한할 수 있습니다. 단, 최대한 표현할 수 있는 수에는 한계가 있습니다.</div>
                <div>단위를 표기하고 싶다면 <code>unit</code> props를 사용하십시오.</div>
              </template>
              <div class="space-y-[12px]">
                <RmFloatInput v-model="inputNumber" label="NumberOnly"></RmFloatInput>
                <RmFloatInput v-model="inputNumber" label="NumberOnly with unit" unit="원"></RmFloatInput>
              </div>
            </SectionWrapper>
          </div>
          <div>
            <SectionWrapper label="Password" :ref="functionRefs('Password')" @onIntersection="handleIntersection">
              <RmFloatInput
                v-model="inputValue"
                label="input for password"
                placeholder="enter your password"
                type="password"
                :showPassword="true"
                :clear="true"
              ></RmFloatInput>
            </SectionWrapper>
          </div>
          <div>
            <SectionWrapper label="HelperText" :ref="functionRefs('HelperText')" @onIntersection="handleIntersection">
              <RmFloatInput
                v-model="inputValue"
                label="input with Helper text"
                helperText="this is helper text (+icon)"
                :helperIcon="true"
                placeholder="enter the text"
              >
                <template #helperIcon> <IconCheck class="w-[12px] text-gray-400"></IconCheck></template>
              </RmFloatInput>
            </SectionWrapper>
          </div>
          <div>
            <SectionWrapper label="Input with Icon" :ref="functionRefs('Input with Icon')" @onIntersection="handleIntersection">
              <RmFloatInput v-model="inputValue" label="input with Icon" :inputIcon="true" placeholder="enter the text">
                <template #inputIcon> <IconCheck class="w-[12px] text-gray-400"></IconCheck> </template
              ></RmFloatInput>
            </SectionWrapper>
          </div> -->
        </div>
      </div>
      <div></div>
    </div>
    <ToC :list="elements" :state="nowObserving"></ToC>
  </div>
</template>
<style>
/* code {
  padding: 2px 4px;
  background-color: #e6f6ff;
} */
</style>
