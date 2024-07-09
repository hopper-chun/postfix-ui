const notification = [{ id: 'simple', desc: 'this is simple message.' }]

const dialog = {
  simple: `
<script setup>
import { ref } from 'vue'
import PxButton from '@/components/element/button/PxButton.vue'
import RmDialog from '../RmDialog.vue'

const simple = ref('')

const handleOpen = () => {
  simple.value.open()
}
</script>
<template>
  <div>
    <div class="w-[100px]">
      <PxButton :isFull="true" @click="handleOpen">Simple</PxButton>
    </div>
    <div>
      <RmDialog ref="simple">
        <template v-slot="{ closeDialog }">
          <div class="bg-white flex flex-col w-[600px] rounded-[12px] h-[200px]">
            <div class="flex-1 flex items-center justify-center">
              <div>심플 모달</div>
            </div>
            <div class="px-[20px] mb-[20px]">
              <PxButton :isFull="true" @click="closeDialog">닫기</PxButton>
            </div>
          </div>
        </template>
      </RmDialog>
    </div>
  </div>
</template>`,
  common: `
<script setup>
import { ref } from 'vue'
import { RmInput } from '@/components/form/input'
import PxButton from '@/components/element/button/PxButton.vue'
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
    <div class="w-[100px]">
      <PxButton :isFull="true" @click="handleOpen" color="secondary">Common</PxButton>
    </div>
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
              <PxButton :isFull="true" @click="handleClose(closeDialog)" color="secondary">저장</PxButton>
              <PxButton :isFull="true" color="gray" @click="closeDialog">닫기</PxButton>
            </div>
          </div>
        </template>
      </RmDialog>
    </div>
  </div>
</template>
`,
}

const accordion = {}

export default { notification, dialog, accordion }
