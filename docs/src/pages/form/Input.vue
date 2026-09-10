<script setup>
import { ref } from "vue";
import CodeBlock from "../../components/CodeBlock.vue";
import DocsTable from "../../components/DocsTable.vue";

const name = ref("");
const email = ref("");
const amount = ref(12000);
const password = ref("");
const disabledValue = ref("수정할 수 없는 값");
const customValue = ref("Postfix UI");
const labelHelperValue = ref("");
const tooltipValue = ref("");
const filteredValue = ref("");
const clearValue = ref("지울 수 있는 값");
const limitedValue = ref("");
const formattedValue = ref(1250000);
const prefixSlotValue = ref("");
const inputIconSlotValue = ref("");
const helperIconSlotValue = ref("");
const tooltipSlotValue = ref("");

const formatCurrency = (value) => {
  if (value === "" || value === null || value === undefined) return "";

  const number = Number(value);
  return Number.isNaN(number) ? value : number.toLocaleString("ko-KR");
};

const basicCode = `const name = ref('')

<PxInput
  v-model="name"
  label="이름"
  placeholder="이름을 입력해주세요"
/>`;

const optionCode = `<PxInput
  v-model="email"
  label="이메일"
  required
  helperText="업무용 이메일을 입력해주세요."
  :maxLength="30"
/>

<PxInput
  v-model="amount"
  label="금액"
  numberOnly
  unit="원"
  :maxCount="1000000"
/>

<PxInput
  v-model="password"
  label="비밀번호"
  type="password"
  showPassword
/>

<PxInput v-model="disabledValue" label="고정값" disabled />`;

const labelCode = `<PxInput
  v-model="nickname"
  label="닉네임"
  labelHelper="선택 사항"
/>

<PxInput
  v-model="customerCode"
  label="고객 코드"
  md="**고객 코드**는 관리자 화면에서 확인할 수 있습니다."
/>

<!-- 툴팁을 표시할 페이지에 한 번 배치합니다. -->
<PxDialogTooltip />`;

const inputControlCode = `const formatCurrency = (value) => {
  if (value === '' || value === null || value === undefined) return ''

  const number = Number(value)
  return Number.isNaN(number) ? value : number.toLocaleString('ko-KR')
}

<PxInput
  v-model="filteredValue"
  label="영문과 숫자만 입력"
  inputFilter="[^0-9a-zA-Z]"
/>

<PxInput
  v-model="clearValue"
  label="초기화"
  clear
  @onClear="clearValue = ''"
/>

<PxInput
  v-model="limitedValue"
  label="메모"
  :maxLength="12"
  :maxLengthLabel="false"
/>

<PxInput
  v-model="formattedValue"
  label="금액"
  numberOnly
  unit="원"
  :format="formatCurrency"
/>`;

const slotCode = `<PxInput
  v-model="url"
  label="사이트 주소"
  placeholder="example.com"
>
  <template #prefix>https://</template>
</PxInput>

<PxInput
  v-model="searchKeyword"
  label="검색어"
  placeholder="검색어를 입력해주세요"
>
  <template #inputIcon>
    <PxIcon name="icon-magnifying-glass" />
  </template>
</PxInput>

<PxInput
  v-model="accountId"
  label="계정 ID"
  helperText="영문 소문자와 숫자를 사용할 수 있습니다."
>
  <template #helperIcon>
    <PxIcon name="icon-information-circle" />
  </template>
</PxInput>

<PxInput v-model="projectName" label="프로젝트 이름">
  <template #tooltip>
    <strong>프로젝트 이름</strong><br />
    팀원이 알아보기 쉬운 이름을 사용해주세요.
  </template>
</PxInput>`;

const customClassCode = `<PxInput
  v-model="value"
  class="project-input"
  label="프로젝트 인풋"
/>

<style>
.px-input.project-input .px-input--field {
  height: 44px;
  padding: 0 18px;
  border: 2px solid #2563eb;
  border-radius: 12px;
  background-color: #eff6ff;
  box-shadow: 0 8px 20px rgba(37, 99, 235, 0.18);
  color: #172554;
  font-size: 15px;
}

.px-input.project-input .px-label--text {
  color: #1d4ed8;
  font-weight: 700;
}
</style>`;

const slotHeaders = [
  { field: "name", label: "이름", code: true },
  { field: "description", label: "설명" },
];

