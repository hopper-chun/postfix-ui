<script setup>
import { axiosInstance } from '@'
import { reactive, watch, ref, computed, useSlots } from 'vue'
import { useError } from '@/composables'

const props = defineProps({
  apiUrl: { type: String, default: `/api/v1/file-uploads` },
  id: { type: String, required: true },
  required: { type: Boolean, default: false },
  modelValue: { type: Array, required: true },
  maxCount: { type: Number, default: 1 },
  disabled: { type: Boolean, default: false },
  style: { type: String, default: 'h-[80px] w-[80px]' },
  viewMode: { type: Boolean, default: false },
  public: { type: Boolean, default: false },
  label: { type: String },
  extensions: { type: String },
  buttonOnly: { type: Boolean, default: false },
  draggable: { type: Boolean, default: false },
  md: { type: String },
})
const emit = defineEmits(['update:modelValue', 'onError'])
const { clearError } = useError()
const slots = useSlots()

const local = reactive({
  images: [],
})

const imageDialog = ref(null)
const selectedImgSrc = ref('')

const hasRoom = computed(() => {
  return local.images.length < props.maxCount
})

const mouseDowned = ref(false)

const isDraggable = computed(() => {
  return props.draggable && mouseDowned.value
})

const load = () => {
  local.images = props.modelValue.map((image) => {
    return { seq: image.seq, cdnPath: image.cdnPath, originalFilename: image.originalFilename }
    // return { seq: image.seq, localPath: image.localPath, cdnPath: image.cdnPath }
  })
}

const updateModelValue = () => {
  clearError()
  emit(
    'update:modelValue',
    local.images.map((image) => {
      return {
        seq: image.seq,
        cdnPath: image.cdnPath || '',
        originalFilename: image.originalFilename,
      }
    })
  )
}

const handleSelect = async ({ originalFilename, formData, fileBuffer }) => {
  try {
    const ret = await axiosInstance.post(`${props.apiUrl}/${props.public ? '?public=1' : ''}`, formData)

    if (ret) {
      // local.images.push({ seq: ret.data.seq, cdnPath: ret.data.cdnPath, originalFilename, src: fileBuffer })
      local.images.push({ seq: ret.data.seq, cdnPath: ret.data.cdnPath, originalFilename })
      updateModelValue()
    }
  } catch (ex) {
    console.error('=================', ex)
    return null
  }
}

const handleDragDrop = ({ sourceItem, targetItem, targetIndex }) => {
  const index = local.images.findIndex((file) => file.seq === sourceItem.seq)
  if (index !== -1 && index !== targetIndex && index + 1 !== targetIndex) {
    // 아래에서 위로
    if (index > targetIndex) {
      const temp = local.images[index]
      local.images.splice(index, 1)
      local.images.splice(targetIndex, 0, temp)
    } else {
      const temp = local.images[index]
      local.images.splice(targetIndex, 0, temp)
      local.images.splice(index, 1)
    }
    updateModelValue()
  }
}

const imageSrc = (image) => {
  if (image.cdnPath) return image.cdnPath
  else return ''
}

const handleOpen = (src) => {
  imageDialog.value.openDialog(src)
}

const handleAttachRemove = (index) => {
  local.images.splice(index, 1)
  updateModelValue()
}

const handleClick = (file, index) => {
  selectedImgSrc.value = file
}

const mouseDown = () => {
  mouseDowned.value = true
}
const reset = () => {
  mouseDowned.value = false
}

const handleDragStart = (event, item) => {
  if (!isDraggable.value) {
    // console.log('비정상@!!ㄴ')
    return
  }
  event.dataTransfer.dropEffect = 'move'
  event.dataTransfer.effectAllowed = 'move'
  event.dataTransfer.setData('value', JSON.stringify(item))
  // console.log('handleDragStart', event)
}
const handleDragOver = (event, direction) => {
  // 이미지는 그냥 드래깅이 시작되는 수가 있다

  if (!isDraggable.value) {
    return
  }

  event.preventDefault()
  event.target.classList.add(direction === 'left' ? 'border-l-4' : 'border-r-4')
  event.target.classList.add('border-red-300')
}
const handleDragLeave = (event, direction) => {
  event.preventDefault()
  event.target.classList.remove(direction === 'left' ? 'border-l-4' : 'border-r-4')
  event.target.classList.remove('border-red-300')
}
const handleDrop = (event, targetItem, targetIndex) => {
  event.target.classList.remove('border-l-4')
  event.target.classList.remove('border-r-4')
  event.target.classList.remove('border-red-300')

  const payload = event.dataTransfer.getData('value')
  if (!payload) {
    return
  }
  const sourceItem = JSON.parse(payload)
  handleDragDrop({ sourceItem, targetItem, targetIndex })
}

