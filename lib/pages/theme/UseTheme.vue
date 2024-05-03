<script setup>
import { reactive, ref, watchEffect } from 'vue'
import { IconCheck, IconChevronRight } from '@/components/icon'
import { RmInput } from '@/components/form/input/index'
import { RmSelect } from '@/components/form/select'
import origin from './seed'
import { useThemeDefault, useTheme } from '@/composables'
import ToC from '@/layout/ToC.vue'
import SectionWrapper from '@/components/layout/SectionWrapper.vue'

const { setThemeCode } = origin
const theme = useTheme()
const options = ref({
  id: '1234',
  label: 'label',
  type: '',
  optionValue: 'text',
  disabled: false,
  placeholder: 'choose options and input text ',
  required: false,
  labelHelper: '',
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
  labelWidth: '',
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
  labelWidth: ['null', '100', '150'],
})

const setThemeOption = ref('text-[14px]')

const elements = ref({})
const functionRefs = (label) => (el) => {
  elements.value[label] = el
}
const nowObserving = ref(null)
const handleIntersection = (data) => {
  nowObserving.value = data
}
const { setTheme } = useThemeDefault()
watchEffect(() => {
  setTheme({ fontSize: `${setThemeOption.value}` })
})
</script>
<template>
  <div class="relative flex w-full">
    <div class="flex-1">
      <div class="font-bold text-slate-500">theme</div>
      <div class="mt-[8px] text-[32px] font-bold text-slate-700">useTheme</div>
      <div class="mt-[16px] w-[800px] text-[16px] text-slate-700">
        useTheme, useThemeDefault는 Rm컴포넌트를 관통하는 스타일 컴포저블 요소입니다. <br />
        Rm컴포넌트들은 미리 설정된 스타일들이 있으며, useTheme과 useThemeDefault를 통해 이러한 스타일들을 커스터마이징 할 수 있게 됩니다.
      </div>

      <div class="mt-[60px]">
        <div class="space-y-[80px]">
          <div>
            <SectionWrapper label="Demo" :contentsOnly="true" :ref="functionRefs('Demo')" @onIntersection="handleIntersection">
              <template #contents>
                <div>
                  각 컴포넌트마다 지정된 스타일이 존재합니다. <br />
                  바꾸고 싶은 부분이 있다면, :styles에 객체 형식으로 원하는 스타일과 값을 추가하십시오. <br />
                  스타일을 주지 않았을 때에는 useThemeDefault에 저장된 기본값을 불러옵니다. <br />
                  지정된 스타일 외의 요소들도 변경할 수 있지만, 권장하지 않습니다.
                </div>
              </template>
              <div>
                <div class="my-[20px] flex">
                  <div class="flex flex-1 items-center justify-center px-[20px]">
                    <div class="w-[360px]">
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
                        :styles="{
                          fontSize: styleList.fontSize,
                          textColor: styleList.textcolor,
                          paddingX: styleList.paddingX,
                          height: styleList.height,
                          radius: styleList.radius,
                          bgColor: styleList.bgColor,
                          borderColor: styleList.borderColor,
                          border: styleList.border,
                          labelWidth: styleList.labelWidth,
                        }"
                      >
                        <template #helperIcon> <IconCheck class="w-[12px] text-gray-400"></IconCheck></template>
                        <template #inputIcon> <IconCheck class="w-[12px] text-gray-400"></IconCheck> </template>
                      </RmInput>
                    </div>
                  </div>

                  <div class="flex-1">
                    <div v-for="(value, key) in styleList">
                      <RmSelect
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
                      ></RmSelect>
                    </div>
                  </div>
                </div>
                <div class="border-t pt-[16px] text-[14px]">
                  <div>
                    &lt;RmInput :styles="{

                    <span v-for="(value, key, index) in styleList" :class="{ hidden: value === '' || value === null }" class="mr-[4px]">
                      <span v-show="value !== 'null'">{{ key }}: '{{ value }}',</span>
                    </span>
                    }" />
                  </div>
                </div>
              </div>
            </SectionWrapper>
          </div>
          <div>
            <SectionWrapper label="setTheme" :codeOnly="true" :code="setThemeCode" :ref="functionRefs('setTheme')" @onIntersection="handleIntersection">
              <template #contents>
                <div>
                  useThemeDefault의 값에 접근해 기본값을 변경할 수 있습니다. <br />
                  이 변경은 전역적이며, router-view를 포함하는 가장 최상위 컴포넌트에서 실행하는 것을 권장합니다. <br />
                  몇몇 컴포넌트들은 독자적인 스타일을 가지고 있습니다. 스타일에 대한 정보는 각 컴포넌트 페이지를 참고하십시오.
                </div>
              </template>
            </SectionWrapper>
            <SectionWrapper>
              <div class="flex items-center">
                setTheme({ fontSize:
                <span class="ml-[4px] w-[110px]">
                  <RmSelect
                    v-model="setThemeOption"
                    :options="['text-[14px]', 'text-[16px]', 'text-[20px]']"
                    :styles="{
                      fontSize: 'text-[14px]',
                      height: 'h-[30px]',
                      border: 'border-b',
                      radius: 'rounded-none',
                      paddingX: 'px-0',
                    }"
                    class="-mt-[6px]"
                  >
                    <template #expand> <IconChevronRight class="w-[6px] rotate-90"></IconChevronRight> </template>
                    <template #checked> <IconCheck class="w-[10px]"></IconCheck> </template></RmSelect
                ></span>
                })
              </div>
            </SectionWrapper>
          </div>
        </div>
      </div>
    </div>
    <ToC :list="elements" :state="nowObserving"></ToC>
  </div>
</template>
