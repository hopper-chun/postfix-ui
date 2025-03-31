<script setup>
import { axiosInstance } from '@'
import { reactive, computed, watch, useSlots } from 'vue'
import { useError, useDownload } from '@/composables'

const slots = useSlots()

const props = defineProps({
  apiUrl: { type: String, default: `/api/v1/file-uploads` },
  id: { type: String, required: true },
  modelValue: { type: Array, required: true },
  max: { type: Number, default: 1 },
  disabled: { type: Boolean },
  label: { type: String },
  labelHelper: { type: String },
  viewMode: { type: Boolean },
  required: { type: Boolean },
  extensions: { type: String },
  buttonOnly: { type: Boolean },
  public: { type: Boolean },
  md: { type: String },
})
const emit = defineEmits(['update:modelValue', 'onError'])

const { download } = useDownload()

const local = reactive({
  files: [],
})

const load = () => {
  local.files = props.modelValue.map((file) => {
    return { seq: file.seq, localPath: file.localPath, cdnPath: file.cdnPath, originalFilename: file.originalFilename }
  })
}

load()
watch(
  () => props.modelValue,
  () => load()
)

const { clearError, setError } = useError()

const hasRoom = computed(() => {
  return local.files.length < props.max
})

const handleAppendFile = async ({ originalFilename, formData, fileBuffer }) => {
  clearError()
  try {
    const ret = await axiosInstance.post(`${props.apiUrl}/${props.public ? '?public=1' : ''}`, formData)
    console.log('==========================', ret)
    if (ret) {
      // local.files.push({ seq: ret.data.seq, cdnPath: ret.data.cdnPath, originalFilename, src: fileBuffer })
      local.files.push({ seq: ret.data.seq, cdnPath: ret.data.cdnPath, originalFilename })
      emit('update:modelValue', local.files)
    }
  } catch (ex) {
    console.error('=================', ex)
    setError(ex)
  }
}

const handleRemove = (index) => {
  local.files.splice(index, 1)
  emit('update:modelValue', local.files)
}

const handleDownload = async (file) => {
  console.log('file', file)
  const url = file.cdnPath
  const filename = file.originalFilename
  //
  console.log('url', url, filename)

  await download(url, filename)
}
</script>

<template>
  <div class="px-fileUploader labelSwitch start">
    <div v-if="label">
      <div :class="{ viewMode }">
        <PxLabel :label="label" :labelHelper="labelHelper" :md="md" :required="required"></PxLabel>
      </div>
    </div>
    <div class="px-fileUploader--container">
      <div v-if="!viewMode">
        <PxFileUpload :id="id" @onSelect="handleAppendFile" @onError="emit('onError', $event)" :extensions="extensions" :disabled="disabled" v-if="hasRoom">
          <template v-if="!!slots.button" #button>
            <slot name="button"></slot>
          </template>
        </PxFileUpload>
      </div>
      <div v-if="!buttonOnly" class="fileList">
        <div v-for="(file, index) in local.files">
          <div class="px-fileUploader--list">
            <div class="name">
              {{ file.originalFilename }}
            </div>
            <div class="icon" @click="handleDownload(file)">
              <PxIcon name="icon-download-rounded"></PxIcon>
            </div>
            <div class="icon" @click="handleRemove(index)" v-if="disabled">
              <PxIcon name="icon-close"></PxIcon>
            </div>
          </div>
        </div>
      </div>
    </div>
    <PxError :id="id" isFocusable></PxError>
  </div>
</template>
