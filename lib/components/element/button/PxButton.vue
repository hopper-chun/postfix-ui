<script setup>
const props = defineProps({
  type: { type: String, default: 'button' },
  color: { type: String, default: 'pri' },
  size: { type: String, default: 'md' },
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
      <PxLabel label="&nbsp;"></PxLabel>
      <button
        :type="type"
        class="px-btn"
        :disabled="disabled || isDoing"
        :class="[{ isWide: isWide }, { disabled: disabled || isDoing }, { rounded: rounded }, color, size]"
      >
        <div v-if="isDoing" class="px-btn--container">
          <div class="SEARCHING">
            <PxIcon name="icon-refresh" isLib class="px-adminTable--refresh_icon"></PxIcon>
          </div>
        </div>
        <div v-else class="px-btn--container">
          <slot></slot>
        </div>
      </button>
    </div>
  </template>
  <button
    v-else
    :type="type"
    class="px-btn"
    :disabled="disabled || isDoing"
    :class="[{ isWide: isWide }, { disabled: disabled || isDoing }, { rounded: rounded }, color, size]"
  >
    <div v-if="isDoing" class="px-btn--container">
      <div class="SEARCHING">
        <PxIcon name="icon-refresh" isLib class="px-adminTable--refresh_icon"></PxIcon>
      </div>
    </div>
    <div v-else class="px-btn--container">
      <slot></slot>
    </div>
  </button>
</template>
