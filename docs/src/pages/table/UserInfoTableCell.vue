<script setup>
import AdminTablePosition from '../../components/AdminTablePosition.vue'
import CodeBlock from '../../components/CodeBlock.vue'
import DocsTable from '../../components/DocsTable.vue'

const headers = [
  {
    field: 'user',
    label: '사용자',
    component: {
      name: 'PxUserInfoTableCell',
      props: (row) => ({ user: row.user }),
    },
  },
  { field: 'role', label: '권한' },
]

const rows = [
  { user: { userSeq: 101, userName: '김민준', userId: 'minjun' }, role: '일반 회원' },
  { user: { userSeq: 102, userName: '이서연', userId: 'seoyeon' }, role: '파트너' },
]

const basicCode = `const headers = [
  {
    field: 'user',
    label: '사용자',
    component: {
      name: 'PxUserInfoTableCell',
      props: (row) => ({ user: row.user })
    }
  }
]

const rows = [
  {
    user: {
      userSeq: 101,
      userName: '김민준',
      userId: 'minjun'
    }
  }
]

<PxTable :headers="headers" :rows="rows" tableHeight="auto" />`

const routeCode = `// PxUserInfoTableCell의 링크가 사용할 라울트
{
  name: 'userView',
  path: '/users/:userSeq',
  component: UserView
}`

const propHeaders = [
  { field: 'name', label: '이름', code: true },
  { field: 'type', label: '타입' },
  { field: 'defaultValue', label: '기본값' },
  { field: 'description', label: '설명' },
]

const propRows = [
  { name: 'user', type: 'Object', defaultValue: '-', description: 'userName·userId·userSeq를 가진 사용자 객체' },
  { name: 'viewMode', type: 'Boolean', defaultValue: 'false', description: 'PxFormForView로 감싸 이름 라벨과 함께 표시' },
  { name: 'md', type: 'String', defaultValue: '-', description: 'viewMode의 PxFormForView·PxLabel에 전달할 도움말' },
]

const classHeaders = [
  { field: 'className', label: '클래스', html: true },
  { field: 'description', label: '용도' },
]
const classRows = [
  { className: '<code>px-userInfoTableCell</code>', description: '컴포넌트 최상위' },
  { className: '<code>px-userInfoTableCell--container</code>', description: '이름과 ID 링크 영역' },
  { className: '<code>px-userInfoTableCell--link</code>', description: '대괄호로 표시되는 userId 링크' },
]
</script>

<template>
  <article class="docs-page">
    <p class="docs-eyebrow">TABLE</p>
    <h1>PxUserInfoTableCell</h1>
    <p class="docs-lead">사용자 이름과 ID를 함께 표시하고, ID를 사용자 상세 화면으로 연결하는 테이블 셀 컴포넌트입니다.</p>

    <section class="docs-section">
      <h2>PxAdminTable 내 위치</h2>
      <AdminTablePosition
        area="cell"
        name="PxUserInfoTableCell"
        description="PxAdminTable 내부 PxTable의 tbody 셀에 표시됩니다. tableConfig.state.headers의 component.name에 PxUserInfoTableCell을 지정해 행별로 렌더링합니다."
      />
    </section>

    <section class="docs-section">
      <h2>테이블 사용</h2>
      <div class="example-preview">
        <PxTable :headers="headers" :rows="rows" tableHeight="auto" />
      </div>
      <CodeBlock :code="basicCode" />
    </section>

    <section class="docs-section">
      <h2>필수 라우트</h2>
      <CodeBlock :code="routeCode" />
      <p class="docs-note">ID 링크는 <code>{ name: 'userView', params: { userSeq } }</code>로 고정되어 있습니다. 앱 라우터에 <code>userView</code> 이름의 route가 없으면 링크를 정상적으로 사용할 수 없습니다.</p>
    </section>

    <section class="docs-section">
      <h2>Props</h2>
      <DocsTable :headers="propHeaders" :rows="propRows" />
    </section>

    <section class="docs-section">
      <h2>Class로 스타일 재정의</h2>
      <DocsTable :headers="classHeaders" :rows="classRows" />
    </section>
  </article>
</template>
