<script setup>
import { ref } from 'vue'
import CodeBlock from '../../components/CodeBlock.vue'
import DocsTable from '../../components/DocsTable.vue'

const enabled = ref(false)
const notification = ref(true)
const publishState = ref('PRIVATE')
const prevented = ref(true)
const disabledValue = ref(true)
const viewValue = ref(true)
const helperIconValue = ref(false)
const tooltipValue = ref(false)
const customValue = ref(true)

const basicCode = `const enabled = ref(false)

<PxInputToggle
  v-model="enabled"
  label="기능 사용"
  description="새로운 활동이 있으면 알림을 보냅니다."
/>`

const descriptionCode = `<PxInputToggle
  v-model="notification"
  label="알림"
  description="새로운 활동이 있으면 알림을 보냅니다."
  labelHelper="선택"
  helperText="설정은 언제든 변경할 수 있습니다."
/>`

const optionsCode = `const publishState = ref('PRIVATE')

<PxInputToggle
  v-model="publishState"
  label="공개 설정"
  description="켜면 모든 사용자가 볼 수 있습니다."
  :options="['PRIVATE', 'PUBLIC']"
/>

<!-- 꺼짐: 'PRIVATE', 켜짐: 'PUBLIC' -->`

const stateCode = `<PxInputToggle
  v-model="value"
  label="변경만 차단"
  description="비활성화 스타일 없이 클릭을 막습니다."
  prevent
/>

<PxInputToggle
  v-model="value"
  label="비활성화"
  disabled
/>

<PxInputToggle
  v-model="value"
  label="조회 모드"
  viewMode
/>`

const slotCode = `<PxInputToggle
  v-model="enabled"
  label="자동 승인"
  helperText="조건을 만족한 요청에만 적용됩니다."
>
  <template #tooltip>
    승인 조건은 운영 정책에서 설정할 수 있습니다.
  </template>

  <template #helperIcon>
    <PxIcon name="icon-information-circle" />
  </template>
</PxInputToggle>`

