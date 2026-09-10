<script setup>
import { ref } from 'vue'
import CodeBlock from '../../components/CodeBlock.vue'
import DocsTable from '../../components/DocsTable.vue'

const teamOptions = ['개발', '디자인', '기획']
const selectedTeam = ref('개발')

const planOptions = [
  { value: 'basic', label: '베이직' },
  { value: 'pro', label: '프로' },
  { value: 'enterprise', label: '엔터프라이즈' },
]
const selectedPlan = ref('pro')
const verticalValue = ref('email')
const disabledValue = ref('on')
const viewValue = ref('public')
const tooltipValue = ref('auto')
const customValue = ref('design')

const optionLabel = (option) => option?.label
const optionValue = (option) => option?.value

const basicCode = `const teamOptions = ['개발', '디자인', '기획']
const selectedTeam = ref('개발')

<PxRadio
  id="team"
  v-model="selectedTeam"
  label="담당 팀"
  :options="teamOptions"
/>`

const objectCode = `const planOptions = [
  { value: 'basic', label: '베이직' },
  { value: 'pro', label: '프로' },
  { value: 'enterprise', label: '엔터프라이즈' },
]

const selectedPlan = ref('pro')

<PxRadio
  id="plan"
  v-model="selectedPlan"
  label="요금제"
  :options="planOptions"
  :optionsLabel="(option) => option?.label"
  :optionsValue="(option) => option?.value"
/>`

const stateCode = `<PxRadio
  id="contact"
  v-model="contact"
  label="연락 방법"
  :options="['email', 'phone', 'message']"
  row
/>

<PxRadio
  id="disabled-radio"
  v-model="value"
  :options="['off', 'on']"
  disabled
/>

<PxRadio
  id="view-radio"
  v-model="value"
  :options="['private', 'public']"
  viewMode
/>`

const tooltipCode = `<PxRadio
  id="approval"
  v-model="approval"
  label="승인 방식"
  labelHelper="필수"
  required
  :options="['auto', 'manual']"
  md="**자동 승인**은 설정된 조건을 만족한 요청에 적용됩니다."
/>

<PxDialogTooltip />`

