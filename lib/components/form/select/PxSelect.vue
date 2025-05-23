<script setup>
import { toRefs, ref, onMounted, onUnmounted, useSlots } from 'vue'
import { useError, useSelect, useFunctionRef, useMakeId } from '@/composables'
import HelperText from '@/components/form/components/HelperText.vue'

const props = defineProps({
  label: { type: String },
  id: { type: String },
  disabled: { type: Boolean, default: false },
  modelValue: { type: [String, Number, Object], required: true },
  defaultLabel: { type: String, default: '카테고리를 선택해주세요' },
  labelHelper: { type: String },
  helperText: { type: String },
  required: { type: Boolean },
  options: { type: Array, required: true },
  optionsLabel: { type: Function, default: (option) => option },
  optionsValue: { type: Function, default: (option) => option },
  viewMode: { type: Boolean },
  hover: { type: Boolean, default: true },
  disabledValue: { type: Array }, // 배열로 value에 해당하는 값을 지정하면, 해당 값은 옵션 리스트 창에서 비활성화 됨
  md: { type: String },
})

const emit = defineEmits(['update:modelValue', 'onClickTooltip'])
const slots = useSlots()

const { functionRef: containerRefFunc, element: containerRef } = useFunctionRef()
const { functionRef: selectRefFunc, element: selectRef } = useFunctionRef()

const { id, modelValue, options } = toRefs(props)
const { error } = useError(id, selectRef)
const { localValue, handleChange } = useSelect(id, modelValue, options, props.optionsValue, emit)

const reverse = ref(false)
const isOpen = ref(false)

const handleSelect = (value) => {
  if (props.disabledValue && props.disabledValue.includes(props.optionsValue(value))) {
    return
  }
  handleChange(value)
  isOpen.value = false
}

const handleOpen = () => {
  if (!props.disabled) {
    isOpen.value = !isOpen.value

    if (containerRef.value.getBoundingClientRect().top + 380 > window.innerHeight) {
      reverse.value = true
    } else {
      reverse.value = false
    }
  }
}

const clickHandler = 'ontouchstart' in document.documentElement ? 'touchstart' : 'click'

const outsideClick = (e) => {
  if (!props.viewMode) {
    if (!containerRef.value.contains(e.target)) {
      isOpen.value = false
    }
  }
}

onMounted(() => {
  window.addEventListener(clickHandler, outsideClick)
})

onUnmounted(() => {
  window.removeEventListener(clickHandler, outsideClick)
})
const randomId = useMakeId()

// 클릭할 때, 이놈의 offsetTop + 높이가 screenHeight를 넘어서면 메뉴가 위에서 뜨게?
</script>

<template>
  <div class="px-select">
    <template v-if="viewMode">
      <div class="px-select--view labelSwitch" :class="[{ viewMode }]">
        <PxLabel :md="md" :id="id" :label="label" :labelHelper="labelHelper"> </PxLabel>
        <div class="px-input--view_text">{{ optionsLabel(localValue) }}</div>
      </div>
    </template>
    <template v-else>
      <div class="px-select--edit" :ref="containerRefFunc">
        <div class="px-select--wrapper labelSwitch">
          <PxLabel
            :md="md"
            :label="label"
            :labelHelper="labelHelper"
            :required="required"
            :id="randomId"
            :hover="hover"
            @onClickTooltip="$emit('onClickTooltip', $event)"
          >
            <template v-if="!!slots.tooltip" #tooltip>
              <slot name="tooltip"></slot>
            </template>
          </PxLabel>

          <div class="px-select--input_wrapper">
            <div :ref="selectRefFunc" :id="randomId" @click="handleOpen" class="px-input--field" :class="[{ disabled }, { error }]" tabindex="0">
              <span class="px-select--header" :class="{ placeholder: !localValue }">
                <div>
                  <slot name="header" :localValue="localValue">
                    {{ optionsLabel(localValue) || defaultLabel }}
                  </slot>
                </div>
              </span>

              <div class="px-select--expand">
                <slot name="expand">
                  <PxIcon name="icon-chevron-down" style="width: 18px"></PxIcon>
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
              <div v-if="isOpen" class="px-select--options" :class="{ reverse }">
                <div
                  v-for="option in options"
                  @click="handleSelect(option)"
                  class="px-select--optionList"
                  :class="[
                    { selected: optionsLabel(localValue) === optionsLabel(option) },
                    { selectDisabled: disabledValue && disabledValue.includes(optionsValue(option)) },
                  ]"
                >
                  <slot name="option" :option="option">
                    <span class="truncate">
                      {{ optionsLabel(option) }}
                    </span>
                  </slot>
                  <span v-if="optionsLabel(localValue) === optionsLabel(option)" class="px-select--checked">
                    <slot name="checked">
                      <PxIcon name="icon-check" style="width: 18px"></PxIcon>
                    </slot>
                  </span>
                </div>
              </div>
            </transition>
          </div>
        </div>
        <HelperText :id="id" :error="error" :helperText="helperText">
          <template #helperIcon> <slot name="helperIcon"></slot> </template>
        </HelperText>
      </div>
    </template>
  </div>
</template>
