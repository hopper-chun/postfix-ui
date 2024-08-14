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
    enter-active-class=" px-tooltipDialog--enter-active"
    enter-from-class=" px-tooltipDialog--enter-from"
    enter-to-class=" px-tooltipDialog--enter-to"
    leave-active-class="px-tooltipDialog--leave-active"
    leave-from-class=" px-tooltipDialog--leave-from"
    leave-to-class=" px-tooltipDialog--leave-to"
  >
    <div v-if="isActive" ref="tootlipDialogRef" class="px-tooltipDailog">
      <div class="px-tooltipDailog--header">
        <div class="title">도움말</div>

        <PxIcon name="icon-close" class="close" @click="isActive = false"></PxIcon>
      </div>
      <div class="px-tooltipDailog--body" v-html="tooltip"></div>
    </div>
  </transition>
</template>

<style>
/* enter-active-class="transition-all duration-[500ms]"
    enter-from-class="sm:translate-x-[100%] mo:translate-y-[100%]"
    enter-to-class="sm:translate-x-[0%] mo:translate-y-[0%]"
    leave-active-class="transition-all duration-[500ms]"
    leave-from-class="sm:translate-x-[0%] mo:translate-y-[0%]"
    leave-to-class="sm:translate-x-[100%] mo:translate-y-[100%]" */

.px-tooltipDialog--enter-active,
.px-tooltipDialog--leave-active {
  transition: all 500ms;
}

@media screen and (min-width: 640px) {
  .px-tooltipDialog--enter-from {
    transform: translateX(100%);
  }
  .px-tooltipDialog--enter-to {
    transform: translateX(0%);
  }
  .px-tooltipDialog--leave-from {
    transform: translateX(0%);
  }
  .px-tooltipDialog--leave-to {
    transform: translateX(0%);
  }
}

@media screen and (max-width: 639px) {
  .px-tooltipDialog--enter-from {
    transform: translateY(100%);
  }
  .px-tooltipDialog--enter-to {
    transform: translateY(0%);
  }
  .px-tooltipDialog--leave-from {
    transform: translateY(0%);
  }
  .px-tooltipDialog--leave-to {
    transform: translateY(0%);
  }
}

.px-tooltipDailog {
  position: fixed;
  z-index: 50;
  background-color: white;
  padding: 20px;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  top: 0;
  right: 0;
  bottom: 0;
  width: 320px;
  border-left: 1px solid var(--px-border-input);
}

.px-tooltipDailog--header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 48px;
  border-bottom: 1px solid var(--px-border-input);
}

.px-tooltipDailog--header .title {
  font-size: 18px;
  font-weight: 700;
}

.px-tooltipDailog--header .close {
  height: 24px;
  width: 24px;
  cursor: pointer;
}

.px-tooltipDailog--body {
  overflow-y: auto;
  padding-top: 20px;
  font-size: 15px;
}

@media screen and (max-width: 639px) {
  .px-tooltipDailog {
    top: auto;
    left: 0;
    bottom: auto;
    width: 100%;
    border-left: none;
    border-top: 1px solid var(--px-border-input);
    height: 400px;
  }
}
</style>
