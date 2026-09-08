import FileUpload from './FileUpload.vue'
import FileUploader from './FileUploader.vue'
import FilesUploader from './FilesUploader.vue'
import FtpFileUploader from './FtpFileUploader.vue'
import ImagesUploader from './ImagesUploader.vue'

export default [
  {
    name: 'fileUpload',
    path: '/file-upload/file-upload',
    component: FileUpload,
    meta: {
      title: 'PxFileUpload',
      category: 'FILE UPLOAD',
      description: '파일을 선택하고 확장자와 크기를 검사한 뒤 FormData를 전달하는 기본 파일 선택 컴포넌트',
      keywords: ['PxFileUpload', 'file upload', '파일 업로드', '파일 선택', 'extensions', 'fileSize', 'multiple', 'onSelect', 'onError', 'button slot'],
    },
  },
  {
    name: 'fileUploader',
    path: '/file-upload/file-uploader',
    component: FileUploader,
    meta: {
      title: 'PxFileUploader',
      category: 'FILE UPLOAD',
      description: '선택한 파일을 서버에 즉시 업로드하고 결과 배열을 갱신하는 업로더',
      keywords: ['PxFileUploader', 'file uploader', '단일 파일', 'axios', 'apiUrl', 'single', 'public', 'v-model', 'button slot'],
    },
  },
  {
    name: 'filesUploader',
    path: '/file-upload/files-uploader',
    component: FilesUploader,
    meta: {
      title: 'PxFilesUploader',
      category: 'FILE UPLOAD',
      description: '여러 파일의 업로드, 목록, 다운로드와 삭제를 함께 제공하는 업로더',
      keywords: ['PxFilesUploader', 'files uploader', '다중 파일', '파일 목록', 'download', 'remove', 'max', 'buttonOnly', 'axios', 'v-model'],
    },
  },
  {
    name: 'ftpFileUploader',
    path: '/file-upload/ftp-file-uploader',
    component: FtpFileUploader,
    meta: {
      title: 'PxFtpFileUploader',
      category: 'FILE UPLOAD',
      description: '선택한 여러 파일을 FTP 폴더 식별자 기준으로 PATCH 업로드하는 컴포넌트',
      keywords: ['PxFtpFileUploader', 'FTP', 'ftpFolderSeq', 'multiple', 'PATCH', 'onAppend', 'axios', '파일 업로드'],
    },
  },
  {
    name: 'imagesUploader',
    path: '/file-upload/images-uploader',
    component: ImagesUploader,
    meta: {
      title: 'PxImagesUploader',
      category: 'FILE UPLOAD',
      description: '이미지 미리보기, 해상도와 비율 검사, 순서 변경을 제공하는 이미지 업로더',
      keywords: ['PxImagesUploader', 'image uploader', '이미지 업로드', '미리보기', 'maxCount', 'maxResolution', 'minResolution', 'ratio', 'moveItem', 'showFileSize'],
    },
  },
]
