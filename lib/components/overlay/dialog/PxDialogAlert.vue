<script setup>
import { ref } from 'vue'
import { useFunctionRef, useError } from '@/composables'

const props = defineProps({
  size: { type: String, default: 'sm' },
})

const { clearError } = useError()
const { element, functionRef } = useFunctionRef()

const message = ref('')
const promise = {
  resolve: null,
  reject: null,
}

const openDialog = (msg) => {
  clearError()

  message.value = msg
  promise.resolve = null
  promise.reject = null

  element.value.open()

  return new Promise((resolve, reject) => {
    promise.resolve = resolve
    promise.reject = reject
  })
}

const handleClose = () => {
  promise.resolve(true)
  element.value.close()
}

const onClose = () => {
  promise.resolve(false)
}

defineExpose({ openDialog })
</script>

<template>
  <div class="px-dialogAlert">
    <div @click="openDialog">
      <slot name="button"></slot>
    </div>
    <PxDialog :size="size" :ref="functionRef" @onClose="onClose">
      <div>
        <div class="SCROLLDESIGN px-dialog--contents">
          <slot name="message">
            <div>{{ message }}</div>
          </slot>
        </div>
        <div>
          <slot name="buttons">
            <div class="px-dialog--buttons">
              <div @click="handleClose">
                <slot name="close">
                  <PxButton isWide color="pri_border"> 닫기 </PxButton>
                </slot>
              </div>
            </div>
          </slot>
        </div>
      </div>
    </PxDialog>
  </div>
</template>
