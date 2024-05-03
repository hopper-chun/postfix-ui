<script setup>
import { watchEffect } from 'vue'
import { RmSelect } from '@/components/form/select'
import { IconChevronDown } from '@/components/icon'

const props = defineProps({
  limit: { type: [Number, String], default: '123' },
  options: { type: Array },
  defaultLabel: { type: String },
  id: { type: String },
})

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <div class="rm-adminTableSelect">
    <RmSelect
      :modelValue="limit"
      @update:modelValue="($event) => $emit('update:modelValue', $event)"
      :id="id"
      :options="options"
      :optionsLabel="(option) => option?.label"
      :optionsValue="(option) => option?.value"
      :defaultLabel="defaultLabel"
      :truncate="false"
    >
      <template #expand>
        <div>
          <IconChevronDown style="width: 12px; color: #475569"></IconChevronDown>
        </div> </template
    ></RmSelect>
  </div>
</template>
