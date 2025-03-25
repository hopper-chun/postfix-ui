<script setup>
import { axiosInstance } from '@'
import { ref, watch, useSlots } from 'vue'
import { useError } from '@/composables'

const slots = useSlots()

const props = defineProps({
  apiUrl: { type: String, default: `/api/v1/file-uploads` },
  id: { type: String, required: true },
  modelValue: { type: Array, required: true },
  disabled: { type: Boolean },
  label: { type: String },
  labelHelper: { type: String },
  viewMode: { type: Boolean },
  required: { type: Boolean },
  extensions: { type: String },
  public: { type: Boolean },
  single: { type: Boolean },
})
const emit = defineEmits(['update:modelValue', 'onError'])

const isDoing = ref(false)

const local = ref({
  files: [],
})

const load = () => {
  local.value.files = props.modelValue.map((file) => {
    return { seq: file.seq, localPath: file.localPath, cdnPath: file.cdnPath, originalFilename: file.originalFilename }
  })
}

load()
watch(
  () => props.modelValue,
  () => load()
)

const { clearError, setError } = useError()

const handleAppendFile = async ({ originalFilename, formData, fileBuffer }) => {
  isDoing.value = true

  clearError()
  try {
    const ret = await axiosInstance.post(`${props.apiUrl}/${props.public ? '?public=1' : ''}`, formData)
    console.log('==========================', ret)
    if (ret) {
      // local.files.push({ seq: ret.data.seq, cdnPath: ret.data.cdnPath, originalFilename, src: fileBuffer })
      if (props.single) {
        local.value.files[0] = { seq: ret.data.seq, cdnPath: ret.data.cdnPath, originalFilename }
      } else {
        local.value.files.push({ seq: ret.data.seq, cdnPath: ret.data.cdnPath, originalFilename })
      }

      emit('update:modelValue', local.value.files)
    }
  } catch (ex) {
    console.error('=================', ex)
    setError(ex)
  } finally {
    isDoing.value = false
  }
}
</script>

<template>
  <div class="px-fileUploader labelSwitch start">
    <div v-if="label">
      <div :class="{ viewMode }">
        <PxLabel :label="label" :labelHelper="labelHelper" :required="required"></PxLabel>
      </div>
    </div>
    <div class="px-fileUploader--container">
      <div v-if="!viewMode">
        <PxFileUpload :id="id" :isDoing="isDoing" @onSelect="handleAppendFile" @onError="emit('onError', $event)" :extensions="extensions" :disabled="disabled">
          <template v-if="!!slots.button" #button>
            <slot name="button"></slot>
          </template>
        </PxFileUpload>
      </div>
    </div>

    <PxError :id="id" isFocusable></PxError>
  </div>
</template>
