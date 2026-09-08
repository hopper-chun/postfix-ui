<script setup>
import { ref } from 'vue'
import CodeBlock from '../../components/CodeBlock.vue'
import DocsTable from '../../components/DocsTable.vue'
import sampleImage from '../../../../lib/assets/default/default-avatar.png'

const images = ref([
  {
    seq: 201,
    cdnPath: sampleImage,
    originalFilename: 'default-avatar.png',
    fileSize: 28400,
  },
])

const basicCode = `const images = ref([])

<PxImagesUploader
  id="product-images"
  v-model="images"
  label="상품 이미지"
  extensions=".jpg,.jpeg,.png"
  :maxCount="5"
  :fileSize="5 * 1024 * 1024"
  :minResolution="{ width: 600, height: 600 }"
  :maxResolution="{ width: 2000, height: 2000 }"
  :ratio="{ width: 1, height: 1 }"
  moveItem
  showFileSize
  @onError="handleError"
/>`

const responseCode = `// POST apiUrl 응답에서 사용하는 값
{
  data: {
    seq: 201,
    cdnPath: 'https://cdn.example.com/product/image.jpg',
    fileSize: 28400,
    imageSize: { width: 1200, height: 1200 }, // 선택
    saveFilename: 'generated-name.jpg'        // 선택
  }
}`

const customClassCode = `<div class="project-images-uploader">
  <PxImagesUploader id="gallery" v-model="images" :maxCount="5" />
</div>

<style>
.project-images-uploader .px-imageUpload--label {
  width: 128px;
  height: 128px;
  border: 3px solid #0891b2;
  border-radius: 18px;
  background-color: #ecfeff;
  box-shadow: 0 14px 30px rgba(8, 145, 178, 0.24);
}

.project-images-uploader .px-imageUploader--icon > * {
  border: 0;
  border-radius: 8px;
  background-color: #164e63;
  color: #ffffff;
}
</style>`

const propHeaders = [
  { field: 'name', label: '이름', code: true },
  { field: 'type', label: '타입' },
  { field: 'defaultValue', label: '기본값' },
  { field: 'description', label: '설명' },
]

const propRows = [
  { name: 'id', type: 'String', defaultValue: '필수', description: '파일 input 및 PxError 연결 ID' },
  { name: 'modelValue', type: 'Array', defaultValue: '필수', description: '이미지 파일 객체 배열' },
  { name: 'apiUrl', type: 'String', defaultValue: '/api/v1/file-uploads', description: 'POST 업로드 API 주소' },
  { name: 'maxCount', type: 'Number', defaultValue: '1', description: '최대 이미지 개수' },
  { name: 'fileSize', type: 'Number', defaultValue: '0', description: '이미지 하나의 최대 파일 크기(byte)' },
  { name: 'extensions', type: 'String', defaultValue: '-', description: '허용 이미지 확장자 목록' },
  { name: 'maxResolution', type: 'Object', defaultValue: '-', description: '{ width, height } 최대 해상도' },
  { name: 'minResolution', type: 'Object', defaultValue: '-', description: '{ width, height } 최소 해상도' },
  { name: 'ratio', type: 'Object', defaultValue: '-', description: '{ width, height }로 정확히 일치해야 하는 가로세로 비율' },
  { name: 'moveItem', type: 'Boolean', defaultValue: 'false', description: '썸네일에 좌우 순서 변경 버튼 표시' },
  { name: 'showFileSize', type: 'Boolean', defaultValue: 'false', description: '썸네일 아래 파일 크기 표시' },
  { name: 'removeButton', type: 'Boolean', defaultValue: 'false', description: 'true이면 새 이미지 업로드 버튼을 숨김' },
  { name: 'disabled', type: 'Boolean', defaultValue: 'false', description: '업로드와 삭제 비활성화' },
  { name: 'viewMode', type: 'Boolean', defaultValue: 'false', description: '조회용 이미지 목록으로 표시' },
  { name: 'public', type: 'Boolean', defaultValue: 'false', description: '요청 쿼리에 public=1 추가' },
  { name: 'extraQuery', type: 'Object', defaultValue: '-', description: '업로드 요청에 추가할 쿼리 객체' },
  { name: 'label', type: 'String', defaultValue: '-', description: 'PxLabel 문구' },
  { name: 'required', type: 'Boolean', defaultValue: 'false', description: '필수 표시' },
  { name: 'md', type: 'String', defaultValue: '-', description: '모바일 라벨 배치 설정' },
  { name: 'style', type: 'String', defaultValue: 'h-[80px] w-[80px]', description: '현재 템플릿에서 사용하지 않음' },
  { name: 'buttonOnly', type: 'Boolean', defaultValue: 'false', description: '현재 템플릿에서 사용하지 않음' },
]

