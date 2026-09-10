<script setup>
import { ref } from 'vue'
import AdminTablePosition from '../../components/AdminTablePosition.vue'
import CodeBlock from '../../components/CodeBlock.vue'
import DocsTable from '../../components/DocsTable.vue'

const filterTypes = [
  { key: 'keyword', title: '검색어', group: 'text', placeholder: '이름을 입력하세요.' },
  { key: 'status', title: '상태', group: 'select', options: [['ACTIVE', '사용'], ['STOP', '중지']] },
  { key: 'createdAt', title: '등록일', group: 'date' },
]

const filters = ref([])
const eventMessage = ref('검색 조건을 추가해보세요.')

const appendQuerys = (querys) => {
  querys.forEach(({ key, value }) => {
    filters.value = filters.value.filter(([filterType]) => filterType.key !== key)
    const filterType = filterTypes.find((item) => item.key === key)
    if (filterType && value) filters.value.push([filterType, value])
  })
  eventMessage.value = `onAppendQuerys: ${JSON.stringify(querys)}`
}

const removeQuery = (key) => {
  filters.value = key ? filters.value.filter(([filterType]) => filterType.key !== key) : []
  eventMessage.value = key ? `onRemoveQuery: ${key}` : '전체 검색 조건 초기화'
}

const basicCode = `const filterTypes = [
  { key: 'keyword', title: '검색어', group: 'text' },
  {
    key: 'status',
    title: '상태',
    group: 'select',
    options: [['ACTIVE', '사용'], ['STOP', '중지']]
  },
  { key: 'createdAt', title: '등록일', group: 'date' }
]

const searchFilter = useSearchFilter(router, { filterTypes })

<PxSearchSelectInputs
  :filters="searchFilter.state"
  :filterTypes="filterTypes"
  :route="route"
  buttonSize="xs"
  @onAppendQuerys="searchFilter.appendQuerys($event)"
  @onRemoveQuery="searchFilter.clearQuery"
  @onSearch="reload"
/>`

const propHeaders = [
  { field: 'name', label: '이름', code: true },
  { field: 'type', label: '타입' },
  { field: 'defaultValue', label: '기본값' },
  { field: 'description', label: '설명' },
]

const propRows = [
  { name: 'filters', type: 'Array', defaultValue: '필수', description: '[[filterType, value]] 형식의 현재 검색 조건' },
  { name: 'filterTypes', type: 'Array', defaultValue: '필수', description: '검색 키·제목·group·선택지 정의' },
  { name: 'buttonSize', type: 'String', defaultValue: '-', description: '검색·초기화 PxButton의 size' },
  { name: 'route', type: 'Object', defaultValue: '-', description: '라우트 query에서 현재 검색값을 복원할 때 사용' },
]

const eventHeaders = [
  { field: 'name', label: '이벤트', code: true },
  { field: 'payload', label: '전달값', code: true },
  { field: 'description', label: '설명' },
]

const eventRows = [
  { name: 'onAppendQuerys', payload: '[{ key, value }]', description: '검색 조건 추가·변경 요청' },
  { name: 'onRemoveQuery', payload: 'key | undefined', description: '개별 조건 삭제 또는 전체 초기화 요청' },
  { name: 'onSearch', payload: '-', description: '검색 버튼이나 Enter로 검색 요청' },
]

const groupHeaders = [
  { field: 'group', label: 'group', code: true },
  { field: 'control', label: '표시 입력' },
  { field: 'value', label: '전달 형식' },
]

const groupRows = [
  { group: 'text', control: 'PxInput', value: '문자열' },
  { group: 'radio', control: 'PxRadio', value: '선택 value' },
  { group: 'select', control: 'PxSelect', value: '선택 value' },
  { group: 'check', control: 'PxMultiCheckbox', value: '콤마로 연결된 문자열' },
  { group: 'date', control: '일자 기간', value: 'yyyyMMdd,yyyyMMdd' },
  { group: 'month', control: '월 기간', value: 'yyyyMM,yyyyMM' },
  { group: 'datepicker', control: 'PxDatePicker', value: 'yyyyMMdd' },
  { group: 'monthpicker', control: 'PxMonthPicker', value: 'yyyyMM' },
  { group: 'yearpicker', control: 'PxMonthPicker isYear', value: 'yyyy' },
  { group: 'user', control: 'LocalUserPicker', value: '주입된 컴포넌트의 값' },
]

const classHeaders = [
  { field: 'className', label: '클래스', html: true },
  { field: 'description', label: '용도' },
]

const classRows = [
  { className: '<code>px-searchSelectInputs</code>', description: '최상위' },
  { className: '<code>px-searchSelectInputs--field</code>', description: '검색 필드와 버튼 영역' },
  { className: '<code>px-searchSelectInputs--query</code>', description: '적용된 검색 조건 영역' },
  { className: '<code>query_container</code>', description: '검색 조건 목록' },
  { className: '<code>query_list</code>', description: '개별 검색 조건' },
  { className: '<code>query_text</code>', description: '조건의 title·value 묶음' },
  { className: '<code>remove</code>', description: '개별 삭제 버튼' },
  { className: '<code>px-selectinputradiocheck</code>', description: '검색 종류와 입력 컴포넌트 묶음' },
  { className: '<code>searchOption</code>', description: '검색 종류 PxSelect 영역' },
  { className: '<code>search_input</code>', description: 'text 검색 PxInput 영역' },
  { className: '<code>search_select</code>', description: 'select 검색 영역' },
  { className: '<code>search_radio</code>', description: 'radio 검색 영역' },
]
</script>

<template>
  <article class="docs-page">
    <p class="docs-eyebrow">TABLE</p>
    <h1>PxSearchSelectInputs</h1>
    <p class="docs-lead">검색 종류에 맞는 입력 컴포넌트를 바꾸어 보여주고, 적용된 조건을 삭제 가능한 태그 형태로 관리하는 통합 검색 컴포넌트입니다.</p>

    <section class="docs-section">
      <h2>PxAdminTable 내 위치</h2>
      <AdminTablePosition
        area="search"
        name="PxSearchSelectInputs"
        description="테이블 도구 모음 위의 SHELL-SEARCH 슬롯에 배치합니다. PxAdminTable이 자동으로 만들지 않으므로, 사용측에서 PxAdminFormWrapper·Row와 함께 슬롯에 넣어야 합니다."
      />
    </section>

    <section class="docs-section">
      <h2>기본 사용</h2>
      <div class="example-preview overflow-visible">
        <PxSearchSelectInputs
          :filters="filters"
          :filterTypes="filterTypes"
          buttonSize="xs"
          @onAppendQuerys="appendQuerys"
          @onRemoveQuery="removeQuery"
          @onSearch="eventMessage = '검색 요청'"
        />
        <p class="mt-[12px] text-[12px] text-[#626977]">{{ eventMessage }}</p>
      </div>
      <CodeBlock :code="basicCode" />
      <p class="docs-note">라우터 query를 쓰는 목록은 <code>useSearchFilter</code>, 다이얼로그처럼 로컬 상태만 필요한 경우는 <code>useSearchFilterLocal</code>과 연결하면 됩니다.</p>
    </section>

    <section class="docs-section">
      <h2>filterTypes group</h2>
      <DocsTable :headers="groupHeaders" :rows="groupRows" />
      <p class="docs-note"><code>user</code> group은 앱에서 <code>LocalUserPicker</code>를 provide해야 표시됩니다. 해당 주입이 없으면 입력 UI가 나오지 않습니다.</p>
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
