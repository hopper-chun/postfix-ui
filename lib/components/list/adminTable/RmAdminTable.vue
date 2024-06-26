<script setup>
import _ from 'lodash'
import { ref, watch, computed, watchEffect, onMounted, onBeforeUnmount } from 'vue'
import { RmTable, RmPagination, RmDialog, RmIcon, RmButton } from '@/components'
import BoardListConfig from './components/BoardListConfig.vue'
import { RmSearchPageLimit, RmSearchOrder } from './search'
import { useFunctionRef, useResize } from '@/composables'
import { currency } from '@/filters/common'

const props = defineProps({
  useLocale: { type: Boolean, default: false },
  title: { type: String },
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
  useShellTable: { type: Boolean, default: true },
  useSearchOrder: { type: Boolean, default: true },
  useSearchFilter: { type: Boolean, default: true },
  isInactiveCheckbox: { type: Boolean, default: false },
  checkboxDisables: { type: Array },
  isSearching: { type: Boolean, default: false },
  useTitle: { type: Boolean, default: true },
  usePaginationCount: { type: Boolean, default: false },
  tableHeight: { type: [Number, String] },
  usePaginationSlot: { type: Boolean, default: false },
  use10000: { type: Boolean, default: false },
  fnClass4Row: { type: Function },
})
const emits = defineEmits(['onSearch', 'onClearSearchFilter', 'update:checkboxes', 'onChangeLimit', 'onChangePage', 'onReload', 'onClickSort'])

const { functionRef, element } = useFunctionRef()
const { isMobile } = useResize()
const handleSearch = () => {
  emits('onSearch')
}
const iconRef = ref(null)
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
  console.log('save to localstorage', local.value)
  props.tableConfig.saveHeaders(local.value.tableConfig.state.headers)
  handleChangeLimit(local.value.tableConfig.state.limit)
  element.value.close()
}

