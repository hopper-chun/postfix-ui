<script setup>
import { onUnmounted, ref } from 'vue'
import { useError } from '@postfix/ui'
import CodeBlock from '../../components/CodeBlock.vue'
import DocsTable from '../../components/DocsTable.vue'

const errorId = ref('docs-error-message')
const focusErrorId = ref('docs-error-focus')
const embeddedErrorId = ref('docs-error-embedded')
const embeddedValue = ref('')
const { causeError, clearError } = useError(errorId)

const showEmbeddedError = () => {
  causeError({ id: embeddedErrorId.value, msg: '프로젝트 이름을 입력해주세요.' })
}

const showError = () => {
  causeError({ id: errorId.value, msg: '이름을 입력해주세요.' })
}

const showFocusError = () => {
  causeError({ id: focusErrorId.value, msg: '포커스가 에러 문구로 이동했습니다.' })
}

onUnmounted(() => clearError())

const embeddedCode = `const projectName = ref('')
const fieldId = 'project-name'
const { causeError, clearError } = useError()

<PxInput
  v-model="projectName"
  :id="fieldId"
  label="프로젝트 이름"
/>

causeError({
  id: fieldId,
  msg: '프로젝트 이름을 입력해주세요.',
})

// PxInput 내부의 HelperText가 같은 id의 PxError를 표시합니다.
// 별도의 <PxError>는 배치하지 않습니다.
clearError(fieldId)`

const basicCode = `const fieldId = ref('profile-name')
const { causeError, clearError } = useError(fieldId)

causeError({
  id: fieldId.value,
  msg: '이름을 입력해주세요.',
})

<PxError :id="fieldId" />

<!-- 해제 -->
clearError(fieldId.value)`

const staticCode = `<PxError
  :id="fieldId"
  staticErrorMessage="필수 입력 항목입니다."
/>

<!-- 같은 id의 전역 에러가 있을 때 등록된 문구 대신 고정 문구를 표시합니다. -->`

const focusCode = `<PxError
  :id="fieldId"
  isFocusable
/>

<!-- 에러가 발생하면 렌더링된 문구에 포커스를 이동합니다. -->`

const customClassCode = `<PxError
  :id="fieldId"
  class="project-error"
/>

<style>
.px-error.project-error {
  margin: 0;
  padding: 12px 16px;
  border: 2px solid #fb7185;
  border-radius: 10px;
  background-color: #881337;
  box-shadow: 0 8px 20px rgba(136, 19, 55, 0.24);
  color: #ffffff;
  font-size: 14px;
  font-weight: 800;
}
</style>`

const propHeaders = [
  { field: 'name', label: '이름', code: true },
  { field: 'type', label: '타입' },
  { field: 'defaultValue', label: '기본값' },
  { field: 'description', label: '설명', html: true },
]

const propRows = [
  {
    name: 'id',
    type: 'String',
    defaultValue: '-',
    description: '<code>useError</code>에 등록된 전역 에러와 연결할 ID',
  },
  {
    name: 'staticErrorMessage',
    type: 'String',
    defaultValue: '-',
    description: '같은 id의 에러가 존재할 때 전역 메시지 대신 표시할 고정 문구',
  },
  {
    name: 'isFocusable',
    type: 'Boolean',
    defaultValue: 'false',
    description: '에러가 발생하면 렌더링된 에러 문구로 포커스 이동',
  },
]

const embeddedHeaders = [
  { field: 'component', label: '컴포넌트', code: true },
  { field: 'renderer', label: '내부 표시 구조', code: true },
  { field: 'description', label: '동작' },
]

