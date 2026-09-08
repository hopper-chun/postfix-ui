import Table from '../list/Table.vue'
import AdminTable from '../list/AdminTable.vue'
import ColorTableCell from './ColorTableCell.vue'
import CustomMergeTable from './CustomMergeTable.vue'
import CustomBoard from './CustomBoard.vue'
import AdminFormWrapper from './AdminFormWrapper.vue'
import AdminFormWrapperRow from './AdminFormWrapperRow.vue'

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
