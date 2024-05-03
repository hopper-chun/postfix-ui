<script setup>
import { toRefs, ref, computed, onMounted, watchEffect } from 'vue'
import { useError, useTextarea, useTheme, useFunctionRef, useMakeId } from '@/composables'
// import HelperText from '@/components/form/components/HelperText.vue'
import { RmFormForView, RmLabel, HelperText } from '@/components'

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
  rows: { type: Number },
  maxlength: { type: [String, Number] },
  autoGrow: { type: Boolean, default: false },
  viewMode: { type: Boolean },
  isHtml: { type: Boolean },
  cursor: { type: String },
})
const emit = defineEmits(['update:modelValue', 'onPaste'])

const { functionRef, element } = useFunctionRef()

const { id, modelValue } = toRefs(props)
const { error } = useError(id, element)
const { localValue, handleInput } = useTextarea(id, modelValue, emit)

// const theme = useTheme(computed(() => props.styles))
// const regex = /[^0-9]/g
// const areaHeight = ref('')

onMounted(() => {
  if (props.autoGrow) {
    resizeHeight()
  }
  //   watchEffect(() => {
  //     if (props.autoGrow) {
  //       areaHeight.value = theme.value.textarea_height.replace(regex, '')
  //       if (!props.props.autoGrow) {
  //         if (props.resize) {
  //         } else {
  //           element.value.style.height = `${areaHeight.value}px`
  //         }
  //       }
  //     }
  //   })
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
  <div class="rm-textarea">
    <template v-if="viewMode">
      <div class="rm-textarea--view">
        <RmFormForView :viewMode="viewMode" :label="label">
          <div v-if="isHtml" v-html="(modelValue || '').replaceAll(/(\n|\r\n)/g, '<br />')"></div>
          <div v-else class="flex-1">
            <textarea
              :ref="functionRef"
              :placeholder="placeholder"
              disabled
              :value="localValue"
              @input="handleInput($event.target.value)"
              :id="randomId"
              :rows="rows"
              class="rm-input--field disabled"
              :class="[{ error }, { resize }]"
              @keydown="resizeHeight"
              @keyup="resizeHeight"
              spellcheck="false"
              :maxlength="maxlength"
            ></textarea>
            <div></div>
            <HelperText :id="id" :error="error" :helperText="helperText" :helperIcon="helperIcon" :maxLength="maxlength" :localValue="localValue">
              <template #helperIcon> <slot name="helperIcon"></slot> </template>
            </HelperText>
          </div>
        </RmFormForView>
      </div>
    </template>
    <template v-else>
      <div class="rm-textarea--edit">
        <RmLabel :label="label" :labelHelper="labelHelper" :required="required" :id="randomId"></RmLabel>
        <textarea
          :ref="functionRef"
          :placeholder="placeholder"
          :disabled="disabled"
          :value="localValue"
          @input="handleInput($event.target.value)"
          :id="randomId"
          :rows="rows"
          class="rm-input--field"
          :class="[{ disabled }, { error }, { resize }]"
          @keydown="resizeHeight"
          @keyup="resizeHeight"
          @paste="($event) => $emit('onPaste', $event)"
          spellcheck="false"
          :maxlength="maxlength"
          :style="{ cursor: `${cursor}` }"
        ></textarea>
        <div></div>
        <HelperText :id="id" :error="error" :helperText="helperText" :helperIcon="helperIcon" :maxLength="maxlength" :localValue="localValue">
          <template #helperIcon> <slot name="helperIcon"></slot> </template>
        </HelperText>
      </div>
    </template>
  </div>
</template>
