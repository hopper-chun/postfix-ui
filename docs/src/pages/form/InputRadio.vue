<script setup>
import { ref } from 'vue'
import CodeBlock from '../../components/CodeBlock.vue'
import DocsTable from '../../components/DocsTable.vue'

const visibilityOptions = ['전체 공개', '일부 공개', '비공개']
const visibility = ref('전체 공개')

const statusOptions = [
  { value: 'active', label: '사용 중' },
  { value: 'paused', label: '일시 중지' },
  { value: 'closed', label: '종료' },
]
const status = ref('active')
const verticalValue = ref('email')
const disabledValue = ref('on')
const viewValue = ref('public')
const helperIconValue = ref('auto')
const customValue = ref('allow')

const optionLabel = (option) => option?.label
const optionValue = (option) => option?.value

const basicCode = `const options = ['전체 공개', '일부 공개', '비공개']
const visibility = ref('전체 공개')

<PxInputRadio
  id="visibility"
  v-model="visibility"
  label="공개 범위"
  :options="options"
/>`

const objectCode = `const statusOptions = [
  { value: 'active', label: '사용 중' },
  { value: 'paused', label: '일시 중지' },
  { value: 'closed', label: '종료' },
]

<PxInputRadio
  id="status"
  v-model="status"
  label="상태"
  :options="statusOptions"
  :optionsLabel="(option) => option?.label"
  :optionsValue="(option) => option?.value"
/>`

const stateCode = `<PxInputRadio
  id="disabled-input-radio"
  v-model="value"
  label="비활성화"
  :options="['off', 'on']"
  disabled
/>

<PxInputRadio
  id="view-input-radio"
  v-model="value"
  label="조회 모드"
  :options="['private', 'public']"
  viewMode
/>`

const helperCode = `<PxInputRadio
  id="approval"
  v-model="approval"
  label="승인 방식"
  labelHelper="필수"
  helperText="업무 흐름에 맞는 승인 방식을 선택해주세요."
  required
  :options="['auto', 'manual']"
  md="**자동 승인**은 설정된 조건을 만족한 요청에 적용됩니다."
>
  <template #helperIcon>
    <PxIcon name="icon-information-circle" />
  </template>
</PxInputRadio>

<PxDialogTooltip />`

const customClassCode = `<PxInputRadio
  id="project-policy"
  v-model="policy"
  class="project-input-radio"
  label="접근 정책"
  :options="['allow', 'deny']"
/>

<style>
.px-inputRadio.project-input-radio .px-input--field {
  min-height: 52px;
  justify-content: flex-start;
  padding: 10px 18px;
  border: 2px solid #7c3aed;
  border-radius: 14px;
  background-color: #faf5ff;
  box-shadow: 0 10px 24px rgba(124, 58, 237, 0.2);
}

.px-inputRadio.project-input-radio .px-radio-box {
  width: 30px;
  height: 30px;
  border-width: 2px;
  border-color: #7c3aed;
}

.px-inputRadio.project-input-radio .px-radio-box.selected .dot {
  width: 20px;
  height: 20px;
  background-color: #7c3aed;
}

.px-inputRadio.project-input-radio .px-radio-text {
  color: #5b21b6;
  font-size: 16px;
  font-weight: 700;
}
</style>`

const propHeaders = [
  { field: 'name', label: '이름', code: true },
  { field: 'type', label: '타입' },
  { field: 'defaultValue', label: '기본값' },
  { field: 'description', label: '설명', html: true },
]

