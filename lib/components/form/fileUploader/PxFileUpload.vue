<script setup>
import { ref, useSlots } from 'vue'
import { useError } from '@/composables'

const props = defineProps({
  id: { type: String, required: true },
  extensions: { type: String },
  fileType: { type: String, default: 'file' },
  multiple: { type: Boolean },
  disabled: { type: Boolean },
  fileSize: { type: Number, default: 0 },
  isDoing: { type: Boolean },
})

const emit = defineEmits(['onSelect', 'onError'])
const slots = useSlots()
const { clearError, causeError } = useError()

const fileRef = ref(null)

const reset = () => {
  fileRef.value = ''
}

const loadImg = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (event) => {
      // 이미지 객체를 생성합니다.
      const image = new Image()

      image.onload = function () {
        // 이미지 객체의 너비와 높이를 가져옵니다.
        const width = this.width
        const height = this.height

        resolve({ fileBuffer: event.target.result, width, height })
      }

      image.onerror = () => {
        resolve({ fileBuffer: event.target.result })
      }

      // 이미지 객체에 파일 데이터를 설정하고 로드합니다.
      image.src = event.target.result
    }

    reader.addEventListener('error', () => {
      reject('Failed to load img')
    })
    reader.readAsDataURL(file)
  })
}

function formatFileSize(bytes, decimals = 2) {
  // 0 바이트인 경우
  if (bytes === 0) return '0 Bytes'

  // 음수인 경우 처리
  if (bytes < 0) return 'Invalid size'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}
const selectFile = async (event) => {
  clearError()

  try {
    // extention으로 제한 걸어도 모든파일(*.*)을 통해서 이상한걸 업로드 할 수 있게 됨. 여기서 한번 더 잡아줘야함
    const allowedExtenstions = props.extensions ? props.extensions.split(',').map((ext) => ext.trim().replace(/^\./, '').toLowerCase()) : []

    if (allowedExtenstions.length > 0) {
      for (const file of event.target.files) {
        const fileExe = file.name.split('.').pop().toLowerCase()

        if (!allowedExtenstions.includes(fileExe)) {
          emit('onError', `확장자가 잘못되었습니다. ${props.extensions} 파일만 업로드 할 수 있습니다.`)
          causeError({ id: props.id, msg: `확장자가 잘못되었습니다. ${props.extensions} 파일만 업로드 할 수 있습니다.` })
          // alert(`확장자가 잘못되었습니다. ${props.extensions} 파일만 업로드 할 수 있습니다.`)
          return
        }
      }
    }

    const errStr = `파일 사이즈가 너무 큽니다. 최대 ${formatFileSize(props.fileSize)}까지 허용됩니다.`
    if (!props.multiple) {
      const file = event.target.files[0]

      if (props.fileSize && event.target.files[0].size > props.fileSize) {
        emit('onError', errStr)
        causeError({ id: props.id, msg: errStr })
        return
      }

      const { fileBuffer, width, height } = await loadImg(file)

      const formData = new FormData()
      formData.append('file', file)

      emit('onSelect', { originalFilename: file.name, formData, fileBuffer, width, height })
    } else {
      const files = Array.from(event.target.files).map((file) => {
        if (props.fileSize && files.size > props.fileSize) {
          emit('onError', errStr)
          causeError({ id: props.id, msg: errStr })
          return
        }

        const formData = new FormData()
        formData.append('file', file)

        return { originalFilename: file.name, formData }
      })

      emit('onSelect', files)
    }
  } finally {
    // input 값을 리셋합니다
    event.target.value = ''
    reset()
  }
}
</script>
<template>
  <div v-if="!!slots.button" class="px-customUpload">
    <label :for="id" class="px-customUpload--label">
      <div>
        <slot name="button" :isDoing="isDoing"></slot>
      </div>
      <input v-if="!disabled && !isDoing" :id="id" ref="fileRef" :multiple="multiple" type="file" :accept="extensions" @change="selectFile" />
    </label>
  </div>
  <div v-else-if="fileType === 'image'" class="px-imageUpload">
    <label :for="id" class="px-imageUpload--label">
      <div class="px-imageUpload--icon">
        <!-- <PxIcon name="icon-plus" class="w-[21px]"></PxIcon> -->
      </div>
      <input :id="id" type="file" :accept="extensions" @change="selectFile" />
    </label>
  </div>
  <div v-else class="px-fileUpload">
    <label :for="id" class="px-fileUpload--label" :class="{ disabled: disabled || isDoing }">
      <div v-if="isDoing" class="SEARCHING">
        <PxIcon name="icon-refresh" isLib class="px-adminTable--refresh_icon"></PxIcon>
      </div>
      <div v-else class="px-fileUpload--icon"></div>
      <!-- <PxIcon name="icon-upload" class="h-[24px] w-[24px]"></PxIcon> -->

      <div class="px-fileUpload--text">{{ isDoing ? '업로드 중' : '파일 업로드' }}</div>

      <input v-if="!disabled && !isDoing" :id="id" ref="fileRef" :multiple="multiple" type="file" :accept="extensions" @change="selectFile" />
    </label>
  </div>
</template>
