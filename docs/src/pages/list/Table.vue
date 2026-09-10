<script setup>
import { computed, ref } from 'vue'
import CodeBlock from '../../components/CodeBlock.vue'
import DocsTable from '../../components/DocsTable.vue'

const headers = ref([
  { field: 'name', label: '이름', width: 180, sort: ['asc', 'desc'] },
  { field: 'team', label: '소속 팀', width: 160 },
  {
    field: 'status',
    label: '상태',
    slotId: 'status',
    align: 'center',
    width: 110,
  },
  {
    field: 'amount',
    label: '월 이용액',
    align: 'right',
    filter: (value) => `${value.toLocaleString('ko-KR')}원`,
  },
])

const rows = [
  { id: 1, name: '김민준', team: '플랫폼', status: '활성', amount: 125000 },
  { id: 2, name: '이서연', team: '프로덕트', status: '활성', amount: 98000 },
  { id: 3, name: '박지우', team: '운영', status: '대기', amount: 76000 },
  { id: 4, name: '최도윤', team: '플랫폼', status: '중지', amount: 143000 },
]

const sortState = ref({ orderField: '', orderType: '' })
const clickedRow = ref(null)

const sortedRows = computed(() => {
  const { orderField, orderType } = sortState.value
  if (!orderField || !orderType) return rows

  return [...rows].sort((a, b) => {
    const result = String(a[orderField]).localeCompare(String(b[orderField]), 'ko', { numeric: true })
    return orderType === 'asc' ? result : -result
  })
})

const handleSort = (value) => {
  sortState.value = value
}

const selectableHeaders = [
  { field: 'name', label: '권한명' },
  { field: 'description', label: '설명' },
]

const selectableRows = [
  { name: '관리자', description: '전체 메뉴와 설정에 접근' },
  { name: '편집자', description: '콘텐츠 작성 및 수정' },
  { name: '조회자', description: '등록된 콘텐츠 조회' },
]

const checkedRows = ref(selectableRows.map(() => false))
const isSearching = ref(false)

const gridHeaders = [{ field: 'name', label: '이름' }]

const basicCode = `const headers = [
  { field: 'name', label: '이름', width: 180, sort: ['asc', 'desc'] },
  { field: 'team', label: '소속 팀', width: 160 },
  { field: 'status', label: '상태', slotId: 'status', align: 'center' },
  {
    field: 'amount',
    label: '월 이용액',
    align: 'right',
    filter: (value) => \`\${value.toLocaleString('ko-KR')}원\`,
  },
]

const rows = [
  { id: 1, name: '김민준', team: '플랫폼', status: '활성', amount: 125000 },
]

<PxTable
  :headers="headers"
  :rows="rows"
  tableHeight="auto"
  @onClickHeader="handleSort"
  @onClickRow="handleClickRow"
>
  <template #status="{ row }">
    <PxTag :color="row.status === '활성' ? 'pri_border' : 'gray_border'">
      {{ row.status }}
    </PxTag>
  </template>
</PxTable>`

const checkboxCode = `const checkedRows = ref(rows.map(() => false))

<PxTable
  id="role-table"
  :headers="headers"
  :rows="rows"
  v-model:checkboxes="checkedRows"
  tableHeight="auto"
/>

<!-- 하나만 선택하려면 singleCheckbox를 추가합니다. -->`

const stateCode = `<PxTable
  :headers="headers"
  :rows="rows"
  :isSearching="isSearching"
  emptyText="검색 결과가 없습니다."
  tableHeight="auto"
/>`

const layoutCode = `<PxTable
  :headers="headers"
  :rows="rows"
  useGrid
  tableHeight="auto"
>
  <template #grid="{ row, index, handleCheckbox }">
    <!-- 그리드 카드 -->
  </template>
</PxTable>

<PxTable :headers="headers" :rows="rows" useMobile>
  <template #mobile="{ row, index }">
    <!-- 모바일 전용 행 -->
  </template>
</PxTable>`

const customClassCode = `<PxTable
  class="project-table"
  :headers="headers"
  :rows="rows"
  tableHeight="auto"
/>

<style>
.project-table.px-table {
  border: 2px solid #312e81;
  border-radius: 14px;
  box-shadow: 0 14px 30px rgba(49, 46, 129, 0.22);
}

.project-table thead tr th {
  background-color: #312e81;
}

.project-table .px-table--header {
  color: #ffffff;
}

.project-table tbody tr:nth-child(even) {
  background-color: #eef2ff;
}

.project-table tbody tr:hover {
  background-color: #fce7f3;
}
</style>`