const handleDragEnd = () => {
  reset()
}

load()
watch(
  () => props.modelValue,
  () => load()
)
</script>

<template>
  <div class="px-imagesUploader">
    <template v-if="viewMode">
      <PxFormForView :viewMode="viewMode" :label="label" :md="md">
        <div class="px-imagesUploader--container">
          <template v-for="image in local.images">
            <div class="px-imagesUploader--thumbnail">
              <div @click="handleOpen(image.cdnPath)">
                <img :src="image.cdnPath" alt="" class="px-imageUpload--label" />
              </div>
            </div>
          </template>
        </div>
      </PxFormForView>
    </template>
    <template v-else>
      <div class="labelSwitch start">
        <PxLabel :label="label" :required="required" :md="md"></PxLabel>

        <div>
          <div class="SCROLLDESIGN px-imageUploader" @dragend="handleDragEnd">
            <!-- 썸네일 영역 -->
            <div
              class="px-imageUploader--container"
              @dragstart="handleDragStart($event, file)"
              :draggable="isDraggable"
              @click="handleClick(file, index)"
              v-for="(file, index) in local.images"
              :key="file"
            >
              <!-- 드래거블 영역 -->
              <template v-if="!disabled && draggable">
                <div
                  class="px-imageUploader--left"
                  @drop="handleDrop($event, file, index)"
                  @dragover="handleDragOver($event, 'left')"
                  @dragleave="handleDragLeave($event, 'left')"
                  @click="handleOpen(file.cdnPath)"
                ></div>
                <!-- @dragenter.prevent -->
                <div
                  class="px-imageUploader--right"
                  @drop="handleDrop($event, file, index + 1)"
                  @dragover="handleDragOver($event, 'right')"
                  @dragleave="handleDragLeave($event, 'right')"
                  @click="handleOpen(file.cdnPath)"
                ></div>
              </template>

              <!-- 본체 -->
              <div class="px-imageUploader--thumbnail">
                <!-- src가 있을 때 (imagesUploader에서 src는 원천적으로 차단하는데 왜 이 조건이 있는지 이해불가 ) -->
                <template v-if="file.src">
                  <img @click="handleOpen(file.src)" class="px-imageUpload--label" :src="file.src" alt="" />
                </template>

                <!-- cdnPath 가 있을 때 -->
                <template v-else>
                  <!-- 이미지임 -->
                  <div>
                    <img :draggable="false" @click="handleOpen(file.cdnPath)" class="px-imageUpload--label" :src="imageSrc(file)" alt="" />
                  </div>
                </template>

                <!-- 우상단 아이콘 -->
                <div class="px-imageUploader--icon">
                  <template v-if="draggable">
                    <div class="draggable" @mousedown="mouseDown" @mouseup="mouseUp" @click.stop="">
                      <PxIcon name="icon-arrows-expand"></PxIcon>
                    </div>
                  </template>
                  <button type="button" class="remove" @click.stop="handleAttachRemove(index)" v-if="!disabled">
                    <PxIcon name="icon-trash"></PxIcon>
                  </button>
                </div>
              </div>
            </div>

            <!-- 업로드 버튼 -->
            <div>
              <PxFileUpload
                :extensions="extensions"
                fileType="image"
                :id="id"
                @onSelect="handleSelect($event)"
                @onError="emit('onError', $event)"
                v-if="id && hasRoom && !disabled"
              >
                <template v-if="!!slots.button" #button>
                  <slot name="button"></slot>
                </template>
              </PxFileUpload>
            </div>
          </div>

          <PxError :id="id" :isFocusable="true"></PxError>
        </div>
      </div>
    </template>
    <PxDialogImage :viewMode="viewMode" ref="imageDialog"></PxDialogImage>
  </div>
</template>
