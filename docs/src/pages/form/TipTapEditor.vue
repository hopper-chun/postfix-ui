<script setup>
import { ref } from 'vue'
import CodeBlock from '../../components/CodeBlock.vue'
import DocsTable from '../../components/DocsTable.vue'

const row = ref({
  title: 'Postfix UI 에디터',
  textBody: '<p><strong>Postfix UI</strong> 에디터 사용 예제입니다.</p><p>내용을 수정하면 row.textBody에 HTML 문자열이 반영됩니다.</p>',
})
const readOnlyContent = ref(
  '<h2>콘텐츠 미리보기</h2><p>저장된 HTML을 편집 도구 없이 조회할 수 있습니다.</p><blockquote><p>readOnly 상태의 본문입니다.</p></blockquote>',
)
const customContent = ref('<h2>프로젝트 에디터</h2><p>클래스를 재정의해 본문 영역을 강조한 예제입니다.</p>')
const lastError = ref('')

const basicCode = `const row = ref({
  title: '',
  textBody: '<p>내용을 입력하세요.</p>'
})

<PxTipTapEditor
  v-model="row.textBody"
  @onError="handleUploadError"
/>

// row.value.textBody에는 HTML 문자열이 들어갑니다.
// <p>내용을 입력하세요.</p>`

const usageCode = `<script setup>
const row = ref({
  title: '',
  textBody: '',
  attachFiles: []
})

const load = async () => {
  const received = await read('/api/v1/articles/21')
  row.value.textBody = received.textBody
}

const submit = async () => {
  await update('/api/v1/articles/21', row.value)
}
<\/script>

<PxBiSectionWrapper :mode="mode" label="기본 정보">
  <template #default>
    <div>
      <div class="sm:col-span-2">
        <PxTipTapEditor v-model="row.textBody" />
      </div>
    </div>
  </template>
</PxBiSectionWrapper>`

const readOnlyCode = `<!-- 컴포넌트의 읽기 전용 기능 -->
<PxTipTapEditor v-model="row.textBody" readOnly />

<!-- 에디터를 렌더링하지 않는 단순 조회 방식 -->
<div class="sm:col-span-2" v-html="row.textBody"></div>`

const imageCode = `<PxTipTapEditor
  v-model="row.textBody"
  @onError="handleUploadError"
/>

// 툴바의 이미지 업로드 버튼은 내부적으로 다음 요청을 사용합니다.
// POST /api/v1/file-uploads/?public=1

// 필요한 응답
{
  data: {
    seq: 21,
    cdnPath: 'https://cdn.example.com/editor/image.jpg'
  }
}`

const customClassCode = `<div class="project-tiptap">
  <PxTipTapEditor v-model="row.textBody" />
</div>

<style>
.project-tiptap .tiptap-editor {
  overflow: hidden;
  border: 2px solid #7c3aed;
  border-radius: 16px;
  box-shadow: 0 18px 42px rgba(91, 33, 182, 0.2);
}

.project-tiptap .control-group {
  padding: 8px 12px;
  border-color: #6d28d9;
  background: linear-gradient(135deg, #2e1065, #4c1d95);
  color: #ede9fe;
}

.project-tiptap .control-group button.is-active {
  border-color: #f9a8d4;
  background-color: #be185d;
  color: #ffffff;
}

.project-tiptap .ProseMirror {
  min-height: 280px;
  padding: 24px;
  background-color: #faf5ff;
  font-size: 15px;
  line-height: 1.8;
}
</style>`

const propHeaders = [
  { field: 'name', label: '이름', code: true },
  { field: 'type', label: '타입' },
  { field: 'defaultValue', label: '기본값' },
  { field: 'description', label: '설명' },
]

const propRows = [
  { name: 'modelValue', type: 'String', defaultValue: '필수', description: '에디터에 표시하고 갱신할 HTML 문자열' },
  { name: 'readOnly', type: 'Boolean', defaultValue: 'false', description: '툴바를 숨기고 에디터를 읽기 전용으로 생성' },
]

const eventHeaders = [
  { field: 'name', label: '이벤트', code: true },
  { field: 'payload', label: '전달값', code: true },
  { field: 'description', label: '설명' },
]

const eventRows = [
  { name: 'update:modelValue', payload: 'String', description: '본문 변경 시 현재 에디터의 전체 HTML 전달' },
  { name: 'onError', payload: 'String', description: '내부 이미지 파일 선택 과정의 오류 전달' },
]

