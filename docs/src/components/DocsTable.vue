<script setup>
import { computed } from "vue";

const props = defineProps({
  headers: { type: Array, required: true },
  rows: { type: Array, required: true },
  emptyText: { type: String, default: "표시할 정보가 없습니다." },
});

const tableHeaders = computed(() =>
  props.headers.map((header, index) => ({
    ...header,
    slotId: `docs-table-cell-${index}`,
  })),
);
</script>

<template>
  <div class="docs-table-wrap">
    <PxTable
      class="docs-table"
      :headers="tableHeaders"
      :rows="rows"
      :emptyText="emptyText"
      tableHeight="auto"
    >
      <template
        v-for="header in tableHeaders"
        :key="header.field"
        #[header.slotId]="{ row, index }"
      >
        <slot
          :name="`cell-${header.field}`"
          :row="row"
          :index="index"
          :value="row[header.field]"
        >
          <code v-if="header.code">{{ row[header.field] }}</code>
          <span v-else-if="header.html" v-html="row[header.field]"></span>
          <span v-else>{{ row[header.field] }}</span>
        </slot>
      </template>
    </PxTable>
  </div>
</template>
