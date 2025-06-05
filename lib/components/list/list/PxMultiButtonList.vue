<script setup>
import { toRefs, ref, watchEffect, computed } from 'vue'
import { useError, useSelect, useFunctionRef, useMakeId } from '@/composables'

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
  size: { type: String, default: 'md' },
  viewMode: { type: Boolean },
  prevent: { type: Boolean },
  clearButton: { type: String },
  labelHelper: { type: String },
  helperText: { type: String },
  md: { type: String },
  required: { type: Boolean },
})

const emit = defineEmits(['update:modelValue'])

const local = ref([])

const { functionRef: buttonRefFunc, element: buttonRef } = useFunctionRef()

const { id, modelValue, format } = toRefs(props)
const { error } = useError(id, buttonRef)

const selectedValue = computed(() => {
  let curOption = []
  props.options.forEach((option) => {
    props.modelValue.forEach((value) => {
      if (props.optionsValue(option) === value) {
        curOption.push(props.optionsLabel(option))
      }
    })
  })
  return curOption
})

const handleClick = (value) => {
  if (props.prevent || props.disabled) {
    return
  }
  if (local.value.includes(value)) {
    const index = local.value.findIndex((ele) => ele === value)
    local.value.splice(index, 1)
  } else {
    local.value.push(value)
  }
  emit('update:modelValue', local.value)
}

watchEffect(() => {
  local.value = props.modelValue
})

const handleClear = () => {
  local.value = []
  emit('update:modelValue', local.value)
}
</script>
<template>
  <div class="px-multiButtonList">
    <template v-if="viewMode">
      <PxFormForView :viewMode="viewMode" :required="required" :md="md" :label="label">
        {{ selectedValue.join(', ') }}
      </PxFormForView>
    </template>
    <template v-else>
      <div class="labelSwitch">
        <PxLabel v-if="label" :md="md" :required="required" :labelHelper="labelHelper" :label="label"></PxLabel>

        <div class="px-buttonList--wrapper" :ref="buttonRefFunc">
          <div v-if="clearButton">
            <PxButton @click="handleClear" :size="size" :color="modelValue.length === 0 ? color : subColor">{{ clearButton }}</PxButton>
          </div>

          <div v-for="option in options">
            <div @click="() => handleClick(optionsValue(option))">
              <slot :isSelect="modelValue.includes(optionsValue(option))" :optionsLabel="optionsLabel(option)">
                <PxButton :size="size" :color="modelValue.includes(optionsValue(option)) ? color : subColor">
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
