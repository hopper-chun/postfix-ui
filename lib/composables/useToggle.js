import { ref, watch } from 'vue'
import useError from '@/composables/useError'

export default (id, modelValue, options, emit) => {
  const localValue = ref(options.value[1] === modelValue.value)
  const { clearError } = useError()

  watch(
    () => modelValue.value,
    (value) => {
      localValue.value = options.value[1] === value
    }
  )

  const handleToggle = () => {
    // console.log(localValue.value, options.value[localValue.value ? 1 : 0])
    emit('update:modelValue', options.value[localValue.value ? 1 : 0])
    clearError(id.value)
  }

  return {
    localValue,
    handleToggle,
  }
}
