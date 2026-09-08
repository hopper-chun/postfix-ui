<script setup>
import { ref } from 'vue'
import CodeBlock from '../../components/CodeBlock.vue'
import DocsTable from '../../components/DocsTable.vue'

const selectedFile = ref('선택된 파일이 없습니다.')
const errorMessage = ref('')

const handleSelect = (payload) => {
  errorMessage.value = ''
  selectedFile.value = Array.isArray(payload)
    ? payload.map((file) => file.originalFilename).join(', ')
    : payload.originalFilename
}

const basicCode = `<PxFileUpload
  id="document-file"
  extensions=".pdf,.docx"
  :fileSize="5 * 1024 * 1024"
  @onSelect="uploadFile"
  @onError="showError"
/>

const uploadFile = ({ originalFilename, formData, fileBuffer }) => {
  // PxFileUpload은 서버 요청을 보내지 않습니다.
  // 전달받은 FormData로 필요한 업로드 요청을 실행합니다.
}`

const buttonCode = `<PxFileUpload id="profile-image" extensions=".png,.jpg">
  <template #button="{ isDoing }">
    <PxButton color="sec" :isDoing="isDoing">
      프로필 이미지 선택
    </PxButton>
  </template>
</PxFileUpload>`

const customClassCode = `<div class="project-file-upload">
  <PxFileUpload id="brand-file" />
</div>

<style>
.project-file-upload .px-fileUpload--label {
  height: 54px;
  padding: 0 24px;
  border: 2px solid #0f766e;
  border-radius: 14px;
  background: linear-gradient(135deg, #ccfbf1, #ecfeff);
  box-shadow: 0 10px 24px rgba(15, 118, 110, 0.2);
  color: #115e59;
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
  { name: 'id', type: 'String', defaultValue: '필수', description: 'input 연결 및 에러 등록에 사용하는 고유 ID' },
  { name: 'extensions', type: 'String', defaultValue: '-', description: '허용 확장자. 쉼표로 구분하며 선택 후 한 번 더 검사' },
  { name: 'fileType', type: 'String', defaultValue: 'file', description: 'image이면 사각형 이미지 선택 UI 표시' },
  { name: 'multiple', type: 'Boolean', defaultValue: 'false', description: '여러 파일 동시 선택' },
  { name: 'disabled', type: 'Boolean', defaultValue: 'false', description: '파일 선택 비활성화' },
  { name: 'fileSize', type: 'Number', defaultValue: '0', description: '허용할 파일 하나의 최대 크기(byte). 0이면 제한 없음' },
  { name: 'isDoing', type: 'Boolean', defaultValue: 'false', description: '업로드 중 표시 및 파일 선택 차단' },
]

const eventHeaders = [
  { field: 'name', label: '이벤트', code: true },
  { field: 'payload', label: '전달값', code: true },
  { field: 'description', label: '설명' },
]

const eventRows = [
  { name: 'onSelect', payload: '{ originalFilename, formData, fileBuffer, width, height }', description: '검사를 통과한 파일 선택 결과. multiple이면 배열' },
  { name: 'onError', payload: 'String', description: '확장자 또는 파일 크기 검사 실패 메시지' },
]

const slotHeaders = [
  { field: 'name', label: '슬롯', code: true },
  { field: 'scope', label: '슬롯 Props', code: true },
  { field: 'description', label: '설명' },
]

const slotRows = [{ name: 'button', scope: '{ isDoing }', description: '기본 파일 선택 버튼을 원하는 UI로 교체' }]

const classHeaders = [
  { field: 'className', label: '클래스', html: true },
  { field: 'description', label: '용도' },
]

const classRows = [
  { className: '<code>px-fileUpload</code>', description: '기본 파일 업로드 최상위' },
  { className: '<code>px-fileUpload--label</code>', description: '클릭 가능한 기본 버튼 영역' },
  { className: '<code>px-fileUpload--icon</code>', description: '업로드 아이콘' },
  { className: '<code>px-fileUpload--text</code>', description: '버튼 문구' },
  { className: '<code>px-imageUpload</code> / <code>px-imageUpload--label</code>', description: 'fileType="image" 구조' },
  { className: '<code>px-customUpload</code> / <code>px-customUpload--label</code>', description: 'button 슬롯 사용 시 구조' },
]
</script>

<template>
  <article class="docs-page">
    <p class="docs-eyebrow">FILE UPLOAD</p>
    <h1>PxFileUpload</h1>
    <p class="docs-lead">파일을 선택하고 확장자와 크기를 검사한 뒤 업로드에 필요한 데이터를 전달하는 가장 낮은 단계의 컴포넌트입니다.</p>

    <section class="docs-section">
      <h2>기본 사용</h2>
      <div class="example-preview">
        <PxFileUpload
          id="docs-document-file"
          extensions=".pdf,.docx"
          :fileSize="5 * 1024 * 1024"
          @onSelect="handleSelect"
          @onError="errorMessage = $event"
        />
        <p class="mb-[0px] mt-[12px] text-[13px] text-[#69707e]">{{ errorMessage || selectedFile }}</p>
      </div>
      <CodeBlock :code="basicCode" />
      <p class="docs-note">
        이 컴포넌트는 서버 요청을 직접 보내지 않습니다. 파일 선택과 검증만 수행하고 <code>onSelect</code>로 파일명, <code>FormData</code>, 미리보기용
        <code>fileBuffer</code>와 이미지 크기를 전달합니다.
      </p>
    </section>

    <section class="docs-section">
      <h2>버튼 슬롯</h2>
      <div class="example-preview">
        <PxFileUpload id="docs-profile-image" extensions=".png,.jpg">
          <template #button="{ isDoing }">
            <PxButton color="sec" :isDoing="isDoing">프로필 이미지 선택</PxButton>
          </template>
        </PxFileUpload>
      </div>
      <CodeBlock :code="buttonCode" />
    </section>

    <section class="docs-section">
      <h2>Props, Events와 Slot</h2>
      <DocsTable :headers="propHeaders" :rows="propRows" />
      <DocsTable class="mt-[14px]" :headers="eventHeaders" :rows="eventRows" />
      <DocsTable class="mt-[14px]" :headers="slotHeaders" :rows="slotRows" />
    </section>

    <section class="docs-section">
      <h2>Class로 스타일 재정의</h2>
      <DocsTable :headers="classHeaders" :rows="classRows" />
      <div class="example-preview mt-[20px]">
        <div class="project-file-upload">
          <PxFileUpload id="docs-brand-file" />
        </div>
      </div>
      <CodeBlock :code="customClassCode" />
    </section>
  </article>
</template>

<style>
.project-file-upload .px-fileUpload--label {
  height: 54px;
  padding: 0 24px;
  border: 2px solid #0f766e;
  border-radius: 14px;
  background: linear-gradient(135deg, #ccfbf1, #ecfeff);
  box-shadow: 0 10px 24px rgba(15, 118, 110, 0.2);
  color: #115e59;
  font-weight: 800;
}
</style>
