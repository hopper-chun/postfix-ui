<script setup>
import { ref } from 'vue'
import CodeBlock from '../../components/CodeBlock.vue'
import DocsTable from '../../components/DocsTable.vue'

const files = ref([])

const basicCode = `const files = ref([])

<PxFileUploader
  id="contract-file"
  v-model="files"
  label="계약서"
  labelHelper="PDF 파일을 등록하세요."
  extensions=".pdf"
  apiUrl="/api/v1/file-uploads"
  single
  public
  @onError="handleError"
/>`

const responseCode = `// POST apiUrl
// 서버 응답에서 아래 값을 사용합니다.
{
  data: {
    seq: 21,
    cdnPath: 'https://cdn.example.com/files/contract.pdf'
  }
}

// v-model 결과
[
  {
    seq: 21,
    cdnPath: 'https://cdn.example.com/files/contract.pdf',
    originalFilename: 'contract.pdf'
  }
]`

const customClassCode = `<div class="project-file-uploader">
  <PxFileUploader id="brand-document" v-model="files" label="브랜드 자료" />
</div>

<style>
.project-file-uploader .px-fileUpload--label {
  height: 52px;
  border: 0;
  border-radius: 12px;
  background: linear-gradient(135deg, #4338ca, #7c3aed);
  box-shadow: 0 12px 26px rgba(79, 70, 229, 0.3);
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
  { name: 'modelValue', type: 'Array', defaultValue: '필수', description: '업로드된 파일 객체 배열' },
  { name: 'apiUrl', type: 'String', defaultValue: '/api/v1/file-uploads', description: 'POST 업로드 API 주소' },
  { name: 'single', type: 'Boolean', defaultValue: 'false', description: '새 업로드 결과로 배열의 첫 파일을 교체' },
  { name: 'public', type: 'Boolean', defaultValue: 'false', description: '업로드 주소에 public=1 쿼리 추가' },
  { name: 'extensions', type: 'String', defaultValue: '-', description: '허용 확장자 목록' },
  { name: 'disabled', type: 'Boolean', defaultValue: 'false', description: '파일 선택 비활성화' },
  { name: 'viewMode', type: 'Boolean', defaultValue: 'false', description: '업로드 버튼 숨김' },
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
  { name: 'update:modelValue', description: '업로드 완료 후 파일 배열 갱신' },
  { name: 'onError', description: 'PxFileUpload의 파일 검사 오류 전달' },
]

const classHeaders = [
  { field: 'className', label: '클래스', html: true },
  { field: 'description', label: '용도' },
]

const classRows = [
  { className: '<code>px-fileUploader</code>', description: '컴포넌트 최상위' },
  { className: '<code>px-fileUploader--container</code>', description: '업로드 버튼 영역' },
  { className: '<code>px-fileUpload--label</code>', description: '내부 PxFileUpload 버튼' },
  { className: '<code>px-fileUpload--icon</code>', description: '내부 업로드 아이콘' },
  { className: '<code>px-fileUpload--text</code>', description: '내부 버튼 문구' },
]
</script>

<template>
  <article class="docs-page">
    <p class="docs-eyebrow">FILE UPLOAD</p>
    <h1>PxFileUploader</h1>
    <p class="docs-lead">선택한 파일을 즉시 서버에 업로드하고 응답으로 받은 파일 정보를 배열에 반영합니다.</p>

    <section class="docs-section">
      <h2>기본 사용</h2>
      <div class="example-preview">
        <PxFileUploader
          id="docs-contract-file"
          v-model="files"
          label="계약서"
          labelHelper="PDF 파일을 등록하세요."
          extensions=".pdf"
          single
          disabled
        />
      </div>
      <CodeBlock :code="basicCode" />
      <p class="docs-note">
        내부에서 주입된 Axios 인스턴스로 요청합니다. 문서 미리보기는 서버 요청이 발생하지 않도록 비활성화되어 있으며, 실제 사용 시에는 <code>disabled</code>를 제거합니다.
        <code>single</code>은 input의 다중 선택 기능이 아니라 업로드 결과 배열의 첫 항목을 교체하는 설정입니다.
      </p>
    </section>

    <section class="docs-section">
      <h2>API 응답 형태</h2>
      <CodeBlock :code="responseCode" />
      <p class="docs-note"><code>seq</code>와 <code>cdnPath</code>가 없는 응답은 정상적인 v-model 파일 객체를 만들 수 없습니다.</p>
    </section>

    <section class="docs-section">
      <h2>Props와 Events</h2>
      <DocsTable :headers="propHeaders" :rows="propRows" />
      <DocsTable class="mt-[14px]" :headers="eventHeaders" :rows="eventRows" />
      <p class="docs-note"><code>button</code> 슬롯으로 내부 PxFileUpload의 기본 버튼을 교체할 수 있습니다.</p>
    </section>

    <section class="docs-section">
      <h2>Class로 스타일 재정의</h2>
      <DocsTable :headers="classHeaders" :rows="classRows" />
      <div class="example-preview mt-[20px] pointer-events-none">
        <div class="project-file-uploader">
          <PxFileUploader id="docs-brand-document" v-model="files" label="브랜드 자료" />
        </div>
      </div>
      <CodeBlock :code="customClassCode" />
    </section>
  </article>
</template>

<style>
.project-file-uploader .px-fileUpload--label {
  height: 52px;
  border: 0;
  border-radius: 12px;
  background: linear-gradient(135deg, #4338ca, #7c3aed);
  box-shadow: 0 12px 26px rgba(79, 70, 229, 0.3);
  color: #ffffff;
}
</style>
