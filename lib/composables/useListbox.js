import { ref, computed } from 'vue'

export default ({ isDraggable, removeConfirm, emit }) => {
  const mouseDowned = ref(false)

  const draggable = computed(() => {
    return isDraggable && mouseDowned.value
  })

  const handleMousedown = () => {
    mouseDowned.value = true
  }
  const reset = () => {
    mouseDowned.value = false
  }

  const handleDragStart = (event, item) => {
    if (!draggable.value) {
      // console.log('비정상@!!ㄴ')
      return
    }
    event.dataTransfer.dropEffect = 'move'
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('value', JSON.stringify(item))
    // console.log('handleDragStart', event)
  }
  const handleDragOver = (event, direction) => {
    event.preventDefault()
    event.target.classList.add(direction === 'top' ? 'border-t-2' : 'border-b-2')
    event.target.classList.add('border-indigo-300')
  }
  const handleDragLeave = (event, direction) => {
    event.preventDefault()
    event.target.classList.remove(direction === 'top' ? 'border-t-2' : 'border-b-2')
    event.target.classList.remove('border-indigo-300')
  }
  const handleDrop = (event, targetItem, targetIndex) => {
    event.target.classList.remove('border-t-2')
    event.target.classList.remove('border-b-2')
    event.target.classList.remove('border-indigo-300')

    const payload = event.dataTransfer.getData('value')
    if (!payload) {
      return
    }
    const sourceItem = JSON.parse(payload)

    emit('onDragDrop', { sourceItem, targetItem, targetIndex })
  }
  const handleDragEnd = () => {
    reset()
  }
  const handleSelect = (item, index) => {
    emit('onSelect', { item, index })
  }
  const handleEdit = (item, index) => {
    emit('onEdit', { item, index })
  }
  const handleRemove = (item, index) => {
    if (!removeConfirm()) {
      return
    }
    emit('onRemove', { value: item, index })
  }
  return {
    draggable,
    handleMousedown,
    handleDragStart,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleDragEnd,
    handleSelect,
    handleEdit,
    handleRemove,
  }
}
