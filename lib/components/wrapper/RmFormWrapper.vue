<script setup>
import { computed, useSlots } from 'vue'
import { useTheme } from '@/composables'

const props = defineProps({
  title: { type: String },
  grid: { type: [String, Number], default: 1 },
})

const theme = useTheme(computed(() => props.styles))

const slots = useSlots()
</script>

<template>
  <form>
    <div class="rm-formWrapper">
      <div v-if="slots.header || slots.headerButton || title" class="rm-formWrapper--header">
        <div class="header_title">
          <slot name="header">
            {{ title }}
          </slot>
        </div>
        <div class="header_button">
          <slot name="headerButton"></slot>
        </div>
      </div>
      <div class="rm-formWrapper--body">
        <div class="body_content" :style="`grid-template-columns: repeat(${grid}, minmax(0, 1fr))`">
          <slot></slot>
        </div>
      </div>
      <div
        class="rm-formWrapper--bottom_button"
        v-if="slots.bottomButton"
        :class="bottomClasses ? bottomClasses : `mt-[20px] flex flex-1 items-center justify-center ${theme.gap.sx}`"
      >
        <slot name="bottomButton"></slot>
      </div>
    </div>
  </form>
</template>
