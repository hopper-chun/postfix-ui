import { ref, watch } from 'vue'
import useError from '@/composables/useError'

export default (id, modelValue, emit) => {
  const localValue = ref(modelValue.value)
  const { clearError } = useError()

  watch(
    () => modelValue.value,
    (value) => {
      localValue.value = value
    }
  )

  const handleCheck = (value) => {
    const found = localValue.value.findIndex((v) => v === value)
    if (found !== -1) {
      emit(
        'update:modelValue',
        localValue.value.filter((v) => v !== value)
      )
    } else {
      emit('update:modelValue', [...localValue.value, value])
    }
    clearError(id.value)
  }

  return {
    localValue,
    handleCheck,
  }
}
