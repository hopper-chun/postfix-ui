import { ref, readonly, watch } from 'vue'
import useError from '@/composables/useError'

export default (id, modelValue, emit) => {
  const isFocused = ref(false)
  const localValue = ref(modelValue.value)
  const { clearError } = useError()

  watch(
    () => [modelValue.value],
    () => {
      localValue.value = modelValue.value
    }
  )

  const handleFocus = () => {
    isFocused.value = true
  }

  const handleBlur = () => {
    isFocused.value = false
    emit('onBlur')
  }

  const handleInput = (value) => {
    // 붙여넣기할때 맥에만 있는 똥 지우기
    const temp = value.replace(/^/, '')
    emit('update:modelValue', temp)
    clearError(id.value)
  }

  return {
    isFocused: readonly(isFocused),
    localValue,
    handleInput,
    handleFocus,
    handleBlur,
  }
}
