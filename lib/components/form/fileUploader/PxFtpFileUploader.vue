<script setup>
import { axiosInstance } from '@'
import { useError, useDownload } from '@/composables'

const props = defineProps({
  apiUrl: { type: String, default: `/api/v1/file-uploads` },
  id: { type: String, required: true },
  disabled: { type: Boolean },
  label: { type: String },
  labelHelper: { type: String },
  viewMode: { type: Boolean },
  ftpFolderSeq: { type: Number },
})
const emit = defineEmits(['update:cdnPath', 'onAppend'])

const { download } = useDownload()

const { clearError, setError } = useError()

const handleAppendFiles = async (files) => {
  clearError()

  await Promise.all(
    files.map(async (file) => {
      try {
        const ret = await axiosInstance.patch(`${props.apiUrl}/${props.ftpFolderSeq}`, file.formData)
        console.log('==========================', ret)
        if (ret) {
          emit('onAppend')
        }
        // if (ret) {
        //   // emit('update:cdnPath', ret.data.cdnPath)
        // }
      } catch (ex) {
        console.error('=================', ex)
        setError(ex)
      }
    })
  )
}
</script>

<template>
  <div>
    <!-- 얘는 네임드 업로드인데 버튼만 있음. 네임드 업로드하는 매커니즘 자체는 이 컴포넌트가 가지고 있고-->
    <PxFileUpload :id="id" multiple @onSelect="handleAppendFiles"></PxFileUpload>
  </div>
</template>
