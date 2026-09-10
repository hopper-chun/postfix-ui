<script setup>
import { onUnmounted, ref } from 'vue'
import { useError } from '@postfix/ui'
import CodeBlock from '../../components/CodeBlock.vue'
import DocsTable from '../../components/DocsTable.vue'

const channels = ref(['이메일', '앱 푸시'])
const permissions = ref(['read', 'write'])
const clearableValues = ref(['진행 중'])
const disabledValues = ref(['이메일'])
const preventValues = ref(['SMS'])
const viewValues = ref(['이메일', '앱 푸시'])
const customValues = ref(['design'])
const errorValues = ref([])

const channelOptions = ['이메일', 'SMS', '앱 푸시']
const permissionOptions = [
  { code: 'read', name: '조회' },
  { code: 'write', name: '수정' },
  { code: 'delete', name: '삭제' },
]

const { causeError, clearError } = useError()
const showError = () => causeError({ id: 'docs-multi-button-list-error', msg: '알림 채널을 하나 이상 선택해주세요.' })

onUnmounted(() => clearError())

const basicCode = `const channels = ref(['이메일', '앱 푸시'])

<PxMultiButtonList
  id="channels"
  v-model="channels"
  :options="['이메일', 'SMS', '앱 푸시']"
/>

<!-- channels: ['이메일', '앱 푸시'] -->`

const objectCode = `const permissions = ref(['read', 'write'])
const permissionOptions = [
  { code: 'read', name: '조회' },
  { code: 'write', name: '수정' },
  { code: 'delete', name: '삭제' },
]

<PxMultiButtonList
  id="permissions"
  v-model="permissions"
  :options="permissionOptions"
  :optionsLabel="(option) => option.name"
  :optionsValue="(option) => option.code"
/>
`

const clearCode = `const statuses = ref(['진행 중'])

<PxMultiButtonList
  id="statuses"
  v-model="statuses"
  :options="['대기', '진행 중', '완료']"
  clearButton="전체"
/>

<!-- 전체 버튼은 선택 배열을 []로 초기화합니다. -->`

const labelCode = `<PxMultiButtonList
  id="notification-channel"
  v-model="channels"
  label="알림 채널"
  labelHelper="복수 선택"
  helperText="알림을 받을 채널을 모두 선택해주세요."
  required
  md="중요 알림은 선택한 **모든 채널**로 발송됩니다."
  :options="channelOptions"
/>

<PxDialogTooltip />`

const stateCode = `<PxMultiButtonList
  id="disabled-channels"
  v-model="channels"
  :options="channelOptions"
  disabled
/>

<PxMultiButtonList
  id="prevent-channels"
  v-model="channels"
  :options="channelOptions"
  prevent
/>

<PxMultiButtonList
  id="view-channels"
  v-model="channels"
  label="알림 채널"
  :options="channelOptions"
  viewMode
/>
`

const errorCode = `const channels = ref([])
const { causeError, clearError } = useError()

<PxMultiButtonList
  id="notification-channel"
  v-model="channels"
  :options="channelOptions"
/>

causeError({
  id: 'notification-channel',
  msg: '알림 채널을 하나 이상 선택해주세요.',
})

// 내부 HelperText가 같은 id의 PxError를 표시합니다.
clearError('notification-channel')`

const slotCode = `<PxMultiButtonList
  id="teams"
  v-model="teams"
  :options="[
    { value: 'design', label: '디자인' },
    { value: 'frontend', label: '프론트엔드' },
    { value: 'backend', label: '백엔드' },
  ]"
  :optionsLabel="(option) => option.label"
  :optionsValue="(option) => option.value"
>
  <template #default="{ isSelect, optionsLabel }">
    <PxButton size="sm" :color="isSelect ? 'pri' : 'gray_border'">
      {{ isSelect ? '✓ ' : '+ ' }}{{ optionsLabel }}
    </PxButton>
  </template>

  <template #helperIcon>
    <PxIcon name="icon-information-circle" />
  </template>
</PxMultiButtonList>`

