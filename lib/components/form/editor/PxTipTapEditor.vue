<script setup>
import { watch, ref, nextTick, readonly } from 'vue'

import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import { TextStyle, FontSize } from '@tiptap/extension-text-style'
import ImageResize from 'tiptap-extension-resize-image'
import Youtube from '@tiptap/extension-youtube'
// import Link from '@tiptap/extension-link'
import { Highlight } from '@tiptap/extension-highlight'
import StarterKit from '@tiptap/starter-kit'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import { onClickOutside } from '@vueuse/core'
import TextAlign from '@tiptap/extension-text-align'

const props = defineProps({
  modelValue: { type: String, required: true },
  readOnly: { type: Boolean },
})

const emit = defineEmits(['update:modelValue', 'onError'])

const editor = useEditor({
  content: props.modelValue,
  extensions: [
    FontSize.configure({
      types: ['textStyle'],
    }),
    Highlight.configure({ multicolor: true }),
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    TextStyle.configure({ types: [ListItem.name] }),
    ImageResize,
    Youtube,
    TextAlign.configure({
      types: ['heading', 'paragraph'],
      alignments: ['left', 'center', 'right', 'justify'],
      defaultAlignment: 'left',
    }),
    // Link.configure({
    //   openOnClick: false,

    //   defaultProtocol: 'https://',
    // }),
    StarterKit,
  ],
  editable: !props.readOnly,
  onUpdate: ({ editor }) => {
    emit('update:modelValue', editor.getHTML())
  },
})

const HList = ref(null)
const isHListOpen = ref(false)

const CList = ref(null)
const isCListOpen = ref(false)

const highlightList = ref(null)
const isHighlightListOpen = ref(false)

const files = ref([])
const colorCode = ref('')

const handleOpenHList = () => {
  isHListOpen.value = !isHListOpen.value
}
const handleOpenCList = () => {
  isCListOpen.value = !isCListOpen.value
  colorCode.value = editor.value.getAttributes('textStyle').color
}

const handleOpenHighlightList = () => {
  isHighlightListOpen.value = !isHighlightListOpen.value
  colorCode.value = editor.value.getAttributes('highlight').color
}

onClickOutside(HList, () => (isHListOpen.value = false))
onClickOutside(CList, () => (isCListOpen.value = false))
onClickOutside(highlightList, () => (isHighlightListOpen.value = false))

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

const handleSelectHighlightColor = (color) => {
  editor.value.chain().focus().setHighlight({ color }).run()
  isHighlightListOpen.value = false
}