const featureHeaders = [
  { field: 'category', label: '구분' },
  { field: 'features', label: '기능' },
]

const featureRows = [
  { category: '글자', features: '12–48px 크기, 굵게, 기울임, 밑줄, 취소선, 글자색, 배경 강조색' },
  { category: '코드', features: '인라인 코드, 코드 블록' },
  { category: '미디어', features: '업로드 이미지, URL 이미지, YouTube URL' },
  { category: '목록과 구분', features: '글머리 목록, 번호 목록, 인용문, 수평선, 강제 줄바꿈' },
  { category: '정렬', features: '왼쪽, 가운데, 오른쪽, 양쪽 맞춤' },
  { category: '편집', features: '현재 노드 초기화, 실행 취소, 다시 실행' },
]

const classHeaders = [
  { field: 'className', label: '클래스', html: true },
  { field: 'description', label: '용도' },
]

const classRows = [
  { className: '<code>tiptap-editor</code>', description: '에디터 전체 영역' },
  { className: '<code>readOnly</code>', description: '읽기 전용 상태에서 최상위에 추가' },
  { className: '<code>control-group</code>', description: '전체 툴바' },
  { className: '<code>button-group</code>', description: '기능별 툴바 버튼 묶음' },
  { className: '<code>tiptap-icon</code>', description: '툴바 아이콘 영역' },
  { className: '<code>upload-button</code>', description: '이미지 파일 업로드 버튼' },
  { className: '<code>is-active</code>', description: '현재 선택된 서식 버튼과 색상' },
  { className: '<code>HList</code>', description: '글자 크기 선택 목록' },
  { className: '<code>CList</code>', description: '글자색 및 강조색 선택 목록' },
  { className: '<code>colors</code> / <code>color-wrapper</code> / <code>color</code>', description: '색상 팔레트 행, 버튼과 실제 색상' },
  { className: '<code>ProseMirror</code>', description: '실제 편집 가능한 본문' },
  { className: '<code>ProseMirror-focused</code>', description: '본문 포커스 상태' },
]
</script>

