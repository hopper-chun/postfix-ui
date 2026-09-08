<script setup>
import CodeBlock from '../../components/CodeBlock.vue'
import DocsTable from '../../components/DocsTable.vue'

const headers = [
  { label: '구분' },
  { label: '항목' },
  { label: '값' },
]

const rows = [{ category: '계정' }, { category: '계정' }]

const basicCode = `const headers = [
  { label: '구분' },
  { label: '항목' },
  { label: '값' },
]

const rows = [{ category: '계정' }, { category: '계정' }]

<PxCustomMergeTable :headers="headers" :rows="rows">
  <tr>
    <td rowspan="2">계정</td>
    <td>이름</td>
    <td>김민준</td>
  </tr>
  <tr>
    <td>권한</td>
    <td>관리자</td>
  </tr>
</PxCustomMergeTable>`

const propHeaders = [
  { field: 'name', label: '이름', code: true },
  { field: 'description', label: '설명' },
]

const propRows = [
  { name: 'headers', description: '헤더 설정 배열. label과 checkbox를 사용' },
  { name: 'rows', description: '빈 상태 판단에 사용하는 행 배열' },
  { name: 'checkboxes', description: '전체 선택 상태 계산에 사용하는 선택값 배열' },
  { name: 'isNarrow', description: '헤더 높이와 여백을 좁게 표시' },
  { name: 'emptyText', description: 'rows가 비었을 때 표시할 문구' },
]
</script>

<template>
  <article class="docs-page">
    <p class="docs-eyebrow">TABLE</p>
    <h1>PxCustomMergeTable</h1>
    <p class="docs-lead">일반적인 행 배열로 표현하기 어려운 병합 테이블을 직접 작성할 때 사용하는 테이블 틀입니다.</p>

    <section class="docs-section">
      <h2>간단 사용</h2>
      <div class="example-preview">
        <PxCustomMergeTable :headers="headers" :rows="rows">
          <tr>
            <td rowspan="2" class="border-r-[1px] border-[#e3e3e3] px-[12px] py-[10px] font-bold">계정</td>
            <td class="border-b-[1px] border-r-[1px] border-[#e3e3e3] px-[12px] py-[10px]">이름</td>
            <td class="border-b-[1px] border-[#e3e3e3] px-[12px] py-[10px]">김민준</td>
          </tr>
          <tr>
            <td class="border-r-[1px] border-[#e3e3e3] px-[12px] py-[10px]">권한</td>
            <td class="px-[12px] py-[10px]">관리자</td>
          </tr>
        </PxCustomMergeTable>
      </div>
      <CodeBlock :code="basicCode" />
      <p class="docs-note">컴포넌트가 본문 행을 만들지 않습니다. 기본 슬롯 안에 <code>tr</code>과 <code>td</code>를 직접 작성합니다.</p>
    </section>

    <section class="docs-section">
      <h2>주요 Props</h2>
      <DocsTable :headers="propHeaders" :rows="propRows" />
    </section>
  </article>
</template>
