<script setup>
import { toRefs, onMounted, useSlots } from 'vue'
import { useError, useTextarea, useFunctionRef, useMakeId } from '@/composables'
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
  resize: { type: Boolean, default: false },
  rows: { type: Number },
  maxlength: { type: [String, Number] },
  autoGrow: { type: Boolean, default: false },
  viewMode: { type: Boolean },
  // isHtml: { type: Boolean },
  cursor: { type: String },
})
const emit = defineEmits(['update:modelValue', 'onPaste', 'onClickTooltip'])
const slots = useSlots()

const { functionRef, element } = useFunctionRef()

const { id, modelValue } = toRefs(props)
const { error } = useError(id, element)
const { localValue, handleInput } = useTextarea(id, modelValue, emit)

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
  <div class="px-textarea">
    <template v-if="viewMode">
      <div class="px-textarea--view">
        <PxFormForView :viewMode="viewMode" :label="label">
          <div>
            <div v-for="line in (modelValue || '').split('\n')">{{ line || `&nbsp` }}</div>
          </div>
        </PxFormForView>
      </div>
    </template>
    <template v-else>
      <div class="px-textarea--edit">
        <div class="labelSwitch">
          <PxLabel :label="label" :labelHelper="labelHelper" :required="required" :id="randomId" @onClickTooltip="$emit('onClickTooltip', $event)">
            <template v-if="!!slots.tooltip" #tooltip>
              <slot name="tooltip"></slot>
            </template>
          </PxLabel>
          <textarea
            :ref="functionRef"
            :placeholder="placeholder"
            :disabled="disabled"
            :value="localValue"
            @input="handleInput($event.target.value)"
            :id="randomId"
            :rows="rows"
            class="px-input--field"
            :class="[{ disabled }, { error }, { resize }]"
            @keydown="resizeHeight"
            @keyup="resizeHeight"
            @paste="($event) => $emit('onPaste', $event)"
            spellcheck="false"
            :maxlength="maxlength"
            :style="{ cursor: `${cursor}` }"
          ></textarea>
        </div>
        <div></div>
        <HelperText :id="id" :error="error" :helperText="helperText" :maxLength="maxlength" :localValue="localValue">
          <template #helperIcon> <slot name="helperIcon"></slot> </template>
        </HelperText>
      </div>
    </template>
  </div>
</template>
