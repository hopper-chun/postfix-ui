<script setup>
import { onUnmounted, ref } from 'vue'
import { useError } from '@postfix/ui'
import CodeBlock from '../../components/CodeBlock.vue'
import DocsTable from '../../components/DocsTable.vue'

const period = ref('이번 주')
const role = ref('editor')
const disabledValue = ref('오늘')
const viewValue = ref('이번 달')
const nowrapValue = ref('오늘')
const customValue = ref('card')
const errorValue = ref('')

const periods = ['오늘', '이번 주', '이번 달']
const roleOptions = [
  { code: 'viewer', name: '조회자' },
  { code: 'editor', name: '편집자' },
  { code: 'admin', name: '관리자' },
]
const nowrapOptions = ['오늘', '어제', '최근 7일', '최근 30일', '이번 분기', '올해']

const { causeError, clearError } = useError()
const showError = () => causeError({ id: 'docs-button-list-error', msg: '조회 기간을 선택해주세요.' })

onUnmounted(() => clearError())

const basicCode = `const period = ref('이번 주')
const periods = ['오늘', '이번 주', '이번 달']

<PxButtonList
  id="period"
  v-model="period"
  :options="periods"
/>`

const objectCode = `const role = ref('editor')
const roleOptions = [
  { code: 'viewer', name: '조회자' },
  { code: 'editor', name: '편집자' },
  { code: 'admin', name: '관리자' },
]

<PxButtonList
  id="role"
  v-model="role"
  :options="roleOptions"
  :optionsLabel="(option) => option.name"
  :optionsValue="(option) => option.code"
/>
`

const labelCode = `<PxButtonList
  id="status"
  v-model="status"
  label="공개 상태"
  labelHelper="필수"
  helperText="게시물에 적용할 상태를 선택해주세요."
  required
  md="**공개** 상태는 저장 즉시 사용자에게 노출됩니다."
  :options="['비공개', '공개']"
/>

<PxDialogTooltip />`

const stateCode = `<PxButtonList
  id="disabled-period"
  v-model="period"
  :options="periods"
  disabled
/>

<PxButtonList
  id="view-period"
  v-model="period"
  label="조회 기간"
  :options="periods"
  viewMode
/>

<PxButtonList
  id="nowrap-period"
  v-model="period"
  :options="periods"
  nowrap
/>
`

const errorCode = `const { causeError, clearError } = useError()

<PxButtonList
  id="report-period"
  v-model="period"
  label="조회 기간"
  :options="periods"
/>

causeError({
  id: 'report-period',
  msg: '조회 기간을 선택해주세요.',
})

// 내부 HelperText가 같은 id의 PxError를 표시합니다.
clearError('report-period')`

const slotCode = `<PxButtonList
  id="view-type"
  v-model="viewType"
  :options="[
    { value: 'card', label: '카드' },
    { value: 'list', label: '목록' },
  ]"
  :optionsLabel="(option) => option.label"
  :optionsValue="(option) => option.value"
>
  <template #default="{ isSelect, optionsLabel }">
    <PxButton
      size="sm"
      :color="isSelect ? 'pri' : 'gray_border'"
    >
      {{ isSelect ? '✓ ' : '' }}{{ optionsLabel }} 보기
    </PxButton>
  </template>

  <template #helperIcon>
    <PxIcon name="icon-information-circle" />
  </template>
</PxButtonList>`

