<script setup>
import { watch, ref, nextTick } from 'vue'

import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import ImageResize from 'tiptap-extension-resize-image'
import Youtube from '@tiptap/extension-youtube'
import Link from '@tiptap/extension-link'
import StarterKit from '@tiptap/starter-kit'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import { onClickOutside } from '@vueuse/core'

const props = defineProps({
  modelValue: { type: String, required: true },
})

const emit = defineEmits(['update:modelValue'])

const editor = useEditor({
  content: props.modelValue,
  extensions: [
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    TextStyle.configure({ types: [ListItem.name] }),
    ImageResize,
    Youtube,
    Link.configure({
      openOnClick: false,

      defaultProtocol: 'https://',
    }),
    StarterKit,
  ],
  onUpdate: ({ editor }) => {
    emit('update:modelValue', editor.getHTML())
  },
})

const HList = ref(null)
const isHListOpen = ref(false)

const CList = ref(null)
const isCListOpen = ref(false)
const files = ref([])
const colorCode = ref('')

const handleOpenHList = () => {
  isHListOpen.value = !isHListOpen.value
}
const handleOpenCList = () => {
  isCListOpen.value = !isCListOpen.value
  colorCode.value = editor.value.getAttributes('textStyle').color
}

onClickOutside(HList, () => (isHListOpen.value = false))
onClickOutside(CList, () => (isCListOpen.value = false))

const handleAddImage = (file) => {
  const url = file[0].cdnPath

  editor.value.chain().focus().setImage({ src: url }).run()

  nextTick(() => {
    files.value = []
  })
}

const handleAddVideo = () => {
  const url = prompt('Enter YouTube URL')

  editor.value.commands.setYoutubeVideo({
    src: url,
    // width: Math.max(320, parseInt(this.width, 10)) || 640,
    // height: Math.max(180, parseInt(this.height, 10)) || 480,
  })
}

const handleAddImageLink = () => {
  const url = window.prompt('URL')

  if (url) {
    editor.value.chain().focus().setImage({ src: url }).run()
  }
}

// 여기서부터
const handleSetLink = () => {
  const previousUrl = editor.value.getAttributes('link').href
  const url = window.prompt('URL', previousUrl)

  // cancelled
  if (url === null) {
    return
  }

  // empty
  if (url === '') {
    editor.value.chain().focus().extendMarkRange('link').unsetLink().run()

    return
  }

  // update link
  if (!/^https?:\/\//i.test(url)) {
    editor.value
      .chain()
      .focus()
      .extendMarkRange('link')
      .setLink({ href: 'https://' + url })
      .run()
  } else {
    editor.value.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }
}

const handleSelectColor = (color) => {
  editor.value.chain().focus().setColor(color).run()
  isCListOpen.value = false
}

const handleSetColor = () => {
  editor.value.chain().focus().setColor(colorCode.value).run()
  isCListOpen.value = false
}

const colorList = ref([
  ['#fee2e2', '#fecaca', '#fca5a5', '#f87171', '#ef4444', '#dc2626', '#b91c1c', '#991b1b', '#7f1d1d'],
  ['#ffedd5', '#fed7aa', '#fdba74', '#fb923c', '#f97316', '#ea580c', '#c2410c', '#9a3412', '#7c2d12'],
  ['#fef9c3', '#fef08a', '#fde047', '#facc15', '#eab308', '#ca8a04', '#a16207', '#854d0e', '#713f12'],
  ['#ecfccb', '#d9f99d', '#bef264', '#a3e635', '#84cc16', '#65a30d', '#4d7c0f', '#3f6212', '#365314'],
  ['#ccfbf1', '#99f6e4', '#5eead4', '#2dd4bf', '#14b8a6', '#0d9488', '#0f766e', '#115e59', '#134e4a'],
  ['#dbeafe', '#bfdbfe', '#93c5fd', '#60a5fa', '#3b82f6', '#2563eb', '#1d4ed8', '#1e40af', '#1e3a8a'],
  ['#ede9fe', '#ddd6fe', '#c4b5fd', '#a78bfa', '#8b5cf6', '#7c3aed', '#6d28d9', '#5b21b6', '#4c1d95'],
  ['#fae8ff', '#f5d0fe', '#f0abfc', '#e879f9', '#d946ef', '#c026d3', '#a21caf', '#86198f', '#701a75'],
  ['#ffffff', '#e5e7eb', '#d1d5db', '#9ca3af', '#6b7280', '#4b5563', '#374151', '#1f2937', '#000000'],
])