const slotRows = [
  { name: "prefix", description: "입력값 앞쪽에 표시할 접두 콘텐츠" },
  { name: "inputIcon", description: "입력창 왼쪽 내부에 표시할 아이콘" },
  {
    name: "helperIcon",
    description: "입력창 아래 보조 문구 앞에 표시할 아이콘",
  },
  { name: "tooltip", description: "라벨의 도움말 아이콘에 표시할 콘텐츠" },
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
    description: "입력창 위에 표시할 라벨",
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
    name: "format",
    type: "Function",
    defaultValue: "value => value",
    description: "포커스가 없을 때 표시값 변환",
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
    name: "numberOnly",
    type: "Boolean",
    defaultValue: "false",
    description: "숫자 입력으로 제한",
  },
  {
    name: "unit",
    type: "String",
    defaultValue: "-",
    description: "입력창 오른쪽에 단위 표시",
  },
  {
    name: "clear",
    type: "Boolean",
    defaultValue: "false",
    description: "초기화용 버튼 표시 (<code>onClear</code> 처리 필요)",
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
    description: "최대 입력 길이",
  },
  {
    name: "maxLengthLabel",
    type: "Boolean",
    defaultValue: "true",
    description: "현재/최대 길이 표시",
  },
  {
    name: "viewMode",
    type: "Boolean",
    defaultValue: "false",
    description: "입력창 대신 조회용 텍스트로 표시",
  },
  {
    name: "maxCount",
    type: "Number",
    defaultValue: "-",
    description: "<code>numberOnly</code> 사용 시 최대값",
  },
  {
    name: "inputFilter",
    type: "String",
    defaultValue: "-",
    description: "제거할 문자를 정하는 정규식 문자열",
  },
  {
    name: "hover",
    type: "Boolean",
    defaultValue: "true",
    description: "라벨 툴팁의 hover 동작 여부",
  },
  {
    name: "md",
    type: "String",
    defaultValue: "-",
    description: "라벨 툴팁에 표시할 콘텐츠",
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
    className: "<code>px-input</code>",
    description: "전체 Input 컴포넌트",
  },
  {
    category: "편집 영역",
    className: "<code>px-input--edit</code>",
    description: "라벨과 입력 영역 전체",
  },
  {
    category: "라벨",
    className:
      "<code>px-input--label_wrapper</code>, <code>px-label</code>, <code>px-label--text</code>",
    description: "라벨 영역",
  },
  {
    category: "입력창",
    className:
      "<code>px-input--input_wrapper</code>, <code>px-input--field</code>",
    description: "입력 래퍼와 input 요소",
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
      "<code>px-input--prefix</code>, <code>px-input--unit</code>, <code>px-input--funcWrapper</code>",
    description: "접두 콘텐츠, 단위, 기능 버튼",
  },
  {
    category: "보조 문구",
    className:
      "<code>px-helperText</code>, <code>px-helperText--text</code>, <code>px-helperText--length</code>",
    description: "설명, 에러, 길이 표시",
  },
  {
    category: "조회 모드",
    className:
      "<code>px-input--view</code>, <code>px-input--view_text</code>, <code>viewMode</code>",
    description: "<code>viewMode</code> 표시 영역",
  },
];
</script>

