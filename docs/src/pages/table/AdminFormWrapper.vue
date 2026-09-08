<script setup>
import CodeBlock from '../../components/CodeBlock.vue'

const basicCode = `<PxAdminFormWrapper>
  <PxAdminFormWrapperRow>
    <PxInput label="이름" />
    <PxSelect label="상태" :options="statusOptions" />
  </PxAdminFormWrapperRow>
</PxAdminFormWrapper>`
</script>

<template>
  <article class="docs-page">
    <p class="docs-eyebrow">TABLE</p>
    <h1>PxAdminFormWrapper</h1>
    <p class="docs-lead">관리자 목록 위에 놓이는 검색 조건이나 입력 행을 하나로 묶는 레이아웃 래퍼입니다.</p>

    <section class="docs-section">
      <h2>간단 사용</h2>
      <div class="example-preview">
        <PxAdminFormWrapper>
          <PxAdminFormWrapperRow>
            <div class="flex w-full items-center gap-[12px] px-[16px] py-[10px]">
              <strong class="text-[13px] text-[#343a46]">검색 조건</strong>
              <span class="text-[13px] text-[#69707e]">이름 · 상태 · 등록일</span>
            </div>
          </PxAdminFormWrapperRow>
        </PxAdminFormWrapper>
      </div>
      <CodeBlock :code="basicCode" />
      <p class="docs-note">별도 Props 없이 기본 슬롯만 제공합니다. 일반적으로 내부에 <code>PxAdminFormWrapperRow</code>를 배치합니다.</p>
    </section>
  </article>
</template>
