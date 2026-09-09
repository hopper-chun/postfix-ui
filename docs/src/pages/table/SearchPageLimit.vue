<script setup>
import { ref } from 'vue'
import AdminTablePosition from '../../components/AdminTablePosition.vue'
import CodeBlock from '../../components/CodeBlock.vue'
import DocsTable from '../../components/DocsTable.vue'

const limit = ref(20)

const basicCode = `const limit = ref(20)

<PxSearchPageLimit
  :limit="limit"
  @onChangeLimit="limit = $event"
/>`

const propHeaders = [
  { field: 'name', label: '이름', code: true },
  { field: 'type', label: '타입' },
  { field: 'defaultValue', label: '기본값' },
  { field: 'description', label: '설명' },
]

const propRows = [
  { name: 'limit', type: 'Number', defaultValue: '필수', description: '현재 페이지당 표시 개수' },
  { name: 'size', type: 'String', defaultValue: '-', description: '선언되어 있지만 현재 템플릿에서 사용하지 않음' },
]

const optionRows = [
  { value: '10', label: '10개' },
  { value: '20', label: '20개' },
  { value: '30', label: '30개' },
  { value: '50', label: '50개' },
  { value: '100', label: '100개' },
]
const optionHeaders = [
  { field: 'value', label: '값', code: true },
  { field: 'label', label: '표시' },
]

const eventRows = [{ name: 'onChangeLimit', payload: 'Number', description: '선택한 표시 개수를 Number로 전달' }]
const eventHeaders = [
  { field: 'name', label: '이벤트', code: true },
  { field: 'payload', label: '전달값', code: true },
  { field: 'description', label: '설명' },
]
</script>

<template>
  <article class="docs-page">
    <p class="docs-eyebrow">TABLE</p>
    <h1>PxSearchPageLimit</h1>
    <p class="docs-lead">테이블의 페이지당 표시 개수를 10·100 범위의 고정 선택지로 바꾸는 라디오 컴포넌트입니다.</p>

    <section class="docs-section">
      <h2>PxAdminTable 내 위치</h2>
      <AdminTablePosition
        area="config-limit"
        name="PxSearchPageLimit"
        description="우측 설정 버튼으로 여는 테이블 설정 다이얼로그의 왼쪽에 위치합니다. PxAdminTable이 내부에서 직접 렌더링합니다."
      />
    </section>

    <section class="docs-section">
      <h2>기본 사용</h2>
      <div class="example-preview">
        <PxSearchPageLimit :limit="limit" @onChangeLimit="limit = $event" />
        <p class="mt-[12px] text-[13px] text-[#626977]">현재 limit: <code>{{ limit }}</code></p>
      </div>
      <CodeBlock :code="basicCode" />
      <p class="docs-note"><code>PxAdminTable</code>의 테이블 설정 다이얼로그에서는 이 컴포넌트가 자동으로 사용됩니다.</p>
    </section>

    <section class="docs-section">
      <h2>Props와 Event</h2>
      <DocsTable :headers="propHeaders" :rows="propRows" />
      <DocsTable class="mt-[14px]" :headers="eventHeaders" :rows="eventRows" />
    </section>

    <section class="docs-section">
      <h2>고정 선택지</h2>
      <DocsTable :headers="optionHeaders" :rows="optionRows" />
      <p class="docs-note">선택지는 컴포넌트 내부에 고정되어 있으며 prop으로 교체할 수 없습니다. 스타일은 상위 클래스에서 <code>px-radio</code> 계열을 재정의합니다.</p>
    </section>
  </article>
</template>
