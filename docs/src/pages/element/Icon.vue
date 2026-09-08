<script setup>
import CodeBlock from '../../components/CodeBlock.vue'
import DocsTable from '../../components/DocsTable.vue'

const basicCode = `<div class="flex h-[20px] w-[20px] items-center justify-center text-[#16a34a]">
  <PxIcon name="icon-check" />
</div>

<div class="flex h-[24px] w-[24px] items-center justify-center text-[#2563eb]">
  <PxIcon name="icon-information-circle" />
</div>`

const centerCode = `<div class="flex h-[44px] w-[44px] items-center justify-center">
  <PxIcon name="icon-bell" />
</div>`

const propHeaders = [
  { field: 'name', label: '이름', code: true },
  { field: 'type', label: '타입' },
  { field: 'defaultValue', label: '기본값' },
  { field: 'description', label: '설명' },
]

const propRows = [
  { name: 'name', type: 'String', defaultValue: '필수', description: '표시할 아이콘 이름. kebab-case로 입력' },
  { name: 'isLocal', type: 'Boolean', defaultValue: 'false', description: '현재 프로젝트에 로컬 등록된 아이콘 컴포넌트를 이름으로 사용' },
]
</script>

<template>
  <article class="docs-page">
    <p class="docs-eyebrow">ELEMENT</p>
    <h1>PxIcon</h1>
    <p class="docs-lead">Postfix UI에 포함된 SVG 아이콘을 <code>name</code>으로 불러오는 컴포넌트입니다.</p>

    <section class="docs-section">
      <h2>기본 사용</h2>
      <div class="example-preview example-preview--row">
        <div class="flex h-[20px] w-[20px] items-center justify-center text-[#16a34a]">
          <PxIcon name="icon-check" />
        </div>
        <div class="flex h-[24px] w-[24px] items-center justify-center text-[#2563eb]">
          <PxIcon name="icon-information-circle" />
        </div>
      </div>
      <CodeBlock :code="basicCode" />
      <DocsTable :headers="propHeaders" :rows="propRows" />
    </section>

    <section class="docs-section">
      <h2>아이콘 중앙 정렬</h2>
      <p class="m-[0px] max-w-[760px] text-[14px] leading-[1.75] text-[#69707e]">
        아이콘을 영역의 정중앙에 놓으려면 상위 <code>div</code>의 너비와 높이를 먼저 정하고, 그 요소에 <code>flex</code>, <code>items-center</code>,
        <code>justify-center</code>를 함께 적용합니다.
      </p>
      <div class="example-preview mt-[20px]">
        <div class="flex h-[44px] w-[44px] items-center justify-center rounded-[12px] bg-[#111827] text-white">
          <PxIcon name="icon-bell" />
        </div>
      </div>
      <CodeBlock :code="centerCode" />
    </section>

    <section class="docs-section">
      <h2>신규 사용 권장 사항</h2>
      <p class="docs-note">
        <code>PxIcon</code>은 아이콘마다 SVG 크기와 형태가 달라 정렬과 크기를 직접 보정해야 하는 한계가 있습니다. 기존 화면을 유지할 때 사용하고,
        새로운 아이콘을 추가하거나 신규 화면을 만들 때는 일관된 크기와 스타일을 제공하는 <strong>Phosphor Icons</strong> 사용을 권장합니다.
      </p>
    </section>
  </article>
</template>
