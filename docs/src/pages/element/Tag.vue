<script setup>
import { ref } from "vue";
import CodeBlock from "../../components/CodeBlock.vue";
import DocsTable from "../../components/DocsTable.vue";

const lastAction = ref("아직 실행된 동작이 없습니다.");

const colorCode = `<PxTag color="pri">Primary</PxTag>
<PxTag color="pri_border">Primary Border</PxTag>
<PxTag color="sec">Secondary</PxTag>
<PxTag color="ter">Tertiary</PxTag>
<PxTag color="gray_border">Gray Border</PxTag>`;

const actionCode = `<PxTag
  color="pri"
  modify
  remove
  @onModify="editTag"
  @onRemove="removeTag"
>
  Vue 3
</PxTag>`;

const customClassCode = `<PxTag class="project-tag">신규 기능</PxTag>

<style>
.project-tag.px-tag {
  height: 34px;
  padding: 0 14px;
  border: 2px solid #be123c;
  border-radius: 10px;
  background: linear-gradient(135deg, #e11d48, #f97316);
  box-shadow: 0 8px 18px rgba(225, 29, 72, 0.28);
  color: #ffffff;
  font-size: 13px;
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
  { name: "color", type: "String", defaultValue: "pri", description: "색상 클래스. <code>pri</code>, <code>sec</code>, <code>ter</code>, <code>black</code>, <code>white</code>, <code>gray</code> 및 <code>*_border</code> 사용" },
  { name: "remove", type: "Boolean", defaultValue: "false", description: "삭제 버튼 표시" },
  { name: "modify", type: "Boolean", defaultValue: "false", description: "수정 버튼 표시" },
  { name: "filled", type: "Boolean", defaultValue: "자동", description: "채움 상태 강제 지정. 생략하면 color가 <code>border</code>로 끝나는지에 따라 결정" },
];

const eventHeaders = [
  { field: "name", label: "이벤트", code: true },
  { field: "description", label: "설명" },
];

const eventRows = [
  { name: "onModify", description: "수정 아이콘 클릭" },
  { name: "onRemove", description: "삭제 아이콘 클릭" },
];

const classHeaders = [
  { field: "category", label: "구분" },
  { field: "className", label: "클래스", html: true },
  { field: "description", label: "용도" },
];

const classRows = [
  { category: "최상위", className: "<code>px-tag</code>", description: "태그 전체 영역" },
  { category: "색상", className: "<code>pri</code>, <code>sec</code>, <code>ter</code>, <code>gray</code> 등", description: "color에 따라 적용" },
  { category: "채움", className: "<code>filled</code>", description: "채워진 배경과 흰색 동작 아이콘 상태" },
  { category: "동작 포함", className: "<code>hasTag</code>", description: "수정 또는 삭제 버튼이 있을 때 적용" },
  { category: "동작 버튼", className: "<code>px-tag--func</code>", description: "수정·삭제 아이콘 버튼" },
  { category: "동작 종류", className: "<code>modify</code> / <code>remove</code>", description: "수정 또는 삭제 버튼 구분" },
];
</script>

<template>
  <article class="docs-page">
    <p class="docs-eyebrow">ELEMENT</p>
    <h1>PxTag</h1>
    <p class="docs-lead">상태나 분류를 짧게 표시하고 필요한 경우 수정·삭제 동작을 함께 제공하는 태그입니다.</p>

    <section class="docs-section">
      <h2>색상</h2>
      <div class="example-preview example-preview--row">
        <PxTag color="pri">Primary</PxTag>
        <PxTag color="pri_border">Primary Border</PxTag>
        <PxTag color="sec">Secondary</PxTag>
        <PxTag color="sec_border">Secondary Border</PxTag>
        <PxTag color="ter">Tertiary</PxTag>
        <PxTag color="black">Black</PxTag>
        <PxTag color="gray_border">Gray Border</PxTag>
      </div>
      <CodeBlock :code="colorCode" />
    </section>

    <section class="docs-section">
      <h2>수정과 삭제</h2>
      <div class="example-preview">
        <div>
          <PxTag
            color="pri"
            modify
            remove
            @onModify="lastAction = '수정 버튼을 눌렀습니다.'"
            @onRemove="lastAction = '삭제 버튼을 눌렀습니다.'"
          >
            Vue 3
          </PxTag>
          <p class="mb-[0px] mt-[12px] text-[13px] text-[#69707e]">{{ lastAction }}</p>
        </div>
      </div>
      <CodeBlock :code="actionCode" />
    </section>

    <section class="docs-section">
      <h2>주요 Props와 Events</h2>
      <DocsTable :headers="propHeaders" :rows="propRows" />
      <DocsTable class="mt-[14px]" :headers="eventHeaders" :rows="eventRows" />
    </section>

    <section class="docs-section">
      <h2>Class로 스타일 재정의</h2>
      <DocsTable :headers="classHeaders" :rows="classRows" />
      <div class="example-preview mt-[20px]">
        <PxTag class="project-tag">신규 기능</PxTag>
      </div>
      <CodeBlock :code="customClassCode" />
    </section>
  </article>
</template>

<style scoped>
.project-tag.px-tag {
  @apply h-[34px] rounded-[10px] border-[2px] border-[#be123c] px-[14px] py-[0px] text-[13px] font-extrabold text-white shadow-[0_8px_18px_rgba(225,29,72,0.28)];
  background: linear-gradient(135deg, #e11d48, #f97316);
}
</style>