const embeddedRows = [
  { component: 'PxInput', renderer: 'HelperText → PxError', description: '입력창 아래에 에러 문구 표시' },
  { component: 'PxFloatInput', renderer: 'HelperText → PxError', description: '입력창 아래에 에러 문구 표시' },
  { component: 'PxSelect', renderer: 'HelperText → PxError', description: '선택창 아래에 에러 문구 표시' },
  { component: 'PxFloatSelect', renderer: 'HelperText → PxError', description: '선택창 아래에 에러 문구 표시' },
  { component: 'PxTextarea', renderer: 'HelperText → PxError', description: '입력창 아래에 에러 문구 표시' },
  { component: 'PxFloatTextarea', renderer: 'HelperText → PxError', description: '입력창 아래에 에러 문구 표시' },
  { component: 'PxInputRadio', renderer: 'HelperText → PxError', description: '라디오 입력 아래에 에러 문구 표시' },
  { component: 'PxInputToggle', renderer: 'HelperText → PxError', description: '토글 입력 아래에 에러 문구 표시' },
  { component: 'PxButtonList', renderer: 'HelperText → PxError', description: '버튼 목록 아래에 에러 문구 표시' },
  { component: 'PxMultiButtonList', renderer: 'HelperText → PxError', description: '버튼 목록 아래에 에러 문구 표시' },
  { component: 'PxToggleButtonList', renderer: 'HelperText → PxError', description: '버튼 목록 아래에 에러 문구 표시' },
  { component: 'PxFileUploader', renderer: 'PxError', description: '업로더 아래에 에러 문구 표시 및 포커스 이동' },
  { component: 'PxFilesUploader', renderer: 'PxError', description: '업로더 아래에 에러 문구 표시 및 포커스 이동' },
  { component: 'PxImagesUploader', renderer: 'PxError', description: '업로더 아래에 에러 문구 표시 및 포커스 이동' },
  { component: 'PxImagesUploaderDraggable', renderer: 'PxError', description: '업로더 아래에 에러 문구 표시 및 포커스 이동' },
]

const errorStyleHeaders = [
  { field: 'component', label: '컴포넌트', code: true },
  { field: 'description', label: '동작' },
]

const errorStyleRows = [
  { component: 'PxCheckbox', description: '체크박스와 텍스트에 에러 스타일 적용' },
  { component: 'PxMultiCheckbox', description: '체크박스와 텍스트에 에러 스타일 적용' },
  { component: 'PxRadio', description: '라디오와 텍스트에 에러 스타일 적용' },
  { component: 'PxToggle', description: '토글에 에러 스타일 적용' },
]

const classHeaders = [
  { field: 'category', label: '구분' },
  { field: 'className', label: '클래스', html: true },
  { field: 'description', label: '용도' },
]

const classRows = [
  {
    category: '최상위',
    className: '<code>px-error</code>',
    description: '렌더링되는 에러 문구 요소',
  },
]
</script>

