<script setup>
import { ref } from 'vue'
import { RmInput } from '@/components/form/input'
import RmButton from '@/components/element/button/RmButton.vue'
import RmDialog from '../RmDialog.vue'

const props = defineProps({
  items: { type: (Array, Object) },
})
const local = ref({
  item: '',
})
const common = ref('')

const emits = defineEmits(['update:modelValue'])
const handleOpen = () => {
  common.value.open()
  local.value.item = props.items.item
}
const handleClose = (closeDialog) => {
  emits('update:modelValue', local.value.item)
  closeDialog()
}
</script>

<template>
  <div>
    <div class="w-[100px]"><RmButton :isFull="true" @click="handleOpen" color="secondary">Common</RmButton></div>
    <div>
      <RmDialog ref="common">
        <template v-slot="{ closeDialog }">
          <div class="bg-white flex flex-col w-[600px] rounded-[12px] h-[300px]">
            <div class="flex-1 flex items-center justify-center">
              <div>
                <RmInput v-model="local.item"></RmInput>
              </div>
            </div>
            <div class="px-[20px] mb-[20px] space-x-[20px] flex items-center">
              <RmButton :isFull="true" @click="handleClose(closeDialog)" color="secondary">저장</RmButton
              ><RmButton :isFull="true" color="gray" @click="closeDialog">닫기</RmButton>
            </div>
          </div>
        </template>
      </RmDialog>
    </div>
  </div>
</template>
