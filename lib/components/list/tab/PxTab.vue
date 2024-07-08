<script setup>
import { useTab } from '@/composables'

const props = defineProps({
  modelValue: { type: [Object, String, Number, Boolean], required: true },
  options: { type: Array, required: true },
  optionsLabel: { type: Function, default: (option) => option },
  optionsValue: { type: Function, default: (option) => option },
})
const emit = defineEmits(['update:modelValue'])

const { handleChange } = useTab(emit)
</script>

<template>
  <div>
    <nav class="px-tab" aria-label="Tabs">
      <template v-for="(option, index) in options" :key="optionsValue(option)">
        <template v-if="option.path">
          <router-link
            :to="{ path: option.path }"
            class="px-tab--list"
            :aria-current="modelValue === optionsValue(option, index) ? 'page' : undefined"
            :class="[{ selected: modelValue === optionsValue(option, index) }]"
          >
            <div class="px-tab--text">
              {{ optionsLabel(option) }}
            </div>
          </router-link>
        </template>
        <template v-else>
          <button
            class="px-tab--list"
            @click="handleChange(optionsValue(option, index))"
            :aria-current="modelValue === optionsValue(option, index) ? 'page' : undefined"
            :class="[{ selected: modelValue === optionsValue(option, index) }]"
          >
            <div class="px-tab--text">
              {{ optionsLabel(option) }}
            </div>
          </button>
        </template>
      </template>
    </nav>
  </div>
</template>
