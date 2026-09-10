<script setup>
import { ref } from 'vue'
import CodeBlock from '../../components/CodeBlock.vue'
import DocsTable from '../../components/DocsTable.vue'

const featureOptions = ['검색', '알림', '내보내기']
const selectedFeatures = ref(['검색', '알림'])

const channelOptions = [
  { value: 'email', label: '이메일' },
  { value: 'sms', label: '문자' },
  { value: 'push', label: '푸시' },
]
const selectedChannels = ref(['email', 'push'])
const verticalValue = ref(['읽기'])
const disabledValue = ref(['월'])
const viewValue = ref(['서울', '부산'])
const tooltipValue = ref(['필수'])
const customValue = ref(['기획', '디자인'])

const optionLabel = (option) => option?.label
const optionValue = (option) => option?.value

const basicCode = `const options = ['검색', '알림', '내보내기']
const selectedFeatures = ref(['검색', '알림'])

<PxMultiCheckbox
  id="features"
  v-model="selectedFeatures"
  label="사용할 기능"
  :options="options"
/>`

const objectCode = `const channelOptions = [
  { value: 'email', label: '이메일' },
  { value: 'sms', label: '문자' },
  { value: 'push', label: '푸시' },
]

<PxMultiCheckbox
  id="channels"
  v-model="selectedChannels"
  label="알림 채널"
  :options="channelOptions"
  :optionsLabel="(option) => option?.label"
  :optionsValue="(option) => option?.value"
/>`

const stateCode = `<PxMultiCheckbox
  id="permissions"
  v-model="permissions"
  label="권한"
  :options="['읽기', '쓰기', '삭제']"
  row
/>

<PxMultiCheckbox
  id="disabled-multi-checkbox"
  v-model="days"
  :options="['월', '화', '수']"
  disabled
/>

<PxMultiCheckbox
  id="view-multi-checkbox"
  v-model="regions"
  :options="['서울', '부산', '제주']"
  viewMode
/>`

const tooltipCode = `<PxMultiCheckbox
  id="agreements"
  v-model="agreements"
  label="약관 동의"
  labelHelper="필수"
  required
  :options="['필수', '선택']"
  md="**필수 약관**에 동의해야 서비스를 이용할 수 있습니다."
/>

<PxDialogTooltip />`