watch(
  () => props.modelValue,
  (newValue) => {
    // 외부에서 modelValue가 변경되었을 때 에디터 내용 업데이트
    const isSame = newValue === editor.value.getHTML()
    if (editor.value && !isSame) {
      editor.value.commands.setContent(newValue, false)
    }
  }
)
</script>

<template>
  <div v-if="editor" class="tiptap-editor">
    <div class="control-group">
      <div class="button-group">
        <div class="relative inline-block">
          <button @click="handleOpenCList">
            <div class="tiptap-icon colorwheel"></div>
          </button>
          <div v-if="isCListOpen" ref="CList" class="tiptap CList">
            <div v-for="colors in colorList" class="colors">
              <div
                v-for="color in colors"
                @click="handleSelectColor(color)"
                class="color-wrapper"
                :class="{ 'is-active': editor.isActive('textStyle', { color: color }) }"
              >
                <div class="color" :style="`background:${color}`"></div>
              </div>
            </div>
            <div class="flex space-x-[4px] mt-[8px] items-center">
              <PxInput v-model="colorCode" class="flex-1" placeholder="#000000"></PxInput>
              <PxButton color="sec" class="w-[60px]" @click="handleSetColor">적용</PxButton>
            </div>
          </div>
        </div>
      </div>
      <div class="button-group">
        <div class="relative inline-block">
          <button @click="handleOpenHList">
            <PxIcon name="icon-heading" class="tiptap-icon"></PxIcon>
          </button>
          <div v-if="isHListOpen" ref="HList" class="tiptap HList">
            <!-- 여기 클래스 주고, 이 클래스 이하 isActive랑 div들한테도 각각 효과를(디자인이랑 호버 등) 주기 -->
            <div
              @click="
                () => {
                  editor.chain().focus().setParagraph().run()
                  isHListOpen = false
                }
              "
              :class="{ 'is-active': editor.isActive('paragraph') }"
            >
              <p class="is-list">Paragraph</p>
            </div>
            <div
              class="cursor-pointer"
              @click="
                () => {
                  editor.chain().focus().toggleHeading({ level: 1 }).run()
                  isHListOpen = false
                }
              "
              :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
            >
              <h1 class="is-list">Heading1</h1>
            </div>
            <div
              class="cursor-pointer"
              @click="
                () => {
                  editor.chain().focus().toggleHeading({ level: 2 }).run()
                  isHListOpen = false
                }
              "
              :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
            >
              <h2 class="is-list">Heading2</h2>
            </div>
            <div
              class="cursor-pointer"
              @click="
                () => {
                  editor.chain().focus().toggleHeading({ level: 3 }).run()
                  isHListOpen = false
                }
              "
              :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
            >
              <h3 class="is-list">Heading3</h3>
            </div>
            <div
              class="cursor-pointer"
              @click="
                () => {
                  editor.chain().focus().toggleHeading({ level: 4 }).run()
                  isHListOpen = false
                }
              "
              :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }"
            >
              <h4 class="is-list">Heading4</h4>
            </div>
            <div
              class="cursor-pointer"
              @click="
                () => {
                  editor.chain().focus().toggleHeading({ level: 5 }).run()
                  isHListOpen = false
                }
              "
              :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }"
            >
              <h5 class="is-list">Heading5</h5>
            </div>
            <div
              class="cursor-pointer"
              @click="
                () => {
                  editor.chain().focus().toggleHeading({ level: 6 }).run()
                  isHListOpen = false
                }
              "
              :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }"
            >
              <h6 class="is-list">Heading6</h6>
            </div>
          </div>
        </div>
        <button
          @click="editor.chain().focus().toggleBold().run()"
          :disabled="!editor.can().chain().focus().toggleBold().run()"
          :class="{ 'is-active': editor.isActive('bold') }"
        >
          <PxIcon name="icon-bold" class="tiptap-icon"></PxIcon>
        </button>
        <button
          @click="editor.chain().focus().toggleItalic().run()"
          :disabled="!editor.can().chain().focus().toggleItalic().run()"
          :class="{ 'is-active': editor.isActive('italic') }"
        >
          <PxIcon name="icon-italic" class="tiptap-icon"></PxIcon>
        </button>
        <button
          @click="editor.chain().focus().toggleStrike().run()"
          :disabled="!editor.can().chain().focus().toggleStrike().run()"
          :class="{ 'is-active': editor.isActive('strike') }"
        >
          <PxIcon name="icon-strike" class="tiptap-icon"></PxIcon>
        </button>
        <button
          @click="editor.chain().focus().toggleCode().run()"
          :disabled="!editor.can().chain().focus().toggleCode().run()"
          :class="{ 'is-active': editor.isActive('code') }"
        >
          <PxIcon name="icon-code-bracket" class="tiptap-icon"></PxIcon>
        </button>
        <button @click="editor.chain().focus().toggleCodeBlock().run()" :class="{ 'is-active': editor.isActive('codeBlock') }">
          <PxIcon name="icon-code-bracket-square" class="tiptap-icon"></PxIcon>
        </button>

        <button @click="handleSetLink">
          <PxIcon name="icon-link" class="tiptap-icon"></PxIcon>
        </button>

        <div>
          <PxFileUploader id="tiptapImageUploader" @update:modelValue="handleAddImage" v-model="files" public>
            <template #button>
              <div class="upload-button">
                <PxIcon name="icon-photo" class="tiptap-icon"></PxIcon>
              </div>
            </template>
          </PxFileUploader>
        </div>

        <button @click="handleAddImageLink">
          <PxIcon name="icon-clip" class="tiptap-icon"></PxIcon>
        </button>

        <button @click="handleAddVideo">
          <PxIcon name="icon-youtube" class="tiptap-icon"></PxIcon>
        </button>
      </div>
      <div class="button-group">
        <button @click="editor.chain().focus().toggleBulletList().run()" :class="{ 'is-active': editor.isActive('bulletList') }">
          <PxIcon name="icon-bullet-list" class="tiptap-icon"></PxIcon>
        </button>
        <button @click="editor.chain().focus().toggleOrderedList().run()" :class="{ 'is-active': editor.isActive('orderedList') }">
          <PxIcon name="icon-ordered-list" class="tiptap-icon"></PxIcon>
        </button>
      </div>
      <div class="button-group">
        <button @click="editor.chain().focus().toggleBlockquote().run()" :class="{ 'is-active': editor.isActive('blockquote') }">
          <PxIcon name="icon-quote" class="tiptap-icon"></PxIcon>
        </button>
        <button @click="editor.chain().focus().setHorizontalRule().run()">
          <PxIcon name="icon-horizontal-rule" class="tiptap-icon"></PxIcon>
        </button>

        <button @click="editor.chain().focus().setHardBreak().run()">
          <PxIcon name="icon-line-break" class="tiptap-icon"></PxIcon>
        </button>
      </div>
      <div class="button-group">
        <!-- clearMarks -->
        <!-- <button @click="editor.chain().focus().unsetAllMarks().run()">
          <PxIcon name="icon-close" class="tiptap-icon"></PxIcon>
        </button> -->
        <!-- clearNodes -->
        <button @click="editor.chain().focus().clearNodes().run()">
          <PxIcon name="icon-close" class="tiptap-icon"></PxIcon>
        </button>

        <button @click="editor.chain().focus().undo().run()" :disabled="!editor.can().chain().focus().undo().run()">
          <PxIcon name="icon-redo" class="tiptap-icon reverse"></PxIcon>
        </button>
        <button @click="editor.chain().focus().redo().run()" :disabled="!editor.can().chain().focus().redo().run()">
          <PxIcon name="icon-redo" class="tiptap-icon"></PxIcon>
        </button>
      </div>
    </div>

    <editor-content :editor="editor" />
  </div>
</template>
