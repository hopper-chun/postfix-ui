<script setup>
import { ref } from 'vue'
import CodeBlock from '../../components/CodeBlock.vue'
import DocsTable from '../../components/DocsTable.vue'

const mode = ref('view')

const basicCode = `const mode = ref('view')

<PxSectionWrapper
  class="px-sectionWrapper"
  label="기본 정보"
  badge="필수"
  helperText="회원의 기본 정보를 관리합니다."
  :mode="mode"
  isFold
  @onEdit="mode = 'edit'"
>
  <template #TOP-LEFT="{ viewMode }">
    <PxTag color="gray_border">{{ viewMode ? '조회' : '편집' }}</PxTag>
  </template>

  <template #TOP-RIGHT>
    <PxButton v-if="mode === 'edit'" size="sm" @click="mode = 'view'">
      완료
    </PxButton>
  </template>

  <div>
    <ProfileField label="이름" value="김민준" />
    <ProfileField label="소속" value="플랫폼팀" />
    <ProfileField label="권한" value="관리자" />
  </div>
</PxSectionWrapper>`

const slotLocationCode = `<PxSectionWrapper
  class="px-sectionWrapper"
  label="제목"
  mode="view"
  isFold
>
  <template #TOP-LEFT="{ viewMode }">
    <PxTag>TOP-LEFT · {{ viewMode }}</PxTag>
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
        <p>실제 본문이 들어가는 위치</p>
      </div>
    </div>
  </template>
</PxSectionWrapper>`

const separatorCode = `<PxSectionWrapper
  class="px-sectionWrapper"
  label="계정 정보"
  mode="read"
  isReadOnly
>
  <!-- 직계 div 하나가 하나의 가로 구역이 됩니다. -->
  <div>
    <PxFormForView label="이름" viewMode>김민준</PxFormForView>
    <PxFormForView label="소속" viewMode>플랫폼팀</PxFormForView>
    <PxFormForView label="권한" viewMode>관리자</PxFormForView>
  </div>

  <!-- 다음 직계 div 앞에는 가로 구분선이 생깁니다. -->
  <div>
    <PxFormForView label="이메일" viewMode>minjun@example.com</PxFormForView>
    <PxFormForView label="상태" viewMode>사용 중</PxFormForView>
    <PxFormForView label="가입일" viewMode>2026-09-08</PxFormForView>
  </div>
</PxSectionWrapper>`

