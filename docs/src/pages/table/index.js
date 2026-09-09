import Table from '../list/Table.vue'
import AdminTable from '../list/AdminTable.vue'
import ColorTableCell from './ColorTableCell.vue'
import CustomMergeTable from './CustomMergeTable.vue'
import CustomBoard from './CustomBoard.vue'
import AdminFormWrapper from './AdminFormWrapper.vue'
import AdminFormWrapperRow from './AdminFormWrapperRow.vue'
import BoardListConfig from './BoardListConfig.vue'
import SearchOrder from './SearchOrder.vue'
import SearchPageLimit from './SearchPageLimit.vue'
import SearchSelectInputs from './SearchSelectInputs.vue'
import SearchDate from './SearchDate.vue'
import UserInfoTableCell from './UserInfoTableCell.vue'
import RouterLinkTableCell from './RouterLinkTableCell.vue'

export default [
  {
    name: 'table',
    path: '/table',
    component: Table,
    meta: {
      title: 'PxTable',
      category: 'TABLE',
      description: '헤더와 행 설정으로 정렬, 선택, 슬롯 및 반응형 레이아웃을 구성하는 테이블',
      keywords: [
        'PxTable',
        'table',
        '테이블',
        '목록',
        'headers',
        'rows',
        'checkboxes',
        'singleCheckbox',
        'sort',
        'slotId',
        'headerSlotId',
        'fieldFn',
        'filter',
        'PX_SPAN',
        'PX_ROWSPAN',
        'useMobile',
        'useGrid',
        'isSearching',
        'emptyText',
        'tableHeight',
      ],
    },
  },
  {
    name: 'adminTable',
    path: '/table/admin',
    component: AdminTable,
    meta: {
      title: 'PxAdminTable',
      category: 'TABLE',
      description: '제목, 정렬, 페이지네이션, 새로고침과 컬럼 설정을 포함하는 관리자 목록 테이블',
      keywords: [
        'PxAdminTable',
        'admin table',
        '관리자 테이블',
        '목록',
        'table',
        'useTableConfig',
        'useSearchOrder',
        'useSearchPagination',
        'tableConfig',
        'searchOrder',
        'searchPagination',
        'SHELL-TITLE',
        'SHELL-SUBTITLE',
        'SHELL-SEARCH',
        'SHELL-TABLE-TOP',
        'SHELL-TABLE-LEFT',
        'SHELL-PAGINATION',
        'SHELL-TABLE',
        'pagination',
        'searchFilterButton',
        'defaultTable',
        'shellTable',
      ],
    },
  },
  {
    name: 'boardListConfig',
    path: '/table/board-list-config',
    component: BoardListConfig,
    meta: {
      title: 'BoardListConfig',
      category: 'TABLE',
      description: 'useTableConfig의 헤더 표시 여부를 토글로 설정하는 컬럼 설정 컴포넌트',
      keywords: ['BoardListConfig', 'board list config', '테이블 설정', '컬럼 설정', 'headers', 'using', 'essential', 'useTableConfig', 'onToggle', 'px-boardListConfig'],
    },
  },
  {
    name: 'searchOrder',
    path: '/table/search-order',
    component: SearchOrder,
    meta: {
      title: 'PxSearchOrder',
      category: 'TABLE',
      description: '테이블 정렬 조건을 선택하고 orderField·orderType 객체를 전달하는 컴포넌트',
      keywords: ['PxSearchOrder', 'search order', '정렬', 'orderState', 'orderOptions', 'orderField', 'orderType', 'onSetSearchOrder', 'defaultLabel', 'px-searchOrder'],
    },
  },
  {
    name: 'searchPageLimit',
    path: '/table/search-page-limit',
    component: SearchPageLimit,
    meta: {
      title: 'PxSearchPageLimit',
      category: 'TABLE',
      description: '테이블의 페이지당 표시 개수를 고정 선택지에서 바꾸는 라디오 컴포넌트',
      keywords: ['PxSearchPageLimit', 'page limit', '페이지 크기', '표시 개수', 'limit', '10개', '20개', '30개', '50개', '100개', 'onChangeLimit'],
    },
  },
  {
    name: 'searchSelectInputs',
    path: '/table/search-select-inputs',
    component: SearchSelectInputs,
    meta: {
      title: 'PxSearchSelectInputs',
      category: 'TABLE',
      description: '검색 종류별 입력과 적용된 query 조건을 함께 관리하는 통합 검색 컴포넌트',
      keywords: [
        'PxSearchSelectInputs',
        'search select inputs',
        '통합 검색',
        'filters',
        'filterTypes',
        'text',
        'radio',
        'select',
        'check',
        'date',
        'month',
        'datepicker',
        'monthpicker',
        'yearpicker',
        'LocalUserPicker',
        'onAppendQuerys',
        'onRemoveQuery',
        'onSearch',
      ],
    },
  },
  {
    name: 'searchDate',
    path: '/table/search-date',
    component: SearchDate,
    meta: {
      title: 'PxSearchDay · PxSearchMonth · PxSearchYear',
      category: 'TABLE',
      description: '라우트 query와 연결된 일·월·연 단위의 테이블 검색 픽커',
      keywords: ['PxSearchDay', 'PxSearchMonth', 'PxSearchYear', '일별 검색', '월별 검색', '연도 검색', 'yyyymmdd', 'yyyymm', 'yyyy', 'onAppendQuerys', 'px-searchDate'],
    },
  },
  {
    name: 'userInfoTableCell',
    path: '/table/user-info-table-cell',
    component: UserInfoTableCell,
    meta: {
      title: 'PxUserInfoTableCell',
      category: 'TABLE',
      description: '사용자 이름과 ID를 userView 라우트 링크와 함께 표시하는 테이블 셀',
      keywords: ['PxUserInfoTableCell', 'user info', '사용자 정보', 'table cell', 'userName', 'userId', 'userSeq', 'userView', 'viewMode', 'md', 'px-userInfoTableCell'],
    },
  },
  {
    name: 'userView',
    path: '/table/user-info-table-cell/user/:userSeq',
    redirect: { name: 'userInfoTableCell' },
    meta: { searchable: false },
  },
  {
    name: 'routerLinkTableCell',
    path: '/table/router-link-table-cell',
    component: RouterLinkTableCell,
    meta: {
      title: 'PxRouterLinkTableCell',
      category: 'TABLE',
      description: '테이블 셀의 텍스트를 Vue Router 링크로 표시하는 컴포넌트',
      keywords: ['PxRouterLinkTableCell', 'router link', '테이블 링크', 'table cell', 'label', 'to', 'addClass', 'onClick'],
    },
  },
  {
    name: 'colorTableCell',
    path: '/table/color-table-cell',
    component: ColorTableCell,
    meta: {
      title: 'PxColorTableCell',
      category: 'TABLE',
      description: '활성 여부에 따라 텍스트 색상과 클래스를 바꾸는 테이블 셀 보조 컴포넌트',
      keywords: ['PxColorTableCell', 'table cell', 'active', 'activeClass', 'extraClass', '색상 셀'],
    },
  },
  {
    name: 'customMergeTable',
    path: '/table/custom-merge-table',
    component: CustomMergeTable,
    meta: {
      title: 'PxCustomMergeTable',
      category: 'TABLE',
      description: '병합 셀처럼 직접 구성해야 하는 행을 기본 슬롯으로 작성하는 테이블 틀',
      keywords: ['PxCustomMergeTable', 'merge table', 'rowspan', 'colspan', 'headers', 'rows', 'onCheckAll'],
    },
  },
  {
    name: 'customBoard',
    path: '/table/custom-board',
    component: CustomBoard,
    meta: {
      title: 'PxCustomBoard',
      category: 'TABLE',
      description: '검색, 로딩, 빈 상태, 목록 및 페이지네이션을 한 흐름으로 묶는 커스텀 보드',
      keywords: ['PxCustomBoard', 'custom board', 'search', 'pagination', 'empty', 'searching', 'router'],
    },
  },
  {
    name: 'adminFormWrapper',
    path: '/table/admin-form-wrapper',
    component: AdminFormWrapper,
    meta: {
      title: 'PxAdminFormWrapper',
      category: 'TABLE',
      description: '관리자 테이블 주변의 검색·입력 행을 묶는 단순 레이아웃 래퍼',
      keywords: ['PxAdminFormWrapper', 'admin form', 'wrapper', 'layout', '관리자 폼'],
    },
  },
  {
    name: 'adminFormWrapperRow',
    path: '/table/admin-form-wrapper-row',
    component: AdminFormWrapperRow,
    meta: {
      title: 'PxAdminFormWrapperRow',
      category: 'TABLE',
      description: 'PxAdminFormWrapper 안에서 한 줄의 입력 콘텐츠를 정렬하는 행 래퍼',
      keywords: ['PxAdminFormWrapperRow', 'PxAdminFormWarpperRow', 'admin form row', 'slot_container', '관리자 폼 행'],
    },
  },
  {
    path: '/list/table',
    redirect: { name: 'table' },
    meta: { searchable: false },
  },
  {
    path: '/list/admin-table',
    redirect: { name: 'adminTable' },
    meta: { searchable: false },
  },
]
