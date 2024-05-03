export default (emit) => {
  const handleChange = (value, index) => {
    emit('update:modelValue', value)
    // context.emit('onChanged', { value, option: props.options[index], index })
  }
  return {
    handleChange,
  }
}
