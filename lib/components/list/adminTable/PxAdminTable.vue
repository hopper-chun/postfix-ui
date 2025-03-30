<script setup>
import _ from 'lodash'
import { ref, watch, watchEffect } from 'vue'

import BoardListConfig from './components/BoardListConfig.vue'
import { useFunctionRef, useResize, useTooltipDialog } from '@/composables'
import { currency } from '@/filters/common'

const props = defineProps({
  id: { type: String }, // 페이지 내 테이블이 2개 이상일 경우, 체크박스 id 구분을 위해 사용
  useLocale: { type: Boolean, default: false },
  title: { type: String },
  totalCount: { type: Number, required: true },
  rows: { type: Array, required: true },
  searchOrder: { type: Object, required: true },
  searchPagination: { type: Object, required: true },
  tableConfig: { type: Object, required: true },
  router: { type: Object, required: true },
  checkboxes: { type: [Array, null], default: () => null },
  singleCheckbox: { type: Boolean, default: false },
  defaultLabel4Sort: { type: String, default: '기본 정렬' },
  defaultTable: { type: Boolean, default: true },
  shellTable: { type: Boolean, default: true },
  searchOrderButton: { type: Boolean, default: true },
  searchFilterButton: { type: Boolean, default: true },
  inactiveCheckbox: { type: Boolean, default: false }, //사용안함
  checkboxDisables: { type: Array }, //사용안함
  isSearching: { type: Boolean, default: false },
  useTitle: { type: Boolean, default: true },
  paginationCount: { type: Boolean, default: false },
  tableHeight: { type: [Number, String] },
  upperPagination: { type: Boolean, default: true },
  lowerPagination: { type: Boolean, default: false },
  use10000: { type: Boolean, default: false },
  fnClass4Row: { type: Function },
  emptyText: { type: String, default: '표시할 정보가 없습니다.' },
  useMobile: { type: Boolean, default: false },
  useGrid: { type: Boolean, default: false },
  md: { type: String },
})
const emits = defineEmits(['onSearch', 'onClearSearchFilter', 'update:checkboxes', 'onChangeLimit', 'onChangePage', 'onReload', 'onClickSort', 'onClickRow'])

const { functionRef, element } = useFunctionRef()
const { isMobile } = useResize()
const { setTooltip } = useTooltipDialog()

const handleTooltipClick = () => {
  if (props.md) {
    setTooltip(props.md)
  }
}

const iconRef = ref(null)

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
}

// SearchFilter 다이얼로그 관련
const local = ref({
  tableConfig: {},
  searchOrder: {},
})

// 다이얼로그 열 때
const handleOpenSearchFilter = () => {
  local.value.tableConfig = _.cloneDeep(props.tableConfig)
  element.value.open()
}

// 저장
const handleTableConfigSave = () => {
  props.tableConfig.saveHeaders(local.value.tableConfig.state.headers)
  handleChangeLimit(local.value.tableConfig.state.limit)
  element.value.close()
}

// 리셋
const handleTableConfigReset = () => {
  props.tableConfig.saveHeaders()
  local.value.tableConfig.state.headers = _.cloneDeep(props.tableConfig.state.headers)
}

const handleRefresh = () => {
  emits('onReload')
}

// //
// let currentPath = ''
// onMounted(() => {
//   currentPath = props.router.currentRoute.value.path
// })

// // 쿼리를 추가 했을때 자동으로 reload하게 한다.
// // 그런데 현재 페이지를 벗어나 다른곳으로 이동하는 경우에는 reload되지 않게 한다.
// watch(
//   () => props.router.currentRoute.value.fullPath,
//   () => {
//     // const isEmpty = Object.keys(props.router.currentRoute.value.query).length === 0
//     // if (!isEmpty) {
//     if (currentPath === props.router.currentRoute.value.path) {
//       emits('onReload')
//     }
//     // }
//   }
// )
// 현재 페이지 벗어날때 또 호출되는 vue-route 버그 픽스된거 같음    ---> 잘못알았음

///////////////////////////////////////////////////////////////////////////////////////////////////////
//
// 2023-05-06 페이지를 벗어날때 fullPath가 변경되면 reload가 호출되는데 이걸 막아야 한다.
//
// let lastPath = ''
// let unmounted = false