const customClassCode = `<PxRadio
  id="project-role"
  v-model="role"
  class="project-radio"
  :options="['design', 'develop']"
/>

<style>
.px-radio.project-radio .px-radio-box {
  width: 22px;
  height: 22px;
  border-width: 2px;
  border-color: #db2777;
  background-color: #fdf2f8;
}

.px-radio.project-radio .px-radio-box.selected {
  border-color: #be185d;
}

.px-radio.project-radio .px-radio-box.selected .dot {
  width: 12px;
  height: 12px;
  background-color: #db2777;
  box-shadow: 0 0 0 4px rgba(219, 39, 119, 0.18);
}

.px-radio.project-radio .px-radio-text.hasText {
  margin-left: 8px;
  color: #9d174d;
  font-size: 15px;
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
  { name: 'id', type: 'String', defaultValue: '-', description: '라디오 그룹의 name과 각 옵션 ID, 에러 식별에 사용' },
  { name: 'modelValue', type: 'String | Number', defaultValue: '-', description: '<code>v-model</code>로 연결되는 선택값' },
  { name: 'options', type: 'Array', defaultValue: '-', description: '선택 가능한 옵션 배열' },
  { name: 'optionsLabel', type: 'Function', defaultValue: 'option => option', description: '옵션에서 화면에 표시할 값을 반환' },
  { name: 'optionsValue', type: 'Function', defaultValue: 'option => option', description: '옵션에서 <code>v-model</code>에 저장할 값을 반환' },
  { name: 'disabled', type: 'Boolean', defaultValue: 'false', description: '모든 옵션 비활성화' },
  { name: 'row', type: 'Boolean', defaultValue: 'false', description: '옵션을 세로 방향으로 배치' },
  { name: 'label', type: 'String', defaultValue: '-', description: '라디오 그룹 위에 표시할 라벨' },
  { name: 'labelHelper', type: 'String', defaultValue: '-', description: '라벨 옆 보조 문구' },
  { name: 'required', type: 'Boolean', defaultValue: 'false', description: '라벨에 필수 표시' },
  { name: 'viewMode', type: 'Boolean', defaultValue: 'false', description: '현재 선택 상태를 유지한 채 옵션 변경 차단' },
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

const slotRows = [{ name: 'tooltip', description: '라벨의 도움말 아이콘에 표시할 콘텐츠' }]

const classHeaders = [
  { field: 'category', label: '구분' },
  { field: 'className', label: '클래스', html: true },
  { field: 'description', label: '용도', html: true },
]

const classRows = [
  { category: '최상위', className: '<code>px-radio</code>, <code>labelSwitch</code>, <code>viewMode</code>', description: '전체 Radio와 조회 모드 상태' },
  { category: '라벨', className: '<code>px-label</code>, <code>px-label--text</code>', description: '그룹 라벨 영역' },
  { category: '옵션 목록', className: '<code>px-radio--wrapper</code>, <code>isRow</code>', description: '옵션 목록과 세로 배치 상태' },
  { category: '선택 표시', className: '<code>px-radio-box</code>, <code>selected</code>, <code>dot</code>', description: '라디오 원과 선택된 내부 점' },
  { category: '옵션 문구', className: '<code>px-radio-text</code>, <code>hasText</code>', description: '각 옵션의 표시 문구' },
  { category: '상태', className: '<code>disabled</code>, <code>error</code>', description: '비활성화 및 에러 상태' },
]
</script>

<template>
  <article class="docs-page">
    <p class="docs-eyebrow">FORM</p>
    <h1>PxRadio</h1>
    <p class="docs-lead">여러 옵션 중 하나를 선택하는 기본 라디오 컴포넌트입니다.</p>

    <section class="docs-section">
      <h2>기본 사용</h2>
      <div class="example-preview">
        <PxRadio id="docs-radio-team" v-model="selectedTeam" label="담당 팀" :options="teamOptions" />
      </div>
      <CodeBlock :code="basicCode" />
    </section>

    <section class="docs-section">
      <h2>객체 옵션</h2>
      <p class="m-[0px] max-w-[760px] text-[14px] leading-[1.75] text-[#69707e]">
        객체 배열은 <code>optionsLabel</code>과 <code>optionsValue</code>로 표시값과 저장값을 분리합니다.
      </p>
      <div class="example-preview mt-[20px]">
        <PxRadio id="docs-radio-plan" v-model="selectedPlan" label="요금제" :options="planOptions" :optionsLabel="optionLabel" :optionsValue="optionValue" />
      </div>
      <CodeBlock :code="objectCode" />
    </section>

    <section class="docs-section">
      <h2>배치와 상태</h2>
      <div class="example-preview">
        <div class="grid w-full grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-[28px]">
          <PxRadio id="docs-radio-contact" v-model="verticalValue" label="연락 방법" :options="['email', 'phone', 'message']" row />
          <PxRadio id="docs-radio-disabled" v-model="disabledValue" label="비활성화" :options="['off', 'on']" disabled />
          <PxRadio id="docs-radio-view" v-model="viewValue" label="조회 모드" :options="['private', 'public']" viewMode />
        </div>
      </div>
      <CodeBlock :code="stateCode" />
    </section>

    <section class="docs-section">
      <h2>라벨 도움말</h2>
      <div class="example-preview">
        <PxRadio
          id="docs-radio-tooltip"
          v-model="tooltipValue"
          label="승인 방식"
          labelHelper="필수"
          required
          :options="['auto', 'manual']"
          md="**자동 승인**은 설정된 조건을 만족한 요청에 적용됩니다."
        />
      </div>
      <CodeBlock :code="tooltipCode" />
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
        <PxRadio id="docs-radio-custom" v-model="customValue" class="project-radio" :options="['design', 'develop']" />
      </div>
      <CodeBlock :code="customClassCode" />
    </section>

    <PxDialogTooltip />
  </article>
</template>

<style>
.px-radio.project-radio .px-radio-box {
  @apply h-[22px] w-[22px] border-[2px] border-[#db2777] bg-[#fdf2f8];
}

.px-radio.project-radio .px-radio-box.selected {
  @apply border-[#be185d];
}

.px-radio.project-radio .px-radio-box.selected .dot {
  @apply h-[12px] w-[12px] bg-[#db2777] shadow-[0_0_0_4px_rgba(219,39,119,0.18)];
}

.px-radio.project-radio .px-radio-text.hasText {
  @apply ml-[8px] text-[15px] font-bold text-[#9d174d];
}
</style>
