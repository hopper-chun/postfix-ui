<script setup>
import { toRefs, ref, onMounted, computed, watchEffect, nextTick, useSlots } from 'vue'
import { useError, useInput, useFunctionRef, useMakeId } from '@/composables'
import HelperText from '@/components/form/components/HelperText.vue'

const props = defineProps({
  id: { type: String },
  label: { type: String },
  type: { type: String, default: 'text' },
  modelValue: { type: [String, Number] },
  disabled: { type: Boolean, default: false },
  placeholder: { type: String },
  required: { type: Boolean, default: false },
  format: { type: Function, default: (o) => o },
  labelHelper: { type: String },
  helperText: { type: String },
  numberOnly: { type: Boolean, default: false },
  unit: { type: String },
  clear: { type: Boolean, default: false },
  showPassword: { type: Boolean, default: false },
  maxLength: { type: [String, Number] },
  viewMode: { type: Boolean, default: false },
  maxCount: { type: Number },
  inputFilter: { type: String },
  hover: { type: Boolean, default: true },
  isDatePicker: { type: Boolean, default: false },
})

const emit = defineEmits(['update:modelValue', 'onBlur', 'onClear'])
const slots = useSlots()
const unitWidth = ref(0)
const unitPadding = computed(() => {
  if (props.unit || props.clear || props.showPassword) {
    return 20 + unitWidth.value + 'px'
  } else {
    return ''
  }
})

const prefixWidth = ref(0)
const prefixPadding = computed(() => {
  if (!!slots.prefix) {
    return 14 + prefixWidth.value + 'px'
  } else {
    return ''
  }
})

const handleClear = (e) => {
  emit('onClear', e)

  // localValue.value = ''
  // emit('update:modelValue', localValue.value)
}

const passwordInputState = ref('password')
const handleShow = () => {
  if (inputRef.value.type === 'password') {
    inputRef.value.type = 'text'
    passwordInputState.value = 'text'
  } else if (inputRef.value.type === 'text') {
    inputRef.value.type = 'password'
    passwordInputState.value = 'password'
  }
}
const { functionRef: prefixRefFunc, element: prefixRef } = useFunctionRef()
const { functionRef: unitRefFunc, element: innerRef } = useFunctionRef()
const { functionRef: inputRefFunc, element: inputRef } = useFunctionRef()

const { id, modelValue, format } = toRefs(props)
const { error } = useError(id, inputRef)
const { localValue, handleInput, handleFocus, handleBlur, handleHashtags, handleFocusout, handleKeyupPress } = useInput(id, modelValue, format, emit)

const unitObserver = new ResizeObserver((entries) => {
  if (entries.length === 0) {
    return
  }
  unitWidth.value = entries[0].contentRect.width
})

const prefixObserver = new ResizeObserver((entries) => {
  if (entries.length === 0) {
    return
  }
  prefixWidth.value = entries[0].contentRect.width
})

onMounted(() => {
  // resizeObserver.observe(innerRef.value)
  watchEffect(() => {
    if (props.viewMode) {
      unitObserver.disconnect()
      prefixObserver.disconnect()
    } else {
      nextTick(() => {
        unitObserver.observe(innerRef.value)
        prefixObserver.observe(prefixRef.value)
      })
    }
  })
})

const randomId = useMakeId()
</script>

<template>
  <div class="px-input">
    <template v-if="viewMode">
      <div class="px-input--view" :class="[{ viewMode }]">
        <PxLabel :id="id" :label="label" :labelHelper="labelHelper"> </PxLabel>

        <div v-if="format" class="px-input--view_text">
          <span>
            <slot name="prefix"></slot>
          </span>
          {{ format(modelValue) }} {{ unit ? unit : null }}
        </div>
        <div v-else class="px-input--view_text">{{ modelValue }} {{ unit ? unit : null }}</div>
      </div>
    </template>
    <template v-else>
      <div class="px-input--edit">
        <div style="position: relative">
          <div class="px-input--labelwrapper">
            <PxLabel :label="label" :hover="hover" :labelHelper="labelHelper" :required="required" :id="randomId" style="flex: 1 1 0">
              <template v-if="!!slots.tooltip" #tooltip>
                <slot name="tooltip"></slot>
              </template>
            </PxLabel>
          </div>

          <div style="position: relative">
            <input
              :ref="inputRefFunc"
              :id="randomId"
              :style="`padding-right:${unitPadding}; padding-left:${prefixPadding}`"
              class="px-input--field"
              :class="[{ disabled }, { error }, { inputIcon: !!slots.inputIcon }]"
              :type="type"
              :placeholder="placeholder"
              :disabled="disabled"
              :value="localValue"
              @input="handleInput($event, { numberOnly, maxCount, inputFilter })"
              @focus="handleFocus"
              @blur="handleBlur"
              @focusout="isHashtag ? handleHashtags($event, isHashtag) : handleFocusout()"
              @keyup.space="isHashtag ? handleHashtags($event, isHashtag) : handleKeyupPress()"
              autocomplete="off"
              :maxlength="maxLength"
            />
            <div :ref="prefixRefFunc" class="px-input--prefix">
              <slot name="prefix"></slot>
            </div>
            <div :ref="unitRefFunc" class="px-input--funcWrapper">
              <div v-if="unit" class="px-input--unit">{{ unit }}</div>
              <div class="px-input--button">
                <button v-if="showPassword" @click="handleShow" class="show_password">
                  <div v-if="passwordInputState === 'password'" class="show_password__icon pw_show"></div>
                  <div v-else class="show_password__icon pw_hidden"></div>
                </button>

                <button v-if="clear" @click="handleClear" class="clear">
                  <div class="clear__icon"></div>
                  <!-- <IconCloseCircleFilled class="w-[16px] text-black/30"></IconCloseCircleFilled> -->
                </button>
                <button v-if="isDatePicker" class="date">
                  <div class="date__icon"></div>
                </button>
              </div>
            </div>
            <div v-if="!!slots.inputIcon" class="px-input--inputIcon">
              <slot name="inputIcon"></slot>
            </div>
          </div>
        </div>
        <div>
          <!-- this is empty div for align of lower textSpace and label -->
        </div>
        <HelperText :id="id" :error="error" :helperText="helperText" :helperIcon="helperIcon" :maxLength="maxLength" :localValue="localValue">
          <template #helperIcon> <slot name="helperIcon"></slot> </template>
        </HelperText>
      </div>
    </template>
  </div>
</template>
