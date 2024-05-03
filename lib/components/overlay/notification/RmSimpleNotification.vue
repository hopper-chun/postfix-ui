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
  <div aria-live="assertive" class="rm-simpleNotification">
    <div class="rm-simpleNotification--container">
      <transition
        enter-active-class="transition_enter_active"
        enter-from-class="transition_enter_from"
        enter-to-class="transition_enter_to"
        leave-active-class="transition_leave_active"
        leave-from-class="transition_leave_from"
        leave-to-class="transition_leave_to"
      >
        <div v-if="show" class="rm-simpleNotification--wrapper">
          <div class="rm-simpleNotification--icon"></div>
          <div class="rm-simpleNotification--text">
            <p class="rm-simpleNotification--title">{{ title }}</p>
            <p class="rm-simpleNotification--desc">{{ desc }}</p>
          </div>
          <div @click="show = false" class="rm-simpleNotification--close"></div>
        </div>
      </transition>
    </div>
  </div>
</template>
