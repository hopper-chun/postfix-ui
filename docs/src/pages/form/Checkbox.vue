<script setup>
import { ref } from 'vue'
import CodeBlock from '../../components/CodeBlock.vue'
import DocsTable from '../../components/DocsTable.vue'

const agreed = ref(false)
const marketing = ref(true)
const consent = ref('N')
const disabledValue = ref(true)
const viewValue = ref(true)
const tooltipValue = ref(false)
const customValue = ref(true)

const basicCode = `const agreed = ref(false)

<PxCheckbox id="terms" v-model="agreed">
  이용약관에 동의합니다.
</PxCheckbox>`

const labelCode = `<PxCheckbox
  id="marketing"
  v-model="marketing"
  label="마케팅 수신"
  labelHelper="선택"
>
  이메일과 문자로 소식을 받습니다.
</PxCheckbox>`

const optionsCode = `const consent = ref('N')

<PxCheckbox
  id="consent"
  v-model="consent"
  :options="['N', 'Y']"
>
  개인정보 수집에 동의합니다.
</PxCheckbox>

<!-- 해제: 'N', 선택: 'Y' -->`

const stateCode = `<PxCheckbox id="disabled-checkbox" v-model="value" disabled>
  비활성화
</PxCheckbox>

<PxCheckbox id="view-checkbox" v-model="value" viewMode>
  조회 모드
</PxCheckbox>`

const tooltipCode = `<PxCheckbox
  id="required-consent"
  v-model="consent"
  label="개인정보 동의"
  labelHelper="필수"
  required
  md="**필수 동의** 항목은 서비스 이용을 위해 선택해야 합니다."
>
  개인정보 처리방침에 동의합니다.
</PxCheckbox>

<PxDialogTooltip />`

const customClassCode = `<PxCheckbox
  id="project-checkbox"
  v-model="checked"
  class="project-checkbox"
>
  프로젝트 체크박스
</PxCheckbox>

<style>
.project-checkbox .px-checkbox--box {
  width: 22px;
  height: 22px;
  border-width: 2px;
  border-radius: 5px;
  border-color: #059669;
  background-color: #ecfdf5;
  background-size: 20px;
}

.project-checkbox .px-checkbox--box.selected {
  border-color: #047857;
  background-color: #059669;
  box-shadow: 0 0 0 4px rgba(5, 150, 105, 0.18);
}

.project-checkbox .px-checkbox--text.hasText {
  margin-left: 8px;
  color: #065f46;
  font-size: 15px;
  font-weight: 700;
}
</style>`

const propHeaders = [
  { field: 'name', label: '이름', code: true },
  { field: 'type', label: '타입' },
  { field: 'defaultValue', label: '기본값' },
  { field: 'description', label: '설명', html: true },
]

const propRows = [
  { name: 'id', type: 'String', defaultValue: '-', description: 'input과 label 연결 및 에러 식별에 사용하는 필수 ID' },
  { name: 'modelValue', type: 'String | Number | Boolean', defaultValue: '-', description: '<code>v-model</code>로 연결되는 현재 값' },
  { name: 'options', type: 'Array', defaultValue: '[false, true]', description: '해제와 선택에 사용할 값. 첫 번째 값은 해제, 두 번째 값은 선택' },
  { name: 'disabled', type: 'Boolean', defaultValue: 'false', description: '체크박스 비활성화' },
  { name: 'viewMode', type: 'Boolean', defaultValue: 'false', description: '현재 상태를 조회용으로 표시하고 값 변경 차단' },
  { name: 'label', type: 'String', defaultValue: '-', description: '체크박스 위에 표시할 라벨' },
  { name: 'labelHelper', type: 'String', defaultValue: '-', description: '라벨 옆 보조 문구' },
  { name: 'required', type: 'Boolean', defaultValue: 'false', description: '라벨에 필수 표시' },
  { name: 'hover', type: 'Boolean', defaultValue: 'true', description: '라벨 툴팁의 hover 동작 여부' },
  { name: 'md', type: 'String', defaultValue: '-', description: '라벨 툴팁 다이얼로그에 표시할 콘텐츠' },
]

const eventHeaders = [
  { field: 'name', label: '이름', code: true },
  { field: 'payload', label: '전달값', code: true },
  { field: 'description', label: '설명', html: true },
]

const eventRows = [
  { name: 'update:modelValue', payload: 'options[0] | options[1]', description: '선택 상태가 바뀔 때 발생하며 <code>v-model</code>을 갱신' },
  { name: 'onClickTooltip', payload: 'Event', description: '라벨의 도움말 아이콘을 클릭할 때 발생' },
]

const slotHeaders = [
  { field: 'name', label: '이름', code: true },
  { field: 'description', label: '설명' },
]

