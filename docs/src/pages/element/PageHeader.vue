<script setup>
import CodeBlock from '../../components/CodeBlock.vue'
import DocsTable from '../../components/DocsTable.vue'

const basicCode = `<PxPageHeader>
  <span>회원 관리</span>
  <PxButton size="sm">회원 추가</PxButton>
</PxPageHeader>`

const textOnlyCode = `<PxPageHeader>
  <span>대시보드</span>
</PxPageHeader>`

const customClassCode = `<PxPageHeader class="project-page-header">
  <div>
    <strong>주문 관리</strong>
    <p>오늘 접수된 주문을 확인합니다.</p>
  </div>
  <PxButton color="white">주문 등록</PxButton>
</PxPageHeader>

<style>
/* 사용자 class는 바깥 래퍼에 적용되므로 내부 px-pageHeader와 조합합니다. */
.project-page-header .px-pageHeader {
  min-height: 92px;
  height: auto;
  padding: 18px 22px;
  border-radius: 16px;
  background: linear-gradient(135deg, #1e3a8a, #7c3aed);
  box-shadow: 0 14px 30px rgba(76, 29, 149, 0.28);
  color: #ffffff;
}

.project-page-header p {
  margin: 5px 0 0;
  color: #ddd6fe;
  font-size: 13px;
  font-weight: 500;
}
</style>`

const slotHeaders = [
  { field: 'name', label: '이름', code: true },
  { field: 'description', label: '설명' },
]

const slotRows = [
  {
    name: 'default',
    description: '페이지 제목과 동작 영역. 두 요소를 넣으면 justify-between으로 좌우 배치',
  },
]

const classHeaders = [
  { field: 'category', label: '구분' },
  { field: 'className', label: '클래스', html: true },
  { field: 'description', label: '용도' },
]

const classRows = [
  {
    category: '헤더 영역',
    className: '<code>px-pageHeader</code>',
    description: '제목과 우측 콘텐츠를 정렬하는 실제 헤더 영역',
  },
]
</script>

<template>
  <article class="docs-page">
    <p class="docs-eyebrow">ELEMENT</p>
    <h1>PxPageHeader</h1>
    <p class="docs-lead">페이지 제목과 우측의 주요 동작을 같은 줄에 정렬하는 단순한 페이지 헤더 컴포넌트입니다.</p>

    <section class="docs-section">
      <h2>기본 사용</h2>
      <div class="example-preview">
        <div class="w-full">
          <PxPageHeader>
            <span>회원 관리</span>
            <PxButton size="sm">회원 추가</PxButton>
          </PxPageHeader>
        </div>
      </div>
      <CodeBlock :code="basicCode" />
      <p class="docs-note">
        내부가 <code>display: flex</code>와 <code>justify-content: space-between</code>으로 구성되어 있어 첫 요소는 왼쪽, 두 번째 요소는 오른쪽에 배치됩니다.
      </p>
    </section>

    <section class="docs-section">
      <h2>제목만 사용</h2>
      <div class="example-preview">
        <div class="w-full">
          <PxPageHeader>
            <span>대시보드</span>
          </PxPageHeader>
        </div>
      </div>
      <CodeBlock :code="textOnlyCode" />
    </section>

    <section class="docs-section">
      <h2>Slots</h2>
      <DocsTable :headers="slotHeaders" :rows="slotRows" />
      <p class="docs-note">Props와 별도 이벤트는 없으며 모든 내용은 기본 슬롯으로 전달합니다.</p>
    </section>

    <section class="docs-section">
      <h2>Class로 스타일 재정의</h2>
      <DocsTable :headers="classHeaders" :rows="classRows" />
      <div class="example-preview mt-[20px]">
        <PxPageHeader class="project-page-header w-full">
          <div>
            <strong>주문 관리</strong>
            <p>오늘 접수된 주문을 확인합니다.</p>
          </div>
          <PxButton color="white">주문 등록</PxButton>
        </PxPageHeader>
      </div>
      <CodeBlock :code="customClassCode" />
      <p class="docs-note">
        컴포넌트에 추가한 사용자 클래스는 바깥 래퍼에 적용됩니다. 실제 헤더를 바꾸려면 <code>.사용자클래스 .px-pageHeader</code>처럼 조합합니다.
        화면 너비 <code>639px</code> 이하에서는 기본 높이가 자동으로 바뀌고 제목 크기가 <code>22px</code>로 줄어듭니다.
      </p>
    </section>
  </article>
</template>

<style scoped>
.project-page-header .px-pageHeader {
  @apply h-auto min-h-[92px] rounded-[16px] px-[22px] py-[18px] text-white shadow-[0_14px_30px_rgba(76,29,149,0.28)];
  background: linear-gradient(135deg, #1e3a8a, #7c3aed);
}

.project-page-header p {
  @apply mb-[0px] mt-[5px] text-[13px] font-medium text-[#ddd6fe];
}
</style>