const eventHeaders = [
  { field: 'name', label: '이벤트', code: true },
  { field: 'description', label: '설명' },
]

const eventRows = [
  { name: 'update:modelValue', description: '업로드, 삭제 또는 순서 변경 후 이미지 배열 전달' },
  { name: 'onError', description: '내부 PxFileUpload의 확장자 및 파일 크기 오류 전달' },
]

const classHeaders = [
  { field: 'className', label: '클래스', html: true },
  { field: 'description', label: '용도' },
]

const classRows = [
  { className: '<code>px-imagesUploader</code>', description: '컴포넌트 최상위' },
  { className: '<code>px-imageUploader</code>', description: '편집 모드의 가로 스크롤 목록' },
  { className: '<code>px-imageUploader--container</code>', description: '이미지 하나의 썸네일과 파일 크기 영역' },
  { className: '<code>px-imageUploader--thumbnail</code>', description: '편집 모드 썸네일' },
  { className: '<code>px-imageUploader--icon</code>', description: '순서 변경과 삭제 동작 영역' },
  { className: '<code>moveItem</code> / <code>remove</code>', description: '순서 변경 및 삭제 버튼' },
  { className: '<code>px-imagesUploader--container</code>', description: '조회 모드 이미지 목록' },
  { className: '<code>px-imagesUploader--thumbnail</code>', description: '조회 모드 썸네일' },
  { className: '<code>px-imageUpload--label</code>', description: '이미지와 새 이미지 선택 영역의 공통 크기' },
]
</script>

<template>
  <article class="docs-page">
    <p class="docs-eyebrow">FILE UPLOAD</p>
    <h1>PxImagesUploader</h1>
    <p class="docs-lead">이미지 업로드와 미리보기, 해상도·비율 검사, 삭제 및 순서 변경을 한 번에 처리합니다.</p>

    <section class="docs-section">
      <h2>기본 사용</h2>
      <div class="example-preview pointer-events-none">
        <PxImagesUploader id="docs-product-images" v-model="images" label="상품 이미지" :maxCount="5" disabled showFileSize />
      </div>
      <CodeBlock :code="basicCode" />
      <p class="docs-note">
        이미지 선택 직후 브라우저에서 해상도와 비율을 검사하고, 통과한 파일만 서버에 전송합니다. <code>ratio</code>는 근사값이 아니라 실제
        <code>width / height</code> 값이 지정 비율과 정확히 같아야 합니다.
      </p>
    </section>

    <section class="docs-section">
      <h2>API 응답 형태</h2>
      <CodeBlock :code="responseCode" />
      <p class="docs-note">
        <code>seq</code>, <code>cdnPath</code>, <code>fileSize</code>를 사용하며 <code>imageSize</code>와 <code>saveFilename</code>은 응답에 있을 때 v-model에도 보존합니다.
      </p>
    </section>

    <section class="docs-section">
      <h2>Props와 Events</h2>
      <DocsTable :headers="propHeaders" :rows="propRows" />
      <DocsTable class="mt-[14px]" :headers="eventHeaders" :rows="eventRows" />
      <p class="docs-note"><code>button</code> 슬롯으로 새 이미지 선택 UI를 교체할 수 있습니다.</p>
    </section>

    <section class="docs-section">
      <h2>Class로 스타일 재정의</h2>
      <DocsTable :headers="classHeaders" :rows="classRows" />
      <div class="example-preview mt-[20px] pointer-events-none">
        <div class="project-images-uploader">
          <PxImagesUploader id="docs-gallery" v-model="images" :maxCount="5" disabled showFileSize />
        </div>
      </div>
      <CodeBlock :code="customClassCode" />
    </section>
  </article>
</template>

<style>
.project-images-uploader .px-imageUpload--label {
  width: 128px;
  height: 128px;
  border: 3px solid #0891b2;
  border-radius: 18px;
  background-color: #ecfeff;
  box-shadow: 0 14px 30px rgba(8, 145, 178, 0.24);
}

.project-images-uploader .px-imageUploader--icon > * {
  border: 0;
  border-radius: 8px;
  background-color: #164e63;
  color: #ffffff;
}
</style>
