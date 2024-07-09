<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { PxButton, RmSmIconButton } from '@/components/element/button'
import { RmDividedSelect, RmAdminTableSelect } from '@/components/form/select'
import { RmAdminTable } from '@/components/list/adminTable'
import { IconApi } from '@/components/icon'
import { RmSearchSelectInputs, RmSearchDuration } from '@/components/list/adminTable/search'
import RmAdminFormWrapper from '@/components/layout/RmAdminFormWrapper.vue'
import RmAdminFormWrapperRow from '@/components/layout/RmAdminFormWrapperRow.vue'
import ToC from '@/layout/ToC.vue'
import SectionWrapper from '@/components/layout/SectionWrapper.vue'
import origin from './seed.js'
import _ from 'lodash'
import useSearchOrder from '@/composables/useSearchOrder'
import useSearchPagination from '@/composables/useSearchPagination'
import useSearchFilter from '@/composables/useSearchFilter'
import useTableConfig from '@/composables/useTableConfig'

const { adminTable } = origin

const storageId = 'SIMPLE_TABLE_V1'

const dateOptions = [
  { key: 'createDate', label: '상품등록일' },
  // { key: 'updateDate', label: '상품최종수정일' },
]

const filterTypes = [
  { key: 'productName', title: '상품명', group: 'product' },
  { key: 'productSeq', title: '상품번호', group: 'product' },
  { key: 'productCode', title: '자체상품코드', group: 'product' },
  { key: 'dateType', title: '등록일종류', group: 'date' },
  { key: 'dateTerm', title: '금일기준텀', group: 'date' },
  { key: 'beginDate', title: '시작일', group: 'date' },
  { key: 'endDate', title: '종료일', group: 'date' },
  { key: 'category', title: '카테고리', group: 'category' },
]

const headers = [
  { field: 'name', slotId: 'NAME', label: '이름', sort: ['asc'], essential: true },
  {
    field: 'title',
    label: '제목',
    sort: [
      ['asc', '제목 abc'],
      ['desc', '제목 zyx'],
    ],
    default: false,
  },
  { field: 'department', label: '부서', sort: ['desc'], essential: true },
  { field: 'role', label: '상태' },
  { field: 'email', label: '메일' },
]

const router = useRouter()

const tableConfig = useTableConfig({ storageId, headers })

const searchOrder = useSearchOrder(router, tableConfig.state)
const searchPagination = useSearchPagination(router, tableConfig.state)
const searchFilter = useSearchFilter(router, { filterTypes })

const refSelectInputs = ref(null)
const refSearchDuration = ref(null)

const totalCount = ref(adminTable.samples.length)

const checkboxes = ref([])
const rows = ref([])

const elements = ref({})
const functionRefs = (label) => (el) => {
  elements.value[label] = el
}
const nowObserving = ref(null)
const handleIntersection = (data) => {
  nowObserving.value = data
}

const handleSearch = async () => {
  const querys1 = refSelectInputs.value.querys()
  const querys2 = refSearchDuration.value.querys()

  const ret = await searchFilter.appendQuerys(querys1.concat(querys2))
  console.log(querys1)
  if (ret) {
    // 강제 검색
    reload()
  }
}

const handleAppendQuerys = (arg) => {
  searchFilter.appendQuerys(arg)
}

const handleRemoveQuery = (arg) => {
  searchFilter.clearQuery(arg)
}

const selectOptions = ref({
  display: '',
  selling: '',
})

