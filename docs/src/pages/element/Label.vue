<script setup>
import { ref } from 'vue'
import CodeBlock from '../../components/CodeBlock.vue'
import DocsTable from '../../components/DocsTable.vue'

const phoneFirst = ref('010')
const phoneMiddle = ref('1234')
const phoneLast = ref('5678')
const companyName = ref('Postfix')
const description = ref('컴포넌트 라이브러리 문서를 관리합니다.')

const basicCode = `<PxLabel label="이름" required labelHelper="실명을 입력해주세요." />`

const separatedCode = `const phoneFirst = ref('010')
const phoneMiddle = ref('1234')
const phoneLast = ref('5678')

<!-- 여러 입력을 하나의 항목으로 묶으므로 PxInput의 label은 사용하지 않습니다. -->
<div>
  <PxLabel
    label="연락처"
    required
    labelHelper="숫자만 입력해주세요."
  />

  <div class="flex items-center gap-[8px]">
    <PxInput v-model="phoneFirst" />
    <span>−</span>
    <PxInput v-model="phoneMiddle" />
    <span>−</span>
    <PxInput v-model="phoneLast" />
  </div>
</div>`

const labelFlexCode = `<div class="labelFlex">
  <PxInput v-model="companyName" label="회사명" />
  <PxTextarea v-model="description" label="소개" />
</div>`

const tooltipCode = `<div class="relative">
  <PxLabel label="정산 방식">
    <template #tooltip>
      월말에 등록된 계좌로 정산됩니다.
    </template>
  </PxLabel>
</div>

<!-- md가 있으면 클릭 시 전역 툴팁 다이얼로그를 사용합니다. -->
<div class="relative">
  <PxLabel label="수수료 정책" md="등급에 따라 수수료가 달라집니다." />
</div>

<!-- md 클릭 툴팁을 표시할 페이지에 한 번 배치합니다. -->
<PxDialogTooltip />`

