<script setup>
import { toRefs, ref, onMounted, computed, watchEffect, nextTick, useSlots } from 'vue'
import { useError, useInput, useTheme, useFunctionRef, useMakeId } from '@/composables'
import HelperText from '@/components/form/components/HelperText.vue'
import RmLabel from '@/components/element/label/RmLabel.vue'

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
  helperIcon: { type: Boolean, default: false },
  inputIcon: { type: Boolean, default: false },
  unit: { type: String },
  clear: { type: Boolean, default: false },
  showPassword: { type: Boolean, default: false },
  maxLength: { type: [String, Number] },
  cursorless: { type: Boolean, default: false },
  viewMode: { type: Boolean, default: false },
  maxCount: { type: Number },
})
const emit = defineEmits(['update:modelValue', 'onBlur'])
const slots = useSlots()
const unitWidth = ref(0)
const unitPadding = computed(() => {
  return 20 + unitWidth.value + 'px'
})

const prefixWidth = ref(0)
const prefixPadding = computed(() => {
  if (!!slots.prefix) {
    return 14 + prefixWidth.value + 'px'
  } else {
    return ''
  }
})

const handleClear = () => {
  localValue.value = ''
  emit('update:modelValue', localValue.value)
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
// 반응성을 주기 위해 useTheme에 넘기는 데이터를 computed로 하였음. 그 이유로 usetheme에서 보내는 theme 자체도 usetheme 안에서 computed로 인해 reactivity를 가지며, .value를 붙여야 함

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
  <div class="rm-input" :class="{ row: label }">
    <template v-if="viewMode">
      <div class="rm-input--view" :class="[{ viewMode }]">
        <RmLabel :id="id" :label="label" :labelHelper="labelHelper"> </RmLabel>

        <div v-if="format" class="rm-input--view_text">
          <span>
            <slot name="prefix"></slot>
          </span>
          {{ format(modelValue) }} {{ unit ? unit : null }}
        </div>
        <div v-else class="rm-input--view_text">{{ modelValue }} {{ unit ? unit : null }}</div>
      </div>
    </template>
    <template v-else>
      <div class="rm-input--edit">
        <RmLabel :label="label" :labelHelper="labelHelper" :required="required" :id="randomId"></RmLabel>

        <div class="relative">
          <input
            :ref="inputRefFunc"
            :id="randomId"
            :style="`padding-right:${unitPadding}; padding-left:${prefixPadding}`"
            class="rm-input--field"
            :class="[{ disabled }, { error }, { inputIcon }]"
            :type="type"
            :placeholder="placeholder"
            :disabled="disabled"
            :value="localValue"
            @input="handleInput($event, { numberOnly, maxCount })"
            @focus="handleFocus"
            @blur="handleBlur"
            @focusout="isHashtag ? handleHashtags($event, isHashtag) : handleFocusout()"
            @keyup.space="isHashtag ? handleHashtags($event, isHashtag) : handleKeyupPress()"
            autocomplete="off"
            :maxlength="maxLength"
          />
          <div :ref="prefixRefFunc" class="rm-input--prefix">
            <slot name="prefix"></slot>
          </div>
          <div :ref="unitRefFunc" class="rm-input--funcWrapper">
            <div v-if="unit" class="rm-input--unit">{{ unit }}</div>
            <div class="rm-input--button">
              <button v-if="showPassword" @click="handleShow" class="show_password">
                <div v-if="passwordInputState === 'password'" class="show_password__icon pw_show"></div>
                <div v-else class="show_password__icon pw_hidden"></div>
              </button>

              <button v-if="clear" @click="handleClear" class="clear">
                <div class="clear__icon"></div>
                <!-- <IconCloseCircleFilled class="w-[16px] text-black/30"></IconCloseCircleFilled> -->
              </button>
            </div>
          </div>
          <div v-if="inputIcon" class="rm-input--inputIcon">
            <slot name="inputIcon"></slot>
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
