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
      <RmDialog title="심플 뉴 모달" ref="simple">
        <template v-slot="{ closeDialog }">
          <div class="flex h-[200px] w-[600px] flex-col rounded-[12px] bg-white">
            <div class="flex flex-1 flex-col items-center justify-center">
              <div>헤더를 분리하기</div>
              <div>
                1. 다이얼로그 단에서 header 슬롯으로 뺀다. <br />
                2. 어떻게든 두 슬롯이 width 공유하게 한다 <br />
                3. border-radius랑 bg를 css 단에서 관리하고 오버플로우 잡아야 할듯
              </div>
            </div>
            <div class="mb-[20px] px-[20px]"><RmButton :isFull="true" @click="closeDialog">닫기</RmButton></div>
          </div>
        </template>
      </RmDialog>
    </div>
  </div>
</template>
