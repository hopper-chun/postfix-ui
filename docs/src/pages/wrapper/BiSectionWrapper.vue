<script setup>
import { ref } from 'vue'
import CodeBlock from '../../components/CodeBlock.vue'
import DocsTable from '../../components/DocsTable.vue'

const mode = ref('view')

const basicCode = `const mode = ref('view')

<PxBiSectionWrapper
  label="배송 정보"
  badge="2개 항목"
  md="배송지 변경은 출고 전에만 가능합니다."
  :mode="mode"
  isFold
  @onEdit="mode = 'edit'"
>
  <template #TOP-RIGHT>
    <PxButton v-if="mode === 'edit'" size="sm" @click="mode = 'view'">
      완료
    </PxButton>
  </template>

  <div>
    <AddressField label="수령인" value="김민준" />
    <AddressField label="연락처" value="010-1234-5678" />
  </div>
</PxBiSectionWrapper>

<!-- md 툴팁을 표시할 페이지에 한 번 배치합니다. -->
<PxDialogTooltip />`

const slotLocationCode = `<PxBiSectionWrapper
  label="제목"
  mode="view"
  isFold
>
  <template #tooltip>
    tooltip 슬롯의 실제 도움말 내용
  </template>

  <template #button>
    <PxTag>button</PxTag>
  </template>

  <template #TOP-RIGHT-L="{ viewMode }">
    <PxTag>TOP-RIGHT-L · {{ viewMode }}</PxTag>
  </template>

  <template #TOP-RIGHT>
    <PxTag>TOP-RIGHT</PxTag>
  </template>

  <template #default="{ viewMode }">
    <div>
      <div>
        <PxTag>default · {{ viewMode }}</PxTag>
      </div>
    </div>
  </template>

  <template #expand="{ viewMode }">
    <div>
      <div>
        <PxTag>expand · {{ viewMode }}</PxTag>
      </div>
    </div>
  </template>
</PxBiSectionWrapper>`

const separatorCode = `<PxBiSectionWrapper
  label="배송 정보"
  mode="read"
  isReadOnly
>
  <!-- 직계 div 하나가 하나의 가로 구역이 됩니다. -->
  <div>
    <PxFormForView label="수령인" viewMode>김민준</PxFormForView>
    <PxFormForView label="연락처" viewMode>010-1234-5678</PxFormForView>
  </div>

  <!-- 다음 직계 div 앞에는 가로 구분선이 생깁니다. -->
  <div>
    <PxFormForView label="배송 방식" viewMode>택배</PxFormForView>
    <PxFormForView label="도착 예정" viewMode>내일 오후</PxFormForView>
  </div>
</PxBiSectionWrapper>`

const expandCode = `<PxBiSectionWrapper label="고급 설정" mode="read" isReadOnly>
  <div>
    <SettingField label="공개 범위" value="관리자" />
    <SettingField label="알림" value="사용" />
  </div>

  <template #expand="{ viewMode }">
    <div>
      숨겨진 추가 설정 · 현재 {{ viewMode ? '조회' : '편집' }} 모드
    </div>
  </template>
</PxBiSectionWrapper>`

const customClassCode = `<PxBiSectionWrapper
  class="project-bi-wrapper"
  label="배송 요약"
  badge="EXPRESS"
  helperText="오늘 출고 예정"
  mode="read"
  isReadOnly
>
  <div>
    <div><!-- 배송 상태 --></div>
    <div><!-- 도착 예정 --></div>
  </div>
</PxBiSectionWrapper>

<style>
.project-bi-wrapper.px-biSectionWrapper {
  border: 0;
  background-color: transparent;
}

.project-bi-wrapper .px-sectionWrapper--header {
  height: 56px;
  padding: 0 20px;
  border: 0;
  border-radius: 18px;
  background: linear-gradient(135deg, #164e63, #0284c7);
  box-shadow: 0 12px 28px rgba(3, 105, 161, 0.24);
  color: #ffffff;
}

.project-bi-wrapper .px-sectionWrapper--label {
  font-size: 18px;
}

.project-bi-wrapper .px-sectionWrapper--badge {
  border-color: #bae6fd;
  background-color: rgba(255, 255, 255, 0.14);
  color: #e0f2fe;
}

.project-bi-wrapper .px-sectionWrapper--helperText {
  color: #bae6fd;
}

.project-bi-wrapper .px-sectionWrapper--body {
  margin: 14px 0 0;
  overflow: hidden;
  border: 1px solid #bae6fd;
  border-radius: 18px;
  background-color: #ffffff;
  box-shadow: 0 12px 30px rgba(8, 47, 73, 0.1);
}
</style>`

