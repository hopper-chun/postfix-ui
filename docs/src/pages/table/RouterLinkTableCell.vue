<script setup>
import AdminTablePosition from '../../components/AdminTablePosition.vue'
import CodeBlock from '../../components/CodeBlock.vue'
import DocsTable from '../../components/DocsTable.vue'

const headers = [
  { field: 'code', label: '코드' },
  {
    field: 'title',
    label: '제목',
    component: {
      name: 'PxRouterLinkTableCell',
      props: (row) => ({
        label: row.title,
        to: { name: 'routerLinkTableCell', query: { selected: row.code } },
        addClass: 'font-bold !text-[#7c3aed] hover:underline',
      }),
    },
  },
]

const rows = [
  { code: 'DOC-101', title: '시작하기' },
  { code: 'DOC-102', title: '컴포넌트 가이드' },
]

const basicCode = `const headers = [
  { field: 'code', label: '코드' },
  {
    field: 'title',
    label: '제목',
    component: {
      name: 'PxRouterLinkTableCell',
      props: (row) => ({
        label: row.title,
        to: { name: 'documentView', params: { id: row.id } },
        addClass: 'font-bold text-[#7c3aed] hover:underline'
      })
    }
  }
]

<PxTable :headers="headers" :rows="rows" tableHeight="auto" />`

const propHeaders = [
  { field: 'name', label: '이름', code: true },
  { field: 'type', label: '타입' },
  { field: 'defaultValue', label: '기본값' },
  { field: 'description', label: '설명' },
]

const propRows = [
  { name: 'label', type: 'String', defaultValue: '필수', description: '링크에 표시할 텍스트' },
  { name: 'to', type: 'Object', defaultValue: '필수', description: 'router-link에 전달할 라울트 위치 객체' },
  { name: 'addClass', type: 'String | Object | Array', defaultValue: 'text-blue-500', description: 'router-link에 적용할 클래스' },
]

const eventHeaders = [
  { field: 'name', label: '이벤트', code: true },
  { field: 'status', label: '현재 상태' },
  { field: 'description', label: '설명' },
]
const eventRows = [{ name: 'onClick', status: '사용 불가', description: 'emit은 선언되어 있지만 현재 템플릿에서 발생시키지 않음' }]
</script>

<template>
  <article class="docs-page">
    <p class="docs-eyebrow">TABLE</p>
    <h1>PxRouterLinkTableCell</h1>
    <p class="docs-lead">테이블 셀의 텍스트를 Vue Router 링크로 렌더링하는 간단한 컴포넌트입니다.</p>

    <section class="docs-section">
      <h2>PxAdminTable 내 위치</h2>
      <AdminTablePosition
        area="cell"
        name="PxRouterLinkTableCell"
        description="PxAdminTable 내부 PxTable의 tbody 셀에 표시됩니다. tableConfig.state.headers의 component 설정에서 행별 label과 to를 만들어 전달합니다."
      />
    </section>

    <section class="docs-section">
      <h2>테이블 사용</h2>
      <div class="example-preview">
        <PxTable :headers="headers" :rows="rows" tableHeight="auto" />
      </div>
      <CodeBlock :code="basicCode" />
      <p class="docs-note">컴포넌트 전용 루트 클래스는 없습니다. 색상·굵기·밑줄 등은 <code>addClass</code>로 바로 전달하는 방식이 가장 명확합니다.</p>
    </section>

    <section class="docs-section">
      <h2>Props와 Event</h2>
      <DocsTable :headers="propHeaders" :rows="propRows" />
      <DocsTable class="mt-[14px]" :headers="eventHeaders" :rows="eventRows" />
    </section>
  </article>
</template>
