<script setup>
import { computed, ref } from 'vue'
import { RmCheckbox } from '@/components'

const props = defineProps({
  headers: { type: Array, required: true },
  rows: { type: Array, required: true },
  isNarrow: { type: Boolean, default: true },
  disabled: { type: Boolean, default: false },
  checkboxes: { type: [Array, null], default: () => null },
  emptyText: { type: String, default: '표시할 정보가 없습니다.' },
  class4Row: { type: Function },
})
const emit = defineEmits(['onCheckAll'])

// const checkedAll = ref(false)

const checkedAll = computed(() => {
  if (!props.checkboxes || !props.checkboxes.length) {
    return false
  }

  let ret = true

  props.checkboxes.forEach((row) => {
    if (Array.isArray(row)) {
      row.forEach((value) => {
        if (!value) {
          ret = false
        }
      })
    } else {
      if (!row) {
        ret = false
      }
    }
  })
  return ret
})

const handleCheckAll = (value) => {
  console.log(value)
  emit('onCheckAll', value)
}
</script>

<template>
  <div class="rm-customMergeTable">
    <table :class="[{ isNarrow }]">
      <thead>
        <tr>
          <template v-for="(header, index) in headers">
            <th v-if="header.checkbox" class="checkbox" :class="[{ isNarrow }]" nowrap>
              <RmCheckbox :modelValue="checkedAll" id="checkbox_all" @update:modelValue="handleCheckAll"></RmCheckbox>
              <!-- <input @change="handleCheckAll" :checked="checkedAll" type="checkbox" class="border-gray-300 text-[#A6DFFF] focus:ring-[#A6DFFF]" /> -->
            </th>
            <th v-else :class="[{ isNarrow }]" nowrap>
              <span class="rm-table--header_label" v-html="header.label"></span>
            </th>
          </template>
        </tr>
      </thead>
      <tbody>
        <slot></slot>
      </tbody>
    </table>
    <template v-if="rows.length === 0">
      <div class="rm-table--empty">{{ emptyText }}</div>
    </template>
  </div>
</template>
