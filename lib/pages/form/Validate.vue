<script setup>
import { reactive, ref } from 'vue'
import { RmButton, RmSmIconButton } from '@/components/element/button'
import { RmInput, RmCheckbox, RmMultiCheckbox, RmFloatInput, RmRadio, RmSelect, RmTextarea, RmToggle } from '@/components'
import { IconApi } from '@/components/icon'
import ToC from '@/layout/ToC.vue'
import SectionWrapper from '@/components/layout/SectionWrapper.vue'
import origin from './seed.js'

import { useValidate, useError } from '@/composables'
// const { required, minLength } = useValidate.rule

// const {} = origin

// const options = ref({})

// const elements = ref({})
// const functionRefs = (label) => (el) => (elements.value[label] = el)

// const nowObserving = ref(null)
// const handleIntersection = (data) => {
//   nowObserving.value = data
// }

// const babo = {
//   test: (value) => {
//     console.log('value', value, value && value.startsWith('babo'))
//     return value && value.startsWith('babo')
//   },
//   error: `바보냐?`,
// }

// const local = ref({
//   userId: '',
//   password: '',
//   radio: [
//     { value: 'option1', label: '옵션 1' },
//     { value: 'option2', label: '옵션 2' },
//     { value: 'option3', label: '옵션 3' },
//   ],
//   radioValue: '',
//   selectValue: '',
//   checkboxValue: '동의하지 않습니다',
//   multiCheckboxValue: [''],
// })

// const people = [
//   {
//     id: 1,
//     name: 'Wade Cooper Wade Cooper Wade Cooper Wade Cooper Wade Cooper Wade Cooper Wade Cooper ',
//     username: '@wadecooper',
//   },
//   {
//     id: 2,
//     name: 'Arlene Mccoy',
//     username: '@arlenemccoy',
//   },
//   {
//     id: 3,
//     name: 'Devon Webb',
//     username: '@devonwebb',
//   },
// ]
// const rules = ref({
//   //   userId: [required, email],
//   password: [required, minLength(4)],
// })
// const validator = useValidate(rules, local)

// const { clearError } = useError()

// const submit = async () => {
//   clearError()
//   if (!validator.validate()) {
//     return
//   }
// }
</script>
<template>
  <div class="relative flex w-full">
    <!-- <div class="max-w-[950px] flex-1">
      <div class="font-bold text-slate-500">subMenu</div>
      <div class="mt-[8px] text-[32px] font-bold text-slate-700">Menu</div>
      <div class="mt-[16px] w-[800px] text-[16px] text-slate-700">about menu description.</div>
      <div class="mt-[60px]">
        <div class="space-y-[20px]">
          <div><button @click="submit" class="rounded-[8px] bg-slate-600 p-[6px] text-white">trigger</button></div>
          <div class="flex items-center space-x-[8px]">
            <RmInput id="userId" v-model="local.userId" label="user-id" :required="true" placeholder="basic input" class="w-full"></RmInput>
            <RmInput
              id="password"
              v-model="local.password"
              label="암호"
              helperText="헬퍼텍스트테스트"
              labelHelper="라벨헬퍼텍스트테스트"
              :required="true"
              placeholder="basic input"
              class="w-full"
            ></RmInput>
          </div>
          <div class="flex items-center space-x-[8px]">
            <RmCheckbox v-model="local.checkboxValue" :options="['동의하지 않습니다', '동의합니다']" id="password">{{ local.checkboxValue }}</RmCheckbox>
            <RmMultiCheckbox v-model="local.multiCheckboxValue" :options="['동의하지 않습니다', '동의합니다']" id="password"></RmMultiCheckbox>
          </div>
          <div class="flex items-center space-x-[8px]">
            <RmFloatInput label="라벨입니다" v-model="local.userId" id="password" class="w-full"></RmFloatInput>
            <RmRadio
              v-model="local.radioValue"
              :optionsLabel="(option) => option.label"
              :optionsValue="(option) => option.value"
              :options="local.radio"
              id="password"
              class="w-full"
            ></RmRadio>
          </div>
          <div class="flex items-center space-x-[8px]">
            <RmSelect
              :options="people"
              :optionsLabel="(option) => option.name"
              :optionsValue="(option) => option.id"
              v-model="local.selectValue"
              id="password"
              class="w-full"
            ></RmSelect>
            <RmTextarea v-model="local.userId" id="password" class="w-full"></RmTextarea>
          </div>
          <div class="flex items-center space-x-[8px]">
            <RmToggle id="password"> </RmToggle>
          </div>
          <div class="flex items-center space-x-[8px]"></div>
          <SectionWrapper label="Usage" :ref="functionRefs('Usage')" @onIntersection="handleIntersection">
            <template #contents></template>
          </SectionWrapper>
        </div>
      </div>
    </div>
    <ToC :list="elements" :state="nowObserving"></ToC> -->
  </div>
</template>