<template>
  <article class="docs-page">
    <p class="docs-eyebrow">ELEMENT</p>
    <h1>PxError</h1>
    <p class="docs-lead">
      <code>useError</code>의 전역 에러 상태를 ID로 찾아 표시하는 에러 문구 컴포넌트입니다.
    </p>

    <section class="docs-section">
      <h2>컴포넌트에 내장된 PxError</h2>
      <p class="m-[0px] max-w-[760px] text-[14px] leading-[1.75] text-[#69707e]">
        아래 컴포넌트들은 내부에 <code>HelperText → PxError</code> 또는 <code>PxError</code>가 이미 배치되어 있습니다.
        컴포넌트의 <code>id</code>와 <code>causeError</code>에 전달하는 <code>id</code>만 같으면 별도의
        <code>&lt;PxError&gt;</code> 없이 에러 문구가 표시됩니다.
      </p>
      <div class="example-preview mt-[20px]">
        <div class="w-full max-w-[640px]">
          <PxInput
            v-model="embeddedValue"
            :id="embeddedErrorId"
            label="프로젝트 이름"
            placeholder="프로젝트 이름을 입력해주세요"
          />
          <div class="mt-[14px] flex flex-wrap gap-[8px]">
            <PxButton size="xs" @click="showEmbeddedError">에러 표시</PxButton>
            <PxButton size="xs" color="gray_border" @click="clearError(embeddedErrorId)">에러 해제</PxButton>
          </div>
        </div>
      </div>
      <CodeBlock :code="embeddedCode" />

      <h3 class="mb-[12px] mt-[28px] text-[17px] font-bold text-[#242832]">에러 문구까지 내장된 컴포넌트</h3>
      <DocsTable :headers="embeddedHeaders" :rows="embeddedRows" />

      <h3 class="mb-[12px] mt-[28px] text-[17px] font-bold text-[#242832]">에러 스타일만 적용되는 컴포넌트</h3>
      <p class="mb-[16px] mt-[0px] max-w-[760px] text-[14px] leading-[1.75] text-[#69707e]">
        다음 컴포넌트도 같은 ID의 에러 상태를 감지하지만 문구는 렌더링하지 않습니다. 문구가 필요하면 같은 ID의
        <code>PxError</code>를 별도로 배치합니다.
      </p>
      <DocsTable :headers="errorStyleHeaders" :rows="errorStyleRows" />

      <p class="docs-note mt-[20px]">
        <code>PxFileUpload</code>과 <code>PxFtpFileUploader</code>는 같은 ID로 에러를 등록할 수 있지만 자체 에러 문구 영역은
        없습니다. 단독으로 사용할 때는 같은 ID의 <code>PxError</code>를 별도로 배치해야 합니다. 위의 파일 업로더 컴포넌트들은
        이를 내부에 포함하고 있습니다.
      </p>
    </section>

    <section class="docs-section">
      <h2>PxError 직접 사용</h2>
      <p class="m-[0px] max-w-[760px] text-[14px] leading-[1.75] text-[#69707e]">
        <code>PxError</code>에 문자열을 직접 전달하는 방식이 아니라, <code>causeError</code>에 등록한 ID와 같은 ID를 지정합니다.
      </p>
      <div class="example-preview mt-[20px]">
        <div class="w-full max-w-[640px]">
          <div class="min-h-[22px]">
            <PxError :id="errorId" />
          </div>
          <div class="mt-[14px] flex flex-wrap gap-[8px]">
            <PxButton size="xs" @click="showError">에러 표시</PxButton>
            <PxButton size="xs" color="gray_border" @click="clearError(errorId)">에러 해제</PxButton>
          </div>
        </div>
      </div>
      <CodeBlock :code="basicCode" />
    </section>

    <section class="docs-section">
      <h2>고정 문구</h2>
      <p class="m-[0px] max-w-[760px] text-[14px] leading-[1.75] text-[#69707e]">
        <code>staticErrorMessage</code>는 표시 조건을 만들지 않습니다. 같은 ID의 전역 에러가 있을 때 메시지만 교체합니다.
      </p>
      <div class="example-preview mt-[20px]">
        <div class="w-full max-w-[640px]">
          <div class="min-h-[22px]">
            <PxError :id="errorId" staticErrorMessage="필수 입력 항목입니다." />
          </div>
          <PxButton class="mt-[14px]" size="xs" @click="showError">전역 에러 발생</PxButton>
        </div>
      </div>
      <CodeBlock :code="staticCode" />
    </section>

    <section class="docs-section">
      <h2>에러 포커스</h2>
      <p class="m-[0px] max-w-[760px] text-[14px] leading-[1.75] text-[#69707e]">
        <code>isFocusable</code>을 사용하면 에러가 나타난 다음 문구에 포커스를 이동합니다.
      </p>
      <div class="example-preview mt-[20px]">
        <div class="w-full max-w-[640px]">
          <div class="min-h-[22px]">
            <PxError :id="focusErrorId" isFocusable />
          </div>
          <PxButton class="mt-[14px]" size="xs" @click="showFocusError">포커스 에러 발생</PxButton>
        </div>
      </div>
      <CodeBlock :code="focusCode" />
    </section>

    <section class="docs-section">
      <h2>주요 Props</h2>
      <DocsTable :headers="propHeaders" :rows="propRows" />
    </section>

    <section class="docs-section">
      <h2>Class로 스타일 재정의</h2>
      <DocsTable :headers="classHeaders" :rows="classRows" />
      <h3 class="mb-[12px] mt-[28px] text-[17px] font-bold text-[#242832]">사용자 클래스 추가</h3>
      <div class="example-preview">
        <div class="w-full max-w-[640px]">
          <div class="min-h-[42px]">
            <PxError :id="errorId" class="project-error" />
          </div>
          <PxButton class="mt-[14px]" size="xs" @click="showError">스타일 에러 표시</PxButton>
        </div>
      </div>
      <CodeBlock :code="customClassCode" />
    </section>
  </article>
</template>

<style>
.px-error.project-error {
  @apply m-[0px] rounded-[10px] border-[2px] border-[#fb7185] bg-[#881337] px-[16px] py-[12px] text-[14px] font-extrabold text-white shadow-[0_8px_20px_rgba(136,19,55,0.24)];
}
</style>
