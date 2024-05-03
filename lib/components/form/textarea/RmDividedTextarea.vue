<script setup>
import { toRefs, ref, nextTick, computed, onBeforeUpdate, onMounted, watchEffect } from 'vue'
import { useError, useTextarea, useTheme, useFunctionRef, useMakeId } from '@/composables'
import HelperText from '@/components/form/components/HelperText.vue'

const props = defineProps({
  id: { type: String },
  label: { type: String },
  modelValue: { type: [String, Number], required: true },
  disabled: { type: Boolean, default: false },
  placeholder: { type: String },
  required: { type: Boolean, default: false },
  labelHelper: { type: String },
  helperText: { type: String },
  helperIcon: { type: Boolean, default: false },
  resize: { type: Boolean, default: false },
  rows: { type: Number, default: 4 },
  maxlength: { type: [String, Number] },
  styles: { type: Object },
  autoGrow: { type: Boolean, default: false },
  horizontal: { type: Boolean },
  labelWidth: { type: Number, default: 100 },
})
const emit = defineEmits(['update:modelValue'])

const { functionRef, element } = useFunctionRef()

const { id, modelValue } = toRefs(props)
const { error } = useError(id, element)
const { localValue, handleInput } = useTextarea(id, modelValue, emit)

const theme = useTheme(computed(() => props.styles))
const regex = /[^0-9]/g
const areaHeight = ref('')

onMounted(() => {
  watchEffect(() => {
    areaHeight.value = theme.value.textarea_height.replace(regex, '')
    if (!props.autoGrow) {
      if (props.resize) {
      } else {
        element.value.style.height = `${areaHeight.value}px`
      }
    }
  })
})
const resizeHeight = () => {
  if (props.autoGrow) {
    element.value.style.height = `auto`
    element.value.style.height = `${element.value.scrollHeight + 2}px`
  }
}

const randomId = useMakeId()
</script>

<template>
  <div class="space-y-[4px]">
    <component
      :is="theme.formWrapper()"
      :horizontal="horizontal"
      :labelWidth="labelWidth"
      :label="label"
      :labelFontSize="theme.label_fontSize"
      :labelFontColor="theme.label_fontColor"
      :labelHelper="labelHelper"
      :required="required"
      :id="randomId"
    >
      <textarea
        :ref="functionRef"
        :placeholder="placeholder"
        :disabled="disabled"
        :value="localValue"
        @input="handleInput($event.target.value)"
        :id="randomId"
        :rows="rows"
        class="block w-full focus:outline-none"
        :class="[
          theme.fontSize,
          theme.text.color,
          theme.paddingX,
          theme.radius,
          theme.border,
          theme.placeholder,
          theme.textarea_height,
          theme.textarea_paddingY,
          disabled ? theme.disabled : theme.bgColor,
          !error ? ` ${theme.borderColor} ${theme.focus}` : `${theme.error.text} ${theme.error.border}`,
          resize ? '' : 'resize-none',
          autoGrow ? 'SCROLLHIDE' : '',
        ]"
        @keydown="resizeHeight"
        @keyup="resizeHeight"
        spellcheck="false"
        :maxlength="maxlength"
      ></textarea>
      <div></div>
      <HelperText :id="id" :error="error" :helperText="helperText" :helperIcon="helperIcon" :maxLength="maxlength" :localValue="localValue">
        <template #helperIcon> <slot name="helperIcon"></slot> </template>
      </HelperText>
    </component>
  </div>
</template>
<style scoped>
.SCROLLHIDE::-webkit-scrollbar {
  display: none;
}
</style>