const propHeaders = [
  { field: 'name', label: '이름', code: true },
  { field: 'defaultValue', label: '기본값' },
  { field: 'description', label: '설명', html: true },
]

const propRows = [
  { name: 'label', defaultValue: '-', description: '헤더 제목' },
  { name: 'mode', defaultValue: 'view', description: '<code>view</code>·<code>read</code>는 조회 상태, 그 외 값은 편집 상태' },
  { name: 'isReadOnly', defaultValue: 'false', description: '조회 상태의 기본 수정 버튼 숨김' },
  { name: 'required', defaultValue: 'false', description: '제목에 필수 표시점 추가' },
  { name: 'badge', defaultValue: '-', description: '제목 옆 배지 문구' },
  { name: 'helperText', defaultValue: '-', description: '제목 옆 보조 문구' },
  { name: 'md', defaultValue: '-', description: '클릭 시 전역 툴팁 다이얼로그에 표시할 Markdown 문구' },
  { name: 'isFold', defaultValue: 'false', description: '본문 접기 버튼 표시' },
  { name: 'isWide', defaultValue: 'false', description: '본문 안쪽 자식의 기본 여백 제거' },
  { name: 'useGrid', defaultValue: '자동', description: 'true는 2열, false는 단일 흐름. 생략하면 조회 모드만 2열' },
  { name: 'redTitle', defaultValue: 'false', description: '경고용 붉은 헤더 상태 클래스 적용' },
  { name: 'useLocale', defaultValue: 'false', description: '기본 수정 버튼 문구를 <code>edit</code>으로 표시' },
]

const slotHeaders = [
  { field: 'name', label: '이름', code: true },
  { field: 'scope', label: '슬롯 Props', code: true },
  { field: 'description', label: '설명' },
]

const slotRows = [
  { name: 'default', scope: '{ viewMode }', description: '기본 섹션 본문' },
  { name: 'tooltip', scope: '-', description: '제목 옆 도움말 내용. md 대신 사용 가능' },
  { name: 'button', scope: '-', description: 'helperText 뒤의 제목 영역' },
  { name: 'TOP-RIGHT-L', scope: '{ viewMode }', description: '기본 수정 버튼 왼쪽' },
  { name: 'TOP-RIGHT', scope: '-', description: '접기 버튼 뒤의 가장 오른쪽 영역' },
  { name: 'expand', scope: '{ viewMode }', description: '헤더 왼쪽 숨은 영역을 더블클릭하면 본문 뒤에 추가되는 콘텐츠' },
]

const eventHeaders = [
  { field: 'name', label: '이벤트', code: true },
  { field: 'payload', label: '전달값', code: true },
  { field: 'description', label: '설명' },
]

const eventRows = [
  { name: 'onEdit', payload: '-', description: '기본 수정 버튼 클릭' },
  { name: 'onClickTooltip', payload: 'HTML String', description: 'md 없이 tooltip 슬롯 아이콘을 클릭했을 때 내용 전달' },
]

const differenceHeaders = [
  { field: 'feature', label: '구분' },
  { field: 'section', label: 'PxSectionWrapper' },
  { field: 'bi', label: 'PxBiSectionWrapper' },
]

const differenceRows = [
  { feature: 'Grid', section: '기본 3열', bi: '기본 2열' },
  { feature: '내부 구분선', section: '가로 그룹선 + 3열 사이 세로선', bi: '가로 그룹선 + 2열 사이 세로선' },
  { feature: '편집 상태', section: 'create가 아니면 Grid 유지', bi: 'useGrid 미지정 시 단일 흐름' },
  { feature: '고유 기능', section: 'TOP-LEFT 슬롯', bi: '툴팁과 expand 슬롯' },
  { feature: '루트 클래스', section: 'px-multiSectionWrapper', bi: 'px-biSectionWrapper' },
]

const classHeaders = [
  { field: 'category', label: '구분' },
  { field: 'className', label: '클래스', html: true },
  { field: 'description', label: '용도' },
]

const classRows = [
  { category: '최상위', className: '<code>px-biSectionWrapper</code>', description: '컴포넌트 전체 영역' },
  { category: '헤더', className: '<code>px-sectionWrapper--header</code>', description: '제목과 동작 전체 영역' },
  { category: '제목', className: '<code>px-sectionWrapper--label</code>', description: 'label과 required 표시 영역' },
  { category: '툴팁', className: '<code>px-sectionWrapper--tooltip</code>', description: '도움말 아이콘 영역' },
  { category: '배지', className: '<code>px-sectionWrapper--badge</code>', description: 'badge 영역' },
  { category: '접기', className: '<code>px-sectionWrapper--fold</code>', description: '본문 접기 버튼' },
  { category: '본문', className: '<code>px-sectionWrapper--body</code>', description: '기본 슬롯과 expand 슬롯 영역' },
  { category: '접힘 영역', className: '<code>px-sectionWrapper-accContainer</code>', description: '본문 높이가 변경되는 영역' },
]
</script>

