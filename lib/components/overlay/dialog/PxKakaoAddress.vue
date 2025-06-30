<script setup>
import { ref } from 'vue'
import { useScriptTag } from '@vueuse/core'

const props = defineProps({
  hasLabel: { type: Boolean },
})

const isLoaded = ref(false)

const { load, unload, scriptTag } = useScriptTag(
  'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js',
  () => {
    isLoaded.value = true
  },
  {
    manual: true,
    attrs: {
      id: 'daum-postcode-script',
    },
  }
)

const emit = defineEmits(['onSubmit'])

const handleOpenDialog = async () => {
  if (!scriptTag.value) {
    await load()
  }

  if (!window.daum?.Postcode) {
    alert('주소 검색 API가 아직 로드되지 않았습니다.')
    return
  }

  new window.daum.Postcode({
    oncomplete(data) {
      emit('onSubmit', data)
    },

    onclose() {
      // 사용자가 닫았을 때도 제거
      unload()
      isLoaded.value = false
    },
  }).open()
}

defineExpose({ open: handleOpenDialog })
</script>
<template>
  <div @click="handleOpenDialog" class="inline-block">
    <slot>
      <PxButton :hasLabel color="gray_border">주소 검색</PxButton>
    </slot>
  </div>
</template>
