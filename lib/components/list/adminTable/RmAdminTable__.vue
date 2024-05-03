<script setup>
import { watch, onMounted } from 'vue'
import { RmButton } from '@/components/element/button'
import { RmTable } from '@/components/list/table'
import { RmPaginationButton } from '@/components/list/pagination'
import BoardListConfig from './components/BoardListConfig.vue'
import { RmSearchPageLimit, RmSearchOrder } from './search'

const props = defineProps({
  title: { type: String, required: true },
  totalCount: { type: Number, required: true },
  rows: { type: Array, required: true },
  searchOrder: { type: Object, required: true },
  searchPagination: { type: Object, required: true },
  tableConfig: { type: Object, required: true },
  router: { type: Object, required: true },
  checkboxes: { type: [Array, null], default: () => null },
  isSingleCheckbox: { type: Boolean, default: false },
  defaultLabel4Sort: { type: String, default: '기본 정렬' },
  useDefaultTable: { type: Boolean, default: true },
})
const emits = defineEmits(['onSearch', 'onClearSearchFilter', 'update:checkboxes', 'onChangeLimit', 'onChangePage', 'onReload', 'onClickSort'])

const handleSearch = () => {
  emits('onSearch')
}

const handleClearSearchFilter = async () => {
  emits('onClearSearchFilter')
  const router = props.router
  await router.push({
    path: router.currentRoute.value.path,
  })
}

const handleChangeLimit = (limit) => {
  props.tableConfig.saveLimit(limit)
  emits('onChangeLimit')
}

const handleClickSort = (arg) => {
  props.searchOrder.setSearchOrder(arg)
  emits('onClickSort', arg)
}

const handleChangePage = (arg) => {
  props.searchPagination.setPage(arg)
  emits('onChangePage', arg)
  console.log('onChangePage', arg)
}

let currentPath = ''
onMounted(() => {
  currentPath = props.router.currentRoute.value.path
})

// 쿼리를 추가 했을때 자동으로 reload하게 한다.
// 그런데 현재 페이지를 벗어나 다른곳으로 이동하는 경우에는 reload되지 않게 한다.
watch(
  () => props.router.currentRoute.value.fullPath,
  () => {
    // const isEmpty = Object.keys(props.router.currentRoute.value.query).length === 0
    // if (!isEmpty) {
    if (currentPath === props.router.currentRoute.value.path) {
      emits('onReload')
    }
    // }
  }
)
</script>
<template>
  <div class="space-y-[24px]">
    <div>
      <div class="flex h-[56px] items-center justify-between text-[28px] font-bold leading-[38px]">
        <div>
          {{ title }}
        </div>
        <slot name="SHELL-TABLE-TOP"></slot>
      </div>

      <div class="mt-[16px]">
        <!-- 검색 슬롯 -->
        <slot name="SHELL-SEARCH"></slot>

        <div class="my-[12px] flex justify-center space-x-[8px]">
          <RmButton isFull @click="handleSearch" class="w-[68px]">검색</RmButton>
          <RmButton isFull color="gray" @click="handleClearSearchFilter" class="w-[80px]">초기화</RmButton>
        </div>

        <div class="">
          <div class="flex justify-between">
            <div class="flex flex-1 items-center space-x-1">
              <slot name="SHELL-TABLE-RIGHT"></slot>
            </div>
          </div>
          <div class="flex h-[56px] items-center justify-between">
            <div class="flex items-center space-x-[8px]">
              <!-- 왼쪽 버튼 slot -->
              <slot name="SHELL-TABLE-LEFT" :rows="rows"></slot>
            </div>
            <div class="flex space-x-[6px]">
              <!-- 오른쪽 버튼 slot -->
              <div>
                <RmSearchOrder
                  v-if="searchOrder.options4Sort.length > 0"
                  size="xs"
                  :defaultLabel="defaultLabel4Sort"
                  :orderState="searchOrder.state"
                  :orderOptions="searchOrder.options4Sort"
                  @onSetSearchOrder="handleClickSort"
                ></RmSearchOrder>
              </div>
              <div>
                <RmSearchPageLimit size="xs" :limit="tableConfig.state.limit" @onChangeLimit="handleChangeLimit"></RmSearchPageLimit>
              </div>

              <BoardListConfig :tableConfig="tableConfig"></BoardListConfig>
            </div>
          </div>
        </div>

        <template v-if="!useDefaultTable">
          <slot name="SHELL-TABLE" :handleClickSort="handleClickSort"></slot>
        </template>
        <template v-else>
          <RmTable
            class=""
            :isNarrow="true"
            :headers="tableConfig.state.headers"
            :rows="rows"
            @update:rows="$emit('update:rows', $event)"
            :checkboxes="checkboxes"
            :isSingleCheckbox="isSingleCheckbox"
            @update:checkboxes="$emit('update:checkboxes', $event)"
            @onClickHeader="handleClickSort"
          >
            <template v-for="(fn, name) in $slots" v-slot:[name]="{ row }">
              <slot v-if="!name.startsWith('SHELL-')" :name="name" :row="row" />
            </template>
          </RmTable>
        </template>
        <div class="flex h-[56px] items-center space-x-[8px]">
          <div>
            <RmPaginationButton
              :limit="tableConfig.state.limit"
              :currentPage="searchPagination.state.page"
              :total="totalCount"
              @onChangePage="handleChangePage"
            ></RmPaginationButton>
          </div>
          <div>
            <span class="text-[14px] leading-[1] text-[#A3A3A3]">
              [총 <span class="text-[#4F46E5]">{{ totalCount }}</span> 개]
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
