<script setup>
import { reactive } from 'vue'
import AdminTablePosition from '../../components/AdminTablePosition.vue'
import CodeBlock from '../../components/CodeBlock.vue'
import DocsTable from '../../components/DocsTable.vue'

const orderState = reactive({ orderField: '', orderType: '' })
const orderOptions = [
  { label: '최신순', value: { orderField: 'createdAt', orderType: 'desc' } },
  { label: '오래된순', value: { orderField: 'createdAt', orderType: 'asc' } },
  { label: '이름 오름차순', value: { orderField: 'name', orderType: 'asc' } },
]

const handleOrder = (value) => Object.assign(orderState, value)

const basicCode = `const orderState = reactive({
  orderField: '',
  orderType: ''
})

const orderOptions = [
  { label: '최신순', value: { orderField: 'createdAt', orderType: 'desc' } },
  { label: '오래된순', value: { orderField: 'createdAt', orderType: 'asc' } }
]

<PxSearchOrder
  :orderState="orderState"
  :orderOptions="orderOptions"
  defaultLabel="기본 정렬"
  @onSetSearchOrder="Object.assign(orderState, $event)"
/>`

const propHeaders = [
  { field: 'name', label: '이름', code: true },
  { field: 'type', label: '타입' },
  { field: 'defaultValue', label: '기본값' },
  { field: 'description', label: '설명' },
]

const propRows = [
  { name: 'orderState', type: 'Object', defaultValue: '필수', description: 'orderField와 orderType을 가진 현재 정렬 상태' },
  { name: 'orderOptions', type: 'Array', defaultValue: '필수', description: 'label과 value 객체로 구성한 정렬 선택지' },
  { name: 'defaultLabel', type: 'String', defaultValue: '필수', description: '선언되어 있지만 현재 템플릿은 분류로 고정 표시' },
]

const eventRows = [{ name: 'onSetSearchOrder', payload: 'option.value', description: '선택한 정렬 value 객체를 전달' }]
const eventHeaders = [
  { field: 'name', label: '이벤트', code: true },
  { field: 'payload', label: '전달값', code: true },
  { field: 'description', label: '설명' },
]

const classRows = [
  { className: '<code>px-searchOrder</code>', description: 'PxAdminTable이 자동으로 감싸는 정렬 영역' },
  { className: '<code>px-select</code>', description: '내부 PxSelect' },
  { className: '<code>px-input--field</code>', description: '정렬 선택 필드' },
  { className: '<code>px-select--options</code>', description: '선택지 패널' },
  { className: '<code>px-select--optionList</code>', description: '개별 선택지' },
]
const classHeaders = [
  { field: 'className', label: '클래스', html: true },
  { field: 'description', label: '용도' },
]
</script>

<template>
  <article class="docs-page">
    <p class="docs-eyebrow">TABLE</p>
    <h1>PxSearchOrder</h1>
    <p class="docs-lead">테이블 정렬 조건을 <code>PxSelect</code>로 선택하고, 선택한 정렬 객체를 이벤트로 전달합니다.</p>

    <section class="docs-section">
      <h2>PxAdminTable 내 위치</h2>
      <AdminTablePosition
        area="order"
        name="PxSearchOrder"
        description="테이블 본문 위 도구 모음의 오른쪽에 위치합니다. searchOrderButton이 true이고 options4Sort에 항목이 있을 때 PxAdminTable이 자동으로 렌더링합니다."
      />
    </section>

    <section class="docs-section">
      <h2>기본 사용</h2>
      <div class="example-preview">
        <div class="px-searchOrder w-[180px]">
          <PxSearchOrder :orderState="orderState" :orderOptions="orderOptions" defaultLabel="기본 정렬" @onSetSearchOrder="handleOrder" />
        </div>
        <p class="mt-[12px] text-[13px] text-[#626977]">현재 정렬: <code>{{ orderState.orderField || '-' }} / {{ orderState.orderType || '-' }}</code></p>
      </div>
      <CodeBlock :code="basicCode" />
      <p class="docs-note"><code>PxAdminTable</code>에서는 <code>searchOrder.options4Sort</code>를 기준으로 자동 렌더링됩니다. 단독 사용할 때는 이벤트로 상태를 반영해야 합니다.</p>
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
