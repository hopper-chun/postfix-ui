<script setup>
import { ref } from "vue";
import CodeBlock from "../../components/CodeBlock.vue";
import DocsTable from "../../components/DocsTable.vue";

const basicValue = ref("");
const limitedValue = ref("");
const resizableValue = ref("아래쪽 핸들을 드래그해 높이를 조절할 수 있습니다.");
const autoGrowValue = ref("내용을 입력하면 높이가 자동으로 늘어납니다.");
const disabledValue = ref("수정할 수 없는 내용입니다.");
const viewValue = ref("첫 번째 줄\n두 번째 줄도 그대로 표시됩니다.");
const tooltipValue = ref("");
const helperIconValue = ref("");
const pasteValue = ref("");
const pastedText = ref("");
const customValue = ref("프로젝트 스타일을 적용한 Textarea입니다.");

const handlePaste = (event) => {
  pastedText.value = event.clipboardData?.getData("text") || "";
};

const basicCode = `const content = ref('')

<PxTextarea
  v-model="content"
  label="내용"
  placeholder="내용을 입력해주세요"
  :rows="5"
/>`;

const lengthCode = `<PxTextarea
  v-model="content"
  label="소개"
  required
  helperText="공백을 포함해 최대 120자까지 입력할 수 있습니다."
  :rows="4"
  :maxLength="120"
/>`;

const sizeCode = `<PxTextarea
  v-model="resizableValue"
  label="직접 높이 조절"
  :rows="4"
  resize
/>

<PxTextarea
  v-model="autoGrowValue"
  label="자동 높이 조절"
  :rows="2"
  autoGrow
/>`;

const stateCode = `<PxTextarea
  v-model="disabledValue"
  label="변경 불가"
  disabled
/>

<PxTextarea
  v-model="savedContent"
  label="저장된 내용"
  viewMode
/>

<PxTextarea
  v-model="guideContent"
  label="운영 메모"
  labelHelper="내부용"
  md="**운영 메모**는 관리자만 확인할 수 있습니다."
/>

<!-- md 도움말을 사용하는 페이지에 한 번 배치합니다. -->
<PxDialogTooltip />`;

const pasteCode = `const handlePaste = (event) => {
  const pastedText = event.clipboardData?.getData('text') || ''
  console.log('붙여넣은 내용:', pastedText)
}

<PxTextarea
  v-model="content"
  label="붙여넣기 확인"
  @onPaste="handlePaste"
/>`;

const slotCode = `<PxTextarea
  v-model="content"
  label="검토 의견"
  helperText="구체적인 수정 이유를 함께 입력해주세요."
>
  <template #tooltip>
    작성한 의견은 담당자에게 그대로 전달됩니다.
  </template>

  <template #helperIcon>
    <PxIcon name="icon-information-circle" />
  </template>
</PxTextarea>`;

