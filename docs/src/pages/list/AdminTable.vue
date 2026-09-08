<script setup>
import { computed, reactive, ref, watch } from "vue";
import { useRouter } from "vue-router";
import {
  useSearchOrder,
  useSearchPagination,
  useTableConfig,
} from "@postfix/ui";
import CodeBlock from "../../components/CodeBlock.vue";
import DocsTable from "../../components/DocsTable.vue";

const router = useRouter();
const keyword = ref("");
const slotDemoKeyword = ref("");
const eventMessage = ref("새로고침, 정렬 또는 행을 선택해보세요.");

const originHeaders = [
  {
    field: "name",
    label: "이름",
    width: 150,
    sort: ["asc", "desc"],
    essential: true,
  },
  { field: "email", label: "이메일", width: 230 },
  { field: "team", label: "소속 팀", width: 140, sort: ["asc", "desc"] },
  {
    field: "status",
    label: "상태",
    slotId: "status",
    align: "center",
    width: 100,
  },
  {
    field: "action",
    label: "관리",
    slotId: "action",
    align: "center",
    width: 90,
    sort: false,
  },
];

const records = Array.from({ length: 68 }, (_, index) => ({
  id: index + 1,
  name:
    ["김민준", "이서연", "박지우", "최도윤", "정하은"][index % 5] +
    ` ${index + 1}`,
  email: `member${index + 1}@example.com`,
  team: ["플랫폼", "프로덕트", "운영"][index % 3],
  status: index % 4 === 0 ? "대기" : "활성",
}));

const tableConfig = useTableConfig({
  storageId: "postfix-ui-docs-admin-table",
  headers: originHeaders,
});
const searchOrder = useSearchOrder(router, {
  headers: tableConfig.state.headers,
});
const searchPagination = useSearchPagination(router, tableConfig.state);

searchOrder.readQuery();
searchPagination.readQuery();

const filteredRecords = computed(() => {
  const normalizedKeyword = keyword.value.trim().toLocaleLowerCase();
  if (!normalizedKeyword) return records;

  return records.filter((row) =>
    [row.name, row.email, row.team].some((value) =>
      value.toLocaleLowerCase().includes(normalizedKeyword),
    ),
  );
});

const orderedRecords = computed(() => {
  const { orderField, orderType } = searchOrder.state;
  if (!orderField || !orderType) return filteredRecords.value;

  return [...filteredRecords.value].sort((a, b) => {
    const result = String(a[orderField]).localeCompare(
      String(b[orderField]),
      "ko",
      { numeric: true },
    );
    return orderType === "asc" ? result : -result;
  });
});

const visibleRows = computed(() => {
  const start = (searchPagination.state.page - 1) * tableConfig.state.limit;
  return orderedRecords.value.slice(start, start + tableConfig.state.limit);
});

const checkedRows = ref([]);
watch(
  visibleRows,
  (value) => {
    checkedRows.value = value.map(() => false);
  },
  { immediate: true },
);

watch(keyword, () => {
  if (searchPagination.state.page !== 1) searchPagination.setPage(1);
});

const handleReload = () => {
  searchOrder.readQuery();
  searchPagination.readQuery();
  eventMessage.value = "목록 재조회를 요청했습니다.";
};

const handleSort = ({ orderField, orderType }) => {
  eventMessage.value = orderType
    ? `${orderField} ${orderType} 정렬`
    : "기본 정렬";
};

const handleRow = (row) => {
  eventMessage.value = `${row.name} 행을 선택했습니다.`;
};

const slotDemoRows = [
  { id: 1, name: "김민준", team: "플랫폼", status: "활성" },
  { id: 2, name: "이서연", team: "프로덕트", status: "대기" },
  { id: 3, name: "박지우", team: "운영", status: "활성" },
  { id: 4, name: "최도윤", team: "플랫폼", status: "대기" },
];

const slotDemoTableConfig = {
  state: reactive({
    limit: 2,
    headers: [
      { field: "name", label: "이름", width: 120 },
      { field: "team", label: "소속 팀", width: 120 },
      {
        field: "status",
        label: "상태",
        slotId: "SLOT-STATUS",
        align: "center",
        width: 210,
      },
      {
        field: "action",
        label: "관리",
        slotId: "SLOT-ACTION",
        align: "center",
        width: 190,
      },
    ],
  }),
  saveLimit() {},
  saveHeaders() {},
};

