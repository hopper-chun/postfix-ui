<script setup>
import CodeBlock from '../../components/CodeBlock.vue'

const basicCode = `<PxAdminFormWrapper>
  <PxAdminFormWrapperRow>
    <div class="search-field">이름 검색</div>
  </PxAdminFormWrapperRow>

  <PxAdminFormWrapperRow>
    <div class="search-field">기간 선택</div>
  </PxAdminFormWrapperRow>
</PxAdminFormWrapper>`
</script>

<template>
  <article class="docs-page">
    <p class="docs-eyebrow">TABLE</p>
    <h1>PxAdminFormWrapperRow</h1>
    <p class="docs-lead">PxAdminFormWrapper 내부에서 검색·입력 콘텐츠 한 줄의 높이와 정렬을 맞추는 행 래퍼입니다.</p>

    <section class="docs-section">
      <h2>간단 사용</h2>
      <div class="example-preview">
        <PxAdminFormWrapper class="flex-col">
          <PxAdminFormWrapperRow>
            <div class="w-full px-[16px] py-[10px] text-[13px] text-[#343a46]">이름 검색</div>
          </PxAdminFormWrapperRow>
          <PxAdminFormWrapperRow>
            <div class="w-full px-[16px] py-[10px] text-[13px] text-[#343a46]">기간 선택</div>
          </PxAdminFormWrapperRow>
        </PxAdminFormWrapper>
      </div>
      <CodeBlock :code="basicCode" />
      <p class="docs-note">별도 Props 없이 기본 슬롯만 제공합니다. 내부의 <code>slot_container</code> 클래스가 최소 높이와 정렬을 담당합니다.</p>
    </section>
  </article>
</template>
