<script setup>
import { reactive, ref } from 'vue'
import AdminTablePosition from '../../components/AdminTablePosition.vue'
import CodeBlock from '../../components/CodeBlock.vue'
import DocsTable from '../../components/DocsTable.vue'

const changedCount = ref(0)
const tableConfig = reactive({
  state: {
    headers: [
      { field: 'name', label: '이름', using: true, essential: true },
      { field: 'email', label: '이메일', using: true, essential: false },
      { field: 'team', label: '소속 팀', using: true, essential: false },
      { field: 'createdAt', label: '등록일', using: false, essential: false },
    ],
  },
})

const basicCode = `import { useTableConfig } from '@postfix/ui'

const headers = [
  { field: 'name', label: '이름', essential: true },
  { field: 'email', label: '이메일' },
  { field: 'team', label: '소속 팀', default: false }
]

const tableConfig = useTableConfig({
  storageId: 'member-table-v1',
  headers
})

<BoardListConfig
  v-model="tableConfig"
  @onToggle="tableConfig.saveHeaders(tableConfig.state.headers)"
/>`

const propHeaders = [
  { field: 'name', label: '이름', code: true },
  { field: 'type', label: '타입' },
  { field: 'defaultValue', label: '기본값' },
  { field: 'description', label: '설명' },
]

const propRows = [
  { name: 'modelValue', type: 'Object', defaultValue: '필수', description: 'state.headers를 가진 useTableConfig 결과 객체' },
]

const eventHeaders = [
  { field: 'name', label: '이벤트', code: true },
  { field: 'payload', label: '전달값', code: true },
  { field: 'description', label: '설명' },
]

const eventRows = [{ name: 'onToggle', payload: '-', description: '헤더의 using 값이 변경된 후 발생' }]

const classHeaders = [
  { field: 'className', label: '클래스', html: true },
  { field: 'description', label: '용도' },
]

const classRows = [
  { className: '<code>px-boardListConfig</code>', description: '컴포넌트 최상위' },
  { className: '<code>option</code>', description: '각 헤더 토글 행' },
  { className: '<code>px-toggle--box</code>', description: '내부 PxToggle 박스' },
]
</script>

<template>
  <article class="docs-page">
    <p class="docs-eyebrow">TABLE</p>
    <h1>BoardListConfig</h1>
    <p class="docs-lead"><code>useTableConfig</code>의 헤더 목록을 토글로 보여주고, 테이블에 표시할 컬럼을 선택하는 설정 컴포넌트입니다.</p>

    <section class="docs-section">
      <h2>PxAdminTable 내 위치</h2>
      <AdminTablePosition
        area="config-columns"
        name="BoardListConfig"
        description="우측 설정 버튼으로 여는 테이블 설정 다이얼로그의 오른쪽에서 표시할 컬럼을 선택합니다. PxAdminTable이 내부에서 직접 렌더링합니다."
      />
    </section>

    <section class="docs-section">
      <h2>기본 사용</h2>
      <div class="example-preview">
        <div class="board-config-demo mx-auto w-full max-w-[420px] rounded-[8px] border border-[#d7dce3] bg-white px-[14px] py-[8px]">
          <BoardListConfig v-model="tableConfig" @onToggle="changedCount += 1" />
        </div>
        <p class="mt-[12px] text-[13px] text-[#626977]">변경 횟수: {{ changedCount }}</p>
      </div>
      <CodeBlock :code="basicCode" />
      <p class="docs-note"><code>essential: true</code>인 헤더는 토글이 비활성화됩니다. 단독 사용 시 <code>onToggle</code>에서 <code>saveHeaders()</code>를 호출해야 변경이 저장됩니다.</p>
    </section>

    <section class="docs-section">
      <h2>Props와 Event</h2>
      <DocsTable :headers="propHeaders" :rows="propRows" />
      <DocsTable class="mt-[14px]" :headers="eventHeaders" :rows="eventRows" />
    </section>

    <section class="docs-section">
      <h2>Class로 스타일 재정의</h2>
      <DocsTable :headers="classHeaders" :rows="classRows" />
    </section>
  </article>
</template>