const slotDemoSearchOrder = {
  state: reactive({ orderField: "", orderType: "" }),
  options4Sort: [],
  setSearchOrder() {},
};

const slotDemoPagination = {
  state: reactive({ page: 1 }),
  setPage(page) {
    this.state.page = Math.min(Math.max(page, 1), 2);
  },
};

const slotDemoVisibleRows = computed(() => {
  const start =
    (slotDemoPagination.state.page - 1) * slotDemoTableConfig.state.limit;
  return slotDemoRows.slice(start, start + slotDemoTableConfig.state.limit);
});

const setupCode = `import { useRouter } from 'vue-router'
import {
  useSearchOrder,
  useSearchPagination,
  useTableConfig,
} from '@postfix/ui'

const router = useRouter()
const headers = [
  { field: 'name', label: '이름', sort: ['asc', 'desc'], essential: true },
  { field: 'email', label: '이메일' },
  { field: 'status', label: '상태', slotId: 'status' },
]

const tableConfig = useTableConfig({
  storageId: 'member-table',
  headers,
})
const searchOrder = useSearchOrder(router, {
  headers: tableConfig.state.headers,
})
const searchPagination = useSearchPagination(router, tableConfig.state)

searchOrder.readQuery()
searchPagination.readQuery()`;

const basicCode = `<PxAdminTable
  id="member-table"
  title="회원 목록"
  :totalCount="totalCount"
  :rows="rows"
  :router="router"
  :tableConfig="tableConfig"
  :searchOrder="searchOrder"
  :searchPagination="searchPagination"
  v-model:checkboxes="checkedRows"
  tableHeight="360"
  @onReload="fetchRows"
  @onClickSort="fetchRows"
  @onChangePage="fetchRows"
  @onChangeLimit="fetchRows"
>
  <template #status="{ row }">
    <PxTag :color="row.status === '활성' ? 'pri_border' : 'gray_border'">
      {{ row.status }}
    </PxTag>
  </template>
</PxAdminTable>`;

const shellSlotCode = `const headers = [
  { field: 'name', label: '이름' },
  { field: 'team', label: '소속 팀' },
  { field: 'status', label: '상태', slotId: 'SLOT-STATUS' },
  { field: 'action', label: '관리', slotId: 'SLOT-ACTION' },
]

<PxAdminTable
  id="slot-location-table"
  title="기본 제목"
  :totalCount="rows.length"
  :rows="rows"
  :router="router"
  :tableConfig="tableConfig"
  :searchOrder="searchOrder"
  :searchPagination="searchPagination"
  paginationCount
  :searchOrderButton="false"
  :searchFilterButton="false"
>
  <template #SHELL-TITLE>
    <PxTag color="pri_border">SHELL-TITLE</PxTag>
    <strong>사용자 정의 제목</strong>
  </template>

  <template #SHELL-SUBTITLE>
    <PxTag color="pri_border">SHELL-SUBTITLE</PxTag>
    <span>헤더 아래, 본문 위</span>
  </template>

  <template #SHELL-SEARCH>
    <PxTag color="pri_border">SHELL-SEARCH</PxTag>
    <PxInput id="member-search" v-model="keyword" label="회원 검색" />
  </template>

  <template #SHELL-TABLE-TOP>
    <PxTag color="pri_border">SHELL-TABLE-TOP</PxTag>
    <span>마지막 동기화: 방금 전</span>
  </template>

  <template #SHELL-TABLE-LEFT="{ rows }">
    <PxTag color="pri_border">SHELL-TABLE-LEFT</PxTag>
    <PxButton size="xs">현재 {{ rows.length }}건 처리</PxButton>
  </template>

  <template #PAGINATION-COUNT="{ total }">
    <PxTag color="pri_border">PAGINATION-COUNT</PxTag>
    <span>{{ total }}건</span>
  </template>

  <template #SHELL-PAGINATION="{ handleChangePage }">
    <PxTag color="pri_border">SHELL-PAGINATION</PxTag>
    <PxButton size="xs" @click="handleChangePage(1)">1페이지</PxButton>
  </template>

  <template #SLOT-STATUS="{ row, index }">
    <PxTag color="pri_border">CELL: SLOT-STATUS</PxTag>
    <span>{{ index + 1 }}행 · {{ row.status }}</span>
  </template>

  <template #SLOT-ACTION="{ row }">
    <PxTag color="pri_border">CELL: SLOT-ACTION</PxTag>
    <PxButton size="xs" color="gray_border">{{ row.name }} 보기</PxButton>
  </template>
</PxAdminTable>`;