const propHeaders = [
  { field: 'name', label: '이름', code: true },
  { field: 'type', label: '타입' },
  { field: 'defaultValue', label: '기본값' },
  { field: 'description', label: '설명', html: true },
]

const propRows = [
  {
    name: 'id',
    type: 'String',
    defaultValue: '-',
    description: '체크박스 ID를 구분할 테이블 식별자',
  },
  {
    name: 'headers',
    type: 'Array',
    defaultValue: '-',
    description: '열 표시 방법을 정의하는 필수 배열',
  },
  {
    name: 'rows',
    type: 'Array',
    defaultValue: '-',
    description: '표시할 행 데이터 필수 배열',
  },
  {
    name: 'narrow',
    type: 'Boolean',
    defaultValue: 'false',
    description: '헤더와 셀의 세로 여백을 좁게 표시',
  },
  {
    name: 'checkboxes',
    type: 'Array | null',
    defaultValue: 'null',
    description: '행별 선택 상태. 배열을 전달하면 체크박스 열 표시',
  },
  {
    name: 'singleCheckbox',
    type: 'Boolean',
    defaultValue: 'false',
    description: '체크박스를 하나만 선택할 수 있도록 제한',
  },
  {
    name: 'emptyText',
    type: 'String',
    defaultValue: '표시할 정보가 없습니다.',
    description: '행이 없을 때 표시할 문구',
  },
  {
    name: 'fnClass4Row',
    type: 'Function',
    defaultValue: '-',
    description: '<code>(row, index)</code>로 각 tr에 적용할 클래스 반환',
  },
  {
    name: 'isSearching',
    type: 'Boolean',
    defaultValue: 'false',
    description: '조회 중 오버레이 표시',
  },
  {
    name: 'tableHeight',
    type: 'Number | String',
    defaultValue: '-',
    description: '테이블 영역 높이. 콘텐츠 높이를 사용하려면 <code>auto</code>',
  },
  {
    name: 'useMobile',
    type: 'Boolean',
    defaultValue: 'false',
    description: '모바일에서 표 대신 <code>mobile</code> 슬롯 사용',
  },
  {
    name: 'useGrid',
    type: 'Boolean',
    defaultValue: 'false',
    description: '표 대신 <code>grid</code> 슬롯을 그리드로 표시',
  },
  {
    name: 'spanHeaders',
    type: 'Array',
    defaultValue: '-',
    description: '선언되어 있으나 현재 렌더링에서는 참조하지 않는 레거시 Prop',
  },
]

const headerOptionHeaders = [
  { field: 'name', label: '필드', code: true },
  { field: 'description', label: '설명', html: true },
]

const headerOptionRows = [
  { name: 'field', description: '행에서 출력할 속성명' },
  { name: 'label', description: '헤더 문구. HTML 문자열도 사용 가능' },
  { name: 'using', description: '<code>false</code>이면 해당 열을 숨김' },
  { name: 'width', description: '셀의 width 속성' },
  {
    name: 'align / rowAlign',
    description: '<code>left</code>, <code>center</code>, <code>right</code> 정렬. rowAlign은 본문에만 적용',
  },
  {
    name: 'class / bodyClass',
    description: 'th·td 또는 본문 span에 추가할 클래스',
  },
  {
    name: 'sort',
    description: "<code>['asc', 'desc']</code> 또는 사용자 라벨 배열. 클릭 시 onClickHeader 발생",
  },
  { name: 'filter', description: '필드 값을 화면용 값으로 변환하는 함수' },
  { name: 'fieldFn', description: '행 전체를 받아 셀 값을 만드는 함수' },
  {
    name: 'slotId / headerSlotId',
    description: '본문 또는 헤더에 사용할 슬롯 이름',
  },
  { name: 'tooltip', description: '헤더 도움말 아이콘에서 표시할 HTML 문자열' },
  {
    name: 'component / render',
    description: '동적 컴포넌트 설정 또는 렌더 컴포넌트 함수',
  },
  { name: 'PX_SPAN', description: '2단 헤더의 colspan·rowspan·skip 설정' },
]

const rowOptionRows = [
  {
    name: '$display',
    description: '원본 값 대신 화면에 표시할 필드별 값 객체',
  },
  { name: 'PX_ROWSPAN.span', description: '필드 또는 slotId별 rowspan 값' },
  {
    name: 'PX_ROWSPAN.skip',
    description: 'rowspan으로 합쳐져 출력하지 않을 필드 표시',
  },
]