<template>
  <article class="docs-page">
    <p class="docs-eyebrow">FORM</p>
    <h1>PxInput</h1>
    <p class="docs-lead">
      라벨, 보조 문구, 단위 및 입력 제한을 지원하는 텍스트 입력 컴포넌트입니다.
    </p>

    <section class="docs-section">
      <h2>기본 사용</h2>
      <div class="example-preview">
        <div class="w-full max-w-[480px]">
          <PxInput
            v-model="name"
            label="이름"
            placeholder="이름을 입력해주세요"
          />
        </div>
      </div>
      <CodeBlock :code="basicCode" />
    </section>

    <section class="docs-section">
      <h2>주요 예제</h2>
      <div class="example-preview">
        <div
          class="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-[24px]"
        >
          <PxInput
            v-model="email"
            label="이메일"
            required
            helperText="업무용 이메일을 입력해주세요."
            :maxLength="30"
          />
          <PxInput
            v-model="amount"
            label="금액"
            numberOnly
            unit="원"
            :maxCount="1000000"
          />
          <PxInput
            v-model="password"
            label="비밀번호"
            type="password"
            showPassword
          />
          <PxInput v-model="disabledValue" label="고정값" disabled />
        </div>
      </div>
      <CodeBlock :code="optionCode" />
    </section>

    <section class="docs-section">
      <h2>라벨 보조 정보</h2>
      <p
        class="m-[0px] max-w-[760px] text-[14px] leading-[1.75] text-[#69707e]"
      >
        <code>labelHelper</code>는 라벨 옆에 짧은 안내를 표시하고,
        <code>md</code>는 도움말 아이콘을 눌렀을 때 보여줄 콘텐츠를 전달합니다.
      </p>
      <div class="example-preview mt-[20px]">
        <div
          class="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-[24px]"
        >
          <PxInput
            v-model="labelHelperValue"
            label="닉네임"
            labelHelper="선택 사항"
          />
          <PxInput
            v-model="tooltipValue"
            label="고객 코드"
            md="**고객 코드**는 관리자 화면에서 확인할 수 있습니다."
          />
        </div>
      </div>
      <CodeBlock :code="labelCode" />
    </section>

    <section class="docs-section">
      <h2>입력값 제어와 표시</h2>
      <p
        class="m-[0px] max-w-[760px] text-[14px] leading-[1.75] text-[#69707e]"
      >
        필터링, 초기화, 길이 표시 여부와 포커스를 벗어났을 때의 표시 형식을 각각
        설정할 수 있습니다.
      </p>
      <div class="example-preview mt-[20px]">
        <div
          class="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-[24px]"
        >
          <PxInput
            v-model="filteredValue"
            label="영문과 숫자만 입력"
            placeholder="특수문자는 제거됩니다"
            inputFilter="[^0-9a-zA-Z]"
          />
          <PxInput
            v-model="clearValue"
            label="초기화"
            clear
            @onClear="clearValue = ''"
          />
          <PxInput
            v-model="limitedValue"
            label="메모"
            placeholder="최대 12자, 글자 수 숨김"
            :maxLength="12"
            :maxLengthLabel="false"
          />
          <PxInput
            v-model="formattedValue"
            label="금액"
            numberOnly
            unit="원"
            :format="formatCurrency"
          />
        </div>
      </div>
      <CodeBlock :code="inputControlCode" />
    </section>

    <section class="docs-section">
      <h2>Slots</h2>
      <p
        class="m-[0px] max-w-[760px] text-[14px] leading-[1.75] text-[#69707e]"
      >
        입력창의 접두 콘텐츠와 아이콘, 하단 안내 아이콘, 라벨 툴팁 내용을
        슬롯으로 교체할 수 있습니다.
      </p>

      <DocsTable class="mt-[20px]" :headers="slotHeaders" :rows="slotRows" />

      <div class="example-preview mt-[20px]">
        <div
          class="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-[24px]"
        >
          <PxInput
            v-model="prefixSlotValue"
            label="사이트 주소"
            placeholder="example.com"
          >
            <template #prefix>https://</template>
          </PxInput>

          <PxInput
            v-model="inputIconSlotValue"
            label="검색어"
            placeholder="검색어를 입력해주세요"
          >
            <template #inputIcon>
              <PxIcon
                name="icon-magnifying-glass"
                class="h-[18px] w-[18px] text-[#69707e] [&_svg]:h-[18px] [&_svg]:w-[18px]"
              />
            </template>
          </PxInput>

          <PxInput
            v-model="helperIconSlotValue"
            label="계정 ID"
            helperText="영문 소문자와 숫자를 사용할 수 있습니다."
          >
            <template #helperIcon>
              <PxIcon
                name="icon-information-circle"
                class="h-[15px] w-[15px] text-[#69707e] [&_svg]:h-[15px] [&_svg]:w-[15px]"
              />
            </template>
          </PxInput>

          <PxInput v-model="tooltipSlotValue" label="프로젝트 이름">
            <template #tooltip>
              <strong>프로젝트 이름</strong><br />
              팀원이 알아보기 쉬운 이름을 사용해주세요.
            </template>
          </PxInput>
        </div>
      </div>
      <CodeBlock :code="slotCode" />
    </section>

    <section class="docs-section">
      <h2>주요 Props</h2>
      <DocsTable :headers="propHeaders" :rows="propRows" />
    </section>

    <section class="docs-section">
      <h2>Class로 스타일 재정의</h2>
      <p
        class="m-[0px] max-w-[760px] text-[14px] leading-[1.75] text-[#69707e]"
      >
        <code>PxInput</code>에 사용자 클래스를 추가한 뒤, 공개된 내부 클래스와
        조합해 프로젝트 전용 스타일을 적용할 수 있습니다.
      </p>

      <DocsTable class="mt-[20px]" :headers="classHeaders" :rows="classRows" />

      <h3 class="mb-[12px] mt-[28px] text-[17px] font-bold text-[#242832]">
        사용자 클래스 추가
      </h3>
      <div class="example-preview">
        <div class="w-full max-w-[480px]">
          <PxInput
            v-model="customValue"
            class="project-input"
            label="프로젝트 인풋"
          />
        </div>
      </div>
      <CodeBlock :code="customClassCode" />
    </section>

    <PxDialogTooltip />
  </article>
</template>

<style>
.px-input.project-input .px-input--field {
  @apply h-[44px] rounded-[12px] border-[2px] border-[#2563eb] bg-[#eff6ff] px-[18px] py-[0px] text-[15px] text-[#172554] shadow-[0_8px_20px_rgba(37,99,235,0.18)];
}

.px-input.project-input .px-label--text {
  @apply font-bold text-[#1d4ed8];
}
</style>
