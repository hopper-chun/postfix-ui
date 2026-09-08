<script setup>
import { ref } from 'vue'
import CodeBlock from '../../components/CodeBlock.vue'
import DocsTable from '../../components/DocsTable.vue'

const count = ref(0)
const exampleCode = `<PxButton color="pri" @click="count += 1">
  클릭 {{ count }}
</PxButton>`

const sizeCode = `<PxButton size="xs">Extra Small</PxButton>
<PxButton size="sm">Small</PxButton>
<PxButton size="md">Medium</PxButton>
<PxButton size="lg">Large</PxButton>
<PxButton size="xl">Extra Large</PxButton>`

const customClassCode = `<PxButton class="project-save-button" color="pri">
  저장
</PxButton>`

const customStyleCode = `.px-btn.project-save-button {
  height: 44px;
  width: 240px;
  padding: 0 20px;
  border: 2px solid #4c1d95;
  border-radius: 12px;
  background: linear-gradient(135deg, #7c3aed, #db2777);
  box-shadow: 0 10px 24px rgba(124, 58, 237, 0.32);
  color: #ffffff;
  font-size: 14px;
  font-weight: 800;
}`

const propHeaders = [
  { field: 'name', label: '이름', code: true },
  { field: 'type', label: '타입' },
  { field: 'defaultValue', label: '기본값' },
  { field: 'description', label: '설명', html: true },
]

const propRows = [
  {
    name: 'color',
    type: 'String',
    defaultValue: 'pri',
    description: '버튼 색상',
  },
  {
    name: 'size',
    type: 'String',
    defaultValue: 'md',
    description: 'xs, sm, md, lg, xl',
  },
  {
    name: 'disabled',
    type: 'Boolean',
    defaultValue: 'false',
    description: '버튼 비활성화',
  },
  {
    name: 'isWide',
    type: 'Boolean',
    defaultValue: 'false',
    description: '부모 너비에 맞춤',
  },
  {
    name: 'isDoing',
    type: 'Boolean',
    defaultValue: 'false',
    description: '처리 중 상태 표시',
  },
]

const classHeaders = [
  { field: 'category', label: '구분' },
  { field: 'className', label: '클래스', html: true },
  { field: 'description', label: '용도', html: true },
]

const classRows = [
  {
    category: '기본',
    className: '<code>px-btn</code>',
    description: '모든 버튼에 적용되는 기본 클래스',
  },
  {
    category: '크기',
    className: '<code>xs</code>, <code>sm</code>, <code>md</code>, <code>lg</code>, <code>xl</code>',
    description: '<code>size</code> prop에 따라 적용',
  },
  {
    category: '색상',
    className: '<code>pri</code>, <code>sec</code>, <code>ter</code>, <code>black</code>, <code>white</code>, <code>gray</code> 및 <code>*_border</code>',
    description: '<code>color</code> prop에 따라 적용',
  },
  {
    category: '상태·배치',
    className: '<code>rounded</code>, <code>isWide</code>, <code>inactive</code>, <code>disabled</code>',
    description: '모양, 너비, 비활성 상태를 제어',
  },
  {
    category: '내부',
    className: '<code>px-btn--container</code>',
    description: '버튼 내부 콘텐츠 정렬을 재정의',
  },
]
</script>

<template>
  <article class="docs-page">
    <p class="docs-eyebrow">COMPONENTS</p>
    <h1>PxButton</h1>
    <p class="docs-lead">사용자의 주요 동작을 실행하는 기본 버튼입니다.</p>

    <section class="docs-section">
      <h2>기본 사용</h2>
      <div class="example-preview">
        <PxButton color="pri" @click="count += 1">클릭 {{ count }}</PxButton>
      </div>
      <CodeBlock :code="exampleCode" />
    </section>

    <section class="docs-section">
      <h2>색상</h2>
      <div class="example-preview example-preview--row">
        <PxButton color="pri">pri</PxButton>
        <PxButton color="sec">Sec</PxButton>
        <PxButton color="ter">Ter</PxButton>
        <PxButton color="black">Black</PxButton>
        <PxButton color="white">white</PxButton>
        <PxButton color="pri_border">pri_border</PxButton>
        <PxButton color="gray_border">gray_border</PxButton>
      </div>
    </section>

    <section class="docs-section">
      <h2>크기</h2>
      <div class="example-preview example-preview--row items-end">
        <div class="flex flex-col">
          <PxButton size="xs">Extra Small</PxButton>
          <span class="text-[12px] text-[#737a88]">xs</span>
        </div>
        <div class="flex flex-col">
          <PxButton size="sm">Small</PxButton>
          <span class="text-[12px] text-[#737a88]">sm</span>
        </div>
        <div class="flex flex-col">
          <PxButton size="md">Medium</PxButton>
          <span class="text-[12px] text-[#737a88]">md</span>
        </div>
        <div class="flex flex-col">
          <PxButton size="lg">Large</PxButton>
          <span class="text-[12px] text-[#737a88]">lg</span>
        </div>
        <div class="flex flex-col">
          <PxButton size="xl">Extra Large</PxButton>
          <span class="text-[12px] text-[#737a88]">xl</span>
        </div>
      </div>
      <CodeBlock :code="sizeCode" />
    </section>

    <section class="docs-section">
      <h2>주요 Props</h2>
      <DocsTable :headers="propHeaders" :rows="propRows" />
    </section>

    <section class="docs-section">
      <h2>Class로 스타일 재정의</h2>
      <p class="m-[0px] max-w-[760px] text-[14px] leading-[1.75] text-[#69707e]">
        Postfix UI는 컴포넌트의 스타일을 클래스로 노출합니다. 필요한 경우 기본 클래스와 프로젝트의 사용자 클래스를 함께 지정해 라이브러리 파일을 수정하지 않고도
        스타일을 재정의할 수 있습니다.
      </p>

      <DocsTable class="mt-[20px]" :headers="classHeaders" :rows="classRows" />

      <h3 class="mb-[12px] mt-[28px] text-[17px] font-bold text-[#242832]">사용자 클래스 추가</h3>
      <div class="example-preview">
        <PxButton class="project-save-button" color="pri">저장</PxButton>
      </div>
      <CodeBlock :code="customClassCode" />
      <CodeBlock :code="customStyleCode" />

      <CodeBlock :code="scopedStyleCode" />
    </section>
  </article>
</template>

<style scoped>
.px-btn.project-save-button {
  height: 44px;
  width: 240px;
  padding: 0 20px;
  border: 2px solid #4c1d95;
  border-radius: 12px;
  background: linear-gradient(135deg, #7c3aed, #db2777);
  box-shadow: 0 10px 24px rgba(124, 58, 237, 0.32);
  color: #ffffff;
  font-size: 14px;
  font-weight: 800;
}
</style>