const customClassCode = `<PxMultiCheckbox
  id="project-roles"
  v-model="roles"
  class="project-multi-checkbox"
  label="담당 분야"
  :options="['기획', '디자인', '개발']"
/>

<style>
.project-multi-checkbox .px-multiCheckbox {
  gap: 12px;
}

.project-multi-checkbox .px-multiCheckbox > div:not(:last-child) {
  margin-right: 0;
}

.project-multi-checkbox .px-checkbox--box {
  width: 22px;
  height: 22px;
  border-width: 2px;
  border-radius: 5px;
  border-color: #7c3aed;
  background-color: #faf5ff;
  background-size: 20px;
}

.project-multi-checkbox .px-checkbox--box.selected {
  border-color: #6d28d9;
  background-color: #7c3aed;
  box-shadow: 0 0 0 4px rgba(124, 58, 237, 0.18);
}

.project-multi-checkbox .px-checkbox--text {
  color: #5b21b6;
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
  { name: 'id', type: 'String', defaultValue: '-', description: '각 옵션의 ID와 에러 식별에 사용' },
  { name: 'modelValue', type: 'Array', defaultValue: '-', description: '<code>v-model</code>로 연결되는 선택값 배열' },
  { name: 'options', type: 'Array', defaultValue: '-', description: '선택 가능한 필수 옵션 배열' },
  { name: 'optionsLabel', type: 'Function', defaultValue: 'option => option', description: '옵션에서 화면에 표시할 값을 반환' },
  { name: 'optionsValue', type: 'Function', defaultValue: 'option => option', description: '옵션에서 선택값 배열에 저장할 값을 반환' },
  { name: 'disabled', type: 'Boolean', defaultValue: 'false', description: '모든 체크박스 비활성화' },
  { name: 'row', type: 'Boolean', defaultValue: 'false', description: '옵션을 세로 방향으로 배치' },
  { name: 'label', type: 'String', defaultValue: '-', description: '옵션 그룹 위에 표시할 라벨' },
  { name: 'viewMode', type: 'Boolean', defaultValue: 'false', description: '현재 선택 상태를 조회용으로 표시하고 값 변경 차단' },
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
  { name: 'update:modelValue', payload: 'Array', description: '옵션을 선택하거나 해제할 때 발생하며 새로운 선택값 배열로 <code>v-model</code>을 갱신' },
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
  { category: '최상위', className: '<code>labelSwitch</code>, <code>viewMode</code>', description: '라벨과 Multi Checkbox 전체 및 조회 모드 상태' },
  { category: '옵션 목록', className: '<code>px-multiCheckbox</code>, <code>isRow</code>', description: '체크박스 목록과 세로 배치 상태' },
  { category: '클릭 영역', className: '<code>px-checkbox--wrapper</code>', description: '각 옵션의 체크 표시와 문구를 감싸는 영역' },
  { category: '선택 표시', className: '<code>px-checkbox--box</code>, <code>selected</code>', description: '체크박스와 선택 상태' },
  { category: '옵션 문구', className: '<code>px-checkbox--text</code>, <code>hasText</code>', description: '각 옵션의 표시 문구' },
  { category: '상태', className: '<code>disabled</code>, <code>error</code>, <code>viewMode</code>', description: '비활성화, 에러 및 조회 상태' },
]
</script>

<template>
  <article class="docs-page">
    <p class="docs-eyebrow">FORM</p>
    <h1>PxMultiCheckbox</h1>
    <p class="docs-lead">여러 옵션을 선택하고 선택값 배열을 관리하는 체크박스 그룹입니다.</p>

    <section class="docs-section">
      <h2>기본 사용</h2>
      <div class="example-preview">
        <PxMultiCheckbox
          id="docs-multi-checkbox-features"
          v-model="selectedFeatures"
          label="사용할 기능"
          :options="featureOptions"
        />
      </div>
      <CodeBlock :code="basicCode" />
    </section>

    <section class="docs-section">
      <h2>객체 옵션</h2>
      <p class="m-[0px] max-w-[760px] text-[14px] leading-[1.75] text-[#69707e]">
        객체 배열은 <code>optionsLabel</code>과 <code>optionsValue</code>로 표시값과 저장값을 분리합니다.
      </p>
      <div class="example-preview mt-[20px]">
        <PxMultiCheckbox
          id="docs-multi-checkbox-channels"
          v-model="selectedChannels"
          label="알림 채널"
          :options="channelOptions"
          :optionsLabel="optionLabel"
          :optionsValue="optionValue"
        />
      </div>
      <CodeBlock :code="objectCode" />
    </section>

    <section class="docs-section">
      <h2>배치와 상태</h2>
      <div class="example-preview">
        <div class="grid w-full grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-[28px]">
          <PxMultiCheckbox
            id="docs-multi-checkbox-vertical"
            v-model="verticalValue"
            label="권한"
            :options="['읽기', '쓰기', '삭제']"
            row
          />
          <PxMultiCheckbox
            id="docs-multi-checkbox-disabled"
            v-model="disabledValue"
            label="비활성화"
            :options="['월', '화', '수']"
            disabled
          />
          <PxMultiCheckbox
            id="docs-multi-checkbox-view"
            v-model="viewValue"
            label="조회 모드"
            :options="['서울', '부산', '제주']"
            viewMode
          />
        </div>
      </div>
      <CodeBlock :code="stateCode" />
    </section>

    <section class="docs-section">
      <h2>라벨 도움말</h2>
      <div class="example-preview">
        <PxMultiCheckbox
          id="docs-multi-checkbox-tooltip"
          v-model="tooltipValue"
          label="약관 동의"
          labelHelper="필수"
          required
          :options="['필수', '선택']"
          md="**필수 약관**에 동의해야 서비스를 이용할 수 있습니다."
        />
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
        <PxMultiCheckbox
          id="docs-multi-checkbox-custom"
          v-model="customValue"
          class="project-multi-checkbox"
          label="담당 분야"
          :options="['기획', '디자인', '개발']"
        />
      </div>
      <CodeBlock :code="customClassCode" />
    </section>

    <PxDialogTooltip />
  </article>
</template>

<style>
.project-multi-checkbox .px-multiCheckbox {
  @apply gap-[12px];
}

.project-multi-checkbox .px-multiCheckbox > div:not(:last-child) {
  @apply mr-[0px];
}

.project-multi-checkbox .px-checkbox--box {
  @apply h-[22px] w-[22px] rounded-[5px] border-[2px] border-[#7c3aed] bg-[#faf5ff] bg-[length:20px_20px];
}

.project-multi-checkbox .px-checkbox--box.selected {
  @apply border-[#6d28d9] bg-[#7c3aed] shadow-[0_0_0_4px_rgba(124,58,237,0.18)];
}

.project-multi-checkbox .px-checkbox--text {
  @apply font-bold text-[#5b21b6];
}
</style>