const slotRows = [
  { name: 'default', description: '체크박스 오른쪽에 표시할 문구 또는 콘텐츠' },
  { name: 'tooltip', description: '라벨의 도움말 아이콘에 표시할 콘텐츠' },
]

const classHeaders = [
  { field: 'category', label: '구분' },
  { field: 'className', label: '클래스', html: true },
  { field: 'description', label: '용도', html: true },
]

const classRows = [
  { category: '최상위', className: '<code>labelSwitch</code>, <code>viewMode</code>', description: '라벨과 Checkbox 전체 및 조회 모드 상태' },
  { category: '체크박스', className: '<code>px-checkbox</code>', description: 'input과 표시 영역을 감싸는 컨테이너' },
  { category: '클릭 영역', className: '<code>px-checkbox--wrapper</code>', description: '체크 표시와 문구를 감싸는 영역' },
  { category: '선택 표시', className: '<code>px-checkbox--box</code>, <code>selected</code>', description: '체크박스와 선택 상태' },
  { category: '문구', className: '<code>px-checkbox--text</code>, <code>hasText</code>', description: '기본 슬롯의 표시 영역' },
  { category: '상태', className: '<code>disabled</code>, <code>error</code>, <code>viewMode</code>', description: '비활성화, 에러 및 조회 상태' },
]
</script>

<template>
  <article class="docs-page">
    <p class="docs-eyebrow">FORM</p>
    <h1>PxCheckbox</h1>
    <p class="docs-lead">두 상태를 전환하고 각 상태에 원하는 값을 연결할 수 있는 단일 체크박스입니다.</p>

    <section class="docs-section">
      <h2>기본 사용</h2>
      <div class="example-preview">
        <PxCheckbox id="docs-checkbox-terms" v-model="agreed">이용약관에 동의합니다.</PxCheckbox>
      </div>
      <CodeBlock :code="basicCode" />
    </section>

    <section class="docs-section">
      <h2>라벨과 문구</h2>
      <div class="example-preview">
        <PxCheckbox id="docs-checkbox-marketing" v-model="marketing" label="마케팅 수신" labelHelper="선택">
          이메일과 문자로 소식을 받습니다.
        </PxCheckbox>
      </div>
      <CodeBlock :code="labelCode" />
    </section>

    <section class="docs-section">
      <h2>상태값 지정</h2>
      <p class="m-[0px] max-w-[760px] text-[14px] leading-[1.75] text-[#69707e]">
        <code>options</code>의 첫 번째 값은 해제, 두 번째 값은 선택 상태에 대응합니다.
      </p>
      <div class="example-preview mt-[20px]">
        <div class="flex items-center gap-[14px]">
          <PxCheckbox id="docs-checkbox-consent" v-model="consent" :options="['N', 'Y']">
            개인정보 수집에 동의합니다.
          </PxCheckbox>
          <PxTag color="gray_border">{{ consent }}</PxTag>
        </div>
      </div>
      <CodeBlock :code="optionsCode" />
    </section>

    <section class="docs-section">
      <h2>상태</h2>
      <div class="example-preview">
        <div class="flex flex-wrap gap-[28px]">
          <PxCheckbox id="docs-checkbox-disabled" v-model="disabledValue" disabled>비활성화</PxCheckbox>
          <PxCheckbox id="docs-checkbox-view" v-model="viewValue" viewMode>조회 모드</PxCheckbox>
        </div>
      </div>
      <CodeBlock :code="stateCode" />
    </section>

    <section class="docs-section">
      <h2>라벨 도움말</h2>
      <div class="example-preview">
        <PxCheckbox
          id="docs-checkbox-tooltip"
          v-model="tooltipValue"
          label="개인정보 동의"
          labelHelper="필수"
          required
          md="**필수 동의** 항목은 서비스 이용을 위해 선택해야 합니다."
        >
          개인정보 처리방침에 동의합니다.
        </PxCheckbox>
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
        <PxCheckbox id="docs-checkbox-custom" v-model="customValue" class="project-checkbox">프로젝트 체크박스</PxCheckbox>
      </div>
      <CodeBlock :code="customClassCode" />
    </section>

    <PxDialogTooltip />
  </article>
</template>

<style>
.project-checkbox .px-checkbox--box {
  @apply h-[22px] w-[22px] rounded-[5px] border-[2px] border-[#059669] bg-[#ecfdf5] bg-[length:20px_20px];
}

.project-checkbox .px-checkbox--box.selected {
  @apply border-[#047857] bg-[#059669] shadow-[0_0_0_4px_rgba(5,150,105,0.18)];
}

.project-checkbox .px-checkbox--text.hasText {
  @apply ml-[8px] text-[15px] font-bold text-[#065f46];
}
</style>