// 2023-09-11 페이지를 벗어나지 않은 경우 (마운트할 때의 라우트 네임과 현재 라우트 네임이 일치할 때 ) 리로드를 요청하고,
// 페이지를 벗어날 때 (마운트할 때의 라우트 네임과 현재 진입한 라우트 네임이 불일치할 때 )에는 리로드를 요청하지 않게 수정함.
let mountedName = props.router.currentRoute.value.name

// onMounted(() => {
//   lastPath = props.router.currentRoute.value.path
//   unmounted = false
//   // console.log('onMounted', lastPath)
// })
// onBeforeUnmount(() => {
//   // 05-17 이게 증상이 오락가락하는데.. 다른 페이지로 나갈때 기존 페이지에서 watch가 호출될때가 있다. 미쳐버리겠다.
//   // 벗어나려는 페이지에서 watch가 발생하면 안되는데.. 지금은 안난다.
//   // 일단 unmounted 플래그를 두고 true면 벗어나려는 페이지니까 watch 가 걸렸을때 reload 안하는걸로 한다.
//   unmounted = true
//   // console.log('onBeforeUnmount========================')
// })
watch(
  () => props.router.currentRoute.value.fullPath,
  () => {
    // console.log('watch', lastPath === props.router.currentRoute.value.path ? '같다' : '다르다')
    // console.log('lastPath', lastPath, '-------', props.router.currentRoute.value.path)

    if (mountedName === props.router.currentRoute.value.name) {
      // if (!unmounted) {
      // if (lastPath === props.router.currentRoute.value.path) {
      emits('onReload')
      // console.log('----------------', lastPath, props.router.currentRoute.value.path)

      // lastPath = props.router.currentRoute.value.path
    }
  }
)
//
//////////////////////////////////////////////////////////////////////////////////////////////////////////

