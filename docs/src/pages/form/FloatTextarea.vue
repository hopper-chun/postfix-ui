<script setup>
import { ref } from "vue";
import CodeBlock from "../../components/CodeBlock.vue";
import DocsTable from "../../components/DocsTable.vue";

const basicValue = ref("");
const limitedValue = ref("");
const disabledValue = ref("수정할 수 없는 내용입니다.");
const helperIconValue = ref("");
const blurValue = ref("");
const blurCount = ref(0);
const customValue = ref("라벨 위치와 입력 영역을 함께 조정한 예제입니다.");

const basicCode = `const content = ref('')

<PxFloatTextarea
  v-model="content"
  label="내용"
/>`;

const optionCode = `<PxFloatTextarea
  v-model="summary"
  label="요약"
  helperText="공백을 포함해 최대 200자까지 입력할 수 있습니다."
  :maxlength="200"
/>

<PxFloatTextarea
  v-model="disabledValue"
  label="변경 불가"
  disabled
/>`;

const slotCode = `<PxFloatTextarea
  v-model="content"
  label="검토 의견"
  helperText="담당자에게 전달할 내용을 입력해주세요."
>
  <template #helperIcon>
    <PxIcon name="icon-information-circle" />
  </template>
</PxFloatTextarea>`;

const eventCode = `<PxFloatTextarea
  v-model="content"
  label="포커스 확인"
  @onBlur="handleBlur"
/>`;

const customClassCode = `<PxFloatTextarea
  v-model="content"
  class="project-float-textarea"
  label="프로젝트 메모"
/>

<style>
.px-floatTextarea.project-float-textarea .px-floatTextarea--wrapper {
  height: 168px;
  border: 2px solid #4f46e5;
  border-radius: 16px;
  background-color: #eef2ff;
  box-shadow: 0 10px 24px rgba(79, 70, 229, 0.2);
}

.px-floatTextarea.project-float-textarea .px-input--field {
  top: 28px;
  padding: 12px 18px 18px;
  background-color: transparent;
  color: #312e81;
  font-size: 15px;
  line-height: 1.7;
}

.px-floatTextarea.project-float-textarea .px-floatTextarea--label {
  top: 14px;
  padding-right: 18px;
  padding-left: 18px;
  color: #4338ca;
  font-weight: 700;
}
</style>`;

const propHeaders = [
  { field: "name", label: "이름", code: true },
  { field: "type", label: "타입" },
  { field: "defaultValue", label: "기본값" },
  { field: "description", label: "설명", html: true },
];

const propRows = [
  {
    name: "id",
    type: "String",
    defaultValue: "-",
    description: "Textarea와 에러를 식별하는 ID",
  },
  {
    name: "label",
    type: "String",
    defaultValue: "-",
    description: "입력 전에는 중앙에 있고 포커스하거나 값이 있으면 위로 이동하는 라벨",
  },
  {
    name: "modelValue",
    type: "String | Number",
    defaultValue: "-",
    description: "<code>v-model</code>로 연결되는 값 (필수)",
  },
  {
    name: "disabled",
    type: "Boolean",
    defaultValue: "false",
    description: "입력창 비활성화",
  },
  {
    name: "helperText",
    type: "String",
    defaultValue: "-",
    description: "입력창 아래 보조 문구",
  },
  {
    name: "rows",
    type: "Number",
    defaultValue: "-",
    description: "내부 textarea의 rows 속성",
  },
  {
    name: "maxlength",
    type: "String | Number",
    defaultValue: "-",
    description: "최대 입력 길이와 현재/최대 길이 표시",
  },
];

const eventHeaders = [
  { field: "name", label: "이름", code: true },
  { field: "payload", label: "전달값", code: true },
  { field: "description", label: "설명", html: true },
];

const eventRows = [
  {
    name: "update:modelValue",
    payload: "String",
    description: "입력할 때 발생하며 <code>v-model</code>을 갱신",
  },
  {
    name: "onBlur",
    payload: "-",
    description: "입력창이 포커스를 잃을 때 발생",
  },
];

const slotHeaders = [
  { field: "name", label: "이름", code: true },
  { field: "description", label: "설명" },
];

const slotRows = [
  {
    name: "helperIcon",
    description: "입력창 아래 보조 문구 앞에 표시할 아이콘",
  },
];

const classHeaders = [
  { field: "category", label: "구분" },
  { field: "className", label: "클래스", html: true },
  { field: "description", label: "용도", html: true },
];

