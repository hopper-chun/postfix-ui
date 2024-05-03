<script setup>
import { ref } from 'vue'
import RmButton from '@/components/element/button/RmButton.vue'
import RmDialog from '../RmDialog.vue'

const simple = ref('')

const handleOpen = () => {
  simple.value.open()
}
</script>
<template>
  <div>
    <div class="w-[100px]"><RmButton :isFull="true" @click="handleOpen">Simple</RmButton></div>
    <div>
      <RmDialog ref="simple">
        <template #header></template>
        <template v-slot="{ closeDialog }">
          <div class="flex h-[200px] w-[600px] flex-col rounded-[12px] bg-white">
            <div class="flex flex-1 items-center justify-center">
              <div>심플 모달</div>
            </div>
            <div class="mb-[20px] px-[20px]"><RmButton :isFull="true" @click="closeDialog">닫기</RmButton></div>
          </div>
        </template>
      </RmDialog>
    </div>
  </div>
</template>
