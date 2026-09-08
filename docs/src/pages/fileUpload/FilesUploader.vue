<script setup>
import { ref } from 'vue'
import CodeBlock from '../../components/CodeBlock.vue'
import DocsTable from '../../components/DocsTable.vue'

const files = ref([
  { seq: 101, cdnPath: '/files/project-plan.pdf', originalFilename: '프로젝트-기획서.pdf' },
  { seq: 102, cdnPath: '/files/estimate.xlsx', originalFilename: '견적서.xlsx' },
])

const basicCode = `const files = ref([])

<PxFilesUploader
  id="attachments"
  v-model="files"
  label="첨부 파일"
  :max="5"
  extensions=".pdf,.xlsx,.docx"
  apiUrl="/api/v1/file-uploads"
  @onError="handleError"
/>`

const customClassCode = `<div class="project-files-uploader">
  <PxFilesUploader id="team-files" v-model="files" :max="5" />
</div>

<style>
.project-files-uploader .px-fileUploader--list {
  height: 34px;
  padding: 0 14px;
  border: 2px solid #be123c;
  border-radius: 999px;
  background-color: #fff1f2;
  color: #9f1239;
  font-weight: 800;
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
  { name: 'modelValue', type: 'Array', defaultValue: '필수', description: '업로드된 파일 객체 배열' },
  { name: 'apiUrl', type: 'String', defaultValue: '/api/v1/file-uploads', description: 'POST 업로드 API 주소' },
  { name: 'max', type: 'Number', defaultValue: '1', description: '보관할 수 있는 최대 파일 개수' },
  { name: 'buttonOnly', type: 'Boolean', defaultValue: 'false', description: '파일 목록을 숨기고 업로드 버튼만 표시' },
  { name: 'public', type: 'Boolean', defaultValue: 'false', description: '업로드 주소에 public=1 쿼리 추가' },
  { name: 'extensions', type: 'String', defaultValue: '-', description: '허용 확장자 목록' },
  { name: 'disabled', type: 'Boolean', defaultValue: 'false', description: '업로드와 목록 삭제 비활성화' },
  { name: 'viewMode', type: 'Boolean', defaultValue: 'false', description: '업로드 버튼을 숨기고 목록만 표시' },
  { name: 'label', type: 'String', defaultValue: '-', description: 'PxLabel 문구' },
  { name: 'labelHelper', type: 'String', defaultValue: '-', description: '라벨 보조 문구' },
  { name: 'required', type: 'Boolean', defaultValue: 'false', description: '필수 표시' },
  { name: 'md', type: 'String', defaultValue: '-', description: '모바일 라벨 배치 설정' },
]

const eventHeaders = [
  { field: 'name', label: '이벤트', code: true },
  { field: 'description', label: '설명' },
]

const eventRows = [
  { name: 'update:modelValue', description: '업로드 또는 삭제 후 전체 파일 배열 전달' },
  { name: 'onError', description: '내부 PxFileUpload의 파일 검사 오류 전달' },
]

const classHeaders = [
  { field: 'className', label: '클래스', html: true },
  { field: 'description', label: '용도' },
]

const classRows = [
  { className: '<code>px-fileUploader</code>', description: '컴포넌트 최상위' },
  { className: '<code>px-fileUploader--container</code>', description: '업로드 버튼과 파일 목록 영역' },
  { className: '<code>fileList</code>', description: '전체 파일 목록' },
  { className: '<code>px-fileUploader--list</code>', description: '파일 하나의 이름과 동작 영역' },
  { className: '<code>name</code>', description: '파일명' },
  { className: '<code>icon</code>', description: '다운로드 및 삭제 버튼' },
]
</script>

<template>
  <article class="docs-page">
    <p class="docs-eyebrow">FILE UPLOAD</p>
    <h1>PxFilesUploader</h1>
    <p class="docs-lead">파일을 하나씩 업로드하면서 여러 결과를 목록으로 관리하고 다운로드와 삭제 동작을 제공합니다.</p>

    <section class="docs-section">
      <h2>기본 사용</h2>
      <div class="example-preview pointer-events-none">
        <PxFilesUploader id="docs-attachments" v-model="files" label="첨부 파일" :max="5" extensions=".pdf,.xlsx,.docx" disabled />
      </div>
      <CodeBlock :code="basicCode" />
      <p class="docs-note">
        <code>multiple</code> 파일 선택 방식이 아니라 파일 하나를 업로드할 때마다 배열에 추가하는 구조입니다. 파일 수가 <code>max</code>에 도달하면 업로드 버튼이 사라집니다.
        파일명 옆의 다운로드 버튼은 <code>cdnPath</code>를 Axios로 받아 Blob으로 저장합니다.
      </p>
    </section>

    <section class="docs-section">
      <h2>Props와 Events</h2>
      <DocsTable :headers="propHeaders" :rows="propRows" />
      <DocsTable class="mt-[14px]" :headers="eventHeaders" :rows="eventRows" />
      <p class="docs-note"><code>button</code> 슬롯으로 내부 PxFileUpload 버튼을 교체할 수 있습니다.</p>
    </section>

    <section class="docs-section">
      <h2>Class로 스타일 재정의</h2>
      <DocsTable :headers="classHeaders" :rows="classRows" />
      <div class="example-preview mt-[20px] pointer-events-none">
        <div class="project-files-uploader">
          <PxFilesUploader id="docs-team-files" v-model="files" :max="5" disabled />
        </div>
      </div>
      <CodeBlock :code="customClassCode" />
    </section>
  </article>
</template>

<style>
.project-files-uploader .px-fileUploader--list {
  height: 34px;
  padding: 0 14px;
  border: 2px solid #be123c;
  border-radius: 999px;
  background-color: #fff1f2;
  color: #9f1239;
  font-weight: 800;
}
</style>
