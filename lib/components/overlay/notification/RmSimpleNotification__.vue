<script setup>
import { toRefs, computed } from 'vue'
import { useNotification } from '@/composables'

const props = defineProps({
  modelValue: { type: Boolean, required: true },
  expireTime: { type: [String, Number], default: 0 },
  title: { type: String },
  desc: { type: String },
  icon: { type: String, default: 'icon-check-circle' },
  iconColor: { type: String, default: 'text-green-400' },
})
const emit = defineEmits(['update:modelValue'])

const { modelValue, expireTime } = toRefs(props)
const { show } = useNotification({ modelValue, expireTime }, emit)
</script>
<template>
  <div aria-live="assertive" class="pointer-events-none fixed inset-0 z-30 flex items-end px-[16px] py-[24px] sm:items-start sm:p-[24px]">
    <div class="flex w-full flex-col items-center space-y-[16px] sm:items-end">
      <transition
        enter-active-class="transform ease-out duration-300 transition"
        enter-from-class="translate-y-[8px] opacity-0 sm:translate-y-0 sm:translate-x-[8px]"
        enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div v-if="show" class="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <div class="p-[16px]">
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <RmIcon :name="icon" class="h-[24px] w-[24px]" :class="iconColor" />
              </div>
              <div class="ml-[12px] w-0 flex-1">
                <p class="text-sm font-medium text-gray-900">{{ title }}</p>
                <p class="mt-[4px] text-sm text-gray-500">{{ desc }}</p>
              </div>
              <div class="ml-[16px] flex flex-shrink-0">
                <button
                  @click="show = false"
                  class="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <span class="sr-only">Close</span>
                  <RmIcon name="icon-close" class="h-[20px] w-[20px]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
