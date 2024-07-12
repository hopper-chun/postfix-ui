<script setup>
import { useFunctionRef } from '@/composables'
import { computed, ref } from 'vue'
const { functionRef, element } = useFunctionRef()

const emit = defineEmits(['update:modelValue'])
const local = ref('')

const open = (src) => {
  element.value.open()
  local.value = src
}

defineExpose({ open })

const cdnPath = computed(() => {
  return local.value || ''
})
</script>

<template>
  <PxDialog v-slot="{ closeDialog }" :ref="functionRef" @onClose="emit('update:modelValue', '')">
    <div class="px-imageDialog">
      <div class="SCROLLDESIGN px-imageDialog--wrapper">
        <div class="">
          <template v-if="cdnPath === ''">
            <div>올바른 주소가 아닙니다.</div>
          </template>
          <template v-else>
            <img :src="cdnPath" alt="" />
          </template>
        </div>
      </div>
      <div class="px-imageDialog--button">
        <PxButton color="gray" @click="closeDialog()">닫기</PxButton>
      </div>
    </div>
  </PxDialog>
</template>
