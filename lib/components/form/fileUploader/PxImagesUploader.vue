<script setup>
import { axiosInstance } from '@'
import { reactive, watch, ref, computed, useSlots } from 'vue'
import { useError } from '@/composables'
import { useAutoAnimate } from '@formkit/auto-animate/vue'

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
  moveItem: { type: Boolean, default: false },
})
const emit = defineEmits(['update:modelValue'])
const { clearError } = useError()
const slots = useSlots()

const local = reactive({
  images: [],
})

const [parent] = useAutoAnimate()

const imageDialog = ref(null)
const selectedImgSrc = ref('')

const hasRoom = computed(() => {
  return local.images.length < props.maxCount
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
    console.log('==========================', ret)
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

const handleClickArrow = (direction, index) => {
  // 방향, 인덱스만 받으면 됨
  //

  if (direction === 'left') {
    const temp = local.images[index]
    local.images.splice(index, 1)
    local.images.splice(index - 1, 0, temp)
  } else {
    const temp = local.images[index]
    local.images.splice(index, 1)
    local.images.splice(index + 1, 0, temp)
  }
  updateModelValue()
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

load()
watch(
  () => props.modelValue,
  () => load(),
  { deep: true }
)
</script>

<template>
  <div class="px-imagesUploader">
    <template v-if="viewMode">
      <PxFormForView :viewMode="viewMode" :label="label">
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
        <PxLabel :label="label" :required="required"></PxLabel>

        <div>
          <div class="SCROLLDESIGN px-imageUploader" @dragend="handleDragEnd" ref="parent">
            <!-- 썸네일 영역 -->
            <div class="px-imageUploader--container" @click="handleClick(file, index)" v-for="(file, index) in local.images" :key="file.seq">
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
                  <template v-if="moveItem">
                    <div class="moveItem" :class="{ disabled: index === 0 }" @click="handleClickArrow('left', index)">
                      <PxIcon name="icon-chevron-left"></PxIcon>
                    </div>
                    <div class="moveItem" :class="{ disabled: index === local?.images.length - 1 }" @click="handleClickArrow('right', index)">
                      <PxIcon name="icon-chevron-right"></PxIcon>
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
              <PxFileUpload :extensions="extensions" fileType="image" :id="id" @onSelect="handleSelect($event)" v-if="id && hasRoom && !disabled">
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