const customClassCode = `<PxInputToggle
  v-model="enabled"
  class="project-input-toggle"
  label="프로젝트 설정"
  description="프로젝트 전용 스타일을 적용했습니다."
/>

<style>
.px-inputToggle.project-input-toggle .px-input--field {
  min-height: 56px;
  padding: 10px 16px;
  border: 2px solid #0891b2;
  border-radius: 14px;
  background-color: #ecfeff;
  box-shadow: 0 10px 24px rgba(8, 145, 178, 0.2);
}

.px-inputToggle.project-input-toggle .px-toggle--box {
  width: 44px;
  height: 24px;
  padding: 3px;
  background-color: #a5f3fc;
}

.px-inputToggle.project-input-toggle .px-toggle--box.selected {
  background-color: #ea580c;
}

.px-inputToggle.project-input-toggle .px-toggle--box .dot {
  width: 18px;
  height: 18px;
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
    description: '입력 영역과 에러를 식별하는 ID',
  },
  {
    name: 'label',
    type: 'String',
    defaultValue: '-',
    description: '입력 영역 위에 표시할 라벨',
  },
  {
    name: 'modelValue',
    type: 'String | Number | Boolean',
    defaultValue: '-',
    description: '<code>v-model</code>로 연결되는 현재 값',
  },
  {
    name: 'options',
    type: 'Array',
    defaultValue: '[false, true]',
    description: '꺼짐과 켜짐에 사용할 값. 첫 번째 값은 꺼짐, 두 번째 값은 켜짐',
  },
  {
    name: 'description',
    type: 'String',
    defaultValue: '-',
    description: '입력 박스 안에서 토글 왼쪽에 표시할 설명',
  },
  {
    name: 'labelHelper',
    type: 'String',
    defaultValue: '-',
    description: '라벨 옆 보조 문구',
  },
  {
    name: 'helperText',
    type: 'String',
    defaultValue: '-',
    description: '입력 영역 아래 보조 문구',
  },
  {
    name: 'required',
    type: 'Boolean',
    defaultValue: 'false',
    description: '라벨에 필수 표시',
  },
  {
    name: 'disabled',
    type: 'Boolean',
    defaultValue: 'false',
    description: '비활성화 스타일을 표시하고 값 변경 차단',
  },
  {
    name: 'prevent',
    type: 'Boolean',
    defaultValue: 'false',
    description: '비활성화 스타일 없이 클릭에 의한 값 변경만 차단',
  },
  {
    name: 'viewMode',
    type: 'Boolean',
    defaultValue: 'false',
    description: '조회용 스타일로 표시하고 값 변경 차단',
  },
  {
    name: 'hover',
    type: 'Boolean',
    defaultValue: 'true',
    description: '라벨 툴팁의 hover 동작 여부',
  },
  {
    name: 'md',
    type: 'String',
    defaultValue: '-',
    description: '라벨 툴팁 다이얼로그에 표시할 콘텐츠',
  },
]

const eventHeaders = [
  { field: 'name', label: '이름', code: true },
  { field: 'payload', label: '전달값', code: true },
  { field: 'description', label: '설명', html: true },
]

const eventRows = [
  {
    name: 'update:modelValue',
    payload: 'options[0] | options[1]',
    description: '토글 상태가 바뀔 때 발생하며 <code>v-model</code>을 갱신',
  },
  {
    name: 'onClickTooltip',
    payload: 'Event',
    description: '라벨의 도움말 아이콘을 클릭할 때 발생',
  },
]

const slotHeaders = [
  { field: 'name', label: '이름', code: true },
  { field: 'description', label: '설명' },
]

const slotRows = [
  {
    name: 'tooltip',
    description: '라벨의 도움말 아이콘에 표시할 콘텐츠',
  },
  {
    name: 'helperIcon',
    description: '입력 영역 아래 보조 문구 앞에 표시할 아이콘',
  },
]

const classHeaders = [
  { field: 'category', label: '구분' },
  { field: 'className', label: '클래스', html: true },
  { field: 'description', label: '용도', html: true },
]

const classRows = [
  {
    category: '최상위',
    className: '<code>px-inputToggle</code>, <code>viewMode</code>',
    description: '전체 Input Toggle과 조회 모드 상태',
  },
  {
    category: '라벨',
    className: '<code>labelSwitch</code>, <code>px-label</code>, <code>px-label--text</code>',
    description: '라벨 영역',
  },
  {
    category: '입력 영역',
    className: '<code>px-input--field</code>',
    description: '설명과 토글을 감싸는 박스',
  },
  {
    category: '설명',
    className: '<code>px-toggle--description</code>',
    description: '토글 왼쪽의 설명 영역',
  },
  {
    category: '토글',
    className: '<code>px-toggle</code>, <code>px-toggle--box</code>, <code>dot</code>',
    description: '내부 Toggle과 트랙, 핸들',
  },
  {
    category: '토글 상태',
    className: '<code>selected</code>, <code>disabled</code>, <code>error</code>',
    description: '선택, 비활성화 및 에러 상태',
  },
  {
    category: '보조 문구',
    className: '<code>px-helperText</code>, <code>px-helperText--icon</code>, <code>px-helperText--text</code>',
    description: '설명, 에러와 아이콘 표시',
  },
]
</script>

<template>
  <article class="docs-page">
    <p class="docs-eyebrow">FORM</p>
    <h1>PxInputToggle</h1>
    <p class="docs-lead">라벨과 설명, 보조 문구를 포함한 입력 필드 형태의 토글 컴포넌트입니다.</p>

    <section class="docs-section">
      <h2>기본 사용</h2>
      <div class="example-preview">
        <div class="w-full max-w-[640px]">
          <PxInputToggle v-model="enabled" label="기능 사용" description="새로운 활동이 있으면 알림을 보냅니다." />
        </div>
      </div>
      <CodeBlock :code="basicCode" />
    </section>

    <section class="docs-section">
      <h2>설명과 보조 문구</h2>
      <div class="example-preview">
        <div class="w-full max-w-[640px]">
          <PxInputToggle
            v-model="notification"
            label="알림"
            description="새로운 활동이 있으면 알림을 보냅니다."
            labelHelper="선택"
            helperText="설정은 언제든 변경할 수 있습니다."
          />
        </div>
      </div>
      <CodeBlock :code="descriptionCode" />
    </section>

    <section class="docs-section">
      <h2>상태값 지정</h2>
      <p class="m-[0px] max-w-[760px] text-[14px] leading-[1.75] text-[#69707e]">
        <code>options</code>를 사용하면 Boolean 대신 문자열이나 숫자를 상태값으로 사용할 수 있습니다.
      </p>
      <div class="example-preview mt-[20px]">
        <div class="w-full max-w-[640px]">
          <PxInputToggle v-model="publishState" label="공개 설정" description="켜면 모든 사용자가 볼 수 있습니다." :options="['PRIVATE', 'PUBLIC']" />
          <p class="mb-[0px] mt-[10px] text-[13px] text-[#69707e]">현재 값: {{ publishState }}</p>
        </div>
      </div>
      <CodeBlock :code="optionsCode" />
    </section>

    <section class="docs-section">
      <h2>상태</h2>
      <div class="example-preview">
        <div class="grid w-full grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[24px]">
          <PxInputToggle v-model="prevented" label="변경만 차단" description="비활성화 스타일 없이 클릭을 막습니다." prevent />
          <PxInputToggle v-model="disabledValue" label="비활성화" disabled />
          <PxInputToggle v-model="viewValue" label="조회 모드" viewMode />
        </div>
      </div>
      <CodeBlock :code="stateCode" />
    </section>

    <section class="docs-section">
      <h2>Slots</h2>
      <DocsTable :headers="slotHeaders" :rows="slotRows" />
      <div class="example-preview mt-[20px]">
        <div class="grid w-full grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[24px]">
          <PxInputToggle v-model="tooltipValue" label="자동 승인" description="조건을 만족한 요청을 자동 승인합니다.">
            <template #tooltip> 승인 조건은 운영 정책에서 설정할 수 있습니다. </template>
          </PxInputToggle>
          <PxInputToggle v-model="helperIconValue" label="검토 알림" helperText="담당자에게 변경 사항을 알립니다.">
            <template #helperIcon>
              <PxIcon name="icon-information-circle" class="h-[15px] w-[15px] text-[#69707e] [&_svg]:h-[15px] [&_svg]:w-[15px]" />
            </template>
          </PxInputToggle>
        </div>
      </div>
      <CodeBlock :code="slotCode" />
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
      <p class="m-[0px] max-w-[760px] text-[14px] leading-[1.75] text-[#69707e]">
        입력 박스와 내부 <code>PxToggle</code> 클래스를 조합해 프로젝트 전용 크기와 스타일을 적용할 수 있습니다.
      </p>
      <DocsTable class="mt-[20px]" :headers="classHeaders" :rows="classRows" />

      <h3 class="mb-[12px] mt-[28px] text-[17px] font-bold text-[#242832]">사용자 클래스 추가</h3>
      <div class="example-preview">
        <div class="w-full max-w-[640px]">
          <PxInputToggle v-model="customValue" class="project-input-toggle" label="프로젝트 설정" description="프로젝트 전용 스타일을 적용했습니다." />
        </div>
      </div>
      <CodeBlock :code="customClassCode" />
    </section>

    <PxDialogTooltip />
  </article>
</template>

<style>
.px-inputToggle.project-input-toggle .px-input--field {
  @apply min-h-[56px] rounded-[14px] border-[2px] border-[#0891b2] bg-[#ecfeff] px-[16px] py-[10px] shadow-[0_10px_24px_rgba(8,145,178,0.2)];
}

.px-inputToggle.project-input-toggle .px-toggle--box {
  @apply h-[24px] w-[44px] bg-[#a5f3fc] p-[3px];
}

.px-inputToggle.project-input-toggle .px-toggle--box.selected {
  @apply bg-[#ea580c];
}

.px-inputToggle.project-input-toggle .px-toggle--box .dot {
  @apply h-[18px] w-[18px];
}
</style>
