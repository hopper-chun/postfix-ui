<script setup>
import { ref } from 'vue'
import Test from './Test.vue'

const headers = [
  { field: 'AA', label: 'CLIENT_ID', PX_SPAN: [{ rowspan: 2 }, { skip: true }] },
  { field: 'sendSMS', label: 'SMS 발송', PX_SPAN: [{ colspan: 2, label: 'SMS' }, {}] },
  { field: 'succSMS', label: 'SMS 성공', PX_SPAN: [{ skip: true }, {}] },
  { field: 'failSMS', label: 'SMS 실패', PX_SPAN: [{ colspan: 2, label: 'LMS' }, {}] },
  { field: 'sendLMS', label: 'LMS 발송', PX_SPAN: [{ skip: true }, {}] },
]

const rows = []
const aaa = ref([])
const string = ref('')
</script>

<template>
  <div class_="w-[400px] h-[400px] bg-red-500">
    <div class="p-[200px] relative">
      <PxTipTapEditor v-model="string"></PxTipTapEditor>
      <div v-html="string" class="whitespace-pre-wrap"></div>
    </div>
    <div></div>
    <!-- <PxTable :headers="headers" :checkboxes="[]" :spanHeaders="spanHeaders" :rows="rows"></PxTable> -->
    <!-- <PxButton> Hello World</PxButton> -->

    <!-- <component :is="Test" v-on:onClick2="handle"></component> -->
  </div>
</template>
