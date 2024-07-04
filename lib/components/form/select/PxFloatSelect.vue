<script setup>
import { toRefs, ref, onMounted, onUnmounted } from 'vue'
import { IconChevronDown } from '@/components/icon'
import { useError, useSelect, useFunctionRef, useMakeId } from '@/composables'
import HelperText from '@/components/form/components/HelperText.vue'

const props = defineProps({
  label: { type: String },
  id: { type: String },
  disabled: { type: Boolean, default: false },
  modelValue: { type: [String, Number, Object], required: true },
  labelHelper: { type: String },
  helperText: { type: String },
  helperIcon: { type: Boolean },
  required: { type: Boolean },
  options: { type: Array, required: true },
  optionsLabel: { type: Function, default: (option) => option },
  optionsValue: { type: Function, default: (option) => option },
})

const emit = defineEmits(['update:modelValue'])

const { functionRef: containerRefFunc, element: containerRef } = useFunctionRef()
const { functionRef: selectRefFunc, element: selectRef } = useFunctionRef()

const { id, modelValue, options } = toRefs(props)
const { error } = useError(id, selectRef)
const { localValue, handleChange } = useSelect(id, modelValue, options, props.optionsValue, emit)

const handleSelect = (value) => {
  handleChange(value)
  isOpen.value = false
}

const handleOpen = () => {
  if (!props.disabled) {
    isOpen.value = !isOpen.value
  }
}

const isOpen = ref(false)

const clickHandler = 'ontouchstart' in document.documentElement ? 'touchstart' : 'click'

const outsideClick = (e) => {
  if (!containerRef.value.contains(e.target)) {
    isOpen.value = false
  }
}

const randomId = useMakeId()

onMounted(() => {
  window.addEventListener(clickHandler, outsideClick)
})

onUnmounted(() => {
  window.removeEventListener(clickHandler, outsideClick)
})
</script>

<template>
  <div class="px-floatSelect" :ref="containerRefFunc">
    <div style="position: relative; user-select: none">
      <div style="position: relative">
        <div :ref="selectRefFunc" :id="randomId" @click="handleOpen" class="px-input--field" :class="[{ disabled }, { error }]" tabindex="0">
          <div class="px-floatSelect--label" :class="[{ isFloating: isOpen || localValue }]">
            {{ label }}
          </div>
          <span class="px-select--header">
            <div>
              <slot name="header" :localValue="localValue">
                {{ optionsLabel(localValue) }}
              </slot>
            </div>
          </span>

          <div class="px-select--expand">
            <slot name="expand">
              <IconChevronDown style="width: 18px"></IconChevronDown>
            </slot>
          </div>
        </div>
        <transition
          enter-active-class="transition_active"
          enter-from-class="transition_hidden"
          enter-to-class="transition_show"
          leave-active-class="transition_active"
          leave-from-class="transition_show"
          leave-to-class="transition_hidden"
        >
          <div v-if="isOpen" class="px-select--options">
            <div
              v-for="option in options"
              @click="handleSelect(option)"
              class="px-select--optionList"
              :class="[{ selected: optionsLabel(localValue) === optionsLabel(option) }]"
            >
              <slot name="option" :option="option">
                <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap">
                  {{ optionsLabel(option) }}
                </span>
              </slot>
              <span v-if="optionsLabel(localValue) === optionsLabel(option)" class="px-select--checked">
                <slot name="checked">
                  <iconCheck style="width: 18px"></iconCheck>
                </slot>
              </span>
            </div>
          </div>
        </transition>
      </div>
    </div>
    <HelperText :id="id" :error="error" :helperText="helperText" :helperIcon="helperIcon">
      <template #helperIcon> <slot name="helperIcon"></slot> </template>
    </HelperText>
  </div>
</template>
