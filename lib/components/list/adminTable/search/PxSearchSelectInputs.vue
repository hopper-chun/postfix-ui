<script setup>
import _ from 'lodash'
import { computed, ref } from 'vue'

import PxSelectInputRadioCheck from './components/PxSelectInputRadioCheck.vue'
import { date8 } from '../../../../filters'

const props = defineProps({
  filters: { type: Array, required: true },
  filterTypes: { type: Array, required: true },
  buttonSize: { type: String },
})

const emit = defineEmits(['onAppendQuerys', 'onRemoveQuery', 'onSearch'])

const selectInputRadioCheckRef = ref(null)

const remainedFilterTypes = computed(() => {
  if (props.filters.length === 0) {
    return props.filterTypes
  }

  const lastOne = props.filters[props.filters.length - 1][0]

  const onePick = props.filterTypes.filter((ft) => ft.key === lastOne.key)
  const others = props.filterTypes.filter((ft) => ft.key !== lastOne.key)

  return onePick.concat(others)

  // 아래는 기존의 검색하면 필드가 빠지는 방식
  // return props.filterTypes.filter((ft) => props.filters.findIndex((filter) => ft.key === filter[0].key) === -1)
})

const filters4Display = computed(() =>
  props.filters.map((filter) => {
    const { key, title, group, options } = filter[0]
    let value = filter[1]
    if (group === 'check') {
      value = value
        .split(',')
        .map((arg) => options.find((option) => option[0] === arg)[1])
        .join(',')
    } else if (group === 'radio') {
      value = options.find((option) => option[0] === value)[1]
    } else if (group === 'select') {
      value = options.find((option) => option[0] === value)[1]
    } else if (group === 'date') {
      const splited = value.split(',')
      if (splited.length === 2) {
        splited[0] = date8(splited[0])
        splited[1] = date8(splited[1])
        value = splited.join(' ~ ')
      }
      // } else if (group === 'datepicker') {
      //   console.log('value', value)
      //   // const splited = value.split(',')
      //   // if (splited.length === 2) {
      //   //   splited[0] = filters.date8(splited[0])
      //   //   splited[1] = filters.date8(splited[1])
      //   //   value = splited.join(' ~ ')
      //   // }
    }
    return { key, title, value }
  })
)

const handleRemove = (key) => {
  emit('onRemoveQuery', key)

  // props.searchFilter.clearQuery(searchs.value[index].option)
}

const handleReset = () => {
  emit('onRemoveQuery')
}

const handleSearch = () => {
  const ret = selectInputRadioCheckRef.value.search()

  // ret가 true면.. 잘 했다는건데 왜 !ret 이렇게 코딩했는지 기억이 안남 2025-01-26
  // if (!ret) {
  emit('onSearch')
  // }
}
</script>

<template>
  <div class="px-searchSelectInputs">
    <div class="px-searchSelectInputs--field" v-if="remainedFilterTypes.length > 0">
      <PxSelectInputRadioCheck
        ref="selectInputRadioCheckRef"
        style="flex: 1 1 0%"
        v-bind="$attrs"
        :options="_.cloneDeep(remainedFilterTypes)"
        @onKeyDownEnter="handleSearch"
        @onAppendQuerys="emit('onAppendQuerys', $event)"
      ></PxSelectInputRadioCheck>
      <PxButton :size="buttonSize" color="sec" @click="handleSearch">검색</PxButton>
      <PxButton :size="buttonSize" color="gray" class="clear" @click="handleReset">초기화</PxButton>
    </div>

    <template v-if="filters4Display.length > 0">
      <div class="px-searchSelectInputs--query">
        <div class="query_container">
          <div v-for="filter in filters4Display" class="query_list">
            <div class="query_text">
              <div class="title">{{ filter.title }}</div>
              <div class="value">{{ filter.value }}</div>
            </div>
            <div class="remove" @click="handleRemove(filter.key)">
              <!-- <PxIcon name="icon-close" class="w-[12px] cursor-pointer"></PxIcon> -->
            </div>
          </div>
        </div>
        <PxButton v-if="remainedFilterTypes.length === 0" size="xs" color="gray" class="clear" @click="handleReset">초기화</PxButton>
      </div>
    </template>
  </div>
</template>
