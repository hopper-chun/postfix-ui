<script setup>
import { reactive, ref } from 'vue'
import { RmToggle, RmCustomToggle, RmToggleWithLeftDeco, RmToggleWithLeftLabel, RmToggleWithRightLabel } from '@/components/form/toggle'
import { RmButton } from '@/components/element/button'
import { IconCheck } from '@/components/icon'
import { useError } from '@/composables'
import origin from './seed'
import ToC from '@/layout/ToC.vue'
import SectionWrapper from '@/components/layout/SectionWrapper.vue'

const { clearError, causeError } = useError()
const { toggle } = origin

const toggleOptions = ref({
  toggleValue: false,
  toggleLabel: '거짓',
  disabled: false,
  isSmall: false,
})

const elements = ref({})
const functionRefs = (label) => (el) => {
  elements.value[label] = el
}
const nowObserving = ref(null)
const handleIntersection = (data) => {
  nowObserving.value = data
}

const onClick = () => {
  causeError({ id: 'tg-01', msg: 'Your password must be less than 4 characters.' })
}
clearError()
</script>
<template>
  <div class="relative flex w-full">
    <div class="flex-1">
      <div class="font-bold text-slate-500">Form</div>
      <div class="mt-[8px] text-[32px] font-bold text-slate-700">Toggle</div>
      <div class="mt-[16px] w-[800px] text-[16px] text-slate-700">about menu description.</div>
      <div class="mt-[60px]">
        <div class="space-y-[80px]">
          <div>
            <SectionWrapper label="Usage" :ref="functionRefs('Usage')" @onIntersection="handleIntersection">
              <template #contents>
                <div>
                  토글엔 두가지 프로퍼티가 있다. disabled와 isSmall이 그것이며, 각각 비활성화와 toggle의 크기 대안이다. <br />
                  v-model에 boolean이 아니라 각 value에 원하는 값을 매칭시키고 싶다면, options를 이용할 수 있다. <br />
                  <code>:options="['거짓', '참']"</code> 을 통해 v-model에 들어올 값을 지정할 수 있다.
                </div>
              </template>
              <div class="flex items-center justify-center space-x-[40px]">
                <RmToggle :isSmall="true" v-model="toggleOptions.toggleValue"></RmToggle>
                <RmToggle v-model="toggleOptions.toggleValue"></RmToggle>
                <div class="flex space-x-[12px]">
                  <RmToggle :options="['거짓', '참']" v-model="toggleOptions.toggleLabel"></RmToggle>
                  <span class="text-[14px]">{{ toggleOptions.toggleLabel }}</span>
                </div>
                <div>
                  <RmCustomToggle
                    classes="w-[100px] h-[30px] p-[3px]"
                    innerClasses="w-[24px] h-[24px] bg-white"
                    activeClasses="bg-red-600"
                    v-model="toggleOptions.toggleValue"
                  ></RmCustomToggle>
                </div>
                <div>
                  <RmCustomToggle
                    disabled
                    classes="w-[100px] h-[30px] p-[3px]"
                    innerClasses="w-[24px] h-[24px] bg-white"
                    activeClasses="bg-red-600"
                    v-model="toggleOptions.toggleValue"
                  ></RmCustomToggle>
                </div>
              </div>
            </SectionWrapper>
          </div>
          <div>
            <SectionWrapper label="Error" :code="toggle.RmToggleWithLeftDeco" :ref="functionRefs('Error')" @onIntersection="handleIntersection">
              <template #contents> RmToggle With Decoration </template>
              <div class="flex justify-center">
                <div>
                  <RmToggle id="tg-01" v-model="toggleOptions.toggleValue"></RmToggle>
                </div>
                <RmButton @click="onClick">버튼</RmButton>
              </div>
            </SectionWrapper>
          </div>
          <div>
            <SectionWrapper label="Example" :code="toggle.RmToggleWithLeftDeco" :ref="functionRefs('Example')" @onIntersection="handleIntersection">
              <template #contents> RmToggle With Decoration </template>
              <div class="flex justify-center">
                <div class="w-[360px]">
                  <RmToggleWithLeftDeco
                    id="tg-01"
                    v-model="toggleOptions.toggleValue"
                    label="RmToggleWithLeftDeco"
                    description="description"
                    :question="true"
                    hover="hoverText"
                  ></RmToggleWithLeftDeco>
                </div>
              </div>
            </SectionWrapper>
          </div>
          <div>
            <SectionWrapper :code="toggle.RmToggleWithLeftLabel">
              <template #contents> RmToggle With input design </template>
              <div class="flex justify-center">
                <div class="w-[360px]">
                  <RmToggleWithLeftLabel
                    id="tg-01"
                    v-model="toggleOptions.toggleValue"
                    label="RmToggle With input design"
                    description="description"
                    helperText="this is not input but toggle but has label and helperTexts and required"
                    :helperIcon="true"
                    labelHelper="this is labelHelper"
                    :required="true"
                  >
                    <template #helperIcon> <IconCheck class="w-[12px]"> </IconCheck> </template
                  ></RmToggleWithLeftLabel>
                </div>
              </div>
            </SectionWrapper>
          </div>
          <div>
            <SectionWrapper :code="toggle.RmToggleWithRightLabel">
              <template #contents> RmToggle With label </template>
              <div class="flex justify-center">
                <RmToggleWithRightLabel
                  id="tg-01"
                  v-model="toggleOptions.toggleValue"
                  label="RmToggle With label"
                  description="description"
                ></RmToggleWithRightLabel>
              </div>
            </SectionWrapper>
          </div>
        </div>
      </div>
    </div>
    <ToC :list="elements" :state="nowObserving"></ToC>
  </div>
</template>
