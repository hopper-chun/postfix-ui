<script setup>
import _ from 'lodash'
import { ref, computed, onMounted, onUnmounted, useSlots } from 'vue'
import { IconEllipsisVertical } from '@/components/icon'
import { RmCheckbox } from '@/components/form/checkbox'
import { RmButton } from '@/components/element/button'
// import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'

const props = defineProps({
  modelValue: { type: Array, required: true },
  optionsLabel: { type: Function, default: (option) => option },
  optionsValue: { type: Function, default: (option) => option },
  optionsSetValue: {
    type: Function,
    default: (option, checked) => {
      option = checked
    },
  },
  optionsDisabled: { type: Function },
  theme: { type: Object, default: () => ({ py: 'py-2' }) },
  py: { type: String, default: () => 'py-2' },
  textSize: { type: String, default: () => 'text-base sm:text-sm' },
  foucsRingOffset: { type: String, default: 'focus:ring-offset-2' },
  iconSize: { type: String, default: 'h-5 h-5' },
  width: { type: String, default: 'w-56' },
})
const emit = defineEmits(['update:modelValue', 'onReset'])
const slots = useSlots()

const local = ref([])

const isMinimal = computed(() => {
  return !slots.default
})

const open = ref(false)

const handleOpen = () => {
  local.value = _.cloneDeep(props.modelValue)
  open.value = !open.value
}

const handleClick = (mode) => {
  if (mode === 'save') {
    emit('update:modelValue', local.value)
  }
  if (mode === 'reset') {
    emit('onReset')
  }
  open.value = false
}
const dropdown = ref(null)
const clickHandler = 'ontouchstart' in document.documentElement ? 'touchstart' : 'click'
const outsideClick = (e) => {
  if (!dropdown.value.contains(e.target)) {
    open.value = false
  }
}
onMounted(() => {
  window.addEventListener(clickHandler, outsideClick)
})

onUnmounted(() => {
  window.removeEventListener(clickHandler, outsideClick)
})
</script>

<template>
  <div class="relative" ref="dropdown">
    <button @click="handleOpen">
      <IconEllipsisVertical class="w-[24px] text-slate-600"></IconEllipsisVertical>
    </button>
    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div v-if="open" class="absolute top-[100%] right-0 w-[220px] border border-gray-200 shadow-lg">
        <div class="max-h-[160px] overflow-y-auto bg-white px-[10px]">
          <div v-for="item in local" class="flex h-[36px] items-center">
            <RmCheckbox :id="item.label" v-model="item.using" :disabled="optionsDisabled(item)">
              <span class="text-[14px]">{{ optionsLabel(item) }}</span></RmCheckbox
            >
          </div>
        </div>
        <div class="flex h-[52px] items-center justify-between border-t bg-white px-[16px]">
          <div>
            <RmButton size="sm" color="transparent-gray" isFull class="w-[54px]">
              <span class="text-[12px] text-gray-600" @click="handleClick('reset')">초기화</span>
            </RmButton>
          </div>
          <div class="flex items-center space-x-[8px]">
            <RmButton color="transparent-gray" isFull class="w-[54px]" @click="handleClick('cancel')"> <span class="text-gray-600">취소</span></RmButton>
            <RmButton isFull class="w-[54px]" @click="handleClick('save')"> 저장 </RmButton>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
