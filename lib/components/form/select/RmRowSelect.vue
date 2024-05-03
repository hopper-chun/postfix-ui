<script setup>
import { toRefs, ref, onMounted, computed, onUnmounted, watchEffect } from 'vue'
import { IconChevronDown, IconCheck } from '@/components/icon'
import { useError, useSelect, useTheme, useFunctionRef, useMakeId } from '@/composables'
import HelperText from '@/components/form/components/HelperText.vue'
import RmLabel from '@/components/element/label/RmLabel.vue'

const props = defineProps({
  label: { type: String },
  id: { type: String },
  disabled: { type: Boolean, default: false },
  modelValue: { type: [String, Number, Object], required: true },
  defaultLabel: { type: String, default: '카테고리를 선택해주세요' },
  labelHelper: { type: String },
  helperText: { type: String },
  helperIcon: { type: Boolean },
  required: { type: Boolean },
  options: { type: Array, required: true },
  optionsLabel: { type: Function, default: (option) => option },
  optionsValue: { type: Function, default: (option) => option },
  viewMode: { type: Boolean },
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
  if (!props.viewMode) {
    if (!containerRef.value.contains(e.target)) {
      isOpen.value = false
    }
  }
}

const currentOption = computed(() => {
  let curOption
  props.options.forEach((option) => {
    if (Array.isArray(option)) {
      if (option.includes(props.modelValue)) {
        curOption = props.optionsLabel(option)
      }
    } else if (typeof option === 'string') {
      console.log('option 이 String임')
      return
    } else {
      if (props.modelValue === props.optionsValue(option)) {
        curOption = props.optionsLabel(option)
      }
    }
  })
  return curOption
})

onMounted(() => {
  window.addEventListener(clickHandler, outsideClick)
})

onUnmounted(() => {
  window.removeEventListener(clickHandler, outsideClick)
})
const randomId = useMakeId()
</script>

<template>
  <div class="rm-select" :class="{ row: label }">
    <template v-if="viewMode">
      <div class="rm-select--view" :class="[{ viewMode }]">
        <RmLabel :id="id" :label="label" :labelHelper="labelHelper"> </RmLabel>
        <div class="rm-input--view_text">{{ optionsLabel(localValue) }}</div>
      </div>
    </template>
    <template v-else>
      <div class="rm-select--edit" :ref="containerRefFunc">
        <RmLabel :label="label" :labelHelper="labelHelper" :required="required" :id="randomId"></RmLabel>
        <div class="rm-select--wrapper">
          <div>
            <div :ref="selectRefFunc" :id="randomId" @click="handleOpen" class="rm-input--field" :class="[{ disabled }, { error }]" tabindex="0">
              <span class="rm-select--header" :class="{ placeholder: !localValue }">
                <div>
                  <slot name="header" :localValue="localValue">
                    {{ optionsLabel(localValue) || defaultLabel }}
                  </slot>
                </div>
              </span>

              <div class="rm-select--expand">
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
              <div v-if="isOpen" class="rm-select--options">
                <div
                  v-for="option in options"
                  @click="handleSelect(option)"
                  class="rm-select--optionList"
                  :class="[{ selected: optionsLabel(localValue) === optionsLabel(option) }]"
                >
                  <slot name="option" :option="option">
                    <span class="truncate">
                      {{ optionsLabel(option) }}
                    </span>
                  </slot>
                  <span v-if="optionsLabel(localValue) === optionsLabel(option)" class="rm-select--checked">
                    <slot name="checked">
                      <iconCheck style="width: 18px"></iconCheck>
                    </slot>
                  </span>
                </div>
              </div>
            </transition>
          </div>
        </div>
        <div></div>
        <HelperText :id="id" :error="error" :helperText="helperText" :helperIcon="helperIcon">
          <template #helperIcon> <slot name="helperIcon"></slot> </template>
        </HelperText>
      </div>
    </template>
  </div>
</template>
