<script setup>
import { onUnmounted, ref } from 'vue'
import { HelperText as PostfixHelperText, useError } from '@postfix/ui'
import CodeBlock from '../../components/CodeBlock.vue'
import DocsTable from '../../components/DocsTable.vue'

const content = ref('Postfix UI 문서 예제를 작성하고 있습니다.')
const errorId = ref('docs-helper-error')
const { error: helperError, causeError, clearError } = useError(errorId)

const showError = () => {
  causeError({ id: errorId.value, msg: '입력값을 다시 확인해주세요.' })
}

const hideError = () => {
  clearError(errorId.value)
}

onUnmounted(hideError)

const basicCode = `<HelperText helperText="필수 입력 항목입니다." />`

const iconCode = `<HelperText helperText="변경 사항은 저장 후 반영됩니다.">
  <template #helperIcon>
    <PxIcon name="icon-information-circle" />
  </template>
</HelperText>`

const lengthCode = `const content = ref('Postfix UI 문서 예제를 작성하고 있습니다.')

<HelperText
  helperText="최대 50자까지 입력할 수 있습니다."
  :localValue="content"
  :maxLength="50"
/>

<HelperText
  helperText="길이 표시는 숨깁니다."
  :localValue="content"
  :maxLength="50"
  :maxLengthLabel="false"
/>`

const htmlCode = `<HelperText
  helperText="<strong>주의:</strong> 저장 후에는 되돌릴 수 없습니다."
/>`

const errorCode = `const fieldId = ref('profile-name')
const { error, causeError, clearError } = useError(fieldId)

causeError({
  id: fieldId.value,
  msg: '입력값을 다시 확인해주세요.',
})

<HelperText
  :id="fieldId"
  :error="error"
  helperText="정상 상태에서 표시할 안내 문구"
/>

<!-- error가 있으면 helperText 대신 전역 에러 상태의 메시지를 표시합니다. -->`

const customClassCode = `<HelperText
  class="project-helper-text"
  helperText="프로젝트 전용 보조 문구"
/>

<style>
.px-helperText.project-helper-text {
  min-height: 36px;
  padding: 8px 12px;
  border: 1px solid #7c3aed;
  border-radius: 8px;
  background-color: #5b21b6;
  box-shadow: 0 8px 20px rgba(91, 33, 182, 0.24);
  color: #ffffff;
  font-size: 13px;
  font-weight: 700;
}

.px-helperText.project-helper-text .px-helperText--icon {
  margin-right: 5px;
}
</style>`

const propHeaders = [
  { field: 'name', label: '이름', code: true },
  { field: 'type', label: '타입' },
  { field: 'defaultValue', label: '기본값' },
  { field: 'description', label: '설명', html: true },
]

const propRows = [
  { name: 'id', type: 'String', defaultValue: '-', description: '전역 에러 상태와 연결할 필드 ID' },
  { name: 'helperText', type: 'String', defaultValue: '-', description: '<code>v-html</code>로 렌더링되는 기본 안내 문구' },
  { name: 'maxLength', type: 'String | Number', defaultValue: '-', description: '최대 길이. 값이 있으면 현재/최대 길이 영역 활성화' },
  { name: 'localValue', type: 'String | Number', defaultValue: '-', description: '현재 길이를 계산할 값. 길이 표시를 사용할 때는 문자열 사용 권장' },
  { name: 'error', type: 'String', defaultValue: '-', description: '에러 표시 전환값. 실제 문구는 같은 id로 등록된 전역 에러 상태에서 조회' },
  { name: 'maxLengthLabel', type: 'Boolean', defaultValue: 'true', description: '현재/최대 길이 표시 여부' },
]

const slotHeaders = [
  { field: 'name', label: '이름', code: true },
  { field: 'description', label: '설명' },
]

const slotRows = [{ name: 'helperIcon', description: '안내 문구 앞에 표시할 아이콘' }]

const classHeaders = [
  { field: 'category', label: '구분' },
  { field: 'className', label: '클래스', html: true },
  { field: 'description', label: '용도', html: true },
]

