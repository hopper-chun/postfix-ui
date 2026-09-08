<script setup>
import { ref } from 'vue'
import CodeBlock from '../../components/CodeBlock.vue'
import DocsTable from '../../components/DocsTable.vue'

const selectedDate = ref(new Date(2026, 8, 7))
const clearableDate = ref(new Date(2026, 8, 12))
const disabledDate = ref(new Date(2026, 8, 18))
const viewDate = ref(new Date(2026, 8, 25))
const englishDate = ref(new Date(2026, 8, 7))
const scheduleDate = ref(new Date(2026, 8, 9))
const loadedMonth = ref('')
const tooltipDate = ref(null)
const customDate = ref(new Date(2026, 8, 15))
const scheduleDays = [3, 9, 18, 25]

const handleMonth = (month) => {
  loadedMonth.value = month
}

const displayDate = (value) => {
  if (!value) return '선택 없음'

  const date = value instanceof Date ? value : new Date(value)
  if (Number.isNaN(date.getTime())) return String(value)

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const basicCode = `const selectedDate = ref(new Date())

<PxDatePicker
  id="start-date"
  v-model="selectedDate"
  label="시작일"
  placeholder="YYYY-MM-DD"
/>`

const stateCode = `<PxDatePicker
  id="clear-date"
  v-model="clearableDate"
  label="초기화 가능"
  clear
/>

<PxDatePicker
  id="disabled-date"
  v-model="disabledDate"
  label="변경 불가"
  disabled
/>

<PxDatePicker
  id="view-date"
  v-model="viewDate"
  label="조회 모드"
  viewMode
/>`

const langCode = `<PxDatePicker
  id="english-date"
  v-model="selectedDate"
  label="Release date"
  lang="en"
/>

<!-- lang: 'ko' | 'jp' | 그 외 영문 -->`

const scheduleCode = `const scheduleDays = [3, 9, 18, 25]

const handleMonth = (yyyymm) => {
  // 달력에 표시할 월이 바뀔 때 데이터를 조회합니다.
  console.log(yyyymm)
}

<PxDatePicker
  id="schedule-date"
  v-model="scheduleDate"
  label="일정일"
  :dotDays="scheduleDays"
  :cbMonth="handleMonth"
/>

<!-- dotDays는 현재 표시 월에서 강조할 일(day) 숫자 배열입니다. -->`

const tooltipCode = `<PxDatePicker
  id="contract-date"
  v-model="contractDate"
  label="계약 시작일"
  labelHelper="필수"
  required
  md="**계약 시작일**은 서명 완료 이후로 선택해주세요."
>
  <template #tooltip>
    계약서에 기재된 실제 시작일을 선택합니다.
  </template>
</PxDatePicker>

<PxDialogTooltip />`

const customClassCode = `<PxDatePicker
  id="project-date"
  v-model="date"
  class="project-datepicker"
  label="프로젝트 일정"
/>

<style>
.px-datepicker.project-datepicker .px-input--field {
  height: 48px;
  padding-right: 44px;
  padding-left: 18px;
  border: 2px solid #0f766e;
  border-radius: 12px;
  background-color: #f0fdfa;
  box-shadow: 0 8px 20px rgba(15, 118, 110, 0.18);
  color: #134e4a;
  font-size: 15px;
}

.px-datepicker.project-datepicker .px-datepicker--panel {
  max-width: 360px;
  border: 2px solid #0f766e;
  border-radius: 16px;
  box-shadow: 0 16px 36px rgba(15, 118, 110, 0.24);
}

.px-datepicker.project-datepicker .px-datepicker--panel_container {
  padding: 24px;
}

.px-datepicker.project-datepicker
  .px-datepicker--panel_calendar
  table td .day a.isSelectedDay {
  background-color: #0f766e;
  color: #ffffff;
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
    name: 'modelValue',
    type: 'Date | String | Number',
    defaultValue: '-',
    description: '<code>v-model</code>로 연결되는 날짜. 선택하면 Date, 초기화하면 null을 반환',
  },
  { name: 'id', type: 'String', defaultValue: '-', description: '라벨과 에러를 식별하는 ID' },
  { name: 'label', type: 'String', defaultValue: '-', description: '입력창 위에 표시할 라벨' },
  { name: 'labelHelper', type: 'String', defaultValue: '-', description: '라벨 옆 보조 문구' },
  { name: 'required', type: 'Boolean', defaultValue: 'false', description: '라벨에 필수 표시' },
  { name: 'clear', type: 'Boolean', defaultValue: 'false', description: '선택값을 null로 초기화하는 버튼 표시' },
  { name: 'disabled', type: 'Boolean', defaultValue: 'false', description: '입력과 달력 열기 비활성화' },
  { name: 'placeholder', type: 'String', defaultValue: '-', description: '날짜가 없을 때 표시할 입력 안내 문구' },
  { name: 'lang', type: 'String', defaultValue: 'ko', description: '<code>ko</code>, <code>jp</code> 또는 영문 달력 문구 설정' },
  { name: 'viewMode', type: 'Boolean', defaultValue: 'false', description: '날짜를 조회용 텍스트로 표시하고 달력 열기 차단' },
  { name: 'dotDays', type: 'Array', defaultValue: '-', description: '현재 표시 월에서 별도 색상으로 강조할 일(day) 숫자 배열' },
  { name: 'cbMonth', type: 'Function', defaultValue: '-', description: '표시 월이 바뀔 때 <code>yyyyMM</code> 문자열을 받는 콜백' },
  { name: 'md', type: 'String', defaultValue: '-', description: '라벨 툴팁 다이얼로그에 표시할 콘텐츠' },
]

const eventHeaders = [
  { field: 'name', label: '이름', code: true },
  { field: 'payload', label: '전달값', code: true },
  { field: 'description', label: '설명', html: true },
]

const eventRows = [
  { name: 'update:modelValue', payload: 'Date | null', description: '날짜 선택 또는 초기화 시 발생하며 <code>v-model</code>을 갱신' },
  { name: 'onClickTooltip', payload: 'Event', description: '라벨의 도움말 아이콘을 클릭할 때 발생' },
]

const slotHeaders = [
  { field: 'name', label: '이름', code: true },
  { field: 'description', label: '설명' },
]

const slotRows = [{ name: 'tooltip', description: '라벨의 도움말 아이콘에 표시할 콘텐츠' }]

const classHeaders = [
  { field: 'category', label: '구분' },
  { field: 'className', label: '클래스', html: true },
  { field: 'description', label: '용도', html: true },
]

const classRows = [
  { category: '최상위', className: '<code>px-datepicker</code>, <code>labelSwitch</code>', description: '전체 DatePicker와 라벨 영역' },
  {
    category: '입력 영역',
    className: '<code>px-datepicker--input_Wrapper</code>, <code>px-input</code>, <code>px-input--field</code>',
    description: '날짜 입력창과 내부 PxInput',
  },
  {
    category: '입력 아이콘',
    className: '<code>px-input--funcWrapper</code>, <code>date</code>, <code>date__icon</code>, <code>clear</code>, <code>clear__icon</code>',
    description: '달력 및 초기화 버튼',
  },
  { category: '패널 위치', className: '<code>px-datepicker--panel_wrapper</code>, <code>reverse</code>', description: '달력 패널 위치와 위쪽 열림 상태' },
  { category: '패널', className: '<code>px-datepicker--panel</code>, <code>px-datepicker--panel_container</code>', description: '달력 패널과 내부 컨테이너' },
  {
    category: '월 이동',
    className: '<code>px-datepicker--panel_nav</code>, <code>month</code>, <code>button_wrapper</code>, <code>month_prev</code>, <code>month_next</code>',
    description: '표시 월과 이전/다음 버튼',
  },
  { category: '달력', className: '<code>px-datepicker--panel_calendar</code>, <code>day</code>, <code>day_week</code>', description: '요일 및 날짜 그리드' },
  {
    category: '날짜 상태',
    className: '<code>isBlur</code>, <code>isDot</code>, <code>isSelectedDay</code>',
    description: '다른 달 날짜, 강조 날짜 및 선택 날짜 상태',
  },
]
</script>

<template>
  <article class="docs-page">
    <p class="docs-eyebrow">FORM</p>
    <h1>PxDatePicker</h1>
    <p class="docs-lead">직접 입력과 달력 선택을 지원하는 단일 날짜 선택 컴포넌트입니다.</p>

    <section class="docs-section">
      <h2>기본 사용</h2>
      <div class="example-preview">
        <div class="w-full max-w-[480px]">
          <PxDatePicker id="docs-date-basic" v-model="selectedDate" label="시작일" placeholder="YYYY-MM-DD" />
          <p class="mb-[0px] mt-[10px] text-[13px] text-[#69707e]">선택값: {{ displayDate(selectedDate) }}</p>
        </div>
      </div>
      <CodeBlock :code="basicCode" />
      <p class="docs-note">직접 입력할 때는 <code>yyyy-MM-dd</code> 형식을 사용하고 Enter를 누릅니다. 달력이나 직접 입력으로 확정된 값은 Date 객체입니다.</p>
    </section>

    <section class="docs-section">
      <h2>상태</h2>
      <div class="example-preview">
        <div class="grid w-full grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-[24px]">
          <PxDatePicker id="docs-date-clear" v-model="clearableDate" label="초기화 가능" clear />
          <PxDatePicker id="docs-date-disabled" v-model="disabledDate" label="변경 불가" disabled />
          <PxDatePicker id="docs-date-view" v-model="viewDate" label="조회 모드" viewMode />
        </div>
      </div>
      <CodeBlock :code="stateCode" />
    </section>

    <section class="docs-section">
      <h2>달력 언어</h2>
      <div class="example-preview">
        <div class="w-full max-w-[480px]">
          <PxDatePicker id="docs-date-en" v-model="englishDate" label="Release date" lang="en" />
        </div>
      </div>
      <CodeBlock :code="langCode" />
    </section>

    <section class="docs-section">
      <h2>강조 날짜와 월 변경</h2>
      <p class="m-[0px] max-w-[760px] text-[14px] leading-[1.75] text-[#69707e]">
        <code>dotDays</code>는 현재 월에서 강조할 날짜를 표시하고, <code>cbMonth</code>는 달력을 연 시점과 월 이동 시 호출됩니다.
      </p>
      <div class="example-preview mt-[20px]">
        <div class="w-full max-w-[480px]">
          <PxDatePicker id="docs-date-schedule" v-model="scheduleDate" label="일정일" :dotDays="scheduleDays" :cbMonth="handleMonth" />
          <p class="mb-[0px] mt-[10px] text-[13px] text-[#69707e]">현재 불러온 월: {{ loadedMonth || '-' }}</p>
        </div>
      </div>
      <CodeBlock :code="scheduleCode" />
    </section>

    <section class="docs-section">
      <h2>라벨 도움말</h2>
      <div class="example-preview">
        <div class="w-full max-w-[480px]">
          <PxDatePicker
            id="docs-date-tooltip"
            v-model="tooltipDate"
            label="계약 시작일"
            labelHelper="필수"
            required
            md="**계약 시작일**은 서명 완료 이후로 선택해주세요."
          >
            <template #tooltip>계약서에 기재된 실제 시작일을 선택합니다.</template>
          </PxDatePicker>
        </div>
      </div>
      <CodeBlock :code="tooltipCode" />
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
        <div class="w-full max-w-[480px]">
          <PxDatePicker id="docs-date-custom" v-model="customDate" class="project-datepicker" label="프로젝트 일정" />
        </div>
      </div>
      <CodeBlock :code="customClassCode" />
    </section>

    <PxDialogTooltip />
  </article>
</template>

<style>
.px-datepicker.project-datepicker .px-input--field {
  @apply h-[48px] rounded-[12px] border-[2px] border-[#0f766e] bg-[#f0fdfa] pl-[18px] !pr-[44px] text-[15px] text-[#134e4a] shadow-[0_8px_20px_rgba(15,118,110,0.18)];
}

.px-datepicker.project-datepicker .px-datepicker--panel {
  @apply max-w-[360px] rounded-[16px] border-[2px] border-[#0f766e] shadow-[0_16px_36px_rgba(15,118,110,0.24)];
}

.px-datepicker.project-datepicker .px-datepicker--panel_container {
  @apply p-[24px];
}

.px-datepicker.project-datepicker .px-datepicker--panel_calendar table td .day a.isSelectedDay {
  @apply bg-[#0f766e] text-white;
}
</style>