const customTableCode = `<!-- SHELL-TABLE은 내부 PxTable 전체를 교체하므로 별도로 사용합니다. -->
<PxAdminTable
  :defaultTable="false"
  v-bind="tableProps"
>
  <template #SHELL-TABLE="{ handleClickSort }">
    <section class="project-card-list">
      PxTable이 아닌 프로젝트 전용 목록
      <PxButton
        size="xs"
        @click="handleClickSort({ orderField: '', orderType: '' })"
      >
        기본 정렬
      </PxButton>
    </section>
  </template>
</PxAdminTable>`;

const customClassCode = `<PxAdminTable
  class="project-admin-table"
  v-bind="tableProps"
/>

<style>
.project-admin-table .px-adminTable--header_container {
  padding: 22px 24px;
  border-radius: 16px 16px 0 0;
  background: linear-gradient(135deg, #4f46e5, #db2777);
  box-shadow: 0 14px 30px rgba(79, 70, 229, 0.25);
}

.project-admin-table .px-adminTable--title .title {
  color: #ffffff;
  font-size: 24px;
  font-weight: 800;
}

.project-admin-table .px-adminTable--title .count {
  color: #fce7f3;
  font-weight: 800;
}

.project-admin-table .px-adminTable--body {
  padding: 20px;
  border: 2px solid #7c3aed;
  border-top: 0;
  border-radius: 0 0 16px 16px;
  background-color: #faf5ff;
}
</style>`;

const requiredHeaders = [
  { field: "name", label: "객체", code: true },
  { field: "role", label: "역할" },
  { field: "requiredShape", label: "필수 형태", code: true },
];

const requiredRows = [
  {
    name: "tableConfig",
    role: "헤더 표시와 페이지 크기 저장",
    requiredShape: "{ state: { headers, limit }, saveHeaders, saveLimit }",
  },
  {
    name: "searchOrder",
    role: "정렬 상태와 URL 쿼리 변경",
    requiredShape: "{ state, options4Sort, setSearchOrder }",
  },
  {
    name: "searchPagination",
    role: "현재 페이지와 URL 쿼리 변경",
    requiredShape: "{ state: { page }, setPage }",
  },
  {
    name: "router",
    role: "페이지·정렬 쿼리 변경 감지",
    requiredShape: "Vue Router instance",
  },
];

const propHeaders = [
  { field: "name", label: "이름", code: true },
  { field: "type", label: "타입" },
  { field: "defaultValue", label: "기본값" },
  { field: "description", label: "설명", html: true },
];