const classRows = [
  {
    category: "최상위",
    className: "<code>px-floatTextarea</code>",
    description: "전체 Float Textarea 컴포넌트",
  },
  {
    category: "입력 영역",
    className: "<code>px-floatTextarea--wrapper</code>, <code>px-input--field</code>",
    description: "테두리를 포함한 래퍼와 실제 textarea 요소",
  },
  {
    category: "플로팅 라벨",
    className: "<code>px-floatTextarea--label</code>, <code>isFloating</code>",
    description: "라벨과 라벨이 위로 이동한 상태",
  },
  {
    category: "입력 상태",
    className: "<code>disabled</code>, <code>error</code>",
    description: "입력 래퍼의 현재 상태",
  },
  {
    category: "보조 문구",
    className: "<code>px-helperText</code>, <code>px-helperText--wrapper</code>, <code>px-helperText--icon</code>, <code>px-helperText--text</code>, <code>px-helperText--length</code>",
    description: "설명, 에러, 아이콘과 길이 표시",
  },
];
</script>

<template>
  <article class="docs-page">
    <p class="docs-eyebrow">FORM</p>
    <h1>PxFloatTextarea</h1>
    <p class="docs-lead">
      포커스하거나 값이 입력되면 라벨이 위로 이동하는 여러 줄 입력 컴포넌트입니다.
    </p>

    <section class="docs-section">
      <h2>기본 사용</h2>
      <div class="example-preview">
        <div class="w-full max-w-[640px]">
          <PxFloatTextarea v-model="basicValue" label="내용" />
        </div>
      </div>
      <CodeBlock :code="basicCode" />
    </section>

    <section class="docs-section">
      <h2>주요 예제</h2>
      <div class="example-preview">
        <div class="grid w-full grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[24px]">
          <PxFloatTextarea
            v-model="limitedValue"
            label="요약"
            helperText="공백을 포함해 최대 200자까지 입력할 수 있습니다."
            :maxlength="200"
          />
          <PxFloatTextarea v-model="disabledValue" label="변경 불가" disabled />
        </div>
      </div>
      <CodeBlock :code="optionCode" />
    </section>

    <section class="docs-section">
      <h2>Slots</h2>
      <DocsTable :headers="slotHeaders" :rows="slotRows" />
      <div class="example-preview mt-[20px]">
        <div class="w-full max-w-[640px]">
          <PxFloatTextarea
            v-model="helperIconValue"
            label="검토 의견"
            helperText="담당자에게 전달할 내용을 입력해주세요."
          >
            <template #helperIcon>
              <PxIcon
                name="icon-information-circle"
                class="h-[15px] w-[15px] text-[#69707e] [&_svg]:h-[15px] [&_svg]:w-[15px]"
              />
            </template>
          </PxFloatTextarea>
        </div>
      </div>
      <CodeBlock :code="slotCode" />
    </section>

    <section class="docs-section">
      <h2>Events</h2>
      <DocsTable :headers="eventHeaders" :rows="eventRows" />
      <div class="example-preview mt-[20px]">
        <div class="w-full max-w-[640px]">
          <PxFloatTextarea
            v-model="blurValue"
            label="포커스 확인"
            @onBlur="blurCount += 1"
          />
          <p class="mb-[0px] mt-[10px] text-[13px] text-[#69707e]">
            포커스를 벗어난 횟수: {{ blurCount }}
          </p>
        </div>
      </div>
      <CodeBlock :code="eventCode" />
    </section>

    <section class="docs-section">
      <h2>주요 Props</h2>
      <DocsTable :headers="propHeaders" :rows="propRows" />
    </section>

    <section class="docs-section">
      <h2>Class로 스타일 재정의</h2>
      <p class="m-[0px] max-w-[760px] text-[14px] leading-[1.75] text-[#69707e]">
        높이를 바꿀 때는 래퍼만 조정하지 말고 실제 입력 영역의 위치와 플로팅 라벨 위치도 함께 맞추는 편이 안전합니다.
      </p>
      <DocsTable class="mt-[20px]" :headers="classHeaders" :rows="classRows" />

      <h3 class="mb-[12px] mt-[28px] text-[17px] font-bold text-[#242832]">
        사용자 클래스 추가
      </h3>
      <div class="example-preview">
        <div class="w-full max-w-[640px]">
          <PxFloatTextarea
            v-model="customValue"
            class="project-float-textarea"
            label="프로젝트 메모"
          />
        </div>
      </div>
      <CodeBlock :code="customClassCode" />
    </section>
  </article>
</template>

<style>
.px-floatTextarea.project-float-textarea .px-floatTextarea--wrapper {
  @apply h-[168px] rounded-[16px] border-[2px] border-[#4f46e5] bg-[#eef2ff] shadow-[0_10px_24px_rgba(79,70,229,0.2)];
}

.px-floatTextarea.project-float-textarea .px-input--field {
  @apply top-[28px] bg-transparent px-[18px] pb-[18px] pt-[12px] text-[15px] leading-[1.7] text-[#312e81];
}

.px-floatTextarea.project-float-textarea .px-floatTextarea--label {
  @apply top-[14px] px-[18px] font-bold text-[#4338ca];
}
</style>