watchEffect(() => {
  if (props.isSearching) {
    iconRef?.value?.classList.add('SEARCHING')
  } else {
    iconRef?.value?.classList.remove('SEARCHING')
  }
})
</script>
<template>
  <div class="px-adminTable">
    <div v-if="useTitle" class="px-adminTable--header_container">
      <div class="px-adminTable--header">
        <slot name="SHELL-TITLE">
          <div class="px-adminTable--title">
            <div class="title">{{ title }}</div>
            <div class="count" v-if="Number.isInteger(totalCount)">({{ currency(totalCount) }})</div>
            <button v-if="props.md" class="px-adminTable--tooltipIcon" @click="handleTooltipClick"></button>
          </div>
        </slot>
        <div @click="handleRefresh" class="px-adminTable--refresh mobile">
          <div ref="iconRef">
            <PxIcon name="icon-refresh" class="px-adminTable--refresh_icon"></PxIcon>
          </div>
        </div>
      </div>
      <div class="px-adminTable--header_wrapper">
        <div @click="handleRefresh" class="px-adminTable--refresh desktop" :class="{ hasSlot: $slots['SHELL-TABLE-TOP'] }">
          <div ref="iconRef">
            <PxIcon name="icon-refresh" class="px-adminTable--refresh_icon"></PxIcon>
          </div>
        </div>

        <slot name="SHELL-TABLE-TOP"></slot>
      </div>
    </div>
    <slot name="SHELL-SUBTITLE"></slot>

    <div class="px-adminTable--body">
      <!-- 검색 슬롯 -->

      <slot name="SHELL-SEARCH"></slot>

      <div v-if="shellTable" class="px-adminTable--search" :class="[{ useAlign: !upperPagination }]">
        <div class="shell-table-left">
          <!-- 왼쪽 버튼 slot, 모바일일 경우 상단 버튼 slot -->
          <slot name="SHELL-TABLE-LEFT" :rows="rows"></slot>
        </div>
        <div class="shell-table-right">
          <!-- 오른쪽 버튼 slot -->
          <div class="func_container">
            <div v-if="searchOrderButton" class="px-searchOrder">
              <PxSearchOrder
                v-if="searchOrder.options4Sort.length > 0"
                :defaultLabel="defaultLabel4Sort"
                :orderState="searchOrder.state"
                :orderOptions="searchOrder.options4Sort"
                @onSetSearchOrder="handleClickSort"
                style="width: 132px"
              ></PxSearchOrder>
            </div>
            <div :class="{ hasCount: paginationCount }">
              <div v-if="paginationCount">
                <slot name="PAGINATION-COUNT" :total="totalCount"> 총 {{ totalCount }} 건 </slot>
              </div>
              <template v-if="upperPagination">
                <slot name="SHELL-PAGINATION" :handleChangePage="handleChangePage">
                  <PxPagination
                    :limit="tableConfig.state.limit"
                    :currentPage="searchPagination.state.page"
                    :total="totalCount"
                    @onChangePage="handleChangePage"
                  ></PxPagination>
                </slot>
              </template>
            </div>
          </div>

          <div v-if="searchFilterButton" @click="handleOpenSearchFilter" class="searchFilter">
            <PxIcon name="icon-settings" style="height: 20px; width: 20px"></PxIcon>
          </div>
        </div>
      </div>

      <template v-if="!defaultTable">
        <slot name="SHELL-TABLE" :handleClickSort="handleClickSort"></slot>
      </template>
      <template v-else>
        <PxTable
          :id="id"
          :useMobile="useMobile"
          :useGrid="useGrid"
          :emptyText="useLocale ? 'There is no data' : emptyText"
          :isNarrow="true"
          :headers="tableConfig.state.headers"
          :rows="rows"
          @update:rows="$emit('update:rows', $event)"
          :checkboxes="checkboxes"
          :singleCheckbox="singleCheckbox"
          :inactiveCheckbox="inactiveCheckbox"
          @update:checkboxes="$emit('update:checkboxes', $event)"
          @onClickHeader="handleClickSort"
          :checkboxDisables="checkboxDisables"
          :isSearching="isSearching"
          :tableHeight="tableHeight"
          :fnClass4Row="fnClass4Row"
          @onClickRow="$emit('onClickRow', $event)"
        >
          <template v-for="(fn, name) in $slots" v-slot:[name]="{ row, index, handleCheckbox }">
            <slot v-if="!name.startsWith('SHELL-')" :name="name" :row="row" :index="index" :handleCheckbox="handleCheckbox" />
          </template>
        </PxTable>
      </template>
      <template v-if="lowerPagination">
        <div class="lower-pagination">
          <slot name="SHELL-PAGINATION" :handleChangePage="handleChangePage">
            <PxPagination
              :limit="tableConfig.state.limit"
              :currentPage="searchPagination.state.page"
              :total="totalCount"
              @onChangePage="handleChangePage"
            ></PxPagination>
          </slot>
        </div>
      </template>
    </div>
    <PxDialog :title="useLocale ? 'Table filter settings' : '테이블 필터 설정'" v-slot="{ closeDialog }" :ref="functionRef">
      <div class="dialog_searchFilter">
        <!-- <div class="dialog_header">
          <div class="title">{{ useLocale ? 'Table filter settings' : '테이블 필터 설정' }}</div>
          <div class="close" @click="closeDialog()"></div>
        </div> -->

        <div class="dialog_body">
          <div class="leftSection">
            <div>
              <p>{{ useLocale ? 'Select page range' : '페이지 크기 선택' }}</p>

              <PxSearchPageLimit
                :useLocale="useLocale"
                :limit="local.tableConfig.state.limit"
                :use10000="use10000"
                @onChangeLimit="local.tableConfig.state.limit = $event"
              ></PxSearchPageLimit>
            </div>
          </div>
          <div class="rightSection">
            <div class="sectionHeader">
              <p style="word-break: keep-all; padding-right: 4px">{{ useLocale ? 'Table header filter' : '테이블 헤더 필터' }}</p>
              <PxButton size="xs" color="gray_border" @click="handleTableConfigReset"
                ><div>{{ useLocale ? 'clear' : '초기화' }}</div></PxButton
              >
            </div>

            <BoardListConfig v-model="local.tableConfig"></BoardListConfig>
          </div>
        </div>
        <div class="button_wrapper">
          <PxButton size="sm" color="sec" @click="closeDialog()"> {{ useLocale ? 'cancel' : '취소' }}</PxButton>
          <PxButton size="sm" color="pri" @click="handleTableConfigSave"> {{ useLocale ? 'save' : '저장' }}</PxButton>
        </div>
      </div>
    </PxDialog>
  </div>
</template>
