<script setup>
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import { watch } from 'vue'

const props = defineProps({
  modelValue: String,
  placeholder: { type: String },
  disabled: { type: Boolean, default: false },
  hideToolbar: { type: Boolean, default: false },
})

const emit = defineEmits(['onImageAdded', 'onImageLinkAdded', 'update:modelValue'])

const editor = useEditor({
  content: props.modelValue,
  extensions: [StarterKit],
  onUpdate: () => {
    // HTML
    emit('update:modelValue', editor.value.getHTML())

    // JSON
    // this.$emit('update:modelValue', this.editor.getJSON())
  },
})

watch(
  () => props.modelValue,
  () => {
    const isSame = editor.value.getHTML() === props.modelValue
    if (isSame) {
      return
    }
    editor.value.commands.setContent(props.modelValue, false)
  }
)
</script>

<template>
  <editor-content :editor="editor" />
</template>
