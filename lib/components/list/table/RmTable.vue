<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useResize } from '@/composables'
import { RmCheckbox } from '@/components'

const props = defineProps({
  headers: { type: Array, required: true },
  rows: { type: Array, required: true },
  isNarrow: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  checkboxes: { type: [Array, null], default: () => null },
  checkboxDisables: { type: [Array, null], default: () => null },
  isSingleCheckbox: { type: Boolean, default: false },
  emptyText: { type: String, default: '표시할 정보가 없습니다.' },
  fnClass4Row: { type: Function },
  isSearching: { type: Boolean, default: false },
  tableHeight: { type: [Number, String] },
})

const emit = defineEmits(['onClickHeader', 'update:checkboxes'])

const checkedAll = ref(false)
const computedHeaders = computed(() => props.headers.filter((header) => (header.hasOwnProperty('using') ? header.using : true)))
const hasCheckboxes = computed(() => props.checkboxes !== null)
const { isMobile } = useResize()
const handleClickHeader = (currentHeader, headerIndex) => {
  if (!currentHeader.sort) {
    return
  }
  computedHeaders.value.forEach((header, index) => {
    if (index === headerIndex) {
      if (currentHeader.sort.length === 1) {
        currentHeader.sortStatus = header.sortStatus === 'asc' || header.sortStatus === 'desc' ? '' : currentHeader.sort[0]
      } else {
        currentHeader.sortStatus = header.sortStatus === 'asc' ? 'desc' : header.sortStatus === 'desc' ? '' : 'asc'
      }
    } else {
      delete header.sortStatus
    }
  })

  emit('onClickHeader', { orderField: currentHeader.field, orderType: currentHeader.sortStatus })
}

const handleCheckAll = (value) => {
  emit(
    'update:checkboxes',
    props.rows.map((_) => checkedAll.value)
  )
}

const theadRef = ref(null)
const tableRef = ref(null)

const isScrolled = computed(() => {
  return theadRef?.value?.scrollTop
})

const handleCheckbox = (index) => {
  emit(
    'update:checkboxes',
    props.rows.map((_, idx) => {
      if (index === idx) return !props.checkboxes[idx]
      else return props.isSingleCheckbox ? false : props.checkboxes[idx]
    })
  )
}

const targetElement = document.documentElement

const height = ref(500)
const minHeight = ref(0)

// 타임라인
// 로드가 덜 됐을 때 수치를 잼 -> 적은 수치가 등장함 -> 전체적으로 화면이 쪼그라듬 -> tableRef가 제대로 잡힘에도 entry의 값이 이미 줄어들어
const ro = new ResizeObserver((entries) => {
  entries.forEach((entry) => {
    const value = window.innerHeight - tableRef.value.offsetTop - 60
    if (props.tableHeight) {
      height.value = props.tableHeight === 'auto' ? 'auto' : props.tableHeight + 'px'
    } else {
      console.log('2', value)

      if (value < 300) {
        height.value = 300 + 'px'
      } else {
        height.value = value + 'px'
      }
    }
  })
})

onMounted(() => {
  ro.observe(targetElement)
})
onBeforeUnmount(() => {
  ro.disconnect(targetElement)
})
</script>

<template>
  <div
    ref="tableRef"
    class="rm-table"
    :style="isMobile ? `` : tableHeight ? `overflow-y:auto; height : ${height};` : `overflow-y:auto; max-height : ${height}; min-height : 30px`"
  >
    <table>
      <thead ref="theadRef">
        <tr>
          <th v-if="hasCheckboxes" class="hasCheckboxes" :class="[{ isNarrow }]" nowrap>
            <RmCheckbox id="checkAll" :disabled="isSingleCheckbox" v-model="checkedAll" @update:modelValue="handleCheckAll" />
          </th>
          <template v-for="(header, headerIndex) in computedHeaders" :key="header">
            <slot v-if="header.headerSlotId" :name="header.headerSlotId" :header="header" :index="headerIndex"></slot>
            <th :class="[{ isNarrow }]" nowrap v-else>
              <a
                @click="handleClickHeader(header, headerIndex)"
                class="rm-table--header"
                :class="[{ hasSort: !!header.sort }, { center: header.align === 'center' }, { right: header.align === 'right' }]"
              >
                <span class="rm-table--header_label" v-html="header.label"></span>
                <template v-if="header.sort">
                  <span v-if="header.sortStatus === 'asc'" class="rm-table--sort_asc"> </span>
                  <span v-else-if="header.sortStatus === 'desc'" class="rm-table--sort_desc"> </span>
                  <span v-else class="rm-table--sort_neutral"> </span>
                </template>
              </a>
            </th>
          </template>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in rows" :key="row" :class="[fnClass4Row ? fnClass4Row(row) : '']">
          <td v-if="hasCheckboxes" :class="[{ isNarrow }]" class="hasCheckboxes">
            <RmCheckbox :id="`cb_${rowIndex}`" :modelValue="checkboxes[rowIndex]" @update:modelValue="handleCheckbox(rowIndex)" />
          </td>
          <td
            :class="[{ isNarrow }, header.class || '', { center: header.align === 'center' }, { right: header.align === 'right' }]"
            :width="header.width"
            v-for="(header, columnIndex) in computedHeaders"
            :key="header"
          >
            <component
              v-if="header.component"
              :is="header.component.name"
              v-bind="header.component.props(row, columnIndex)"
              v-on="header.component.event ? header.component.event(row, columnIndex) : {}"
              >{{ header.component.label }}</component
            >

            <component v-else-if="header.render" :is="header.render(row)"></component>
            <slot v-else-if="header.slotId" :name="header.slotId" :row="row" :index="rowIndex"></slot>
            <span v-else-if="header.fieldFn" style="white-space: nowrap">{{ header.filter ? header.filter(header.fieldFn(row)) : header.fieldFn(row) }}</span>
            <span v-else style="white-space: nowrap">{{
              (row.$display && row.$display[header.field]) || (header.filter ? header.filter(row[header.field]) : row[header.field])
            }}</span>
          </td>
        </tr>
      </tbody>
    </table>
    <template v-if="isSearching">
      <div class="border-t border-[#E5E5E5] bg-gray-50 py-[12px] text-center text-sm text-gray-400">검색중입니다.</div>
    </template>
    <template v-else-if="rows.length === 0">
      <div class="rm-table--empty">{{ emptyText }}</div>
    </template>
  </div>
</template>