const propRows = [
  {
    name: "id",
    type: "String",
    defaultValue: "-",
    description: "내부 PxTable의 체크박스 ID 구분값",
  },
  {
    name: "title",
    type: "String",
    defaultValue: "-",
    description: "목록 제목",
  },
  {
    name: "totalCount",
    type: "Number",
    defaultValue: "-",
    description: "제목과 페이지네이션에 사용할 전체 건수",
  },
  {
    name: "rows",
    type: "Array",
    defaultValue: "-",
    description: "현재 페이지에 표시할 필수 행 배열",
  },
  {
    name: "tableConfig",
    type: "Object",
    defaultValue: "-",
    description: "<code>useTableConfig</code>에서 만든 필수 설정 객체",
  },
  {
    name: "searchOrder",
    type: "Object",
    defaultValue: "-",
    description: "<code>useSearchOrder</code>에서 만든 필수 정렬 객체",
  },
  {
    name: "searchPagination",
    type: "Object",
    defaultValue: "-",
    description: "<code>useSearchPagination</code>에서 만든 필수 페이지 객체",
  },
  {
    name: "router",
    type: "Object",
    defaultValue: "-",
    description: "<code>useRouter()</code>로 가져온 필수 Vue Router 객체",
  },
  {
    name: "checkboxes",
    type: "Array | null",
    defaultValue: "null",
    description: "행별 체크 상태. 배열을 전달하면 선택 열 표시",
  },
  {
    name: "singleCheckbox",
    type: "Boolean",
    defaultValue: "false",
    description: "체크박스를 하나만 선택하도록 제한",
  },
  {
    name: "defaultLabel4Sort",
    type: "String",
    defaultValue: "기본 정렬",
    description: "정렬 Select의 초기 항목 문구",
  },
  {
    name: "defaultTable",
    type: "Boolean",
    defaultValue: "true",
    description: "내부 PxTable 사용 여부. false이면 SHELL-TABLE 슬롯 사용",
  },
  {
    name: "shellTable",
    type: "Boolean",
    defaultValue: "true",
    description: "테이블 위 도구 모음 표시 여부",
  },
  {
    name: "searchOrderButton",
    type: "Boolean",
    defaultValue: "true",
    description: "정렬 Select 표시 여부",
  },
  {
    name: "searchFilterButton",
    type: "Boolean",
    defaultValue: "true",
    description: "페이지 크기·헤더 설정 버튼 표시 여부",
  },
  {
    name: "isSearching",
    type: "Boolean",
    defaultValue: "false",
    description: "새로고침 아이콘과 내부 PxTable의 조회 중 상태",
  },
  {
    name: "useTitle",
    type: "Boolean",
    defaultValue: "true",
    description: "제목과 새로고침 헤더 표시 여부",
  },
  {
    name: "paginationCount",
    type: "Boolean",
    defaultValue: "false",
    description: "상단 페이지네이션 옆 전체 건수 표시",
  },
  {
    name: "tableHeight",
    type: "Number | String",
    defaultValue: "-",
    description: "내부 PxTable 높이",
  },
  {
    name: "upperPagination",
    type: "Boolean",
    defaultValue: "true",
    description: "상단 페이지네이션 표시 여부",
  },
  {
    name: "lowerPagination",
    type: "Boolean",
    defaultValue: "false",
    description: "하단 페이지네이션 표시 여부",
  },
  {
    name: "use10000",
    type: "Boolean",
    defaultValue: "false",
    description: "페이지 크기 설정에서 10,000개 선택 허용",
  },
  {
    name: "fnClass4Row",
    type: "Function",
    defaultValue: "-",
    description: "내부 PxTable 행에 적용할 클래스 반환 함수",
  },
  {
    name: "emptyText",
    type: "String",
    defaultValue: "표시할 정보가 없습니다.",
    description: "행이 없을 때 표시할 문구",
  },
  {
    name: "useMobile",
    type: "Boolean",
    defaultValue: "false",
    description: "내부 PxTable의 mobile 슬롯 활성화",
  },
  {
    name: "useGrid",
    type: "Boolean",
    defaultValue: "false",
    description: "내부 PxTable의 grid 슬롯 활성화",
  },
  {
    name: "md",
    type: "String",
    defaultValue: "-",
    description: "제목 옆 도움말에 표시할 Markdown 문구",
  },
  {
    name: "useLocale",
    type: "Boolean",
    defaultValue: "false",
    description: "빈 결과와 설정 다이얼로그의 일부 문구를 영문으로 표시",
  },
  {
    name: "inactiveCheckbox / checkboxDisables",
    type: "Boolean / Array",
    defaultValue: "false / -",
    description: "현재 내부 PxTable에서 사용하지 않는 레거시 Props",
  },
];

const eventHeaders = [
  { field: "name", label: "이름", code: true },
  { field: "payload", label: "전달값", code: true },
  { field: "description", label: "설명" },
];