const handleSetHighlightColor = () => {
  editor.value.chain().focus().setHighlight({ color: colorCode.value }).run()
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
  <div v-if="editor" class="tiptap-editor" :class="{ readOnly }">
    <div v-if="!readOnly" class="control-group">
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
            <!-- <div
              class="cursor-pointer"
              @click="
                () => {
                  editor.chain().focus().setParagraph().run()
                  isHListOpen = false
                }
              "
              :class="{ 'is-active': editor.isActive('paragraph') }"
            >
              <p class="is-list">Paragraph</p>
            </div> -->
            <!-- <div
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
            </div> -->
            <div
              class="cursor-pointer"
              @click="
                () => {
                  editor.chain().focus().setFontSize('12px').run()
                  isHListOpen = false
                }
              "
              :class="{ 'is-active': editor.isActive('textStyle', { fontSize: '12px' }) }"
            >
              <div class="is-list text-[12px]">12px</div>
            </div>
            <div
              class="cursor-pointer"
              @click="
                () => {
                  editor.chain().focus().setFontSize('14px').run()
                  isHListOpen = false
                }
              "
              :class="{ 'is-active': editor.isActive('textStyle', { fontSize: '14px' }) }"
            >
              <div class="is-list text-[14px]">14px</div>
            </div>
            <div
              class="cursor-pointer"
              @click="
                () => {
                  editor.chain().focus().setFontSize('16px').run()
                  isHListOpen = false
                }
              "
              :class="{ 'is-active': editor.isActive('textStyle', { fontSize: '16px' }) }"
            >
              <div class="is-list text-[16px]">16px</div>
            </div>
            <div
              class="cursor-pointer"
              @click="
                () => {
                  editor.chain().focus().setFontSize('18px').run()
                  isHListOpen = false
                }
              "
              :class="{ 'is-active': editor.isActive('textStyle', { fontSize: '18px' }) }"
            >
              <div class="is-list text-[18px]">18px</div>
            </div>
            <div
              class="cursor-pointer"
              @click="
                () => {
                  editor.chain().focus().setFontSize('20px').run()
                  isHListOpen = false
                }
              "
              :class="{ 'is-active': editor.isActive('textStyle', { fontSize: '20px' }) }"
            >
              <div class="is-list text-[20px]">20px</div>
            </div>
            <div
              class="cursor-pointer"
              @click="
                () => {
                  editor.chain().focus().setFontSize('24px').run()
                  isHListOpen = false
                }
              "
              :class="{ 'is-active': editor.isActive('textStyle', { fontSize: '24px' }) }"
            >
              <div class="is-list text-[24px]">24px</div>
            </div>
            <div
              class="cursor-pointer"
              @click="
                () => {
                  editor.chain().focus().setFontSize('36px').run()
                  isHListOpen = false
                }
              "
              :class="{ 'is-active': editor.isActive('textStyle', { fontSize: '28px' }) }"
            >
              <div class="is-list text-[28px]">28px</div>
            </div>
            <div
              class="cursor-pointer"
              @click="
                () => {
                  editor.chain().focus().setFontSize('36px').run()
                  isHListOpen = false
                }
              "
              :class="{ 'is-active': editor.isActive('textStyle', { fontSize: '36px' }) }"
            >
              <div class="is-list text-[36px]">36px</div>
            </div>
            <div
              class="cursor-pointer"
              @click="
                () => {
                  editor.chain().focus().setFontSize('48px').run()
                  isHListOpen = false
                }
              "
              :class="{ 'is-active': editor.isActive('textStyle', { fontSize: '48px' }) }"
            >
              <div class="is-list text-[48px]">48px</div>
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
          @click="editor.chain().focus().toggleUnderline().run()"
          :disabled="!editor.can().chain().focus().toggleUnderline().run()"
          :class="{ 'is-active': editor.isActive('underline') }"
        >
          <PxIcon name="icon-underline" class="tiptap-icon"></PxIcon>
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
        <div class="relative inline-block">
          <button @click="handleOpenHighlightList" :class="{ 'is-active': editor.isActive('highlight') }">
            <div class="tiptap-icon">
              <svg width="16" height="16" class="tiptap-button-icon" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M14.7072 4.70711C15.0977 4.31658 15.0977 3.68342 14.7072 3.29289C14.3167 2.90237 13.6835 2.90237 13.293 3.29289L8.69294 7.89286L8.68594 7.9C8.13626 8.46079 7.82837 9.21474 7.82837 10C7.82837 10.2306 7.85491 10.4584 7.90631 10.6795L2.29289 16.2929C2.10536 16.4804 2 16.7348 2 17V20C2 20.5523 2.44772 21 3 21H12C12.2652 21 12.5196 20.8946 12.7071 20.7071L15.3205 18.0937C15.5416 18.1452 15.7695 18.1717 16.0001 18.1717C16.7853 18.1717 17.5393 17.8639 18.1001 17.3142L22.7072 12.7071C23.0977 12.3166 23.0977 11.6834 22.7072 11.2929C22.3167 10.9024 21.6835 10.9024 21.293 11.2929L16.6971 15.8887C16.5105 16.0702 16.2605 16.1717 16.0001 16.1717C15.7397 16.1717 15.4897 16.0702 15.303 15.8887L10.1113 10.697C9.92992 10.5104 9.82837 10.2604 9.82837 10C9.82837 9.73963 9.92992 9.48958 10.1113 9.30297L14.7072 4.70711ZM13.5858 17L9.00004 12.4142L4 17.4142V19H11.5858L13.5858 17Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
          </button>
          <div v-if="isHighlightListOpen" ref="highlightList" class="tiptap CList">
            <div v-for="colors in colorList" class="colors">
              <div
                v-for="color in colors"
                @click="handleSelectHighlightColor(color)"
                class="color-wrapper"
                :class="{ 'is-active': editor.isActive('highlight', { color: color }) }"
              >
                <div class="color" :style="`background:${color}`"></div>
              </div>
            </div>
            <div class="flex space-x-[4px] mt-[8px] items-center">
              <PxInput v-model="colorCode" class="flex-1" placeholder="#000000"></PxInput>
              <PxButton color="sec" class="w-[60px]" @click="handleSetHighlightColor">적용</PxButton>
            </div>
          </div>
        </div>
        <button @click="editor?.chain().focus().setHighlight({ color: '#ffcc00' }).run()" :disabled="!editor.can().chain().focus().setHighlight().run()">
          <PxIcon name="icon-code-bracket" class="tiptap-icon"></PxIcon>
        </button>

        <button @click="handleSetLink">
          <PxIcon name="icon-link" class="tiptap-icon"></PxIcon>
        </button>

        <div>
          <PxFileUploader id="tiptapImageUploader" @onError="emit('onError', $event)" @update:modelValue="handleAddImage" v-model="files" public>
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
        <button @click="editor?.chain().focus().setTextAlign('left').run()" :class="{ 'is-active': editor.isActive('paragraph', { textAlign: 'left' }) }">
          <PxIcon name="icon-align-left" class="tiptap-icon"></PxIcon>
        </button>
        <button @click="editor?.chain().focus().setTextAlign('center').run()" :class="{ 'is-active': editor.isActive('paragraph', { textAlign: 'center' }) }">
          <PxIcon name="icon-align-center" class="tiptap-icon"></PxIcon>
        </button>
        <button @click="editor?.chain().focus().setTextAlign('right').run()" :class="{ 'is-active': editor.isActive('paragraph', { textAlign: 'right' }) }">
          <PxIcon name="icon-align-right" class="tiptap-icon"></PxIcon>
        </button>
        <button @click="editor?.chain().focus().setTextAlign('justify').run()" :class="{ 'is-active': editor.isActive('paragraph', { textAlign: 'justify' }) }">
          <PxIcon name="icon-align-justify" class="tiptap-icon"></PxIcon>
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
