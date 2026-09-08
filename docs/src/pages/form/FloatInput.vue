<script setup>
import { ref } from "vue";
import CodeBlock from "../../components/CodeBlock.vue";
import DocsTable from "../../components/DocsTable.vue";

const name = ref("");
const amount = ref(1250000);
const clearValue = ref("버튼을 눌러 지워보세요");
const password = ref("");
const limitedValue = ref("");
const disabledValue = ref("수정할 수 없는 값");
const searchValue = ref("");
const accountId = ref("");
const customValue = ref("Postfix UI");
const recommendedValue = ref("Postfix UI");

const formatCurrency = (value) => {
  if (value === "" || value === null || value === undefined) return "";

  const number = Number(value);
  return Number.isNaN(number) ? value : number.toLocaleString("ko-KR");
};

const basicCode = `const name = ref('')

<PxFloatInput
  v-model="name"
  label="이름"
/>`;

const recommendedCode = `<PxFloatInput
  v-model="value"
  class="recommended-float-input"
  label="프로젝트 이름"
  clear
/>

<style>
.px-floatInput.recommended-float-input .px-floatInput--wrapper,
.px-floatInput.recommended-float-input .px-input--field {
  height: 56px;
}

.px-floatInput.recommended-float-input .px-input--field {
  padding-top: 16px;
  padding-right: 18px;
  padding-left: 18px;
  border-radius: 8px;
  font-size: 15px;
}

.px-floatInput.recommended-float-input .px-floatInput--label {
  height: 56px;
  padding-right: 18px;
  padding-left: 18px;
}

.px-floatInput.recommended-float-input .px-floatInput--label.isFloating {
  transform: translateY(-12px);
}
</style>`;

const optionCode = `const formatCurrency = (value) => {
  if (value === '' || value === null || value === undefined) return ''

  const number = Number(value)
  return Number.isNaN(number) ? value : number.toLocaleString('ko-KR')
}

<PxFloatInput
  v-model="amount"
  label="금액"
  numberOnly
  unit="원"
  :format="formatCurrency"
/>

<!-- PxFloatInput의 clear는 v-model을 직접 비웁니다. -->
<PxFloatInput
  v-model="clearValue"
  label="초기화"
  clear
/>

<PxFloatInput
  v-model="password"
  label="비밀번호"
  type="password"
  showPassword
/>

<PxFloatInput
  v-model="limitedValue"
  label="메모"
  helperText="최대 20자까지 입력할 수 있습니다."
  :maxLength="20"
/>

<PxFloatInput
  v-model="disabledValue"
  label="고정값"
  disabled
/>`;

const slotCode = `<PxFloatInput
  v-model="searchValue"
  label="검색어"
  inputIcon
>
  <template #inputIcon>
    <PxIcon name="icon-magnifying-glass" />
  </template>
</PxFloatInput>

<PxFloatInput
  v-model="accountId"
  label="계정 ID"
  helperText="영문 소문자와 숫자를 사용할 수 있습니다."
>
  <template #helperIcon>
    <PxIcon name="icon-information-circle" />
  </template>
</PxFloatInput>`;

const customClassCode = `<PxFloatInput
  v-model="value"
  class="project-float-input"
  label="프로젝트 인풋"
/>

<style>
.px-floatInput.project-float-input .px-input--field {
  height: 48px;
  padding-right: 18px;
  padding-left: 18px;
  border: 2px solid #7c3aed;
  border-radius: 12px;
  background-color: #faf5ff;
  box-shadow: 0 8px 20px rgba(124, 58, 237, 0.18);
  color: #3b0764;
  font-size: 15px;
}

.px-floatInput.project-float-input .px-floatInput--wrapper {
  height: 48px;
  background-color: #faf5ff;
}

.px-floatInput.project-float-input .px-floatInput--label {
  padding-right: 18px;
  padding-left: 18px;
  color: #7c3aed;
  font-weight: 700;
}
</style>`;

const slotHeaders = [
  { field: "name", label: "이름", code: true },
  { field: "description", label: "설명", html: true },
];

