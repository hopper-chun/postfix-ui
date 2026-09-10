<script setup>
import CodeBlock from '../../components/CodeBlock.vue'
import DocsTable from '../../components/DocsTable.vue'

const basicCode = `<PxCustomBoard
  :router="router"
  :rows="rows"
  :filterTypes="filterTypes"
  :isSearching="isSearching"
  :totalCount="totalCount"
  :searchOrder="searchOrder"
  :searchPagination="searchPagination"
  :tableConfig="tableConfig"
  :searchFilter="searchFilter"
  @onReload="fetchRows"
>
  <template #default="{ rows, isMobile }">
    <ResultCards :rows="rows" :mobile="isMobile" />
  </template>
</PxCustomBoard>`

const slotHeaders = [
  { field: 'name', label: '슬롯', code: true },
  { field: 'description', label: '용도' },
]

const slotRows = [
  { name: 'search', description: '기본 검색 입력 영역 대체' },
  { name: 'upper', description: '목록 바로 위의 추가 콘텐츠' },
  { name: 'default', description: '실제 목록. rows와 isMobile을 전달' },
  { name: 'searching / empty', description: '검색 중 또는 빈 결과 화면 대체' },
  { name: 'pagination', description: '기본 페이지네이션 영역 대체' },
]
</script>

<template>
  <article class="docs-page">
    <p class="docs-eyebrow">TABLE</p>
    <h1>PxCustomBoard</h1>
    <p class="docs-lead">검색부터 결과 목록과 페이지네이션까지 관리자 목록 화면의 공통 흐름을 묶는 컴포넌트입니다.</p>

    <section class="docs-section">
      <h2>간단 사용</h2>
      <CodeBlock :code="basicCode" />
      <p class="docs-note">
        <code>router</code>와 검색 관련 composable 객체를 함께 넘기는 결합도가 높은 컴포넌트입니다. 자유로운 화면에는 <code>PxTable</code>, 관리자 검색 목록에는 이 컴포넌트를 사용합니다.
      </p>
    </section>

    <section class="docs-section">
      <h2>주요 Slots</h2>
      <DocsTable :headers="slotHeaders" :rows="slotRows" />
    </section>
  </article>
</template>