const customClassCode = `<PxMultiButtonList
  id="project-multi-filter"
  v-model="filters"
  class="project-multi-button-list"
  :options="['기획', '디자인', '개발']"
/>

<style>
/* Postfix UI 스타일시트 뒤에 불러옵니다. */
.project-multi-button-list .px-buttonList--wrapper {
  gap: 6px;
  padding: 10px;
  border: 2px solid #10b981;
  border-radius: 16px;
  background-color: #ecfdf5;
}

.project-multi-button-list .px-buttonList--wrapper > div {
  margin: 0;
}

.project-multi-button-list .px-btn {
  min-width: 88px;
  border-radius: 12px;
  background-color: #d1fae5;
  color: #065f46;
  font-weight: 800;
}

.project-multi-button-list .px-btn.pri {
  border-color: #047857;
  background-color: #059669;
  box-shadow: 0 8px 18px rgba(5, 150, 105, 0.3);
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
  {
    name: 'modelValue',
    type: 'Array',
    defaultValue: '-',
    description: '<code>v-model</code>로 연결되는 선택값 배열. Prop 타입 선언과 달리 내부에서 배열 메서드를 사용하므로 반드시 배열 필요',
  },
  { name: 'options', type: 'Array', defaultValue: '-', description: '버튼으로 표시할 옵션 배열' },
  { name: 'optionsLabel', type: 'Function', defaultValue: '(option) => option', description: '옵션에서 화면에 표시할 라벨 반환' },
  { name: 'optionsValue', type: 'Function', defaultValue: '(option) => option', description: '옵션에서 선택 배열에 저장할 값 반환' },
  { name: 'label', type: 'String', defaultValue: '-', description: '버튼 목록 위 라벨' },
  { name: 'labelHelper', type: 'String', defaultValue: '-', description: '편집 모드의 라벨 옆 보조 문구' },
  { name: 'helperText', type: 'String', defaultValue: '-', description: '버튼 목록 아래 안내 문구' },
  { name: 'required', type: 'Boolean', defaultValue: 'false', description: '라벨에 필수 표시' },
  { name: 'md', type: 'String', defaultValue: '-', description: '라벨 도움말 다이얼로그에 표시할 Markdown 문구' },
  { name: 'disabled', type: 'Boolean', defaultValue: 'false', description: '선택 변경 차단. 내부 PxButton에는 disabled 스타일이 전달되지 않음' },
  { name: 'prevent', type: 'Boolean', defaultValue: 'false', description: 'disabled 스타일 없이 선택 변경만 차단' },
  { name: 'clearButton', type: 'String', defaultValue: '-', description: '선택 배열을 비우는 첫 번째 버튼의 문구' },
  { name: 'viewMode', type: 'Boolean', defaultValue: 'false', description: '버튼 대신 선택 라벨들을 쉼표로 연결해 조회 형태로 표시' },
  { name: 'color', type: 'String', defaultValue: 'pri', description: '선택된 PxButton과 빈 선택 clearButton의 color' },
  { name: 'subColor', type: 'String', defaultValue: 'inactive', description: '선택되지 않은 PxButton의 color' },
  { name: 'size', type: 'String', defaultValue: 'md', description: '각 PxButton의 size' },
]

const eventHeaders = [
  { field: 'name', label: '이름', code: true },
  { field: 'payload', label: '전달값', code: true },
  { field: 'description', label: '설명' },
]

const eventRows = [{ name: 'update:modelValue', payload: 'Array', description: '옵션 선택 또는 초기화 시 변경된 선택값 배열 전달' }]

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
  { category: '최상위', className: '<code>px-multiButtonList</code>', description: '라벨, 버튼 목록과 HelperText 전체 영역' },
  { category: '라벨 묶음', className: '<code>labelSwitch</code>', description: '편집 모드의 라벨과 입력 영역' },
  { category: '버튼 목록', className: '<code>px-buttonList--wrapper</code>', description: '초기화 버튼과 옵션 버튼을 flex 형태로 배치' },
  { category: '내부 버튼', className: '<code>px-btn</code> 및 PxButton 상태 클래스', description: '초기화 및 각 옵션을 표시하는 PxButton' },
]
</script>

<template>
  <article class="docs-page">
    <p class="docs-eyebrow">LIST</p>
    <h1>PxMultiButtonList</h1>
    <p class="docs-lead">여러 버튼을 동시에 선택하고 선택값 배열을 관리하는 다중 선택 버튼 목록입니다.</p>

    <section class="docs-section">
      <h2>기본 사용</h2>
      <p class="docs-note">
        <code>modelValue</code>는 내부에서 <code>forEach</code>, <code>includes</code>, <code>length</code>를 사용하므로 반드시 배열로 초기화합니다.
      </p>
      <div class="example-preview mt-[20px]">
        <div class="w-full max-w-[720px]">
          <PxMultiButtonList id="docs-channels" v-model="channels" :options="channelOptions" subColor="gray_border" />
          <p class="mb-[0px] mt-[12px] text-[13px] text-[#69707e]">선택값: <code>{{ channels }}</code></p>
        </div>
      </div>
      <CodeBlock :code="basicCode" />
    </section>

    <section class="docs-section">
      <h2>객체 옵션</h2>
      <div class="example-preview">
        <div class="w-full max-w-[720px]">
          <PxMultiButtonList
            id="docs-permissions"
            v-model="permissions"
            :options="permissionOptions"
            :optionsLabel="(option) => option.name"
            :optionsValue="(option) => option.code"
            subColor="gray_border"
          />
          <p class="mb-[0px] mt-[12px] text-[13px] text-[#69707e]">선택값: <code>{{ permissions }}</code></p>
        </div>
      </div>
      <CodeBlock :code="objectCode" />
    </section>

    <section class="docs-section">
      <h2>전체 선택 해제</h2>
      <p class="m-[0px] max-w-[760px] text-[14px] leading-[1.75] text-[#69707e]">
        <code>clearButton</code>을 지정하면 맨 앞에 선택 배열을 비우는 버튼이 추가됩니다. 선택값이 비어 있을 때 이 버튼에 선택 색상이 적용됩니다.
      </p>
      <div class="example-preview mt-[20px]">
        <div class="w-full max-w-[720px]">
          <PxMultiButtonList
            id="docs-clearable-status"
            v-model="clearableValues"
            :options="['대기', '진행 중', '완료']"
            clearButton="전체"
            subColor="gray_border"
          />
          <p class="mb-[0px] mt-[12px] text-[13px] text-[#69707e]">선택값: <code>{{ clearableValues }}</code></p>
        </div>
      </div>
      <CodeBlock :code="clearCode" />
    </section>

    <section class="docs-section">
      <h2>라벨과 안내 문구</h2>
      <div class="example-preview">
        <div class="w-full max-w-[720px]">
          <PxMultiButtonList
            id="docs-notification-channel"
            v-model="channels"
            label="알림 채널"
            labelHelper="복수 선택"
            helperText="알림을 받을 채널을 모두 선택해주세요."
            required
            md="중요 알림은 선택한 **모든 채널**로 발송됩니다."
            :options="channelOptions"
            subColor="gray_border"
          />
        </div>
      </div>
      <CodeBlock :code="labelCode" />
    </section>

    <section class="docs-section">
      <h2>상태</h2>
      <div class="example-preview">
        <div class="grid w-full gap-[24px]">
          <PxMultiButtonList id="docs-multi-disabled" v-model="disabledValues" label="비활성화" :options="channelOptions" subColor="gray_border" disabled />
          <PxMultiButtonList id="docs-multi-prevent" v-model="preventValues" label="변경 방지" :options="channelOptions" subColor="gray_border" prevent />
          <PxMultiButtonList id="docs-multi-view" v-model="viewValues" label="조회 모드" :options="channelOptions" viewMode />
        </div>
      </div>
      <p class="docs-note mt-[16px]">
        <code>disabled</code>와 <code>prevent</code> 모두 값 변경을 막습니다. 현재 구현에서는 disabled도 내부 PxButton에 전달되지 않아 시각적으로는 prevent와 같습니다.
      </p>
      <CodeBlock :code="stateCode" />
    </section>

    <section class="docs-section">
      <h2>에러 표시</h2>
      <div class="example-preview">
        <div class="w-full max-w-[720px]">
          <PxMultiButtonList
            id="docs-multi-button-list-error"
            v-model="errorValues"
            label="알림 채널"
            :options="channelOptions"
            subColor="gray_border"
          />
          <div class="mt-[12px] flex flex-wrap gap-[6px]">
            <PxButton size="xs" @click="showError">에러 표시</PxButton>
            <PxButton size="xs" color="gray_border" @click="clearError('docs-multi-button-list-error')">에러 해제</PxButton>
          </div>
        </div>
      </div>
      <CodeBlock :code="errorCode" />
    </section>

    <section class="docs-section">
      <h2>Slots</h2>
      <div class="example-preview">
        <div class="w-full max-w-[720px]">
          <PxMultiButtonList
            id="docs-multi-slot"
            v-model="customValues"
            helperText="프로젝트에 참여할 팀을 모두 선택해주세요."
            :options="[
              { value: 'design', label: '디자인' },
              { value: 'frontend', label: '프론트엔드' },
              { value: 'backend', label: '백엔드' },
            ]"
            :optionsLabel="(option) => option.label"
            :optionsValue="(option) => option.value"
          >
            <template #default="{ isSelect, optionsLabel }">
              <PxButton size="sm" :color="isSelect ? 'pri' : 'gray_border'">{{ isSelect ? '✓ ' : '+ ' }}{{ optionsLabel }}</PxButton>
            </template>
            <template #helperIcon>
              <PxIcon name="icon-information-circle" />
            </template>
          </PxMultiButtonList>
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
        <PxMultiButtonList
          id="docs-project-multi-button-list"
          v-model="customValues"
          class="project-multi-button-list"
          :options="['design', 'frontend', 'backend']"
          subColor="gray_border"
        />
      </div>
      <CodeBlock :code="customClassCode" />
    </section>

    <PxDialogTooltip />
  </article>
</template>

<style>
.project-multi-button-list .px-buttonList--wrapper {
  gap: 6px;
  padding: 10px;
  border: 2px solid #10b981;
  border-radius: 16px;
  background-color: #ecfdf5;
}

.project-multi-button-list .px-buttonList--wrapper > div {
  margin: 0;
}

.project-multi-button-list .px-btn {
  min-width: 88px;
  border-radius: 12px;
  background-color: #d1fae5;
  color: #065f46;
  font-weight: 800;
}

.project-multi-button-list .px-btn.pri {
  border-color: #047857;
  background-color: #059669;
  box-shadow: 0 8px 18px rgba(5, 150, 105, 0.3);
  color: #ffffff;
}
</style>
