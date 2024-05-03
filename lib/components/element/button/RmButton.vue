<script setup>
import { computed, watchEffect } from 'vue'
import { useTheme } from '@/composables'
const props = defineProps({
  type: { type: String, default: 'button' },
  color: { type: String, default: 'pri' },
  size: { type: String, default: 'nm' },
  // styles: { type: Object },
  disabled: { type: Boolean },
  isWide: { type: Boolean },
  rounded: { type: Boolean },
  isDoing: { type: Boolean },
  hasLabel: { type: Boolean },
})
</script>

<template>
  <template v-if="hasLabel">
    <div>
      <RmLabel label="&nbsp;"></RmLabel>
      <button
        :type="type"
        class="rm-btn"
        :disabled="disabled || isDoing"
        :class="[{ isWide: isWide }, { disabled: disabled || isDoing }, { rounded: rounded }, color, size]"
      >
        <div v-if="isDoing" style="flex-shrink: 0; display: flex; align-items: center">
          <div class="SEARCHING">
            <RmIcon name="icon-refresh" class="rm-adminTable--refresh_icon"></RmIcon>
          </div>
        </div>
        <div v-else style="flex-shrink: 0; display: flex; align-items: center">
          <slot></slot>
        </div>
      </button>
    </div>
  </template>
  <button
    v-else
    :type="type"
    class="rm-btn"
    :disabled="disabled || isDoing"
    :class="[{ isWide: isWide }, { disabled: disabled || isDoing }, { rounded: rounded }, color, size]"
  >
    <div v-if="isDoing" style="flex-shrink: 0; display: flex; align-items: center">
      <div class="SEARCHING">
        <RmIcon name="icon-refresh" class="rm-adminTable--refresh_icon"></RmIcon>
      </div>
    </div>
    <div v-else style="flex-shrink: 0; display: flex; align-items: center">
      <slot></slot>
    </div>
  </button>
</template>