const eventHeaders = [
  { field: 'name', label: '이름', code: true },
  { field: 'payload', label: '전달값', code: true },
  { field: 'description', label: '설명' },
]

const eventRows = [
  {
    name: 'onClickHeader',
    payload: '{ orderField, orderType }',
    description: '정렬 가능한 헤더를 클릭할 때 발생',
  },
  {
    name: 'onClickRow',
    payload: 'row, MouseEvent',
    description: '본문 행을 클릭할 때 발생',
  },
  {
    name: 'update:checkboxes',
    payload: 'Boolean[]',
    description: '전체 또는 행 체크박스 상태가 바뀔 때 발생',
  },
]

const slotHeaders = [
  { field: 'name', label: '이름', code: true },
  { field: 'scope', label: '슬롯 Props', code: true },
  { field: 'description', label: '설명' },
]

const slotRows = [
  {
    name: 'header.headerSlotId',
    scope: '{ header, index }',
    description: '지정한 열의 사용자 헤더',
  },
  {
    name: 'header.slotId',
    scope: '{ row, index }',
    description: '지정한 열의 사용자 셀',
  },
  {
    name: 'mobile',
    scope: '{ row, index }',
    description: 'useMobile이 켜진 모바일 화면의 행',
  },
  {
    name: 'grid',
    scope: '{ row, index, handleCheckbox }',
    description: 'useGrid가 켜졌을 때의 그리드 항목',
  },
]

const classHeaders = [
  { field: 'category', label: '구분' },
  { field: 'className', label: '클래스', html: true },
  { field: 'description', label: '용도' },
]

const classRows = [
  {
    category: '최상위',
    className: '<code>px-table</code>',
    description: '스크롤과 높이를 포함한 전체 테이블 영역',
  },
  {
    category: '헤더',
    className: '<code>px-table--header</code>, <code>px-table--header_label</code>',
    description: '헤더 클릭 영역과 라벨',
  },
  {
    category: '정렬',
    className: '<code>hasSort</code>, <code>px-table--sort_neutral</code>, <code>px-table--sort_asc</code>, <code>px-table--sort_desc</code>',
    description: '정렬 가능 상태와 방향 아이콘',
  },
  {
    category: '정렬 방식',
    className: '<code>center</code>, <code>right</code>',
    description: '헤더와 본문 셀 정렬 상태',
  },
  {
    category: '좁은 간격',
    className: '<code>isNarrow</code>',
    description: 'narrow가 적용된 th와 td',
  },
  {
    category: '체크박스',
    className: '<code>hasCheckboxes</code>',
    description: '선택 체크박스 열',
  },
  {
    category: '상태',
    className: '<code>px-table--empty</code>, <code>px-table--searching</code>',
    description: '빈 결과 및 조회 중 표시',
  },
  {
    category: '그리드',
    className: '<code>px-table--grid</code>',
    description: 'useGrid 콘텐츠 영역',
  },
  {
    category: '도움말',
    className: '<code>px-table--tooltip</code>, <code>tooltipIcon</code>, <code>tooltipDesc</code>',
    description: '헤더 도움말 버튼과 팝업',
  },
]
</script>

