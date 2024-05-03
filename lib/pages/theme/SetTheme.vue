<script setup>
import { ref, watchEffect, computed } from 'vue'
import { RmInput, RmFloatInput } from '@/components/form/input'
import { RmSelect } from '@/components/form/select'
import { useThemeDefault, useTheme } from '@/composables'

const theme = useTheme(computed(() => {}))
const currentStage = ref('all')
const localValue = ref({
  input: 'TExt 믐믐믐',
  select: '',
})
const settings = ref({
  default: {
    fontSize: '',
    textColor: '',
    paddingX: '',
    height: '',
    radius: '',
    bgColor: '',
    borderColor: '',
    border: '',
  },
  select: {
    select_paddingY: '',
    select_optionFontSize: '',
    select_optionHover: '',
    select_optionSelected: '',
    select_optionBorder: '',
    select_maxHeight: '',
    select_marginTop: '',
  },
})
const defaultSettings = {
  fontSize: 'text-[14px]',
  textColor: 'text-black',
  paddingX: 'px-[16px]',
  height: 'h-[48px]',
  radius: 'rounded-[8px]',
  bgColor: 'bg-white',
  borderColor: 'border-gray-300',
  border: 'border',
  select_paddingY: 'py-[8px]',
  select_optionFontSize: 'text-[14px]',
  select_optionHover: `hover:bg-[#E6F6FF] hover:${theme.value.primary.text}`,
  select_optionSelected: `${theme.value.primary.bg} text-white`,
  select_optionBorder: 'border',
  select_maxHeight: 'max-h-[300px]',
  select_marginTop: 'mt-[4px]',
}
const { setTheme } = useThemeDefault()
watchEffect(() => {
  for (const mainProp in settings.value) {
    for (const prop in settings.value[mainProp]) {
      if (settings.value[mainProp][prop] === '') {
        settings.value[mainProp][prop] = defaultSettings[prop]
      }
    }
  }
  setTheme({
    fontSize: settings.value.default.fontSize,
    text: { color: settings.value.default.textcolor },
    paddingX: settings.value.default.paddingX,
    height: settings.value.default.height,
    radius: settings.value.default.radius,
    bgColor: settings.value.default.bgColor,
    borderColor: settings.value.default.borderColor,
    border: settings.value.default.border,
    select_paddingY: settings.value.select.select_paddingY,
    select_optionFontSize: settings.value.select.select_optionFontSize,
    select_optionHover: settings.value.select.select_optionHover,
    select_optionSelected: settings.value.select.select_optionSelected,
    select_optionBorder: settings.value.select.select_optionBorder,
    select_maxHeight: settings.value.select.select_maxHeight,
    select_marginTop: settings.value.select.select_marginTop,
  })
})

const result = () => {
  const results = {}
  for (const prop in settings.value) {
    if (settings.value[prop] !== defaultSettings[prop]) {
      results[prop] = settings.value[prop]
    }
  }
}

// 다녀와서 카피 테스트해보고 기능별로 버튼 만들어서 넣어놓기
</script>
<template>
  <div class="relative flex-1">
    <div class="flex items-center space-x-[8px]">
      <button
        type="button"
        v-for="stage in ['all', 'input', 'select']"
        @click="currentStage = stage"
        class="flex h-[36px] items-center justify-center rounded-[8px] border px-[8px] text-[14px]"
      >
        {{ stage }}
      </button>
    </div>
    <div class="mt-[20px] flex">
      <div class="w-[350px] space-y-[8px]">
        <template v-if="currentStage === 'input' || currentStage === 'all'">
          <div><RmInput v-model="localValue.input"></RmInput></div>
          <div><RmFloatInput label="inputTest" v-model="localValue.input"></RmFloatInput></div>
        </template>
        <template v-if="currentStage === 'select' || currentStage === 'all'">
          <div><RmSelect v-model="localValue.select" :options="['a', 'b']"></RmSelect></div>
        </template>
      </div>
      <div class="absolute top-0 right-0 overflow-y-scroll pb-[100px]">
        <div class="flex space-x-[8px]">
          <div class="space-y-[8px]">
            <div v-for="(i, s) in settings.default">
              <div class="text-[14px]">{{ s }}</div>
              <input
                type="text"
                class="h-[36px] w-[250px] rounded-[4px] border px-[4px] text-[14px]"
                :placeholder="defaultSettings[s]"
                v-model="settings.default[s]"
              />
            </div>
          </div>
          <div>
            <div v-for="(mainValue, mainKey) in settings" class="space-y-[8px]">
              <div
                v-for="(value, key) in settings[mainKey]"
                :class="[currentStage === mainKey || currentStage === 'all' ? '' : 'hidden', mainKey === 'default' ? 'hidden' : '']"
              >
                <div class="text-[14px]">{{ key }}</div>
                <input
                  type="text"
                  class="h-[36px] w-[250px] rounded-[4px] border px-[4px] text-[14px]"
                  :placeholder="defaultSettings[key]"
                  v-model="settings[mainKey][key]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
