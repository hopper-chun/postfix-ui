<script setup>
import { ref, useSlots } from 'vue'

const props = defineProps({
  id: { type: String, required: true },
  extensions: { type: String },
  fileType: { type: String, default: 'file' },
  multiple: { type: Boolean },
  disabled: { type: Boolean },
})
const emit = defineEmits(['onSelect'])
const slots = useSlots()

const fileRef = ref(null)

const reset = () => {
  fileRef.value.value = ''
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
  if (!props.multiple) {
    const file = event.target.files[0]

    const fileBuffer = await loadImg(file)

    const formData = new FormData()
    formData.append('file', file)

    reset()

    emit('onSelect', { originalFilename: file.name, formData, fileBuffer })
  } else {
    const files = Array.from(event.target.files).map((file) => {
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
  <div v-if="!!slots.default" class="px-customUpload">
    <label :for="id" class="px-customUpload--label">
      <div>
        <slot></slot>
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