const propRows = [
  { name: 'id', type: 'String', defaultValue: '-', description: '라디오 그룹의 name과 옵션 ID, 에러 식별에 사용' },
  { name: 'label', type: 'String', defaultValue: '-', description: '입력 영역 위에 표시할 라벨' },
  { name: 'modelValue', type: 'String | Number', defaultValue: '-', description: '<code>v-model</code>로 연결되는 선택값' },
  { name: 'options', type: 'Array', defaultValue: '-', description: '선택 가능한 옵션 배열' },
  { name: 'optionsLabel', type: 'Function', defaultValue: 'option => option', description: '옵션에서 화면에 표시할 값을 반환' },
  { name: 'optionsValue', type: 'Function', defaultValue: 'option => option', description: '옵션에서 <code>v-model</code>에 저장할 값을 반환' },
  { name: 'disabled', type: 'Boolean', defaultValue: 'false', description: '모든 옵션 비활성화' },
  { name: 'required', type: 'Boolean', defaultValue: 'false', description: '라벨에 필수 표시' },
  { name: 'labelHelper', type: 'String', defaultValue: '-', description: '라벨 옆 보조 문구' },
  { name: 'helperText', type: 'String', defaultValue: '-', description: '입력 영역 아래 보조 문구' },
  { name: 'row', type: 'Boolean', defaultValue: 'false', description: '옵션을 세로 방향으로 배치' },
  { name: 'viewMode', type: 'Boolean', defaultValue: 'false', description: '조회용 스타일로 표시하고 옵션 변경 차단' },
  { name: 'hover', type: 'Boolean', defaultValue: 'true', description: '라벨 툴팁의 hover 동작 여부' },
  { name: 'md', type: 'String', defaultValue: '-', description: '라벨 툴팁 다이얼로그에 표시할 콘텐츠' },
  { name: 'format', type: 'Function', defaultValue: 'value => value', description: '컴포넌트 내부 선택값을 초기화하거나 동기화할 때 적용할 함수' },
]

const eventHeaders = [
  { field: 'name', label: '이름', code: true },
  { field: 'payload', label: '전달값', code: true },
  { field: 'description', label: '설명', html: true },
]

const eventRows = [
  { name: 'update:modelValue', payload: 'optionsValue(option)', description: '옵션을 선택할 때 발생하며 <code>v-model</code>을 갱신' },
  { name: 'onClickTooltip', payload: 'Event', description: '라벨의 도움말 아이콘을 클릭할 때 발생' },
]

const slotHeaders = [
  { field: 'name', label: '이름', code: true },
  { field: 'description', label: '설명' },
]

const slotRows = [
  { name: 'tooltip', description: '라벨의 도움말 아이콘에 표시할 콘텐츠' },
  { name: 'helperIcon', description: '입력 영역 아래 보조 문구 앞에 표시할 아이콘' },
]

const classHeaders = [
  { field: 'category', label: '구분' },
  { field: 'className', label: '클래스', html: true },
  { field: 'description', label: '용도', html: true },
]

const classRows = [
  { category: '최상위', className: '<code>px-inputRadio</code>, <code>viewMode</code>', description: '전체 Input Radio와 조회 모드 상태' },
  { category: '라벨', className: '<code>labelSwitch</code>, <code>px-label</code>, <code>px-label--text</code>', description: '라벨 영역' },
  { category: '입력 영역', className: '<code>px-input--field</code>', description: '라디오 옵션을 감싸는 박스' },
  { category: '옵션 목록', className: '<code>px-radio</code>, <code>px-radio--wrapper</code>, <code>isRow</code>', description: '내부 Radio와 옵션 목록' },
  { category: '선택 표시', className: '<code>px-radio-box</code>, <code>selected</code>, <code>dot</code>', description: '라디오 원과 선택된 내부 점' },
  { category: '옵션 문구', className: '<code>px-radio-text</code>, <code>hasText</code>', description: '각 옵션의 표시 문구' },
  { category: '상태', className: '<code>disabled</code>, <code>error</code>', description: '비활성화 및 에러 상태' },
  {
    category: '보조 문구',
    className: '<code>px-helperText</code>, <code>px-helperText--icon</code>, <code>px-helperText--text</code>',
    description: '설명, 에러와 아이콘 표시',
  },
]
</script>