const customClassCode = `<PxSectionWrapper
  class="px-sectionWrapper project-section-wrapper"
  label="워크스페이스 설정"
  badge="PRO"
  helperText="운영 환경"
  mode="read"
  isReadOnly
>
  <div>
    <div><!-- 프로젝트명 --></div>
    <div><!-- 공개 범위 --></div>
    <div><!-- 배포 상태 --></div>
  </div>
</PxSectionWrapper>

<style>
.project-section-wrapper.px-sectionWrapper {
  border: 0;
  background-color: transparent;
}

.project-section-wrapper .px-sectionWrapper--header {
  height: 56px;
  padding: 0 20px;
  border: 0;
  border-radius: 16px;
  background: linear-gradient(135deg, #7c2d12, #ea580c);
  box-shadow: 0 12px 26px rgba(154, 52, 18, 0.24);
  color: #ffffff;
}

.project-section-wrapper .px-sectionWrapper--label {
  font-size: 18px;
}

.project-section-wrapper .px-sectionWrapper--badge {
  border-color: #fed7aa;
  background-color: rgba(255, 255, 255, 0.14);
  color: #ffedd5;
}

.project-section-wrapper .px-sectionWrapper--helperText {
  color: #fed7aa;
}

.project-section-wrapper .px-sectionWrapper--body {
  margin: 14px 0 0;
  overflow: hidden;
  border: 1px solid #fed7aa;
  border-radius: 16px;
  background-color: #ffffff;
  box-shadow: 0 12px 30px rgba(124, 45, 18, 0.1);
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
  { name: 'isReadOnly', defaultValue: 'false', description: '조회 상태의 기본 편집 버튼 숨김' },
  { name: 'required', defaultValue: 'false', description: '제목에 필수 표시점 추가' },
  { name: 'badge', defaultValue: '-', description: '제목 옆 배지 문구' },
  { name: 'helperText', defaultValue: '-', description: '제목 옆 보조 문구' },
  { name: 'isFold', defaultValue: 'false', description: '본문 접기 버튼 표시' },
  { name: 'isWide', defaultValue: 'false', description: '본문 안쪽 자식의 기본 여백 제거' },
  { name: 'useGrid', defaultValue: 'false', description: '<code>create</code> 모드에서 3열 Grid 사용 여부. 다른 mode에서는 항상 Grid' },
  { name: 'redTitle', defaultValue: 'false', description: '경고용 붉은 헤더 상태 클래스 적용' },
  { name: 'useLocale', defaultValue: 'false', description: '기본 편집 버튼 문구를 <code>edit</code>으로 표시' },
]

const slotHeaders = [
  { field: 'name', label: '이름', code: true },
  { field: 'scope', label: '슬롯 Props', code: true },
  { field: 'description', label: '설명' },
]

const slotRows = [
  { name: 'default', scope: '{ viewMode }', description: '섹션 본문' },
  { name: 'TOP-LEFT', scope: '{ viewMode }', description: '제목과 배지 뒤의 왼쪽 영역' },
  { name: 'button', scope: '-', description: 'helperText 뒤의 제목 영역' },
  { name: 'TOP-RIGHT-L', scope: '{ viewMode }', description: '기본 편집 버튼 왼쪽' },
  { name: 'TOP-RIGHT', scope: '-', description: '접기 버튼 뒤의 가장 오른쪽 영역' },
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
  { category: '최상위', className: '<code>px-multiSectionWrapper</code>', description: '현재 컴포넌트에 기본 지정된 루트 클래스' },
  { category: '헤더', className: '<code>px-sectionWrapper--header</code>', description: '제목과 동작 전체 영역' },
  { category: '제목', className: '<code>px-sectionWrapper--label</code>', description: 'label과 required 표시 영역' },
  { category: '배지', className: '<code>px-sectionWrapper--badge</code>', description: 'badge 영역' },
  { category: '보조 문구', className: '<code>px-sectionWrapper--helperText</code>', description: 'helperText 영역' },
  { category: '접기', className: '<code>px-sectionWrapper--fold</code>', description: '본문 접기 버튼' },
  { category: '본문', className: '<code>px-sectionWrapper--body</code>', description: '기본 슬롯 영역' },
]
</script>

<template>
  <article class="docs-page">
    <p class="docs-eyebrow">WRAPPER</p>
    <h1>PxSectionWrapper</h1>
    <p class="docs-lead">제목과 편집 동작을 가진 여러 정보 구역을 3열 중심으로 구성하는 섹션 래퍼입니다.</p>

    <section class="docs-section">
      <h2>기본 사용</h2>
      <div class="example-preview">
        <PxSectionWrapper
          class="px-sectionWrapper w-full"
          label="기본 정보"
          badge="필수"
          helperText="회원의 기본 정보를 관리합니다."
          :mode="mode"
          isFold
          @onEdit="mode = 'edit'"
        >
          <template #TOP-LEFT="{ viewMode }">
            <PxTag class="ml-[10px]" color="gray_border">{{ viewMode ? '조회' : '편집' }}</PxTag>
          </template>
          <template #TOP-RIGHT>
            <PxButton v-if="mode === 'edit'" size="sm" @click="mode = 'view'">완료</PxButton>
          </template>
          <div>
            <div><PxFormForView label="이름" viewMode>김민준</PxFormForView></div>
            <div><PxFormForView label="소속" viewMode>플랫폼팀</PxFormForView></div>
            <div><PxFormForView label="권한" viewMode>관리자</PxFormForView></div>
          </div>
        </PxSectionWrapper>
      </div>
      <CodeBlock :code="basicCode" />
      <p class="docs-note">
        현재 루트에는 <code>px-multiSectionWrapper</code>가 붙지만 기본 본문 CSS는 <code>px-sectionWrapper</code> 아래에 정의되어 있습니다. 예제처럼
        <code>class="px-sectionWrapper"</code>를 함께 지정해야 기존 테두리와 Grid 스타일이 온전히 적용됩니다.
      </p>
    </section>

    <section class="docs-section">
      <h2>두 Wrapper의 차이</h2>
      <DocsTable :headers="differenceHeaders" :rows="differenceRows" />
    </section>

    <section class="docs-section">
      <h2>내부 div와 구분선</h2>
      <p class="m-[0px] max-w-[760px] text-[14px] leading-[1.75] text-[#69707e]">
        두 Wrapper 모두 기본 슬롯을 <code>div</code>로 나누면 구분선을 자동으로 만듭니다. Wrapper 바로 아래의 각 <code>div</code>는 하나의 가로 구역이며, 다음
        구역과의 사이에 가로 구분선이 생깁니다. 그 안의 자식들은 Grid 셀이 되어 열 사이에 세로 구분선이 생깁니다.
      </p>
      <div class="example-preview mt-[20px]">
        <PxSectionWrapper class="px-sectionWrapper w-full" label="계정 정보" mode="read" isReadOnly>
          <div>
            <PxFormForView label="이름" viewMode>김민준</PxFormForView>
            <PxFormForView label="소속" viewMode>플랫폼팀</PxFormForView>
            <PxFormForView label="권한" viewMode>관리자</PxFormForView>
          </div>
          <div>
            <PxFormForView label="이메일" viewMode>minjun@example.com</PxFormForView>
            <PxFormForView label="상태" viewMode>사용 중</PxFormForView>
            <PxFormForView label="가입일" viewMode>2026-09-08</PxFormForView>
          </div>
        </PxSectionWrapper>
      </div>
      <CodeBlock :code="separatorCode" />
      <p class="docs-note">
        PxSectionWrapper는 넓은 화면에서 한 구역을 3열로 배치합니다. 화면이 좁아지면 2열, 모바일에서는 1열로 줄어들며 세로 구분선도 열 구조를 따라갑니다.
      </p>
    </section>

    <section class="docs-section">
      <h2>주요 Props</h2>
      <DocsTable :headers="propHeaders" :rows="propRows" />
    </section>

    <section class="docs-section">
      <h2>슬롯 위치</h2>
      <p class="m-[0px] max-w-[760px] text-[14px] leading-[1.75] text-[#69707e]">
        아래 예제는 실제 Wrapper 안에 각 슬롯 이름을 그대로 표시합니다. 기본 편집 버튼과 접기 버튼을 기준으로 좌우 슬롯의 위치를 확인할 수 있습니다.
      </p>
      <div class="example-preview mt-[20px]">
        <PxSectionWrapper class="px-sectionWrapper wrapper-slot-map w-full" label="제목" mode="view" isFold>
          <template #TOP-LEFT="{ viewMode }">
            <PxTag class="ml-[8px]" color="pri_border">TOP-LEFT · {{ viewMode }}</PxTag>
          </template>
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
                <p>실제 본문이 들어가는 위치</p>
              </div>
            </div>
          </template>
        </PxSectionWrapper>
      </div>
      <CodeBlock :code="slotLocationCode" />
      <DocsTable :headers="slotHeaders" :rows="slotRows" />
      <p class="docs-note">
        <code>viewMode</code>는 mode가 <code>view</code> 또는 <code>read</code>일 때 true입니다. <code>onEdit</code>은 상태를 직접 바꾸지 않으므로 사용하는
        쪽에서 mode를 변경합니다.
      </p>
    </section>

    <section class="docs-section">
      <h2>Class로 스타일 재정의</h2>
      <DocsTable :headers="classHeaders" :rows="classRows" />
      <div class="example-preview mt-[20px]">
        <PxSectionWrapper
          class="px-sectionWrapper project-section-wrapper w-full"
          label="워크스페이스 설정"
          badge="PRO"
          helperText="운영 환경"
          mode="read"
          isReadOnly
        >
          <div>
            <div><PxFormForView label="프로젝트" viewMode>Postfix UI</PxFormForView></div>
            <div><PxFormForView label="공개 범위" viewMode>관리자 전용</PxFormForView></div>
            <div><PxFormForView label="배포 상태" viewMode>Production</PxFormForView></div>
          </div>
        </PxSectionWrapper>
      </div>
      <CodeBlock :code="customClassCode" />
    </section>
  </article>
</template>

<style>
.project-section-wrapper.px-sectionWrapper {
  @apply border-[0px] bg-transparent;
}

.project-section-wrapper .px-sectionWrapper--header {
  @apply h-[56px] rounded-[16px] border-[0px] px-[20px] py-[0px] text-white shadow-[0_12px_26px_rgba(154,52,18,0.24)];

  background: linear-gradient(135deg, #7c2d12, #ea580c);
}

.project-section-wrapper .px-sectionWrapper--label {
  @apply text-[18px];
}

.project-section-wrapper .px-sectionWrapper--badge {
  @apply border-[#fed7aa] bg-white/[0.14] text-[#ffedd5];
}

.project-section-wrapper .px-sectionWrapper--helperText {
  @apply text-[#fed7aa];
}

.project-section-wrapper .px-sectionWrapper--body {
  @apply m-[0px] mt-[14px] overflow-hidden rounded-[16px] border-[1px] border-[#fed7aa] bg-white shadow-[0_12px_30px_rgba(124,45,18,0.1)];
}

.wrapper-slot-map .px-sectionWrapper--header {
  @apply h-auto min-h-[74px] flex-wrap gap-[8px] px-[14px] py-[10px];
}

.wrapper-slot-map .px-sectionWrapper--body {
  @apply m-[0px] mt-[10px];
}

.wrapper-slot-map .slot-location-box {
  @apply min-h-[92px] rounded-[10px] border-[1px] border-dashed border-[#a78bfa] bg-[#faf5ff] p-[16px];
}

.wrapper-slot-map .slot-location-box p {
  @apply mb-[0px] mt-[10px] text-[13px] text-[#6b7280];
}
</style>
