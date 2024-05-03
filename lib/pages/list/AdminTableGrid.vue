<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { RmButton, RmSmIconButton } from '@/components/element/button'
import { RmDividedSelect, RmAdminTableSelect } from '@/components/form/select'
import { RmAdminTable } from '@/components/list/adminTable'
import { RmCustomMergeTable } from '@/components/list/table'
import { IconApi } from '@/components/icon'
import { RmSearchSelectInputs, RmSearchDuration } from '@/components/list/adminTable/search'
import RmAdminFormWrapper from '@/components/layout/RmAdminFormWrapper.vue'
import RmAdminFormWrapperRow from '@/components/layout/RmAdminFormWrapperRow.vue'
import ToC from '@/layout/ToC.vue'
import SectionWrapper from '@/components/layout/SectionWrapper.vue'
import origin from './seed.js'
import seed2 from './seed2.js'
import _ from 'lodash'
import useSearchOrder from '@/composables/useSearchOrder'
import useSearchPagination from '@/composables/useSearchPagination'
import useSearchFilter from '@/composables/useSearchFilter'
import useTableConfig from '@/composables/useTableConfig'

const { adminTable } = origin

const storageId = 'ADMIN_DELIVERY_STEP_3_V1'

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
  {
    field: 'orderTitle',
    label: '주문명',
    essential: true,
  },
  {
    field: 'paymentPrice',
    label: '가격',
    essential: true,
  },
  { checkbox: true, label: '체크박스', essential: true },
  {
    field: 'invoiceId',
    label: '송장',
    essential: true,
  },
  {
    field: 'optionName',
    label: '상품명',
    essential: true,
  },
  {
    field: 'Memo',
    label: '메모',
    essential: true,
  },
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
const checkboxesInvoices = ref([])

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

  const rowspans = [
    { lastIndex: -1, value: 0 },
    { lastIndex: -1, value: 0 },
    { lastIndex: -1, value: 0 },
  ]

  const temp = seed2.rows.map((row, rowIndex) => {
    row.columTotal = row.invoices.reduce((acc, invoice) => {
      acc += invoice.orderProducts.length + 1
      return acc
    }, 0)

    row.invoices = row.invoices.map((invoice, invoiceIdx) => {
      invoice.orderProducts = invoice.orderProducts.map((orderProduct, productIdx) => {
        if (rowspans[0].lastIndex !== rowIndex) {
          rowspans[0].lastIndex = rowIndex
          rowspans[0].value = row.columTotal

          rowspans[1] = { lastIndex: -1, value: 0 }
          rowspans[2] = { lastIndex: -1, value: 0 }
        } else {
          rowspans[0].value = 0
        }
        if (rowspans[1].lastIndex !== invoiceIdx) {
          rowspans[1].lastIndex = invoiceIdx
          rowspans[1].value = invoice.orderProducts.length + 1

          rowspans[2] = { lastIndex: -1, value: 0 }
        } else {
          rowspans[1].value = 0
        }
        if (rowspans[2].lastIndex !== invoiceIdx) {
          rowspans[2].lastIndex = invoiceIdx
          rowspans[2].value = invoice.orderProducts.length
        } else {
          rowspans[2].value = 0
        }
        orderProduct.rowspans = rowspans.map(({ value }) => value)
        // console.log('orderProduct.rowspans', orderProduct.rowspans)
        return orderProduct
      })
      return invoice
    })
    row.invoices = row.invoices.map((invoice) => {
      invoice.checkboxIndex = checkboxes.value.length
      checkboxes.value.push(false)
      checkboxesInvoices.value.push(invoice)
      return invoice
    })
    return row
  })

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

const handleCheckbox = ($event, index) => {
  checkboxes.value[index] = $event.target.checked
}
const handleCheckAll = (checked) => {
  checkboxes.value = checkboxes.value.map((row) => checked)
}

