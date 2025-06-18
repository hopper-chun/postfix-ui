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
  fileSize: { type: Number, default: 0 },
  viewMode: { type: Boolean, default: false },
  public: { type: Boolean, default: false },
  label: { type: String },
  extensions: { type: String },
  buttonOnly: { type: Boolean, default: false },
  moveItem: { type: Boolean, default: false },
  maxResolution: { type: Object },
  minResolution: { type: Object },
  ratio: { type: Object },
  md: { type: String },
  extraQuery: { type: Object },
})
const emit = defineEmits(['update:modelValue', 'onError'])
const { clearError, causeError } = useError()
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
        width: image.width,
        height: image.height,
      }
    })
  )
}

const isError = ref([])

const handleSelect = async ({ originalFilename, formData, fileBuffer, width, height }) => {
  try {
    if (props.maxResolution && (props.maxResolution.width < width || props.maxResolution.height < height)) {
      causeError({ id: props.id, msg: `해상도는 ${props.maxResolution.width || '-'} * ${props.maxResolution.height || '-'} 를 넘을 수 없습니다.` })
      // alert(`해상도는 ${props.maxResolution.width} * ${props.maxResolution.height} 를 넘을 수 없습니다.`)
      return
    }

    if (props.minResolution && (props.minResolution.width > width || props.minResolution.height > height)) {
      causeError({ id: props.id, msg: `해상도는 최소 ${props.minResolution.width || '-'} * ${props.minResolution.height || '-'} 이상이어야 합니다.` })

      return
    }

    if (props.ratio && width / height != props.ratio.width / props.ratio.height) {
      causeError({ id: props.id, msg: `이미지의 가로:세로 비율이 ${props.ratio.width}:${props.ratio.height}여야 합니다` })

      return
    }

    const options = { params: {} }
    if (props.public) {
      options.params.public = 1
    }
    if (props.extraQuery) {
      options.params = {
        ...props.extraQuery,
        ...options.params,
      }
    }

    const ret = await axiosInstance.post(props.apiUrl, formData, options)
    console.log('==========================', ret)

    // if(props.fileSize) {

    // }

    if (ret) {
      // local.images.push({ seq: ret.data.seq, cdnPath: ret.data.cdnPath, originalFilename, src: fileBuffer })
      local.images.push({ seq: ret.data.seq, cdnPath: ret.data.cdnPath, originalFilename, width, height })
      updateModelValue()
    }
  } catch (ex) {
    console.error('=================', ex)
    return null
  }
}

const handleClickArrow = (direction, index) => {
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
  isError.value.splice(index, 1) // 에러 상황도 같이 제거되어야 함
  updateModelValue()
}

const handleClick = (file, index) => {
  selectedImgSrc.value = file
}

// 이미지 로드에 실패하면 해당 index는 에러체크(true)
const handleError = (index) => {
  isError.value[index] = true
}

// 이미지 로드에 성공하면 해당 index는 false
const handleLoad = (index) => {
  isError.value[index] = false
}

load()
watch(
  () => props.modelValue,
  () => load(),
  { deep: true }
)
</script>

<!-- 
플로우
1. 이미지를 미리보기했을 때, 어느 방향이든 에러가 나면, 해당 index의 상태를 true로 둠.
-->
<template>
  <div class="px-imagesUploader">
    <template v-if="viewMode">
      <PxFormForView :viewMode="viewMode" :label="label" :md="md">
        <div class="px-imagesUploader--container">
          <template v-for="(image, index) in local.images">
            <div class="px-imagesUploader--thumbnail">
              <!-- 미리보기 에러났을 때 -->
              <a v-if="isError[index]" :href="image.cdnPath" target="_blank">
                <div class="px-imageUpload--label" style="text-align: center">다운로드</div>
              </a>

              <!-- 정상 -->
              <div v-else @click="handleOpen(image.cdnPath)">
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
                    <!-- 미리보기 에러났을 때 -->
                    <a v-if="isError[index]" :href="file.cdnPath" target="_blank">
                      <div class="px-imageUpload--label" style="text-align: center">다운로드</div>
                    </a>

                    <!-- 정상 -->
                    <img
                      v-else
                      :draggable="false"
                      @click="handleOpen(file.cdnPath)"
                      class="px-imageUpload--label"
                      :src="imageSrc(file)"
                      alt=""
                      @error="handleError(index)"
                      @load="handleLoad(index)"
                    />
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
              <PxFileUpload
                :fileSize="fileSize"
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