<template>
  <article class="docs-page">
    <p class="docs-eyebrow">FORM</p>
    <h1>PxTipTapEditor</h1>
    <p class="docs-lead">Tiptap과 ProseMirror를 기반으로 서식, 목록, 코드와 미디어 삽입을 제공하는 HTML 리치 텍스트 에디터입니다.</p>

    <section class="docs-section">
      <h2>기본 사용</h2>
      <div class="example-preview">
        <PxTipTapEditor v-model="row.textBody" @onError="lastError = $event" />
        <div class="mt-[16px] rounded-[8px] border-[1px] border-[#e5e7eb] bg-[#f8fafc] p-[14px]">
          <p class="m-[0px] text-[12px] font-bold text-[#69707e]">현재 row.textBody</p>
          <code class="mt-[8px] block break-all text-[12px] leading-[1.6] text-[#374151]">{{ row.textBody }}</code>
        </div>
        <p v-if="lastError" class="mb-[0px] mt-[10px] text-[13px] text-[#dc2626]">{{ lastError }}</p>
      </div>
      <CodeBlock :code="basicCode" />
      <p class="docs-note">
        일반적인 폼에서는 콘텐츠 객체의 <code>row.textBody</code>에 바로 연결합니다. 초기값과 갱신값은 모두 HTML 문자열이며, API 조회 후
        <code>row.textBody</code>를 변경하면 내부 watcher가 에디터 내용도 갱신합니다.
      </p>
    </section>

    <section class="docs-section">
      <h2>폼에서 사용하는 형태</h2>
      <CodeBlock :code="usageCode" />
      <p class="docs-note">
        다른 Form 컴포넌트와 함께 사용할 때는 <code>PxBiSectionWrapper</code> 안의 전체 너비 영역에 에디터를 배치할 수 있습니다. 편집 결과가 이미
        <code>row.textBody</code>에 들어가므로 저장할 때 별도의 변환 없이 row 전체를 API에 전달합니다. 길이 검증은 화면의 글자 수가 아니라 HTML 태그까지 포함된
        문자열을 기준으로 합니다.
      </p>
    </section>

    <section class="docs-section">
      <h2>제공 기능</h2>
      <DocsTable :headers="featureHeaders" :rows="featureRows" />
      <p class="docs-note">URL 이미지, 링크와 YouTube 삽입은 브라우저의 기본 입력창에서 주소를 받습니다.</p>
    </section>

    <section class="docs-section">
      <h2>조회 모드</h2>
      <div class="example-preview">
        <PxTipTapEditor v-model="readOnlyContent" readOnly />
      </div>
      <CodeBlock :code="readOnlyCode" />
      <p class="docs-note">
        <code>readOnly</code> Prop도 제공하며, 에디터 기능이 필요 없는 단순 조회 화면에서는 저장된 본문을 <code>v-html</code>로 바로 출력할 수도 있습니다.
        <code>v-html</code>을 사용한다면
        신뢰할 수 없는 입력에 대한 별도 정제가 필요합니다. readOnly는 에디터 생성 시 편집 가능 여부를 정하므로 동적으로 토글하기보다 상태별로 다시 렌더링하는
        편이 안전합니다.
      </p>
    </section>

    <section class="docs-section">
      <h2>이미지 업로드</h2>
      <CodeBlock :code="imageCode" />
      <p class="docs-note">
        사진 아이콘은 내부 <code>PxFileUploader</code>를 사용하며 기본 주소로 public 업로드를 실행합니다. 컴포넌트에는 별도의 <code>apiUrl</code> Prop이
        없으므로 이 기능을 사용하려면 해당 API와 응답 형태가 준비되어 있어야 합니다. 클립 아이콘을 사용하면 서버 업로드 없이 이미지 URL을 직접 삽입할 수
        있습니다.
      </p>
    </section>

    <section class="docs-section">
      <h2>Props와 Events</h2>
      <DocsTable :headers="propHeaders" :rows="propRows" />
      <DocsTable class="mt-[14px]" :headers="eventHeaders" :rows="eventRows" />
    </section>

    <section class="docs-section">
      <h2>사용 시 주의</h2>
      <div class="grid gap-[10px] md:grid-cols-2">
        <div class="rounded-[10px] border-[1px] border-[#fed7aa] bg-[#fff7ed] p-[16px] text-[13px] leading-[1.7] text-[#9a3412]">
          내부 이미지 업로더 ID는 <code>tiptapImageUploader</code>로 고정되어 있습니다. 같은 화면에 편집 가능한 에디터를 여러 개 배치하면 ID가 중복됩니다.
        </div>
        <div class="rounded-[10px] border-[1px] border-[#fed7aa] bg-[#fff7ed] p-[16px] text-[13px] leading-[1.7] text-[#9a3412]">
          툴바의 내부 button에는 type이 지정되어 있지 않습니다. form 안에서 사용할 때는 의도하지 않은 submit이 발생하지 않도록 폼 제출 처리를 확인합니다.
        </div>
        <div class="rounded-[10px] border-[1px] border-[#fed7aa] bg-[#fff7ed] p-[16px] text-[13px] leading-[1.7] text-[#9a3412] md:col-span-2">
          컴포넌트 ref에는 <code>setHTML()</code> 같은 메서드가 노출되어 있지 않습니다. 조회한 HTML을 표시할 때는 ref를 조작하지 말고
          <code>row.textBody</code>처럼 v-model에 연결한 값을 갱신합니다.
        </div>
      </div>
    </section>

    <section class="docs-section">
      <h2>Class로 스타일 재정의</h2>
      <DocsTable :headers="classHeaders" :rows="classRows" />
      <div class="example-preview mt-[20px]">
        <div class="project-tiptap">
          <PxTipTapEditor v-model="customContent" readOnly />
        </div>
      </div>
      <CodeBlock :code="customClassCode" />
    </section>
  </article>
</template>

<style>
.project-tiptap .tiptap-editor,
.project-tiptap .tiptap-editor.readOnly {
  overflow: hidden;
  border: 2px solid #7c3aed;
  border-radius: 16px;
  box-shadow: 0 18px 42px rgba(91, 33, 182, 0.2);
}

.project-tiptap .control-group {
  padding: 8px 12px;
  border-color: #6d28d9;
  background: linear-gradient(135deg, #2e1065, #4c1d95);
  color: #ede9fe;
}

.project-tiptap .control-group button.is-active {
  border-color: #f9a8d4;
  background-color: #be185d;
  color: #ffffff;
}

.project-tiptap .ProseMirror {
  min-height: 280px;
  padding: 24px;
  background-color: #faf5ff;
  font-size: 15px;
  line-height: 1.8;
}
</style>
