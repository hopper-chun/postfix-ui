<script setup>
import { ref } from 'vue'
import CodeBlock from '../../components/CodeBlock.vue'
import DocsTable from '../../components/DocsTable.vue'

const enabled = ref(false)
const notification = ref(true)
const publishState = ref('PRIVATE')
const prevented = ref(true)
const disabledValue = ref(true)
const viewValue = ref(true)
const customValue = ref(true)

const basicCode = `const enabled = ref(false)

<PxToggle v-model="enabled" />`

const labelCode = `<PxToggle
  v-model="notification"
  label="알림 받기"
/>`

const optionsCode = `const publishState = ref('PRIVATE')

<PxToggle
  v-model="publishState"
  :options="['PRIVATE', 'PUBLIC']"
/>

<!-- 꺼짐: 'PRIVATE', 켜짐: 'PUBLIC' -->`

const stateCode = `<PxToggle v-model="value" prevent />
<PxToggle v-model="value" disabled />
<PxToggle v-model="value" viewMode />`

const customClassCode = `<PxToggle
  v-model="enabled"
  class="project-toggle"
/>

<style>
.px-toggle.project-toggle .px-toggle--box {
  width: 80px;
  height: 40px;
  padding: 4px;
}

.px-toggle.project-toggle .px-toggle--box .dot {
  width: 32px;
  height: 32px;
}

.px-toggle.project-toggle .px-toggle--box.selected {
  background-color: #dc2626;
  box-shadow: 0 8px 20px rgba(220, 38, 38, 0.3);
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
    name: 'label',
    type: 'String',
    defaultValue: '-',
    description: '토글 왼쪽에 표시할 문구',
  },
  {
    name: 'modelValue',
    type: 'String | Number | Boolean',
    defaultValue: '-',
    description: '<code>v-model</code>로 연결되는 현재 값',
  },
  {
    name: 'options',
    type: 'Array',
    defaultValue: '[false, true]',
    description: '꺼짐과 켜짐에 사용할 값. 최소 두 개가 필요하며 첫 번째 값은 꺼짐, 두 번째 값은 켜짐',
  },
  {
    name: 'disabled',
    type: 'Boolean',
    defaultValue: 'false',
    description: '비활성화 스타일을 표시하고 값 변경 차단',
  },
  {
    name: 'prevent',
    type: 'Boolean',
    defaultValue: 'false',
    description: '비활성화 스타일 없이 클릭에 의한 값 변경만 차단',
  },
  {
    name: 'id',
    type: 'String',
    defaultValue: '-',
    description: '토글과 에러를 식별하는 ID',
  },
  {
    name: 'viewMode',
    type: 'Boolean',
    defaultValue: 'false',
    description: '현재 상태를 유지한 채 값 변경 차단',
  },
]

const eventHeaders = [
  { field: 'name', label: '이름', code: true },
  { field: 'payload', label: '전달값', code: true },
  { field: 'description', label: '설명', html: true },
]

const eventRows = [
  {
    name: 'update:modelValue',
    payload: 'options[0] | options[1]',
    description: '토글 상태가 바뀔 때 발생하며 <code>v-model</code>을 갱신',
  },
]

const classHeaders = [
  { field: 'category', label: '구분' },
  { field: 'className', label: '클래스', html: true },
  { field: 'description', label: '용도', html: true },
]

const classRows = [
  {
    category: '최상위',
    className: '<code>px-toggle</code>, <code>hasText</code>',
    description: '전체 Toggle과 label이 있을 때의 상태',
  },
  {
    category: '라벨',
    className: '<code>px-toggle--label</code>',
    description: '토글 왼쪽 문구',
  },
  {
    category: '트랙',
    className: '<code>px-toggle--box</code>',
    description: '토글 배경 영역',
  },
  {
    category: '핸들',
    className: '<code>dot</code>',
    description: '좌우로 이동하는 원형 핸들',
  },
  {
    category: '상태',
    className: '<code>selected</code>, <code>disabled</code>, <code>error</code>',
    description: '선택, 비활성화 및 에러 상태',
  },
]
</script>

<template>
  <article class="docs-page">
    <p class="docs-eyebrow">FORM</p>
    <h1>PxToggle</h1>
    <p class="docs-lead">두 상태를 전환하고 각 상태에 원하는 값을 연결할 수 있는 기본 토글 컴포넌트입니다.</p>

    <section class="docs-section">
      <h2>기본 사용</h2>
      <div class="example-preview">
        <PxToggle v-model="enabled" />
      </div>
      <CodeBlock :code="basicCode" />
    </section>

    <section class="docs-section">
      <h2>라벨</h2>
      <div class="example-preview">
        <div class="w-full max-w-[360px]">
          <PxToggle v-model="notification" label="알림 받기" />
        </div>
      </div>
      <CodeBlock :code="labelCode" />
    </section>

    <section class="docs-section">
      <h2>상태값 지정</h2>
      <p class="m-[0px] max-w-[760px] text-[14px] leading-[1.75] text-[#69707e]">
        <code>options</code>의 첫 번째 값은 꺼짐, 두 번째 값은 켜짐 상태에 대응합니다.
      </p>
      <div class="example-preview mt-[20px]">
        <div class="flex items-center gap-[14px]">
          <PxToggle v-model="publishState" :options="['PRIVATE', 'PUBLIC']" />
          <PxTag color="gray_border">{{ publishState }}</PxTag>
        </div>
      </div>
      <CodeBlock :code="optionsCode" />
    </section>

    <section class="docs-section">
      <h2>상태</h2>
      <div class="example-preview">
        <div class="grid w-full max-w-[640px] grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-[24px]">
          <div class="grid gap-[8px]">
            <span class="text-[13px] text-[#69707e]">prevent</span>
            <PxToggle v-model="prevented" prevent />
          </div>
          <div class="grid gap-[8px]">
            <span class="text-[13px] text-[#69707e]">disabled</span>
            <PxToggle v-model="disabledValue" disabled />
          </div>
          <div class="grid gap-[8px]">
            <span class="text-[13px] text-[#69707e]">viewMode</span>
            <PxToggle v-model="viewValue" viewMode />
          </div>
        </div>
      </div>
      <CodeBlock :code="stateCode" />
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
      <p class="m-[0px] max-w-[760px] text-[14px] leading-[1.75] text-[#69707e]">
        트랙과 핸들 크기를 함께 바꾸면 이동 거리는 컴포넌트가 렌더링된 크기를 기준으로 계산합니다.
      </p>
      <DocsTable class="mt-[20px]" :headers="classHeaders" :rows="classRows" />

      <h3 class="mb-[12px] mt-[28px] text-[17px] font-bold text-[#242832]">사용자 클래스 추가</h3>
      <div class="example-preview">
        <PxToggle v-model="customValue" class="project-toggle" />
      </div>
      <CodeBlock :code="customClassCode" />
    </section>
  </article>
</template>

<style>
.px-toggle.project-toggle .px-toggle--box {
  @apply h-[40px] w-[80px] p-[4px];
}

.px-toggle.project-toggle .px-toggle--box .dot {
  @apply h-[32px] w-[32px];
}

.project-toggle .px-toggle--box.selected {
  @apply bg-red-600 shadow-[0_8px_20px_rgba(220,38,38,0.3)];
}
</style>
