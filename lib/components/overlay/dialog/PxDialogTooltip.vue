<script setup>
import { ref, computed } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { useTooltipDialog } from '@/composables'
import { marked } from 'marked'

const tootlipDialogRef = ref(null)
const { isActive, tooltip } = useTooltipDialog()
onClickOutside(tootlipDialogRef, () => (isActive.value = false))

const compiledMarkdown = computed(() => marked.parse(tooltip.value))

marked.setOptions({
  sanitize: false, // HTML 태그 렌더링 허용
  headerIds: false, // 헤더 ID 생성 방지 (선택사항)
})
</script>

<!-- 툴팁을 클릭하면 툴팁의 내용이 다이얼로그로 감 -->

<template>
  <transition
    enter-active-class="px-tooltipDialog--enter-active"
    enter-from-class="px-tooltipDialog--enter-from"
    enter-to-class="px-tooltipDialog--enter-to"
    leave-active-class="px-tooltipDialog--leave-active"
    leave-from-class="px-tooltipDialog--leave-from"
    leave-to-class="px-tooltipDialog--leave-to"
  >
    <div v-if="isActive" ref="tootlipDialogRef" class="px-tooltipDailog">
      <div class="px-tooltipDailog--header">
        <div class="title">도움말</div>

        <PxIcon name="icon-close" class="close" @click="isActive = false"></PxIcon>
      </div>
      <div class="px-tooltipDailog--body" v-html="compiledMarkdown"></div>
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
    transform: translateX(100%);
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
    transform: translateY(100%);
  }
}

.px-tooltipDailog {
  position: fixed;
  z-index: 50;
  background-color: white;
  padding-top: 20px;
  box-shadow:
    0 10px 15px -3px rgb(0 0 0 / 0.1),
    0 4px 6px -4px rgb(0 0 0 / 0.1);
  top: 0;
  right: 0;
  bottom: 0;
  width: 380px;
  border-left: 1px solid var(--px-border-input);
  word-break: keep-all;
}

.px-tooltipDailog--header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 48px;
  padding: 0 20px;
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
  padding: 20px 20px;

  font-size: 14px;
  max-height: calc(100vh - 80px);
}

@media screen and (max-width: 639px) {
  .px-tooltipDailog {
    top: auto;
    left: 0;
    bottom: 0;
    width: 100%;
    border-left: none;
    border-top: 1px solid var(--px-border-input);
    height: 400px;
  }

  .px-tooltipDailog--body {
    max-height: auto;
  }
}
</style>
