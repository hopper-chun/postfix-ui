<script setup>
import { toRefs } from 'vue'
import { useNotification } from '@/composables'

const props = defineProps({
  modelValue: { type: Boolean, required: true },
  expireTime: { type: [String, Number], default: 0 },
  title: { type: String },
  desc: { type: String },
})
const emit = defineEmits(['update:modelValue'])

const { modelValue, expireTime } = toRefs(props)
const { show } = useNotification({ modelValue, expireTime }, emit)
</script>
<template>
  <div aria-live="assertive" class="px-simpleNotification">
    <div class="px-simpleNotification--container">
      <transition
        enter-active-class="transition_enter_active"
        enter-from-class="transition_enter_from"
        enter-to-class="transition_enter_to"
        leave-active-class="transition_leave_active"
        leave-from-class="transition_leave_from"
        leave-to-class="transition_leave_to"
      >
        <div v-if="show" class="px-simpleNotification--wrapper">
          <div class="px-simpleNotification--icon"></div>
          <div class="px-simpleNotification--text">
            <p class="px-simpleNotification--title">{{ title }}</p>
            <p class="px-simpleNotification--desc">{{ desc }}</p>
          </div>
          <div @click="show = false" class="px-simpleNotification--close"></div>
        </div>
      </transition>
    </div>
  </div>
</template>
