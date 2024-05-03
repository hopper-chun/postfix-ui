<script setup>
import { onMounted, computed, ref, useSlots } from 'vue'
import { useFunctionRef, useTheme } from '@/composables'
import { useElementBounding } from '@vueuse/core'
import { useIntersectionObserver } from '@vueuse/core'

const props = defineProps({
  label: {
    type: String,
  },
  codeOnly: {
    type: Boolean,
  },
  contentsOnly: {
    type: Boolean,
  },
  code: {
    type: String,
  },
})
const emit = defineEmits(['onIntersection'])

const { functionRef, element } = useFunctionRef()
const theme = useTheme(computed(() => {}))
const viewCode = ref(false)

const slots = useSlots()
const { top } = useElementBounding(element)

const copyMessage = ref(false)

const hasNotContentSlot = computed(() => {
  return !slots.contents
})
const handleClick = () => {
  viewCode.value = !viewCode.value
}

const handleCopy = () => {
  window.navigator.clipboard.writeText(props.code)
  copyMessage.value = true
  const messageTiming = setTimeout(() => {
    copyMessage.value = false
  }, 1000)
  console.log('copy click')
}

const isCodeOnly = () => {
  if (props.codeOnly) {
    viewCode.value = true
  }
}
const codeContent = `${props.code}`
isCodeOnly()
const goto = () => {
  window.scrollTo({ top: window.scrollY + top.value - 120, behavior: 'smooth' })
}
defineExpose({ goto })

useIntersectionObserver(
  element,
  ([{ isIntersecting }], observerElement) => {
    if (isIntersecting) {
      emit('onIntersection', props.label)
    }
  },
  { rootMargin: '56px 0px -70% 0px' }
)
</script>

<template>
  <div :ref="functionRef">
    <div class="tocList mb-[16px] text-[24px] font-bold text-slate-600">{{ label }}</div>
    <div class="text-[15px] leading-[28px] text-slate-700" ref="contents" :class="{ 'mb-[16px]': hasNotContentSlot }">
      <slot name="contents"> </slot>
    </div>
    <div class="flex flex-col rounded-[16px] border border-slate-200" :class="{ 'mt-[16px]': !hasNotContentSlot }">
      <div
        class="flex h-[40px] w-full items-center justify-end space-x-[4px] border-b border-slate-200 px-[40px]"
        :class="{ hidden: codeOnly || contentsOnly }"
      >
        <button
          class="flex h-[26px] w-[26px] items-center justify-center space-x-[4px] rounded-[8px] text-[12px] transition duration-300"
          :class="viewCode ? `${theme.primary.bg} font-bold  text-white` : 'text-slate-600  hover:bg-[#E6F6FF]'"
          @click="handleClick"
        >
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-[16px] w-[16px]">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
            </svg>
          </div>
        </button>
        <div class="relative">
          <button
            class="flex h-[26px] w-[26px] items-center justify-center space-x-[4px] rounded-[8px] text-[12px] text-slate-600 transition duration-300 hover:bg-[#E6F6FF]"
            @click="handleCopy"
          >
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-[16px] w-[16px]">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
                />
              </svg>
            </div>
          </button>
          <div v-if="copyMessage" class="absolute bottom-[calc(100%+3px)] right-[50%] flex translate-x-[50%] flex-nowrap justify-center">
            <div class="relative z-10 flex h-[24px] w-[70px] items-center justify-center rounded-[16px] bg-slate-700 text-[14px] text-white">copied</div>
            <div class="absolute -bottom-[2px] h-[10px] w-[10px] rotate-45 bg-slate-700"></div>
          </div>
        </div>
      </div>

      <div class="px-[40px] py-[20px]" :class="[viewCode ? 'bg-[#1C1B1B]' : '', codeOnly ? ' rounded-[16px]' : ' rounded-b-[16px]']">
        <div v-if="!viewCode">
          <slot></slot>
        </div>
        <div v-else class="text-[14px]">
          <highlightjs language="xml" :code="codeContent"> </highlightjs>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.hljs {
  white-space: pre-wrap;
}
</style>
