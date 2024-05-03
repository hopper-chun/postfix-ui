<script setup>
import { reactive, ref } from 'vue'
import { IconCheck } from '@/components/icon'
import { RmTextarea, RmFloatTextarea } from '@/components/form/textarea'
import { RmInput, RmDividedInput } from '@/components/form/input'
import { RmDividedSelect } from '@/components/form/select'
import { useTheme } from '@/composables'
import ToC from '@/layout/ToC.vue'
import origin from './seed'
import SectionWrapper from '@/components/layout/SectionWrapper.vue'

const { textarea } = origin
const theme = useTheme()
const inputValue = ref('text')
const options = ref({
  id: 'select_01',
  label: 'label',
  type: '',
  optionValue: '1234',
  disabled: false,
  placeholder: 'choose options and input text',
  required: false,
  labelHelper: '',
  helperText: '1234',
  helperIcon: false,
  maxLength: null,
  styles: null,
  resize: false,
  autoGrow: false,
  horizontal: true,
  labelWidth: 140,
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
const styleList = reactive({
  fontSize: '',
  textColor: '',
  paddingX: '',
  radius: '',
  bgColor: '',
  borderColor: '',
  border: '',
  // labelWidth: '',
  textarea_height: '',
  textarea_paddingY: '',
  label_fontSize: '',
  label_fontColor: '',
})

const styleOptionList = reactive({
  fontSize: ['text-[14px]', 'text-[16px]', 'text-[20px]', 'text-[28px]'],
  textColor: ['text-black', 'text-red-600', theme.value.primary.text],
  paddingX: ['px-[12px]', 'px-[16px]', 'px-[20px]'],
  radius: ['rounded-none', 'rounded-[8px]', 'rounded-[12px]'],
  bgColor: ['bg-white', 'bg-gray-100', 'bg-red-100'],
  borderColor: ['border-gray-300', 'border-red-300', theme.value.primary.border],
  border: ['border', 'border-b', 'border-y'],
  // labelWidth: ['null', '100', '150'],
  label_fontSize: ['text-[14px]', 'text-[16px]', 'text-[20px] font-bold'],
  label_fontColor: ['text-black', 'text-red-700', 'text-[#0085FF]'],
  textarea_height: ['h-[100px]', 'h-[200px]', 'h-[300px]'],
  textarea_paddingY: ['py-[4px]', 'py-[8px]', 'py-[12px]'],
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
      <div class="mt-[8px] text-[32px] font-bold text-slate-700">Textarea</div>
      <div class="mt-[16px] w-[800px] text-[16px] text-slate-700">about menu description.</div>
      <div></div>
      <div class="mt-[60px]">
        <div class="space-y-[80px]">
          <div>
            <SectionWrapper label="Usage" :ref="functionRefs('Usage')" @onIntersection="handleIntersection">
              <template #contents>
                <div>텍스트에어리어는 autoGrow를 통해 가변성을 가진다. 일반적인 height값 대신 텍스트에어리어만의 height값을 스타일로 가지고 있다.</div>
              </template>
              <div class="flex justify-center space-x-[8px] border-b pb-[20px]">
                <button
                  v-for="i in ['disabled', 'required', 'helperIcon', 'resize', 'autoGrow']"
                  class="flex h-[32px] items-center justify-center rounded-[8px] border px-[8px] text-[14px]"
                  :class="options[i] ? `${theme.primary.bg} text-white` : ''"
                  @click="handleButton(i)"
                >
                  {{ i }}
                </button>
              </div>
              <div>
                <div class="my-[20px] flex">
                  <div class="flex flex-1 items-center justify-center px-[20px]">
                    <div class="w-[360px]">
                      <RmTextarea
                        :label="options.label"
                        :id="options.id"
                        :required="options.required"
                        :disabled="options.disabled"
                        :labelHelper="options.labelHelper"
                        :helperText="options.helperText"
                        :helperIcon="options.helperIcon"
                        v-model="inputValue"
                        :maxlength="options.maxLength"
                        :resize="options.resize"
                        :autoGrow="options.autoGrow"
                        :styles="{
                          fontSize: styleList.fontSize,
                          text: { color: styleList.textColor },
                          paddingX: styleList.paddingX,
                          radius: styleList.radius,
                          bgColor: styleList.bgColor,
                          borderColor: styleList.borderColor,
                          border: styleList.border,
                          textarea_height: styleList.textarea_height,
                          textarea_paddingY: styleList.textarea_paddingY,
                          label_fontSize: styleList.label_fontSize,
                          label_fontColor: styleList.label_fontColor,
                        }"
                      >
                        <template #helperIcon> <IconCheck class="w-[12px] text-gray-400"></IconCheck></template>
                      </RmTextarea>
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
                      <div v-for="i in ['label', 'labelHelper', 'helperText', 'maxLength']">
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
                      <div v-for="(value, key) in styleOptionList">
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
              </div>
            </SectionWrapper>
          </div>
        </div>
      </div>
    </div>
    <ToC :list="elements" :state="nowObserving"></ToC>
  </div>
</template>
