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
})

const emit = defineEmits(['onSelect'])
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
      resolve(event.target.result)
    }
    reader.addEventListener('error', () => {
      reject('Failed to load img')
    })
    reader.readAsDataURL(file)
  })
}
const selectFile = async (event) => {
  clearError()

  // extention으로 제한 걸어도 모든파일(*.*)을 통해서 이상한걸 업로드 할 수 있게 됨. 여기서 한번 더 잡아줘야함

  if (!props.multiple) {
    const file = event.target.files[0]

    if (props.fileSize && event.target.files[0].size > props.fileSize) {
      causeError({ id: props.id, msg: '파일 사이즈가 너무 큽니다' })
      return
    }

    const fileBuffer = await loadImg(file)

    const formData = new FormData()
    formData.append('file', file)

    reset()

    emit('onSelect', { originalFilename: file.name, formData, fileBuffer })
  } else {
    const files = Array.from(event.target.files).map((file) => {
      if (props.fileSize && files.size > props.fileSize) {
        causeError({ id: props.id, msg: '파일 사이즈가 너무 큽니다' })
        return
      }

      const formData = new FormData()
      formData.append('file', file)

      return { originalFilename: file.name, formData }
    })

    reset()

    emit('onSelect', files)
  }
}
</script>
<template>
  <div v-if="!!slots.button" class="px-customUpload">
    <label :for="id" class="px-customUpload--label">
      <div>
        <slot name="button"></slot>
      </div>
      <input v-if="!disabled" :id="id" ref="fileRef" :multiple="multiple" type="file" :accept="extensions" @change="selectFile" />
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
    <label :for="id" class="px-fileUpload--label" :class="{ disabled }">
      <div class="px-fileUpload--icon"></div>
      <!-- <PxIcon name="icon-upload" class="h-[24px] w-[24px]"></PxIcon> -->
      <div class="px-fileUpload--text">파일 업로드</div>

      <input v-if="!disabled" :id="id" ref="fileRef" :multiple="multiple" type="file" :accept="extensions" @change="selectFile" />
    </label>
  </div>
</template>