<template>
  <article class="docs-page">
    <p class="docs-eyebrow">TABLE</p>
    <h1>PxTable</h1>
    <p class="docs-lead">헤더 설정과 행 배열을 기반으로 정렬, 선택, 슬롯 셀과 반응형 레이아웃을 구성하는 테이블입니다.</p>

    <section class="docs-section">
      <h2>기본 사용과 정렬</h2>
      <p class="m-[0px] max-w-[760px] text-[14px] leading-[1.75] text-[#69707e]">
        <code>headers</code>의 <code>field</code>가 각 행의 속성과 연결됩니다. <code>sort</code>는 정렬 UI와 이벤트만 제공하므로, 실제 행 정렬이나 서버 재조회는
        <code>onClickHeader</code>에서 처리합니다.
      </p>
      <div class="example-preview mt-[20px]">
        <div class="w-full">
          <PxTable :headers="headers" :rows="sortedRows" tableHeight="auto" @onClickHeader="handleSort" @onClickRow="clickedRow = $event">
            <template #status="{ row }">
              <PxTag :color="row.status === '활성' ? 'pri_border' : 'gray_border'">{{ row.status }}</PxTag>
            </template>
          </PxTable>
          <p class="mb-[0px] mt-[14px] text-[13px] text-[#69707e]">
            정렬: <code>{{ sortState.orderField || '-' }}</code> / <code>{{ sortState.orderType || '-' }}</code> · 선택한 행:
            <code>{{ clickedRow?.name || '-' }}</code>
          </p>
        </div>
      </div>
      <CodeBlock :code="basicCode" />
    </section>

    <section class="docs-section">
      <h2>행 선택</h2>
      <p class="m-[0px] max-w-[760px] text-[14px] leading-[1.75] text-[#69707e]">
        <code>checkboxes</code>에 행 개수와 같은 Boolean 배열을 전달하면 선택 열이 생깁니다. 여러 테이블이 한 페이지에 있다면 체크박스 ID가 겹치지 않도록
        <code>id</code>도 지정합니다.
      </p>
      <div class="example-preview mt-[20px]">
        <div class="w-full">
          <PxTable id="docs-role-table" :headers="selectableHeaders" :rows="selectableRows" v-model:checkboxes="checkedRows" tableHeight="auto" />
          <p class="mb-[0px] mt-[14px] text-[13px] text-[#69707e]">
            선택 상태: <code>{{ checkedRows }}</code>
          </p>
        </div>
      </div>
      <CodeBlock :code="checkboxCode" />
    </section>

    <section class="docs-section">
      <h2>조회 중과 빈 결과</h2>
      <div class="example-preview">
        <div class="w-full">
          <div class="mb-[14px] flex gap-[8px]">
            <PxButton size="xs" @click="isSearching = !isSearching">조회 상태 전환</PxButton>
          </div>
          <PxTable :headers="selectableHeaders" :rows="[]" :isSearching="isSearching" emptyText="검색 결과가 없습니다." tableHeight="auto" />
        </div>
      </div>
      <CodeBlock :code="stateCode" />
    </section>

    <section class="docs-section">
      <h2>Grid와 모바일 레이아웃</h2>
      <p class="m-[0px] max-w-[760px] text-[14px] leading-[1.75] text-[#69707e]">
        <code>useGrid</code>는 항상 grid 슬롯을 사용하고, <code>useMobile</code>은 모바일 화면에서만 mobile 슬롯으로 전환합니다.
      </p>
      <div class="example-preview mt-[20px]">
        <PxTable :headers="gridHeaders" :rows="rows" useGrid tableHeight="auto">
          <template #grid="{ row }">
            <div class="rounded-[8px] border-[1px] border-[#e2e6ed] bg-white px-[16px] py-[14px]">
              <strong class="block text-[14px] text-[#242832]">{{ row.name }}</strong>
              <span class="mt-[4px] block text-[13px] text-[#737986]">{{ row.team }} · {{ row.status }}</span>
            </div>
          </template>
        </PxTable>
      </div>
      <CodeBlock :code="layoutCode" />
    </section>

    <section class="docs-section">
      <h2>Headers와 Rows 설정</h2>
      <h3 class="mb-[12px] mt-[0px] text-[17px] font-bold text-[#242832]">Header 설정</h3>
      <DocsTable :headers="headerOptionHeaders" :rows="headerOptionRows" />
      <h3 class="mb-[12px] mt-[28px] text-[17px] font-bold text-[#242832]">Row 특수 필드</h3>
      <DocsTable :headers="headerOptionHeaders" :rows="rowOptionRows" />
    </section>

    <section class="docs-section">
      <h2>Slots</h2>
      <DocsTable :headers="slotHeaders" :rows="slotRows" />
    </section>

    <section class="docs-section">
      <h2>주요 Props</h2>
      <DocsTable :headers="propHeaders" :rows="propRows" />
    </section>

    <section class="docs-section">
      <h2>Events</h2>
      <DocsTable :headers="eventHeaders" :rows="eventRows" />
    </section>

    <section class="docs-section">
      <h2>Class로 스타일 재정의</h2>
      <DocsTable :headers="classHeaders" :rows="classRows" />
      <h3 class="mb-[12px] mt-[28px] text-[17px] font-bold text-[#242832]">사용자 클래스 추가</h3>
      <div class="example-preview">
        <PxTable class="project-table" :headers="selectableHeaders" :rows="selectableRows" tableHeight="auto" />
      </div>
      <CodeBlock :code="customClassCode" />
    </section>
  </article>
</template>

<style>
.project-table.px-table {
  border: 2px solid #312e81;
  border-radius: 14px;
  box-shadow: 0 14px 30px rgba(49, 46, 129, 0.22);
}

.project-table thead tr th {
  background-color: #312e81;
}

.project-table .px-table--header {
  color: #ffffff;
}

.project-table tbody tr:nth-child(even) {
  background-color: #eef2ff;
}

.project-table tbody tr:hover {
  background-color: #fce7f3;
}
</style>
