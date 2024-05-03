<script setup>
import { ref, computed, watch } from 'vue'
import { RmCheckbox } from '@/components'

const props = defineProps({
  headers: { type: Array, required: true },
  rows: { type: Array, required: true },
  isNarrow: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  checkboxes: { type: [Array, null], default: () => null },
  isSingleCheckbox: { type: Boolean, default: false },
  emptyText: { type: String, default: '표시할 정보가 없습니다.' },
  class4Row: { type: Function },
})

const emit = defineEmits(['onClickHeader', 'update:checkboxes'])

const checkedAll = ref(false)
const computedHeaders = computed(() => props.headers.filter((header) => (header.hasOwnProperty('using') ? header.using : true)))
const hasCheckboxes = computed(() => props.checkboxes !== null)

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
const handleCheckbox = (index) => {
  emit(
    'update:checkboxes',
    props.rows.map((_, idx) => {
      if (index === idx) return !props.checkboxes[idx]
      else return props.isSingleCheckbox ? false : props.checkboxes[idx]
    })
  )
}
</script>

<template>
  <div class="overflow-x-auto">
    <table class="min-w-full">
      <thead class="bg-gray-50">
        <tr class="text-left text-black">
          <th v-if="hasCheckboxes" class="flex h-[48px] items-center justify-center" :class="isNarrow ? 'py-[4px] pl-[8px]' : 'py-[8px] pl-[8px]'" nowrap>
            <RmCheckbox id="checkAll" :disabled="isSingleCheckbox" v-model="checkedAll" @update:modelValue="handleCheckAll" />
          </th>
          <th
            class="h-[48px] font-normal"
            :class="[isNarrow ? 'py-[4px]' : 'px-[24px] py-[8px]']"
            v-for="(header, headerIndex) in computedHeaders"
            :key="header"
            nowrap
          >
            <a
              @click="handleClickHeader(header, headerIndex)"
              class="flex select-none items-center space-x-[16px]"
              :class="[
                !!header.sort ? 'cursor-pointer hover:text-gray-900' : '',
                { 'justify-center': header.align === 'center' },
                { 'justify-end': header.align === 'right' },
                { 'pl-[8px]': headerIndex === 0 },
                { 'pr-[16px]': headerIndex !== computedHeaders.length - 1 },
              ]"
            >
              <span class="mr-2 text-center" v-html="header.label"></span>
              <template v-if="header.sort">
                <span v-if="header.sortStatus === 'asc'">
                  <svg class="text-gray-900-noop h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                  </svg>
                </span>
                <span v-else-if="header.sortStatus === 'desc'">
                  <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
                <span v-else>
                  <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                  </svg>
                </span>
              </template>
            </a>
          </th>
        </tr>
      </thead>
      <tbody class="border-b border-[#E5E5E5]">
        <tr v-for="(row, rowIndex) in rows" :key="row" class="h-[48px] space-x-[16px] border-t border-[#E5E5E5]" :class="[class4Row ? class4Row(row) : '']">
          <td v-if="hasCheckboxes" :class="isNarrow ? 'py-[4px] pl-[8px]' : 'py-[8px] pl-[8px]'" class="h-[48px]">
            <RmCheckbox :id="`cb_${rowIndex}`" :modelValue="checkboxes[rowIndex]" @update:modelValue="handleCheckbox(rowIndex)" />
          </td>
          <td
            class="leading-[19px]"
            :class="[
              isNarrow ? '' : 'px-[24px] py-[8px]',
              header.class || '',
              { 'text-center': header.align === 'center' },
              { 'text-right': header.align === 'right' },
            ]"
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
            <span v-else class="whitespace-nowrap">{{
              (row.$display && row.$display[header.field]) || (header.filter ? header.filter(row[header.field]) : row[header.field])
            }}</span>
          </td>
        </tr>
      </tbody>
    </table>
    <template v-if="rows.length === 0">
      <div class="border-t border-[#E5E5E5] bg-gray-50 text-center text-sm text-gray-400">{{ emptyText }}</div>
    </template>
  </div>
</template>
