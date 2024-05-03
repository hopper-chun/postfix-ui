<script setup>
import { onMounted, ref, watch } from 'vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { useQuill } from '@/composables'

useQuill()

const props = defineProps({
  modelValue: String,
  placeholder: { type: String },
  disabled: { type: Boolean, default: false },
  hideToolbar: { type: Boolean, default: false },
})

const emit = defineEmits(['onImageAdded', 'onImageLinkAdded', 'update:modelValue'])

const appendLink = (link) => {
  const Editor = editor.value.getQuill()
  const range = Editor.getSelection()
  const cursorLocation = range?.index || 0

  Editor.insertEmbed(cursorLocation, 'image', link)
}

const setHTML = (html) => {
  editor.value.setHTML(html)
}

defineExpose({ appendLink, setHTML })

const editor = ref()
const fileInput = ref()

const emitImageInfo = ($event) => {
  console.log('-----------------------')

  const resetUploader = function () {
    var uploader = document.getElementById('file-upload')
    uploader.value = ''
  }
  let file = $event.target.files[0]
  const Editor = editor.value.getQuill()
  let range = Editor.getSelection()
  let cursorLocation = range.index

  emit('onImageAdded', file, Editor, cursorLocation, resetUploader)
}

const handleLinkAdd = () => {
  // const ret = window.prompt('이미지의 링크를 입력하세요')
  // if (!ret) {
  //   return
  // }

  const Editor = editor.value.getQuill()
  const range = Editor.getSelection()
  const cursorLocation = range?.index || 0

  const ret = true
  Editor.insertEmbed(cursorLocation, 'link', ret)
}

onMounted(() => {
  const toolbar = editor.value.getQuill().getModule('toolbar')
  toolbar.addHandler('image', () => fileInput.value.click())
  // toolbar.addHandler('image', aaa)

  // console.log('toolbar', toolbar)
})

// let toolbar2 = state.quill.getModule('toolbar')
// toolbar2.addHandler('image', () => fileInput.value.click())

// console.log('props.modelValue', props.modelValue)
// const localValue = ref(props.modelValue)

// watch(
//   () => props.modelValue,
//   () => {
//     console.log('-------props.modelValue--------------', props.modelValue)
//     // localValue.value = props.modelValue
//     editor.value.setHTML(props.modelValue)
//   }
// )
</script>
<template>
  <div style="height: 100%" :style_="`height: calc(100% - 42px);`" :class="[{ hideToolbar }]">
    <QuillEditor
      toolbar="#my-toolbar"
      theme="snow"
      :content="modelValue"
      @update:content="$emit('update:modelValue', $event)"
      contentType="html"
      :readOnly="disabled"
      ref="editor"
    >
      <template #toolbar>
        <div id="my-toolbar">
          <span class="ql-formats">
            <!-- <select class="ql-font"></select> -->
            <select class="ql-header">
              <option value="1">Heading 1</option>
              <option value="2">Heading 2</option>
              <option value="3">Heading 3</option>
              <option value="4">Heading 4</option>
              <option value="5">Heading 5</option>
              <option value="6">Heading 6</option>
              <option selected value="">보통</option>
            </select>
            <!-- <select class="ql-size">
            <option value="small"></option>
            <option selected></option>
            <option value="large"></option>
            <option value="huge"></option>
          </select> -->
          </span>
          <span class="ql-formats">
            <button class="ql-bold"></button>
            <button class="ql-italic"></button>
            <button class="ql-underline"></button>
            <button class="ql-strike"></button>
          </span>
          <span class="ql-formats">
            <button class="ql-align" value=""></button>
            <button class="ql-align" value="center"></button>
            <button class="ql-align" value="right"></button>
            <button class="ql-align" value="justify"></button>
          </span>
          <span class="ql-formats">
            <button class="ql-blockquote"></button>
            <button class="ql-code-block"></button>
          </span>
          <span class="ql-formats">
            <button class="ql-list" value="ordered"></button>
            <button class="ql-list" value="bullet"></button>
            <button class="ql-list" value="check"></button>
          </span>
          <!-- <span class="ql-formats">
          <button class="ql-script" value="sub"></button>
          <button class="ql-script" value="super"></button>
        </span> -->
          <span class="ql-formats">
            <button class="ql-indent" value="-1"></button>
            <button class="ql-indent" value="+1"></button>
          </span>

          <span class="ql-formats">
            <select class="ql-color"></select>
            <select class="ql-background"></select>
          </span>
          <!-- <span class="ql-formats">
            <button class="ql-image"></button>
            <button class="ql-link" @click="handleLinkAdd"></button>
            <button class="ql-video"></button>
          </span> -->
        </div>
      </template>
    </QuillEditor>
    <input id="file-upload" ref="fileInput" type="file" accept="image/*" style="display: none" @change="emitImageInfo" class="font-sans" />
  </div>
</template>

<style>
.hideToolbar #my-toolbar {
  display: none;
}

.hideToolbar .ql-container .ql-editor {
  padding: 0;
}

.hideToolbar .ql-toolbar.ql-snow,
.hideToolbar .ql-container.ql-snow {
  border: none !important;
}

.ql-toolbar.ql-snow {
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}
.ql-container.ql-snow {
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  /* min-height: 400px; */
}

.ql-container .ql-editor p {
  font-size: 17px;
  line-height: 1.9;
}

.ql-container .ql-editor li {
  font-size: 17px;
  line-height: 1.9;
}

.ql-container .ql-editor blockquote {
  font-size: 17px;
  line-height: 1.9;
}

.ql-container .ql-editor h1 {
  font-size: 36px;
  line-height: 1.4;
}

.ql-container .ql-editor h2 {
  font-size: 32px;
  line-height: 1.4;
}

.ql-container .ql-editor h3 {
  font-size: 26px;
  line-height: 1.4;
}

.ql-container .ql-editor h4 {
  font-size: 24px;
  line-height: 1.4;
}

.ql-container .ql-editor h5 {
  font-size: 20px;
  line-height: 1.4;
}
.ql-container .ql-editor h6 {
  font-size: 18px;
  line-height: 1.4;
}

.ql-container .ql-editor .ql-video {
  width: 100%;
  aspect-ratio: 16/9;
}

.ql-snow .ql-editor blockquote {
  margin-bottom: 0px;
  margin-top: 0px;
  padding: 2px 0 2px 16px;
  background-color: #f6f3f3;
}

/*
.ql-container .ql-editor .ql-video-wrapper {
  padding-top: 56.2205%;
  width: 100%;
  position: relative;
}

.ql-container .ql-editor .ql-video-wrapper .ql-video-inner {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
} */
</style>