const customClassCode = `<PxButtonList
  id="project-filter"
  v-model="filter"
  class="project-button-list"
  :options="['전체', '진행 중', '완료']"
/>

<style>
/* Postfix UI 스타일시트 뒤에 불러옵니다. */
.project-button-list .px-buttonList--wrapper {
  gap: 6px;
  padding: 10px;
  border: 2px solid #fb923c;
  border-radius: 16px;
  background-color: #fff7ed;
}

.project-button-list .px-buttonList--wrapper > div {
  margin: 0;
}

.project-button-list .px-btn {
  min-width: 88px;
  border-radius: 12px;
  background-color: #ffedd5;
  color: #9a3412;
  font-weight: 800;
}

.project-button-list .px-btn.pri {
  border-color: #c2410c;
  background-color: #ea580c;
  box-shadow: 0 8px 18px rgba(234, 88, 12, 0.3);
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
  { name: 'id', type: 'String', defaultValue: '-', description: '테스트 및 에러 상태 연결에 사용할 ID' },
  { name: 'modelValue', type: 'String | Number | Object', defaultValue: '-', description: '<code>v-model</code>로 연결되는 단일 선택값' },
  { name: 'options', type: 'Array', defaultValue: '-', description: '버튼으로 표시할 옵션 배열' },
  { name: 'optionsLabel', type: 'Function', defaultValue: '(option) => option', description: '옵션에서 화면에 표시할 라벨 반환' },
  { name: 'optionsValue', type: 'Function', defaultValue: '(option) => option', description: '옵션에서 modelValue로 사용할 값 반환' },
  { name: 'label', type: 'String', defaultValue: '-', description: '버튼 목록 위 라벨' },
  { name: 'labelHelper', type: 'String', defaultValue: '-', description: '라벨 옆 보조 문구' },
  { name: 'helperText', type: 'String', defaultValue: '-', description: '버튼 목록 아래 안내 문구' },
  { name: 'required', type: 'Boolean', defaultValue: 'false', description: '라벨에 필수 표시' },
  { name: 'md', type: 'String', defaultValue: '-', description: '라벨 도움말 다이얼로그에 표시할 Markdown 문구' },
  { name: 'disabled', type: 'Boolean', defaultValue: 'false', description: '선택 변경 차단. 내부 PxButton에는 disabled 스타일이 전달되지 않음' },
  { name: 'viewMode', type: 'Boolean', defaultValue: 'false', description: '버튼 대신 선택된 옵션 라벨만 조회 형태로 표시' },
  { name: 'color', type: 'String', defaultValue: 'pri', description: '선택된 PxButton의 color' },
  { name: 'subColor', type: 'String', defaultValue: 'inactive', description: '선택되지 않은 PxButton의 color' },
  { name: 'size', type: 'String', defaultValue: 'PxButton 기본값', description: '각 PxButton의 size' },
  { name: 'nowrap', type: 'Boolean', defaultValue: 'false', description: '버튼 목록 줄바꿈 방지' },
]

const eventHeaders = [
  { field: 'name', label: '이름', code: true },
  { field: 'payload', label: '전달값', code: true },
  { field: 'description', label: '설명' },
]

const eventRows = [{ name: 'update:modelValue', payload: 'optionsValue(option)', description: '옵션을 선택할 때 단일 선택값 전달' }]

const slotHeaders = [
  { field: 'name', label: '이름', code: true },
  { field: 'scope', label: '슬롯 Props', code: true },
  { field: 'description', label: '설명' },
]

const slotRows = [
  { name: 'default', scope: '{ isSelect, optionsLabel }', description: '각 옵션의 기본 PxButton 전체를 교체' },
  { name: 'helperIcon', scope: '-', description: 'HelperText 안내 문구 앞에 표시할 아이콘' },
]

const classHeaders = [
  { field: 'category', label: '구분' },
  { field: 'className', label: '클래스', html: true },
  { field: 'description', label: '용도' },
]

const classRows = [
  { category: '최상위', className: '<code>px-buttonList</code>', description: '라벨, 버튼 목록과 HelperText 전체 영역' },
  { category: '라벨 묶음', className: '<code>labelSwitch</code>', description: '편집 모드의 라벨과 입력 영역' },
  { category: '버튼 목록', className: '<code>px-buttonList--wrapper</code>', description: '버튼을 flex 형태로 배치하는 영역' },
  { category: '줄바꿈', className: '<code>nowrap</code>', description: 'nowrap 사용 시 wrapper에 추가되는 상태 클래스' },
  { category: '내부 버튼', className: '<code>px-btn</code> 및 PxButton 상태 클래스', description: '각 옵션을 표시하는 PxButton' },
]
</script>

<template>
  <article class="docs-page">
    <p class="docs-eyebrow">LIST</p>
    <h1>PxButtonList</h1>
    <p class="docs-lead">여러 버튼 중 하나의 값을 선택하는 단일 선택 버튼 목록입니다.</p>

    <section class="docs-section">
      <h2>기본 사용</h2>
      <div class="example-preview">
        <div class="w-full max-w-[720px]">
          <PxButtonList id="docs-period" v-model="period" :options="periods" subColor="gray_border" />
          <p class="mb-[0px] mt-[12px] text-[13px] text-[#69707e]">선택값: <code>{{ period }}</code></p>
        </div>
      </div>
      <CodeBlock :code="basicCode" />
    </section>

    <section class="docs-section">
      <h2>객체 옵션</h2>
      <p class="m-[0px] max-w-[760px] text-[14px] leading-[1.75] text-[#69707e]">
        객체 배열은 <code>optionsLabel</code>과 <code>optionsValue</code>로 표시값과 저장값을 나눕니다. 선택 여부는 반환값과
        <code>modelValue</code>를 엄격 비교합니다.
      </p>
      <div class="example-preview mt-[20px]">
        <div class="w-full max-w-[720px]">
          <PxButtonList
            id="docs-role"
            v-model="role"
            :options="roleOptions"
            :optionsLabel="(option) => option.name"
            :optionsValue="(option) => option.code"
            subColor="gray_border"
          />
          <p class="mb-[0px] mt-[12px] text-[13px] text-[#69707e]">선택값: <code>{{ role }}</code></p>
        </div>
      </div>
      <CodeBlock :code="objectCode" />
    </section>

    <section class="docs-section">
      <h2>라벨과 안내 문구</h2>
      <div class="example-preview">
        <div class="w-full max-w-[720px]">
          <PxButtonList
            id="docs-publish-status"
            v-model="period"
            label="조회 기간"
            labelHelper="필수"
            helperText="목록에 적용할 조회 기간을 선택해주세요."
            required
            md="선택한 **조회 기간**을 기준으로 목록을 다시 불러옵니다."
            :options="periods"
            subColor="gray_border"
          />
        </div>
      </div>
      <CodeBlock :code="labelCode" />
    </section>

    <section class="docs-section">
      <h2>상태와 줄바꿈</h2>
      <div class="example-preview">
        <div class="grid w-full gap-[24px]">
          <PxButtonList id="docs-button-list-disabled" v-model="disabledValue" label="비활성화" :options="periods" subColor="gray_border" disabled />
          <PxButtonList id="docs-button-list-view" v-model="viewValue" label="조회 모드" :options="periods" viewMode />
          <div class="max-w-[420px] overflow-x-auto pb-[4px]">
            <PxButtonList id="docs-button-list-nowrap" v-model="nowrapValue" label="줄바꿈 방지" :options="nowrapOptions" subColor="gray_border" nowrap />
          </div>
        </div>
      </div>
      <p class="docs-note mt-[16px]">
        <code>disabled</code>는 값 변경만 막습니다. 내부 PxButton에 disabled 상태를 전달하지 않으므로 버튼의 비활성 스타일은 자동 적용되지 않습니다.
      </p>
      <CodeBlock :code="stateCode" />
    </section>

    <section class="docs-section">
      <h2>에러 표시</h2>
      <p class="m-[0px] max-w-[760px] text-[14px] leading-[1.75] text-[#69707e]">
        같은 ID로 에러를 등록하면 내부 HelperText가 PxError를 자동 표시합니다.
      </p>
      <div class="example-preview mt-[20px]">
        <div class="w-full max-w-[720px]">
          <PxButtonList id="docs-button-list-error" v-model="errorValue" label="조회 기간" :options="periods" subColor="gray_border" />
          <div class="mt-[12px] flex flex-wrap gap-[6px]">
            <PxButton size="xs" @click="showError">에러 표시</PxButton>
            <PxButton size="xs" color="gray_border" @click="clearError('docs-button-list-error')">에러 해제</PxButton>
          </div>
        </div>
      </div>
      <CodeBlock :code="errorCode" />
    </section>

    <section class="docs-section">
      <h2>Slots</h2>
      <div class="example-preview">
        <div class="w-full max-w-[720px]">
          <PxButtonList
            id="docs-button-list-slot"
            v-model="customValue"
            helperText="원하는 보기 방식을 선택해주세요."
            :options="[
              { value: 'card', label: '카드' },
              { value: 'list', label: '목록' },
            ]"
            :optionsLabel="(option) => option.label"
            :optionsValue="(option) => option.value"
          >
            <template #default="{ isSelect, optionsLabel }">
              <PxButton size="sm" :color="isSelect ? 'pri' : 'gray_border'">{{ isSelect ? '✓ ' : '' }}{{ optionsLabel }} 보기</PxButton>
            </template>
            <template #helperIcon>
              <PxIcon name="icon-information-circle" />
            </template>
          </PxButtonList>
        </div>
      </div>
      <CodeBlock :code="slotCode" />
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
        <PxButtonList
          id="docs-project-button-list"
          v-model="period"
          class="project-button-list"
          :options="['전체', '진행 중', '완료']"
          subColor="gray_border"
        />
      </div>
      <CodeBlock :code="customClassCode" />
    </section>

    <PxDialogTooltip />
  </article>
</template>

<style>
.project-button-list .px-buttonList--wrapper {
  gap: 6px;
  padding: 10px;
  border: 2px solid #fb923c;
  border-radius: 16px;
  background-color: #fff7ed;
}

.project-button-list .px-buttonList--wrapper > div {
  margin: 0;
}

.project-button-list .px-btn {
  min-width: 88px;
  border-radius: 12px;
  background-color: #ffedd5;
  color: #9a3412;
  font-weight: 800;
}

.project-button-list .px-btn.pri {
  border-color: #c2410c;
  background-color: #ea580c;
  box-shadow: 0 8px 18px rgba(234, 88, 12, 0.3);
  color: #ffffff;
}
</style>