const reload = () => {
  console.log('reload')
  const { orderField, orderType } = searchOrder.readQuery()
  const { page } = searchPagination.readQuery()
  const { limit } = tableConfig.state
  searchFilter.readQuery()

  // console.log(ui.filters.useFlag(true), ui.filters.date14(ui.filters.parseISO('2021-11-22 10:20:30')), ui.filters.date14(new Date()))
  const temp = _.cloneDeep(adminTable.samples)

  if (orderField) {
    temp.sort((a, b) => {
      if (orderType === 'asc') {
        if (a[orderField] > b[orderField]) return 1
        else return -1
      } else {
        if (a[orderField] > b[orderField]) return -1
        else return 1
      }
    })
  }
  const beginIdx = (page - 1) * limit
  rows.value = temp.slice(beginIdx, beginIdx + limit)
}
reload()
</script>
<template>
  <div class="relative flex w-full">
    <div class="flex-1 sm:max-w-[950px]">
      <div class="font-bold text-slate-500">List</div>
      <div class="mt-[8px] text-[32px] font-bold text-slate-700">Admin table</div>
      <div class="mt-[16px] text-[16px] text-slate-700 sm:w-[800px]">about menu description.</div>
      <div class="mt-[60px]">
        <div class="space-y-[80px]">
          <div>
            <SectionWrapper label="label" :ref="functionRefs('label')" @onIntersection="handleIntersection">
              <template #contents></template>
              <div>
                <div>
                  <div class="text-[14px]">
                    <RmAdminTable
                      :title="'SIMPLE TABLE'"
                      v-model:rows="rows"
                      v-model:checkboxes="checkboxes"
                      :totalCount="totalCount"
                      :searchOrder="searchOrder"
                      :searchPagination="searchPagination"
                      :tableConfig="tableConfig"
                      :router="router"
                      :isSearching="true"
                      :useDefaultTable="true"
                      @onReload="reload"
                      @onSearch="handleSearch"
                      @onChangeLimit="reload"
                    >
                      <template v-slot:SHELL-SEARCH>
                        <RmAdminFormWrapper class="text-sm">
                          <div class="flex w-full flex-col divide-y">
                            <RmAdminFormWrapperRow>
                              <template v-slot:LABEL>검색종류</template>
                              <RmSearchSelectInputs
                                ref="refSelectInputs"
                                :filters="searchFilter.state.filter((f) => f[0].group === 'product')"
                                :filterTypes="filterTypes.filter((ft) => ft.group === 'product')"
                                @onAppendQuerys="handleAppendQuerys"
                                @onRemoveQuery="handleRemoveQuery"
                              ></RmSearchSelectInputs>
                            </RmAdminFormWrapperRow>

                            <RmAdminFormWrapperRow>
                              <template v-slot:LABEL>상품등록일</template>
                              <RmSearchDuration
                                ref="refSearchDuration"
                                :filters="searchFilter.state.filter((f) => f[0].group === 'date')"
                                :dateOptions="dateOptions"
                                @onAppendQuerys="handleAppendQuerys"
                              ></RmSearchDuration>
                            </RmAdminFormWrapperRow>
                          </div>
                        </RmAdminFormWrapper>
                      </template>
                      <template v-slot:SHELL-TABLE-LEFT>
                        <PxButton color="gray_border" size="xs" isFull class="w-auto">
                          <span>삭제</span>
                        </PxButton>
                        <PxButton color="gray_border" size="xs" isFull class="w-auto">
                          <span>상품복사</span>
                        </PxButton>
                        <span class="px-1 text-gray-300">|</span>
                        <RmAdminTableSelect
                          v-model="selectOptions.display"
                          :options="[
                            { label: '진열함', value: 'open' },
                            { label: '진열안함', value: 'closed' },
                          ]"
                          :optionsLabel="(option) => option.label"
                          :optionsValue="(option) => option.value"
                          :defaultLabel="'진열변경'"
                        >
                        </RmAdminTableSelect>
                        <RmAdminTableSelect
                          v-model="selectOptions.selling"
                          :options="[
                            { label: '판매함', value: 'open' },
                            { label: '판매안함', value: 'closed' },
                          ]"
                          :optionsLabel="(option) => option.label"
                          :optionsValue="(option) => option.value"
                          :defaultLabel="'판매변경'"
                        >
                        </RmAdminTableSelect>
                      </template>

                      <template v-slot:SHELL-TABLE-RIGHT>
                        <PxButton size="sm" isFull class="w-auto">
                          <span class="px-[10px] text-[12px]">상품등록</span>
                        </PxButton>
                        <PxButton size="sm" isFull class="w-auto">
                          <span class="px-[10px] text-[12px]">엑셀 상품등록</span>
                        </PxButton>
                        <PxButton color="transparent-gray" size="sm" isFull class="w-auto">
                          <span class="px-[10px] text-[12px] text-slate-700">엑셀 다운로드</span>
                        </PxButton>
                      </template>
                      <template v-slot:NAME="{ row }">
                        <div class="cursor-pointer whitespace-nowrap">
                          {{ row.name }}
                        </div>
                      </template>
                    </RmAdminTable>
                  </div>
                </div>
              </div>
            </SectionWrapper>
          </div>
        </div>
      </div>
    </div>
    <ToC :list="elements" :state="nowObserving"></ToC>
  </div>
</template>
