<script setup>
import { ref, watchEffect, computed } from 'vue'
import { RmButton, RmLabel } from '@/components'

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
})
const emit = defineEmits(['update:modelValue'])

const handleClick = (value) => {
  if (!props.disabled) {
    emit('update:modelValue', value)
  }
}

const selectedValue = computed(() => {
  // console.log('props.options', props.options)
  const found = props.options?.find((option) => props.optionsValue(option) === props.modelValue)
  // console.log('found', found)
  if (found) {
    return props.optionsLabel(found)
  }

  return ''
})
</script>
<template>
  <div class="rm-buttonList">
    <template v-if="viewMode">
      <RmFormForView :viewMode="viewMode" :label="label" :labelHelper="labelHelper" :required="required">
        {{ selectedValue }}
      </RmFormForView>
    </template>
    <template v-else>
      <div>
        <RmLabel v-if="label" :label="label" :labelHelper="labelHelper" :required="required"></RmLabel>
        <div class="rm-buttonList--wrapper" :class="[{ nowrap }]">
          <div v-for="option in options" style="flex-shrink: 0">
            <div @click="handleClick(optionsValue(option))">
              <slot :isSelect="optionsValue(option) === modelValue" :optionsLabel="optionsLabel(option)">
                <RmButton :size="size" :color="optionsValue(option) === modelValue ? color : subColor">
                  {{ optionsLabel(option) }}
                </RmButton>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