const eventRows = [
  {
    name: "onReload",
    payload: "-",
    description: "새로고침 클릭 또는 같은 라우트의 쿼리 변경 시 발생",
  },
  {
    name: "onClickSort",
    payload: "{ orderField, orderType }",
    description: "상단 정렬 또는 테이블 헤더 정렬 변경 시 발생",
  },
  { name: "onChangePage", payload: "page", description: "페이지 변경 시 발생" },
  {
    name: "onChangeLimit",
    payload: "-",
    description: "설정에서 페이지 크기를 저장할 때 발생",
  },
  {
    name: "onClickRow",
    payload: "row, MouseEvent",
    description: "내부 PxTable의 행을 클릭할 때 발생",
  },
  {
    name: "update:checkboxes",
    payload: "Boolean[]",
    description: "행 선택 상태가 바뀔 때 발생",
  },
  {
    name: "onSearch",
    payload: "-",
    description: "선언되어 있으나 현재 컴포넌트 내부에서 직접 발생시키지 않음",
  },
  {
    name: "onClearSearchFilter",
    payload: "-",
    description: "선언되어 있으나 현재 컴포넌트 내부에서 직접 발생시키지 않음",
  },
];

const slotHeaders = [
  { field: "name", label: "이름", code: true },
  { field: "scope", label: "슬롯 Props", code: true },
  { field: "description", label: "설명" },
];

const slotRows = [
  {
    name: "SHELL-TITLE",
    scope: "-",
    description: "기본 제목과 전체 건수를 교체",
  },
  {
    name: "SHELL-SUBTITLE",
    scope: "-",
    description: "헤더 아래, 본문 위의 부제목 영역",
  },
  {
    name: "SHELL-SEARCH",
    scope: "-",
    description: "도구 모음 위의 검색 폼 영역",
  },
  {
    name: "SHELL-TABLE-TOP",
    scope: "-",
    description: "헤더 오른쪽 상단의 추가 콘텐츠",
  },
  {
    name: "SHELL-TABLE-LEFT",
    scope: "{ rows }",
    description: "테이블 도구 모음 왼쪽 버튼 영역",
  },
  {
    name: "PAGINATION-COUNT",
    scope: "{ total }",
    description: "paginationCount의 전체 건수 문구 교체",
  },
  {
    name: "SHELL-PAGINATION",
    scope: "{ handleChangePage }",
    description: "기본 PxPagination 교체",
  },
  {
    name: "SHELL-TABLE",
    scope: "{ handleClickSort }",
    description: "defaultTable이 false일 때 사용자 목록 렌더링",
  },
  {
    name: "PxTable 슬롯",
    scope: "{ row, index, handleCheckbox }",
    description: "SHELL-로 시작하지 않는 슬롯은 내부 PxTable로 전달",
  },
];

const classHeaders = [
  { field: "category", label: "구분" },
  { field: "className", label: "클래스", html: true },
  { field: "description", label: "용도" },
];

const classRows = [
  {
    category: "최상위",
    className: "<code>px-adminTable</code>",
    description: "관리자 테이블 전체 영역",
  },
  {
    category: "헤더",
    className:
      "<code>px-adminTable--header_container</code>, <code>px-adminTable--header</code>, <code>px-adminTable--header_wrapper</code>",
    description: "제목 및 헤더 도구 영역",
  },
  {
    category: "제목",
    className:
      "<code>px-adminTable--title</code>, <code>title</code>, <code>count</code>",
    description: "목록 제목과 전체 건수",
  },
  {
    category: "도움말",
    className: "<code>px-adminTable--tooltipIcon</code>",
    description: "md 도움말 버튼",
  },
  {
    category: "새로고침",
    className:
      "<code>px-adminTable--refresh</code>, <code>mobile</code>, <code>desktop</code>, <code>SEARCHING</code>",
    description: "새로고침 버튼과 조회 중 회전 상태",
  },
  {
    category: "본문",
    className: "<code>px-adminTable--body</code>",
    description: "검색, 도구 모음, 테이블 영역",
  },
  {
    category: "도구 모음",
    className:
      "<code>px-adminTable--search</code>, <code>shell-table-left</code>, <code>shell-table-right</code>, <code>func_container</code>",
    description: "버튼, 정렬, 페이지네이션 영역",
  },
  {
    category: "설정",
    className:
      "<code>searchFilter</code>, <code>dialog_searchFilter</code>, <code>dialog_body</code>, <code>leftSection</code>, <code>rightSection</code>",
    description: "테이블 설정 버튼과 다이얼로그",
  },
  {
    category: "페이지네이션",
    className: "<code>lower-pagination</code>",
    description: "하단 페이지네이션 영역",
  },
];
</script>

