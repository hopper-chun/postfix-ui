export default ({ removeConfirm }, emit) => {
  const handleRemove = (item, index) => {
    if (!removeConfirm()) {
      return
    }
    emit('onRemove', { value: item, index })
  }
  const handleRemoveAll = () => {
    if (!removeConfirm()) {
      return
    }
    emit('onRemoveAll')
  }

  return {
    handleRemove,
    handleRemoveAll,
  }
}