<template>
  <article class="docs-page">
    <p class="docs-eyebrow">WRAPPER</p>
    <h1>PxBiSectionWrapper</h1>
    <p class="docs-lead">조회 화면의 두 항목을 한 줄에 묶고, 편집 상태에서는 단일 흐름으로 전환하는 섹션 래퍼입니다.</p>

    <section class="docs-section">
      <h2>기본 사용</h2>
      <div class="example-preview">
        <PxBiSectionWrapper
          class="w-full"
          label="배송 정보"
          badge="2개 항목"
          md="배송지 변경은 출고 전에만 가능합니다."
          :mode="mode"
          isFold
          @onEdit="mode = 'edit'"
        >
          <template #TOP-RIGHT>
            <PxButton v-if="mode === 'edit'" size="sm" @click="mode = 'view'">완료</PxButton>
          </template>
          <div>
            <div><PxFormForView label="수령인" viewMode>김민준</PxFormForView></div>
            <div><PxFormForView label="연락처" viewMode>010-1234-5678</PxFormForView></div>
          </div>
        </PxBiSectionWrapper>
      </div>
      <CodeBlock :code="basicCode" />
    </section>

    <section class="docs-section">
      <h2>두 Wrapper의 차이</h2>
      <DocsTable :headers="differenceHeaders" :rows="differenceRows" />
    </section>

    <section class="docs-section">
      <h2>내부 div와 구분선</h2>
      <p class="m-[0px] max-w-[760px] text-[14px] leading-[1.75] text-[#69707e]">
        PxBiSectionWrapper도 기본 슬롯의 직계 <code>div</code>를 가로 구역으로 취급해 구역 사이에 가로 구분선을 만듭니다. 각 구역 안의 자식은 2열 Grid로
        배치되며 두 번째 열의 왼쪽에 세로 구분선이 생깁니다.
      </p>
      <div class="example-preview mt-[20px]">
        <PxBiSectionWrapper class="w-full" label="배송 정보" mode="read" isReadOnly>
          <div>
            <PxFormForView label="수령인" viewMode>김민준</PxFormForView>
            <PxFormForView label="연락처" viewMode>010-1234-5678</PxFormForView>
          </div>
          <div>
            <PxFormForView label="배송 방식" viewMode>택배</PxFormForView>
            <PxFormForView label="도착 예정" viewMode>내일 오후</PxFormForView>
          </div>
        </PxBiSectionWrapper>
      </div>
      <CodeBlock :code="separatorCode" />
      <p class="docs-note">모바일에서는 1열로 바뀌고 열 사이의 세로 구분선은 제거됩니다. 가로 구분선은 직계 div 구역이 여러 개일 때 그대로 유지됩니다.</p>
    </section>

    <section class="docs-section">
      <h2>expand 슬롯</h2>
      <p class="m-[0px] max-w-[760px] text-[14px] leading-[1.75] text-[#69707e]">
        헤더 맨 왼쪽의 투명한 <code>10px</code> 영역을 더블클릭하면 <code>expand</code> 슬롯이 기본 본문 뒤에 추가됩니다.
      </p>
      <CodeBlock :code="expandCode" />
      <p class="docs-note">눈에 보이는 버튼이 없는 숨은 동작이므로 일반 사용자 화면보다는 내부 관리 기능에 적합합니다.</p>
    </section>

    <section class="docs-section">
      <h2>주요 Props</h2>
      <DocsTable :headers="propHeaders" :rows="propRows" />
    </section>

    <section class="docs-section">
      <h2>슬롯 위치</h2>
      <p class="m-[0px] max-w-[760px] text-[14px] leading-[1.75] text-[#69707e]">
        실제 Wrapper에 슬롯 이름을 표시했습니다. <code>tooltip</code>은 제목 옆 도움말 아이콘의 내용이며, <code>expand</code>는 헤더 왼쪽 보라색 띠를
        더블클릭하면 나타납니다.
      </p>
      <div class="example-preview mt-[20px]">
        <PxBiSectionWrapper class="bi-slot-map w-full" label="제목" mode="view" isFold>
          <template #tooltip>tooltip 슬롯의 실제 도움말 내용</template>
          <template #button>
            <PxTag class="ml-[8px]" color="sec_border">button</PxTag>
          </template>
          <template #TOP-RIGHT-L="{ viewMode }">
            <PxTag color="ter_border">TOP-RIGHT-L · {{ viewMode }}</PxTag>
          </template>
          <template #TOP-RIGHT>
            <PxTag class="ml-[6px]" color="black_border">TOP-RIGHT</PxTag>
          </template>
          <template #default="{ viewMode }">
            <div>
              <div class="slot-location-box">
                <PxTag color="pri_border">default · {{ viewMode }}</PxTag>
                <p>항상 표시되는 기본 본문</p>
              </div>
            </div>
          </template>
          <template #expand="{ viewMode }">
            <div>
              <div class="slot-location-box slot-location-box--expand">
                <PxTag color="sec_border">expand · {{ viewMode }}</PxTag>
                <p>더블클릭 후 기본 본문 아래에 추가되는 영역</p>
              </div>
            </div>
          </template>
        </PxBiSectionWrapper>
      </div>
      <CodeBlock :code="slotLocationCode" />
      <DocsTable :headers="slotHeaders" :rows="slotRows" />
      <DocsTable class="mt-[14px]" :headers="eventHeaders" :rows="eventRows" />
      <p class="docs-note">
        <code>onEdit</code>은 상태를 직접 바꾸지 않습니다. 이벤트를 받은 쪽에서 mode를 변경해야 합니다. <code>onSave</code>는 선언되어 있지만 현재 내부에서
        발생시키지 않습니다.
      </p>
    </section>

    <section class="docs-section">
      <h2>Class로 스타일 재정의</h2>
      <DocsTable :headers="classHeaders" :rows="classRows" />
      <div class="example-preview mt-[20px]">
        <PxBiSectionWrapper class="project-bi-wrapper w-full" label="배송 요약" badge="EXPRESS" helperText="오늘 출고 예정" mode="read" isReadOnly>
          <div>
            <div><PxFormForView label="배송 상태" viewMode>허브 이동 중</PxFormForView></div>
            <div><PxFormForView label="도착 예정" viewMode>내일 오후</PxFormForView></div>
          </div>
        </PxBiSectionWrapper>
      </div>
      <CodeBlock :code="customClassCode" />
    </section>

    <PxDialogTooltip />
  </article>
