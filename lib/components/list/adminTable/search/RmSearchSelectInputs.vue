<script setup>
import _ from 'lodash'
import { computed, ref, watchEffect } from 'vue'
import { RmButton } from '@/components/element'
import { RmIcon } from '@/components/icon'
// import filters from '@/filters'

import RmSearchForms from './components/RmSearchForms.vue'

const props = defineProps({
  filters: { type: Array, required: true },
  filterTypes: { type: Array, required: true },
})

const emit = defineEmits(['onAppendQuerys', 'onRemoveQuery', 'onSearch'])

const selectInputRadioCheckRef = ref(null)

const remainedFilterTypes = computed(() => {
  return props.filterTypes.filter((ft) => props.filters.findIndex((filter) => ft.key === filter[0].key) === -1)
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
    } else if (group === 'date') {
      const splited = value.split(',')
      if (splited.length === 2) {
        splited[0] = filters.date8(splited[0])
        splited[1] = filters.date8(splited[1])
        value = splited.join(' ~ ')
      }
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
  if (!ret) {
    emit('onSearch')
  }
}
</script>

<template>
  <div class="rm-searchSelectInputs">
    <div class="rm-searchSelectInputs--field" v-if="remainedFilterTypes.length > 0">
      <RmSearchForms
        ref="selectInputRadioCheckRef"
        style="flex: 1 1 0%"
        v-bind="$attrs"
        :options="_.cloneDeep(remainedFilterTypes)"
        @onKeyDownEnter="handleSearch"
        @onAppendQuerys="emit('onAppendQuerys', $event)"
      ></RmSearchForms>

      <RmButton size="sm" color="sec" @click="handleSearch">검색</RmButton>
      <RmButton size="sm" color="gray" class="clear" @click="handleReset">초기화</RmButton>
    </div>

    <template v-if="filters4Display.length > 0">
      <div class="rm-searchSelectInputs--query">
        <div class="query_container">
          <div v-for="filter in filters4Display" class="query_list">
            <div class="query_text">
              <div class="title">{{ filter.title }}</div>
              <div class="value">{{ filter.value }}</div>
            </div>
            <div class="remove" @click="handleRemove(filter.key)">
              <!-- <RmIcon name="icon-close" class="w-[12px] cursor-pointer"></RmIcon> -->
            </div>
          </div>
        </div>
        <RmButton v-if="remainedFilterTypes.length === 0" size="sm" color="gray" class="clear" @click="handleReset">초기화</RmButton>
      </div>
    </template>
  </div>
</template>