// 리셋
const handleTableConfigReset = () => {
  console.log('reset localstorage')

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
    // console.log(iconRef.value, 'ref찾기')
    iconRef?.value?.classList.add('SEARCHING')
  } else {
    iconRef?.value?.classList.remove('SEARCHING')
  }
})
</script>
<template>
  <div class="rm-adminTable">
    <div v-if="useTitle" class="rm-adminTable--header_container">
      <div class="rm-adminTable--header">
        <slot name="SHELL-TITLE">
          <div class="rm-adminTable--title">
            <div class="title">{{ title }}</div>
            <div class="count">({{ currency(totalCount) }})</div>
          </div>
        </slot>
        <div @click="handleRefresh" class="rm-adminTable--refresh mobile">
          <div ref="iconRef">
            <RmIcon name="icon-refresh" class="rm-adminTable--refresh_icon"></RmIcon>
          </div>
        </div>
      </div>
      <div class="rm-adminTable--header_wrapper">
        <div @click="handleRefresh" class="rm-adminTable--refresh desktop" :class="{ hasSlot: $slots['SHELL-TABLE-TOP'] }">
          <div ref="iconRef">
            <RmIcon name="icon-refresh" class="rm-adminTable--refresh_icon"></RmIcon>
          </div>
        </div>

        <slot name="SHELL-TABLE-TOP"></slot>
      </div>
    </div>
    <slot name="SHELL-SUBTITLE"></slot>

    <div class="rm-adminTable--body">
      <!-- 검색 슬롯 -->

      <slot name="SHELL-SEARCH"></slot>

      <!-- <div class="my-[12px] flex justify-center space-x-[8px]">
          <RmBtn @click="handleSearch">검색</RmBtn>
          <RmBtn color="gray" @click="handleClearSearchFilter">초기화</RmBtn>
        </div> -->

      <div v-if="useShellTable" class="rm-adminTable--search" :class="[{ useAlign: usePaginationSlot }]">
        <div class="shell-table-left">
          <!-- 왼쪽 버튼 slot, 모바일일 경우 상단 버튼 slot -->
          <slot name="SHELL-TABLE-LEFT" :rows="rows"></slot>
        </div>
        <div class="shell-table-right">
          <!-- 오른쪽 버튼 slot -->
          <div class="func_container">
            <div v-if="useSearchOrder" class="searchOrder">
              <RmSearchOrder
                v-if="searchOrder.options4Sort.length > 0"
                :defaultLabel="defaultLabel4Sort"
                :orderState="searchOrder.state"
                :orderOptions="searchOrder.options4Sort"
                @onSetSearchOrder="handleClickSort"
                style="width: 132px"
              ></RmSearchOrder>
            </div>
            <div v-if="!usePaginationSlot" :class="{ hasCount: usePaginationCount }">
              <div v-if="usePaginationCount">
                <slot name="PAGINATION-COUNT" :total="totalCount"> 총 {{ totalCount }} 건 </slot>
              </div>
              <RmPagination
                :limit="tableConfig.state.limit"
                :currentPage="searchPagination.state.page"
                :total="totalCount"
                @onChangePage="handleChangePage"
              ></RmPagination>
            </div>
          </div>

          <div v-if="useSearchFilter" @click="handleOpenSearchFilter" class="searchFilter">
            <RmIcon name="icon-settings" style="height: 20px; width: 20px"></RmIcon>
          </div>
        </div>
      </div>

      <template v-if="!useDefaultTable">
        <slot name="SHELL-TABLE" :handleClickSort="handleClickSort"></slot>
      </template>
      <template v-else>
        <RmTable
          :emptyText="useLocale ? 'There is no data' : '표시할 정보가 없습니다.'"
          class=""
          :isNarrow="true"
          :headers="tableConfig.state.headers"
          :rows="rows"
          @update:rows="$emit('update:rows', $event)"
          :checkboxes="checkboxes"
          :isSingleCheckbox="isSingleCheckbox"
          :isInactiveCheckbox="isInactiveCheckbox"
          @update:checkboxes="$emit('update:checkboxes', $event)"
          @onClickHeader="handleClickSort"
          :checkboxDisables="checkboxDisables"
          :isSearching="isSearching"
          :tableHeight="tableHeight"
          :fnClass4Row="fnClass4Row"
        >
          <template v-for="(fn, name) in $slots" v-slot:[name]="{ row, index }">
            <slot v-if="!name.startsWith('SHELL-')" :name="name" :row="row" :index="index" />
          </template>
        </RmTable>
      </template>
      <template v-if="usePaginationSlot">
        <div>
          <slot name="SHELL-PAGINATION" :handleChangePage="handleChangePage">
            <RmPagination
              :limit="tableConfig.state.limit"
              :currentPage="searchPagination.state.page"
              :total="totalCount"
              @onChangePage="handleChangePage"
            ></RmPagination>
          </slot>
        </div>
      </template>
      <!-- <div class="flex h-[56px] items-center space-x-[8px]">
          <div>
            <RmPaginationWithButton
              :limit="tableConfig.state.limit"
              :currentPage="searchPagination.state.page"
              :total="totalCount"
              @onChangePage="handleChangePage"
            ></RmPaginationWithButton>
          </div>
          <div>
            <span class="text-[14px] leading-[1] text-[#A3A3A3]">
              [총 <span class="text-[#4F46E5]">{{ totalCount }}</span> 개]
            </span>
          </div>
        </div> -->
    </div>
    <RmDialog v-slot="{ closeDialog }" :ref="functionRef">
      <div class="dialog_searchFilter">
        <div class="dialog_header">
          <div class="title">{{ useLocale ? 'Table filter settings' : '테이블 필터 설정' }}</div>
          <div class="close" @click="closeDialog()"></div>
        </div>

        <div class="dialog_body">
          <div class="leftSection">
            <!-- <div v-if="searchOrder.options4Sort.length > 0">
                <div class="pb-[12px]">분류</div>
                <RmSearchOrder
                  :defaultLabel="defaultLabel4Sort"
                  :orderState="searchOrder.state"
                  :orderOptions="searchOrder.options4Sort"
                  @onSetSearchOrder="handleClickSort"
                ></RmSearchOrder>
              </div> -->
            <div>
              <p>{{ useLocale ? 'Select page range' : '페이지 크기 선택' }}</p>

              <RmSearchPageLimit
                :useLocale="useLocale"
                :limit="local.tableConfig.state.limit"
                :use10000="use10000"
                @onChangeLimit="local.tableConfig.state.limit = $event"
              ></RmSearchPageLimit>
            </div>
          </div>
          <div class="rightSection">
            <div class="sectionHeader">
              <p style="word-break: keep-all; padding-right: 4px">{{ useLocale ? 'Table header filter' : '테이블 헤더 필터' }}</p>
              <RmButton size="xs" color="gray_border" @click="handleTableConfigReset"
                ><div>{{ useLocale ? 'clear' : '초기화' }}</div></RmButton
              >
            </div>

            <BoardListConfig v-model="local.tableConfig"></BoardListConfig>
          </div>
        </div>
        <div class="button_wrapper">
          <RmButton size="sm" color="sec" @click="closeDialog()"> {{ useLocale ? 'cancel' : '취소' }}</RmButton>
          <RmButton size="sm" color="pri" @click="handleTableConfigSave"> {{ useLocale ? 'save' : '저장' }}</RmButton>
        </div>
      </div>
    </RmDialog>
  </div>
</template>