reload()
</script>
<template>
  <div class="relative flex w-full">
    <div class="max-w-[950px] flex-1">
      <div class="font-bold text-slate-500">List</div>
      <div class="mt-[8px] text-[32px] font-bold text-slate-700">Admin table</div>
      <div class="mt-[16px] w-[800px] text-[16px] text-slate-700">about menu description.</div>
      <div class="mt-[60px]">
        <div class="space-y-[80px]">
          <div>
            <SectionWrapper label="label" :ref="functionRefs('label')" @onIntersection="handleIntersection">
              <template #contents> </template>
              <div>
                <div>
                  <div class="text-[14px]">
                    <RmAdminTable
                      :title="'SIMPLE TABLE'"
                      v-model:rows="rows"
                      :totalCount="totalCount"
                      :searchOrder="searchOrder"
                      :searchPagination="searchPagination"
                      :tableConfig="tableConfig"
                      :router="router"
                      :useDefaultTable="false"
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
                        <RmButton color="transparent-gray" size="sm" isFull class="w-auto"
                          ><span class="px-[10px] text-[12px] text-slate-700">삭제</span></RmButton
                        >
                        <RmButton color="transparent-gray" size="sm" isFull class="w-auto"
                          ><span class="px-[10px] text-[12px] text-slate-700">상품복사</span></RmButton
                        >
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
                        <RmButton size="sm" isFull class="w-auto">
                          <span class="px-[10px] text-[12px]">상품등록</span>
                        </RmButton>
                        <RmButton size="sm" isFull class="w-auto">
                          <span class="px-[10px] text-[12px]">엑셀 상품등록</span>
                        </RmButton>
                        <RmButton color="transparent-gray" size="sm" isFull class="w-auto">
                          <span class="px-[10px] text-[12px] text-slate-700">엑셀 다운로드</span>
                        </RmButton>
                      </template>

                      <template v-slot:SHELL-TABLE>
                        <RmCustomMergeTable :headers="headers" v-model:rows="rows" v-model:checkboxes="checkboxes" @onCheckAll="handleCheckAll">
                          <template v-for="(row, rowIndex) in rows">
                            <template v-for="(invoice, invoiceIndex) in row.invoices">
                              <template v-for="(orderProduct, orderProductIndex) in invoice.orderProducts">
                                <tr class="h-[48px] border-t leading-[19px]">
                                  <template v-if="orderProduct.rowspans[0]">
                                    <td class="border-b border-r px-[8px] py-[16px] align-top" :rowspan="orderProduct.rowspans[0]">
                                      <div>{{ row.orderTitle }}</div>
                                    </td>
                                    <td class="border-b border-r px-[8px] py-[16px] align-top" :rowspan="orderProduct.rowspans[0]">
                                      <div>{{ row.paymentPrice }}</div>
                                    </td>
                                  </template>
                                  <template v-if="orderProduct.rowspans[1]">
                                    <td class="border-b border-r px-[8px] py-[16px] align-top" :rowspan="orderProduct.rowspans[1]">
                                      <input
                                        v-if="checkboxes.length > 0"
                                        type="checkbox"
                                        :checked="checkboxes[invoice.checkboxIndex]"
                                        @change="handleCheckbox($event, invoice.checkboxIndex)"
                                        class="text-primary-500 focus:ring-primary-500 h-4 w-4 border-gray-300"
                                      />
                                    </td>
                                  </template>
                                  <template v-if="orderProduct.rowspans[2]">
                                    <td class="border-b border-r px-[8px] py-[16px] align-top" :rowspan="orderProduct.rowspans[2]">
                                      {{ invoice.invoiceId }}
                                    </td>
                                  </template>
                                  <td class="border-b border-r px-[8px] py-[16px] align-top">{{ orderProduct.optionName }}</td>
                                  <template v-if="orderProduct.rowspans[0]">
                                    <td class="border-b border-l px-[8px] py-[16px] align-top" :rowspan="orderProduct.rowspans[0]">비고</td>
                                  </template>
                                </tr>
                                <tr v-if="orderProductIndex === invoice.orderProducts.length - 1">
                                  <td class="border-b px-[8px] py-[16px] align-top" colspan="3">
                                    <div class="flex items-start space-x-[10px]">
                                      <div class="w-[92px]">수령자: {{ invoice.deliveryRecipient }}</div>
                                      <div class="">
                                        연락처: {{ invoice.deliveryPhone }}<br />
                                        주소: [{{ invoice.deliveryZip }}] {{ invoice.deliveryAddr1 }} {{ invoice.deliveryAddr2 }}<br />
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              </template>
                            </template>
                          </template>
                        </RmCustomMergeTable>
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
