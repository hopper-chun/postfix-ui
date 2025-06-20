<script setup>
import { toRefs, computed } from 'vue'
import { useError, useFunctionRef } from '@/composables'

const props = defineProps({
  label: { type: String },
  id: { type: String },
  modelValue: { type: [String, Number, Object] },
  options: { type: Array },
  optionsLabel: { type: Function, default: (option) => option },
  optionsValue: { type: Function, default: (option) => option },
  disabled: { type: Boolean, default: false },
  color: { type: String, default: 'pri' },
  subColor: { type: String, default: 'inactive' },
  viewMode: { type: Boolean },
  labelHelper: { type: String },
  nowrap: { type: Boolean },
  size: { type: String },
  required: { type: Boolean },
  md: { type: String },
  helperText: { type: String },
})
const emit = defineEmits(['update:modelValue'])

const { id, modelValue, format } = toRefs(props)
const { functionRef: buttonRefFunc, element: buttonRef } = useFunctionRef()

const { error } = useError(id, buttonRef)

const handleClick = (value) => {
  if (!props.disabled) {
    if (props.modelValue === value) {
      emit('update:modelValue', undefined)
    } else {
      emit('update:modelValue', value)
    }
  }
}

const selectedValue = computed(() => {
  const found = props.options?.find((option) => props.optionsValue(option) === props.modelValue)

  if (found) {
    return props.optionsLabel(found)
  }

  return ''
})
</script>
<template>
  <div class="px-buttonList">
    <template v-if="viewMode">
      <PxFormForView :viewMode="viewMode" :md="md" :label="label" :labelHelper="labelHelper" :required="required">
        {{ selectedValue }}
      </PxFormForView>
    </template>
    <template v-else>
      <div class="labelSwitch">
        <PxLabel v-if="label" :md="md" :label="label" :labelHelper="labelHelper" :required="required"></PxLabel>
        <div class="px-buttonList--wrapper" :ref="buttonRefFunc" :class="[{ nowrap }]">
          <div v-for="option in options" style="flex-shrink: 0">
            <div @click="handleClick(optionsValue(option))">
              <slot :isSelect="optionsValue(option) === modelValue" :optionsLabel="optionsLabel(option)">
                <PxButton :size="size" :color="optionsValue(option) === modelValue ? color : subColor">
                  {{ optionsLabel(option) }}
                </PxButton>
              </slot>
            </div>
          </div>
        </div>
      </div>
      <HelperText :id="id" :error="error" :helperText="helperText">
        <template #helperIcon> <slot name="helperIcon"></slot> </template>
      </HelperText>
    </template>
  </div>
</template>