const classRows = [
  { category: '최상위', className: '<code>px-helperText</code>', description: '안내 문구와 길이 표시 전체' },
  { category: '문구 영역', className: '<code>px-helperText--wrapper</code>', description: '아이콘과 안내 또는 에러 문구를 감싸는 영역' },
  { category: '아이콘', className: '<code>px-helperText--icon</code>', description: 'helperIcon 슬롯 영역' },
  { category: '문구', className: '<code>px-helperText--text</code>', description: 'helperText HTML 표시 영역' },
  { category: '길이', className: '<code>px-helperText--length</code>', description: '현재/최대 길이 표시 영역' },
  { category: '에러', className: '<code>px-error</code>', description: '전역 에러 상태가 있을 때 표시되는 문구' },
]
</script>

<template>
  <article class="docs-page">
    <p class="docs-eyebrow">COMPONENTS</p>
    <h1>HelperText</h1>
    <p class="docs-lead">입력 컴포넌트 아래에서 안내, 에러 및 글자 수를 표시하는 공용 컴포넌트입니다.</p>

    <section class="docs-section">
      <h2>기본 사용</h2>
      <div class="example-preview">
        <div class="w-full max-w-[640px]">
          <PostfixHelperText helperText="필수 입력 항목입니다." />
        </div>
      </div>
      <CodeBlock :code="basicCode" />
    </section>

    <section class="docs-section">
      <h2>아이콘</h2>
      <div class="example-preview">
        <div class="w-full max-w-[640px]">
          <PostfixHelperText helperText="변경 사항은 저장 후 반영됩니다.">
            <template #helperIcon>
              <PxIcon
                name="icon-information-circle"
                class="h-[15px] w-[15px] text-[#69707e] [&_svg]:h-[15px] [&_svg]:w-[15px]"
              />
            </template>
          </PostfixHelperText>
        </div>
      </div>
      <CodeBlock :code="iconCode" />
    </section>

    <section class="docs-section">
      <h2>글자 수</h2>
      <div class="example-preview">
        <div class="grid w-full max-w-[640px] gap-[18px]">
          <PostfixHelperText
            helperText="최대 50자까지 입력할 수 있습니다."
            :localValue="content"
            :maxLength="50"
          />
          <PostfixHelperText
            helperText="길이 표시는 숨깁니다."
            :localValue="content"
            :maxLength="50"
            :maxLengthLabel="false"
          />
        </div>
      </div>
      <CodeBlock :code="lengthCode" />
    </section>

    <section class="docs-section">
      <h2>HTML 문구</h2>
      <p class="m-[0px] max-w-[760px] text-[14px] leading-[1.75] text-[#69707e]">
        <code>helperText</code>는 HTML로 렌더링되므로 신뢰할 수 없는 사용자 입력을 그대로 전달하면 안 됩니다.
      </p>
      <div class="example-preview mt-[20px]">
        <PostfixHelperText helperText="<strong>주의:</strong> 저장 후에는 되돌릴 수 없습니다." />
      </div>
      <CodeBlock :code="htmlCode" />
    </section>

    <section class="docs-section">
      <h2>에러 연동</h2>
      <p class="m-[0px] max-w-[760px] text-[14px] leading-[1.75] text-[#69707e]">
        <code>error</code>는 문구 자체가 아니라 에러 표시 여부이며, 실제 메시지는 같은 <code>id</code>의 전역 에러 상태에서 가져옵니다.
      </p>
      <div class="example-preview mt-[20px]">
        <div class="w-full max-w-[640px]">
          <PostfixHelperText
            :id="errorId"
            :error="helperError"
            helperText="정상 상태에서 표시할 안내 문구"
          />
          <div class="mt-[14px] flex flex-wrap gap-[8px]">
            <PxButton size="xs" @click="showError">에러 표시</PxButton>
            <PxButton size="xs" color="gray_border" @click="hideError">에러 해제</PxButton>
          </div>
        </div>
      </div>
      <CodeBlock :code="errorCode" />
    </section>

    <section class="docs-section">
      <h2>Slots</h2>
      <DocsTable :headers="slotHeaders" :rows="slotRows" />
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
          <PostfixHelperText class="project-helper-text" helperText="프로젝트 전용 보조 문구" />
        </div>
      </div>
      <CodeBlock :code="customClassCode" />
    </section>
  </article>
</template>

<style>
.px-helperText.project-helper-text {
  @apply min-h-[36px] rounded-[8px] border-[1px] border-[#7c3aed] bg-[#5b21b6] px-[12px] py-[8px] text-[13px] font-bold text-white shadow-[0_8px_20px_rgba(91,33,182,0.24)];
}

.px-helperText.project-helper-text .px-helperText--icon {
  @apply mr-[5px];
}
</style>
