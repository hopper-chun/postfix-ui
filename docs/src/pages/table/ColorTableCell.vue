<script setup>
import CodeBlock from '../../components/CodeBlock.vue'
import DocsTable from '../../components/DocsTable.vue'

const basicCode = `<PxColorTableCell
  text="확인 필요"
  active
  extraClass="status-cell"
  activeClass="status-cell--active"
/>

<style>
.status-cell {
  color: #64748b;
}

.status-cell--active {
  color: #dc2626;
  font-weight: 700;
}
</style>`

const propHeaders = [
  { field: 'name', label: '이름', code: true },
  { field: 'type', label: '타입' },
  { field: 'description', label: '설명' },
]

const propRows = [
  { name: 'text', type: 'String', description: '셀에 표시할 문자열' },
  { name: 'active', type: 'Boolean', description: '활성 클래스 적용 여부' },
  { name: 'extraClass', type: 'String | Object', description: '항상 적용할 기본 클래스' },
  { name: 'activeClass', type: 'String', description: 'active일 때 적용할 클래스' },
]
</script>

<template>
  <article class="docs-page">
    <p class="docs-eyebrow">TABLE</p>
    <h1>PxColorTableCell</h1>
    <p class="docs-lead">상태에 따라 글자 색상이나 강조 스타일을 바꾸는 작은 테이블 셀 컴포넌트입니다.</p>

    <section class="docs-section">
      <h2>간단 사용</h2>
      <div class="example-preview">
        <PxColorTableCell
          text="확인 필요"
          active
          extraClass="text-[#64748b]"
          activeClass="font-bold !text-[#dc2626]"
        />
      </div>
      <CodeBlock :code="basicCode" />
      <p class="docs-note"><code>extraClass</code>와 <code>activeClass</code>에 프로젝트 클래스나 Tailwind 클래스를 전달하면 됩니다.</p>
    </section>

    <section class="docs-section">
      <h2>주요 Props</h2>
      <DocsTable :headers="propHeaders" :rows="propRows" />
    </section>
  </article>
</template>
