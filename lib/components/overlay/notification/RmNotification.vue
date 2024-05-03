<script setup>
import { toRefs, computed } from 'vue'
import { useNotification } from '@/composables'

const props = defineProps({
  modelValue: { type: Boolean, required: true },
  expireTime: { type: [String, Number], default: 0 },
  classes: { type: [String, Array, Object] },
  innerClasses: { type: [String, Array, Object] },
})
const emit = defineEmits(['update:modelValue'])

const { modelValue, expireTime } = toRefs(props)
const { show } = useNotification({ modelValue, expireTime }, emit)
</script>

<template>
  <div
    aria-live="assertive"
    class="pointer-events-none fixed inset-0 z-30"
    :class="classes ? classes : 'flex items-end px-[16px] py-[24px] sm:items-start sm:p-[24px]'"
  >
    <div>
      <transition
        enter-active-class="transform ease-out duration-300 transition"
        enter-from-class="translate-y-[8px] opacity-0 sm:translate-y-0 sm:translate-x-[8px]"
        enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          _v-if="show"
          class="pointer-events-auto"
          :class="innerClasses ? innerClasses : 'w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5'"
        >
          <slot></slot>
        </div>
      </transition>
    </div>
  </div>
</template>