const slotRows = [
  {
    name: "inputIcon",
    description:
      "입력창 왼쪽 내부에 표시할 아이콘. <code>inputIcon</code> prop을 함께 지정해야 합니다.",
  },
  {
    name: "helperIcon",
    description: "입력창 아래 보조 문구 앞에 표시할 아이콘",
  },
];

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
    description: "입력 요소와 에러를 식별하는 ID",
  },
  {
    name: "label",
    type: "String",
    defaultValue: "-",
    description: "플로팅 라벨. 필수로 지정해야 합니다.",
  },
  {
    name: "type",
    type: "String",
    defaultValue: "text",
    description: "HTML input의 type",
  },
  {
    name: "modelValue",
    type: "String | Number",
    defaultValue: "-",
    description: "<code>v-model</code>로 연결되는 값",
  },
  {
    name: "disabled",
    type: "Boolean",
    defaultValue: "false",
    description: "입력창 비활성화",
  },
  {
    name: "format",
    type: "Function",
    defaultValue: "value => value",
    description: "포커스가 없을 때 표시값 변환",
  },
  {
    name: "inputIcon",
    type: "Boolean",
    defaultValue: "false",
    description: "<code>inputIcon</code> 슬롯 영역과 왼쪽 여백 활성화",
  },
  {
    name: "numberOnly",
    type: "Boolean",
    defaultValue: "false",
    description: "숫자 입력으로 제한",
  },
  {
    name: "helperText",
    type: "String",
    defaultValue: "-",
    description: "입력창 아래 보조 문구",
  },
  {
    name: "unit",
    type: "String",
    defaultValue: "-",
    description: "값이 있을 때 입력창 오른쪽에 단위 표시",
  },
  {
    name: "clear",
    type: "Boolean",
    defaultValue: "false",
    description: "연결된 값을 직접 비우는 초기화 버튼 표시",
  },
  {
    name: "showPassword",
    type: "Boolean",
    defaultValue: "false",
    description: "비밀번호 표시 전환 버튼 표시",
  },
  {
    name: "maxLength",
    type: "String | Number",
    defaultValue: "-",
    description: "최대 입력 길이와 현재/최대 길이 표시",
  },
];

const eventHeaders = [
  { field: "name", label: "이름", code: true },
  { field: "payload", label: "전달값" },
  { field: "description", label: "설명", html: true },
];

const eventRows = [
  {
    name: "update:modelValue",
    payload: "String | Number",
    description: "입력값이 바뀔 때 발생하며 <code>v-model</code>에 사용됩니다.",
  },
  {
    name: "onBlur",
    payload: "-",
    description: "입력창이 포커스를 잃을 때 발생합니다.",
  },
];

const classHeaders = [
  { field: "category", label: "구분" },
  { field: "className", label: "클래스", html: true },
  { field: "description", label: "용도" },
];

const classRows = [
  {
    category: "최상위",
    className: "<code>px-floatInput</code>",
    description: "전체 Float Input 컴포넌트",
  },
  {
    category: "입력 영역",
    className:
      "<code>px-floatInput--wrapper</code>, <code>px-input--field</code>",
    description: "입력 래퍼와 input 요소",
  },
  {
    category: "플로팅 라벨",
    className: "<code>px-floatInput--label</code>, <code>isFloating</code>",
    description: "라벨과 라벨이 위로 이동한 상태",
  },
  {
    category: "입력 상태",
    className:
      "<code>disabled</code>, <code>error</code>, <code>inputIcon</code>",
    description: "필드의 현재 상태",
  },
  {
    category: "부가 영역",
    className:
      "<code>px-input--unit</code>, <code>px-input--funcWrapper</code>, <code>px-input--inputIcon</code>",
    description: "단위, 기능 버튼, 입력 아이콘",
  },
  {
    category: "보조 문구",
    className:
      "<code>px-helperText</code>, <code>px-helperText--icon</code>, <code>px-helperText--text</code>, <code>px-helperText--length</code>",
    description: "설명, 에러, 길이 표시",
  },
];
</script>