const customClassCode = `<PxTextarea
  v-model="content"
  class="project-textarea"
  label="프로젝트 메모"
/>

<style>
.px-textarea.project-textarea .px-input--field {
  min-height: 160px;
  padding: 16px 18px;
  border: 2px solid #e11d48;
  border-radius: 16px;
  background-color: #fff1f2;
  box-shadow: 0 10px 24px rgba(225, 29, 72, 0.18);
  color: #881337;
  font-size: 15px;
  line-height: 1.7;
}

.px-textarea.project-textarea .px-label--text {
  color: #be123c;
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
    description: "입력창 위에 표시할 라벨",
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
    name: "placeholder",
    type: "String",
    defaultValue: "-",
    description: "입력 안내 문구",
  },
  {
    name: "required",
    type: "Boolean",
    defaultValue: "false",
    description: "라벨에 필수 표시",
  },
  {
    name: "labelHelper",
    type: "String",
    defaultValue: "-",
    description: "라벨 옆 보조 문구",
  },
  {
    name: "helperText",
    type: "String",
    defaultValue: "-",
    description: "입력창 아래 보조 문구",
  },
  {
    name: "resize",
    type: "Boolean",
    defaultValue: "false",
    description: "세로 방향 크기 조절 허용",
  },
  {
    name: "rows",
    type: "Number",
    defaultValue: "-",
    description: "Textarea의 기본 행 수",
  },
  {
    name: "maxLength",
    type: "String | Number",
    defaultValue: "-",
    description: "최대 입력 길이와 현재 글자 수 표시",
  },
  {
    name: "autoGrow",
    type: "Boolean",
    defaultValue: "false",
    description: "내용에 맞춰 입력창 높이를 자동 조절",
  },
  {
    name: "viewMode",
    type: "Boolean",
    defaultValue: "false",
    description: "입력창 대신 줄바꿈을 유지한 조회용 내용으로 표시",
  },
  {
    name: "cursor",
    type: "String",
    defaultValue: "-",
    description: "Textarea에 적용할 CSS cursor 값",
  },
  {
    name: "md",
    type: "String",
    defaultValue: "-",
    description: "라벨 툴팁 다이얼로그에 표시할 콘텐츠",
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
    name: "onPaste",
    payload: "ClipboardEvent",
    description: "Textarea에 내용을 붙여넣을 때 발생",
  },
  {
    name: "onClickTooltip",
    payload: "Event",
    description: "라벨의 도움말 아이콘을 클릭할 때 발생",
  },
];

const slotHeaders = [
  { field: "name", label: "이름", code: true },
  { field: "description", label: "설명" },
];

const slotRows = [
  {
    name: "tooltip",
    description: "라벨의 도움말 아이콘에 표시할 콘텐츠",
  },
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
    className: "<code>px-textarea</code>",
    description: "전체 Textarea 컴포넌트",
  },
  {
    category: "편집 영역",
    className: "<code>px-textarea--edit</code>, <code>labelSwitch</code>",
    description: "라벨과 입력 영역 전체",
  },
  {
    category: "라벨",
    className: "<code>px-label</code>, <code>px-label--text</code>",
    description: "라벨 영역",
  },
  {
    category: "입력창",
    className: "<code>px-input--field</code>",
    description: "실제 textarea 요소",
  },
  {
    category: "입력 상태",
    className: "<code>disabled</code>, <code>error</code>, <code>resize</code>",
    description: "필드의 현재 상태와 크기 조절 여부",
  },
  {
    category: "보조 문구",
    className: "<code>px-helperText</code>, <code>px-helperText--wrapper</code>, <code>px-helperText--icon</code>, <code>px-helperText--text</code>, <code>px-helperText--length</code>",
    description: "설명, 에러, 아이콘과 길이 표시",
  },
  {
    category: "조회 모드",
    className: "<code>px-textarea--view</code>, <code>px-textarea--contents</code>",
    description: "<code>viewMode</code> 표시 영역",
  },
];
</script>

<template>
  <article class="docs-page">
    <p class="docs-eyebrow">FORM</p>
    <h1>PxTextarea</h1>
    <p class="docs-lead">
      여러 줄 입력과 글자 수 표시, 크기 조절 및 조회 모드를 지원하는 Textarea 컴포넌트입니다.
    </p>

    <section class="docs-section">
      <h2>기본 사용</h2>
      <div class="example-preview">
        <div class="w-full max-w-[640px]">
          <PxTextarea
            v-model="basicValue"
            label="내용"
            placeholder="내용을 입력해주세요"
            :rows="5"
          />
        </div>
      </div>
      <CodeBlock :code="basicCode" />
    </section>

    <section class="docs-section">
      <h2>최대 길이</h2>
      <p class="m-[0px] max-w-[760px] text-[14px] leading-[1.75] text-[#69707e]">
        <code>maxLength</code>를 설정하면 입력을 제한하고 입력창 아래에 현재 글자 수를 함께 표시합니다.
      </p>
      <div class="example-preview mt-[20px]">
        <div class="w-full max-w-[640px]">
          <PxTextarea
            v-model="limitedValue"
            label="소개"
            required
            helperText="공백을 포함해 최대 120자까지 입력할 수 있습니다."
            :rows="4"
            :maxLength="120"
          />
        </div>
      </div>
      <CodeBlock :code="lengthCode" />
    </section>

    <section class="docs-section">
      <h2>높이 조절</h2>
      <p class="m-[0px] max-w-[760px] text-[14px] leading-[1.75] text-[#69707e]">
        <code>resize</code>는 사용자가 세로 크기를 직접 조절하게 하고, <code>autoGrow</code>는 입력 내용에 맞춰 높이를 늘립니다.
      </p>
      <div class="example-preview mt-[20px]">
        <div class="grid w-full grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[24px]">
          <PxTextarea
            v-model="resizableValue"
            label="직접 높이 조절"
            :rows="4"
            resize
          />
          <PxTextarea
            v-model="autoGrowValue"
            label="자동 높이 조절"
            :rows="2"
            autoGrow
          />
        </div>
      </div>
      <CodeBlock :code="sizeCode" />
    </section>

    <section class="docs-section">
      <h2>상태와 부가 설정</h2>
      <div class="example-preview">
        <div class="grid w-full grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[24px]">
          <PxTextarea v-model="disabledValue" label="변경 불가" :rows="4" disabled />
          <PxTextarea v-model="viewValue" label="저장된 내용" viewMode />
          <PxTextarea
            v-model="tooltipValue"
            label="운영 메모"
            labelHelper="내부용"
            md="**운영 메모**는 관리자만 확인할 수 있습니다."
            :rows="4"
          />
        </div>
      </div>
      <CodeBlock :code="stateCode" />
    </section>

    <section class="docs-section">
      <h2>붙여넣기 이벤트</h2>
      <p class="m-[0px] max-w-[760px] text-[14px] leading-[1.75] text-[#69707e]">
        <code>onPaste</code>로 원본 ClipboardEvent를 받아 붙여넣은 내용을 별도로 검사할 수 있습니다.
      </p>
      <div class="example-preview mt-[20px]">
        <div class="w-full max-w-[640px]">
          <PxTextarea
            v-model="pasteValue"
            label="붙여넣기 확인"
            placeholder="텍스트를 붙여넣어 보세요"
            :rows="4"
            @onPaste="handlePaste"
          />
          <p v-if="pastedText" class="mb-[0px] mt-[10px] text-[13px] text-[#69707e]">
            마지막으로 붙여넣은 내용: {{ pastedText }}
          </p>
        </div>
      </div>
      <CodeBlock :code="pasteCode" />
    </section>

    <section class="docs-section">
      <h2>Slots</h2>
      <DocsTable :headers="slotHeaders" :rows="slotRows" />
      <div class="example-preview mt-[20px]">
        <div class="w-full max-w-[640px]">
          <PxTextarea
            v-model="helperIconValue"
            label="검토 의견"
            helperText="구체적인 수정 이유를 함께 입력해주세요."
            :rows="4"
          >
            <template #tooltip>
              작성한 의견은 담당자에게 그대로 전달됩니다.
            </template>
            <template #helperIcon>
              <PxIcon
                name="icon-information-circle"
                class="h-[15px] w-[15px] text-[#69707e] [&_svg]:h-[15px] [&_svg]:w-[15px]"
              />
            </template>
          </PxTextarea>
        </div>
      </div>
      <CodeBlock :code="slotCode" />
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
      <p class="m-[0px] max-w-[760px] text-[14px] leading-[1.75] text-[#69707e]">
        <code>PxTextarea</code>에 사용자 클래스를 추가한 뒤 공개된 내부 클래스와 조합해 높이, 여백, 테두리 등을 재정의할 수 있습니다.
      </p>
      <DocsTable class="mt-[20px]" :headers="classHeaders" :rows="classRows" />

      <h3 class="mb-[12px] mt-[28px] text-[17px] font-bold text-[#242832]">
        사용자 클래스 추가
      </h3>
      <div class="example-preview">
        <div class="w-full max-w-[640px]">
          <PxTextarea
            v-model="customValue"
            class="project-textarea"
            label="프로젝트 메모"
          />
        </div>
      </div>
      <CodeBlock :code="customClassCode" />
    </section>

    <PxDialogTooltip />
  </article>
</template>

<style>
.px-textarea.project-textarea .px-input--field {
  @apply min-h-[160px] rounded-[16px] border-[2px] border-[#e11d48] bg-[#fff1f2] px-[18px] py-[16px] text-[15px] leading-[1.7] text-[#881337] shadow-[0_10px_24px_rgba(225,29,72,0.18)];
}

.px-textarea.project-textarea .px-label--text {
  @apply font-bold text-[#be123c];
}
</style>
