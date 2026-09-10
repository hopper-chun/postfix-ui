<script setup>
import { ref } from 'vue'
import CodeBlock from '../../components/CodeBlock.vue'
import DocsTable from '../../components/DocsTable.vue'

const selectedMonth = ref(new Date(2026, 8, 1))
const selectedYear = ref(new Date(2026, 0, 1))
const englishMonth = ref(new Date(2026, 8, 1))
const disabledMonth = ref(new Date(2026, 8, 1))
const viewMonth = ref(new Date(2026, 8, 1))
const tooltipMonth = ref(new Date(2026, 8, 1))
const customMonth = ref(new Date(2026, 8, 1))

const displayMonth = (value, year = false) => {
  if (!(value instanceof Date) || Number.isNaN(value.getTime())) return '-'

  const yyyy = value.getFullYear()
  if (year) return String(yyyy)

  return `${yyyy}-${String(value.getMonth() + 1).padStart(2, '0')}`
}

const basicCode = `const selectedMonth = ref(new Date())

<PxMonthPicker
  id="billing-month"
  v-model="selectedMonth"
  label="정산월"
  placeholder="YYYY-MM"
/>`

const yearCode = `const selectedYear = ref(new Date())

<PxMonthPicker
  id="business-year"
  v-model="selectedYear"
  label="사업연도"
  placeholder="YYYY"
  year
/>`

const langCode = `<PxMonthPicker
  id="english-month"
  v-model="selectedMonth"
  label="Billing month"
  lang="en"
/>

<!-- lang: 'ko' | 'jp' | 그 외 영문 -->`

const stateCode = `<PxMonthPicker
  id="disabled-month"
  v-model="disabledMonth"
  label="비활성화"
  disabled
/>

<PxMonthPicker
  id="view-month"
  v-model="viewMonth"
  label="조회 모드"
  viewMode
/>`

const tooltipCode = `<PxMonthPicker
  id="contract-month"
  v-model="contractMonth"
  label="계약 시작월"
  labelHelper="필수"
  required
  md="**계약 시작월**은 계약서의 적용 기간을 기준으로 선택해주세요."
>
  <template #tooltip>
    계약서에 기재된 실제 시작월을 선택합니다.
  </template>
</PxMonthPicker>

<PxDialogTooltip />`

