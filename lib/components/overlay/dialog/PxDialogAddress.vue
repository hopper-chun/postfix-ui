<script setup>
import { axiosInstance } from '@'
import { ref, reactive } from 'vue'
import { useFunctionRef, useError } from '@/composables'

const emit = defineEmits(['onClose'])

const { error, clearError, setError, causeError } = useError()
const { element, functionRef } = useFunctionRef()

const local = reactive({
  limit: 30,
  keyword: '',
  currentPage: 1,
  count: 0,
  rows: [],
})

const handleOpenDialog = () => {
  local.keyword = ''
  local.currentPage = 1
  local.count = 0
  local.rows = []
  element.value.open()
}

const onChangePage = (page) => {
  local.currentPage = page

  search()
}

const submit = async () => {
  local.currentPage = 1
  await search()
}

const search = async () => {
  clearError()
  try {
    if (local.keyword === '' || local.keyword.length < 2) {
      causeError({ id: 'keyword', msg: '검색어를 입력해 주세요' })
      return
    }
    const params = { keyword: local.keyword, limit: local.limit }
    if (local.currentPage > 1) {
      params.page = local.currentPage
    }
    const res = await axiosInstance.get(`/api/v1/addrs`, { params })

    local.count = res.data.count
    local.rows = res.data.rows
  } catch (ex) {
    setError(ex)
  }
}

const handleAppendAddr = (closeDialog, value) => {
  const payload = {
    doro: value.roadAddr,
    zip: value.zipNo,
  }
  emit('onClose', payload)
  closeDialog()
}
</script>
<template>
  <div class="px-dialog-address">
    <div @click="handleOpenDialog">
      <slot>
        <PxButton color="gray_border">주소검색</PxButton>
      </slot>
    </div>
    <PxDialog title="주소검색" :ref="functionRef" v-slot="{ closeDialog }">
      <div>
        <div class="px-dialog--contents">
          <form @submit.prevent="submit" class="px-addressDialog">
            <div class="px-addressDialog--helper">동 이름(읍/면/리) 또는 도로명을 입력해 주세요.</div>

            <PxInput class="px-addressDialog--input" id="keyword" placeholder="예) 반포대로 58, 분당 주공, 삼평동 629" v-model="local.keyword"></PxInput>
            <div class="px-addressDialog--helper2">예) 도로명(반포대로 58), 건물명(국립중앙박물관), 지번(삼평동 629)</div>
            <div class="px-addressDialog--result">
              <div v-if="local.rows.length === 0" class="empty">검색 결과가 없습니다.</div>
              <div v-for="row in local.rows" :key="row" class="list" @click="handleAppendAddr(closeDialog, row)">
                <p>도로명: {{ row.roadAddr }}</p>
                <p>지번: {{ row.jibunAddr }}</p>
                <p>우편번호 {{ row.zipNo }}</p>
              </div>
            </div>

            <div class="px-addressDialog--pagination">
              <PxPagination
                class=""
                :limit="local.limit"
                :currentPage="local.currentPage"
                :total="local.count"
                :count="local.rows.length"
                @onChangePage="onChangePage"
              ></PxPagination>
            </div>
            <div class="px-addressDialog--search">
              <PxButton color="black" size="lg" type="submit">주소 검색 </PxButton>
            </div>
          </form>
        </div>
      </div>
    </PxDialog>
  </div>
</template>