const customClassCode = `<PxLabel
  class="project-label"
  label="프로젝트 라벨"
  required
  labelHelper="눈에 띄는 보조 문구"
/>

<style>
.project-label.px-label {
  width: 360px;
  padding: 12px 16px;
  border: 2px solid #7c3aed;
  border-radius: 10px;
  background: linear-gradient(90deg, #ede9fe, #fdf2f8);
}

.project-label .px-label--text {
  color: #4c1d95;
  font-size: 16px;
  font-weight: 800;
}

.project-label .px-label--helper {
  color: #be185d;
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
  { name: 'label', type: 'String', defaultValue: '-', description: '표시할 라벨. 값이 없으면 컴포넌트 전체를 렌더링하지 않음' },
  { name: 'id', type: 'String', defaultValue: '-', description: '내부 <code>label</code>의 <code>for</code>에 연결할 입력 ID' },
  { name: 'required', type: 'Boolean', defaultValue: 'false', description: '필수 입력 표시점 노출' },
  { name: 'labelHelper', type: 'String', defaultValue: '-', description: '라벨 옆에 표시할 짧은 보조 문구' },
  { name: 'hover', type: 'Boolean', defaultValue: 'true', description: '툴팁 아이콘 호버로 내용을 표시할지 여부' },
  { name: 'md', type: 'String', defaultValue: '-', description: '툴팁 내용. 클릭하면 전역 툴팁 다이얼로그로 전달' },
]

const slotHeaders = [
  { field: 'name', label: '이름', code: true },
  { field: 'description', label: '설명' },
]

const slotRows = [{ name: 'tooltip', description: '라벨 오른쪽 툴팁 아이콘에서 표시할 내용' }]

const eventHeaders = [
  { field: 'name', label: '이벤트', code: true },
  { field: 'payload', label: '전달값', code: true },
  { field: 'description', label: '설명' },
]

const eventRows = [{ name: 'onClickTooltip', payload: 'HTML String', description: 'md 없이 슬롯 툴팁을 클릭했을 때 내부 HTML 전달' }]

const classHeaders = [
  { field: 'category', label: '구분' },
  { field: 'className', label: '클래스', html: true },
  { field: 'description', label: '용도' },
]

const classRows = [
  { category: '최상위', className: '<code>px-label</code>', description: '라벨 전체 영역' },
  { category: '라벨', className: '<code>px-label--text</code>', description: 'label과 필수 표시 영역' },
  { category: '필수 표시', className: '<code>px-label--required</code>', description: 'required일 때 표시되는 점' },
  { category: '보조 문구', className: '<code>px-label--helper</code>', description: 'labelHelper 영역' },
  { category: '툴팁', className: '<code>px-label--tooltipContainer</code>', description: '툴팁 아이콘과 내용 전체' },
  { category: '툴팁 아이콘', className: '<code>px-label--tooltipIcon</code>', description: '질문 아이콘 버튼' },
  { category: '툴팁 내용', className: '<code>px-label--tooltip</code>', description: '실제 툴팁 콘텐츠' },
]
</script>

<template>
  <article class="docs-page">
    <p class="docs-eyebrow">ELEMENT</p>
    <h1>PxLabel</h1>
    <p class="docs-lead">
      폼 라벨과 필수 표시, 보조 문구 및 툴팁을 한 줄에 구성하는 공용 컴포넌트입니다. 많은 Postfix UI Form 컴포넌트가 내부에서 같은 PxLabel을 사용합니다.
    </p>

    <section class="docs-section">
      <h2>기본 사용</h2>
      <div class="example-preview">
        <div class="w-full max-w-[520px]">
          <PxLabel label="이름" required labelHelper="실명을 입력해주세요." />
        </div>
      </div>
      <CodeBlock :code="basicCode" />
    </section>

    <section class="docs-section">
      <h2>Form 컴포넌트와 분리해서 사용</h2>
      <p class="m-[0px] max-w-[760px] text-[14px] leading-[1.75] text-[#69707e]">
        일반적인 경우에는 <code>PxInput</code>, <code>PxSelect</code>, <code>PxTextarea</code> 등의 <code>label</code> Prop을 사용하면 됩니다. 다만 여러 입력을
        하나의 라벨로 묶거나 라벨을 Form 바깥에 배치해야 한다면 Form의 <code>label</code>을 비워두고 <code>PxLabel</code>을 따로 사용합니다. 내부 라벨과 동일한
        컴포넌트를 사용하므로 필수 표시, 보조 문구, 툴팁과 시각적 통일감을 그대로 유지할 수 있습니다.
      </p>
      <div class="example-preview mt-[20px]">
        <div class="w-full max-w-[620px]">
          <PxLabel label="연락처" required labelHelper="숫자만 입력해주세요." />
          <div class="flex items-center gap-[8px]">
            <PxInput v-model="phoneFirst" />
            <span class="shrink-0 text-[13px] text-[#9298a4]">−</span>
            <PxInput v-model="phoneMiddle" />
            <span class="shrink-0 text-[13px] text-[#9298a4]">−</span>
            <PxInput v-model="phoneLast" />
          </div>
        </div>
      </div>
      <CodeBlock :code="separatedCode" />
    </section>

    <section class="docs-section">
      <h2>labelFlex로 가로 배치</h2>
      <p class="m-[0px] max-w-[760px] text-[14px] leading-[1.75] text-[#69707e]">
        Form 컴포넌트들의 상위 요소에 <code>labelFlex</code> 클래스를 추가하면 라벨과 입력 영역이 가로로 배치됩니다. 내부적으로 각 Form이 가진
        <code>labelSwitch</code> 영역을 <code>display: flex</code>로 바꾸고, <code>PxLabel</code>의 너비를 <code>120px</code>로 고정한 뒤 실제 입력 영역이 남은
        너비를 채우게 합니다. 이 규칙은 화면 너비 <code>639px</code> 이상에서 적용되어 좁은 화면에서는 기존 세로 배치를 유지합니다.
      </p>
      <div class="example-preview mt-[20px]">
        <div class="labelFlex grid w-full max-w-[620px] gap-[16px]">
          <PxInput v-model="companyName" label="회사명" />
          <PxTextarea v-model="description" label="소개" />
        </div>
      </div>
      <CodeBlock :code="labelFlexCode" />
      <p class="docs-note">
        <code>labelFlex</code>는 개별 Form이 아니라 여러 Form을 감싸는 상위 영역에 한 번만 지정하는 용도로 만들어져 있습니다. 현재 라이브러리 CSS는
        <code>labelFlex</code> 안의 작은 호버 툴팁을 숨기므로, 이 배치에서 도움말이 필요하면 <code>md</code>와 <code>PxDialogTooltip</code>을 사용합니다.
      </p>
    </section>

    <section class="docs-section">
      <h2>툴팁</h2>
      <div class="example-preview">
        <div class="grid w-full max-w-[520px] gap-[22px]">
          <div class="relative">
            <PxLabel label="정산 방식">
              <template #tooltip>월말에 등록된 계좌로 정산됩니다.</template>
            </PxLabel>
          </div>
          <div class="relative">
            <PxLabel label="수수료 정책" md="등급에 따라 수수료가 달라집니다." />
          </div>
        </div>
      </div>
      <CodeBlock :code="tooltipCode" />
      <p class="docs-note">
        슬롯 툴팁의 위치 영역은 <code>absolute</code>이므로 PxLabel을 단독으로 사용할 때는 가까운 상위 요소에 <code>position: relative</code>를 지정합니다.
        <code>md</code>를 클릭해 여는 전역 도움말에는 페이지당 하나의 <code>PxDialogTooltip</code>이 필요합니다.
      </p>
    </section>

    <section class="docs-section">
      <h2>주요 Props</h2>
      <DocsTable :headers="propHeaders" :rows="propRows" />
    </section>

    <section class="docs-section">
      <h2>Slots와 Events</h2>
      <DocsTable :headers="slotHeaders" :rows="slotRows" />
      <DocsTable class="mt-[14px]" :headers="eventHeaders" :rows="eventRows" />
    </section>

    <section class="docs-section">
      <h2>Class로 스타일 재정의</h2>
      <DocsTable :headers="classHeaders" :rows="classRows" />
      <div class="example-preview mt-[20px]">
        <PxLabel class="project-label" label="프로젝트 라벨" required labelHelper="눈에 띄는 보조 문구" />
      </div>
      <CodeBlock :code="customClassCode" />
    </section>

    <PxDialogTooltip />
  </article>
</template>

<style scoped>
.project-label.px-label {
  @apply w-[360px] rounded-[10px] border-[2px] border-[#7c3aed] px-[16px] py-[12px];
  background: linear-gradient(90deg, #ede9fe, #fdf2f8);
}

.project-label .px-label--text {
  @apply text-[16px] font-extrabold text-[#4c1d95];
}

.project-label .px-label--helper {
  @apply font-bold text-[#be185d];
}
</style>