const customClassCode = `<PxMonthPicker
  id="project-month"
  v-model="month"
  class="project-monthpicker"
  label="프로젝트 기준월"
/>

<style>
.px-datepicker.project-monthpicker .px-input--field {
  height: 48px;
  padding-right: 44px;
  padding-left: 18px;
  border: 2px solid #ea580c;
  border-radius: 12px;
  background-color: #fff7ed;
  box-shadow: 0 8px 20px rgba(234, 88, 12, 0.18);
  color: #7c2d12;
  font-size: 15px;
}

.px-datepicker.project-monthpicker .px-datepicker--panel {
  border: 2px solid #ea580c;
  border-radius: 16px;
  box-shadow: 0 16px 36px rgba(234, 88, 12, 0.24);
}

.px-datepicker.project-monthpicker .px-datepicker--panel_container {
  padding: 24px;
}

.px-datepicker.project-monthpicker
  .px-datepicker--panel_calendar .day.isSelectedDay {
  background-color: #ea580c;
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
  { name: 'modelValue', type: 'Date', defaultValue: '-', description: '<code>v-model</code>로 연결되는 값. 현재 구현상 유효한 Date 객체가 필요' },
  { name: 'year', type: 'Boolean', defaultValue: 'false', description: '월 대신 연도 선택 모드 사용' },
  { name: 'label', type: 'String', defaultValue: '-', description: '입력창 위에 표시할 라벨' },
  { name: 'id', type: 'String', defaultValue: '-', description: '라벨과 에러를 식별하는 ID' },
  { name: 'labelHelper', type: 'String', defaultValue: '-', description: '라벨 옆 보조 문구' },
  { name: 'required', type: 'Boolean', defaultValue: 'false', description: '라벨에 필수 표시' },
  { name: 'placeholder', type: 'String', defaultValue: '-', description: '입력 안내 문구' },
  { name: 'disabled', type: 'Boolean', defaultValue: 'false', description: '내부 입력창 비활성화. 현재 바깥 클릭으로 패널이 열리는 동작은 차단하지 못함' },
  { name: 'viewMode', type: 'Boolean', defaultValue: 'false', description: '조회용 텍스트로 표시. 현재 바깥 클릭으로 패널이 열리는 동작은 차단하지 못함' },
  { name: 'lang', type: 'String', defaultValue: 'ko', description: '<code>ko</code>, <code>jp</code> 또는 영문 패널 문구 설정' },
  { name: 'md', type: 'String', defaultValue: '-', description: '라벨 툴팁 다이얼로그에 표시할 콘텐츠' },
  { name: 'clear', type: 'Boolean', defaultValue: 'false', description: '현재 버튼은 표시되지만 초기화 동작에는 연결되지 않음' },
  { name: 'rounded', type: 'String', defaultValue: '-', description: '현재 Props에만 선언되어 있으며 스타일에는 연결되지 않음' },
  { name: 'hover', type: 'Boolean', defaultValue: 'true', description: '현재 Props에만 선언되어 있으며 내부 라벨에는 전달되지 않음' },
]

const eventHeaders = [
  { field: 'name', label: '이름', code: true },
  { field: 'payload', label: '전달값', code: true },
  { field: 'description', label: '설명', html: true },
]

const eventRows = [
  { name: 'update:modelValue', payload: 'Date', description: '월 또는 연도를 선택하거나 직접 입력을 확정할 때 <code>v-model</code>을 갱신' },
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
  { category: '최상위', className: '<code>px-datepicker</code>, <code>labelSwitch</code>', description: 'DatePicker와 공유하는 MonthPicker 최상위 영역' },
  { category: '입력 영역', className: '<code>px-datepicker--input_Wrapper</code>, <code>px-input</code>, <code>px-input--field</code>', description: '월 또는 연도 입력창' },
  { category: '패널 위치', className: '<code>px-datepicker--panel_wrapper</code>', description: '월 선택 패널의 위치 래퍼' },
  { category: '패널', className: '<code>month</code>, <code>isYear</code>, <code>px-datepicker--panel</code>, <code>px-datepicker--panel_container</code>', description: '월/연도 모드와 선택 패널' },
  { category: '이동', className: '<code>px-datepicker--panel_nav</code>, <code>button_wrapper</code>, <code>month_prev</code>, <code>month_next</code>', description: '기준 연도 또는 연도 범위 이동' },
  { category: '선택 목록', className: '<code>px-datepicker--panel_calendar</code>, <code>day</code>', description: '월 또는 연도 선택 목록' },
  { category: '상태', className: '<code>isSelectedDay</code>, <code>isCurrMonth</code>', description: '선택값과 현재 월 또는 연도 상태' },
]
</script>

<template>
  <article class="docs-page">
    <p class="docs-eyebrow">FORM</p>
    <h1>PxMonthPicker</h1>
    <p class="docs-lead">월 또는 연도를 직접 입력하거나 선택 패널에서 고르는 컴포넌트입니다.</p>

    <section class="docs-section">
      <h2>기본 사용</h2>
      <div class="example-preview">
        <div class="w-full max-w-[480px]">
          <PxMonthPicker id="docs-month-basic" v-model="selectedMonth" label="정산월" placeholder="YYYY-MM" />
          <p class="mb-[0px] mt-[10px] text-[13px] text-[#69707e]">선택값: {{ displayMonth(selectedMonth) }}</p>
        </div>
      </div>
      <CodeBlock :code="basicCode" />
      <p class="docs-note">
        직접 입력은 월 모드에서 <code>yyyy-MM</code>, 연도 모드에서 <code>yyyy</code> 형식을 사용하고 Enter로 확정합니다.
      </p>
    </section>

    <section class="docs-section">
      <h2>연도 선택</h2>
      <div class="example-preview">
        <div class="w-full max-w-[480px]">
          <PxMonthPicker id="docs-month-year" v-model="selectedYear" label="사업연도" placeholder="YYYY" year />
          <p class="mb-[0px] mt-[10px] text-[13px] text-[#69707e]">선택값: {{ displayMonth(selectedYear, true) }}</p>
        </div>
      </div>
      <CodeBlock :code="yearCode" />
    </section>

    <section class="docs-section">
      <h2>패널 언어</h2>
      <div class="example-preview">
        <div class="w-full max-w-[480px]">
          <PxMonthPicker id="docs-month-en" v-model="englishMonth" label="Billing month" lang="en" />
        </div>
      </div>
      <CodeBlock :code="langCode" />
    </section>

    <section class="docs-section">
      <h2>상태</h2>
      <div class="example-preview">
        <div class="grid w-full grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-[24px]">
          <PxMonthPicker id="docs-month-disabled" v-model="disabledMonth" label="비활성화" disabled />
          <PxMonthPicker id="docs-month-view" v-model="viewMonth" label="조회 모드" viewMode />
        </div>
      </div>
      <CodeBlock :code="stateCode" />
    </section>

    <section class="docs-section">
      <h2>라벨 도움말</h2>
      <div class="example-preview">
        <div class="w-full max-w-[480px]">
          <PxMonthPicker
            id="docs-month-tooltip"
            v-model="tooltipMonth"
            label="계약 시작월"
            labelHelper="필수"
            required
            md="**계약 시작월**은 계약서의 적용 기간을 기준으로 선택해주세요."
          >
            <template #tooltip>계약서에 기재된 실제 시작월을 선택합니다.</template>
          </PxMonthPicker>
        </div>
      </div>
      <CodeBlock :code="tooltipCode" />
    </section>

    <section class="docs-section">
      <h2>현재 구현 참고</h2>
      <div class="rounded-[10px] border-[1px] border-[#ead9a2] bg-[#fffaf0] px-[20px] py-[18px] text-[14px] leading-[1.75] text-[#665526]">
        <code>clear</code>, <code>rounded</code>, <code>hover</code>는 현재 정상 동작에 연결되어 있지 않습니다.
        또한 <code>disabled</code>와 <code>viewMode</code>도 입력은 막지만 바깥 래퍼 클릭에 의한 패널 열기까지 차단하지는 않습니다.
      </div>
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
          <PxMonthPicker
            id="docs-month-custom"
            v-model="customMonth"
            class="project-monthpicker"
            label="프로젝트 기준월"
          />
        </div>
      </div>
      <CodeBlock :code="customClassCode" />
    </section>

    <PxDialogTooltip />
  </article>
</template>

<style>
.px-datepicker.project-monthpicker .px-input--field {
  @apply h-[48px] rounded-[12px] border-[2px] border-[#ea580c] bg-[#fff7ed] pl-[18px] !pr-[44px] text-[15px] text-[#7c2d12] shadow-[0_8px_20px_rgba(234,88,12,0.18)];
}

.px-datepicker.project-monthpicker .px-datepicker--panel {
  @apply rounded-[16px] border-[2px] border-[#ea580c] shadow-[0_16px_36px_rgba(234,88,12,0.24)];
}

.px-datepicker.project-monthpicker .px-datepicker--panel_container {
  @apply p-[24px];
}

.px-datepicker.project-monthpicker .px-datepicker--panel_calendar .day.isSelectedDay {
  @apply bg-[#ea580c] text-white;
}
</style>
