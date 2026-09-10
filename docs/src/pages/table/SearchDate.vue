<script setup>
import { ref } from 'vue'
import AdminTablePosition from '../../components/AdminTablePosition.vue'
import CodeBlock from '../../components/CodeBlock.vue'
import DocsTable from '../../components/DocsTable.vue'

const lastQuery = ref('날짜를 선택해보세요.')
const handleQuery = (querys) => {
  lastQuery.value = JSON.stringify(querys)
}

const basicCode = `<PxSearchDay
  @onAppendQuerys="searchFilter.appendQuerys($event)"
/>

<PxSearchMonth
  @onAppendQuerys="searchFilter.appendQuerys($event)"
/>

<PxSearchYear
  @onAppendQuerys="searchFilter.appendQuerys($event)"
/>`

const componentHeaders = [
  { field: 'name', label: '컴포넌트', code: true },
  { field: 'control', label: '내부 입력' },
  { field: 'query', label: '라우트 query', code: true },
  { field: 'payload', label: '이벤트 전달값', code: true },
]

const componentRows = [
  { name: 'PxSearchDay', control: 'PxDatePicker', query: 'yyyymmdd', payload: "[{ key: 'yyyymmdd', value: 'yyyyMMdd' }]" },
  { name: 'PxSearchMonth', control: 'PxMonthPicker', query: 'yyyymm', payload: "[{ key: 'yyyymm', value: 'yyyyMM' }]" },
  { name: 'PxSearchYear', control: 'PxMonthPicker isYear', query: 'yyyy', payload: "[{ key: 'yyyy', value: 'yyyy' }]" },
]

const eventHeaders = [
  { field: 'name', label: '이벤트', code: true },
  { field: 'payload', label: '전달값', code: true },
  { field: 'description', label: '설명' },
]
const eventRows = [{ name: 'onAppendQuerys', payload: '[{ key, value }]', description: '선택한 날짜를 query 형식으로 전달' }]

const classHeaders = [
  { field: 'className', label: '클래스', html: true },
  { field: 'description', label: '용도' },
]
const classRows = [
  { className: '<code>px-searchDate</code>', description: '일·월·연 검색 컴포넌트 공통 최상위' },
  { className: '<code>day</code>', description: 'PxSearchDay 구분' },
  { className: '<code>month</code>', description: 'PxSearchMonth 구분' },
  { className: '<code>year</code>', description: 'PxSearchYear 구분' },
  { className: '<code>datePicker</code>', description: '내부 PxDatePicker·PxMonthPicker' },
]
</script>

<template>
  <article class="docs-page">
    <p class="docs-eyebrow">TABLE</p>
    <h1>PxSearchDay · PxSearchMonth · PxSearchYear</h1>
    <p class="docs-lead">현재 라우트의 일·월·연 query를 읽어 픽커에 표시하고, 변경된 값을 <code>onAppendQuerys</code>로 전달합니다.</p>

    <section class="docs-section">
      <h2>PxAdminTable 내 위치</h2>
      <AdminTablePosition
        area="search"
        name="PxSearchDay · Month · Year"
        description="통합 검색과 동일하게 SHELL-SEARCH 슬롯에 날짜 기준을 바로 선택하는 전용 검색으로 배치합니다. PxAdminTable이 자동으로 렌더링하지는 않습니다."
      />
    </section>

    <section class="docs-section">
      <h2>기본 사용</h2>
      <div class="example-preview overflow-visible">
        <div class="flex flex-wrap items-start gap-[18px]">
          <div>
            <strong class="mb-[7px] block text-[12px] text-[#626977]">PxSearchDay</strong>
            <PxSearchDay @onAppendQuerys="handleQuery" />
          </div>
          <div>
            <strong class="mb-[7px] block text-[12px] text-[#626977]">PxSearchMonth</strong>
            <PxSearchMonth @onAppendQuerys="handleQuery" />
          </div>
          <div>
            <strong class="mb-[7px] block text-[12px] text-[#626977]">PxSearchYear</strong>
            <PxSearchYear @onAppendQuerys="handleQuery" />
          </div>
        </div>
        <p class="mt-[14px] break-all text-[12px] text-[#626977]">{{ lastQuery }}</p>
      </div>
      <CodeBlock :code="basicCode" />
      <p class="docs-note">별도 prop은 없고 <code>$route.query</code>를 직접 사용합니다. 라우터가 없는 환경에서는 사용할 수 없으며, 받은 이벤트를 <code>useSearchFilter.appendQuerys()</code>와 연결하는 구조입니다.</p>
    </section>

    <section class="docs-section">
      <h2>컴포넌트별 query</h2>
      <DocsTable :headers="componentHeaders" :rows="componentRows" />
      <DocsTable class="mt-[14px]" :headers="eventHeaders" :rows="eventRows" />
    </section>

    <section class="docs-section">
      <h2>Class로 스타일 재정의</h2>
      <DocsTable :headers="classHeaders" :rows="classRows" />
    </section>
  </article>
</template>