<template>
  <article class="docs-page">
    <p class="docs-eyebrow">FORM</p>
    <h1>PxInputRadio</h1>
    <p class="docs-lead">라벨과 테두리, 보조 문구를 포함한 입력 필드 형태의 라디오 컴포넌트입니다.</p>

    <section class="docs-section">
      <h2>기본 사용</h2>
      <div class="example-preview">
        <div class="w-full max-w-[680px]">
          <PxInputRadio id="docs-input-radio-visibility" v-model="visibility" label="공개 범위" :options="visibilityOptions" />
        </div>
      </div>
      <CodeBlock :code="basicCode" />
    </section>

    <section class="docs-section">
      <h2>객체 옵션</h2>
      <div class="example-preview">
        <div class="w-full max-w-[680px]">
          <PxInputRadio
            id="docs-input-radio-status"
            v-model="status"
            label="상태"
            :options="statusOptions"
            :optionsLabel="optionLabel"
            :optionsValue="optionValue"
          />
        </div>
      </div>
      <CodeBlock :code="objectCode" />
    </section>

    <section class="docs-section">
      <h2>배치와 상태</h2>
      <div class="example-preview">
        <div class="grid w-full grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[24px]">
          <PxInputRadio id="docs-input-radio-disabled" v-model="disabledValue" label="비활성화" :options="['off', 'on']" disabled />
          <PxInputRadio id="docs-input-radio-view" v-model="viewValue" label="조회 모드" :options="['private', 'public']" viewMode />
        </div>
      </div>
      <CodeBlock :code="stateCode" />
    </section>

    <section class="docs-section">
      <h2>라벨과 보조 문구</h2>
      <div class="example-preview">
        <div class="w-full max-w-[680px]">
          <PxInputRadio
            id="docs-input-radio-helper"
            v-model="helperIconValue"
            label="승인 방식"
            labelHelper="필수"
            helperText="업무 흐름에 맞는 승인 방식을 선택해주세요."
            required
            :options="['auto', 'manual']"
            md="**자동 승인**은 설정된 조건을 만족한 요청에 적용됩니다."
          >
            <template #helperIcon>
              <PxIcon name="icon-information-circle" class="h-[15px] w-[15px] text-[#69707e] [&_svg]:h-[15px] [&_svg]:w-[15px]" />
            </template>
          </PxInputRadio>
        </div>
      </div>
      <CodeBlock :code="helperCode" />
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
      <h2>Events</h2>
      <DocsTable :headers="eventHeaders" :rows="eventRows" />
    </section>

    <section class="docs-section">
      <h2>Class로 스타일 재정의</h2>
      <DocsTable :headers="classHeaders" :rows="classRows" />
      <h3 class="mb-[12px] mt-[28px] text-[17px] font-bold text-[#242832]">사용자 클래스 추가</h3>
      <div class="example-preview">
        <div class="w-full max-w-[680px]">
          <PxInputRadio id="docs-input-radio-custom" v-model="customValue" class="project-input-radio" label="접근 정책" :options="['allow', 'deny']" />
        </div>
      </div>
      <CodeBlock :code="customClassCode" />
    </section>

    <PxDialogTooltip />
  </article>
</template>

<style>
.px-inputRadio.project-input-radio .px-input--field {
  @apply min-h-[52px] justify-start rounded-[14px] border-[2px] border-[#7c3aed] bg-[#faf5ff] px-[18px] py-[10px] shadow-[0_10px_24px_rgba(124,58,237,0.2)];
}

.px-inputRadio.project-input-radio .px-radio-box {
  @apply h-[30px] w-[30px] border-[2px] border-[#7c3aed];
}

.px-inputRadio.project-input-radio .px-radio-box.selected .dot {
  @apply h-[20px] w-[20px] bg-[#7c3aed];
}

.px-inputRadio.project-input-radio .px-radio-text {
  @apply text-[16px] font-bold text-[#5b21b6];
}
</style>
