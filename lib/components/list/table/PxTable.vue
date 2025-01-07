<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { useResize } from '@/composables'

const props = defineProps({
  id: { type: String }, // 페이지 내 테이블이 2개 이상일 경우, 체크박스 id 구분을 위해 사용
  spanHeaders: { type: Array },
  headers: { type: Array, required: true },
  rows: { type: Array, required: true },
  narrow: { type: Boolean, default: false },
  // disabled: { type: Boolean, default: false },
  checkboxes: { type: [Array, null], default: () => null },
  // checkboxDisables: { type: [Array, null], default: () => null },
  singleCheckbox: { type: Boolean, default: false },
  emptyText: { type: String, default: '표시할 정보가 없습니다.' },
  fnClass4Row: { type: Function },
  searching: { type: Boolean, default: false },
  tableHeight: { type: [Number, String] },
  useMobile: { type: Boolean, default: false },
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
  console.log('ALL', props.rows)
}

const theadRef = ref(null)
const tableRef = ref(null)
const tooltipRef = ref(null)
const isScrolled = computed(() => {
  return theadRef?.value?.scrollTop
})

const handleCheckbox = (index) => {
  emit(
    'update:checkboxes',
    props.rows.map((_, idx) => {
      if (index === idx) return !props.checkboxes[idx]
      else return props.singleCheckbox ? false : props.checkboxes[idx]
    })
  )
  console.log('NOTALL', props.rows)
}

const targetElement = document.documentElement

const height = ref(500)
const minHeight = ref(0)

const tooltip = ref({
  top: 0,
  left: 0,
  right: undefined,
  msg: '',
  isActive: false,
})

const ro = new ResizeObserver((entries) => {
  entries.forEach((entry) => {
    const v = window.innerHeight - tableRef.value.offsetTop - 30
    if (props.tableHeight) {
      height.value = props.tableHeight === 'auto' ? 'auto' : props.tableHeight + 'px'
    } else {
      if (v < 300) {
        height.value = 300 + 'px'
      } else {
        height.value = v + 'px'
      }
    }
    tooltip.value.isActive = false
  })
})

const handleClickTooltip = (e, msg) => {
  tooltip.value.isActive = !tooltip.value.isActive

  if (msg) {
    tooltip.value.msg = msg
  }

  if (e.pageX + 360 > window.innerWidth) {
    tooltip.value.left = undefined
    tooltip.value.right = window.innerWidth - e.pageX - 10
    // 이대로 하면 약간 간격이 생겨서 -10 줌
    tooltip.value.top = e.pageY
  } else {
    tooltip.value.right = undefined
    tooltip.value.left = e.pageX
    tooltip.value.top = e.pageY
  }
}

// hover를 구현할 수 있으나 click과 병행해서 쓰려면 지저분해짐.

// const handleHoverTooltip = (e, msg) => {
//   tooltip.value.isActive = true

//   if (msg) {
//     tooltip.value.msg = msg
//   }

//   if (e.pageX + 360 > window.innerWidth) {
//     tooltip.value.left = undefined
//     tooltip.value.right = window.innerWidth - e.pageX - 10
//     // 이대로 하면 약간 간격이 생겨서 -10 줌
//     tooltip.value.top = e.pageY
//   } else {
//     tooltip.value.right = undefined
//     tooltip.value.left = e.pageX
//     tooltip.value.top = e.pageY
//   }
// }

// const handleLeaveTooltip = () => {
//   tooltip.value.isActive = false

//   if (msg) {
//     tooltip.value.msg = ''
//   }

//   tooltip.value.right = undefined
//   tooltip.value.left = undefined
//   tooltip.value.top = undefined
// }

onMounted(() => {
  ro.observe(targetElement)
  onClickOutside(tooltipRef, (event) => (tooltip.value.isActive = false))
})
onBeforeUnmount(() => {
  ro.disconnect(targetElement)
})

const isSpanHeader = computed(() => !!computedHeaders.value?.[0]?.PX_SPAN)
</script>

<template>
  <div
    ref="tableRef"
    class="px-table"
    :style="isMobile ? `` : tableHeight ? `overflow-y:auto; height : ${height};` : `overflow-y:auto; max-height : ${height}; min-height : 30px`"
  >
    <div v-if="useMobile && isMobile">
      <div v-for="(row, rowIndex) in rows" :key="row">
        <slot name="mobile" :row="row" :index="rowIndex"></slot>
      </div>
    </div>
    <table v-else>
      <thead ref="theadRef">
        <!-- 해더 스팬이 있다면 두번 돌아야 한다 -->
        <tr v-for="spanIndex in isSpanHeader ? [0, 1] : [0]">
          <template v-if="hasCheckboxes">
            <!-- 해더 Checkbox 는 따로 정보가 넘어오지 않고 그냥 isSpanHeader 이라면 rowspan을 2를 넣는다 -->
            <th v-if="spanIndex === 0" class="hasCheckboxes" :class="[{ isNarrow: narrow }]" nowrap :rowspan="isSpanHeader ? 2 : undefined">
              <PxCheckbox :id="`${id}_checkAll`" :disabled="singleCheckbox" v-model="checkedAll" @update:modelValue="handleCheckAll" />
            </th>
          </template>
          <template v-for="(header, headerIndex) in computedHeaders" :key="header">
            <!--  isSpanHeader 이고 skip이면 생략 -->
            <template v-if="isSpanHeader && header.PX_SPAN[spanIndex].skip"></template>
            <!--  isSpanHeader 이고 colspan이면 span값 넣어주고 라벨 넣고 중앙 정렬 -->
            <th
              v-else-if="isSpanHeader && header.PX_SPAN[spanIndex].colspan"
              :colspan="header.PX_SPAN[spanIndex].colspan"
              :style="'text-align: center'"
              :class="header.class ? header.class : ''"
            >
              {{ header.PX_SPAN[spanIndex].label }}
            </th>
            <!-- 나머지는 슬롯 해더인데 혹시 rowspan있으면 값 넣어준다 -->
            <th
              v-else-if="header.headerSlotId"
              :class="header.class ? header.class : ''"
              :rowspan="(isSpanHeader && header.PX_SPAN[spanIndex].rowspan) || undefined"
            >
              <slot :name="header.headerSlotId" :header="header" :index="headerIndex"></slot>
              <div class="px-table--tooltip" v-if="header.tooltip">
                <div class="tooltipIcon" @click="handleClickTooltip($event, header.tooltip)"></div>
              </div>
            </th>
            <!-- 나머지는 일반 해더인데 혹시 rowspan있으면 값 넣어준다 -->
            <th
              :class="[{ isNarrow: narrow }, header.class ? header.class : '']"
              nowrap
              v-else
              :rowspan="(isSpanHeader && header.PX_SPAN[spanIndex].rowspan) || undefined"
            >
              <a
                @click="handleClickHeader(header, headerIndex)"
                class="px-table--header"
                :class="[{ hasSort: !!header.sort }, { center: header.align === 'center' }, { right: header.align === 'right' }]"
              >
                <span class="px-table--header_label" v-html="header.label"></span>
                <template v-if="header.sort">
                  <span v-if="header.sortStatus === 'asc'" class="px-table--sort_asc"> </span>
                  <span v-else-if="header.sortStatus === 'desc'" class="px-table--sort_desc"> </span>
                  <span v-else class="px-table--sort_neutral"> </span>
                </template>
                <div class="px-table--tooltip" v-if="header.tooltip">
                  <div class="tooltipIcon" @click.stop="handleClickTooltip($event, header.tooltip)"></div>
                </div>
              </a>
            </th>
          </template>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in rows" :key="row" :class="[fnClass4Row ? fnClass4Row(row, rowIndex) : '']">
          <td v-if="hasCheckboxes" :class="[{ isNarrow: narrow }]" class="hasCheckboxes">
            <PxCheckbox :id="`cb_${id}_${rowIndex}`" :modelValue="checkboxes[rowIndex]" @update:modelValue="handleCheckbox(rowIndex)" />
          </td>
          <template v-for="(header, columnIndex) in computedHeaders" :key="header">
            <template v-if="row.PX_ROWSPAN?.skip?.[header.field || header.slotId]"></template>
            <td
              v-else
              :class="[
                { isNarrow: narrow },
                header.class || '',
                { center: (header.rowAlign || header.align) === 'center' },
                { right: (header.rowAlign || header.align) === 'right' },
              ]"
              :width="header.width"
              :rowspan="row.PX_ROWSPAN?.span?.[header.field || header.slotId] || undefined"
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
          </template>
        </tr>
      </tbody>
    </table>
    <template v-if="searching">
      <div class="px-table--searching">검색중입니다.</div>
    </template>
    <template v-else-if="rows.length === 0">
      <div class="px-table--empty">{{ emptyText }}</div>
    </template>

    <div
      ref="tooltipRef"
      v-if="tooltip.isActive"
      class="tooltipDesc"
      :style="{ top: tooltip.top + 'px', left: tooltip.left + 'px', right: tooltip.right + 'px' }"
      v-html="tooltip.msg"
    ></div>
  </div>
</template>