<template>
  <article class="docs-page">
    <p class="docs-eyebrow">TABLE</p>
    <h1>PxAdminTable</h1>
    <p class="docs-lead">
      PxTable에 제목, 전체 건수, 정렬, 페이지네이션, 새로고침과 사용자별 컬럼
      설정을 조합한 관리자 목록 컴포넌트입니다.
    </p>

    <section class="docs-section">
      <h2>필수 객체 구성</h2>
      <p
        class="m-[0px] max-w-[760px] text-[14px] leading-[1.75] text-[#69707e]"
      >
        단순한 <code>headers</code> 배열 대신 세 composable과 현재 Vue Router를
        연결합니다. 정렬과 페이지는 URL 쿼리에 기록되고, 페이지 크기와 노출
        컬럼은 <code>storageId</code>를 기준으로 localStorage에 저장됩니다.
      </p>
      <CodeBlock :code="setupCode" />
      <DocsTable :headers="requiredHeaders" :rows="requiredRows" />
    </section>

    <section class="docs-section">
      <h2>기본 사용</h2>
      <p
        class="m-[0px] max-w-[760px] text-[14px] leading-[1.75] text-[#69707e]"
      >
        페이지·정렬 이벤트에서는 현재 쿼리를 읽어 API를 다시 호출합니다. 아래
        예제는 같은 흐름을 로컬 데이터로 재현합니다.
      </p>
      <div class="example-preview mt-[20px]">
        <div class="w-full min-w-[0px]">
          <PxAdminTable
            id="docs-member-table"
            title="회원 목록"
            :totalCount="filteredRecords.length"
            :rows="visibleRows"
            :router="router"
            :tableConfig="tableConfig"
            :searchOrder="searchOrder"
            :searchPagination="searchPagination"
            v-model:checkboxes="checkedRows"
            :tableHeight="360"
            paginationCount
            lowerPagination
            md="회원 목록의 **노출 컬럼과 페이지 크기**를 우측 설정 버튼에서 변경할 수 있습니다."
            @onReload="handleReload"
            @onClickSort="handleSort"
            @onChangeLimit="searchPagination.setPage(1)"
            @onClickRow="handleRow"
          >
            <template #SHELL-SEARCH>
              <div class="mb-[20px] max-w-[420px]">
                <PxInput
                  id="docs-admin-table-search"
                  v-model="keyword"
                  label="회원 검색"
                  placeholder="이름, 이메일 또는 팀"
                  clear
                  @onClear="keyword = ''"
                />
              </div>
            </template>

            <template #SHELL-TABLE-TOP>
              <span class="text-[12px] text-[#7a8190]"
                >마지막 동기화: 방금 전</span
              >
            </template>

            <template #SHELL-TABLE-LEFT>
              <PxButton
                size="xs"
                color="gray_border"
                @click="eventMessage = '선택 처리를 요청했습니다.'"
                >선택 처리</PxButton
              >
            </template>

            <template #status="{ row }">
              <PxTag
                :color="row.status === '활성' ? 'pri_border' : 'gray_border'"
                >{{ row.status }}</PxTag
              >
            </template>

            <template #action="{ row }">
              <PxButton
                size="xs"
                color="gray_border"
                @click.stop="eventMessage = `${row.name} 상세 보기`"
                >보기</PxButton
              >
            </template>
          </PxAdminTable>
          <p class="mb-[0px] mt-[14px] text-[13px] text-[#69707e]">
            {{ eventMessage }}
          </p>
        </div>
      </div>
      <CodeBlock :code="basicCode" />
    </section>

    <section class="docs-section">
      <h2>Shell과 Cell 슬롯 전체 예제</h2>
      <p
        class="m-[0px] max-w-[760px] text-[14px] leading-[1.75] text-[#69707e]"
      >
        <code>SHELL-*</code> 슬롯은 관리자 테이블의 외곽 구성을 바꾸고, 나머지
        이름의 슬롯은 내부 PxTable 셀로 전달됩니다. 아래 예제의 파란 라벨이 각
        슬롯이 실제로 삽입되는 위치입니다.
      </p>
      <div class="example-preview mt-[20px]">
        <div class="w-full min-w-[0px]">
          <PxAdminTable
            id="docs-slot-location-table"
            title="기본 제목"
            :totalCount="slotDemoRows.length"
            :rows="slotDemoVisibleRows"
            :router="router"
            :tableConfig="slotDemoTableConfig"
            :searchOrder="slotDemoSearchOrder"
            :searchPagination="slotDemoPagination"
            :searchOrderButton="false"
            :searchFilterButton="false"
            paginationCount
            tableHeight="auto"
          >
            <template #SHELL-TITLE>
              <div class="flex flex-wrap items-center gap-[8px]">
                <PxTag color="pri_border">SHELL-TITLE</PxTag>
                <strong class="text-[18px] text-[#242832]"
                  >사용자 정의 제목</strong
                >
              </div>
            </template>

            <template #SHELL-SUBTITLE>
              <div
                class="border-y-[1px] border-dashed border-[#b9d2f4] bg-[#f5f9ff] px-[14px] py-[10px]"
              >
                <PxTag color="pri_border">SHELL-SUBTITLE</PxTag>
                <span class="ml-[8px] text-[13px] text-[#53657e]"
                  >헤더 아래, 본문 위</span
                >
              </div>
            </template>

            <template #SHELL-SEARCH>
              <div
                class="mb-[18px] rounded-[8px] border-[1px] border-dashed border-[#b9d2f4] bg-[#f8fbff] px-[14px] py-[12px]"
              >
                <PxTag color="pri_border">SHELL-SEARCH</PxTag>
                <div class="mt-[12px] max-w-[380px]">
                  <PxInput
                    id="docs-slot-search"
                    v-model="slotDemoKeyword"
                    label="검색 조건 영역"
                    placeholder="검색어"
                  />
                </div>
              </div>
            </template>

            <template #SHELL-TABLE-TOP>
              <div class="flex items-center gap-[8px]">
                <PxTag color="pri_border">SHELL-TABLE-TOP</PxTag>
                <span class="text-[12px] text-[#7a8190]">제목 우측 영역</span>
              </div>
            </template>

            <template #SHELL-TABLE-LEFT="{ rows }">
              <div class="flex items-center gap-[8px]">
                <PxTag color="pri_border">SHELL-TABLE-LEFT</PxTag>
                <PxButton size="xs" color="gray_border"
                  >현재 {{ rows.length }}건 처리</PxButton
                >
              </div>
            </template>

            <template #PAGINATION-COUNT="{ total }">
              <div class="flex items-center gap-[6px]">
                <PxTag color="pri_border">PAGINATION-COUNT</PxTag>
                <span class="text-[12px] text-[#69707e]">{{ total }}건</span>
              </div>
            </template>

            <template #SHELL-PAGINATION="{ handleChangePage }">
              <div class="flex items-center gap-[6px]">
                <PxTag color="pri_border">SHELL-PAGINATION</PxTag>
                <PxButton
                  size="xs"
                  color="gray_border"
                  :disabled="slotDemoPagination.state.page === 1"
                  @click="handleChangePage(slotDemoPagination.state.page - 1)"
                >
                  이전
                </PxButton>
                <span class="text-[12px] text-[#4e5563]"
                  >{{ slotDemoPagination.state.page }} / 2</span
                >
                <PxButton
                  size="xs"
                  color="gray_border"
                  :disabled="slotDemoPagination.state.page === 2"
                  @click="handleChangePage(slotDemoPagination.state.page + 1)"
                >
                  다음
                </PxButton>
              </div>
            </template>

            <template #SLOT-STATUS="{ row, index }">
              <div class="flex flex-col items-center gap-[4px]">
                <PxTag color="pri_border">CELL: SLOT-STATUS</PxTag>
                <span class="text-[12px] text-[#69707e]"
                  >{{ index + 1 }}행 · {{ row.status }}</span
                >
              </div>
            </template>

            <template #SLOT-ACTION="{ row }">
              <div class="flex flex-col items-center gap-[4px]">
                <PxTag color="pri_border">CELL: SLOT-ACTION</PxTag>
                <PxButton size="xs" color="gray_border"
                  >{{ row.name }} 보기</PxButton
                >
              </div>
            </template>
          </PxAdminTable>
        </div>
      </div>
      <CodeBlock :code="shellSlotCode" />
      <DocsTable :headers="slotHeaders" :rows="slotRows" />
    </section>

    <section class="docs-section">
      <h2>내부 테이블 교체</h2>
      <p
        class="m-[0px] max-w-[760px] text-[14px] leading-[1.75] text-[#69707e]"
      >
        카드 목록처럼 PxTable로 표현하기 어려운 경우
        <code>defaultTable="false"</code>와 <code>SHELL-TABLE</code> 슬롯을
        사용합니다.
      </p>
      <div class="example-preview mt-[20px]">
        <div class="w-full min-w-[0px]">
          <PxAdminTable
            id="docs-shell-table"
            :totalCount="slotDemoRows.length"
            :rows="slotDemoRows"
            :router="router"
            :tableConfig="slotDemoTableConfig"
            :searchOrder="slotDemoSearchOrder"
            :searchPagination="slotDemoPagination"
            :defaultTable="false"
            :shellTable="false"
            :useTitle="false"
          >
            <template #SHELL-TABLE="{ handleClickSort }">
              <div
                class="rounded-[8px] border-[1px] border-dashed border-[#8eb6eb] bg-[#f5f9ff] px-[18px] py-[24px] text-center"
              >
                <PxTag color="pri_border">SHELL-TABLE</PxTag>
                <p
                  class="mb-[0px] mt-[10px] text-[13px] leading-[1.7] text-[#5f6e83]"
                >
                  내부 PxTable 전체가 이 위치의 사용자 목록으로 교체됩니다.<br />
                  슬롯으로 전달된 <code>handleClickSort</code>로 관리자 테이블의
                  정렬 흐름을 그대로 연결할 수 있습니다.
                </p>
                <PxButton
                  class="mt-[12px]"
                  size="xs"
                  color="gray_border"
                  @click="handleClickSort({ orderField: '', orderType: '' })"
                >
                  기본 정렬 호출
                </PxButton>
              </div>
            </template>
          </PxAdminTable>
        </div>
      </div>
      <CodeBlock :code="customTableCode" />
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
      <h3 class="mb-[12px] mt-[28px] text-[17px] font-bold text-[#242832]">
        사용자 클래스 추가
      </h3>
      <div class="example-preview">
        <div class="w-full min-w-[0px]">
          <PxAdminTable
            id="docs-project-admin-table"
            class="project-admin-table"
            title="프로젝트 회원"
            :totalCount="slotDemoRows.length"
            :rows="slotDemoRows"
            :router="router"
            :tableConfig="slotDemoTableConfig"
            :searchOrder="slotDemoSearchOrder"
            :searchPagination="slotDemoPagination"
            :defaultTable="false"
            :shellTable="false"
            :searchFilterButton="false"
          >
            <template #SHELL-TABLE>
              <div class="rounded-[12px] bg-[#ffffff] px-[18px] py-[22px] text-center text-[14px] font-bold text-[#5b21b6]">
                프로젝트 전용 목록 영역
              </div>
            </template>
          </PxAdminTable>
        </div>
      </div>
      <CodeBlock :code="customClassCode" />
    </section>

    <PxDialogTooltip />
  </article>
</template>

<style>
.project-admin-table .px-adminTable--header_container {
  padding: 22px 24px;
  border-radius: 16px 16px 0 0;
  background: linear-gradient(135deg, #4f46e5, #db2777);
  box-shadow: 0 14px 30px rgba(79, 70, 229, 0.25);
}

.project-admin-table .px-adminTable--title .title {
  color: #ffffff;
  font-size: 24px;
  font-weight: 800;
}

.project-admin-table .px-adminTable--title .count {
  color: #fce7f3;
  font-weight: 800;
}

.project-admin-table .px-adminTable--body {
  padding: 20px;
  border: 2px solid #7c3aed;
  border-top: 0;
  border-radius: 0 0 16px 16px;
  background-color: #faf5ff;
}
</style>
