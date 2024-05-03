<script setup>
import { reactive, ref } from 'vue'
import { IconCheck } from '@/components/icon'
import { RmInput, RmDividedInput } from '@/components/form/input/index.js'
import { RmDividedSelect } from '@/components/form/select'
import { RmDividedTextarea } from '@/components/form/textarea'
import ToC from '@/layout/ToC.vue'
import origin from './seed'
import SectionWrapper from '@/components/layout/SectionWrapper.vue'
import formWrapperAlt from '@/components/layout/formWrapperAlt.vue'
import { useTheme } from '@/composables/'

const { people, dividedInputEx } = origin
const theme = useTheme()
const inputValue = ref('')
const inputNumber = ref('')
const SelectOptions = ref({
  label: 'label',
  value: '',
  defaultLabel: 'please choose option',
  labelHelper: 'helper',
  required: true,
})
const options = ref({
  id: '1234',
  label: 'label',
  type: '',
  optionValue: '',
  disabled: false,
  placeholder: 'Please input text ',
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
  horizontal: true,
  labelWidth: 70,
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
  labelWidth: 100,
})

const labelWidthLists = [{}]
const handleButton = () => {
  options.value.horizontal = !options.value.horizontal
}

const elements = ref({})
const functionRefs = (label) => (el) => {
  elements.value[label] = el
}
const nowObserving = ref(null)
const handleIntersection = (data) => {
  nowObserving.value = data
}

// const { setTheme } = useThemeDefault()
// setTheme({ formWrapper: () => formWrapperAlt })
</script>
<template>
  <div class="relative flex w-full">
    <div class="flex-1">
      <div class="font-bold text-slate-500">form</div>
      <div class="mt-[8px] text-[32px] font-bold text-slate-700">Divided Form</div>
      <div class="mt-[16px] w-[800px] text-[16px] text-slate-700">Basic divided form</div>
      <div class="mt-[60px]">
        <div class="space-y-[80px]">
          <div>
            <SectionWrapper label="basic" :codeOnly="true" :code="dividedInputEx" :ref="functionRefs('basic')" @onIntersection="handleIntersection">
              <template #contents>
                <div>
                  divided form들은 일반 폼들과 기능을 공유한다. 단, horizontal 상태일 때 labelHelper 텍스트는 사용되지 않는다. <br />
                  컴포넌트에 <code>:horizontal="true" :labelWidth="70"</code>와 같은 형태로 사용한다. <br /><code>labelWidth</code>에는 number만 들어갈 수
                  있으며, 디폴트값은 100이다.
                </div>
              </template>
            </SectionWrapper>
          </div>
          <div>
            <SectionWrapper label="Example" :contentsOnly="true" :ref="functionRefs('Example')" @onIntersection="handleIntersection">
              <div class="flex justify-center space-x-[50px] border-b pb-[20px]">
                <div class="flex items-center space-x-[12px]">
                  <span class="text-[14px]">horizontal</span>
                  <button
                    class="flex h-[32px] w-[50px] items-center justify-center rounded-[8px] border text-[14px]"
                    :class="options.horizontal ? `${theme.primary.bg} text-white` : ''"
                    @click="handleButton"
                  >
                    <span v-show="options.horizontal">true</span>
                    <span v-show="!options.horizontal">false</span>
                  </button>
                </div>
                <div class="w-[160px]">
                  <RmDividedSelect
                    label="labelWidth"
                    :disabled="!options.horizontal"
                    :options="[70, 100, 150]"
                    v-model="options.labelWidth"
                    :horizontal="true"
                    :labelWidth="80"
                    :styles="{ height: 'h-[32px]' }"
                  ></RmDividedSelect>
                </div>
              </div>
              <div class="mt-[20px] space-y-[20px]">
                <RmDividedInput
                  :label="options.label"
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
                  :horizontal="options.horizontal"
                  :labelWidth="options.labelWidth"
                  :wrapper="formWrapperAlt"
                >
                  <template #helperIcon> <IconCheck class="w-[12px] text-gray-400"></IconCheck></template>
                  <template #inputIcon> <IconCheck class="w-[12px] text-gray-400"></IconCheck> </template
                ></RmDividedInput>
                <RmDividedTextarea
                  label="label"
                  :id="options.id"
                  :required="options.required"
                  :disabled="options.disabled"
                  :placeholder="options.placeholder"
                  :labelHelper="options.labelHelper"
                  :helperText="options.helperText"
                  :helperIcon="options.helperIcon"
                  v-model="inputValue"
                  :maxlength="options.maxLength"
                  :horizontal="options.horizontal"
                  :labelWidth="options.labelWidth"
                ></RmDividedTextarea>
                <RmDividedSelect
                  :label="SelectOptions.label"
                  id="select-01"
                  v-model="SelectOptions.value"
                  :options="people"
                  :optionsLabel="(option) => option.name"
                  :optionsValue="(option) => option.id"
                  :defaultLabel="SelectOptions.defaultLabel"
                  :required="SelectOptions.required"
                  :horizontal="options.horizontal"
                  :labelWidth="options.labelWidth"
                >
                </RmDividedSelect>
              </div>
            </SectionWrapper>
          </div>
        </div>
      </div>
    </div>
    <ToC :list="elements" :state="nowObserving"></ToC>
  </div>
</template>
