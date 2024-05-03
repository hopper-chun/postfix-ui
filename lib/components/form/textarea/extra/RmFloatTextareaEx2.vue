<script setup>
import { computed, ref, toRefs } from 'vue'
import { useError, useTextarea, useTheme, useFunctionRef, useMakeId } from '@/composables'
import HelperText from '@/components/form/components/HelperText.vue'

const props = defineProps({
  id: { type: String },
  label: { type: String },
  modelValue: { type: [String, Number], required: true },
  disabled: { type: Boolean, default: false },
  helperText: { type: String },
  helperIcon: { type: Boolean, default: false },
  resize: { type: Boolean, default: false },
  rows: { type: Number },
  maxlength: { type: [String, Number] },
  styles: { type: Object },
  autoGrow: { type: Boolean, default: false },
})
const emit = defineEmits(['update:modelValue'])

const { functionRef: inputRefFunc, element: inputRef } = useFunctionRef()
const { functionRef: containerRefFunc, element: containerRef } = useFunctionRef()

const { id, modelValue } = toRefs(props)
const { error } = useError(id, inputRef)
const { localValue, handleInput } = useTextarea(id, modelValue, emit)

const theme = useTheme(computed(() => props.styles))

const randomId = useMakeId()
</script>

<template>
  <div>
    <div class="w-full" :ref="containerRefFunc">
      <div
        class="relative w-full pt-[10px]"
        :class="[theme.radius, theme.border, disabled ? 'bg-[#eeeeee]' : `${theme.bgColor}`, theme.textarea_height, `focus-within:${theme.primary.border}`]"
      >
        <textarea
          :ref="inputRefFunc"
          placeholder=" "
          :disabled="disabled"
          :value="localValue"
          @input="handleInput($event.target.value)"
          :id="randomId"
          :rows="rows"
          class="border-1 absolute inset-x-0 top-[10px] bottom-0 block w-full appearance-none focus:outline-none sm:leading-[25px]"
          :class="[
            theme.fontSize,
            theme.text.color,
            theme.paddingX,
            theme.radius,
            disabled ? 'bg-[#eeeeee]' : `${theme.bgColor}`,
            !error ? `border-[#E5E7EB] text-[#374151]` : `${theme.error.text} ${theme.error.border}`,
          ]"
          spellcheck="false"
          :maxlength="maxlength"
        ></textarea>
        <label
          :for="randomId"
          class="absolute inset-x-0 top-[12px] flex origin-[0%] items-center text-[#737373] transition-all duration-200 ease-linear"
          :class="[theme.fontSize, theme.paddingX]"
        >
          <span class="-translate-x-[4px] px-[4px]" :class="disabled ? theme.disabled : `${theme.bgColor}`">
            {{ label }}
          </span>
        </label>
      </div>
      <HelperText :id="id" :error="error" :helperText="helperText" :helperIcon="helperIcon" :maxLength="maxlength" :localValue="localValue">
        <template #helperIcon> <slot name="helperIcon"></slot> </template>
      </HelperText>
    </div>
  </div>
</template>
<style scoped>
.SCROLLHIDE::-webkit-scrollbar {
  display: none;
}

textarea:focus-within ~ label,
textarea:not(:placeholder-shown) ~ label {
  @apply -translate-y-[115%] transform text-[10px] leading-[160%] text-[#9D9D9D] sm:text-[12px];
}
</style>
