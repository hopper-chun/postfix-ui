<script setup>
import { ref } from "vue";
import CodeBlock from "../../components/CodeBlock.vue";
import DocsTable from "../../components/DocsTable.vue";

const viewMode = ref(true);
const name = ref("김민준");

const basicCode = `const viewMode = ref(true)
const name = ref('김민준')

<PxFormForView
  label="담당자"
  required
  :viewMode="viewMode"
>
  <span v-if="viewMode">{{ name }}</span>
  <PxInput v-else v-model="name" />
</PxFormForView>`;

const customClassCode = `<PxFormForView
  class="project-form-view"
  label="계약 상태"
  viewMode
>
  계약 완료
</PxFormForView>

<style>
.project-form-view.px-formForView {
  width: 420px;
  padding: 18px;
  border: 2px solid #0891b2;
  border-radius: 14px;
  background-color: #ecfeff;
  box-shadow: 0 12px 26px rgba(8, 145, 178, 0.2);
}

.project-form-view .px-formForView--body {
  margin-top: 6px;
  color: #155e75;
  font-size: 17px;
  font-weight: 800;
}
</style>`;

const propHeaders = [
  { field: "name", label: "이름", code: true },
  { field: "type", label: "타입" },
  { field: "defaultValue", label: "기본값" },
  { field: "description", label: "설명", html: true },
];

const propRows = [
  { name: "viewMode", type: "Boolean", defaultValue: "false", description: "조회 모드용 라벨과 본문 스타일 적용" },
  { name: "label", type: "String", defaultValue: "-", description: "PxLabel에 전달할 라벨" },
  { name: "id", type: "String", defaultValue: "-", description: "조회 모드 라벨의 입력 연결 ID" },
  { name: "required", type: "Boolean", defaultValue: "false", description: "편집 모드에서 필수 표시" },
  { name: "labelHelper", type: "String", defaultValue: "-", description: "라벨 옆 보조 문구" },
  { name: "md", type: "String", defaultValue: "-", description: "PxLabel에 전달할 툴팁 문구" },
];

const classHeaders = [
  { field: "category", label: "구분" },
  { field: "className", label: "클래스", html: true },
  { field: "description", label: "용도" },
];

const classRows = [
  { category: "최상위", className: "<code>px-formForView</code>", description: "라벨과 본문 전체 영역" },
  { category: "조회 라벨", className: "<code>px-formForView--view</code>", description: "viewMode가 true일 때 라벨 영역" },
  { category: "편집 라벨", className: "<code>px-formForView--edit</code>", description: "viewMode가 false일 때 라벨 영역" },
  { category: "본문", className: "<code>px-formForView--body</code>", description: "기본 슬롯 콘텐츠 영역" },
  { category: "조회 상태", className: "<code>viewMode</code>", description: "조회 모드 라벨과 본문에 적용" },
  { category: "배치", className: "<code>labelSwitch</code>", description: "라벨 정렬 관련 공통 클래스" },
];
</script>

<template>
  <article class="docs-page">
    <p class="docs-eyebrow">ELEMENT</p>
    <h1>PxFormForView</h1>
    <p class="docs-lead">조회 모드와 편집 모드에서 폼 라벨 및 본문 배치를 일관되게 유지하는 래퍼입니다.</p>

    <section class="docs-section">
      <h2>조회·편집 모드</h2>
      <div class="example-preview">
        <div class="w-full max-w-[520px]">
          <PxButton class="mb-[18px]" size="xs" color="gray_border" @click="viewMode = !viewMode">
            {{ viewMode ? "편집 모드로" : "조회 모드로" }}
          </PxButton>
          <PxFormForView label="담당자" required :viewMode="viewMode">
            <span v-if="viewMode">{{ name }}</span>
            <PxInput v-else v-model="name" />
          </PxFormForView>
        </div>
      </div>
      <CodeBlock :code="basicCode" />
      <p class="docs-note"><code>viewMode</code>는 배치와 라벨 스타일만 바꿉니다. 슬롯의 조회·편집 콘텐츠는 사용하는 쪽에서 직접 전환해야 합니다.</p>
    </section>

    <section class="docs-section">
      <h2>주요 Props</h2>
      <DocsTable :headers="propHeaders" :rows="propRows" />
    </section>

    <section class="docs-section">
      <h2>Class로 스타일 재정의</h2>
      <DocsTable :headers="classHeaders" :rows="classRows" />
      <div class="example-preview mt-[20px]">
        <PxFormForView class="project-form-view" label="계약 상태" viewMode>계약 완료</PxFormForView>
      </div>
      <CodeBlock :code="customClassCode" />
    </section>
  </article>
</template>

<style scoped>
.project-form-view.px-formForView {
  @apply w-[420px] rounded-[14px] border-[2px] border-[#0891b2] bg-[#ecfeff] p-[18px] shadow-[0_12px_26px_rgba(8,145,178,0.2)];
}

.project-form-view .px-formForView--body {
  @apply mt-[6px] text-[17px] font-extrabold text-[#155e75];
}
</style>
