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

const handleSubmit = () => {
  promise.resolve(true)
  element.value.close()
}

const handleCancel = () => {
  promise.resolve(false)
  element.value.close()
}

const onClose = () => {
  promise.resolve(false)
}

defineExpose({ openDialog })
</script>

<template>
  <div class="px-dialogConfirm">
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
              <div @click="handleCancel">
                <slot name="no">
                  <PxButton isWide color="pri_border"> 아니오 </PxButton>
                </slot>
              </div>
              <div @click="handleSubmit">
                <slot name="yes">
                  <PxButton isWide color="pri"> 예 </PxButton>
                </slot>
              </div>
            </div>
          </slot>
        </div>
      </div>
    </PxDialog>
  </div>
</template>