</template>

<style>
.project-bi-wrapper.px-biSectionWrapper {
  @apply border-[0px] bg-transparent;
}

.project-bi-wrapper .px-sectionWrapper--header {
  @apply h-[56px] rounded-[18px] border-[0px] px-[20px] py-[0px] text-white shadow-[0_12px_28px_rgba(3,105,161,0.24)];
  background: linear-gradient(135deg, #164e63, #0284c7);
}

.project-bi-wrapper .px-sectionWrapper--label {
  @apply text-[18px];
}

.project-bi-wrapper .px-sectionWrapper--badge {
  @apply border-[#bae6fd] bg-white/[0.14] text-[#e0f2fe];
}

.project-bi-wrapper .px-sectionWrapper--helperText {
  @apply text-[#bae6fd];
}

.project-bi-wrapper .px-sectionWrapper--body {
  @apply m-[0px] mt-[14px] overflow-hidden rounded-[18px] border-[1px] border-[#bae6fd] bg-white shadow-[0_12px_30px_rgba(8,47,73,0.1)];
}

.bi-slot-map .px-sectionWrapper--header {
  @apply h-auto min-h-[74px] flex-wrap gap-[8px] px-[14px] py-[10px];
}

.bi-slot-map .px-sectionWrapper--tooltip {
  @apply flex h-[24px] w-auto items-center rounded-[4px] border-[1px] border-[#8b5cf6] bg-[#f5f3ff] px-[4px] py-[0px];
}

.bi-slot-map .px-sectionWrapper--tooltip::after {
  content: 'tooltip';
  @apply ml-[3px] text-[11px] font-bold text-[#6d28d9];
}

.bi-slot-map .px-sectionWrapper--header-margin {
  @apply w-[10px] cursor-pointer bg-[#8b5cf6] opacity-100;
}

.bi-slot-map .px-sectionWrapper--body {
  @apply m-[0px] mt-[10px];
}

.bi-slot-map .slot-location-box {
  @apply min-h-[92px] rounded-[10px] border-[1px] border-dashed border-[#60a5fa] bg-[#eff6ff] p-[16px];
}

.bi-slot-map .slot-location-box--expand {
  @apply border-[#c084fc] bg-[#faf5ff];
}

.bi-slot-map .slot-location-box p {
  @apply mb-[0px] mt-[10px] text-[13px] text-[#6b7280];
}
</style>
