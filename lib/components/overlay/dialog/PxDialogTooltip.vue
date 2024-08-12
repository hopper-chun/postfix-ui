<script setup>
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { useTooltipDialog } from '@/composables'

const tootlipDialogRef = ref(null)
const { isActive, tooltip } = useTooltipDialog()
onClickOutside(tootlipDialogRef, () => (isActive.value = false))
</script>
<!-- 툴팁을 클릭하면 툴팁의 내용이 다이얼로그로 감 -->

<template>
  <transition
    enter-active-class="transition-all duration-[500ms]"
    enter-from-class="sm:translate-x-[100%] mo:translate-y-[100%]"
    enter-to-class="sm:translate-x-[0%] mo:translate-y-[0%]"
    leave-active-class="transition-all duration-[500ms]"
    leave-from-class="sm:translate-x-[0%] mo:translate-y-[0%]"
    leave-to-class="sm:translate-x-[100%] mo:translate-y-[100%]"
  >
    <div
      v-if="isActive"
      ref="tootlipDialogRef"
      class="fixed z-50 bg-white p-[20px] shadow-lg sm:inset-y-0 sm:right-0 sm:w-[320px] sm:border-l mo:inset-x-0 mo:bottom-0 mo:h-[400px] mo:border-t"
    >
      <div class="flex h-[48px] items-center justify-between border-b">
        <div class="text-[18px] font-bold">도움말</div>

        <PxIcon name="icon-close" class="h-[24px] w-[24px] cursor-pointer" @click="isActive = false"></PxIcon>
      </div>
      <div class="overflow-y-auto pt-[20px] text-[15px]" v-html="tooltip"></div>
    </div>
  </transition>
</template>
