import { reactive, toRef } from 'vue'

const dialogs = reactive({})

export default (id) => {
  if (!dialogs[id]) {
    dialogs[id] = { id, open: false, onOpened: null, onClosed: null }
  }

  const openDialog = (payload) => {
    dialogs[id].open = true
    if (dialogs[id].onOpened) {
      dialogs[id].onOpened(payload)
    }
    const promise = new Promise((resolve, reject) => {
      dialogs[id].promise = { resolve, reject }
    })
    return promise
  }
  const closeDialog = (payload) => {
    if (dialogs[id].onClosed) {
      dialogs[id].onClosed(payload)
    }
    dialogs[id].open = false
    dialogs[id].promise?.resolve(payload)
  }
  const onOpened = (cb) => {
    dialogs[id].onOpened = cb
  }
  const onClosed = (cb) => {
    dialogs[id].onClosed = cb
  }

  return {
    showDialog: toRef(dialogs[id], 'open'),
    openDialog,
    closeDialog,
    onOpened,
    onClosed,
  }
}
