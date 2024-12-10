<script setup>
import { ref } from 'vue'

import { onClickOutside } from '@vueuse/core'

const props = defineProps({
  color: { type: String, default: 'black' },
  position: { type: String, default: 'center' },
})

const isInfoboxClick = ref(false)
const infoboxRef = ref(null)

onClickOutside(infoboxRef, (event) => {
  if (isInfoboxClick.value) {
    isInfoboxClick.value = false
  }
})

const handleClickInfobox = () => {
  isInfoboxClick.value = !isInfoboxClick.value
}
</script>
<template>
  <!-- 클릭하면 스피치 버블을 띄움 -->
  <!-- 스피치버블 + 아이콘 바깥 영역을 클릭하면 모달 꺼짐 -->

  <div ref="infoboxRef" class="px-infobox">
    <div class="px-infobox-icon-container" @click="handleClickInfobox">
      <slot name="icon">
        <PxIcon name="icon-question-mark-circle" class="px-infobox-icon"></PxIcon>
      </slot>
    </div>
    <PxSpeechBubble v-if="isInfoboxClick" :color="color" :position="position" class="px-infobox-bubble">
      <slot></slot>
    </PxSpeechBubble>
  </div>
</template>
