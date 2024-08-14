export default (emit) => {
  const updateRow = (key, value) => {
    emit('update:row', { key, value })
  }

  return { updateRow }
}
