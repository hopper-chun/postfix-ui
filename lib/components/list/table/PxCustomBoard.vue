<script setup>
import { watch } from 'vue'
import { useResize } from '@/composables'

const props = defineProps({
  router: { type: Object, required: true },
  rows: { type: Array, required: true },
  filterTypes: { type: Array, required: true },
  isSearching: { type: Boolean },
  totalCount: { type: Number },
  searchOrder: { type: Object },
  searchPagination: { type: Object },
  tableConfig: { type: Object },
  searchFilter: { type: Object },
  buttonSize: { type: String },
  search: { type: Boolean, default: true },
  pagination: { type: Boolean, default: true },
})

const emit = defineEmits(['onReload', 'onAppendQuery', 'onRemoveQuery'])

const { isMobile } = useResize()

const reload = () => {
  emit('onReload')
}

const handleChangePage = (arg) => {
  searchPagination.setPage(arg)
  reload()
}

let mountedName = props.router.currentRoute.value.name

watch(
  () => props.router.currentRoute.value.fullPath,
  () => {
    if (mountedName === props.router.currentRoute.value.name) {
      reload()
    }
  }
)
</script>
<template>
  <div class="px-custom-board">
    <slot name="search">
      <PxSearchSelectInputs
        v-if="search"
        :filters="searchFilter.state"
        :filterTypes="filterTypes"
        @onAppendQuerys="searchFilter.appendQuerys"
        @onRemoveQuery="searchFilter.clearQuery"
        @onSearch="reload()"
        :buttonSize="buttonSize"
      ></PxSearchSelectInputs>
    </slot>
    <slot name="upper"></slot>
    <template v-if="isSearching">
      <slot name="searching">
        <div class="px-custom-board--searching">
          <PxIcon name="icon-magnifying-glass-circle" class="icon"></PxIcon>
          <div class="text">검색중입니다</div>
        </div>
      </slot>
    </template>
    <template v-else-if="rows.length === 0">
      <slot name="empty">
        <div class="px-custom-board--empty">
          <PxIcon name="icon-x-circle" class="icon"></PxIcon>
          <div class="text">데이터가 없습니다</div>
        </div>
      </slot>
    </template>
    <template v-else>
      <slot :rows="rows" :isMobile="isMobile"></slot>
    </template>

    <slot name="pagination">
      <div v-if="pagination" class="px-custom-board--pagination">
        <PxPagination
          :limit="tableConfig.state.limit"
          :currentPage="searchPagination.state.page"
          :total="totalCount"
          @onChangePage="handleChangePage"
        ></PxPagination>
      </div>
    </slot>
  </div>
</template>
