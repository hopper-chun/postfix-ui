import { ref, watch } from 'vue'
import useError from '@/composables/useError'

export default (id, modelValue, options, optionsValue, emit) => {
  const { clearError } = useError()

  // select가 value를 dom에 저장할때 string으로 변환하므로 반환시 원래 타입으로 바꿔줘야 한다
  const findOption = (value) => {
    const idx = options.value.findIndex((option) => optionsValue(option) == value)
    if (idx === -1) {
      return value
    }
    return options.value[idx]
  }
  const localValue = ref(findOption(modelValue.value))

  watch(
    () => [modelValue.value, options.value],
    () => {
      localValue.value = findOption(modelValue.value)
    }
  )
  const handleChange = (value) => {
    const option = findOption(value)
    emit('update:modelValue', optionsValue(option))
    clearError(id.value)
  }

  return {
    localValue,
    handleChange,
  }
}