<template>
  <article class="docs-page">
    <p class="docs-eyebrow">FORM</p>
    <h1>PxFloatInput</h1>
    <p class="docs-lead">
      포커스하거나 값이 입력되면 라벨이 위로 이동하는 텍스트 입력
      컴포넌트입니다.
    </p>

    <section class="docs-section">
      <h2>기본 사용</h2>
      <div class="example-preview">
        <div class="w-full max-w-[480px]">
          <PxFloatInput v-model="name" label="이름" />
        </div>
      </div>
      <CodeBlock :code="basicCode" />
    </section>

    <section class="docs-section">
      <h2>추천 스타일</h2>
      <p
        class="m-[0px] max-w-[760px] text-[14px] leading-[1.75] text-[#69707e]"
      >
        높이를 <code>56px</code>, radius를 <code>8px</code>로 넓혀 여유를 주고,
        입력 패딩과 플로팅 라벨의 이동값을 함께 조정한 형태입니다. <br />
        원한다면 <code>isFloating</code> 스타일을 맞춰 보다 정밀한 디자인이
        가능합니다.
      </p>
      <div class="example-preview mt-[20px]">
        <div class="w-full max-w-[480px]">
          <PxFloatInput
            v-model="recommendedValue"
            class="recommended-float-input"
            label="프로젝트 이름"
            clear
          />
        </div>
      </div>
      <CodeBlock :code="recommendedCode" />
    </section>

    <section class="docs-section">
      <h2>주요 예제</h2>
      <p
        class="m-[0px] max-w-[760px] text-[14px] leading-[1.75] text-[#69707e]"
      >
        <code>format</code>은 포커스를 벗어났을 때 표시값을 바꾸며,
        <code>clear</code> 버튼은 별도 이벤트 처리 없이 연결된 값을 직접
        비웁니다.
      </p>
      <div class="example-preview mt-[20px]">
        <div
          class="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-[24px]"
        >
          <PxFloatInput
            v-model="amount"
            label="금액"
            numberOnly
            unit="원"
            :format="formatCurrency"
          />
          <PxFloatInput v-model="clearValue" label="초기화" clear />
          <PxFloatInput
            v-model="password"
            label="비밀번호"
            type="password"
            showPassword
          />
          <PxFloatInput
            v-model="limitedValue"
            label="메모"
            helperText="최대 20자까지 입력할 수 있습니다."
            :maxLength="20"
          />
          <PxFloatInput v-model="disabledValue" label="고정값" disabled />
        </div>
      </div>
      <CodeBlock :code="optionCode" />
    </section>

    <section class="docs-section">
      <h2>Slots</h2>
      <DocsTable :headers="slotHeaders" :rows="slotRows" />

      <div class="example-preview mt-[20px]">
        <div
          class="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-[24px]"
        >
          <PxFloatInput v-model="searchValue" label="검색어" inputIcon>
            <template #inputIcon>
              <PxIcon
                name="icon-magnifying-glass"
                class="h-[18px] w-[18px] text-[#69707e] [&_svg]:h-[18px] [&_svg]:w-[18px]"
              />
            </template>
          </PxFloatInput>

          <PxFloatInput
            v-model="accountId"
            label="계정 ID"
            helperText="영문 소문자와 숫자를 사용할 수 있습니다."
          >
            <template #helperIcon>
              <PxIcon
                name="icon-information-circle"
                class="h-[15px] w-[15px] text-[#69707e] [&_svg]:h-[15px] [&_svg]:w-[15px]"
              />
            </template>
          </PxFloatInput>
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
      <p
        class="m-[0px] max-w-[760px] text-[14px] leading-[1.75] text-[#69707e]"
      >
        <code>PxFloatInput</code>에 사용자 클래스를 추가하고 공개된 내부
        클래스와 조합해 프로젝트 전용 스타일을 적용할 수 있습니다.
      </p>

      <DocsTable class="mt-[20px]" :headers="classHeaders" :rows="classRows" />

      <h3 class="mb-[12px] mt-[28px] text-[17px] font-bold text-[#242832]">
        사용자 클래스 추가
      </h3>
      <div class="example-preview">
        <div class="w-full max-w-[480px]">
          <PxFloatInput
            v-model="customValue"
            class="project-float-input"
            label="프로젝트 인풋"
          />
        </div>
      </div>
      <CodeBlock :code="customClassCode" />
    </section>
  </article>
</template>

<style>
.px-floatInput.recommended-float-input .px-floatInput--wrapper,
.px-floatInput.recommended-float-input .px-input--field {
  @apply h-[56px];
}

.px-floatInput.recommended-float-input .px-input--field {
  @apply rounded-[8px] px-[18px] pt-[16px] text-[15px];
}

.px-floatInput.recommended-float-input .px-floatInput--label {
  @apply h-[56px] px-[18px];
}

.px-floatInput.recommended-float-input .px-floatInput--label.isFloating {
  transform: translateY(-12px);
}

.px-floatInput.project-float-input .px-input--field {
  @apply h-[48px] rounded-[12px] border-[2px] border-[#7c3aed] bg-[#faf5ff] px-[18px] text-[15px] text-[#3b0764] shadow-[0_8px_20px_rgba(124,58,237,0.18)];
}

.px-floatInput.project-float-input .px-floatInput--wrapper {
  @apply h-[48px] bg-[#faf5ff];
}

.px-floatInput.project-float-input .px-floatInput--label {
  @apply px-[18px] font-bold text-[#7c3aed];
}
</style>
